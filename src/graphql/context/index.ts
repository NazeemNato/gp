import { PrismaClient } from "@prisma/client";

type Response = {
  userId: number;
  username: string;
}
export interface Context {
  authenticated: Response | null;
  prisma: PrismaClient;
}
