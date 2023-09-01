import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { CategoriesRoutes } from '../modules/category/category.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/categories',
    routes: CategoriesRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
