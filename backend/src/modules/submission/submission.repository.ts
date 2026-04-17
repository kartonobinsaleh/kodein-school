import prisma from '../../config/prisma';
import { Submission, Prisma } from '@prisma/client';
import { CreateSubmissionInput, UpdateSubmissionInput } from './submission.schema';

export const submissionRepository = {
  create: async (data: CreateSubmissionInput): Promise<Submission> => {
    return prisma.submission.create({ data });
  },

  findAll: async (params?: { where?: Prisma.SubmissionWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;

    if (skip === undefined || take === undefined) {
      const data = await prisma.submission.findMany({
        where,
        include: {
          activity: { select: { id: true, title: true } },
          student: { select: { id: true, name: true, nis: true } },
        },
        orderBy: { submittedAt: 'desc' },
      });
      return { data, total: data.length };
    }

    const [data, total] = await prisma.$transaction([
      prisma.submission.findMany({
        where,
        skip,
        take,
        include: {
          activity: { select: { id: true, title: true } },
          student: { select: { id: true, name: true, nis: true } },
        },
        orderBy: { submittedAt: 'desc' },
      }),
      prisma.submission.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string): Promise<Submission | null> => {
    return prisma.submission.findUnique({
      where: { id },
      include: {
        activity: { select: { id: true, title: true, courseId: true } },
        student: { select: { id: true, name: true } },
      },
    });
  },

  update: async (id: string, data: UpdateSubmissionInput): Promise<Submission> => {
    return prisma.submission.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Submission> => {
    return prisma.submission.delete({
      where: { id },
    });
  },
  
  checkExists: async (activityId: string, studentId: string) => {
    return prisma.submission.findUnique({
      where: {
        activityId_studentId: {
          activityId,
          studentId,
        },
      },
    });
  }
};
