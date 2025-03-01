import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  DeliveryMethod,
  LogSeverity,
  shopifyApp
} from "@shopify/shopify-app-remix/server";
import {PrismaSessionStorage} from "@shopify/shopify-app-session-storage-prisma";
import {restResources} from "@shopify/shopify-api/rest/admin/2024-07";
import prisma from "./db.server";

import {sendDiscordNotification} from "./utils/discordNotifier";
import {saveShopInfo} from "./services/shopService.server";

export const MONTHLY_PLAN = 'Monthly subscription';
export const ANNUAL_PLAN = 'Annual subscription';


const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  logger: {
    level: LogSeverity.Debug,
    log: (level: any, message: any) => {
      console.log(level, message);
    },
    httpRequests: true,
    timestamps: true,
  },
  billing: {
    [MONTHLY_PLAN]: {
      amount: 2.99,
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days as BillingInterval.OneTime,
    },
    [ANNUAL_PLAN]: {
      amount: 30,
      currencyCode: 'USD',
      interval: BillingInterval.Annual as BillingInterval.OneTime,
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? {customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN]}
    : {}),
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: '/webhooks',
    }
  },
  hooks: {
    afterAuth: async ({session, admin}) => {
      const payload = {
        username: 'Shopify App Bot',
        content: `
        🎉 A new Shopify app installation! 🔥
        Shop: ${session.shop}
        Time: ${new Date().toLocaleString()}
        `,
      };

      try {
        // Register Webhooks
        await shopify.registerWebhooks({session});
        console.log("Webhooks registered successfully");

        // Save Shop Info to DB
         await saveShopInfo(session, admin);
         // Send Discord Notification
        await sendDiscordNotification(session.shop, payload);

      } catch (error) {
        console.error("Error registering webhooks:", error);
      }
    },
  },


});

export default shopify;
export const apiVersion = ApiVersion.October24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
