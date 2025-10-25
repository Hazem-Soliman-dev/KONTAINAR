import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Loadable from '../layouts/shared/loadable/Loadable.jsx';

import { SystemRoutes } from './SystemRouter.jsx';
import { suppliersRoutes } from './SuppliersRouter.jsx';
import { mainStoreRoutes } from './MainStoreRouter.jsx';
import { subStoresRoutes } from './SubStoresRouter.jsx';

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('../layouts/shared/BlankLayout.jsx')));

// Platform Selector
const PlatformSelector = Loadable(lazy(() => import('../views/PlatformSelector.jsx')));

// Authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login.jsx')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2.jsx')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register.jsx')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2.jsx')));
const ForgotPassword = Loadable(
  lazy(() => import('../views/authentication/auth1/ForgotPassword.jsx')),
);
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2.jsx')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps.jsx')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2.jsx')));
const Error = Loadable(lazy(() => import('../views/authentication/Error.jsx')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance.jsx')));

const MainRouter = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [{ path: '/', element: <PlatformSelector /> }],
  },

  // Authentication routes
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/auth/error', element: <Error /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },

  // System routes
  ...SystemRoutes,

  // Suppliers routes
  ...suppliersRoutes,

  // Main Store routes
  ...mainStoreRoutes,

  // Sub Stores routes
  ...subStoresRoutes,

  {
    path: '*',
    element: <Error />,
  },
];

export default createBrowserRouter(MainRouter);
