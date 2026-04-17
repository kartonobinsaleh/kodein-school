import prisma from '../../config/prisma';
import { Course, Prisma } from '@prisma/client';
import { CreateCourseInput, UpdateCourseInput } from './course.schema';

export const courseRepository = {
  create: async (data: CreateCourseInput): Promise<Course> => {
    return prisma.course.create({ data });
  },

  findAll: async (params?: { where?: Prisma.CourseWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;

    if (skip === undefined || take === undefined) {
      const data = await prisma.course.findMany({
        where,
        include: {
          subject: true,
          mentor: { select: { id: true, email: true } },
        },
        orderBy: { title: 'asc' },
      });
      return { data, total: data.length };
    }

    const [data, total] = await prisma.$transaction([
      prisma.course.findMany({
        where,
        skip,
        take,
        include: {
          subject: true,
          mentor: { select: { id: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string): Promise<Course | null> => {
    return prisma.course.findUnique({
      where: { id },
      include: {
        subject: true,
        mentor: { select: { id: true, email: true } },
        enrollments: { include: { student: { include: { user: { select: { email: true } } } } } },
      },
    });
  },

  findBySubjectAndMentor: async (subjectId: string, mentorId: string): Promise<Course | null> => {
    return prisma.course.findFirst({
      where: { subjectId, mentorId }
    });
  },

  update: async (id: string, data: UpdateCourseInput): Promise<Course> => {
    return prisma.course.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Course> => {
    return prisma.course.delete({
      where: { id },
    });
  },
};
