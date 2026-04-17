import prisma from '../config/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const adminEmail = 'admin@kodein.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Created default admin:', admin.email);
  } else {
    console.log('ℹ️ Admin already exists:', adminEmail);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
