import prisma from '../../config/prisma';
import { User, Prisma } from '@prisma/client';

export const userRepository = {
  create: async (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data });
  },

  findAll: async (params?: { where?: Prisma.UserWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;

    const [data, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  },

  update: async (id: string, data: Partial<User>) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};
