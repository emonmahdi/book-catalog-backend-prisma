import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsersFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateOneUserIntoDB
);

export const UserRoutes = router;
