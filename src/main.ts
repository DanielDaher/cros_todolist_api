import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.update({
  //   where: { id: 1 },
  //   data: {
  //     Task: {
  //       create: { title: 'nova task' }
  //     }
  //    }
  // })

  const allUsers = await prisma.user.findMany({
    include: { Task: true },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
