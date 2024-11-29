import {
  Card,
  Layout,
  Page,
  BlockStack,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import Footer from "../components/Footer";
import AccordionItem from "../components/AccordionItem";

export default function FaqPage() {


  return (
    <Page>
      <TitleBar title="FAQ's" />
      <Layout>
        <Layout.Section>
          <Card>
            <TitleBar title="FAQ's" />

            <BlockStack>
              <div style={{ marginBottom: '16px' }}>
                <Text as="h2" variant="headingMd" fontWeight="bold">
                  Help & Support
                </Text>
              </div>

              {/*Accordion component*/}
              <AccordionItem title="What is Floatic Social Icons?" >
                <ul>
                  <li>
                    Floatic Social Icons is a Shopify App that allows you to add social media icons to your store.
                  </li>
                  <li>
                    You can add icons for <strong>Facebook, Twitter, Instagram, Pinterest,</strong> and more.
                  </li>
                  <li>
                    You can also customize the position and style of the icons.
                  </li>
                </ul>
              </AccordionItem>
              <AccordionItem title="How to Use Floatic Social icons?" >
                <ul>
                  <li>
                    This App is easy to use for any customer. just need to follow the below Steps to get icons to your store.
                  </li>
                  <li>
                    Go to the App &gt; Dashboard
                  </li>
                  <li>
                    Enable the App From Dashboard
                  </li>
                  <li>
                    Add your social media icons which you want from Behavior Tab on dashboard
                  </li>
                  <li>
                    Click on "Save" button
                    Now Go to your store, Social Media bar visible which you created from dashboard
                  </li>
                </ul>
              </AccordionItem>
              <AccordionItem title="How can i change the position of the Floatic Social Icons?">
                <ul>
                  <li>
                    This App is easy to use for any customer. just need to follow the below Steps to get icons to your
                    store.
                  </li>
                  <li>
                    Go to the App &gt; Dashboard
                  </li>
                  <li>
                    Enable the App From Dashboard
                  </li>
                  <li>
                    Add your social media icons which you want from Behavior Tab on dashboard
                  </li>
                  <li>
                    Click on "Save" button
                    Now Go to your store, Social Media bar visible which you created from dashboard
                  </li>
                </ul>
              </AccordionItem>
              <AccordionItem title="How can i add icons that are not available in given list?" >
                <ul>
                  <li>
                    This App is easy to use for any customer. just need to follow the below Steps to get icons to your store.
                  </li>
                  <li>
                    Go to the App &gt; Dashboard
                  </li>
                  <li>
                    Enable the App From Dashboard
                  </li>
                  <li>
                    Add your social media icons which you want from Behavior Tab on dashboard
                  </li>
                  <li>
                    Click on "Save" button
                    Now Go to your store, Social Media bar visible which you created from dashboard
                  </li>
                </ul>
              </AccordionItem>
              <AccordionItem title="What will be the cost for Floatic Social Icons?">
                <p>The installation of this app is<strong> completely free </strong>and you can also Upgrade Premium Plan for More Features.</p>
              </AccordionItem>

            </BlockStack>
          </Card>
        </Layout.Section>


        <Footer/>
      </Layout>
    </Page>
  );
}

