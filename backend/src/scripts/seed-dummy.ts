import prisma from '../config/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  // Create Mentor
  const mentor = await prisma.user.upsert({
    where: { email: 'mentor@kodein.com' },
    update: {},
    create: {
      email: 'mentor@kodein.com',
      password: hashedPassword,
      role: 'MENTOR',
    },
  });
  console.log('Mentor ready:', mentor.email);

  // Create Student User + Student Profile
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@kodein.com' },
    update: {},
    create: {
      email: 'student@kodein.com',
      password: hashedPassword,
      role: 'STUDENT',
    },
  });
  
  await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      name: 'Budi Santoso',
      nis: '2024001',
      nisn: '1234567890',
    }
  });
  console.log('Student ready:', studentUser.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
