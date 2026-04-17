import prisma from '../../config/prisma';
import { Activity, Prisma } from '@prisma/client';
import { CreateActivityInput, UpdateActivityInput } from './activity.schema';

export const activityRepository = {
  create: async (data: CreateActivityInput): Promise<Activity> => {
    return prisma.activity.create({ data });
  },

  findAll: async (params?: { where?: Prisma.ActivityWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;

    if (skip === undefined || take === undefined) {
      const data = await prisma.activity.findMany({
        where,
        include: {
          course: { select: { id: true, title: true } },
        },
        orderBy: { title: 'asc' },
      });
      return { data, total: data.length };
    }

    const [data, total] = await prisma.$transaction([
      prisma.activity.findMany({
        where,
        skip,
        take,
        include: {
          course: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.activity.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string): Promise<Activity | null> => {
    return prisma.activity.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, title: true } },
        submissions: true,
      },
    });
  },

  update: async (id: string, data: UpdateActivityInput): Promise<Activity> => {
    return prisma.activity.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Activity> => {
    return prisma.activity.delete({
      where: { id },
    });
  },
};
