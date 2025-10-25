import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Loadable from '../layouts/shared/loadable/Loadable.jsx';

/* ***Layouts**** */
const SystemFullLayout = Loadable(lazy(() => import('../layouts/system/full/FullLayout.jsx')));

/* ****Pages***** */
const SystemDashboard = Loadable(lazy(() => import('../views/system/dashboard/dashboard.jsx')));

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
// Unified Catalog Managers
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
const CollectionsManager = Loadable(
  lazy(() => import('../views/system/catalog/collections/CollectionsManager.jsx')),
);
const SearchSynonyms = Loadable(
  lazy(() => import('../views/system/catalog/search/SearchSynonyms.jsx')),
);
const ReviewsModeration = Loadable(
  lazy(() => import('../views/system/catalog/reviews/ReviewsModeration.jsx')),
);

// Orders Components
const OrdersList = Loadable(lazy(() => import('../views/system/orders/list/OrdersList.jsx')));

const OrdersTracking = Loadable(
  lazy(() => import('../views/system/orders/tracking/OrdersTracking.jsx')),
);

const OrdersUnfulfilled = Loadable(
  lazy(() => import('../views/system/orders/unfulfilled/OrdersUnfulfilled.jsx')),
);
const OrdersFulfillment = Loadable(
  lazy(() => import('../views/system/orders/fulfillment/OrdersFulfillment.jsx')),
);
const OrdersShipped = Loadable(
  lazy(() => import('../views/system/orders/shipped/OrdersShipped.jsx')),
);
const OrdersDelivered = Loadable(
  lazy(() => import('../views/system/orders/delivered/OrdersDelivered.jsx')),
);
const OrdersCancellations = Loadable(
  lazy(() => import('../views/system/orders/cancellations/OrdersCancellations.jsx')),
);
const OrdersFraudReview = Loadable(
  lazy(() => import('../views/system/orders/fraud/OrdersFraudReview.jsx')),
);
const OrdersPayments = Loadable(lazy(() => import('../views/system/orders/payments/Payments.jsx')));
const OrdersShipments = Loadable(
  lazy(() => import('../views/system/orders/shipments/Shipments.jsx')),
);
const OrdersReturns = Loadable(lazy(() => import('../views/system/orders/returns/ReturnsRMA.jsx')));

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
const PricingLists = Loadable(lazy(() => import('../views/system/pricing/lists/PricingLists.jsx')));
const Promotions = Loadable(
  lazy(() => import('../views/system/pricing/promotions/Promotions.jsx')),
);
const Coupons = Loadable(lazy(() => import('../views/system/pricing/coupons/Coupons.jsx')));
const CampaignCalendar = Loadable(
  lazy(() => import('../views/system/pricing/campaigns/CampaignCalendar.jsx')),
);

const MarketingCampaigns = Loadable(
  lazy(() => import('../views/system/pricing/marketing-campaigns/MarketingCampaigns.jsx')),
);

const LoyaltyWallets = Loadable(
  lazy(() => import('../views/system/pricing/loyalty/LoyaltyWallets.jsx')),
);
const Marketing = Loadable(lazy(() => import('../views/system/pricing/marketing/Marketing.jsx')));

// Analytics Components
const SalesReports = Loadable(
  lazy(() => import('../views/system/analytics/sales/SalesReports.jsx')),
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

// Finance Components
const ChartOfAccounts = Loadable(
  lazy(() => import('../views/system/finance/chart-of-accounts/ChartOfAccounts.jsx')),
);
const JournalEntries = Loadable(
  lazy(() => import('../views/system/finance/journal-entries/JournalEntries.jsx')),
);
const CashManagement = Loadable(
  lazy(() => import('../views/system/finance/cash-management/CashManagement.jsx')),
);
const Budgets = Loadable(lazy(() => import('../views/system/finance/budgets/Budgets.jsx')));
const FixedAssets = Loadable(
  lazy(() => import('../views/system/finance/fixed-assets/FixedAssets.jsx')),
);
const Taxes = Loadable(lazy(() => import('../views/system/finance/taxes/Taxes.jsx')));
const CustomerInvoices = Loadable(
  lazy(() => import('../views/system/finance/customer-invoices/CustomerInvoices.jsx')),
);

// Procurement Components
const Suppliers = Loadable(
  lazy(() => import('../views/system/procurement/suppliers/Suppliers.jsx')),
);
const PurchaseRequests = Loadable(
  lazy(() => import('../views/system/procurement/purchase-requests/PurchaseRequests.jsx')),
);
const PurchaseOrdersList = Loadable(
  lazy(() => import('../views/system/procurement/purchase-orders/PurchaseOrdersList.jsx')),
);
const GoodsReceipts = Loadable(
  lazy(() => import('../views/system/procurement/goods-receipts/GoodsReceipts.jsx')),
);
const VendorBills = Loadable(
  lazy(() => import('../views/system/procurement/vendor-bills/VendorBills.jsx')),
);

// CRM Components
const Leads = Loadable(lazy(() => import('../views/system/crm/leads/Leads.jsx')));
const Opportunities = Loadable(
  lazy(() => import('../views/system/crm/opportunities/Opportunities.jsx')),
);
const CustomerActivities = Loadable(
  lazy(() => import('../views/system/crm/activities/CustomerActivities.jsx')),
);

const Customers = Loadable(lazy(() => import('../views/system/crm/customers/Customers.jsx')));
const Segments = Loadable(lazy(() => import('../views/system/crm/segments/Segments.jsx')));

// HR Components
const Employees = Loadable(lazy(() => import('../views/system/hr/employees/Employees.jsx')));
const Payroll = Loadable(lazy(() => import('../views/system/hr/payroll/Payroll.jsx')));
const Attendance = Loadable(lazy(() => import('../views/system/hr/attendance/Attendance.jsx')));

// Project Management Components
const ProjectsList = Loadable(lazy(() => import('../views/system/projects/list/ProjectsList.jsx')));
const Tasks = Loadable(lazy(() => import('../views/system/projects/tasks/Tasks.jsx')));
const Resources = Loadable(lazy(() => import('../views/system/projects/resources/Resources.jsx')));

// Sub-stores Components
const SubstoresList = Loadable(
  lazy(() => import('../views/system/substores/list/SubstoresList.jsx')),
);
const SubstoresSettings = Loadable(
  lazy(() => import('../views/system/substores/settings/SubstoresSettings.jsx')),
);
const SubstoresApprovals = Loadable(
  lazy(() => import('../views/system/substores/approvals/SubstoresApprovals.jsx')),
);

// CMS Components
const Homepage = Loadable(lazy(() => import('../views/system/cms/homepage/Homepage.jsx')));

const AboutUs = Loadable(lazy(() => import('../views/system/cms/about-us/AboutUs.jsx')));

const ContactUs = Loadable(lazy(() => import('../views/system/cms/contact-us/ContactUs.jsx')));

const MediaLibrary = Loadable(lazy(() => import('../views/system/cms/media/MediaLibrary.jsx')));

const NavigationManager = Loadable(
  lazy(() => import('../views/system/cms/navigation/NavigationManager.jsx')),
);

const SeoRedirects = Loadable(lazy(() => import('../views/system/cms/seo/SeoRedirects.jsx')));

const TranslationsLocales = Loadable(
  lazy(() => import('../views/system/cms/translations/TranslationsLocales.jsx')),
);

const FormsBuilder = Loadable(lazy(() => import('../views/system/cms/forms/FormsBuilder.jsx')));

const Portfolio = Loadable(lazy(() => import('../views/system/cms/portfolio/Portfolio.jsx')));

const Blogs = Loadable(lazy(() => import('../views/system/cms/blogs/Blogs.jsx')));

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

const FAQ = Loadable(lazy(() => import('../views/system/cms/faq/FAQ.jsx')));

const Policies = Loadable(lazy(() => import('../views/system/cms/policies/Policies.jsx')));

// Settings Components
const SystemSettings = Loadable(
  lazy(() => import('../views/system/settings/system-settings/SystemSettings.jsx')),
);
const HelpCenter = Loadable(
  lazy(() => import('../views/system/settings/help-center/HelpCenter.jsx')),
);
const ContactSupport = Loadable(
  lazy(() => import('../views/system/settings/contact-support/ContactSupport.jsx')),
);

const SystemRouter = [
  // System Routes with FullLayout
  {
    path: '/system',
    element: <SystemFullLayout />,
    children: [
      { path: '/system', element: <SystemDashboard /> },
      { path: '/system/dashboard', exact: true, element: <SystemDashboard /> },

      // ================= إدارة المنتجات والمخزون =================
      // الكتالوج (المنتجات)
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
      // Unified Catalog Management Pages
      {
        path: '/system/catalog/categories',
        element: <CategoriesManager />,
      },
      {
        path: '/system/catalog/attributes',
        element: <AttributesManager />,
      },
      {
        path: '/system/catalog/brands',
        element: <BrandsManager />,
      },
      {
        path: '/system/catalog/product-tags',
        element: <ProductTagsManager />,
      },
      {
        path: '/system/catalog/collections',
        element: <CollectionsManager />,
      },
      {
        path: '/system/catalog/search',
        element: <SearchSynonyms />,
      },
      {
        path: '/system/catalog/reviews',
        element: <ReviewsModeration />,
      },

      // العمليات والمخزون
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

      // ================= المبيعات والمشتريات =================
      // الطلبات والتنفيذ
      {
        path: '/system/orders/list',
        element: <OrdersList />,
      },
      {
        path: '/system/orders/orders-tracking',
        element: <OrdersTracking />,
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
        path: '/system/orders/payments',
        element: <OrdersPayments />,
      },
      {
        path: '/system/orders/shipments',
        element: <OrdersShipments />,
      },
      {
        path: '/system/orders/returns',
        element: <OrdersReturns />,
      },

      // المشتريات والموردين
      {
        path: '/system/procurement/suppliers',
        element: <Suppliers />,
      },
      {
        path: '/system/procurement/purchase-requests',
        element: <PurchaseRequests />,
      },
      {
        path: '/system/procurement/purchase-orders',
        element: <PurchaseOrdersList />,
      },
      {
        path: '/system/procurement/goods-receipts',
        element: <GoodsReceipts />,
      },
      {
        path: '/system/procurement/vendor-bills',
        element: <VendorBills />,
      },

      // ================= إدارة علاقات العملاء والتسويق =================
      // إدارة العملاء (CRM)
      {
        path: '/system/crm/leads',
        element: <Leads />,
      },
      {
        path: '/system/crm/opportunities',
        element: <Opportunities />,
      },
      {
        path: '/system/crm/activities',
        element: <CustomerActivities />,
      },
      {
        path: '/system/crm/customers',
        element: <Customers />,
      },
      {
        path: '/system/crm/segments',
        element: <Segments />,
      },

      // التسعير والحملات
      {
        path: '/system/pricing/lists',
        element: <PricingLists />,
      },
      {
        path: '/system/pricing/promotions',
        element: <Promotions />,
      },
      {
        path: '/system/pricing/coupons',
        element: <Coupons />,
      },
      {
        path: '/system/pricing/campaigns',
        element: <CampaignCalendar />,
      },
      {
        path: '/system/pricing/marketing-campaigns',
        element: <MarketingCampaigns />,
      },
      {
        path: '/system/pricing/loyalty',
        element: <LoyaltyWallets />,
      },
      {
        path: '/system/pricing/marketing',
        element: <Marketing />,
      },

      // ================= الحسابات والمالية =================
      {
        path: '/system/finance/chart-of-accounts',
        element: <ChartOfAccounts />,
      },
      {
        path: '/system/finance/journal-entries',
        element: <JournalEntries />,
      },
      {
        path: '/system/finance/budgets',
        element: <Budgets />,
      },
      {
        path: '/system/finance/cash-management',
        element: <CashManagement />,
      },
      {
        path: '/system/finance/fixed-assets',
        element: <FixedAssets />,
      },
      {
        path: '/system/finance/taxes',
        element: <Taxes />,
      },

      // فواتير العملاء
      {
        path: '/system/finance/customer-invoices',
        element: <CustomerInvoices />,
      },
      // ================= المشاريع والموارد البشرية =================
      // إدارة المشاريع
      {
        path: '/system/projects/list',
        element: <ProjectsList />,
      },
      {
        path: '/system/projects/tasks',
        element: <Tasks />,
      },
      {
        path: '/system/projects/resources',
        element: <Resources />,
      },

      // شؤون الموظفين
      {
        path: '/system/hr/employees',
        element: <Employees />,
      },
      {
        path: '/system/hr/payroll',
        element: <Payroll />,
      },
      {
        path: '/system/hr/attendance',
        element: <Attendance />,
      },

      // ================= إدارة الواجهة الأمامية =================
      {
        path: '/system/cms/homepage',
        element: <Homepage />,
      },
      {
        path: '/system/cms/about-us',
        element: <AboutUs />,
      },
      {
        path: '/system/cms/contact-us',
        element: <ContactUs />,
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
        path: '/system/cms/upcoming-offers',
        element: <UpcomingOffers />,
      },
      {
        path: '/system/cms/blogs',
        element: <Blogs />,
      },
      {
        path: '/system/cms/policies',
        element: <Policies />,
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

      // ================= إدارة المتاجر الفرعية =================
      {
        path: '/system/substores/list',
        element: <SubstoresList />,
      },
      {
        path: '/system/substores/settings',
        element: <SubstoresSettings />,
      },
      {
        path: '/system/substores/approvals',
        element: <SubstoresApprovals />,
      },

      // ================= التحليلات =================
      {
        path: '/system/analytics/sales',
        element: <SalesReports />,
      },
      {
        path: '/system/analytics/inventory',
        element: <InventoryReports />,
      },
      {
        path: '/system/analytics/search',
        element: <SearchReports />,
      },
      {
        path: '/system/analytics/customers',
        element: <CustomerReports />,
      },
      {
        path: '/system/analytics/marketing',
        element: <MarketingReports />,
      },
      {
        path: '/system/analytics/builder',
        element: <ReportBuilder />,
      },

      // ================= الإعدادات والدعم =================
      {
        path: '/system/settings',
        element: <SystemSettings />,
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
