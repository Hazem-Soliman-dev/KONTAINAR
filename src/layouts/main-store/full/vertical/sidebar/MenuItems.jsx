import { uniqueId } from 'lodash';
import {
  IconHome,
  IconPackage,
  IconShoppingCart,
  IconUsers,
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
  IconReportAnalytics,
  IconArrowsLeftRight,
  IconCategory,
  IconBuildingWarehouse,
  IconSettings,
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
    href: '/main-store',
    chip: 'جديد',
    chipColor: 'secondary',
  },

  // =====================
  // إدارة المنتجات والكتالوج
  // =====================
  { navlabel: true, subheader: 'إدارة المنتجات' },

  {
    id: uniqueId(),
    title: 'المنتجات والكتالوج',
    icon: IconPackage,
    href: '/main-store/catalog',
    children: [
      {
        id: uniqueId(),
        title: 'إضافة منتج جديد',
        icon: IconPoint,
        href: '/main-store/catalog/products/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة المنتجات',
        icon: IconPoint,
        href: '/main-store/catalog/products/list',
      },
      {
        id: uniqueId(),
        title: 'مدير المتغيرات',
        icon: IconAdjustmentsHorizontal,
        href: '/main-store/catalog/products/variants',
      },
      {
        id: uniqueId(),
        title: 'المجموعات والطقم',
        icon: IconPoint,
        href: '/main-store/catalog/products/bundles',
      },
      {
        id: uniqueId(),
        title: 'النشر للمتاجر الفرعية',
        icon: IconArrowsLeftRight,
        href: '/main-store/catalog/products/publishing',
      },
      {
        id: uniqueId(),
        title: 'المنتجات المحذوفة',
        icon: IconPoint,
        href: '/main-store/catalog/products/deleted',
      },
      {
        id: uniqueId(),
        title: 'التصنيفات',
        icon: IconCategory,
        href: '/main-store/catalog/categories',
      },
      {
        id: uniqueId(),
        title: 'الخصائص',
        icon: IconAdjustmentsHorizontal,
        href: '/main-store/catalog/attributes',
      },
      {
        id: uniqueId(),
        title: 'العلامات التجارية',
        icon: IconTrademark,
        href: '/main-store/catalog/brands',
      },
      {
        id: uniqueId(),
        title: 'علامات المنتجات',
        icon: IconTags,
        href: '/main-store/catalog/product-tags',
      },
      {
        id: uniqueId(),
        title: 'التقييمات',
        icon: IconStars,
        href: '/main-store/catalog/reviews',
      },
    ],
  },

  // =====================
  // الطلبات والمبيعات
  // =====================
  { navlabel: true, subheader: 'الطلبات والمبيعات' },

  {
    id: uniqueId(),
    title: 'الطلبات',
    icon: IconShoppingCart,
    href: '/main-store/orders',
    children: [
      {
        id: uniqueId(),
        title: 'جميع الطلبات',
        icon: IconPoint,
        href: '/main-store/orders/list',
      },
      {
        id: uniqueId(),
        title: 'مراقبة او تتبع الطلبات',
        icon: IconPoint,
        href: '/main-store/orders/tracking',
      },
    ],
  },

  // =====================
  // إدارة العملاء
  // =====================
  { navlabel: true, subheader: 'إدارة العملاء' },

  {
    id: uniqueId(),
    title: 'العملاء (CRM)',
    icon: IconUsers,
    href: '/main-store/crm',
    children: [
      {
        id: uniqueId(),
        title: 'قائمة العملاء',
        icon: IconPoint,
        href: '/main-store/crm/customers',
      },
      {
        id: uniqueId(),
        title: 'شرائح العملاء',
        icon: IconPoint,
        href: '/main-store/crm/segments',
      },
    ],
  },

  // =====================
  // التحليلات والتقارير
  // =====================
  { navlabel: true, subheader: 'التحليلات' },

  {
    id: uniqueId(),
    title: 'التقارير ولوحات التحكم',
    icon: IconReportAnalytics,
    href: '/main-store/analytics',
    children: [
      {
        id: uniqueId(),
        title: 'المبيعات',
        icon: IconPoint,
        href: '/main-store/analytics/sales',
      },
      {
        id: uniqueId(),
        title: 'المخزون',
        icon: IconPoint,
        href: '/main-store/analytics/inventory',
      },
      {
        id: uniqueId(),
        title: 'العملاء',
        icon: IconPoint,
        href: '/main-store/analytics/customers',
      },
      {
        id: uniqueId(),
        title: 'التسويق',
        icon: IconPoint,
        href: '/main-store/analytics/marketing',
      },
    ],
  },

  // =====================
  // إدارة الواجهة الأمامية (CMS)
  // =====================
  { navlabel: true, subheader: 'إدارة المحتوى' },

  {
    id: uniqueId(),
    title: 'إدارة الواجهة الأمامية',
    icon: IconAppWindow,
    href: '/main-store/cms',
    children: [
      {
        id: uniqueId(),
        title: 'الصفحة الرئيسية',
        icon: IconPoint,
        href: '/main-store/cms/homepage',
      },
      {
        id: uniqueId(),
        title: 'من نحن',
        icon: IconPoint,
        href: '/main-store/cms/about-us',
      },
      {
        id: uniqueId(),
        title: 'اتصل بنا',
        icon: IconPoint,
        href: '/main-store/cms/contact-us',
      },
      {
        id: uniqueId(),
        title: 'المدونة',
        icon: IconPoint,
        href: '/main-store/cms/blogs',
      },
      {
        id: uniqueId(),
        title: 'معرض الأعمال',
        icon: IconPoint,
        href: '/main-store/cms/portfolio',
      },
      {
        id: uniqueId(),
        title: 'صفحة الأسعار',
        icon: IconPoint,
        href: '/main-store/cms/pricing',
      },
      {
        id: uniqueId(),
        title: 'كن بائعاً',
        icon: IconPoint,
        href: '/main-store/cms/become-seller',
      },
      {
        id: uniqueId(),
        title: 'كن مورداً',
        icon: IconPoint,
        href: '/main-store/cms/become-supplier',
      },
      {
        id: uniqueId(),
        title: 'السياسات',
        icon: IconPoint,
        href: '/main-store/cms/policies',
      },
      {
        id: uniqueId(),
        title: 'العروض القادمة',
        icon: IconPoint,
        href: '/main-store/cms/upcoming-offers',
      },
      {
        id: uniqueId(),
        title: 'الأسئلة الشائعة',
        icon: IconPoint,
        href: '/main-store/cms/faq',
      },
      {
        id: uniqueId(),
        title: 'الوظائف',
        icon: IconPoint,
        href: '/main-store/cms/careers',
      },
      {
        id: uniqueId(),
        title: 'مكتبة الوسائط',
        icon: IconPhoto,
        href: '/main-store/cms/media',
      },
      {
        id: uniqueId(),
        title: 'التنقل',
        icon: IconFolders,
        href: '/main-store/cms/navigation',
      },
      {
        id: uniqueId(),
        title: 'تحسين محركات البحث',
        icon: IconPoint,
        href: '/main-store/cms/seo',
      },
      {
        id: uniqueId(),
        title: 'الترجمات',
        icon: IconLanguage,
        href: '/main-store/cms/translations',
      },
      {
        id: uniqueId(),
        title: 'النماذج (المنشئ)',
        icon: IconFile,
        href: '/main-store/cms/forms',
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
    href: '/main-store/substores',
    children: [
      {
        id: uniqueId(),
        title: 'قائمة المتاجر الفرعية',
        icon: IconPoint,
        href: '/main-store/substores/list',
      },
      {
        id: uniqueId(),
        title: 'إعدادات المتاجر',
        icon: IconSettings,
        href: '/main-store/substores/settings',
      },
      {
        id: uniqueId(),
        title: 'إشراف وموافقة',
        icon: IconPoint,
        href: '/main-store/substores/approvals',
      },
    ],
  },
];

export default Menuitems;
