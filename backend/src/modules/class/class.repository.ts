import prisma from '../../config/prisma';
import { Class, Prisma } from '@prisma/client';
import { CreateClassInput, UpdateClassInput } from './class.schema';

export const classRepository = {
  create: async (data: CreateClassInput): Promise<Class> => {
    return prisma.class.create({ data });
  },

  findAll: async (params?: { where?: Prisma.ClassWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;

    if (skip === undefined || take === undefined) {
      const data = await prisma.class.findMany({
        where,
        orderBy: [
          { level: 'asc' },
          { name: 'asc' },
        ],
      });
      return { data, total: data.length };
    }

    const [data, total] = await prisma.$transaction([
      prisma.class.findMany({
        where,
        skip,
        take,
        orderBy: [
          { level: 'asc' },
          { name: 'asc' },
        ],
      }),
      prisma.class.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string): Promise<Class | null> => {
    return prisma.class.findUnique({
      where: { id },
      include: {
        students: true,
      },
    });
  },

  update: async (id: string, data: UpdateClassInput): Promise<Class> => {
    return prisma.class.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Class> => {
    return prisma.class.delete({
      where: { id },
    });
  },
};
