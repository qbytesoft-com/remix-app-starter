import React from "react";
import { Layout, Text, Link, Box } from "@shopify/polaris";

export default function Footer() {
  return (
    <Layout.Section>
      <Box as="section">
        <Text as="span" alignment="center" variant="headingMd">
          Created by{" "}
          <Link external target="_blank" url="https://www.qbytesoft.com">
            Qbytesoft
          </Link>{" "}
          with ❤️
        </Text>
      </Box>
    </Layout.Section>
  );
}
