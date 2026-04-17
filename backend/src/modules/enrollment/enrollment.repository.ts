import prisma from '../../config/prisma';
import { Enrollment } from '@prisma/client';
import { CreateEnrollmentInput } from './enrollment.schema';

export const enrollmentRepository = {
  create: async (data: CreateEnrollmentInput): Promise<Enrollment> => {
    return prisma.enrollment.create({ data });
  },

  findAll: async (): Promise<Enrollment[]> => {
    return prisma.enrollment.findMany({
      include: {
        student: { select: { id: true, name: true, nis: true } },
        course: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  findById: async (id: string): Promise<Enrollment | null> => {
    return prisma.enrollment.findUnique({
      where: { id },
    });
  },

  delete: async (id: string): Promise<Enrollment> => {
    return prisma.enrollment.delete({
      where: { id },
    });
  },
  
  checkExists: async (studentId: string, courseId: string) => {
    return prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });
  }
};
