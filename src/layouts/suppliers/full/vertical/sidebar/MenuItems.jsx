import { uniqueId } from 'lodash';

import {
  IconHome,
  IconPackage,
  IconShoppingCart,
  IconFileInvoice,
  IconRefresh,
  IconMessageCircle,
  IconFileText,
  IconPoint,
  IconCategory,
  IconChartBar,
  IconCash,
  IconAlertCircle,
  IconFileDescription,
  IconReportAnalytics,
  IconUsers,
  IconTrademark,
  IconAdjustmentsHorizontal,
  IconTruckDelivery,
  IconClipboardList,
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
    href: '/suppliers',
    chip: 'مورد',
    chipColor: 'primary',
  },

  // ===== إدارة المنتجات =====
  {
    navlabel: true,
    subheader: 'إدارة المنتجات',
  },
  {
    id: uniqueId(),
    title: 'المنتجات',
    icon: IconPackage,
    href: '/suppliers/products',
    children: [
      {
        id: uniqueId(),
        title: 'قائمة المنتجات',
        icon: IconPoint,
        href: '/suppliers/products/list',
      },
      {
        id: uniqueId(),
        title: 'التصنيفات',
        icon: IconCategory,
        href: '/suppliers/products/categories',
      },
      {
        id: uniqueId(),
        title: 'إحصائيات المنتجات',
        icon: IconChartBar,
        href: '/suppliers/products/statistics',
      },
      {
        id: uniqueId(),
        title: 'إدارة التصنيفات',
        icon: IconCategory,
        href: '/suppliers/catalog/categories-manager',
      },
      {
        id: uniqueId(),
        title: 'الخصائص',
        icon: IconAdjustmentsHorizontal,
        href: '/suppliers/catalog/attributes',
      },
      {
        id: uniqueId(),
        title: 'العلامات التجارية',
        icon: IconTrademark,
        href: '/suppliers/catalog/brands',
      },
    ],
  },

  // ===== الطلبات =====
  {
    navlabel: true,
    subheader: 'الطلبات والفواتير',
  },
  {
    id: uniqueId(),
    title: 'الطلبات',
    icon: IconShoppingCart,
    href: '/suppliers/orders',
    children: [
      {
        id: uniqueId(),
        title: 'الطلبات الجديدة',
        icon: IconPoint,
        href: '/suppliers/orders/new',
      },
      {
        id: uniqueId(),
        title: 'سجل الطلبات',
        icon: IconPoint,
        href: '/suppliers/orders/history',
      },
      {
        id: uniqueId(),
        title: 'تتبع الطلبات',
        icon: IconTruckDelivery,
        href: '/suppliers/orders/tracking',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'الفواتير',
    icon: IconFileInvoice,
    href: '/suppliers/invoices',
    children: [
      {
        id: uniqueId(),
        title: 'قائمة الفواتير',
        icon: IconPoint,
        href: '/suppliers/invoices/list',
      },
      {
        id: uniqueId(),
        title: 'المدفوعات',
        icon: IconCash,
        href: '/suppliers/invoices/payments',
      },
    ],
  },

  // ===== المرتجعات =====
  {
    navlabel: true,
    subheader: 'المرتجعات والجودة',
  },
  {
    id: uniqueId(),
    title: 'المرتجعات',
    icon: IconRefresh,
    href: '/suppliers/returns',
    children: [
      {
        id: uniqueId(),
        title: 'قائمة المرتجعات',
        icon: IconPoint,
        href: '/suppliers/returns/list',
      },
      {
        id: uniqueId(),
        title: 'المنتجات التالفة',
        icon: IconAlertCircle,
        href: '/suppliers/returns/damaged',
      },
    ],
  },

  // ===== التحليلات والتقارير =====
  {
    navlabel: true,
    subheader: 'التحليلات والتقارير',
  },
  {
    id: uniqueId(),
    title: 'التقارير والإحصائيات',
    icon: IconReportAnalytics,
    href: '/suppliers/analytics',
    children: [
      {
        id: uniqueId(),
        title: 'تقارير المبيعات',
        icon: IconPoint,
        href: '/suppliers/analytics/sales',
      },
      {
        id: uniqueId(),
        title: 'تقارير المخزون',
        icon: IconPoint,
        href: '/suppliers/analytics/inventory',
      },
      {
        id: uniqueId(),
        title: 'أداء المنتجات',
        icon: IconPoint,
        href: '/suppliers/analytics/products',
      },
      {
        id: uniqueId(),
        title: 'تحليل العملاء',
        icon: IconPoint,
        href: '/suppliers/analytics/customers',
      },
      {
        id: uniqueId(),
        title: 'تقرير الأداء',
        icon: IconPoint,
        href: '/suppliers/analytics/performance',
      },
      {
        id: uniqueId(),
        title: 'منشئ التقارير',
        icon: IconPoint,
        href: '/suppliers/analytics/builder',
      },
    ],
  },

  // ===== إدارة العملاء =====
  {
    navlabel: true,
    subheader: 'العلاقات',
  },
  {
    id: uniqueId(),
    title: 'العملاء',
    icon: IconUsers,
    href: '/suppliers/customers',
  },

  // ===== الدعم والعقد =====
  {
    navlabel: true,
    subheader: 'الدعم والعقد',
  },
  {
    id: uniqueId(),
    title: 'الدعم الفني',
    icon: IconMessageCircle,
    href: '/suppliers/support',
    chip: 'دردشة',
    chipColor: 'success',
  },
  {
    id: uniqueId(),
    title: 'العقد والاتفاقية',
    icon: IconFileDescription,
    href: '/suppliers/contract',
  },
];

export default Menuitems;
