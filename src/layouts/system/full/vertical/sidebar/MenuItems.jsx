import { uniqueId } from 'lodash';
import {
  IconHome,
  IconPackage,
  IconShoppingCart,
  IconUsers,
  IconFileInvoice,
  IconSettings,
  IconTools,
  IconCash,
  IconWorld,
  IconPoint,
  IconAppWindow,
  IconPhoto,
  IconFolders,
  IconLanguage,
  IconFile,
  IconAdjustmentsHorizontal,
  IconTrademark,
  IconTags,
  IconStars,
  IconTruckDelivery,
  IconCreditCard,
  IconReportAnalytics,
  IconDiscountCheck,
  IconDiscount2,
  IconGift,
  IconMessage,
  IconMail,
  IconBuildingWarehouse,
  IconArrowsLeftRight,
  IconCategory,
} from '@tabler/icons-react';

const Menuitems = [
  // ===== الرئيسية =====
  {
    navlabel: true,
    subheader: 'الرئيسية',
  },
  {
    id: uniqueId(),
    title: 'لوحة التحكم',
    icon: IconHome,
    href: '/system',
    chip: 'جديد',
    chipColor: 'secondary',
  },

  // =====================
  // إدارة المنتجات والمخزون
  // (الكتالوج + العمليات + المخازن)
  // =====================
  { navlabel: true, subheader: 'إدارة المنتجات والمخزون' },

  // --- 1. الكتالوج (المنتجات) ---
  {
    id: uniqueId(),
    title: 'المنتجات والكتالوج',
    icon: IconPackage,
    href: '/system/catalog',
    children: [
      // العناصر الأصلية لـ المنتجات
      {
        id: uniqueId(),
        title: 'إضافة منتج جديد',
        icon: IconPoint,
        href: '/system/catalog/products/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة المنتجات',
        icon: IconPoint,
        href: '/system/catalog/products/list',
      },
      {
        id: uniqueId(),
        title: 'مدير المتغيرات',
        icon: IconAdjustmentsHorizontal,
        href: '/system/catalog/products/variants',
      },
      {
        id: uniqueId(),
        title: 'المجموعات والطقم',
        icon: IconTools,
        href: '/system/catalog/products/bundles',
      },
      {
        id: uniqueId(),
        title: 'النشر للمتاجر الفرعية',
        icon: IconArrowsLeftRight,
        href: '/system/catalog/products/publishing',
      },
      {
        id: uniqueId(),
        title: 'المنتجات المحذوفة',
        icon: IconPoint,
        href: '/system/catalog/products/deleted',
      },
      // العناصر الأصلية لـ التصنيفات، الخصائص، العلامات التجارية
      {
        id: uniqueId(),
        title: 'التصنيفات',
        icon: IconCategory,
        href: '/system/catalog/categories',
      },
      {
        id: uniqueId(),
        title: 'الخصائص',
        icon: IconAdjustmentsHorizontal,
        href: '/system/catalog/attributes',
      },
      {
        id: uniqueId(),
        title: 'العلامات التجارية',
        icon: IconTrademark,
        href: '/system/catalog/brands',
      },
      {
        id: uniqueId(),
        title: 'علامات المنتجات',
        icon: IconTags,
        href: '/system/catalog/product-tags',
      },
      {
        id: uniqueId(),
        title: 'المجموعات (Collections)',
        icon: IconFolders,
        href: '/system/catalog/collections',
      },
      {
        id: uniqueId(),
        title: 'البحث والمرادفات',
        icon: IconFile,
        href: '/system/catalog/search',
      },
      {
        id: uniqueId(),
        title: 'التقييمات',
        icon: IconStars,
        href: '/system/catalog/reviews',
      },
    ],
  },
  // --- 2. العمليات والمخزون ---
  {
    id: uniqueId(),
    title: 'المخازن والمخزون',
    icon: IconBuildingWarehouse,
    href: '/system/operations',
    children: [
      // العناصر الأصلية لـ العمليات
      {
        id: uniqueId(),
        title: 'المستودعات',
        icon: IconBuildingWarehouse,
        href: '/system/operations/warehouses',
      },
      {
        id: uniqueId(),
        title: 'إدارة المخزون',
        icon: IconPackage,
        href: '/system/operations/inventory',
      },
      {
        id: uniqueId(),
        title: 'التحويلات',
        icon: IconArrowsLeftRight,
        href: '/system/operations/transfers',
      },
      {
        id: uniqueId(),
        title: 'التعديلات المخزنية',
        icon: IconTools,
        href: '/system/operations/adjustments',
      },
      {
        id: uniqueId(),
        title: 'جرد المخزون',
        icon: IconFile,
        href: '/system/operations/stocktakes',
      },
      {
        id: uniqueId(),
        title: 'إعادة التموين/التخطيط',
        icon: IconReportAnalytics,
        href: '/system/operations/replenishment',
      },
      {
        id: uniqueId(),
        title: 'تخصيص للمتاجر الفرعية',
        icon: IconArrowsLeftRight,
        href: '/system/operations/allocations',
      },
    ],
  },

  // =====================
  // المبيعات والمشتريات
  // (المبيعات، المشتريات، الموردين)
  // =====================
  { navlabel: true, subheader: 'المبيعات والمشتريات' },

  // --- 1. المبيعات والتنفيذ (Sales) ---
  {
    id: uniqueId(),
    title: 'الطلبات والتنفيذ',
    icon: IconShoppingCart,
    href: '/system/orders',
    children: [
      // العناصر الأصلية لـ الطلبات
      {
        id: uniqueId(),
        title: 'جميع الطلبات',
        icon: IconPoint,
        href: '/system/orders/list',
      },
      {
        id: uniqueId(),
        title: 'مراقبة او تتبع الطلبات',
        icon: IconPoint,
        href: '/system/orders/orders-tracking',
      },
      {
        id: uniqueId(),
        title: 'جديدة / غير منفذة',
        icon: IconPoint,
        href: '/system/orders/unfulfilled',
      },
      {
        id: uniqueId(),
        title: 'قيد التنفيذ',
        icon: IconPoint,
        href: '/system/orders/fulfillment',
      },
      {
        id: uniqueId(),
        title: 'تم الشحن',
        icon: IconPoint,
        href: '/system/orders/shipped',
      },
      {
        id: uniqueId(),
        title: 'تم التسليم',
        icon: IconPoint,
        href: '/system/orders/delivered',
      },
      {
        id: uniqueId(),
        title: 'الإلغاءات',
        icon: IconPoint,
        href: '/system/orders/cancellations',
      },
      {
        id: uniqueId(),
        title: 'مراجعة الاحتيال',
        icon: IconPoint,
        href: '/system/orders/fraud',
      },
      {
        id: uniqueId(),
        title: 'المدفوعات',
        icon: IconCreditCard,
        href: '/system/orders/payments',
      },
      {
        id: uniqueId(),
        title: 'الشحنات',
        icon: IconTruckDelivery,
        href: '/system/orders/shipments',
      },
      {
        id: uniqueId(),
        title: 'الإرجاعات (RMA)',
        icon: IconCash,
        href: '/system/orders/returns',
      },
    ],
  },

  // --- 2. المشتريات (Procurement) ---
  {
    id: uniqueId(),
    title: 'المشتريات والموردين', // Purchase Orders (POs)
    icon: IconFileInvoice,
    href: '/system/procurement',
    children: [
      // العناصر الجديدة لـ المشتريات
      {
        id: uniqueId(),
        title: 'الموردين',
        icon: IconUsers,
        href: '/system/procurement/suppliers',
      },
      {
        id: uniqueId(),
        title: 'طلبات الشراء',
        icon: IconPoint,
        href: '/system/procurement/purchase-requests',
      },
      {
        id: uniqueId(),
        title: 'قائمة أوامر الشراء',
        icon: IconPoint,
        href: '/system/procurement/purchase-orders',
      },
      {
        id: uniqueId(),
        title: 'استلام البضائع',
        icon: IconPoint,
        href: '/system/procurement/goods-receipts',
      },
      {
        id: uniqueId(),
        title: 'فواتير الموردين', // Vendor Bills
        icon: IconPoint,
        href: '/system/procurement/vendor-bills',
      },
    ],
  },

  // =====================
  // إدارة علاقات العملاء والتسويق
  // (CRM & Pricing)
  // =====================
  { navlabel: true, subheader: 'إدارة علاقات العملاء والتسويق' },
  {
    id: uniqueId(),
    title: 'إدارة العملاء (CRM)',
    icon: IconUsers,
    href: '/system/crm',
    children: [
      // عناصر الـ CRM الجديدة
      {
        id: uniqueId(),
        title: 'العملاء المحتملون',
        icon: IconPoint,
        href: '/system/crm/leads',
      },
      {
        id: uniqueId(),
        title: 'الفرص والمبيعات',
        icon: IconPoint,
        href: '/system/crm/opportunities',
      },
      {
        id: uniqueId(),
        title: 'اتصالات العميل',
        icon: IconPoint,
        href: '/system/crm/activities',
      },
      // العناصر الأصلية لـ العملاء والشرائح
      {
        id: uniqueId(),
        title: 'قائمة العملاء',
        icon: IconPoint,
        href: '/system/crm/customers', // الإبقاء على route الأصلي
      },
      {
        id: uniqueId(),
        title: 'شرائح العملاء',
        icon: IconPoint,
        href: '/system/crm/segments', // الإبقاء على route الأصلي
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'التسعير والحملات',
    icon: IconDiscountCheck,
    href: '/system/pricing',
    children: [
      // العناصر الأصلية لـ التسعير، العروض الترويجية، الكوبونات
      {
        id: uniqueId(),
        title: 'التسعير (القوائم)',
        icon: IconReportAnalytics,
        href: '/system/pricing/lists',
      },
      {
        id: uniqueId(),
        title: 'العروض الترويجية',
        icon: IconDiscountCheck,
        href: '/system/pricing/promotions',
      },
      {
        id: uniqueId(),
        title: 'الكوبونات',
        icon: IconDiscount2,
        href: '/system/pricing/coupons',
      },
      {
        id: uniqueId(),
        title: 'حملات التسويق',
        icon: IconReportAnalytics,
        href: '/system/pricing/marketing-campaigns',
      },
      {
        id: uniqueId(),
        title: 'تقويم الحملات',
        icon: IconReportAnalytics,
        href: '/system/pricing/campaigns',
      },
      {
        id: uniqueId(),
        title: 'الولاء والمحافظ',
        icon: IconGift,
        href: '/system/pricing/loyalty',
      },
      {
        id: uniqueId(),
        title: 'التسويق والإشعارات',
        icon: IconReportAnalytics,
        href: '/system/pricing/marketing',
      },
    ],
  },

  // =====================
  // الحسابات والمالية
  // (Accounting)
  // =====================
  { navlabel: true, subheader: 'الحسابات والمالية' },

  {
    id: uniqueId(),
    title: 'الدفاتر والسجلات',
    icon: IconCash,
    href: '/system/finance',
    children: [
      // العناصر الجديدة لـ الحسابات
      {
        id: uniqueId(),
        title: 'شجرة الحسابات',
        icon: IconPoint,
        href: '/system/finance/chart-of-accounts',
      },
      {
        id: uniqueId(),
        title: 'القيود اليومية',
        icon: IconPoint,
        href: '/system/finance/journal-entries',
      },
      {
        id: uniqueId(),
        title: 'الميزانية',
        icon: IconPoint,
        href: '/system/finance/budgets',
      },
      {
        id: uniqueId(),
        title: 'البنوك والصناديق',
        icon: IconCreditCard,
        href: '/system/finance/cash-management',
      },
      {
        id: uniqueId(),
        title: 'الأصول الثابتة',
        icon: IconTools,
        href: '/system/finance/fixed-assets',
      },
      {
        id: uniqueId(),
        title: 'الضرائب',
        icon: IconFileInvoice,
        href: '/system/finance/taxes',
      },
      // العناصر الأصلية لـ الفواتير (دمج الذمم المدينة)
      {
        id: uniqueId(),
        title: 'فواتير العملاء',
        icon: IconFileInvoice,
        href: '/system/finance/customer-invoices',
      },
    ],
  },

  // =====================
  // إدارة المشاريع وشؤون الموظفين
  // (Project Management & HR)
  // =====================
  { navlabel: true, subheader: 'المشاريع والموارد البشرية' },

  // --- 1. إدارة المشاريع ---
  {
    id: uniqueId(),
    title: 'إدارة المشاريع',
    icon: IconFolders,
    href: '/system/projects',
    children: [
      // العناصر الجديدة لـ إدارة المشاريع
      {
        id: uniqueId(),
        title: 'قائمة المشاريع',
        icon: IconPoint,
        href: '/system/projects/list',
      },
      {
        id: uniqueId(),
        title: 'المهام',
        icon: IconPoint,
        href: '/system/projects/tasks',
      },
      {
        id: uniqueId(),
        title: 'تخصيص الموارد',
        icon: IconPoint,
        href: '/system/projects/resources',
      },
    ],
  },

  // --- 2. شؤون الموظفين (HR) ---
  {
    id: uniqueId(),
    title: 'شؤون الموظفين',
    icon: IconUsers,
    href: '/system/hr',
    children: [
      // العناصر الجديدة لـ شؤون الموظفين
      {
        id: uniqueId(),
        title: 'إدارة الموظفين',
        icon: IconPoint,
        href: '/system/hr/employees',
      },
      {
        id: uniqueId(),
        title: 'المرتبات والأجور',
        icon: IconPoint,
        href: '/system/hr/payroll',
      },
      {
        id: uniqueId(),
        title: 'الإجازات والحضور',
        icon: IconPoint,
        href: '/system/hr/attendance',
      },
    ],
  },

  // =====================
  // إدارة الواجهة الأمامية
  // (CMS)
  // =====================
  { navlabel: true, subheader: 'إدارة الواجهة الأمامية' },
  {
    id: uniqueId(),
    title: 'إدارة الواجهة الأمامية',
    icon: IconAppWindow,
    href: '/system/frontend-pages',
    children: [
      // جميع العناصر الأصلية لـ إدارة الواجهة الأمامية
      {
        id: uniqueId(),
        title: 'الصفحة الرئيسية',
        icon: IconPoint,
        href: '/system/cms/homepage',
      },
      {
        id: uniqueId(),
        title: 'من نحن',
        icon: IconPoint,
        href: '/system/cms/about-us',
      },
      {
        id: uniqueId(),
        title: 'اتصل بنا',
        icon: IconPoint,
        href: '/system/cms/contact-us',
      },
      {
        id: uniqueId(),
        title: 'المدونة',
        icon: IconPoint,
        href: '/system/cms/blogs',
      },
      {
        id: uniqueId(),
        title: 'معرض الأعمال',
        icon: IconPoint,
        href: '/system/cms/portfolio',
      },
      {
        id: uniqueId(),
        title: 'صفحة الأسعار',
        icon: IconPoint,
        href: '/system/cms/pricing',
      },
      {
        id: uniqueId(),
        title: 'كن بائعاً',
        icon: IconPoint,
        href: '/system/cms/become-seller',
      },
      {
        id: uniqueId(),
        title: 'كن مورداً',
        icon: IconPoint,
        href: '/system/cms/become-supplier',
      },
      {
        id: uniqueId(),
        title: 'السياسات',
        icon: IconPoint,
        href: '/system/cms/policies',
      },
      {
        id: uniqueId(),
        title: 'العروض القادمة',
        icon: IconPoint,
        href: '/system/cms/upcoming-offers',
      },
      {
        id: uniqueId(),
        title: 'الأسئلة الشائعة',
        icon: IconPoint,
        href: '/system/cms/faq',
      },
      {
        id: uniqueId(),
        title: 'الوظائف',
        icon: IconPoint,
        href: '/system/cms/careers',
      },
      // CMS Ops
      {
        id: uniqueId(),
        title: 'مكتبة الوسائط',
        icon: IconPhoto,
        href: '/system/cms/media',
      },
      {
        id: uniqueId(),
        title: 'التنقل',
        icon: IconFolders,
        href: '/system/cms/navigation',
      },
      {
        id: uniqueId(),
        title: 'تحسين محركات البحث',
        icon: IconWorld,
        href: '/system/cms/seo',
      },
      {
        id: uniqueId(),
        title: 'الترجمات',
        icon: IconLanguage,
        href: '/system/cms/translations',
      },
      {
        id: uniqueId(),
        title: 'النماذج (المنشئ)',
        icon: IconFile,
        href: '/system/cms/forms',
      },
    ],
  },

  // =====================
  // إدارة المتاجر الفرعية
  // =====================
  { navlabel: true, subheader: 'إدارة المتاجر الفرعية' },

  {
    id: uniqueId(),
    title: 'منصة المتاجر الفرعية',
    icon: IconBuildingWarehouse,
    href: '/system/substores',
    children: [
      // العناصر الجديدة لـ إدارة المتاجر الفرعية
      {
        id: uniqueId(),
        title: 'قائمة المتاجر الفرعية',
        icon: IconPoint,
        href: '/system/substores/list',
      },
      {
        id: uniqueId(),
        title: 'إعدادات المتاجر',
        icon: IconPoint,
        href: '/system/substores/settings',
      },
      {
        id: uniqueId(),
        title: 'إشراف وموافقة',
        icon: IconPoint,
        href: '/system/substores/approvals',
      },
    ],
  },

  // =====================
  // التحليلات
  // =====================
  { navlabel: true, subheader: 'التحليلات' },
  {
    id: uniqueId(),
    title: 'التقارير ولوحات التحكم',
    icon: IconReportAnalytics,
    href: '/system/analytics',
    children: [
      // جميع العناصر الأصلية لـ التحليلات
      {
        id: uniqueId(),
        title: 'المبيعات',
        icon: IconPoint,
        href: '/system/analytics/sales',
      },
      {
        id: uniqueId(),
        title: 'المخزون',
        icon: IconPoint,
        href: '/system/analytics/inventory',
      },
      {
        id: uniqueId(),
        title: 'البحث',
        icon: IconPoint,
        href: '/system/analytics/search',
      },
      {
        id: uniqueId(),
        title: 'العملاء',
        icon: IconPoint,
        href: '/system/analytics/customers',
      },
      {
        id: uniqueId(),
        title: 'التسويق',
        icon: IconPoint,
        href: '/system/analytics/marketing',
      },
      {
        id: uniqueId(),
        title: 'منشئ التقارير',
        icon: IconPoint,
        href: '/system/analytics/builder',
      },
    ],
  },

  // =====================
  // الإعدادات والدعم
  // =====================
  { navlabel: true, subheader: 'الإعدادات والدعم' },
  {
    id: uniqueId(),
    title: 'إعدادات النظام',
    icon: IconSettings,
    href: '/system/settings',
  },
  {
    id: uniqueId(),
    title: 'مركز المساعدة',
    icon: IconMessage,
    href: '/system/help',
  },
  {
    id: uniqueId(),
    title: 'اتصل بالدعم',
    icon: IconMail,
    href: '/system/contact',
  },
];

export default Menuitems;
