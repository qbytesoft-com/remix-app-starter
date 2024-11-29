import prisma from "../db.server";
import type {shopInfo, Prisma} from "@prisma/client";

export type { shopInfo } from "@prisma/client";

export async function getShopInfo(name: string): Promise<shopInfo | null> {
  return prisma.shopInfo.findFirst({ where: { name } });
}


export async function getShopInfos(): Promise<shopInfo[]> {
  return prisma.shopInfo.findMany();
}

export async function createShopInfo(data: Prisma.shopInfoCreateInput): Promise<shopInfo> {
  return prisma.shopInfo.create({ data });
}

export async function updateShopInfo(id: bigint, data: Prisma.shopInfoUpdateInput): Promise<shopInfo> {
  return prisma.shopInfo.update({ where: { id }, data });
}

export async function deleteShopInfo(id: number): Promise<shopInfo> {
  return prisma.shopInfo.delete({ where: { id } });
}




