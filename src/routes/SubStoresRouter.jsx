import { lazy } from 'react';
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

// ====== REUSE SYSTEM VIEW COMPONENTS ======

// Catalog Components (from System)
const ProductCreate = Loadable(
  lazy(() => import('../views/system/catalog/products/create/ProductCreate.jsx')),
);
const ProductList = Loadable(
  lazy(() => import('../views/system/catalog/products/list/ProductList.jsx')),
);
const VariantsManager = Loadable(
  lazy(() => import('../views/system/catalog/products/variants/VariantsManager.jsx')),
);
const BundlesKits = Loadable(
  lazy(() => import('../views/system/catalog/products/bundles/BundlesKits.jsx')),
);
const ProductDeleted = Loadable(
  lazy(() => import('../views/system/catalog/products/deleted/DeletedProducts.jsx')),
);
const CategoriesManager = Loadable(
  lazy(() => import('../views/system/catalog/categories/CategoriesManager.jsx')),
);
const AttributesManager = Loadable(
  lazy(() => import('../views/system/catalog/attributes/AttributesManager.jsx')),
);
const BrandsManager = Loadable(
  lazy(() => import('../views/system/catalog/brands/BrandsManager.jsx')),
);
const ProductTagsManager = Loadable(
  lazy(() => import('../views/system/catalog/product-tags/ProductTagsManager.jsx')),
);
const ReviewsModeration = Loadable(
  lazy(() => import('../views/system/catalog/reviews/ReviewsModeration.jsx')),
);

// Orders Components (from System)
const OrdersList = Loadable(lazy(() => import('../views/system/orders/list/OrdersList.jsx')));
const OrdersTracking = Loadable(
  lazy(() => import('../views/system/orders/tracking/OrdersTracking.jsx')),
);

// CRM Components (from System)
const Customers = Loadable(lazy(() => import('../views/system/crm/customers/Customers.jsx')));
const Segments = Loadable(lazy(() => import('../views/system/crm/segments/Segments.jsx')));

// Analytics Components (from System)
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

// CMS Components (from System)
const Homepage = Loadable(lazy(() => import('../views/system/cms/homepage/Homepage.jsx')));
const AboutUs = Loadable(lazy(() => import('../views/system/cms/about-us/AboutUs.jsx')));
const ContactUs = Loadable(lazy(() => import('../views/system/cms/contact-us/ContactUs.jsx')));
const Blogs = Loadable(lazy(() => import('../views/system/cms/blogs/Blogs.jsx')));
const Portfolio = Loadable(lazy(() => import('../views/system/cms/portfolio/Portfolio.jsx')));
const PricingPage = Loadable(lazy(() => import('../views/system/cms/pricing/PricingPage.jsx')));
const BecomeSeller = Loadable(
  lazy(() => import('../views/system/cms/become-seller/BecomeSeller.jsx')),
);
const BecomeSupplier = Loadable(
  lazy(() => import('../views/system/cms/become-supplier/BecomeSupplier.jsx')),
);
const Policies = Loadable(lazy(() => import('../views/system/cms/policies/Policies.jsx')));
const UpcomingOffers = Loadable(
  lazy(() => import('../views/system/cms/upcoming-offers/UpcomingOffers.jsx')),
);
const FAQ = Loadable(lazy(() => import('../views/system/cms/faq/FAQ.jsx')));
const Careers = Loadable(lazy(() => import('../views/system/cms/careers/Careers.jsx')));
const MediaLibrary = Loadable(lazy(() => import('../views/system/cms/media/MediaLibrary.jsx')));
const NavigationManager = Loadable(
  lazy(() => import('../views/system/cms/navigation/NavigationManager.jsx')),
);
const SeoRedirects = Loadable(lazy(() => import('../views/system/cms/seo/SeoRedirects.jsx')));
const TranslationsLocales = Loadable(
  lazy(() => import('../views/system/cms/translations/TranslationsLocales.jsx')),
);
const FormsBuilder = Loadable(lazy(() => import('../views/system/cms/forms/FormsBuilder.jsx')));

const SubStoresRouter = [
  // Sub Stores Routes with FullLayout
  {
    path: '/sub-stores',
    element: <SubStoresFullLayout />,
    children: [
      { path: '/sub-stores', element: <SubStoresDashboard /> },
      { path: '/sub-stores/dashboard', exact: true, element: <SubStoresDashboard /> },

      // ================= Catalog / Products =================
      // NOTE: No publishing feature for sub-stores
      {
        path: '/sub-stores/catalog/products/create',
        element: <ProductCreate />,
      },
      {
        path: '/sub-stores/catalog/products/list',
        element: <ProductList />,
      },
      {
        path: '/sub-stores/catalog/products/variants',
        element: <VariantsManager />,
      },
      {
        path: '/sub-stores/catalog/products/bundles',
        element: <BundlesKits />,
      },
      {
        path: '/sub-stores/catalog/products/deleted',
        element: <ProductDeleted />,
      },
      {
        path: '/sub-stores/catalog/categories',
        element: <CategoriesManager />,
      },
      {
        path: '/sub-stores/catalog/attributes',
        element: <AttributesManager />,
      },
      {
        path: '/sub-stores/catalog/brands',
        element: <BrandsManager />,
      },
      {
        path: '/sub-stores/catalog/product-tags',
        element: <ProductTagsManager />,
      },
      {
        path: '/sub-stores/catalog/reviews',
        element: <ReviewsModeration />,
      },

      // ================= Orders =================
      {
        path: '/sub-stores/orders/list',
        element: <OrdersList />,
      },
      {
        path: '/sub-stores/orders/tracking',
        element: <OrdersTracking />,
      },

      // ================= CRM / Customers =================
      {
        path: '/sub-stores/crm/customers',
        element: <Customers />,
      },
      {
        path: '/sub-stores/crm/segments',
        element: <Segments />,
      },

      // ================= Analytics =================
      {
        path: '/sub-stores/analytics/sales',
        element: <SalesReports />,
      },
      {
        path: '/sub-stores/analytics/inventory',
        element: <InventoryReports />,
      },
      {
        path: '/sub-stores/analytics/customers',
        element: <CustomerReports />,
      },
      {
        path: '/sub-stores/analytics/marketing',
        element: <MarketingReports />,
      },

      // ================= CMS (Sub-Store Specific Content) =================
      {
        path: '/sub-stores/cms/homepage',
        element: <Homepage />,
      },
      {
        path: '/sub-stores/cms/about-us',
        element: <AboutUs />,
      },
      {
        path: '/sub-stores/cms/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/sub-stores/cms/blogs',
        element: <Blogs />,
      },
      {
        path: '/sub-stores/cms/portfolio',
        element: <Portfolio />,
      },
      {
        path: '/sub-stores/cms/pricing',
        element: <PricingPage />,
      },
      {
        path: '/sub-stores/cms/become-seller',
        element: <BecomeSeller />,
      },
      {
        path: '/sub-stores/cms/become-supplier',
        element: <BecomeSupplier />,
      },
      {
        path: '/sub-stores/cms/policies',
        element: <Policies />,
      },
      {
        path: '/sub-stores/cms/upcoming-offers',
        element: <UpcomingOffers />,
      },
      {
        path: '/sub-stores/cms/faq',
        element: <FAQ />,
      },
      {
        path: '/sub-stores/cms/careers',
        element: <Careers />,
      },
      {
        path: '/sub-stores/cms/media',
        element: <MediaLibrary />,
      },
      {
        path: '/sub-stores/cms/navigation',
        element: <NavigationManager />,
      },
      {
        path: '/sub-stores/cms/seo',
        element: <SeoRedirects />,
      },
      {
        path: '/sub-stores/cms/translations',
        element: <TranslationsLocales />,
      },
      {
        path: '/sub-stores/cms/forms',
        element: <FormsBuilder />,
      },
    ],
  },
];

export const subStoresRoutes = SubStoresRouter;
export default createBrowserRouter(SubStoresRouter);
