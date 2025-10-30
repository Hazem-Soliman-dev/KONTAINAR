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
    href: '/sub-stores',
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
    href: '/sub-stores/catalog',
    children: [
      {
        id: uniqueId(),
        title: 'إضافة منتج جديد',
        icon: IconPoint,
        href: '/sub-stores/catalog/products/create',
      },
      {
        id: uniqueId(),
        title: 'قائمة المنتجات',
        icon: IconPoint,
        href: '/sub-stores/catalog/products/list',
      },
      {
        id: uniqueId(),
        title: 'مدير المتغيرات',
        icon: IconAdjustmentsHorizontal,
        href: '/sub-stores/catalog/products/variants',
      },
      {
        id: uniqueId(),
        title: 'المجموعات والطقم',
        icon: IconPoint,
        href: '/sub-stores/catalog/products/bundles',
      },
      // NOTE: No Publishing feature for sub-stores
      {
        id: uniqueId(),
        title: 'المنتجات المحذوفة',
        icon: IconPoint,
        href: '/sub-stores/catalog/products/deleted',
      },
      {
        id: uniqueId(),
        title: 'التصنيفات',
        icon: IconCategory,
        href: '/sub-stores/catalog/categories',
      },
      {
        id: uniqueId(),
        title: 'الخصائص',
        icon: IconAdjustmentsHorizontal,
        href: '/sub-stores/catalog/attributes',
      },
      {
        id: uniqueId(),
        title: 'العلامات التجارية',
        icon: IconTrademark,
        href: '/sub-stores/catalog/brands',
      },
      {
        id: uniqueId(),
        title: 'علامات المنتجات',
        icon: IconTags,
        href: '/sub-stores/catalog/product-tags',
      },
      {
        id: uniqueId(),
        title: 'التقييمات',
        icon: IconStars,
        href: '/sub-stores/catalog/reviews',
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
    href: '/sub-stores/orders',
    children: [
      {
        id: uniqueId(),
        title: 'جميع الطلبات',
        icon: IconPoint,
        href: '/sub-stores/orders/list',
      },
      {
        id: uniqueId(),
        title: 'مراقبة او تتبع الطلبات',
        icon: IconPoint,
        href: '/sub-stores/orders/tracking',
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
    href: '/sub-stores/crm',
    children: [
      {
        id: uniqueId(),
        title: 'قائمة العملاء',
        icon: IconPoint,
        href: '/sub-stores/crm/customers',
      },
      {
        id: uniqueId(),
        title: 'شرائح العملاء',
        icon: IconPoint,
        href: '/sub-stores/crm/segments',
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
    href: '/sub-stores/analytics',
    children: [
      {
        id: uniqueId(),
        title: 'المبيعات',
        icon: IconPoint,
        href: '/sub-stores/analytics/sales',
      },
      {
        id: uniqueId(),
        title: 'المخزون',
        icon: IconPoint,
        href: '/sub-stores/analytics/inventory',
      },
      {
        id: uniqueId(),
        title: 'العملاء',
        icon: IconPoint,
        href: '/sub-stores/analytics/customers',
      },
      {
        id: uniqueId(),
        title: 'التسويق',
        icon: IconPoint,
        href: '/sub-stores/analytics/marketing',
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
    href: '/sub-stores/cms',
    children: [
      {
        id: uniqueId(),
        title: 'الصفحة الرئيسية',
        icon: IconPoint,
        href: '/sub-stores/cms/homepage',
      },
      {
        id: uniqueId(),
        title: 'من نحن',
        icon: IconPoint,
        href: '/sub-stores/cms/about-us',
      },
      {
        id: uniqueId(),
        title: 'اتصل بنا',
        icon: IconPoint,
        href: '/sub-stores/cms/contact-us',
      },
      {
        id: uniqueId(),
        title: 'المدونة',
        icon: IconPoint,
        href: '/sub-stores/cms/blogs',
      },
      {
        id: uniqueId(),
        title: 'معرض الأعمال',
        icon: IconPoint,
        href: '/sub-stores/cms/portfolio',
      },
      {
        id: uniqueId(),
        title: 'صفحة الأسعار',
        icon: IconPoint,
        href: '/sub-stores/cms/pricing',
      },
      {
        id: uniqueId(),
        title: 'كن بائعاً',
        icon: IconPoint,
        href: '/sub-stores/cms/become-seller',
      },
      {
        id: uniqueId(),
        title: 'كن مورداً',
        icon: IconPoint,
        href: '/sub-stores/cms/become-supplier',
      },
      {
        id: uniqueId(),
        title: 'السياسات',
        icon: IconPoint,
        href: '/sub-stores/cms/policies',
      },
      {
        id: uniqueId(),
        title: 'العروض القادمة',
        icon: IconPoint,
        href: '/sub-stores/cms/upcoming-offers',
      },
      {
        id: uniqueId(),
        title: 'الأسئلة الشائعة',
        icon: IconPoint,
        href: '/sub-stores/cms/faq',
      },
      {
        id: uniqueId(),
        title: 'الوظائف',
        icon: IconPoint,
        href: '/sub-stores/cms/careers',
      },
      {
        id: uniqueId(),
        title: 'مكتبة الوسائط',
        icon: IconPhoto,
        href: '/sub-stores/cms/media',
      },
      {
        id: uniqueId(),
        title: 'التنقل',
        icon: IconFolders,
        href: '/sub-stores/cms/navigation',
      },
      {
        id: uniqueId(),
        title: 'تحسين محركات البحث',
        icon: IconPoint,
        href: '/sub-stores/cms/seo',
      },
      {
        id: uniqueId(),
        title: 'الترجمات',
        icon: IconLanguage,
        href: '/sub-stores/cms/translations',
      },
      {
        id: uniqueId(),
        title: 'النماذج (المنشئ)',
        icon: IconFile,
        href: '/sub-stores/cms/forms',
      },
    ],
  },
];

export default Menuitems;
