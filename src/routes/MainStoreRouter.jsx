import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Loadable from '../layouts/shared/loadable/Loadable.jsx';

/* ***Layouts**** */
const MainStoreFullLayout = Loadable(
  lazy(() => import('../layouts/main-store/full/FullLayout.jsx')),
);

/* ****Pages***** */
const MainStoreDashboard = Loadable(
  lazy(() => import('../views/main-store/dashboard/dashboard.jsx')),
);

const MainStoreRouter = [
  // Main Store Routes with FullLayout
  {
    path: '/main-store',
    element: <MainStoreFullLayout />,
    children: [
      { path: '/main-store', element: <MainStoreDashboard /> },
      { path: '/main-store/dashboard', exact: true, element: <MainStoreDashboard /> },
    ],
  },
];

export const mainStoreRoutes = MainStoreRouter;
export default createBrowserRouter(MainStoreRouter);
