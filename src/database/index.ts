import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("Connected to database 👍");
  })
  .catch((error) => {
    console.log("Error connecting to database 👎");
    console.log(error);
  });

export default prisma;
