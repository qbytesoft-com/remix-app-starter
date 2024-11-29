import React from "react";
import {Card, BlockStack, Text, Button, Grid, Listbox, Icon} from "@shopify/polaris";
import {CheckIcon, XSmallIcon} from "@shopify/polaris-icons";
import type {ColorBackgroundAlias} from "@shopify/polaris-tokens";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText?: string;
  buttonAction?: () => void;
  buttonUrl?: string;
  isPrimary?: boolean;
  badgeText?: string;
  cardBackground?: ColorBackgroundAlias;
}

const PricingCard: React.FC<PricingCardProps> = ({
                                                   title,
                                                   price,
                                                   description,
                                                   features,
                                                   buttonText,
                                                   buttonAction,
                                                   buttonUrl,
                                                   isPrimary = false,
                                                   badgeText,
                                                   cardBackground
                                                 }) => {
  return (
    <Card background={cardBackground ? cardBackground : 'bg-surface'}>
      <BlockStack>
        <Text as="h2" variant="headingMd">{title}</Text>
      </BlockStack>
      <BlockStack gap="200">
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
            <BlockStack inlineAlign="baseline">
              <Text as="h3" variant="heading2xl">{price}</Text>
              {badgeText && <Text as="span" tone="success">{badgeText}</Text>}
            </BlockStack>
            <Text as="span">{description}</Text>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
            <Listbox accessibilityLabel="Pricing Plan">
              {features.map((feature, index) => (
                <Listbox.Option value={feature + index} key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon source={price === '$0' ? XSmallIcon : CheckIcon} tone={price === '$0' ? "critical" : "success"} />

                    <span style={{ marginLeft: "0.5rem" }}>{feature}</span>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox>
          </Grid.Cell>
        </Grid>
        {buttonText && (
          <Button
            dataPrimaryLink={isPrimary}
            fullWidth
            onClick={buttonAction}
            url={buttonUrl}
          >
            {buttonText}
          </Button>
        )}
      </BlockStack>
    </Card>
  );
};

export default PricingCard;
