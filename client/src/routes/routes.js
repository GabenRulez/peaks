// ALL APPLICATION ROUTES ARE DEFINED HERE
import LoginPage from '../components/LoginPage/LoginPage';
import LandingPage from '../components/LandingPage/LandingPage';
import UserPage from '../components/User/UserPage';
import EditUser from '../components/User/EditUser/EditUser';
import PeakPage from '../components/Peak/PeakPage';

export const protectedRoutes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '/profile',
    exact: true,
    component: UserPage,
  },
  {
    path: '/profile/edit',
    exact: true,
    component: EditUser,
  },
  {
    path: '/peaks/:id',
    exact: true,
    component: PeakPage,
  },
];

export const openRoutes = [
  {
    path: '/login',
    component: LoginPage,
  },
];
