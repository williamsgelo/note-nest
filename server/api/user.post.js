// /api/user POST

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await prisma.user.create({
    body: {
      email: body.email,
      password: body.password, // Ensure to hash the password in a real application
    },
  });
  return { data: "User registration endpoint" };
});
