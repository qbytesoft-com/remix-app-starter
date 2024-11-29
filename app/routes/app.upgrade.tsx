import {LoaderFunctionArgs} from "@remix-run/node";
import {ANNUAL_PLAN, authenticate, MONTHLY_PLAN} from "../shopify.server";
import * as process from "node:process";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { billing, session } = await authenticate.admin(request);
  const {shop} = session;
  let myShopName = shop.split(".")[0];

  let { searchParams } = new URL(request.url);
  let query = searchParams.get("plan");
  await billing.require({
    plans: [query === "monthly" ? MONTHLY_PLAN : ANNUAL_PLAN],
    onFailure: async () => billing.request({
      plan: query === "monthly" ? MONTHLY_PLAN : ANNUAL_PLAN,
      isTest: true,
      returnUrl: `https://admin.shopify.com/store/${myShopName}/apps/${process.env.APP_NAME}/app/price`,
    }),
  });

  // App logic
};
