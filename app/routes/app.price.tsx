import React, {useEffect, useState} from "react";
import {Page, Grid, Button, ButtonGroup, CalloutCard} from "@shopify/polaris";
import PricingCard from "../components/PricingCard";
import Footer from "../components/Footer";
import {ANNUAL_PLAN, authenticate, MONTHLY_PLAN} from "../shopify.server";
import {json, LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData, useNavigate} from "@remix-run/react";
import type {AppSubscription} from "@shopify/shopify-api";


export const loader = async ({ request } :LoaderFunctionArgs) => {
  const { billing } = await authenticate.admin(request);
  const { hasActivePayment, appSubscriptions } = await billing.check({
    plans: [MONTHLY_PLAN, ANNUAL_PLAN],
    isTest: true,
  });

  console.log(`hasActivePayment: ${hasActivePayment}`);
  console.log(`appSubscriptions: ${appSubscriptions}`);
  console.log(`billing: ${billing}`);

  if (!hasActivePayment) {
    return json({billing, plan: {name: 'Free Plan'}, hasActivePayment  });
  }

  return json({billing, plan: appSubscriptions[0], hasActivePayment });

}


const PricePage: React.FC = () => {

  const [billingType, setBillingType] = useState<"monthly" | "annually">("annually");

  interface LoaderData {
    hasActivePayment: boolean;
    plan: AppSubscription | {name: string};
  }

const { hasActivePayment, plan } :LoaderData  = useLoaderData();
  console.log(plan)

  useEffect(() => {
    if (plan.name === "Monthly subscription") {
      setBillingType("monthly");
    } else {
      setBillingType("annually");
    }

  }
  , [plan.name]);
  let navigate = useNavigate()

  // @ts-ignore
  // @ts-ignore
  return (
    <Page title="Pricing">


      {/* Grid for toggle and pricing plans */}
      <Grid>
        {/* Billing Toggle positioned at the right */}
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 12, xl: 12}}>
          <div style={{display: "flex", justifyContent: "flex-end", marginBottom: "1rem"}}>
            <ButtonGroup variant="segmented">
              <Button
                pressed={billingType === "monthly"}
                onClick={() => setBillingType("monthly")}
              >
                Billed Monthly
              </Button>
              <Button
                pressed={billingType === "annually"}
                onClick={() => setBillingType("annually")}
              >
                Billed Annually
              </Button>
            </ButtonGroup>
          </div>
        </Grid.Cell>


        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 12, xl: 12}}>
          {hasActivePayment ? <CalloutCard title="Change Your Plan" illustration=""
                                           primaryAction={{content: "Cancel Plan", onAction() {

                                               // @ts-ignore
                                               document.getElementById('cancel-modal')!.show();
                                             }
                                           }}>

              Your are currently on {plan.name} plan. You can change your plan anytime.

            </CalloutCard> :
            <CalloutCard title="Upgrade Your Plan" illustration=""
                         primaryAction={{content: "Upgrade Plan", url: `/app/upgrade?plan=${billingType}`}}>

              Your are currently on {plan.name} plan. Upgrade to unlock more features.

            </CalloutCard>
          }


        </Grid.Cell>


        {/* Pricing Cards */}
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
          <PricingCard
            title="Free"
            price="$0"
            description="You are on Free Plan"
            features={[
              "✔️ BrandMark Helpy",
              "✔️ Two Icons",
              "✔️ Limited Design changes",
              "✔️ Icons with border",
              "✔️ Animations",
              "❌ Unlimited Icons",
              "❌ Custom Icon colors",
              "❌ Unlock All positions",
              "❌ Multi Position",
              "❌ Custom Style",
              "❌ Design Bar",
            ]}
            cardBackground={plan.name === "Free Plan" ? "bg-surface-success" : "bg-surface"}
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
          {hasActivePayment ? <PricingCard
            title={billingType === "annually" ? "Premium (Annually)" : "Premium (Monthly)"}
            price={billingType === "annually" ? "$30" : "$2.99"}
            description="7 days free trial, No Credit card required"
            features={[
              "✔️ Remove BrandMark Helpy",
              "✔️ Unlimited Icons",
              "✔️ Custom Icon colors",
              "✔️ Unlock All positions",
              "✔️ Tooltip (Mouse Hover text)",
              "✔️ Multi Position",
              "✔️ Custom Visibility",
              "✔️ Custom Style",
              "✔️ Design Bar",
              "✔️ 24/7 instant Support",
            ]}
            cardBackground={plan.name === "Monthly subscription" && billingType === "monthly" ? "bg-surface-success" : (plan.name === "Annual subscription" && billingType === "annually") ? "bg-surface-success" : "bg-surface"}
            isPrimary
            badgeText={billingType === "annually" ? "30% Discount applied" : ""}
          /> : <PricingCard
            title={billingType === "annually" ? "Premium (Annually)" : "Premium (Monthly)"}
            price={billingType === "annually" ? "$30" : "$2.99"}
            description="7 days free trial, No Credit card required"
            features={[
              "✔️ Remove BrandMark Helpy",
              "✔️ Unlimited Icons",
              "✔️ Custom Icon colors",
              "✔️ Unlock All positions",
              "✔️ Tooltip (Mouse Hover text)",
              "✔️ Multi Position",
              "✔️ Custom Visibility",
              "✔️ Custom Style",
              "✔️ Design Bar",
              "✔️ 24/7 instant Support",
            ]}
            buttonText="Start with Pro"
            buttonUrl={`/app/upgrade?plan=${billingType}`}
            isPrimary
            badgeText={billingType === "annually" ? "30% Discount applied" : ""}
          />}

        </Grid.Cell>
      </Grid>
      <ui-modal id="cancel-modal">


        <p style={{padding: "30px"}}>Your are currently on <strong>{plan.name}</strong> plan.Are you sure to cancel the plan?</p>


        <ui-title-bar title="Cancel Plan">
          <button variant="primary" onClick={() => {
            navigate(`/app/cancel`);
            // @ts-ignore
            document.getElementById('cancel-modal')!.hide();
          }}>Yes
          </button>
          <button onClick={() => {
            // @ts-ignore
            document.getElementById('cancel-modal')!.hide()
          }}>No</button>
        </ui-title-bar>
      </ui-modal>

      <Footer/>
    </Page>
  );
};

export default PricePage;
