import prisma from "./client";

prisma
  .$connect()
  .then(() => {
    console.log("Connected to database 👍")
  })
  .catch((error: any) => {
    console.log('Error connecting to database 👎', error)
  })