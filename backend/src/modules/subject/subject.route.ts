import { Router } from 'express';
import { subjectController } from './subject.controller';
import { validate } from '../../middleware/validate.middleware';
import { createSubjectSchema, updateSubjectSchema } from './subject.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve subjects (All logged-in users typically can view subjects)
router.get('/', authenticate, subjectController.getAll);
router.get('/:id', authenticate, subjectController.getById);

// Create, Update, Delete subjects (Admin normally manages master data)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(createSubjectSchema),
  subjectController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateSubjectSchema),
  subjectController.update
);

router.delete('/:id', authenticate, authorize('ADMIN'), subjectController.delete);

export default router;
