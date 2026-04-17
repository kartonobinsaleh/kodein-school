import prisma from '../config/prisma';
import bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 Starting dummy seeding process...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. CLEAR EXISTING DATA (Optional, adjust as needed)
  await prisma.grade.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.course.deleteMany();
  await prisma.student.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Previous records cleared.');

  // 2. CREATE MASTER DATA (Subjects)
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: 'Full-Stack Javascript' } }),
    prisma.subject.create({ data: { name: 'DevOps & Cloud' } }),
    prisma.subject.create({ data: { name: 'Artificial Intelligence' } }),
  ]);
  console.log(`✅ ${subjects.length} Subjects created.`);

  // 3. CREATE MENTORS
  const mentorUser = await prisma.user.create({
    data: {
      email: 'mentor@kodein.com',
      password: hashedPassword,
      role: 'MENTOR',
    },
  });
  console.log('✅ Main Mentor ready: mentor@kodein.com');

  // 4. CREATE COURSES
  const course1 = await prisma.course.create({
    data: {
      title: 'ADVANCED NEXT.JS ARCHITECTURE',
      subjectId: subjects[0].id,
      mentorId: mentorUser.id,
    },
  });
  const course2 = await prisma.course.create({
    data: {
      title: 'PRISMA & POSTGRES MASTERY',
      subjectId: subjects[1].id,
      mentorId: mentorUser.id,
    },
  });
  console.log('✅ 2 Courses generated.');

  // 5. CREATE STUDENTS (Massive 25-Record Seeding for Pagination Test)
  console.log('⏳ Generating 25 Scholars for pagination testing...');
  for (let i = 1; i <= 25; i++) {
    const email = `scholar${i}@kodein.com`;
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'STUDENT',
      },
    });

    const student = await prisma.student.create({
      data: {
        userId: user.id,
        name: `Scholar Apprentice ${i}`,
        nis: `20240${String(i).padStart(2, '0')}`,
        nisn: `12345678${String(i).padStart(2, '0')}`,
      },
    });

    // Random Attendance status
    await prisma.attendance.create({
      data: {
        studentId: student.id,
        status: i % 3 === 0 ? 'ABSENT' : 'PRESENT',
        date: new Date(),
      },
    });
  }
  console.log('✅ 25 Scholars & Attendance records ready.');

  // 6. CREATE ACTIVITIES
  const activity = await prisma.activity.create({
    data: {
      title: 'FINAL PROJECT: SIS DASHBOARD',
      description: 'Build a production-ready dashboard using our new search toolbar patterns.',
      type: 'PROJECT',
      courseId: course1.id,
    },
  });
  console.log('✅ Activity "SIS Dashboard" added.');

  console.log('\n✨ Database seeding completed successfully! ✨');
  console.log('🔑 Use "password123" for all users.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
