import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await prisma.user.create({
    data: {
      // Use 'data' instead of 'body'
      email: body.email,
      password: body.password,
    },
  });

  return { data: "User registration endpoint" };
});
