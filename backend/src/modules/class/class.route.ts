import { Router } from 'express';
import { classController } from './class.controller';
import { validate } from '../../middleware/validate.middleware';
import { createClassSchema, updateClassSchema } from './class.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve classes
router.get('/', authenticate, classController.getAll);
router.get('/search', authenticate, classController.search);
router.get('/:id', authenticate, classController.getById);

// Create, Update, Delete classes (Admin only)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(createClassSchema),
  classController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateClassSchema),
  classController.update
);

router.delete('/:id', authenticate, authorize('ADMIN'), classController.delete);

export default router;
