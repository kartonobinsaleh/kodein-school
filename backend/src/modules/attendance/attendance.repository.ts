import prisma from '../../config/prisma';
import { Attendance, Prisma } from '@prisma/client';
import { CreateAttendanceInput, UpdateAttendanceInput } from './attendance.schema';

export const attendanceRepository = {
  create: async (data: CreateAttendanceInput): Promise<Attendance> => {
    return prisma.attendance.create({ data });
  },

  findAll: async (params?: { where?: Prisma.AttendanceWhereInput; skip?: number; take?: number }) => {
    const where = params?.where || {};
    const skip = params?.skip;
    const take = params?.take;

    if (skip === undefined || take === undefined) {
      const data = await prisma.attendance.findMany({
        where,
        include: {
          student: { select: { id: true, name: true, nis: true } },
        },
        orderBy: [
          { date: 'desc' },
          { student: { name: 'asc' } }
        ],
      });
      return { data, total: data.length };
    }

    const [data, total] = await prisma.$transaction([
      prisma.attendance.findMany({
        where,
        skip,
        take,
        include: {
          student: { select: { id: true, name: true, nis: true } },
        },
        orderBy: [
          { date: 'desc' },
          { student: { name: 'asc' } }
        ],
      }),
      prisma.attendance.count({ where }),
    ]);

    return { data, total };
  },

  findById: async (id: string): Promise<Attendance | null> => {
    return prisma.attendance.findUnique({
      where: { id },
      include: {
        student: { select: { id: true, name: true } },
      },
    });
  },

  update: async (id: string, data: UpdateAttendanceInput): Promise<Attendance> => {
    return prisma.attendance.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Attendance> => {
    return prisma.attendance.delete({
      where: { id },
    });
  },
  
  checkExists: async (studentId: string, date: Date) => {
    return prisma.attendance.findUnique({
      where: {
        studentId_date: {
          studentId,
          date,
        },
      },
    });
  }
};
