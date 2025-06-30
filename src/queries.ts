import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const user1Email = `alice${Date.now()}@prisma.io`;
  const user2Email = `bob${Date.now()}@prisma.io`;

  // Création des utilisateurs sans posts
  const user1 = await prisma.user.create({
    data: {
      email: user1Email,
      name: 'Alice',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: user2Email,
      name: 'Bob',
    },
  });

  console.log(`Created users: ${user1.name} and ${user2.name}`);

  // Recherche utilisateur par email
  const findUser1 = await prisma.user.findUnique({
    where: { email: user1Email },
  });
  console.log(`Found user1: ${JSON.stringify(findUser1)}`);

  const findUser2 = await prisma.user.findUnique({
    where: { email: user2Email },
  });
  console.log(`Found user2: ${JSON.stringify(findUser2)}`);
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
