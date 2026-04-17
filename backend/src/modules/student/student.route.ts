import { Router } from 'express';
import { studentController } from './student.controller';
import { validate } from '../../middleware/validate.middleware';
import { createStudentSchema, updateStudentSchema } from './student.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve students (ADMIN and MENTOR can view)
router.get('/', authenticate, authorize('ADMIN', 'MENTOR'), studentController.getAll);
router.get('/search', authenticate, authorize('ADMIN', 'MENTOR'), studentController.search);
router.get('/:id', authenticate, authorize('ADMIN', 'MENTOR'), studentController.getById);

// Create, Update, Delete students (ADMIN only)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(createStudentSchema),
  studentController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateStudentSchema),
  studentController.update
);

router.delete('/:id', authenticate, authorize('ADMIN'), studentController.delete);

export default router;
