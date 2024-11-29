import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import {sendDiscordNotification} from "../utils/discordNotifier";


export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, session, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  await sendDiscordNotification(shop, {
    username: 'Shopify App Bot',
    content: `😞 Uninstalled the app!
    Shop: ${shop}
    Time: ${new Date().toLocaleString()}`,
  });



  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    await db.session.deleteMany({ where: { shop } });
  }

  return new Response();
};


