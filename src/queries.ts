// src/scripts/seed.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const user1Email = `alice${Date.now()}@prisma.io`;
  const user2Email = `bob${Date.now()}@prisma.io`;

  // Création des utilisateurs avec mot de passe obligatoire
  const user1 = await prisma.user.create({
    data: {
      email: user1Email,
      name: 'Alice',
      password: 'hashed_dummy_password_1', // remplacer par un vrai hash
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: user2Email,
      name: 'Bob',
      password: 'hashed_dummy_password_2',
    },
  });

  console.log(`Created users: ${user1.email} and ${user2.email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
