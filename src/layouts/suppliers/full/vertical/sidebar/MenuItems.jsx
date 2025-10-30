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
    chip: 'جديد',
    chipColor: 'secondary',
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
        title: 'إضافة منتج جديد',
        icon: IconPoint,
        href: '/suppliers/products/add',
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
        icon: IconPoint,
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
  },
  {
    id: uniqueId(),
    title: 'العقد والاتفاقية',
    icon: IconFileDescription,
    href: '/suppliers/contract',
  },
];

export default Menuitems;
