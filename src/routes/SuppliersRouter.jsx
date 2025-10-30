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

// Products Components
const ProductsList = Loadable(
  lazy(() => import('../views/suppliers/products/list/ProductsList.jsx')),
);
const ProductsCategories = Loadable(
  lazy(() => import('../views/suppliers/products/categories/ProductsCategories.jsx')),
);
const ProductsStatistics = Loadable(
  lazy(() => import('../views/suppliers/products/statistics/ProductsStatistics.jsx')),
);
const AddProduct = Loadable(lazy(() => import('../views/suppliers/products/add/AddProduct.jsx')));
const ProductDetails = Loadable(
  lazy(() => import('../views/suppliers/products/details/ProductDetails.jsx')),
);
const EditProduct = Loadable(
  lazy(() => import('../views/suppliers/products/edit/EditProduct.jsx')),
);

// Orders Components
const OrdersNew = Loadable(lazy(() => import('../views/suppliers/orders/new/OrdersNew.jsx')));
const OrdersHistory = Loadable(
  lazy(() => import('../views/suppliers/orders/history/OrdersHistory.jsx')),
);
const OrdersTracking = Loadable(
  lazy(() => import('../views/suppliers/orders/tracking/OrdersTracking.jsx')),
);
const OrderDetails = Loadable(
  lazy(() => import('../views/suppliers/orders/details/OrderDetails.jsx')),
);

// Invoices Components
const InvoicesList = Loadable(
  lazy(() => import('../views/suppliers/invoices/list/InvoicesList.jsx')),
);
const InvoicesPayments = Loadable(
  lazy(() => import('../views/suppliers/invoices/payments/InvoicesPayments.jsx')),
);
const InvoiceDetails = Loadable(
  lazy(() => import('../views/suppliers/invoices/details/InvoiceDetails.jsx')),
);

// Returns Components
const ReturnsList = Loadable(lazy(() => import('../views/suppliers/returns/list/ReturnsList.jsx')));
const ReturnsDamaged = Loadable(
  lazy(() => import('../views/suppliers/returns/damaged/ReturnsDamaged.jsx')),
);
const ReturnDetails = Loadable(
  lazy(() => import('../views/suppliers/returns/details/ReturnDetails.jsx')),
);

// Support & Contract Components
const Support = Loadable(lazy(() => import('../views/suppliers/support/Support.jsx')));
const Contract = Loadable(lazy(() => import('../views/suppliers/contract/Contract.jsx')));

const SuppliersRouter = [
  // Suppliers Routes with FullLayout
  {
    path: '/suppliers',
    element: <SuppliersFullLayout />,
    children: [
      { path: '/suppliers', element: <SuppliersDashboard /> },
      { path: '/suppliers/dashboard', exact: true, element: <SuppliersDashboard /> },

      // ================= Products =================
      {
        path: '/suppliers/products/list',
        element: <ProductsList />,
      },
      {
        path: '/suppliers/products/details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/suppliers/products/add',
        element: <AddProduct />,
      },
      {
        path: '/suppliers/products/edit/:id',
        element: <EditProduct />,
      },
      {
        path: '/suppliers/products/details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/suppliers/products/categories',
        element: <ProductsCategories />,
      },
      {
        path: '/suppliers/products/statistics',
        element: <ProductsStatistics />,
      },

      // ================= Orders =================
      {
        path: '/suppliers/orders/new',
        element: <OrdersNew />,
      },
      {
        path: '/suppliers/orders/history',
        element: <OrdersHistory />,
      },
      {
        path: '/suppliers/orders/tracking',
        element: <OrdersTracking />,
      },
      {
        path: '/suppliers/orders/details/:id',
        element: <OrderDetails />,
      },

      // ================= Invoices =================
      {
        path: '/suppliers/invoices/list',
        element: <InvoicesList />,
      },
      {
        path: '/suppliers/invoices/payments',
        element: <InvoicesPayments />,
      },
      {
        path: '/suppliers/invoices/details/:id',
        element: <InvoiceDetails />,
      },

      // ================= Returns =================
      {
        path: '/suppliers/returns/list',
        element: <ReturnsList />,
      },
      {
        path: '/suppliers/returns/damaged',
        element: <ReturnsDamaged />,
      },
      {
        path: '/suppliers/returns/details/:id',
        element: <ReturnDetails />,
      },

      // ================= Support & Contract =================
      {
        path: '/suppliers/support',
        element: <Support />,
      },
      {
        path: '/suppliers/contract',
        element: <Contract />,
      },
    ],
  },
];

export const suppliersRoutes = SuppliersRouter;
export default createBrowserRouter(SuppliersRouter);
