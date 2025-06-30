// src/scripts/caching.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const startTime = performance.now();

  const cachedUsers = await prisma.user.findMany({
    where: {
      email: { contains: "alice" },
    },
    cacheStrategy: {
      swr: 30, // seconds: revalidates stale cache
      ttl: 60, // seconds: time-to-live in cache
    },
  });

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;

  console.log(`Query took ${elapsedTime.toFixed(2)}ms.`);
  console.log(`Results:\n`, cachedUsers);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
