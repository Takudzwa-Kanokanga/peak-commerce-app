import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const email = process.argv[2];

if (!email) {
  console.error('Usage: npx ts-node scripts/promoteUser.ts <email>');
  process.exit(1);
}

async function main() {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    });
    console.log('Promoted user to ADMIN:', { id: user.id, email: user.email, role: user.role });
  } catch (err: any) {
    console.error('Error promoting user:', err.message || err);
    process.exit(2);
  } finally {
    await prisma.$disconnect();
  }
}

main();
