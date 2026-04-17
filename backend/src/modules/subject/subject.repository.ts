import prisma from '../../config/prisma';
import { Subject, Prisma } from '@prisma/client';
import { CreateSubjectInput, UpdateSubjectInput } from './subject.schema';

export const subjectRepository = {
  create: async (data: CreateSubjectInput): Promise<Subject> => {
    return prisma.subject.create({ data });
  },

  findAll: async (params?: { where?: Prisma.SubjectWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;

    if (skip === undefined || take === undefined) {
      const data = await prisma.subject.findMany({
        where,
        orderBy: { name: 'asc' },
      });
      return { data, total: data.length };
    }

    const [data, total] = await prisma.$transaction([
      prisma.subject.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
      }),
      prisma.subject.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string): Promise<Subject | null> => {
    return prisma.subject.findUnique({
      where: { id },
    });
  },

  update: async (id: string, data: UpdateSubjectInput): Promise<Subject> => {
    return prisma.subject.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Subject> => {
    return prisma.subject.delete({
      where: { id },
    });
  },
};
