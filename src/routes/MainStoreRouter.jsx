import { lazy } from 'react';
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
const ProductPublishing = Loadable(
  lazy(() => import('../views/system/catalog/products/publishing/ProductPublishing.jsx')),
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

// Sub-stores Management Components (from System)
const SubstoresList = Loadable(
  lazy(() => import('../views/system/substores/list/SubstoresList.jsx')),
);
const SubstoresSettings = Loadable(
  lazy(() => import('../views/system/substores/settings/SubstoresSettings.jsx')),
);
const SubstoresApprovals = Loadable(
  lazy(() => import('../views/system/substores/approvals/SubstoresApprovals.jsx')),
);

const MainStoreRouter = [
  // Main Store Routes with FullLayout
  {
    path: '/main-store',
    element: <MainStoreFullLayout />,
    children: [
      { path: '/main-store', element: <MainStoreDashboard /> },
      { path: '/main-store/dashboard', exact: true, element: <MainStoreDashboard /> },

      // ================= Catalog / Products =================
      {
        path: '/main-store/catalog/products/create',
        element: <ProductCreate />,
      },
      {
        path: '/main-store/catalog/products/list',
        element: <ProductList />,
      },
      {
        path: '/main-store/catalog/products/variants',
        element: <VariantsManager />,
      },
      {
        path: '/main-store/catalog/products/bundles',
        element: <BundlesKits />,
      },
      {
        path: '/main-store/catalog/products/publishing',
        element: <ProductPublishing />,
      },
      {
        path: '/main-store/catalog/products/deleted',
        element: <ProductDeleted />,
      },
      {
        path: '/main-store/catalog/categories',
        element: <CategoriesManager />,
      },
      {
        path: '/main-store/catalog/attributes',
        element: <AttributesManager />,
      },
      {
        path: '/main-store/catalog/brands',
        element: <BrandsManager />,
      },
      {
        path: '/main-store/catalog/product-tags',
        element: <ProductTagsManager />,
      },
      {
        path: '/main-store/catalog/reviews',
        element: <ReviewsModeration />,
      },

      // ================= Orders =================
      {
        path: '/main-store/orders/list',
        element: <OrdersList />,
      },
      {
        path: '/main-store/orders/tracking',
        element: <OrdersTracking />,
      },

      // ================= CRM / Customers =================
      {
        path: '/main-store/crm/customers',
        element: <Customers />,
      },
      {
        path: '/main-store/crm/segments',
        element: <Segments />,
      },

      // ================= Analytics =================
      {
        path: '/main-store/analytics/sales',
        element: <SalesReports />,
      },
      {
        path: '/main-store/analytics/inventory',
        element: <InventoryReports />,
      },
      {
        path: '/main-store/analytics/customers',
        element: <CustomerReports />,
      },
      {
        path: '/main-store/analytics/marketing',
        element: <MarketingReports />,
      },

      // ================= CMS (Global Content) =================
      {
        path: '/main-store/cms/homepage',
        element: <Homepage />,
      },
      {
        path: '/main-store/cms/about-us',
        element: <AboutUs />,
      },
      {
        path: '/main-store/cms/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/main-store/cms/blogs',
        element: <Blogs />,
      },
      {
        path: '/main-store/cms/portfolio',
        element: <Portfolio />,
      },
      {
        path: '/main-store/cms/pricing',
        element: <PricingPage />,
      },
      {
        path: '/main-store/cms/become-seller',
        element: <BecomeSeller />,
      },
      {
        path: '/main-store/cms/become-supplier',
        element: <BecomeSupplier />,
      },
      {
        path: '/main-store/cms/policies',
        element: <Policies />,
      },
      {
        path: '/main-store/cms/upcoming-offers',
        element: <UpcomingOffers />,
      },
      {
        path: '/main-store/cms/faq',
        element: <FAQ />,
      },
      {
        path: '/main-store/cms/careers',
        element: <Careers />,
      },
      {
        path: '/main-store/cms/media',
        element: <MediaLibrary />,
      },
      {
        path: '/main-store/cms/navigation',
        element: <NavigationManager />,
      },
      {
        path: '/main-store/cms/seo',
        element: <SeoRedirects />,
      },
      {
        path: '/main-store/cms/translations',
        element: <TranslationsLocales />,
      },
      {
        path: '/main-store/cms/forms',
        element: <FormsBuilder />,
      },

      // ================= Sub-Stores Management =================
      {
        path: '/main-store/substores/list',
        element: <SubstoresList />,
      },
      {
        path: '/main-store/substores/settings',
        element: <SubstoresSettings />,
      },
      {
        path: '/main-store/substores/approvals',
        element: <SubstoresApprovals />,
      },
    ],
  },
];

export const mainStoreRoutes = MainStoreRouter;
export default createBrowserRouter(MainStoreRouter);
