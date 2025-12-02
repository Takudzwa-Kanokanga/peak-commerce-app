require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const email = process.argv[2];

if (!email) {
  console.error('Usage: node scripts/promoteUser.js <email>');
  process.exit(1);
}

(async () => {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    console.log('Promoted user to ADMIN:', { id: user.id, email: user.email, role: user.role });
  } catch (err) {
    console.error('Error promoting user:', err && err.message ? err.message : err);
    process.exit(2);
  } finally {
    await prisma.$disconnect();
  }
})();
