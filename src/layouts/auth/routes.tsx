import SignIn from '@/views/auth/SignIn';
import SignUp from '@/views/auth/SignUp';
import ForgotPassword from '@/views/auth/ForgotPassword';
import ResetPassword from '@/views/auth/ResetPassword';

const routes = [
  {
    name: 'Sign in',
    path: '/signin',
    component: SignIn,
  },
  {
    name: 'Sign up',
    path: '/signup',
    component: SignUp,
  },
  {
    name: 'Forgot password',
    path: '/forgot-password',
    component: ForgotPassword,
  },
  {
    name: 'Reset password',
    path: '/reset-password',
    component: ResetPassword,
  },
];

export default routes;
