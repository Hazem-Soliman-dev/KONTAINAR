import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Loadable from '../layouts/shared/loadable/Loadable.jsx';

/* ***Layouts**** */
const SuppliersFullLayout = Loadable(
  lazy(() => import('../layouts/suppliers/full/FullLayout.jsx')),
);

/* ****Pages***** */
const SuppliersDashboard = Loadable(
  lazy(() => import('../views/suppliers/dashboard/dashboard.jsx')),
);

const SuppliersRouter = [
  // Suppliers Routes with FullLayout
  {
    path: '/suppliers',
    element: <SuppliersFullLayout />,
    children: [
      { path: '/suppliers', element: <SuppliersDashboard /> },
      { path: '/suppliers/dashboard', exact: true, element: <SuppliersDashboard /> },
    ],
  },
];

export const suppliersRoutes = SuppliersRouter;
export default createBrowserRouter(SuppliersRouter);
