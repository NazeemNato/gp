import { PrismaClient } from "@prisma/client";
export interface Context {
  token: string | string[];
  prisma: PrismaClient;
}
