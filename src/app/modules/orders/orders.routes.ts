import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './orders.controller';
import { OrderValidations } from './orders.validations';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllFromDB);
router.get(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getByIdFromDBCustomer
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getByIdFromDB
);

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(OrderValidations.create),
  OrderController.createOrder
);

export const OrderRoutes = router;
