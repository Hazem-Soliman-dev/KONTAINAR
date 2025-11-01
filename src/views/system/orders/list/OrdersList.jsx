import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  Stack,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Toolbar,
  Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Add as AddIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const OrdersList = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('orderNo');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for orders with comprehensive details
  const ordersData = [
    {
      id: 1,
      orderNo: 'ORD-001',
      customer: {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '+966501234567',
        address: 'الرياض، المملكة العربية السعودية',
        loyaltyPoints: 1250,
        membershipLevel: 'gold',
      },
      totalAmount: 1250.5,
      status: 'بانتظار التحويل البنكي',
      paymentStatus: 'pending',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-20',
      items: [
        {
          name: 'لابتوب ديل XPS 13',
          sku: 'DELL-XPS13-001',
          quantity: 1,
          price: 1200.0,
          image: '/assets/images/products/laptop.jpg',
          category: 'إلكترونيات',
          brand: 'ديل',
        },
        {
          name: 'ماوس لاسلكي',
          sku: 'MOUSE-WIRELESS-001',
          quantity: 1,
          price: 50.5,
          image: '/assets/images/products/mouse.jpg',
          category: 'إلكترونيات',
          brand: 'لوجيتك',
        },
      ],
      shippingAddress: 'الرياض، المملكة العربية السعودية',
      billingAddress: 'الرياض، المملكة العربية السعودية',
      notes: 'طلب عاجل',
      lastModified: '2024-01-15',
      priority: 'high',
      source: 'موقع إلكتروني',
      trackingNumber: 'TRK123456789',
      carrier: 'شركة الشحن السريع',
      estimatedDelivery: '2024-01-20',
      actualDelivery: null,
      timeline: [
        { step: 'تم إنشاء الطلب', timestamp: '2024-01-15 10:30', status: 'completed' },
        { step: 'بانتظار التحويل البنكي', timestamp: null, status: 'current' },
        { step: 'تأكيد بوابة الدفع', timestamp: null, status: 'pending' },
        { step: 'جاري التجهيز', timestamp: null, status: 'pending' },
        { step: 'تم التجهيز', timestamp: null, status: 'pending' },
        { step: 'جاري الشحن', timestamp: null, status: 'pending' },
        { step: 'تم التسليم', timestamp: null, status: 'pending' },
      ],
      payment: {
        method: 'تحويل بنكي',
        status: 'بانتظار التحويل',
        transactionId: null,
        amount: 1250.5,
        currency: 'SAR',
        bankDetails: {
          bankName: 'البنك الأهلي التجاري',
          accountNumber: '1234567890',
          iban: 'SA1234567890123456789012',
        },
      },
      shipping: {
        method: 'شحن سريع',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK123456789',
        weight: 2.5,
        dimensions: { length: 50, width: 35, height: 10 },
        insurance: true,
        signatureRequired: true,
      },
    },
    {
      id: 2,
      orderNo: 'ORD-002',
      customer: {
        name: 'فاطمة علي',
        email: 'fatima@example.com',
        phone: '+966502345678',
        address: 'جدة، المملكة العربية السعودية',
        loyaltyPoints: 850,
        membershipLevel: 'silver',
      },
      totalAmount: 850.75,
      status: 'جاري التجهيز',
      paymentStatus: 'paid',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-19',
      items: [
        {
          name: 'هاتف آيفون 15',
          sku: 'IPHONE-15-001',
          quantity: 1,
          price: 800.0,
          image: '/assets/images/products/iphone.jpg',
          category: 'إلكترونيات',
          brand: 'آبل',
        },
        {
          name: 'حافظة هاتف',
          sku: 'PHONE-CASE-001',
          quantity: 1,
          price: 50.75,
          image: '/assets/images/products/case.jpg',
          category: 'إلكترونيات',
          brand: 'سبيجن',
        },
      ],
      shippingAddress: 'جدة، المملكة العربية السعودية',
      billingAddress: 'جدة، المملكة العربية السعودية',
      notes: '',
      lastModified: '2024-01-14',
      priority: 'normal',
      source: 'تطبيق الجوال',
      trackingNumber: 'TRK987654321',
      carrier: 'شركة الشحن السريع',
      estimatedDelivery: '2024-01-19',
      actualDelivery: null,
      timeline: [
        { step: 'تم إنشاء الطلب', timestamp: '2024-01-14 14:20', status: 'completed' },
        { step: 'تأكيد بوابة الدفع', timestamp: '2024-01-14 14:25', status: 'completed' },
        { step: 'جاري التجهيز', timestamp: '2024-01-14 16:00', status: 'current' },
        { step: 'تم التجهيز', timestamp: null, status: 'pending' },
        { step: 'جاري الشحن', timestamp: null, status: 'pending' },
        { step: 'تم التسليم', timestamp: null, status: 'pending' },
      ],
      payment: {
        method: 'بطاقة ائتمان',
        status: 'مدفوع',
        transactionId: 'TXN-987654321',
        amount: 850.75,
        currency: 'SAR',
        paidAt: '2024-01-14 14:25',
        bank: 'البنك الأهلي التجاري',
        last4Digits: '1234',
      },
      shipping: {
        method: 'شحن سريع',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK987654321',
        weight: 0.5,
        dimensions: { length: 20, width: 15, height: 5 },
        insurance: true,
        signatureRequired: true,
      },
    },
    {
      id: 3,
      orderNo: 'ORD-003',
      customer: {
        name: 'محمد عبدالله',
        email: 'mohammed@example.com',
        phone: '+966503456789',
        address: 'الدمام، المملكة العربية السعودية',
        loyaltyPoints: 2100,
        membershipLevel: 'platinum',
      },
      totalAmount: 2100.0,
      status: 'جاري الشحن',
      paymentStatus: 'paid',
      orderDate: '2024-01-13',
      deliveryDate: '2024-01-18',
      items: [
        {
          name: 'تلفزيون ذكي 55 بوصة',
          sku: 'TV-SMART-55-001',
          quantity: 1,
          price: 2000.0,
          image: '/assets/images/products/tv.jpg',
          category: 'إلكترونيات',
          brand: 'سامسونج',
        },
        {
          name: 'كابل HDMI',
          sku: 'HDMI-CABLE-001',
          quantity: 2,
          price: 50.0,
          image: '/assets/images/products/hdmi.jpg',
          category: 'إلكترونيات',
          brand: 'أمازون بيسك',
        },
      ],
      shippingAddress: 'الدمام، المملكة العربية السعودية',
      billingAddress: 'الدمام، المملكة العربية السعودية',
      notes: 'توصيل في المساء',
      lastModified: '2024-01-13',
      priority: 'normal',
      source: 'موقع إلكتروني',
      trackingNumber: 'TRK456789123',
      carrier: 'شركة الشحن السريع',
      estimatedDelivery: '2024-01-18',
      actualDelivery: null,
      timeline: [
        { step: 'تم إنشاء الطلب', timestamp: '2024-01-13 08:15', status: 'completed' },
        { step: 'تأكيد بوابة الدفع', timestamp: '2024-01-13 08:20', status: 'completed' },
        { step: 'جاري التجهيز', timestamp: '2024-01-13 10:00', status: 'completed' },
        { step: 'تم التجهيز', timestamp: '2024-01-14 11:00', status: 'completed' },
        { step: 'جاري الشحن', timestamp: '2024-01-15 09:00', status: 'current' },
        { step: 'تم التسليم', timestamp: null, status: 'pending' },
      ],
      payment: {
        method: 'دفع عند الاستلام',
        status: 'مدفوع',
        transactionId: 'TXN-456789123',
        amount: 2100.0,
        currency: 'SAR',
        paidAt: '2024-01-16 14:30',
        bank: null,
        last4Digits: null,
      },
      shipping: {
        method: 'شحن عادي',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK456789123',
        weight: 15.0,
        dimensions: { length: 120, width: 70, height: 10 },
        insurance: true,
        signatureRequired: true,
      },
    },
    {
      id: 4,
      orderNo: 'ORD-004',
      customer: {
        name: 'سارة أحمد',
        email: 'sara@example.com',
        phone: '+966501234570',
        address: 'الرياض، المملكة العربية السعودية',
        loyaltyPoints: 450,
        membershipLevel: 'bronze',
      },
      totalAmount: 1500.0,
      status: 'معلقة',
      paymentStatus: 'failed',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-21',
      items: [
        {
          name: 'ساعة ذكية',
          sku: 'SMARTWATCH-001',
          quantity: 1,
          price: 1500.0,
          image: '/assets/images/products/smartwatch.jpg',
          category: 'إلكترونيات',
          brand: 'سامسونج',
        },
      ],
      shippingAddress: 'الرياض، المملكة العربية السعودية',
      billingAddress: 'الرياض، المملكة العربية السعودية',
      notes: 'فشل في الدفع - يرجى التواصل مع العميل',
      lastModified: '2024-01-16',
      priority: 'normal',
      source: 'موقع إلكتروني',
      trackingNumber: null,
      carrier: null,
      estimatedDelivery: '2024-01-21',
      actualDelivery: null,
      timeline: [
        { step: 'تم إنشاء الطلب', timestamp: '2024-01-16 15:20', status: 'completed' },
        { step: 'تأكيد بوابة الدفع', timestamp: null, status: 'failed' },
        { step: 'معلقة', timestamp: '2024-01-16 15:30', status: 'current' },
      ],
      payment: {
        method: 'بطاقة ائتمان',
        status: 'فشل',
        transactionId: null,
        amount: 1500.0,
        currency: 'SAR',
        paidAt: null,
        bank: null,
        last4Digits: null,
        failureReason: 'رصيد غير كافي',
      },
      shipping: {
        method: 'شحن سريع',
        carrier: null,
        trackingNumber: null,
        weight: 0.1,
        dimensions: { length: 5, width: 4, height: 1 },
        insurance: false,
        signatureRequired: false,
      },
    },
    {
      id: 5,
      orderNo: 'ORD-005',
      customer: {
        name: 'خالد السعيد',
        email: 'khalid@example.com',
        phone: '+966501234571',
        address: 'جدة، المملكة العربية السعودية',
        loyaltyPoints: 3200,
        membershipLevel: 'platinum',
      },
      totalAmount: 3200.0,
      status: 'طلبات استعادة',
      paymentStatus: 'refunded',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-15',
      items: [
        {
          name: 'لابتوب ماك بوك برو',
          sku: 'MACBOOK-PRO-001',
          quantity: 1,
          price: 3200.0,
          image: '/assets/images/products/macbook.jpg',
          category: 'إلكترونيات',
          brand: 'آبل',
        },
      ],
      shippingAddress: 'جدة، المملكة العربية السعودية',
      billingAddress: 'جدة، المملكة العربية السعودية',
      notes: 'طلب استعادة - المنتج لا يعمل بشكل صحيح',
      lastModified: '2024-01-12',
      priority: 'high',
      source: 'موقع إلكتروني',
      trackingNumber: 'TRK789123456',
      carrier: 'شركة الشحن السريع',
      estimatedDelivery: '2024-01-15',
      actualDelivery: '2024-01-15',
      timeline: [
        { step: 'تم إنشاء الطلب', timestamp: '2024-01-10 10:00', status: 'completed' },
        { step: 'تأكيد بوابة الدفع', timestamp: '2024-01-10 10:05', status: 'completed' },
        { step: 'جاري التجهيز', timestamp: '2024-01-10 12:00', status: 'completed' },
        { step: 'تم التجهيز', timestamp: '2024-01-11 09:00', status: 'completed' },
        { step: 'جاري الشحن', timestamp: '2024-01-11 14:00', status: 'completed' },
        { step: 'تم التسليم', timestamp: '2024-01-15 16:00', status: 'completed' },
        { step: 'طلبات استعادة', timestamp: '2024-01-12 10:00', status: 'current' },
      ],
      payment: {
        method: 'بطاقة ائتمان',
        status: 'مسترد',
        transactionId: 'TXN-789123456',
        amount: 3200.0,
        currency: 'SAR',
        paidAt: '2024-01-10 10:05',
        refunded: true,
        refundAmount: 3200.0,
        refundDate: '2024-01-12 10:00',
        bank: 'البنك الأهلي التجاري',
        last4Digits: '5678',
      },
      shipping: {
        method: 'شحن سريع',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK789123456',
        weight: 2.0,
        dimensions: { length: 35, width: 25, height: 2 },
        insurance: true,
        signatureRequired: true,
      },
    },
    {
      id: 6,
      orderNo: 'ORD-006',
      customer: {
        name: 'نورا محمد',
        email: 'nora@example.com',
        phone: '+966501234572',
        address: 'الدمام، المملكة العربية السعودية',
        loyaltyPoints: 1800,
        membershipLevel: 'gold',
      },
      totalAmount: 1800.0,
      status: 'طلبات استبدال',
      paymentStatus: 'paid',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-17',
      items: [
        {
          name: 'هاتف سامسونج جالاكسي',
          sku: 'SAMSUNG-GALAXY-001',
          quantity: 1,
          price: 1800.0,
          image: '/assets/images/products/galaxy.jpg',
          category: 'إلكترونيات',
          brand: 'سامسونج',
        },
      ],
      shippingAddress: 'الدمام، المملكة العربية السعودية',
      billingAddress: 'الدمام، المملكة العربية السعودية',
      notes: 'طلب استبدال - لون غير مرغوب فيه',
      lastModified: '2024-01-14',
      priority: 'normal',
      source: 'تطبيق الجوال',
      trackingNumber: 'TRK321654987',
      carrier: 'شركة الشحن السريع',
      estimatedDelivery: '2024-01-17',
      actualDelivery: '2024-01-17',
      timeline: [
        { step: 'تم إنشاء الطلب', timestamp: '2024-01-12 11:00', status: 'completed' },
        { step: 'تأكيد بوابة الدفع', timestamp: '2024-01-12 11:05', status: 'completed' },
        { step: 'جاري التجهيز', timestamp: '2024-01-12 13:00', status: 'completed' },
        { step: 'تم التجهيز', timestamp: '2024-01-13 10:00', status: 'completed' },
        { step: 'جاري الشحن', timestamp: '2024-01-13 14:00', status: 'completed' },
        { step: 'تم التسليم', timestamp: '2024-01-17 15:00', status: 'completed' },
        { step: 'طلبات استبدال', timestamp: '2024-01-14 09:00', status: 'current' },
      ],
      payment: {
        method: 'بطاقة ائتمان',
        status: 'مدفوع',
        transactionId: 'TXN-321654987',
        amount: 1800.0,
        currency: 'SAR',
        paidAt: '2024-01-12 11:05',
        bank: 'البنك السعودي الفرنسي',
        last4Digits: '9012',
      },
      shipping: {
        method: 'شحن سريع',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK321654987',
        weight: 0.2,
        dimensions: { length: 15, width: 7, height: 1 },
        insurance: true,
        signatureRequired: true,
      },
    },
    {
      id: 7,
      orderNo: 'ORD-007',
      customer: {
        name: 'عبدالرحمن العلي',
        email: 'abdulrahman@example.com',
        phone: '+966501234573',
        address: 'الرياض، المملكة العربية السعودية',
        loyaltyPoints: 950,
        membershipLevel: 'silver',
      },
      totalAmount: 950.0,
      status: 'تم التسليم',
      paymentStatus: 'paid',
      orderDate: '2024-01-08',
      deliveryDate: '2024-01-12',
      items: [
        {
          name: 'سماعات لاسلكية',
          sku: 'HEADPHONES-WIRELESS-001',
          quantity: 1,
          price: 950.0,
          image: '/assets/images/products/headphones.jpg',
          category: 'إلكترونيات',
          brand: 'سوني',
        },
      ],
      shippingAddress: 'الرياض، المملكة العربية السعودية',
      billingAddress: 'الرياض، المملكة العربية السعودية',
      notes: 'تم التسليم بنجاح',
      lastModified: '2024-01-12',
      priority: 'normal',
      source: 'موقع إلكتروني',
      trackingNumber: 'TRK654321987',
      carrier: 'شركة الشحن السريع',
      estimatedDelivery: '2024-01-12',
      actualDelivery: '2024-01-12 14:30',
      timeline: [
        { step: 'تم إنشاء الطلب', timestamp: '2024-01-08 09:00', status: 'completed' },
        { step: 'تأكيد بوابة الدفع', timestamp: '2024-01-08 09:05', status: 'completed' },
        { step: 'جاري التجهيز', timestamp: '2024-01-08 11:00', status: 'completed' },
        { step: 'تم التجهيز', timestamp: '2024-01-09 10:00', status: 'completed' },
        { step: 'جاري الشحن', timestamp: '2024-01-09 14:00', status: 'completed' },
        { step: 'تم التسليم', timestamp: '2024-01-12 14:30', status: 'completed' },
      ],
      payment: {
        method: 'دفع عند الاستلام',
        status: 'مدفوع',
        transactionId: 'TXN-654321987',
        amount: 950.0,
        currency: 'SAR',
        paidAt: '2024-01-12 14:30',
        bank: null,
        last4Digits: null,
      },
      shipping: {
        method: 'شحن عادي',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK654321987',
        weight: 0.3,
        dimensions: { length: 20, width: 18, height: 8 },
        insurance: false,
        signatureRequired: false,
      },
    },
  ];

  // Stats data
  const orderStats = [
    {
      title: 'إجمالي الطلبات',
      value: ordersData.length.toString(),
      color: 'primary',
      icon: ShoppingCartIcon,
      change: '+12%',
    },
    {
      title: 'طلبات معلقة',
      value: ordersData.filter((o) => o.status === 'معلقة').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '1 معلقة',
    },
    {
      title: 'طلبات مدفوعة',
      value: ordersData.filter((o) => o.paymentStatus === 'paid').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '85%',
    },
    {
      title: 'إجمالي المبيعات',
      value: 'ريال ' + ordersData.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2),
      color: 'info',
      icon: AttachMoneyIcon,
      change: '+8.5%',
    },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم حفظ الطلب بنجاح',
        severity: 'success',
      });
      setOpenDialog(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح', severity: 'success' });
    }, 1000);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(filteredData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewDrawer(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleDelete = (order) => {
    setSnackbar({
      open: true,
      message: `تم حذف الطلب ${order.orderNo} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = useMemo(() => {
    return ordersData.filter((item) => {
      const matchesSearch =
        item.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesPaymentStatus =
        paymentStatusFilter === 'all' || item.paymentStatus === paymentStatusFilter;
      return matchesSearch && matchesStatus && matchesPaymentStatus;
    });
  }, [ordersData, searchTerm, statusFilter, paymentStatusFilter]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredData, sortBy, sortOrder]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'بانتظار التحويل البنكي':
        return 'warning';
      case 'تأكيد بوابة الدفع':
        return 'info';
      case 'جاري التجهيز':
        return 'warning';
      case 'تم التجهيز':
        return 'info';
      case 'معلقة':
        return 'error';
      case 'طلبات ملغية':
        return 'error';
      case 'طلبات استعادة':
        return 'secondary';
      case 'طلبات استبدال':
        return 'secondary';
      case 'جاري الشحن':
        return 'primary';
      case 'بانتظار تسليم الشحن':
        return 'info';
      case 'تم الشحن':
        return 'success';
      case 'تم التسليم':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    return status; // الحالات بالفعل بالعربية
  };

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPaymentStatusLabel = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return 'مدفوع';
      case 'pending':
        return 'معلق';
      case 'failed':
        return 'فشل';
      default:
        return paymentStatus;
    }
  };

  const formatCurrency = (amount) => {
    return `ريال ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Enhanced Header with Stats */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة الطلبات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة شاملة لجميع طلبات المتجر مع إمكانيات متقدمة للمعالجة والتتبع
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link
                color="inherit"
                href="/main-store"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/main-store/orders">
                الطلبات
              </Link>
              <Typography color="text.primary">قائمة الطلبات</Typography>
            </Breadcrumbs>
          </Box>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {orderStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette[stat.color].main,
                      0.08,
                    )} 0%, ${alpha(theme.palette[stat.color].main, 0.04)} 100%)`,
                    border: `1px solid ${alpha(theme.palette[stat.color].main, 0.2)}`,
                    transition: 'all .3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      width="180px"
                      height="90px"
                      margin="auto"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        width="60px"
                        height="60px"
                        margin="auto"
                        flexDirection="column"
                        justifyContent="center"
                        mb={2}
                      >
                        <Avatar
                          sx={{
                            bgcolor: alpha(theme.palette[stat.color].main, 0.1),
                            color: theme.palette[stat.color].main,
                            width: 60,
                            height: 60,
                            justifyContent: 'center',
                          }}
                        >
                          <IconComponent />
                        </Avatar>
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {stat.title}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Filters & Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          البحث والتصفية
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="البحث في الطلبات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة الطلب</InputLabel>
              <Select
                value={statusFilter}
                label="حالة الطلب"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="بانتظار التحويل البنكي">بانتظار التحويل البنكي</MenuItem>
                <MenuItem value="تأكيد بوابة الدفع">تأكيد بوابة الدفع</MenuItem>
                <MenuItem value="جاري التجهيز">جاري التجهيز</MenuItem>
                <MenuItem value="تم التجهيز">تم التجهيز</MenuItem>
                <MenuItem value="معلقة">معلقة</MenuItem>
                <MenuItem value="طلبات ملغية">طلبات ملغية</MenuItem>
                <MenuItem value="طلبات استعادة">طلبات استعادة</MenuItem>
                <MenuItem value="طلبات استبدال">طلبات استبدال</MenuItem>
                <MenuItem value="جاري الشحن">جاري الشحن</MenuItem>
                <MenuItem value="بانتظار تسليم الشحن">بانتظار تسليم الشحن</MenuItem>
                <MenuItem value="تم الشحن">تم الشحن</MenuItem>
                <MenuItem value="تم التسليم">تم التسليم</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة الدفع</InputLabel>
              <Select
                value={paymentStatusFilter}
                label="حالة الدفع"
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع حالات الدفع</MenuItem>
                <MenuItem value="paid">مدفوع</MenuItem>
                <MenuItem value="pending">معلق</MenuItem>
                <MenuItem value="failed">فشل</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPaymentStatusFilter('all');
              }}
              fullWidth
            >
              مسح الفلاتر
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {filteredData.length} نتيجة
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            قائمة الطلبات
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button
                size="small"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم معالجة الطلبات المحددة',
                    severity: 'success',
                  })
                }
                sx={{ mr: 1 }}
              >
                معالجة ({selectedItems.length})
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم حذف الطلبات المحددة',
                    severity: 'success',
                  })
                }
              >
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'جاري التحديث...' : 'تحديث'}
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              إضافة طلب
            </Button>
          </Stack>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لا توجد طلبات. أضف طلبك الأول.</Alert>
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.length === sortedData.length && sortedData.length > 0}
                      indeterminate={
                        selectedItems.length > 0 && selectedItems.length < sortedData.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'orderNo'}
                      direction={sortBy === 'orderNo' ? sortOrder : 'asc'}
                      onClick={() => handleSort('orderNo')}
                    >
                      رقم الطلب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'customer'}
                      direction={sortBy === 'customer' ? sortOrder : 'asc'}
                      onClick={() => handleSort('customer')}
                    >
                      العميل
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalAmount'}
                      direction={sortBy === 'totalAmount' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalAmount')}
                    >
                      المبلغ الإجمالي
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>حالة الطلب</TableCell>
                  <TableCell>حالة الدفع</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'orderDate'}
                      direction={sortBy === 'orderDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('orderDate')}
                    >
                      تاريخ الطلب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontFamily="monospace">
                          {item.orderNo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {item.customer.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.customer.email}
                            </Typography>
                            <Chip
                              label={item.customer.membershipLevel}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ mt: 0.5, fontSize: '0.7rem' }}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.totalAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getPaymentStatusLabel(item.paymentStatus)}
                          size="small"
                          color={getPaymentStatusColor(item.paymentStatus)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(item.orderDate)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleView(item)}
                              aria-label="عرض تفاصيل الطلب"
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الطلب" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="تعديل الطلب"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الطلب" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
                              aria-label="حذف الطلب"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedOrder ? 'تعديل الطلب' : 'إضافة طلب جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الطلب"
                placeholder="أدخل رقم الطلب"
                defaultValue={selectedOrder?.orderNo || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم العميل"
                placeholder="أدخل اسم العميل"
                defaultValue={selectedOrder?.customer?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedOrder?.customer?.email || ''}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="أدخل رقم الهاتف"
                defaultValue={selectedOrder?.customer?.phone || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="المبلغ الإجمالي"
                placeholder="0.00"
                defaultValue={selectedOrder?.totalAmount || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>حالة الطلب</InputLabel>
                <Select label="حالة الطلب" defaultValue={selectedOrder?.status || 'pending'}>
                  <MenuItem value="pending">معلق</MenuItem>
                  <MenuItem value="processing">قيد المعالجة</MenuItem>
                  <MenuItem value="shipped">تم الشحن</MenuItem>
                  <MenuItem value="delivered">تم التسليم</MenuItem>
                  <MenuItem value="cancelled">ملغي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>حالة الدفع</InputLabel>
                <Select label="حالة الدفع" defaultValue={selectedOrder?.paymentStatus || 'pending'}>
                  <MenuItem value="pending">معلق</MenuItem>
                  <MenuItem value="paid">مدفوع</MenuItem>
                  <MenuItem value="failed">فشل</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الطلب"
                defaultValue={selectedOrder?.orderDate || new Date().toISOString().split('T')[0]}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ التسليم المتوقع"
                defaultValue={selectedOrder?.deliveryDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="عنوان الشحن"
                placeholder="أدخل عنوان الشحن"
                defaultValue={selectedOrder?.shippingAddress || ''}
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                placeholder="أدخل ملاحظات إضافية..."
                defaultValue={selectedOrder?.notes || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDrawer} onClose={() => setViewDrawer(false)} maxWidth="md" fullWidth>
        <DialogTitle>تفاصيل الطلب</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mr: 2 }}>
                  <ShoppingCartIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedOrder.orderNo}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    العميل: {selectedOrder.customer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    البريد: {selectedOrder.customer.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    الهاتف: {selectedOrder.customer.phone}
                  </Typography>
                  <Chip
                    label={selectedOrder.customer.membershipLevel}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المبلغ الإجمالي
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(selectedOrder.totalAmount)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    حالة الطلب
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedOrder.status)}
                    size="small"
                    color={getStatusColor(selectedOrder.status)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    حالة الدفع
                  </Typography>
                  <Chip
                    label={getPaymentStatusLabel(selectedOrder.paymentStatus)}
                    size="small"
                    color={getPaymentStatusColor(selectedOrder.paymentStatus)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ الطلب
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedOrder.orderDate)}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ التسليم المتوقع
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedOrder.deliveryDate)}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    آخر تعديل
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedOrder.lastModified)}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    عنوان الشحن
                  </Typography>
                  <Typography variant="body1">{selectedOrder.shippingAddress}</Typography>
                </Grid>
                {selectedOrder.notes && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ملاحظات
                    </Typography>
                    <Typography variant="body1">{selectedOrder.notes}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrdersList;
