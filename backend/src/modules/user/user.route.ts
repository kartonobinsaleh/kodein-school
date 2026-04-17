import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// 🛡️ PROTECTED ROUTES: Only ADMIN can manage users
router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/search', userController.search);
router.patch('/:id/role', userController.updateRole);
router.delete('/:id', userController.delete);

export default router;
