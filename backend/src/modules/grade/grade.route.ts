import { Router } from 'express';
import { gradeController } from './grade.controller';
import { validate } from '../../middleware/validate.middleware';
import { createGradeSchema, updateGradeSchema } from './grade.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve grades
router.get('/', authenticate, gradeController.getAll);
router.get('/:id', authenticate, gradeController.getById);

// Create, Update, Delete grades (Managed by MENTOR or ADMIN)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MENTOR'),
  validate(createGradeSchema),
  gradeController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MENTOR'),
  validate(updateGradeSchema),
  gradeController.update
);

router.delete('/:id', authenticate, authorize('ADMIN'), gradeController.delete);

export default router;
