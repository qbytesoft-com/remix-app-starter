// @ts-ignore
import type {AdminApiContext} from "@shopify/shopify-app-remix";

async function fetchShopInfo(admin: AdminApiContext) {
  const query = `
  query {
    shop {
    id
    name
    shopOwnerName
    url
    myshopifyDomain
    billingAddress {
      address1
      address2
      formattedArea
      company
      phone
      city
      countryCodeV2
      latitude
      longitude
      country
      coordinatesValidated
      province
      provinceCode
      zip
    }
    email
    description
    customerAccounts
    checkoutApiSupported
    contactEmail
    currencyCode
    orderNumberFormatPrefix
    orderNumberFormatSuffix
    ianaTimezone
    plan {
      displayName
      partnerDevelopment
      shopifyPlus
    }
    primaryDomain {
      host
      id
      url
      localization {
        defaultLocale
        alternateLocales
        country
      }
      sslEnabled
    }

  }
}`;

  const response = await admin.graphql(query);

  const result = await response.json();
  return result.data.shop;
}

export default fetchShopInfo;
