import prisma from '../../config/prisma';
import { Student, Prisma } from '@prisma/client';
import { CreateStudentInput, UpdateStudentInput } from './student.schema';
import bcrypt from 'bcrypt';

export const studentRepository = {
  create: async (data: CreateStudentInput): Promise<Student> => {
    const { email, password, name, nis, nisn, classId } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'STUDENT',
        },
      });

      return tx.student.create({
        data: {
          userId: user.id,
          name,
          nis,
          nisn,
          classId,
        },
        include: { user: true, class: true },
      });
    });
  },

  /**
   * Optimized to support both Full List and Paginated List
   */
  findAll: async (params?: { where?: Prisma.StudentWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;
    
    // If no pagination provided, return all but with count
    if (skip === undefined || take === undefined) {
      const data = await prisma.student.findMany({
        where,
        include: {
          user: { select: { email: true, role: true } },
          class: true,
        },
        orderBy: { name: 'asc' }, // Always sort names alphabetically for dropdowns
      });
      return { data, total: data.length };
    }

    // Otherwise, perform paginated search
    const [data, total] = await prisma.$transaction([
      prisma.student.findMany({
        where,
        skip,
        take,
        include: {
          user: { select: { email: true, role: true } },
          class: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.student.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string): Promise<Student | null> => {
    return prisma.student.findUnique({
      where: { id },
      include: {
        user: { select: { email: true, role: true } },
        class: true,
      },
    });
  },

  update: async (id: string, data: UpdateStudentInput): Promise<Student> => {
    return prisma.student.update({
      where: { id },
      data,
      include: { user: true, class: true },
    });
  },

  delete: async (id: string): Promise<Student> => {
    const student = await prisma.student.findUnique({ where: { id } });
    if (student) {
       await prisma.user.delete({ where: { id: student.userId } });
    }
    return student as Student;
  },
  
  checkEmailExists: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  }
};
