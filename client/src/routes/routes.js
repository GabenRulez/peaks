// ALL APPLICATION ROUTES ARE DEFINED HERE
import LoginPage from '../components/LoginPage/LoginPage';
import LandingPage from '../components/LandingPage/LandingPage';
import UserPage from '../components/User/UserPage';
import EditUser from '../components/User/EditUser/EditUser';
import Chat from '../components/Chat/Chat';

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
    path: '/messages',
    exact: false,
    component: Chat,
  },
];

export const openRoutes = [
  {
    path: '/login',
    component: LoginPage,
  },
];
