import { attendanceRepository } from './attendance.repository';
import { CreateAttendanceInput, UpdateAttendanceInput } from './attendance.schema';
import { AppError } from '../../middleware/error.middleware';
import { getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const attendanceService = {
  createAttendance: async (input: CreateAttendanceInput) => {
    logger.info(`Creating attendance for student: ${input.studentId} on ${input.date}`);
    
    const existing = await attendanceRepository.checkExists(input.studentId, new Date(input.date));
    if (existing) {
      throw new AppError('Attendance already recorded for this student on this date', 400);
    }
    
    return attendanceRepository.create({
      ...input,
      date: new Date(input.date),
    });
  },

  getAllAttendance: async (page?: string, limit?: string) => {
    if (page || limit) {
      logger.info(`Fetching paginated attendance - Page: ${page}, Limit: ${limit}`);
      const { skip, take, page: p, limit: l } = getPagination(page, limit);
      const { data, total } = await attendanceRepository.findAll({ skip, take });
      return { data, meta: buildMeta(total, p, l) };
    }

    logger.info('Fetching full attendance list');
    const { data, total } = await attendanceRepository.findAll();
    return { data, total };
  },

  getAttendanceById: async (id: string) => {
    const attendance = await attendanceRepository.findById(id);
    if (!attendance) throw new AppError('Attendance record not found', 404);
    return attendance;
  },

  updateAttendance: async (id: string, input: UpdateAttendanceInput) => {
    const attendance = await attendanceRepository.findById(id);
    if (!attendance) throw new AppError('Attendance record not found', 404);
    return attendanceRepository.update(id, input);
  },

  deleteAttendance: async (id: string) => {
    const attendance = await attendanceRepository.findById(id);
    if (!attendance) throw new AppError('Attendance record not found', 404);
    return attendanceRepository.delete(id);
  },
};
