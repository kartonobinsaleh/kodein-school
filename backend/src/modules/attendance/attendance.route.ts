import { Router } from 'express';
import { attendanceController } from './attendance.controller';
import { validate } from '../../middleware/validate.middleware';
import { createAttendanceSchema, updateAttendanceSchema } from './attendance.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve records
router.get('/', authenticate, attendanceController.getAll);
router.get('/search', authenticate, attendanceController.search);
router.get('/:id', authenticate, attendanceController.getById);

// Insert or modify attendance statuses (Managed by MENTOR or ADMIN)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MENTOR'),
  validate(createAttendanceSchema),
  attendanceController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MENTOR'),
  validate(updateAttendanceSchema),
  attendanceController.update
);

router.delete('/:id', authenticate, authorize('ADMIN'), attendanceController.delete);

export default router;
