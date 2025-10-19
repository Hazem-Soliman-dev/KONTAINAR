import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Loadable from '../layouts/shared/loadable/Loadable.jsx';

/* ***Layouts**** */
const SystemFullLayout = Loadable(lazy(() => import('../layouts/system/full/FullLayout.jsx')));

/* ****Pages***** */
const SystemDashboard = Loadable(lazy(() => import('../views/system/dashboard/dashboard.jsx')));

// CMS Pages
const Homepage = Loadable(lazy(() => import('../views/system/cms/homepage/Homepage.jsx')));
const AboutUs = Loadable(lazy(() => import('../views/system/cms/about/AboutUs.jsx')));
const ContactUs = Loadable(lazy(() => import('../views/system/cms/contact/ContactUs.jsx')));
const Portfolio = Loadable(lazy(() => import('../views/system/cms/portfolio/Portfolio.jsx')));
const PricingPage = Loadable(lazy(() => import('../views/system/cms/pricing/PricingPage.jsx')));
const BecomeSeller = Loadable(
  lazy(() => import('../views/system/cms/become-seller/BecomeSeller.jsx')),
);
const BecomeSupplier = Loadable(
  lazy(() => import('../views/system/cms/become-supplier/BecomeSupplier.jsx')),
);
const UpcomingOffers = Loadable(
  lazy(() => import('../views/system/cms/upcoming-offers/UpcomingOffers.jsx')),
);
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
const PrivacyPolicy = Loadable(
  lazy(() => import('../views/system/cms/policies/privacy/PrivacyPolicy.jsx')),
);
const ReturnPolicy = Loadable(
  lazy(() => import('../views/system/cms/policies/return/ReturnPolicy.jsx')),
);
const RefundPolicy = Loadable(
  lazy(() => import('../views/system/cms/policies/refund/RefundPolicy.jsx')),
);
const TermsConditions = Loadable(
  lazy(() => import('../views/system/cms/policies/terms/TermsConditions.jsx')),
);
const ShippingPolicy = Loadable(
  lazy(() => import('../views/system/cms/policies/shipping/ShippingPolicy.jsx')),
);
const PaymentMethods = Loadable(
  lazy(() => import('../views/system/cms/policies/payment-methods/PaymentMethods.jsx')),
);
const BlogList = Loadable(lazy(() => import('../views/system/cms/blogs/list/BlogList.jsx')));
const BlogCreate = Loadable(
  lazy(() => import('../views/system/cms/blogs/create/BlogCreate.jsx')),
);
const BlogDeleted = Loadable(
  lazy(() => import('../views/system/cms/blogs/deleted/BlogDeleted.jsx')),
);
const BlogCategories = Loadable(
  lazy(() => import('../views/system/cms/blogs/categories/BlogCategories.jsx')),
);
const BlogTags = Loadable(lazy(() => import('../views/system/cms/blogs/tags/BlogTags.jsx')));
const FAQ = Loadable(lazy(() => import('../views/system/cms/faq/FAQ.jsx')));

// Catalog Components
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
const CategoryCreate = Loadable(
  lazy(() => import('../views/system/catalog/categories/create/CreateCategory.jsx')),
);
const CategoryList = Loadable(
  lazy(() => import('../views/system/catalog/categories/list/CategoryList.jsx')),
);
const CategoryDeleted = Loadable(
  lazy(() => import('../views/system/catalog/categories/deleted/DeletedCategories.jsx')),
);
const AttributeCreate = Loadable(
  lazy(() => import('../views/system/catalog/attributes/create/AttributeCreate.jsx')),
);
const AttributeList = Loadable(
  lazy(() => import('../views/system/catalog/attributes/list/AttributeList.jsx')),
);
const BrandCreate = Loadable(
  lazy(() => import('../views/system/catalog/brands/create/BrandCreate.jsx')),
);
const BrandList = Loadable(
  lazy(() => import('../views/system/catalog/brands/list/BrandList.jsx')),
);
const ProductTagCreate = Loadable(
  lazy(() => import('../views/system/catalog/product-tags/create/ProductTagCreate.jsx')),
);
const ProductTagList = Loadable(
  lazy(() => import('../views/system/catalog/product-tags/list/ProductTagList.jsx')),
);
const CollectionCreate = Loadable(
  lazy(() => import('../views/system/catalog/collections/create/CollectionCreate.jsx')),
);
const CollectionList = Loadable(
  lazy(() => import('../views/system/catalog/collections/list/CollectionList.jsx')),
);
const SearchSynonyms = Loadable(
  lazy(() => import('../views/system/catalog/search/SearchSynonyms.jsx')),
);
const ReviewsModeration = Loadable(
  lazy(() => import('../views/system/catalog/reviews/ReviewsModeration.jsx')),
);

// Orders Components
const OrdersList = Loadable(
  lazy(() => import('../views/system/orders/orders/list/OrdersList.jsx')),
);
const OrdersUnfulfilled = Loadable(
  lazy(() => import('../views/system/orders/orders/unfulfilled/OrdersUnfulfilled.jsx')),
);
const OrdersFulfillment = Loadable(
  lazy(() => import('../views/system/orders/orders/fulfillment/OrdersFulfillment.jsx')),
);
const OrdersShipped = Loadable(
  lazy(() => import('../views/system/orders/orders/shipped/OrdersShipped.jsx')),
);
const OrdersDelivered = Loadable(
  lazy(() => import('../views/system/orders/orders/delivered/OrdersDelivered.jsx')),
);
const OrdersCancellations = Loadable(
  lazy(() => import('../views/system/orders/orders/cancellations/OrdersCancellations.jsx')),
);
const OrdersFraudReview = Loadable(
  lazy(() => import('../views/system/orders/orders/fraud/OrdersFraudReview.jsx')),
);
const ReturnsRMA = Loadable(
  lazy(() => import('../views/system/orders/returns/ReturnsRMA.jsx')),
);
const Shipments = Loadable(
  lazy(() => import('../views/system/orders/orders/shipments/Shipments.jsx')),
);
const SalesInvoices = Loadable(
  lazy(() => import('../views/system/orders/orders/invoices/SalesInvoices.jsx')),
);
const Payments = Loadable(
  lazy(() => import('../views/system/orders/orders/payments/Payments.jsx')),
);

// Operations Components
const Warehouses = Loadable(
  lazy(() => import('../views/system/operations/warehouses/Warehouses.jsx')),
);
const Inventory = Loadable(
  lazy(() => import('../views/system/operations/inventory/Inventory.jsx')),
);
const Transfers = Loadable(
  lazy(() => import('../views/system/operations/transfers/Transfers.jsx')),
);
const Adjustments = Loadable(
  lazy(() => import('../views/system/operations/adjustments/Adjustments.jsx')),
);
const Stocktakes = Loadable(
  lazy(() => import('../views/system/operations/stocktakes/Stocktakes.jsx')),
);
const Replenishment = Loadable(
  lazy(() => import('../views/system/operations/replenishment/Replenishment.jsx')),
);
const Allocations = Loadable(
  lazy(() => import('../views/system/operations/allocations/Allocations.jsx')),
);

// Pricing Components
const PricingLists = Loadable(
  lazy(() => import('../views/system/pricing/lists/PricingLists.jsx')),
);
const Promotions = Loadable(
  lazy(() => import('../views/system/pricing/promotions/Promotions.jsx')),
);
const CouponCreate = Loadable(
  lazy(() => import('../views/system/pricing/coupons/create/CouponCreate.jsx')),
);
const CouponList = Loadable(
  lazy(() => import('../views/system/pricing/coupons/list/CouponList.jsx')),
);
const CampaignCalendar = Loadable(
  lazy(() => import('../views/system/pricing/campaigns/CampaignCalendar.jsx')),
);
const Customers = Loadable(
  lazy(() => import('../views/system/pricing/customers/Customers.jsx')),
);
const Segments = Loadable(lazy(() => import('../views/system/pricing/segments/Segments.jsx')));
const LoyaltyWallets = Loadable(
  lazy(() => import('../views/system/pricing/loyalty/LoyaltyWallets.jsx')),
);
const Marketing = Loadable(
  lazy(() => import('../views/system/pricing/marketing/Marketing.jsx')),
);

// Analytics Components
const SalesReports = Loadable(
  lazy(() => import('../views/system/analytics/sales/SalesReports.jsx')),
);
const MerchandisingReports = Loadable(
  lazy(() => import('../views/system/analytics/merchandising/MerchandisingReports.jsx')),
);
const InventoryReports = Loadable(
  lazy(() => import('../views/system/analytics/inventory/InventoryReports.jsx')),
);
const SearchReports = Loadable(
  lazy(() => import('../views/system/analytics/search/SearchReports.jsx')),
);
const CustomerReports = Loadable(
  lazy(() => import('../views/system/analytics/customers/CustomerReports.jsx')),
);
const MarketingReports = Loadable(
  lazy(() => import('../views/system/analytics/marketing/MarketingReports.jsx')),
);
const ReportBuilder = Loadable(
  lazy(() => import('../views/system/analytics/builder/ReportBuilder.jsx')),
);

// Settings Components
const StoreSettings = Loadable(
  lazy(() => import('../views/system/settings/StoreSettings.jsx')),
);
const HelpCenter = Loadable(lazy(() => import('../views/system/help/HelpCenter.jsx')));
const ContactSupport = Loadable(
  lazy(() => import('../views/system/contact-support/ContactSupport.jsx')),
);

const SystemRouter = [
  // System Routes with FullLayout
  {
    path: '/system',
    element: <SystemFullLayout />,
    children: [
      { path: '/system', element: <SystemDashboard /> },
      { path: '/system/dashboard', exact: true, element: <SystemDashboard /> },

      // ================= CMS & Frontend =================
      {
        path: '/system/cms/homepage',
        element: <Homepage />,
      },
      {
        path: '/system/cms/about',
        element: <AboutUs />,
      },
      {
        path: '/system/cms/contact',
        element: <ContactUs />,
      },
      {
        path: '/system/cms/blogs/create',
        element: <BlogCreate />,
      },
      {
        path: '/system/cms/blogs/list',
        element: <BlogList />,
      },
      {
        path: '/system/cms/blogs/deleted',
        element: <BlogDeleted />,
      },
      {
        path: '/system/cms/blogs/categories',
        element: <BlogCategories />,
      },
      {
        path: '/system/cms/blogs/tags',
        element: <BlogTags />,
      },
      {
        path: '/system/cms/portfolio',
        element: <Portfolio />,
      },
      {
        path: '/system/cms/pricing',
        element: <PricingPage />,
      },
      {
        path: '/system/cms/become-seller',
        element: <BecomeSeller />,
      },
      {
        path: '/system/cms/become-supplier',
        element: <BecomeSupplier />,
      },
      {
        path: '/system/cms/policies/privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/system/cms/policies/return',
        element: <ReturnPolicy />,
      },
      {
        path: '/system/cms/policies/refund',
        element: <RefundPolicy />,
      },
      {
        path: '/system/cms/policies/terms',
        element: <TermsConditions />,
      },
      {
        path: '/system/cms/policies/shipping',
        element: <ShippingPolicy />,
      },
      {
        path: '/system/cms/policies/payment-methods',
        element: <PaymentMethods />,
      },
      {
        path: '/system/cms/upcoming-offers',
        element: <UpcomingOffers />,
      },
      {
        path: '/system/cms/faq',
        element: <FAQ />,
      },
      {
        path: '/system/cms/careers',
        element: <Careers />,
      },
      {
        path: '/system/cms/media',
        element: <MediaLibrary />,
      },
      {
        path: '/system/cms/navigation',
        element: <NavigationManager />,
      },
      {
        path: '/system/cms/seo',
        element: <SeoRedirects />,
      },
      {
        path: '/system/cms/translations',
        element: <TranslationsLocales />,
      },
      {
        path: '/system/cms/forms',
        element: <FormsBuilder />,
      },

      // ================= Catalog & Merchandising =================
      {
        path: '/system/catalog/products/create',
        element: <ProductCreate />,
      },
      {
        path: '/system/catalog/products/list',
        element: <ProductList />,
      },
      {
        path: '/system/catalog/products/variants',
        element: <VariantsManager />,
      },
      {
        path: '/system/catalog/products/bundles',
        element: <BundlesKits />,
      },
      {
        path: '/system/catalog/products/publishing',
        element: <ProductPublishing />,
      },
      {
        path: '/system/catalog/products/deleted',
        element: <ProductDeleted />,
      },

      {
        path: '/system/catalog/categories/create',
        element: <CategoryCreate />,
      },
      {
        path: '/system/catalog/categories/list',
        element: <CategoryList />,
      },
      {
        path: '/system/catalog/categories/deleted',
        element: <CategoryDeleted />,
      },

      {
        path: '/system/catalog/attributes/create',
        element: <AttributeCreate />,
      },
      {
        path: '/system/catalog/attributes/list',
        element: <AttributeList />,
      },

      {
        path: '/system/catalog/brands/create',
        element: <BrandCreate />,
      },
      {
        path: '/system/catalog/brands/list',
        element: <BrandList />,
      },

      {
        path: '/system/catalog/product-tags/create',
        element: <ProductTagCreate />,
      },
      {
        path: '/system/catalog/product-tags/list',
        element: <ProductTagList />,
      },

      {
        path: '/system/catalog/collections/create',
        element: <CollectionCreate />,
      },
      {
        path: '/system/catalog/collections/list',
        element: <CollectionList />,
      },

      {
        path: '/system/catalog/search',
        element: <SearchSynonyms />,
      },
      {
        path: '/system/catalog/reviews',
        element: <ReviewsModeration />,
      },

      // ================= Orders & Fulfillment =================
      {
        path: '/system/orders/list',
        element: <OrdersList />,
      },
      {
        path: '/system/orders/unfulfilled',
        element: <OrdersUnfulfilled />,
      },
      {
        path: '/system/orders/fulfillment',
        element: <OrdersFulfillment />,
      },
      {
        path: '/system/orders/shipped',
        element: <OrdersShipped />,
      },
      {
        path: '/system/orders/delivered',
        element: <OrdersDelivered />,
      },
      {
        path: '/system/orders/cancellations',
        element: <OrdersCancellations />,
      },
      {
        path: '/system/orders/fraud',
        element: <OrdersFraudReview />,
      },

      {
        path: '/system/returns',
        element: <ReturnsRMA />,
      },
      {
        path: '/system/shipments',
        element: <Shipments />,
      },
      {
        path: '/system/invoices',
        element: <SalesInvoices />,
      },
      {
        path: '/system/payments',
        element: <Payments />,
      },

      // ================= Operations =================
      {
        path: '/system/operations/warehouses',
        element: <Warehouses />,
      },
      {
        path: '/system/operations/inventory',
        element: <Inventory />,
      },
      {
        path: '/system/operations/transfers',
        element: <Transfers />,
      },
      {
        path: '/system/operations/adjustments',
        element: <Adjustments />,
      },
      {
        path: '/system/operations/stocktakes',
        element: <Stocktakes />,
      },
      {
        path: '/system/operations/replenishment',
        element: <Replenishment />,
      },
      {
        path: '/system/operations/allocations',
        element: <Allocations />,
      },

      // ================= Pricing & Customers & Marketing =================
      {
        path: '/system/pricing/lists',
        element: <PricingLists />,
      },
      {
        path: '/system/pricing/promotions',
        element: <Promotions />,
      },
      {
        path: '/system/pricing/coupons/create',
        element: <CouponCreate />,
      },
      {
        path: '/system/pricing/coupons/list',
        element: <CouponList />,
      },
      {
        path: '/system/pricing/campaigns',
        element: <CampaignCalendar />,
      },
      {
        path: '/system/pricing/customers',
        element: <Customers />,
      },
      {
        path: '/system/pricing/segments',
        element: <Segments />,
      },
      {
        path: '/system/pricing/loyalty',
        element: <LoyaltyWallets />,
      },
      {
        path: '/system/pricing/marketing',
        element: <Marketing />,
      },

      // ================= Analytics =================
      {
        path: '/system/reports/sales',
        element: <SalesReports />,
      },
      {
        path: '/system/reports/merchandising',
        element: <MerchandisingReports />,
      },
      {
        path: '/system/reports/inventory',
        element: <InventoryReports />,
      },
      {
        path: '/system/reports/search',
        element: <SearchReports />,
      },
      {
        path: '/system/reports/customers',
        element: <CustomerReports />,
      },
      {
        path: '/system/reports/marketing',
        element: <MarketingReports />,
      },
      {
        path: '/system/reports/builder',
        element: <ReportBuilder />,
      },

      // ================= Misc =================
      {
        path: '/system/settings',
        element: <StoreSettings />,
      },
      {
        path: '/system/help',
        element: <HelpCenter />,
      },
      {
        path: '/system/contact',
        element: <ContactSupport />,
      },
    ],
  },
];

export const SystemRoutes = SystemRouter;
export default createBrowserRouter(SystemRouter);
