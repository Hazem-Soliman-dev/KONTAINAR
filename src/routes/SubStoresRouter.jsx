import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Loadable from '../layouts/shared/loadable/Loadable.jsx';

/* ***Layouts**** */
const SubStoresFullLayout = Loadable(
  lazy(() => import('../layouts/sub-stores/full/FullLayout.jsx')),
);

/* ****Pages***** */
const SubStoresDashboard = Loadable(
  lazy(() => import('../views/sub-stores/dashboard/dashboard.jsx')),
);

const SubStoresRouter = [
  // Sub Stores Routes with FullLayout
  {
    path: '/sub-stores',
    element: <SubStoresFullLayout />,
    children: [
      { path: '/sub-stores', element: <SubStoresDashboard /> },
      { path: '/sub-stores/dashboard', exact: true, element: <SubStoresDashboard /> },
    ],
  },
];

export const subStoresRoutes = SubStoresRouter;
export default createBrowserRouter(SubStoresRouter);
