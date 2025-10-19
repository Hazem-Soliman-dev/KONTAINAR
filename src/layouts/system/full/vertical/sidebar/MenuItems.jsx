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
  // إدارة الواجهة الأمامية
  // =====================
  { navlabel: true, subheader: 'إدارة الواجهة الأمامية' },
  {
    id: uniqueId(),
    title: 'إدارة الواجهة الأمامية',
    icon: IconAppWindow,
    href: '/system/frontend-pages',
    children: [
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
        href: '/system/cms/about',
      },
      {
        id: uniqueId(),
        title: 'اتصل بنا',
        icon: IconPoint,
        href: '/system/cms/contact',
      },
      {
        id: uniqueId(),
        title: 'المدونة',
        icon: IconPoint,
        href: '/system/cms/blogs',
        children: [
          {
            id: uniqueId(),
            title: 'إضافة مقال جديد',
            icon: IconPoint,
            href: '/system/cms/blogs/create',
          },
          {
            id: uniqueId(),
            title: 'قائمة المقالات',
            icon: IconPoint,
            href: '/system/cms/blogs/list',
          },
          {
            id: uniqueId(),
            title: 'المقالات المحذوفة',
            icon: IconPoint,
            href: '/system/cms/blogs/deleted',
          },
          {
            id: uniqueId(),
            title: 'التصنيفات',
            icon: IconPoint,
            href: '/system/cms/blogs/categories',
          },
          {
            id: uniqueId(),
            title: 'العلامات',
            icon: IconPoint,
            href: '/system/cms/blogs/tags',
          },
        ],
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
        children: [
          {
            id: uniqueId(),
            title: 'الخصوصية',
            icon: IconPoint,
            href: '/system/cms/policies/privacy',
          },
          {
            id: uniqueId(),
            title: 'الإرجاع',
            icon: IconPoint,
            href: '/system/cms/policies/return',
          },
          {
            id: uniqueId(),
            title: 'الاسترداد',
            icon: IconPoint,
            href: '/system/cms/policies/refund',
          },
          {
            id: uniqueId(),
            title: 'الشروط',
            icon: IconPoint,
            href: '/system/cms/policies/terms',
          },
          {
            id: uniqueId(),
            title: 'الشحن',
            icon: IconPoint,
            href: '/system/cms/policies/shipping',
          },
          {
            id: uniqueId(),
            title: 'طرق الدفع',
            icon: IconPoint,
            href: '/system/cms/policies/payment-methods',
          },
        ],
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
  // الكتالوج والتسويق
  // =====================
  { navlabel: true, subheader: 'الكتالوج والتسويق' },

  {
    id: uniqueId(),
    title: 'المنتجات',
    icon: IconPackage,
    href: '/system/catalog/products',
    children: [
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
    ],
  },

  {
    id: uniqueId(),
    title: 'التصنيفات',
    icon: IconCategory,
    href: '/system/catalog/categories',
    children: [
      {
        id: uniqueId(),
        title: 'إضافة تصنيف جديد',
        icon: IconPoint,
        href: '/system/catalog/categories/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة التصنيفات',
        icon: IconPoint,
        href: '/system/catalog/categories/list',
      },
      {
        id: uniqueId(),
        title: 'التصنيفات المحذوفة',
        icon: IconPoint,
        href: '/system/catalog/categories/deleted',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'الخصائص',
    icon: IconAdjustmentsHorizontal,
    href: '/system/catalog/attributes',
    children: [
      {
        id: uniqueId(),
        title: 'إضافة خاصية جديدة',
        icon: IconPoint,
        href: '/system/catalog/attributes/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة الخصائص',
        icon: IconPoint,
        href: '/system/catalog/attributes/list',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'العلامات التجارية',
    icon: IconTrademark,
    href: '/system/catalog/brands',
    children: [
      {
        id: uniqueId(),
        title: 'إضافة علامة تجارية جديدة',
        icon: IconPoint,
        href: '/system/catalog/brands/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة العلامات التجارية',
        icon: IconPoint,
        href: '/system/catalog/brands/list',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'علامات المنتجات',
    icon: IconTags,
    href: '/system/catalog/product-tags',
    children: [
      {
        id: uniqueId(),
        title: 'إضافة علامة جديدة',
        icon: IconPoint,
        href: '/system/catalog/product-tags/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة العلامات',
        icon: IconPoint,
        href: '/system/catalog/product-tags/list',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'المجموعات',
    icon: IconFolders,
    href: '/system/catalog/collections',
    children: [
      {
        id: uniqueId(),
        title: 'إضافة مجموعة جديدة',
        icon: IconPoint,
        href: '/system/catalog/collections/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة المجموعات',
        icon: IconPoint,
        href: '/system/catalog/collections/list',
      },
    ],
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

  // =====================
  // الطلبات والتنفيذ
  // =====================
  { navlabel: true, subheader: 'الطلبات والتنفيذ' },

  {
    id: uniqueId(),
    title: 'الطلبات',
    icon: IconShoppingCart,
    href: '/system/orders/list',
    children: [
      {
        id: uniqueId(),
        title: 'جميع الطلبات',
        icon: IconPoint,
        href: '/system/orders/list',
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
        title: 'الفواتير (المبيعات)',
        icon: IconFileInvoice,
        href: '/system/invoices',
      },
      {
        id: uniqueId(),
        title: 'المدفوعات',
        icon: IconCreditCard,
        href: '/system/payments',
      },
      {
        id: uniqueId(),
        title: 'الشحنات',
        icon: IconTruckDelivery,
        href: '/system/shipments',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'الإرجاعات (RMA)',
    icon: IconCash,
    href: '/system/returns',
  },

  // =====================
  // العمليات
  // =====================
  { navlabel: true, subheader: 'العمليات' },

  {
    id: uniqueId(),
    title: 'المستودعات',
    icon: IconBuildingWarehouse,
    href: '/system/operations/warehouses',
  },
  {
    id: uniqueId(),
    title: 'المخزون',
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
    title: 'التعديلات',
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
    title: 'إعادة التموين',
    icon: IconReportAnalytics,
    href: '/system/operations/replenishment',
  },
  {
    id: uniqueId(),
    title: 'تخصيص للمتاجر الفرعية',
    icon: IconArrowsLeftRight,
    href: '/system/operations/allocations',
  },

  // =====================
  // التسعير والعملاء
  // =====================
  { navlabel: true, subheader: 'التسعير والعملاء' },

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
    href: '/system/coupons',
    children: [
      {
        id: uniqueId(),
        title: 'إضافة كوبون جديد',
        icon: IconPoint,
        href: '/system/pricing/coupons/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة الكوبونات',
        icon: IconPoint,
        href: '/system/pricing/coupons/list',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'تقويم الحملات',
    icon: IconReportAnalytics,
    href: '/system/pricing/campaigns',
  },
  {
    id: uniqueId(),
    title: 'العملاء',
    icon: IconUsers,
    href: '/system/pricing/customers',
  },
  {
    id: uniqueId(),
    title: 'الشرائح',
    icon: IconUsers,
    href: '/system/pricing/segments',
  },
  {
    id: uniqueId(),
    title: 'الولاء والمحافظ',
    icon: IconGift,
    href: '/system/pricing/loyalty',
  },
  {
    id: uniqueId(),
    title: 'التسويق',
    icon: IconReportAnalytics,
    href: '/system/pricing/marketing',
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
      {
        id: uniqueId(),
        title: 'المبيعات',
        icon: IconPoint,
        href: '/system/reports/sales',
      },
      {
        id: uniqueId(),
        title: 'التسويق',
        icon: IconPoint,
        href: '/system/reports/merchandising',
      },
      {
        id: uniqueId(),
        title: 'المخزون',
        icon: IconPoint,
        href: '/system/reports/inventory',
      },
      {
        id: uniqueId(),
        title: 'البحث',
        icon: IconPoint,
        href: '/system/reports/search',
      },
      {
        id: uniqueId(),
        title: 'العملاء',
        icon: IconPoint,
        href: '/system/reports/customers',
      },
      {
        id: uniqueId(),
        title: 'التسويق',
        icon: IconPoint,
        href: '/system/reports/marketing',
      },
      {
        id: uniqueId(),
        title: 'منشئ التقارير',
        icon: IconPoint,
        href: '/system/reports/builder',
      },
    ],
  },

  // =====================
  // الإعدادات
  // =====================
  { navlabel: true, subheader: 'الإعدادات' },
  {
    id: uniqueId(),
    title: 'إعدادات المتجر',
    icon: IconSettings,
    href: '/system/settings',
  },

  // =====================
  // الدعم
  // =====================
  { navlabel: true, subheader: 'الدعم' },
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
