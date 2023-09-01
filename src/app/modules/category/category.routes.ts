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

router.get('/', CategoriesController.getAllCategoriesFromDB);
router.get('/:id', CategoriesController.getCategoryById);

// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoriesController.updateOneCategoryIntoDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoriesController.deleteCategoryFromDB
);

export const CategoriesRoutes = router;
