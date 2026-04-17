import prisma from '../../config/prisma';
import { Grade, Prisma } from '@prisma/client';
import { CreateGradeInput, UpdateGradeInput } from './grade.schema';

export const gradeRepository = {
  create: async (data: CreateGradeInput): Promise<Grade> => {
    return prisma.grade.create({ data });
  },

  findAll: async (params?: { where?: Prisma.GradeWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;

    if (skip === undefined || take === undefined) {
      const data = await prisma.grade.findMany({
        where,
        include: {
          student: { select: { id: true, name: true, nis: true } },
          subject: { select: { id: true, name: true } },
        },
        orderBy: { finalScore: 'desc' },
      });
      return { data, total: data.length };
    }

    const [data, total] = await prisma.$transaction([
      prisma.grade.findMany({
        where,
        skip,
        take,
        include: {
          student: { select: { id: true, name: true, nis: true } },
          subject: { select: { id: true, name: true } },
        },
        orderBy: { finalScore: 'desc' },
      }),
      prisma.grade.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string): Promise<Grade | null> => {
    return prisma.grade.findUnique({
      where: { id },
      include: {
        student: { select: { id: true, name: true } },
        subject: { select: { id: true, name: true } },
      },
    });
  },

  update: async (id: string, data: UpdateGradeInput): Promise<Grade> => {
    return prisma.grade.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Grade> => {
    return prisma.grade.delete({
      where: { id },
    });
  },
  
  checkExists: async (studentId: string, subjectId: string) => {
    return prisma.grade.findUnique({
      where: {
        studentId_subjectId: {
          studentId,
          subjectId,
        },
      },
    });
  }
};
