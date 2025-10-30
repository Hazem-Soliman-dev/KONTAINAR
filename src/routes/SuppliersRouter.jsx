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

// Orders Components
const OrdersNew = Loadable(lazy(() => import('../views/suppliers/orders/new/OrdersNew.jsx')));
const OrdersHistory = Loadable(
  lazy(() => import('../views/suppliers/orders/history/OrdersHistory.jsx')),
);
const OrdersTracking = Loadable(
  lazy(() => import('../views/suppliers/orders/tracking/OrdersTracking.jsx')),
);

// Invoices Components
const InvoicesList = Loadable(
  lazy(() => import('../views/suppliers/invoices/list/InvoicesList.jsx')),
);
const InvoicesPayments = Loadable(
  lazy(() => import('../views/suppliers/invoices/payments/InvoicesPayments.jsx')),
);

// Returns Components
const ReturnsList = Loadable(lazy(() => import('../views/suppliers/returns/list/ReturnsList.jsx')));
const ReturnsDamaged = Loadable(
  lazy(() => import('../views/suppliers/returns/damaged/ReturnsDamaged.jsx')),
);

// Support & Contract Components
const Support = Loadable(lazy(() => import('../views/suppliers/support/Support.jsx')));
const Contract = Loadable(lazy(() => import('../views/suppliers/contract/Contract.jsx')));

// ====== REUSE SYSTEM COMPONENTS FOR SHARED FUNCTIONALITY ======

// Analytics Components (from System) - adapted for supplier statistics
const SalesReports = Loadable(
  lazy(() => import('../views/system/analytics/sales/SalesReports.jsx')),
);
const InventoryReports = Loadable(
  lazy(() => import('../views/system/analytics/inventory/InventoryReports.jsx')),
);
const CustomerReports = Loadable(
  lazy(() => import('../views/system/analytics/customers/CustomerReports.jsx')),
);
const MarketingReports = Loadable(
  lazy(() => import('../views/system/analytics/marketing/MarketingReports.jsx')),
);
const SearchReports = Loadable(
  lazy(() => import('../views/system/analytics/search/SearchReports.jsx')),
);
const ReportBuilder = Loadable(
  lazy(() => import('../views/system/analytics/builder/ReportBuilder.jsx')),
);

// CRM Components (from System) - for customer management if needed
const Customers = Loadable(lazy(() => import('../views/system/crm/customers/Customers.jsx')));

// Catalog Components (from System) - for advanced product management
const CategoriesManager = Loadable(
  lazy(() => import('../views/system/catalog/categories/CategoriesManager.jsx')),
);
const AttributesManager = Loadable(
  lazy(() => import('../views/system/catalog/attributes/AttributesManager.jsx')),
);
const BrandsManager = Loadable(
  lazy(() => import('../views/system/catalog/brands/BrandsManager.jsx')),
);

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

      // ================= Invoices =================
      {
        path: '/suppliers/invoices/list',
        element: <InvoicesList />,
      },
      {
        path: '/suppliers/invoices/payments',
        element: <InvoicesPayments />,
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

      // ================= Support & Contract =================
      {
        path: '/suppliers/support',
        element: <Support />,
      },
      {
        path: '/suppliers/contract',
        element: <Contract />,
      },

      // ================= Analytics & Reports =================
      {
        path: '/suppliers/analytics/sales',
        element: <SalesReports />,
      },
      {
        path: '/suppliers/analytics/inventory',
        element: <InventoryReports />,
      },
      {
        path: '/suppliers/analytics/products',
        element: <SearchReports />,
      },
      {
        path: '/suppliers/analytics/customers',
        element: <CustomerReports />,
      },
      {
        path: '/suppliers/analytics/performance',
        element: <MarketingReports />,
      },
      {
        path: '/suppliers/analytics/builder',
        element: <ReportBuilder />,
      },

      // ================= Advanced Product Management =================
      {
        path: '/suppliers/catalog/categories-manager',
        element: <CategoriesManager />,
      },
      {
        path: '/suppliers/catalog/attributes',
        element: <AttributesManager />,
      },
      {
        path: '/suppliers/catalog/brands',
        element: <BrandsManager />,
      },

      // ================= Customer Relations =================
      {
        path: '/suppliers/customers',
        element: <Customers />,
      },
    ],
  },
];

export const suppliersRoutes = SuppliersRouter;
export default createBrowserRouter(SuppliersRouter);
