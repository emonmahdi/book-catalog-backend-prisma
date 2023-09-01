import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoriesController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoriesController.insertIntoDB
);

// router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsersFromDB);
// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById);
// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   UserController.updateOneUserIntoDB
// );
// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   UserController.deleteUserFromDB
// );

export const CategoriesRoutes = router;
