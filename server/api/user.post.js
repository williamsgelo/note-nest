// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   await prisma.user.create({
//     data: {
//       email: body.email,
//       password: body.password,
//     },
//   });

//   return { data: "User registration endpoint" };
// });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(body.password, salt);

  // sends to database for reference
  await prisma.user.create({
    data: {
      email: body.email,
      password: passwordHash,
      salt: salt,
    },
  });

  return { data: "User registration endpoint" };
});
