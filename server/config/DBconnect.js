import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
export const prisma = new PrismaClient({
  log: ["query", "error", "info"],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
prisma.$use(async (params, next) => {
  if (
    (params.model === "User" && params.action === "create") ||
    params.action === "update"
  ) {
    // p
    console.log(params);
    if (!params.args.data.password) {
      return next(params);
    }
    params.args.data.password = await bcrypt.hash(
      params.args.data.password,
      10
    );
  }
  return next(params);
});
const dbConn = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default dbConn;
