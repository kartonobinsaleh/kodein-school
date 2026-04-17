import prisma from '../config/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const users = await prisma.user.findMany();
  console.log('Current users:', users.map(u => ({ email: u.email, role: u.role })));

  if (users.length === 0) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@kodein.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('Created default admin:', admin.email);
  } else {
    console.log('User list is not empty.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
