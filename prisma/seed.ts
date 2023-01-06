import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  // await prisma.template.create({
  //   data: {
  //     title: "Default",
  //     description: "Default template",
  //     html: `<h1 class="text-2xl text-pink-600">Template 3</h1>`,
  //     userId: user.id,
  //   },
  // });

  // await prisma.template.create({
  //   data: {
  //     title: "Default 3",
  //     description: "Default template 3",
  //     html: `<h1 class="text-2xl text-orange-600">Template 3</h1>`,
  //     userId: user.id,
  //   },
  // });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
