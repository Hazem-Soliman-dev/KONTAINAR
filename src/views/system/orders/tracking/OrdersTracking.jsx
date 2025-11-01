import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Chip,
  Avatar,
  Stack,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Checkbox,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Visibility as VisibilityIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  Timeline as TimelineIcon,
  AccessTime as AccessTimeIcon,
  PlayArrow as PlayArrowIcon,
  Map as MapIcon,
  Analytics as AnalyticsIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Close as CloseIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const OrdersTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // cards, list, timeline
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [bulkActions, setBulkActions] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [analyticsView, setAnalyticsView] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds

  // بيانات وهمية شاملة ومفصلة لتتبع الطلبات
  const ordersData = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '+966501234567',
        avatar: '/assets/images/profile/user-1.jpg',
        address: {
          street: 'شارع الملك فهد',
          city: 'الرياض',
          state: 'منطقة الرياض',
          country: 'المملكة العربية السعودية',
          postalCode: '12345',
          coordinates: { lat: 24.7136, lng: 46.6753 },
        },
        preferences: {
          language: 'ar',
          notifications: true,
          smsUpdates: true,
          emailUpdates: true,
        },
        loyaltyPoints: 1250,
        membershipLevel: 'gold',
      },
      items: [
        {
          id: 'ITEM-001',
          name: 'لابتوب ديل XPS 13',
          sku: 'DELL-XPS13-001',
          quantity: 1,
          price: 299.99,
          originalPrice: 349.99,
          discount: 50.0,
          image: '/assets/images/products/laptop.jpg',
          category: 'إلكترونيات',
          brand: 'ديل',
          weight: 1.27,
          dimensions: { length: 30.5, width: 20.3, height: 1.5 },
          warranty: '3 سنوات',
          returnPolicy: '30 يوم',
          inStock: true,
          supplier: 'مورد الإلكترونيات الأول',
          barcode: '1234567890123',
        },
        {
          id: 'ITEM-002',
          name: 'ماوس لاسلكي',
          sku: 'MOUSE-WIRELESS-001',
          quantity: 2,
          price: 29.99,
          originalPrice: 39.99,
          discount: 10.0,
          image: '/assets/images/products/mouse.jpg',
          category: 'إلكترونيات',
          brand: 'لوجيتك',
          weight: 0.1,
          dimensions: { length: 12.5, width: 6.5, height: 3.8 },
          warranty: '2 سنوات',
          returnPolicy: '30 يوم',
          inStock: true,
          supplier: 'مورد الإلكترونيات الأول',
          barcode: '1234567890124',
        },
      ],
      pricing: {
        subtotal: 359.97,
        tax: 53.99,
        shipping: 25.0,
        discount: 60.0,
        total: 378.96,
        currency: 'SAR',
        exchangeRate: 3.75,
      },
      status: 'قيد المعالجة',
      paymentStatus: 'مدفوع',
      shippingStatus: 'جاهز للشحن',
      currentStep: 2,
      totalSteps: 5,
      progress: 40,
      date: '2024-01-15',
      estimatedDelivery: '2024-01-20',
      actualDelivery: null,
      shippingAddress: 'شارع الملك فهد، الرياض، المملكة العربية السعودية',
      billingAddress: 'شارع الملك فهد، الرياض، المملكة العربية السعودية',
      timeline: [
        {
          id: 1,
          title: 'تم إنشاء الطلب',
          description: 'تم إنشاء الطلب بنجاح وتم تأكيد البيانات',
          timestamp: '2024-01-15 10:30',
          status: 'completed',
          icon: <ShoppingCartIcon />,
          color: 'success',
          location: 'الرياض، المملكة العربية السعودية',
          user: 'أحمد محمد',
          details: {
            orderValue: '1,421.85 ريال',
            paymentMethod: 'بطاقة ائتمان',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        },
        {
          id: 2,
          title: 'تم تأكيد الدفع',
          description: 'تم تأكيد الدفع باستخدام بطاقة الائتمان',
          timestamp: '2024-01-15 10:35',
          status: 'completed',
          icon: <PaymentIcon />,
          color: 'success',
          location: 'مركز معالجة المدفوعات',
          user: 'نظام الدفع الآلي',
          details: {
            transactionId: 'TXN-789456123',
            amount: '1,421.85 ريال',
            paymentMethod: 'بطاقة ائتمان',
            bank: 'البنك الأهلي التجاري',
            authorizationCode: 'AUTH-123456',
          },
        },
        {
          id: 3,
          title: 'قيد المعالجة',
          description: 'الطلب قيد المعالجة والتجهيز للشحن',
          timestamp: '2024-01-15 11:00',
          status: 'current',
          icon: <ScheduleIcon />,
          color: 'warning',
          location: 'مستودع الرياض الرئيسي',
          user: 'فريق التجهيز',
          details: {
            warehouse: 'مستودع الرياض الرئيسي',
            assignedTo: 'محمد العلي',
            estimatedProcessingTime: '2-4 ساعات',
            currentLocation: 'منطقة التجهيز - الطابق الثاني',
          },
        },
        {
          id: 4,
          title: 'جاهز للشحن',
          description: 'الطلب جاهز للشحن وسيتم تسليمه قريباً',
          timestamp: null,
          status: 'pending',
          icon: <ShippingIcon />,
          color: 'default',
          location: 'مستودع الرياض الرئيسي',
          user: 'فريق الشحن',
          details: {
            estimatedShippingTime: '2024-01-16 09:00',
            carrier: 'شركة الشحن السريع',
            serviceType: 'شحن سريع',
            trackingNumber: 'TRK123456789',
          },
        },
        {
          id: 5,
          title: 'تم التسليم',
          description: 'تم تسليم الطلب بنجاح للعميل',
          timestamp: null,
          status: 'pending',
          icon: <CheckCircleIcon />,
          color: 'default',
          location: 'عنوان التسليم',
          user: 'سائق التوصيل',
          details: {
            estimatedDeliveryTime: '2024-01-20 14:00-18:00',
            deliveryWindow: '4 ساعات',
            signatureRequired: true,
            contactPerson: 'أحمد محمد',
          },
        },
      ],
      tracking: {
        number: 'TRK123456789',
        carrier: 'شركة الشحن السريع',
        serviceType: 'شحن سريع',
        estimatedDelivery: '2024-01-20',
        currentLocation: 'مستودع الرياض الرئيسي',
        lastUpdate: '2024-01-15 11:00',
        status: 'قيد المعالجة',
        history: [
          {
            date: '2024-01-15 10:30',
            location: 'الرياض، المملكة العربية السعودية',
            status: 'تم استلام الطلب',
            description: 'تم استلام الطلب في المستودع',
          },
          {
            date: '2024-01-15 11:00',
            location: 'مستودع الرياض الرئيسي',
            status: 'قيد المعالجة',
            description: 'الطلب قيد المعالجة والتجهيز',
          },
        ],
      },
      shipping: {
        method: 'شحن سريع',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK123456789',
        estimatedDelivery: '2024-01-20',
        actualDelivery: null,
        weight: 1.47,
        dimensions: { length: 30.5, width: 20.3, height: 1.5 },
        insurance: true,
        signatureRequired: true,
        fragile: false,
        temperatureControlled: false,
      },
      payment: {
        method: 'بطاقة ائتمان',
        status: 'مدفوع',
        transactionId: 'TXN-789456123',
        amount: 378.96,
        currency: 'SAR',
        paidAt: '2024-01-15 10:35',
        refunded: false,
        refundAmount: 0,
        bank: 'البنك الأهلي التجاري',
        last4Digits: '1234',
      },
      notes: 'طلب عاجل - يرجى المعالجة السريعة',
      priority: 'high',
      tags: ['عاجل', 'عميل VIP', 'إلكترونيات'],
      source: 'موقع إلكتروني',
      referrer: 'Google Ads',
      utm: {
        campaign: 'summer_sale_2024',
        source: 'google',
        medium: 'cpc',
        term: 'لابتوب ديل',
        content: 'ad_group_1',
      },
      analytics: {
        pageViews: 3,
        timeOnSite: '4:32',
        bounceRate: 0.33,
        conversionTime: '2:15',
        device: 'desktop',
        browser: 'Chrome',
        os: 'Windows 10',
      },
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: {
        name: 'فاطمة علي',
        email: 'fatima@example.com',
        phone: '+966501234568',
        avatar: '/assets/images/profile/user-2.jpg',
        address: {
          street: 'شارع التحلية',
          city: 'جدة',
          state: 'منطقة مكة المكرمة',
          country: 'المملكة العربية السعودية',
          postalCode: '21432',
          coordinates: { lat: 21.4858, lng: 39.1925 },
        },
        preferences: {
          language: 'ar',
          notifications: true,
          smsUpdates: false,
          emailUpdates: true,
        },
        loyaltyPoints: 850,
        membershipLevel: 'silver',
      },
      items: [
        {
          id: 'ITEM-003',
          name: 'هاتف آيفون 15',
          sku: 'IPHONE-15-001',
          quantity: 1,
          price: 999.99,
          originalPrice: 1199.99,
          discount: 200.0,
          image: '/assets/images/products/iphone.jpg',
          category: 'إلكترونيات',
          brand: 'آبل',
          weight: 0.171,
          dimensions: { length: 14.8, width: 7.1, height: 0.78 },
          warranty: '1 سنة',
          returnPolicy: '14 يوم',
          inStock: true,
          supplier: 'مورد الإلكترونيات الأول',
          barcode: '1234567890125',
        },
      ],
      pricing: {
        subtotal: 999.99,
        tax: 149.99,
        shipping: 0.0,
        discount: 200.0,
        total: 949.98,
        currency: 'SAR',
        exchangeRate: 3.75,
      },
      status: 'تم الشحن',
      paymentStatus: 'مدفوع',
      shippingStatus: 'في الطريق',
      currentStep: 4,
      totalSteps: 5,
      progress: 80,
      date: '2024-01-14',
      estimatedDelivery: '2024-01-18',
      actualDelivery: null,
      shippingAddress: 'شارع التحلية، جدة، المملكة العربية السعودية',
      billingAddress: 'شارع التحلية، جدة، المملكة العربية السعودية',
      timeline: [
        {
          id: 1,
          title: 'تم إنشاء الطلب',
          description: 'تم إنشاء الطلب بنجاح وتم تأكيد البيانات',
          timestamp: '2024-01-14 14:20',
          status: 'completed',
          icon: <ShoppingCartIcon />,
          color: 'success',
        },
        {
          id: 2,
          title: 'تم تأكيد الدفع',
          description: 'تم تأكيد الدفع باستخدام بطاقة الائتمان',
          timestamp: '2024-01-14 14:25',
          status: 'completed',
          icon: <PaymentIcon />,
          color: 'success',
        },
        {
          id: 3,
          title: 'تم المعالجة',
          description: 'تم معالجة الطلب وتجهيزه للشحن',
          timestamp: '2024-01-14 16:00',
          status: 'completed',
          icon: <ScheduleIcon />,
          color: 'success',
        },
        {
          id: 4,
          title: 'تم الشحن',
          description: 'تم شحن الطلب وهو في الطريق للعميل',
          timestamp: '2024-01-15 09:00',
          status: 'current',
          icon: <ShippingIcon />,
          color: 'info',
        },
        {
          id: 5,
          title: 'تم التسليم',
          description: 'تم تسليم الطلب بنجاح للعميل',
          timestamp: null,
          status: 'pending',
          icon: <CheckCircleIcon />,
          color: 'default',
        },
      ],
      tracking: {
        number: 'TRK987654321',
        carrier: 'شركة الشحن السريع',
        serviceType: 'شحن سريع',
        estimatedDelivery: '2024-01-18',
        currentLocation: 'في الطريق',
        lastUpdate: '2024-01-15 09:00',
        status: 'تم الشحن',
        history: [
          {
            date: '2024-01-14 14:20',
            location: 'جدة، المملكة العربية السعودية',
            status: 'تم استلام الطلب',
            description: 'تم استلام الطلب في المستودع',
          },
          {
            date: '2024-01-14 16:00',
            location: 'مستودع جدة',
            status: 'تم المعالجة',
            description: 'تم معالجة الطلب وتجهيزه للشحن',
          },
          {
            date: '2024-01-15 09:00',
            location: 'مستودع جدة',
            status: 'تم الشحن',
            description: 'تم شحن الطلب وهو في الطريق',
          },
        ],
      },
      shipping: {
        method: 'شحن سريع',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK987654321',
        estimatedDelivery: '2024-01-18',
        actualDelivery: null,
        weight: 0.171,
        dimensions: { length: 14.8, width: 7.1, height: 0.78 },
        insurance: true,
        signatureRequired: true,
        fragile: false,
        temperatureControlled: false,
      },
      payment: {
        method: 'بطاقة ائتمان',
        status: 'مدفوع',
        transactionId: 'TXN-987654321',
        amount: 949.98,
        currency: 'SAR',
        paidAt: '2024-01-14 14:25',
        refunded: false,
        refundAmount: 0,
        bank: 'البنك الأهلي التجاري',
        last4Digits: '9876',
      },
      notes: 'طلب عادي',
      priority: 'normal',
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customer: {
        name: 'محمد عبدالله',
        email: 'mohammed@example.com',
        phone: '+966501234569',
        avatar: '/assets/images/profile/user-3.jpg',
        address: {
          street: 'شارع العليا',
          city: 'الرياض',
          state: 'منطقة الرياض',
          country: 'المملكة العربية السعودية',
          postalCode: '12211',
          coordinates: { lat: 24.7136, lng: 46.6753 },
        },
        preferences: {
          language: 'ar',
          notifications: true,
          smsUpdates: true,
          emailUpdates: true,
        },
        loyaltyPoints: 2100,
        membershipLevel: 'platinum',
      },
      items: [
        {
          id: 'ITEM-004',
          name: 'سماعات لاسلكية',
          sku: 'HEADPHONES-WIRELESS-001',
          quantity: 1,
          price: 149.99,
          originalPrice: 199.99,
          discount: 50.0,
          image: '/assets/images/products/headphones.jpg',
          category: 'إلكترونيات',
          brand: 'سوني',
          weight: 0.25,
          dimensions: { length: 20.0, width: 18.0, height: 8.0 },
          warranty: '2 سنة',
          returnPolicy: '30 يوم',
          inStock: true,
          supplier: 'مورد الإلكترونيات الأول',
          barcode: '1234567890126',
        },
        {
          id: 'ITEM-005',
          name: 'حافظة هاتف',
          sku: 'PHONE-CASE-001',
          quantity: 1,
          price: 19.99,
          originalPrice: 29.99,
          discount: 10.0,
          image: '/assets/images/products/case.jpg',
          category: 'إلكترونيات',
          brand: 'سبيجن',
          weight: 0.05,
          dimensions: { length: 15.0, width: 7.5, height: 1.0 },
          warranty: '1 سنة',
          returnPolicy: '30 يوم',
          inStock: true,
          supplier: 'مورد الإلكترونيات الأول',
          barcode: '1234567890127',
        },
      ],
      pricing: {
        subtotal: 169.98,
        tax: 25.5,
        shipping: 15.0,
        discount: 60.0,
        total: 150.48,
        currency: 'SAR',
        exchangeRate: 3.75,
      },
      status: 'تم التسليم',
      paymentStatus: 'مدفوع',
      shippingStatus: 'تم التسليم',
      currentStep: 5,
      totalSteps: 5,
      progress: 100,
      date: '2024-01-13',
      estimatedDelivery: '2024-01-16',
      actualDelivery: '2024-01-16 14:30',
      shippingAddress: 'شارع العليا، الرياض، المملكة العربية السعودية',
      billingAddress: 'شارع العليا، الرياض، المملكة العربية السعودية',
      timeline: [
        {
          id: 1,
          title: 'تم إنشاء الطلب',
          description: 'تم إنشاء الطلب بنجاح وتم تأكيد البيانات',
          timestamp: '2024-01-13 08:15',
          status: 'completed',
          icon: <ShoppingCartIcon />,
          color: 'success',
        },
        {
          id: 2,
          title: 'تم تأكيد الدفع',
          description: 'تم تأكيد الدفع باستخدام بطاقة الائتمان',
          timestamp: '2024-01-13 08:20',
          status: 'completed',
          icon: <PaymentIcon />,
          color: 'success',
        },
        {
          id: 3,
          title: 'تم المعالجة',
          description: 'تم معالجة الطلب وتجهيزه للشحن',
          timestamp: '2024-01-13 10:00',
          status: 'completed',
          icon: <ScheduleIcon />,
          color: 'success',
        },
        {
          id: 4,
          title: 'تم الشحن',
          description: 'تم شحن الطلب وهو في الطريق للعميل',
          timestamp: '2024-01-14 11:00',
          status: 'completed',
          icon: <ShippingIcon />,
          color: 'success',
        },
        {
          id: 5,
          title: 'تم التسليم',
          description: 'تم تسليم الطلب بنجاح للعميل',
          timestamp: '2024-01-16 14:30',
          status: 'completed',
          icon: <CheckCircleIcon />,
          color: 'success',
        },
      ],
      tracking: {
        number: 'TRK456789123',
        carrier: 'شركة الشحن السريع',
        serviceType: 'شحن عادي',
        estimatedDelivery: '2024-01-16',
        currentLocation: 'تم التسليم',
        lastUpdate: '2024-01-16 14:30',
        status: 'تم التسليم',
        history: [
          {
            date: '2024-01-13 08:15',
            location: 'الرياض، المملكة العربية السعودية',
            status: 'تم استلام الطلب',
            description: 'تم استلام الطلب في المستودع',
          },
          {
            date: '2024-01-13 10:00',
            location: 'مستودع الرياض الرئيسي',
            status: 'تم المعالجة',
            description: 'تم معالجة الطلب وتجهيزه للشحن',
          },
          {
            date: '2024-01-14 11:00',
            location: 'مستودع الرياض الرئيسي',
            status: 'تم الشحن',
            description: 'تم شحن الطلب وهو في الطريق',
          },
          {
            date: '2024-01-16 14:30',
            location: 'شارع العليا، الرياض',
            status: 'تم التسليم',
            description: 'تم تسليم الطلب بنجاح للعميل',
          },
        ],
      },
      shipping: {
        method: 'شحن عادي',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK456789123',
        estimatedDelivery: '2024-01-16',
        actualDelivery: '2024-01-16 14:30',
        weight: 0.3,
        dimensions: { length: 20.0, width: 18.0, height: 8.0 },
        insurance: false,
        signatureRequired: false,
        fragile: false,
        temperatureControlled: false,
      },
      payment: {
        method: 'دفع عند الاستلام',
        status: 'مدفوع',
        transactionId: 'TXN-456789123',
        amount: 150.48,
        currency: 'SAR',
        paidAt: '2024-01-16 14:30',
        refunded: false,
        refundAmount: 0,
        bank: null,
        last4Digits: null,
      },
      notes: 'تم التسليم بنجاح',
      priority: 'normal',
      tags: ['عادي', 'إلكترونيات'],
      source: 'تطبيق الجوال',
      referrer: 'Facebook Ads',
      utm: {
        campaign: 'mobile_app_promo',
        source: 'facebook',
        medium: 'social',
        term: 'سماعات لاسلكية',
        content: 'video_ad',
      },
      analytics: {
        pageViews: 1,
        timeOnSite: '1:45',
        bounceRate: 0.0,
        conversionTime: '1:45',
        device: 'mobile',
        browser: 'Safari',
        os: 'iOS 17',
      },
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customer: {
        name: 'سارة أحمد',
        email: 'sara@example.com',
        phone: '+966501234570',
        avatar: '/assets/images/profile/user-4.jpg',
        address: {
          street: 'شارع الأمير محمد بن عبدالعزيز',
          city: 'الدمام',
          state: 'المنطقة الشرقية',
          country: 'المملكة العربية السعودية',
          postalCode: '31421',
          coordinates: { lat: 26.4207, lng: 50.0888 },
        },
        preferences: {
          language: 'ar',
          notifications: true,
          smsUpdates: true,
          emailUpdates: true,
        },
        loyaltyPoints: 450,
        membershipLevel: 'bronze',
      },
      items: [
        {
          id: 'ITEM-006',
          name: 'ساعة ذكية',
          sku: 'SMARTWATCH-001',
          quantity: 1,
          price: 299.99,
          originalPrice: 399.99,
          discount: 100.0,
          image: '/assets/images/products/smartwatch.jpg',
          category: 'إلكترونيات',
          brand: 'سامسونج',
          weight: 0.05,
          dimensions: { length: 4.0, width: 3.5, height: 1.0 },
          warranty: '2 سنة',
          returnPolicy: '30 يوم',
          inStock: true,
          supplier: 'مورد الإلكترونيات الأول',
          barcode: '1234567890128',
        },
      ],
      pricing: {
        subtotal: 299.99,
        tax: 45.0,
        shipping: 20.0,
        discount: 100.0,
        total: 264.99,
        currency: 'SAR',
        exchangeRate: 3.75,
      },
      status: 'قيد المعالجة',
      paymentStatus: 'مدفوع',
      shippingStatus: 'جاهز للشحن',
      currentStep: 2,
      totalSteps: 5,
      progress: 40,
      date: '2024-01-16',
      estimatedDelivery: '2024-01-21',
      actualDelivery: null,
      shippingAddress: 'شارع الأمير محمد بن عبدالعزيز، الدمام، المملكة العربية السعودية',
      billingAddress: 'شارع الأمير محمد بن عبدالعزيز، الدمام، المملكة العربية السعودية',
      timeline: [
        {
          id: 1,
          title: 'تم إنشاء الطلب',
          description: 'تم إنشاء الطلب بنجاح وتم تأكيد البيانات',
          timestamp: '2024-01-16 15:20',
          status: 'completed',
          icon: <ShoppingCartIcon />,
          color: 'success',
          location: 'الدمام، المملكة العربية السعودية',
          user: 'سارة أحمد',
          details: {
            orderValue: '993.71 ريال',
            paymentMethod: 'بطاقة ائتمان',
            ipAddress: '192.168.1.101',
            userAgent:
              'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
          },
        },
        {
          id: 2,
          title: 'تم تأكيد الدفع',
          description: 'تم تأكيد الدفع باستخدام بطاقة الائتمان',
          timestamp: '2024-01-16 15:25',
          status: 'completed',
          icon: <PaymentIcon />,
          color: 'success',
          location: 'مركز معالجة المدفوعات',
          user: 'نظام الدفع الآلي',
          details: {
            transactionId: 'TXN-987654321',
            amount: '993.71 ريال',
            paymentMethod: 'بطاقة ائتمان',
            bank: 'البنك السعودي الفرنسي',
            authorizationCode: 'AUTH-654321',
          },
        },
        {
          id: 3,
          title: 'قيد المعالجة',
          description: 'الطلب قيد المعالجة والتجهيز للشحن',
          timestamp: '2024-01-16 16:00',
          status: 'current',
          icon: <ScheduleIcon />,
          color: 'warning',
          location: 'مستودع الدمام',
          user: 'فريق التجهيز',
          details: {
            warehouse: 'مستودع الدمام',
            assignedTo: 'عبدالله السعيد',
            estimatedProcessingTime: '3-5 ساعات',
            currentLocation: 'منطقة التجهيز - الطابق الأول',
          },
        },
        {
          id: 4,
          title: 'جاهز للشحن',
          description: 'الطلب جاهز للشحن وسيتم تسليمه قريباً',
          timestamp: null,
          status: 'pending',
          icon: <ShippingIcon />,
          color: 'default',
          location: 'مستودع الدمام',
          user: 'فريق الشحن',
          details: {
            estimatedShippingTime: '2024-01-17 10:00',
            carrier: 'شركة الشحن السريع',
            serviceType: 'شحن سريع',
            trackingNumber: 'TRK789123456',
          },
        },
        {
          id: 5,
          title: 'تم التسليم',
          description: 'تم تسليم الطلب بنجاح للعميل',
          timestamp: null,
          status: 'pending',
          icon: <CheckCircleIcon />,
          color: 'default',
          location: 'عنوان التسليم',
          user: 'سائق التوصيل',
          details: {
            estimatedDeliveryTime: '2024-01-21 10:00-14:00',
            deliveryWindow: '4 ساعات',
            signatureRequired: true,
            contactPerson: 'سارة أحمد',
          },
        },
      ],
      tracking: {
        number: 'TRK789123456',
        carrier: 'شركة الشحن السريع',
        serviceType: 'شحن سريع',
        estimatedDelivery: '2024-01-21',
        currentLocation: 'مستودع الدمام',
        lastUpdate: '2024-01-16 16:00',
        status: 'قيد المعالجة',
        history: [
          {
            date: '2024-01-16 15:20',
            location: 'الدمام، المملكة العربية السعودية',
            status: 'تم استلام الطلب',
            description: 'تم استلام الطلب في المستودع',
          },
          {
            date: '2024-01-16 16:00',
            location: 'مستودع الدمام',
            status: 'قيد المعالجة',
            description: 'الطلب قيد المعالجة والتجهيز',
          },
        ],
      },
      shipping: {
        method: 'شحن سريع',
        carrier: 'شركة الشحن السريع',
        trackingNumber: 'TRK789123456',
        estimatedDelivery: '2024-01-21',
        actualDelivery: null,
        weight: 0.05,
        dimensions: { length: 4.0, width: 3.5, height: 1.0 },
        insurance: true,
        signatureRequired: true,
        fragile: false,
        temperatureControlled: false,
      },
      payment: {
        method: 'بطاقة ائتمان',
        status: 'مدفوع',
        transactionId: 'TXN-987654321',
        amount: 264.99,
        currency: 'SAR',
        paidAt: '2024-01-16 15:25',
        refunded: false,
        refundAmount: 0,
        bank: 'البنك السعودي الفرنسي',
        last4Digits: '5678',
      },
      notes: 'طلب جديد - يرجى المعالجة العادية',
      priority: 'normal',
      tags: ['جديد', 'إلكترونيات', 'ساعة ذكية'],
      source: 'موقع إلكتروني',
      referrer: 'Google Search',
      utm: {
        campaign: 'organic_search',
        source: 'google',
        medium: 'organic',
        term: 'ساعة ذكية',
        content: 'search_result',
      },
      analytics: {
        pageViews: 2,
        timeOnSite: '3:15',
        bounceRate: 0.5,
        conversionTime: '2:30',
        device: 'mobile',
        browser: 'Safari',
        os: 'iOS 17',
      },
    },
  ];

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && realTimeUpdates) {
      const interval = setInterval(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, realTimeUpdates, refreshInterval]);

  // Enhanced status and priority functions
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'قيد المعالجة':
        return 'warning';
      case 'تم الشحن':
        return 'info';
      case 'تم التسليم':
        return 'success';
      case 'ملغي':
        return 'error';
      case 'معلق':
        return 'default';
      case 'مرفوض':
        return 'error';
      default:
        return 'default';
    }
  }, []);

  const getPriorityColor = useCallback((priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'normal':
        return 'success';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  }, []);

  const getTimelineIcon = useCallback((status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon />;
      case 'current':
        return <PlayArrowIcon />;
      case 'pending':
        return <ScheduleIcon />;
      default:
        return <InfoIcon />;
    }
  }, []);

  const getMembershipLevelColor = useCallback((level) => {
    switch (level) {
      case 'platinum':
        return 'primary';
      case 'gold':
        return 'warning';
      case 'silver':
        return 'default';
      case 'bronze':
        return 'secondary';
      default:
        return 'default';
    }
  }, []);

  const getMembershipLevelIcon = useCallback((level) => {
    switch (level) {
      case 'platinum':
        return <StarIcon />;
      case 'gold':
        return <StarIcon />;
      case 'silver':
        return <StarBorderIcon />;
      case 'bronze':
        return <StarBorderIcon />;
      default:
        return <StarBorderIcon />;
    }
  }, []);

  // Enhanced analytics functions
  const getAnalyticsData = useCallback(() => {
    const totalOrders = ordersData.length;
    const totalValue = ordersData.reduce((sum, order) => sum + order.pricing.total, 0);
    const averageOrderValue = totalValue / totalOrders;
    const completedOrders = ordersData.filter((order) => order.status === 'تم التسليم').length;
    const processingOrders = ordersData.filter((order) => order.status === 'قيد المعالجة').length;
    const shippedOrders = ordersData.filter((order) => order.status === 'تم الشحن').length;

    return {
      totalOrders,
      totalValue,
      averageOrderValue,
      completedOrders,
      processingOrders,
      shippedOrders,
      completionRate: (completedOrders / totalOrders) * 100,
    };
  }, [ordersData]);

  const analyticsData = getAnalyticsData();

  const filteredData = useMemo(() => {
    let filtered = ordersData.filter((item) => {
      const matchesSearch =
        item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tracking?.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.phone.includes(searchTerm);
      const matchesStatus =
        statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'total':
          aValue = a.pricing.total;
          bValue = b.pricing.total;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'customer':
          aValue = a.customer.name;
          bValue = b.customer.name;
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [ordersData, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleViewDetails = useCallback((order) => {
    setSelectedOrder(order);
    setOpenDetails(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setOpenDetails(false);
    setSelectedOrder(null);
  }, []);

  const handleBulkAction = useCallback(
    (action) => {
      // Handle bulk actions like export, print, etc.
      console.log('Bulk action:', action, selectedOrders);
    },
    [selectedOrders],
  );

  const handleSelectOrder = useCallback((orderId) => {
    setSelectedOrders((prev) => {
      if (prev.includes(orderId)) {
        return prev.filter((id) => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedOrders.length === filteredData.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredData.map((order) => order.id));
    }
  }, [selectedOrders.length, filteredData]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleExport = useCallback(() => {
    // Export functionality
    console.log('Exporting orders:', filteredData);
  }, [filteredData]);

  const handlePrint = useCallback((order) => {
    // Print functionality
    console.log('Printing order:', order);
  }, []);

  const handleShare = useCallback((order) => {
    // Share functionality
    console.log('Sharing order:', order);
  }, []);

  const handleAddNote = useCallback((orderId, note) => {
    // Add note functionality
    console.log('Adding note to order:', orderId, note);
  }, []);

  const handleUpdateStatus = useCallback((orderId, newStatus) => {
    // Update status functionality
    console.log('Updating order status:', orderId, newStatus);
  }, []);

  const OrderCard = ({ order }) => (
    <Card
      sx={{
        mb: 2,
        transition: 'all 0.3s ease',
        border: selectedOrders.includes(order.id) ? '2px solid' : '1px solid',
        borderColor: selectedOrders.includes(order.id) ? 'primary.main' : 'divider',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        {/* Header with selection and actions */}
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox
              checked={selectedOrders.includes(order.id)}
              onChange={() => handleSelectOrder(order.id)}
              size="small"
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {order.orderNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {order.date} • {order.customer.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip
                  label={order.customer.membershipLevel}
                  size="small"
                  color={getMembershipLevelColor(order.customer.membershipLevel)}
                  icon={getMembershipLevelIcon(order.customer.membershipLevel)}
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary">
                  {order.customer.loyaltyPoints} نقطة
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
              {order.pricing.total.toFixed(2)} {order.pricing.currency}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.items.length} منتج
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
              <Tooltip title="عرض التفاصيل">
                <IconButton size="small" onClick={() => handleViewDetails(order)}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="طباعة">
                <IconButton size="small" onClick={() => handlePrint(order)}>
                  <PrintIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="مشاركة">
                <IconButton size="small" onClick={() => handleShare(order)}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Status and Priority Chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={order.status}
            size="small"
            color={getStatusColor(order.status)}
            icon={getTimelineIcon(
              order.timeline.find((t) => t.status === 'current')?.status || 'pending',
            )}
          />
          <Chip
            label={order.paymentStatus}
            size="small"
            color={order.paymentStatus === 'مدفوع' ? 'success' : 'warning'}
          />
          <Chip
            label={order.priority}
            size="small"
            color={getPriorityColor(order.priority)}
            variant="outlined"
          />
          {order.tags?.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" color="default" />
          ))}
        </Stack>

        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              التقدم: {order.currentStep} من {order.totalSteps}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={order.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: `linear-gradient(90deg, ${
                  order.progress < 50 ? '#ff9800' : order.progress < 80 ? '#2196f3' : '#4caf50'
                } 0%, ${
                  order.progress < 50 ? '#ffc107' : order.progress < 80 ? '#64b5f6' : '#81c784'
                } 100%)`,
              },
            }}
          />
        </Box>

        {/* Shipping and Payment Info */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ShippingIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  {order.shippingStatus}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  التسليم المتوقع: {order.estimatedDelivery}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {order.shippingAddress}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PaymentIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  {order.payment?.method || 'غير محدد'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {order.payment?.status || order.paymentStatus || 'غير محدد'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {order.tracking?.number || 'TRK123456789'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Items Preview */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            المنتجات ({order.items.length})
          </Typography>
          <Stack spacing={1}>
            {order.items.slice(0, 2).map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={item.image} sx={{ width: 32, height: 32 }} variant="rounded" />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.quantity} × {item.price} {order.pricing.currency}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {(item.quantity * item.price).toFixed(2)} {order.pricing.currency}
                </Typography>
              </Box>
            ))}
            {order.items.length > 2 && (
              <Typography variant="caption" color="text.secondary">
                +{order.items.length - 2} منتج آخر
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => handleViewDetails(order)}
            >
              عرض التفاصيل
            </Button>
            <Button variant="outlined" size="small" startIcon={<TimelineIcon />}>
              الجدول الزمني
            </Button>
            <Button variant="outlined" size="small" startIcon={<MapIcon />}>
              الخريطة
            </Button>
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {order.tracking?.number || 'TRK123456789'}
            </Typography>
            <Tooltip title="نسخ رقم التتبع">
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const TimelineComponent = ({ timeline }) => (
    <Timeline position="right">
      {timeline.map((item, index) => (
        <TimelineItem key={item.id}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {item.timestamp}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={item.color === 'default' ? 'grey' : item.color || 'grey'}
              variant={item.status === 'completed' ? 'filled' : 'outlined'}
            >
              {item.icon}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              {item.title}
            </Typography>
            <Typography>{item.description}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with enhanced controls */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              تتبع الطلبات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              مراقبة ومتابعة حالة الطلبات من البداية حتى النهاية
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link color="inherit" href="/system" sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/system/orders">
                الطلبات
              </Link>
              <Typography color="text.primary">تتبع الطلبات</Typography>
            </Breadcrumbs>
          </Box>

          {/* Enhanced Controls */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={realTimeUpdates}
                  onChange={(e) => setRealTimeUpdates(e.target.checked)}
                  size="small"
                />
              }
              label="التحديث الفوري"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  size="small"
                />
              }
              label="الإشعارات"
            />
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
            >
              تحديث
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
              تصدير
            </Button>
          </Box>
        </Box>

        {/* Enhanced Statistics */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, mx: 'auto', mb: 1 }}>
                  <ShoppingCartIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                  {analyticsData.totalOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  إجمالي الطلبات
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {analyticsData.totalValue.toFixed(2)} ريال
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)',
                border: '1px solid rgba(255, 152, 0, 0.2)',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'warning.main', width: 40, height: 40, mx: 'auto', mb: 1 }}>
                  <ScheduleIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', mb: 0.5 }}>
                  {analyticsData.processingOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  قيد المعالجة
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {((analyticsData.processingOrders / analyticsData.totalOrders) * 100).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
                border: '1px solid rgba(33, 150, 243, 0.2)',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40, mx: 'auto', mb: 1 }}>
                  <ShippingIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main', mb: 0.5 }}>
                  {analyticsData.shippedOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  تم الشحن
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {((analyticsData.shippedOrders / analyticsData.totalOrders) * 100).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
                border: '1px solid rgba(76, 175, 80, 0.2)',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40, mx: 'auto', mb: 1 }}>
                  <CheckCircleIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 0.5 }}>
                  {analyticsData.completedOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  تم التسليم
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {analyticsData.completionRate.toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Enhanced Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="البحث في الطلبات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select
                value={statusFilter}
                label="الحالة"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="قيد المعالجة">قيد المعالجة</MenuItem>
                <MenuItem value="تم الشحن">تم الشحن</MenuItem>
                <MenuItem value="تم التسليم">تم التسليم</MenuItem>
                <MenuItem value="ملغي">ملغي</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الترتيب</InputLabel>
              <Select value={sortBy} label="الترتيب" onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="date">التاريخ</MenuItem>
                <MenuItem value="total">المبلغ</MenuItem>
                <MenuItem value="status">الحالة</MenuItem>
                <MenuItem value="customer">العميل</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الاتجاه</InputLabel>
              <Select
                value={sortOrder}
                label="الاتجاه"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="desc">تنازلي</MenuItem>
                <MenuItem value="asc">تصاعدي</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSortBy('date');
                setSortOrder('desc');
              }}
            >
              إعادة تعيين
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} طلب
            </Typography>
          </Grid>
        </Grid>

        {/* View Mode Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={viewMode === 'cards' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<ViewModuleIcon />}
              onClick={() => setViewMode('cards')}
            >
              البطاقات
            </Button>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<ViewListIcon />}
              onClick={() => setViewMode('list')}
            >
              القائمة
            </Button>
            <Button
              variant={viewMode === 'timeline' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<TimelineIcon />}
              onClick={() => setViewMode('timeline')}
            >
              الجدول الزمني
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={mapView ? 'contained' : 'outlined'}
              size="small"
              startIcon={<MapIcon />}
              onClick={() => setMapView(!mapView)}
            >
              الخريطة
            </Button>
            <Button
              variant={analyticsView ? 'contained' : 'outlined'}
              size="small"
              startIcon={<AnalyticsIcon />}
              onClick={() => setAnalyticsView(!analyticsView)}
            >
              التحليلات
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">تم تحديد {selectedOrders.length} طلب</Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={() => handleBulkAction('export')}
              >
                تصدير
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<PrintIcon />}
                onClick={() => handleBulkAction('print')}
              >
                طباعة
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<EmailIcon />}
                onClick={() => handleBulkAction('email')}
              >
                إرسال بريد
              </Button>
              <Button variant="outlined" size="small" onClick={() => setSelectedOrders([])}>
                إلغاء التحديد
              </Button>
            </Stack>
          </Box>
        </Paper>
      )}

      {/* Orders List */}
      <Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredData.length === 0 ? (
          <Alert severity="info" sx={{ textAlign: 'center', py: 4 }}>
            لم يتم العثور على طلبات. جرب تغيير المرشحات.
          </Alert>
        ) : (
          <Box>
            {/* Select All */}
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkbox
                checked={selectedOrders.length === filteredData.length}
                indeterminate={
                  selectedOrders.length > 0 && selectedOrders.length < filteredData.length
                }
                onChange={handleSelectAll}
              />
              <Typography variant="body2" color="text.secondary">
                تحديد الكل
              </Typography>
            </Box>

            {/* Orders Display */}
            {viewMode === 'cards' && (
              <Box>
                {filteredData.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </Box>
            )}

            {viewMode === 'list' && (
              <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedOrders.length === filteredData.length}
                          indeterminate={
                            selectedOrders.length > 0 && selectedOrders.length < filteredData.length
                          }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>رقم الطلب</TableCell>
                      <TableCell>العميل</TableCell>
                      <TableCell>التاريخ</TableCell>
                      <TableCell>المبلغ</TableCell>
                      <TableCell>الحالة</TableCell>
                      <TableCell>التقدم</TableCell>
                      <TableCell>الإجراءات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {order.orderNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.tracking?.number}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {order.customer.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2">{order.customer.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {order.customer.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{order.date}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.estimatedDelivery}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {order.pricing.total.toFixed(2)} {order.pricing.currency}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            size="small"
                            color={getStatusColor(order.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ width: 100 }}>
                            <LinearProgress
                              variant="determinate"
                              value={order.progress}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {order.progress}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="عرض التفاصيل">
                              <IconButton size="small" onClick={() => handleViewDetails(order)}>
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="طباعة">
                              <IconButton size="small" onClick={() => handlePrint(order)}>
                                <PrintIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="مشاركة">
                              <IconButton size="small" onClick={() => handleShare(order)}>
                                <ShareIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {viewMode === 'timeline' && (
              <Box>
                {filteredData.map((order) => (
                  <Card key={order.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6">{order.orderNumber}</Typography>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </Box>
                      <TimelineComponent timeline={order.timeline} />
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Enhanced Order Details Dialog */}
      <Dialog
        open={openDetails}
        onClose={handleCloseDetails}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: { minHeight: '90vh' },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">تفاصيل الطلب - {selectedOrder?.orderNumber}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<PrintIcon />}
                onClick={() => handlePrint(selectedOrder)}
              >
                طباعة
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ShareIcon />}
                onClick={() => handleShare(selectedOrder)}
              >
                مشاركة
              </Button>
              <IconButton onClick={handleCloseDetails}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              {/* Tabs for different sections */}
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ mb: 3 }}
              >
                <Tab label="نظرة عامة" />
                <Tab label="المنتجات" />
                <Tab label="الشحن والتتبع" />
                <Tab label="الدفع" />
                <Tab label="الجدول الزمني" />
                <Tab label="التحليلات" />
              </Tabs>

              {/* Tab Content */}
              {activeTab === 0 && (
                <Grid container spacing={3}>
                  {/* Order Overview */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          معلومات الطلب
                        </Typography>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              رقم الطلب
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {selectedOrder.orderNumber}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              التاريخ
                            </Typography>
                            <Typography variant="body1">{selectedOrder.date}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              الحالة
                            </Typography>
                            <Chip
                              label={selectedOrder.status}
                              color={getStatusColor(selectedOrder.status)}
                              size="small"
                            />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              المبلغ الإجمالي
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, color: 'success.main' }}
                            >
                              {selectedOrder.pricing.total.toFixed(2)}{' '}
                              {selectedOrder.pricing.currency}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* Customer Info */}
                    <Card sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          معلومات العميل
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ mr: 2 }}>{selectedOrder.customer.name.charAt(0)}</Avatar>
                          <Box>
                            <Typography variant="subtitle1">
                              {selectedOrder.customer.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedOrder.customer.email}
                            </Typography>
                            <Chip
                              label={selectedOrder.customer.membershipLevel}
                              size="small"
                              color={getMembershipLevelColor(
                                selectedOrder.customer.membershipLevel,
                              )}
                              icon={getMembershipLevelIcon(selectedOrder.customer.membershipLevel)}
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        </Box>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon sx={{ mr: 1, fontSize: 16 }} />
                            <Typography variant="body2">{selectedOrder.customer.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneIcon sx={{ mr: 1, fontSize: 16 }} />
                            <Typography variant="body2">{selectedOrder.customer.phone}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <LocationIcon sx={{ mr: 1, fontSize: 16, mt: 0.5 }} />
                            <Typography variant="body2">{selectedOrder.shippingAddress}</Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Progress and Status */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          حالة التقدم
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              التقدم: {selectedOrder.currentStep} من {selectedOrder.totalSteps}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedOrder.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={selectedOrder.progress}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        <TimelineComponent timeline={selectedOrder.timeline} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      المنتجات ({selectedOrder.items.length})
                    </Typography>
                    <TableContainer sx={{ overflowX: 'auto' }}>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>المنتج</TableCell>
                            <TableCell>الكمية</TableCell>
                            <TableCell>السعر</TableCell>
                            <TableCell>المجموع</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedOrder.items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Avatar
                                    src={item.image}
                                    sx={{ width: 48, height: 48 }}
                                    variant="rounded"
                                  />
                                  <Box>
                                    <Typography variant="subtitle2">{item.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      SKU: {item.sku}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                {item.price} {selectedOrder.pricing.currency}
                              </TableCell>
                              <TableCell>
                                {(item.quantity * item.price).toFixed(2)}{' '}
                                {selectedOrder.pricing.currency}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              )}

              {activeTab === 2 && (
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          معلومات الشحن
                        </Typography>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              شركة الشحن
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.shipping.carrier}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              رقم التتبع
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.shipping.trackingNumber}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              العنوان
                            </Typography>
                            <Typography variant="body1">{selectedOrder.shippingAddress}</Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          تفاصيل الشحن
                        </Typography>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              الوزن
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.shipping.weight} كجم
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              الأبعاد
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.shipping.dimensions.length} ×{' '}
                              {selectedOrder.shipping.dimensions.width} ×{' '}
                              {selectedOrder.shipping.dimensions.height} سم
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              التأمين
                            </Typography>
                            <Chip
                              label={selectedOrder.shipping.insurance ? 'مؤمن' : 'غير مؤمن'}
                              color={selectedOrder.shipping.insurance ? 'success' : 'default'}
                              size="small"
                            />
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {activeTab === 3 && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      معلومات الدفع
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              طريقة الدفع
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.payment?.method || 'غير محدد'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              الحالة
                            </Typography>
                            <Chip
                              label={
                                selectedOrder.payment?.status ||
                                selectedOrder.paymentStatus ||
                                'غير محدد'
                              }
                              color={
                                (selectedOrder.payment?.status || selectedOrder.paymentStatus) ===
                                'مدفوع'
                                  ? 'success'
                                  : 'warning'
                              }
                              size="small"
                            />
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              المبلغ
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {selectedOrder.payment?.amount || selectedOrder.pricing?.total || 0}{' '}
                              {selectedOrder.payment?.currency ||
                                selectedOrder.pricing?.currency ||
                                'SAR'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              تاريخ الدفع
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.payment?.paidAt || 'غير محدد'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              رقم المعاملة
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.payment?.transactionId || 'غير محدد'}
                            </Typography>
                          </Box>
                          {selectedOrder.payment?.bank && (
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                البنك
                              </Typography>
                              <Typography variant="body1">{selectedOrder.payment.bank}</Typography>
                            </Box>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {activeTab === 4 && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      الجدول الزمني للطلب
                    </Typography>
                    <TimelineComponent timeline={selectedOrder.timeline} />
                  </CardContent>
                </Card>
              )}

              {activeTab === 5 && (
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          تحليلات الطلب
                        </Typography>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              المصدر
                            </Typography>
                            <Typography variant="body1">{selectedOrder.source}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              المراجع
                            </Typography>
                            <Typography variant="body1">{selectedOrder.referrer}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              الجهاز
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.analytics.device}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          إحصائيات الزيارات
                        </Typography>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              عدد الصفحات
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.analytics.pageViews}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              وقت الموقع
                            </Typography>
                            <Typography variant="body1">
                              {selectedOrder.analytics.timeOnSite}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              معدل الارتداد
                            </Typography>
                            <Typography variant="body1">
                              {(selectedOrder.analytics.bounceRate * 100).toFixed(1)}%
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>إغلاق</Button>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={() => handlePrint(selectedOrder)}
          >
            طباعة
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdersTracking;
