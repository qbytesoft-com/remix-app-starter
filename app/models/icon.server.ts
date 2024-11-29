import prisma from "../db.server";
import type {Icon} from "@prisma/client";

export type { Icon} from "@prisma/client";

export async function getIcon(id: number): Promise<Icon | null> {
  return prisma.icon.findUnique({ where: { id } });
}

export async function getIcons(): Promise<Icon[]> {
  return prisma.icon.findMany();
}

export async function createIcon(data: Icon): Promise<Icon> {
  return prisma.icon.create({ data });
}

export async function updateIcon(id: number, data: Icon): Promise<Icon> {
  return prisma.icon.update({ where: { id }, data });
}

export async function deleteIcon(id: number): Promise<Icon> {
  return prisma.icon.delete({ where: { id } });
}






