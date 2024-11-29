import {createShopInfo, getShopInfo, updateShopInfo} from "../models/shopInfo.server";

// @ts-ignore
import type {AdminApiContext, Session} from '@shopify/shopify-app-remix';
import fetchShopInfo from "../graphql/fetchShopInfo.server";


export const saveShopInfo = async (session: Session, admin: AdminApiContext) => {

  try {
    const currentShopInfo = await getShopInfo(session.shop);
    // console.log(`current shop info - ${currentShopInfo}`);

    // Get shop info from Shopify using GraphQL
    const shopInfo = await fetchShopInfo(admin);

    // console.log(`shop info - ${shopInfo}`);

    // If shop info is not found, throw error
    if (!shopInfo) {
      throw new Error("No shop info found");
    }

    const shopData = {
      name: shopInfo.name,
      email: shopInfo.email,
      contactEmail: shopInfo.contactEmail,
      phone: shopInfo.billingAddress.phone,
      shopOwnerName: shopInfo.shopOwnerName,
      url: shopInfo.url,
      myshopifyDomain: shopInfo.myshopifyDomain,
      address: shopInfo.billingAddress.address1 + ' ' + shopInfo.billingAddress.address2 + shopInfo.billingAddress.city + ' ' + shopInfo.billingAddress.country,
      country: shopInfo.billingAddress.country,
      shopDetail: shopInfo,
    };

    // If current shop info is found, update it
    if (currentShopInfo) {
      return await updateShopInfo(currentShopInfo.id, shopData);
    }
    // If current shop info is not found, create it
    return await createShopInfo({
      ...shopData
    });
  } catch (error) {
    throw error;
  }
};


