import {
  ADDPOST_ROUTE,
  FULLPOST_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  UPDATEPOST_ROUTE,
} from './utils/constant';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

export const authRoutes = [
  {
    path: ADDPOST_ROUTE,
    element: AddPost,
  },
  {
    path: UPDATEPOST_ROUTE + '/:id',
    element: AddPost,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    element: Home,
  },
  {
    path: FULLPOST_ROUTE + '/:id',
    element: FullPost,
  },
  {
    path: LOGIN_ROUTE,
    element: Login,
  },
  {
    path: REGISTER_ROUTE,
    element: Registration,
  },
];
