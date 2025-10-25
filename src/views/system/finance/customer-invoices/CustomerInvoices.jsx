import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Breadcrumbs,
  Link,
  Toolbar,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Stack,
  Avatar,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Menu,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  Divider,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Save as SaveIcon,
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  MonetizationOn as MonetizationOnIcon,
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  ReceiptLong as ReceiptLongIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  ViewColumn as ViewColumnIcon,
  DensityMedium as DensityMediumIcon,
  DensitySmall as DensitySmallIcon,
  DensityLarge as DensityLargeIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const CustomerInvoices = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customerFilter, setCustomerFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [amountFilter, setAmountFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('invoiceDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [columnVisibility, setColumnVisibility] = useState({
    invoiceNumber: true,
    customer: true,
    amount: true,
    status: true,
    invoiceDate: true,
    dueDate: true,
    paymentDate: true,
    paymentMethod: true,
    tax: true,
    discount: true,
    total: true,
    notes: false,
    createdBy: false,
    lastModified: true,
  });

  // Mock data for customer invoices
  const invoicesData = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      customer: {
        id: 1,
        name: 'أحمد محمد علي',
        email: 'ahmed.mohamed@email.com',
        phone: '+966501234567',
        company: 'شركة التقنية المتقدمة',
        type: 'individual',
        address: {
          street: 'شارع الملك فهد',
          city: 'الرياض',
          country: 'السعودية',
          postalCode: '12345',
        },
      },
      amount: 2500.0,
      tax: 375.0,
      discount: 125.0,
      total: 2750.0,
      status: 'paid',
      statusLabel: 'مدفوعة',
      priority: 'normal',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-15',
      paymentDate: '2024-01-20',
      paymentMethod: 'bank_transfer',
      paymentMethodLabel: 'تحويل بنكي',
      currency: 'SAR',
      items: [
        {
          id: 1,
          description: 'خدمات تطوير موقع إلكتروني',
          quantity: 1,
          unitPrice: 2000.0,
          total: 2000.0,
        },
        {
          id: 2,
          description: 'خدمات الصيانة الشهرية',
          quantity: 1,
          unitPrice: 500.0,
          total: 500.0,
        },
      ],
      notes: 'شكراً لثقتكم في خدماتنا',
      terms: 'الدفع خلال 30 يوم من تاريخ الفاتورة',
      createdBy: 'محمد أحمد',
      lastModified: '2024-01-20',
      attachments: ['contract.pdf', 'invoice.pdf'],
      tags: ['تطوير', 'موقع إلكتروني'],
      recurring: false,
      recurringFrequency: null,
      nextInvoiceDate: null,
      paymentTerms: 'net_30',
      lateFee: 0.0,
      earlyPaymentDiscount: 0.0,
      reference: 'REF-001',
      project: 'موقع الشركة الجديد',
      department: 'تكنولوجيا المعلومات',
      costCenter: 'IT-001',
      approvalStatus: 'approved',
      approvedBy: 'مدير المالية',
      approvedDate: '2024-01-15',
      sentDate: '2024-01-15',
      viewedDate: '2024-01-16',
      reminderSent: 0,
      lastReminderDate: null,
      overdueDays: 0,
      paymentHistory: [
        {
          id: 1,
          date: '2024-01-20',
          amount: 2750.0,
          method: 'bank_transfer',
          reference: 'TXN-001',
          status: 'completed',
        },
      ],
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      customer: {
        id: 2,
        name: 'فاطمة السعيد',
        email: 'fatima.alsaeed@email.com',
        phone: '+966507654321',
        company: 'مؤسسة الإبداع التجاري',
        type: 'business',
        address: {
          street: 'شارع العليا',
          city: 'جدة',
          country: 'السعودية',
          postalCode: '21432',
        },
      },
      amount: 1800.0,
      tax: 270.0,
      discount: 0.0,
      total: 2070.0,
      status: 'pending',
      statusLabel: 'معلقة',
      priority: 'high',
      invoiceDate: '2024-01-20',
      dueDate: '2024-02-20',
      paymentDate: null,
      paymentMethod: null,
      paymentMethodLabel: null,
      currency: 'SAR',
      items: [
        {
          id: 3,
          description: 'خدمات التسويق الرقمي',
          quantity: 3,
          unitPrice: 600.0,
          total: 1800.0,
        },
      ],
      notes: 'يرجى الدفع في الموعد المحدد',
      terms: 'الدفع خلال 30 يوم من تاريخ الفاتورة',
      createdBy: 'سارة أحمد',
      lastModified: '2024-01-20',
      attachments: ['marketing_plan.pdf'],
      tags: ['تسويق', 'رقمي'],
      recurring: true,
      recurringFrequency: 'monthly',
      nextInvoiceDate: '2024-02-20',
      paymentTerms: 'net_30',
      lateFee: 50.0,
      earlyPaymentDiscount: 100.0,
      reference: 'REF-002',
      project: 'حملة التسويق الشتوية',
      department: 'التسويق',
      costCenter: 'MKT-001',
      approvalStatus: 'approved',
      approvedBy: 'مدير التسويق',
      approvedDate: '2024-01-20',
      sentDate: '2024-01-20',
      viewedDate: '2024-01-21',
      reminderSent: 1,
      lastReminderDate: '2024-02-10',
      overdueDays: 0,
      paymentHistory: [],
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      customer: {
        id: 3,
        name: 'خالد عبدالله',
        email: 'khalid.abdullah@email.com',
        phone: '+966509876543',
        company: 'شركة البناء الحديث',
        type: 'business',
        address: {
          street: 'شارع التحلية',
          city: 'الدمام',
          country: 'السعودية',
          postalCode: '31421',
        },
      },
      amount: 5000.0,
      tax: 750.0,
      discount: 250.0,
      total: 5500.0,
      status: 'overdue',
      statusLabel: 'متأخرة',
      priority: 'urgent',
      invoiceDate: '2024-01-10',
      dueDate: '2024-02-10',
      paymentDate: null,
      paymentMethod: null,
      paymentMethodLabel: null,
      currency: 'SAR',
      items: [
        {
          id: 4,
          description: 'خدمات الاستشارات الهندسية',
          quantity: 1,
          unitPrice: 5000.0,
          total: 5000.0,
        },
      ],
      notes: 'فاتورة متأخرة - يرجى الدفع فوراً',
      terms: 'الدفع خلال 30 يوم من تاريخ الفاتورة',
      createdBy: 'عبدالرحمن محمد',
      lastModified: '2024-02-15',
      attachments: ['engineering_report.pdf', 'consultation_agreement.pdf'],
      tags: ['استشارات', 'هندسة'],
      recurring: false,
      recurringFrequency: null,
      nextInvoiceDate: null,
      paymentTerms: 'net_30',
      lateFee: 100.0,
      earlyPaymentDiscount: 0.0,
      reference: 'REF-003',
      project: 'مشروع البناء التجاري',
      department: 'الهندسة',
      costCenter: 'ENG-001',
      approvalStatus: 'approved',
      approvedBy: 'مدير الهندسة',
      approvedDate: '2024-01-10',
      sentDate: '2024-01-10',
      viewedDate: '2024-01-11',
      reminderSent: 3,
      lastReminderDate: '2024-02-12',
      overdueDays: 5,
      paymentHistory: [],
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      customer: {
        id: 4,
        name: 'نورا أحمد',
        email: 'nora.ahmed@email.com',
        phone: '+966501112233',
        company: null,
        type: 'individual',
        address: {
          street: 'شارع النخيل',
          city: 'الرياض',
          country: 'السعودية',
          postalCode: '12345',
        },
      },
      amount: 1200.0,
      tax: 180.0,
      discount: 60.0,
      total: 1320.0,
      status: 'draft',
      statusLabel: 'مسودة',
      priority: 'normal',
      invoiceDate: '2024-01-25',
      dueDate: '2024-02-25',
      paymentDate: null,
      paymentMethod: null,
      paymentMethodLabel: null,
      currency: 'SAR',
      items: [
        {
          id: 5,
          description: 'خدمات التصميم الجرافيكي',
          quantity: 2,
          unitPrice: 600.0,
          total: 1200.0,
        },
      ],
      notes: 'تصميم شعار ومواد تسويقية',
      terms: 'الدفع خلال 30 يوم من تاريخ الفاتورة',
      createdBy: 'ريم محمد',
      lastModified: '2024-01-25',
      attachments: [],
      tags: ['تصميم', 'جرافيك'],
      recurring: false,
      recurringFrequency: null,
      nextInvoiceDate: null,
      paymentTerms: 'net_30',
      lateFee: 0.0,
      earlyPaymentDiscount: 0.0,
      reference: 'REF-004',
      project: 'تصميم الهوية البصرية',
      department: 'التصميم',
      costCenter: 'DES-001',
      approvalStatus: 'pending',
      approvedBy: null,
      approvedDate: null,
      sentDate: null,
      viewedDate: null,
      reminderSent: 0,
      lastReminderDate: null,
      overdueDays: 0,
      paymentHistory: [],
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      customer: {
        id: 5,
        name: 'عبدالعزيز السعد',
        email: 'abdulaziz.alsad@email.com',
        phone: '+966504445566',
        company: 'مجموعة الاستثمار الذكي',
        type: 'business',
        address: {
          street: 'شارع الملك عبدالعزيز',
          city: 'الرياض',
          country: 'السعودية',
          postalCode: '12345',
        },
      },
      amount: 8000.0,
      tax: 1200.0,
      discount: 400.0,
      total: 8800.0,
      status: 'cancelled',
      statusLabel: 'ملغاة',
      priority: 'normal',
      invoiceDate: '2024-01-18',
      dueDate: '2024-02-18',
      paymentDate: null,
      paymentMethod: null,
      paymentMethodLabel: null,
      currency: 'SAR',
      items: [
        {
          id: 6,
          description: 'خدمات الاستشارات المالية',
          quantity: 1,
          unitPrice: 8000.0,
          total: 8000.0,
        },
      ],
      notes: 'تم إلغاء الفاتورة بناءً على طلب العميل',
      terms: 'الدفع خلال 30 يوم من تاريخ الفاتورة',
      createdBy: 'محمد علي',
      lastModified: '2024-01-22',
      attachments: ['cancellation_request.pdf'],
      tags: ['استشارات', 'مالية'],
      recurring: false,
      recurringFrequency: null,
      nextInvoiceDate: null,
      paymentTerms: 'net_30',
      lateFee: 0.0,
      earlyPaymentDiscount: 0.0,
      reference: 'REF-005',
      project: 'دراسة الجدوى الاستثمارية',
      department: 'الاستشارات',
      costCenter: 'CON-001',
      approvalStatus: 'cancelled',
      approvedBy: 'مدير المالية',
      approvedDate: '2024-01-22',
      sentDate: '2024-01-18',
      viewedDate: '2024-01-19',
      reminderSent: 0,
      lastReminderDate: null,
      overdueDays: 0,
      paymentHistory: [],
    },
  ];

  const customers = [
    { id: 1, name: 'أحمد محمد علي', type: 'individual' },
    { id: 2, name: 'فاطمة السعيد', type: 'business' },
    { id: 3, name: 'خالد عبدالله', type: 'business' },
    { id: 4, name: 'نورا أحمد', type: 'individual' },
    { id: 5, name: 'عبدالعزيز السعد', type: 'business' },
  ];

  const statusOptions = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'pending', label: 'معلقة', color: 'warning' },
    { value: 'paid', label: 'مدفوعة', color: 'success' },
    { value: 'overdue', label: 'متأخرة', color: 'error' },
    { value: 'cancelled', label: 'ملغاة', color: 'default' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'منخفضة', color: 'success' },
    { value: 'normal', label: 'عادية', color: 'default' },
    { value: 'high', label: 'عالية', color: 'warning' },
    { value: 'urgent', label: 'عاجلة', color: 'error' },
  ];

  const paymentMethods = [
    { value: 'cash', label: 'نقداً' },
    { value: 'bank_transfer', label: 'تحويل بنكي' },
    { value: 'credit_card', label: 'بطاقة ائتمانية' },
    { value: 'check', label: 'شيك' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'stripe', label: 'Stripe' },
  ];

  const paymentTerms = [
    { value: 'net_15', label: 'صافي 15 يوم' },
    { value: 'net_30', label: 'صافي 30 يوم' },
    { value: 'net_60', label: 'صافي 60 يوم' },
    { value: 'due_on_receipt', label: 'عند الاستلام' },
    { value: 'cash_in_advance', label: 'دفع مقدماً' },
  ];

  // إحصائيات الفواتير المحسنة
  const invoiceStats = [
    {
      title: 'إجمالي الفواتير',
      value: invoicesData.length.toString(),
      color: 'primary',
      icon: ReceiptIcon,
      change: '+12%',
      trend: 'up',
      description: 'إجمالي عدد الفواتير',
    },
    {
      title: 'الفواتير المدفوعة',
      value: invoicesData.filter((i) => i.status === 'paid').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '85%',
      trend: 'up',
      description: 'نسبة الفواتير المدفوعة',
    },
    {
      title: 'المبلغ المعلق',
      value: new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
      }).format(
        invoicesData.filter((i) => i.status === 'pending').reduce((sum, i) => sum + i.total, 0),
      ),
      color: 'warning',
      icon: ScheduleIcon,
      change: '3 معلقة',
      trend: 'down',
      description: 'إجمالي المبالغ المعلقة',
    },
    {
      title: 'المبلغ المتأخر',
      value: new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
      }).format(
        invoicesData.filter((i) => i.status === 'overdue').reduce((sum, i) => sum + i.total, 0),
      ),
      color: 'error',
      icon: WarningIcon,
      change: '1 متأخرة',
      trend: 'up',
      description: 'إجمالي المبالغ المتأخرة',
    },
    {
      title: 'إجمالي الإيرادات',
      value: new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
      }).format(
        invoicesData.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.total, 0),
      ),
      color: 'info',
      icon: MonetizationOnIcon,
      change: '+25%',
      trend: 'up',
      description: 'إجمالي الإيرادات المحققة',
    },
    {
      title: 'متوسط قيمة الفاتورة',
      value: new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
      }).format(invoicesData.reduce((sum, i) => sum + i.total, 0) / invoicesData.length),
      color: 'secondary',
      icon: AssessmentIcon,
      change: '+8%',
      trend: 'up',
      description: 'متوسط قيمة الفاتورة الواحدة',
    },
    {
      title: 'الفواتير المتكررة',
      value: invoicesData.filter((i) => i.recurring).length.toString(),
      color: 'info',
      icon: TimelineIcon,
      change: '2 نشطة',
      trend: 'up',
      description: 'عدد الفواتير المتكررة',
    },
    {
      title: 'معدل التحصيل',
      value: `${Math.round(
        (invoicesData.filter((i) => i.status === 'paid').length / invoicesData.length) * 100,
      )}%`,
      color: 'success',
      icon: TrendingUpIcon,
      change: '+5%',
      trend: 'up',
      description: 'نسبة تحصيل الفواتير',
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const notify = (action, details) => {
    setSnackbar({
      open: true,
      message: `تم تنفيذ: ${action} - ${details}`,
      severity: 'success',
    });
  };

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        const currentData = invoicesData.filter((item) => {
          const matchesSearch =
            item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.customer.company?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
          const matchesCustomer =
            customerFilter === 'all' || item.customer.id.toString() === customerFilter;
          const matchesDate = dateFilter === 'all' || true;
          const matchesAmount = amountFilter === 'all' || true;
          return matchesSearch && matchesStatus && matchesCustomer && matchesDate && matchesAmount;
        });
        setSelectedItems(currentData.map((item) => item.id));
      } else {
        setSelectedItems([]);
      }
    },
    [invoicesData, searchTerm, statusFilter, customerFilter, dateFilter, amountFilter],
  );

  const handleSelectItem = useCallback((itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
  }, []);

  const handleBulkAction = useCallback(
    (action) => {
      notify(`${action} الفواتير`, `${selectedItems.length} فاتورة`);
      setSelectedItems([]);
    },
    [selectedItems.length, notify],
  );

  const handleSort = useCallback(
    (property) => {
      const isAsc = sortBy === property && sortOrder === 'asc';
      setSortOrder(isAsc ? 'desc' : 'asc');
      setSortBy(property);
    },
    [sortBy, sortOrder],
  );

  const handleView = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setViewDrawer(true);
  }, []);

  const handleEdit = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setOpenDialog(true);
  }, []);

  const handleDelete = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setOpenDeleteDialog(true);
  }, []);

  const handlePayment = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setOpenPaymentDialog(true);
  }, []);

  const handleSend = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setOpenSendDialog(true);
  }, []);

  const handleSave = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الفاتورة', selectedInvoice ? 'تم تحديث الفاتورة' : 'تم إنشاء الفاتورة');
    }, 1000);
  }, [selectedInvoice, notify]);

  const handleDeleteConfirm = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الفاتورة', 'تم حذف الفاتورة');
    }, 1000);
  }, [notify]);

  const handlePaymentConfirm = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenPaymentDialog(false);
      notify('تسجيل الدفع', 'تم تسجيل الدفع بنجاح');
    }, 1000);
  }, [notify]);

  const handleSendConfirm = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenSendDialog(false);
      notify('إرسال الفاتورة', 'تم إرسال الفاتورة للعميل');
    }, 1000);
  }, [notify]);

  const handleExport = useCallback(() => {
    notify('تصدير الفواتير', 'تم تصدير البيانات');
  }, [notify]);

  const handlePrint = useCallback(() => {
    notify('طباعة الفاتورة', 'تم إرسال الفاتورة للطباعة');
  }, [notify]);

  const handleDensityChange = useCallback((newDensity) => {
    setDensity(newDensity);
  }, []);

  const handleColumnToggle = useCallback((column) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  }, []);

  const filteredData = useMemo(() => {
    return invoicesData.filter((item) => {
      const matchesSearch =
        item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.company?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCustomer =
        customerFilter === 'all' || item.customer.id.toString() === customerFilter;
      const matchesDate = dateFilter === 'all' || true; // يمكن إضافة منطق التاريخ لاحقاً
      const matchesAmount = amountFilter === 'all' || true; // يمكن إضافة منطق المبلغ لاحقاً
      return matchesSearch && matchesStatus && matchesCustomer && matchesDate && matchesAmount;
    });
  }, [invoicesData, searchTerm, statusFilter, customerFilter, dateFilter, amountFilter]);

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

  const getStatusColor = useCallback((status) => {
    const statusInfo = statusOptions.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  }, []);

  const getStatusLabel = useCallback((status) => {
    const statusInfo = statusOptions.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const priorityInfo = priorityOptions.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.color : 'default';
  }, []);

  const getPriorityLabel = useCallback((priority) => {
    const priorityInfo = priorityOptions.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.label : priority;
  }, []);

  const getDensityProps = useCallback(() => {
    switch (density) {
      case 'compact':
        return { size: 'small' };
      case 'comfortable':
        return { size: 'medium' };
      default:
        return { size: 'small' };
    }
  }, [density]);

  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة فواتير العملاء
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة شاملة لفواتير العملاء مع تتبع المدفوعات والتحليلات المتقدمة
            </Typography>
            <Breadcrumbs separator="›" sx={{ mt: 1 }}>
              <Link color="inherit" href="/system" sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/system/finance">
                الحسابات والمالية
              </Link>
              <Typography color="text.primary">فواتير العملاء</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
              }}
              disabled={loading}
            >
              {loading ? 'جاري التحديث...' : 'تحديث'}
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              إضافة فاتورة
            </Button>
          </Stack>
        </Box>

        {/* Stats Cards المحسنة */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {invoiceStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette[stat.color].main,
                      0.12,
                    )} 0%, ${alpha(theme.palette[stat.color].main, 0.06)} 100%)`,
                    border: `1px solid ${alpha(theme.palette[stat.color].main, 0.3)}`,
                    transition: 'all .3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 12px 24px ${alpha(theme.palette[stat.color].main, 0.2)}`,
                      '& .stat-icon': {
                        transform: 'scale(1.1)',
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${
                        theme.palette[stat.color].main
                      }, ${alpha(theme.palette[stat.color].main, 0.6)})`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <Avatar
                        className="stat-icon"
                        sx={{
                          bgcolor: `${stat.color}.main`,
                          width: 56,
                          height: 56,
                          mr: 2,
                          transition: 'all .3s ease',
                          boxShadow: `0 4px 12px ${alpha(theme.palette[stat.color].main, 0.3)}`,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 28 }} />
                      </Avatar>
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: `${stat.color}.main`, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', mb: 1, fontSize: '0.875rem' }}
                    >
                      {stat.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                      }}
                    >
                      {stat.trend === 'up' ? (
                        <TrendingUpIcon sx={{ color: 'success.main', fontSize: 18 }} />
                      ) : (
                        <TrendingDownIcon sx={{ color: 'error.main', fontSize: 18 }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          color: stat.trend === 'up' ? 'success.main' : 'error.main',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        {stat.change}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Filters & Search المحسن */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            <FilterIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            الفلاتر والبحث المتقدم
          </Typography>
          <Chip
            label={`${filteredData.length} نتيجة`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="البحث في رقم الفاتورة، اسم العميل، البريد الإلكتروني..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'primary.main' }} />,
                sx: { borderRadius: 2 },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
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
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                {statusOptions.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={status.label}
                        size="small"
                        color={status.color}
                        variant="outlined"
                      />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>العميل</InputLabel>
              <Select
                value={customerFilter}
                label="العميل"
                onChange={(e) => setCustomerFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">جميع العملاء</MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id.toString()}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                        {customer.name.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{customer.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>التاريخ</InputLabel>
              <Select
                value={dateFilter}
                label="التاريخ"
                onChange={(e) => setDateFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">جميع التواريخ</MenuItem>
                <MenuItem value="today">اليوم</MenuItem>
                <MenuItem value="week">هذا الأسبوع</MenuItem>
                <MenuItem value="month">هذا الشهر</MenuItem>
                <MenuItem value="quarter">هذا الربع</MenuItem>
                <MenuItem value="year">هذا العام</MenuItem>
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
                setCustomerFilter('all');
                setDateFilter('all');
                setAmountFilter('all');
              }}
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              مسح الفلاتر
            </Button>
          </Grid>
        </Grid>

        {/* Quick Filters */}
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" sx={{ mr: 2, alignSelf: 'center', fontWeight: 600 }}>
            فلاتر سريعة:
          </Typography>
          {[
            { label: 'المدفوعة', value: 'paid', color: 'success' },
            { label: 'المعلقة', value: 'pending', color: 'warning' },
            { label: 'المتأخرة', value: 'overdue', color: 'error' },
            { label: 'المسودات', value: 'draft', color: 'default' },
          ].map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              color={filter.color}
              variant={statusFilter === filter.value ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter(filter.value === statusFilter ? 'all' : filter.value)}
              sx={{ cursor: 'pointer', fontWeight: 600 }}
            />
          ))}
        </Box>
      </Paper>

      {/* Content المحسن */}
      <Paper sx={{ borderRadius: 3, boxShadow: 2, overflow: 'hidden' }}>
        <Toolbar
          sx={{
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.08,
            )} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            py: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <ReceiptIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              قائمة الفواتير
            </Typography>
            <Chip
              label={`${sortedData.length} فاتورة`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ ml: 2, fontWeight: 600 }}
            />
          </Box>

          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2, display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => handleBulkAction('تعيين كمدفوعة')}
                startIcon={<CheckCircleIcon />}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              >
                تعيين كمدفوعة ({selectedItems.length})
              </Button>
              <Button
                size="small"
                variant="contained"
                color="info"
                onClick={() => handleBulkAction('إرسال')}
                startIcon={<SendIcon />}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              >
                إرسال ({selectedItems.length})
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleBulkAction('حذف')}
                startIcon={<DeleteIcon />}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              >
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="تصدير CSV">
              <IconButton
                onClick={handleExport}
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  '&:hover': { bgcolor: alpha(theme.palette.success.main, 0.2) },
                }}
              >
                <DownloadIcon color="success" />
              </IconButton>
            </Tooltip>
            <Tooltip title="طباعة">
              <IconButton
                onClick={handlePrint}
                sx={{
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  '&:hover': { bgcolor: alpha(theme.palette.info.main, 0.2) },
                }}
              >
                <PrintIcon color="info" />
              </IconButton>
            </Tooltip>
            <Tooltip title="رؤية الأعمدة">
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.2) },
                }}
              >
                <ViewColumnIcon color="warning" />
              </IconButton>
            </Tooltip>
            <Tooltip title="الكثافة">
              <IconButton
                onClick={() =>
                  handleDensityChange(density === 'compact' ? 'comfortable' : 'compact')
                }
                sx={{
                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                  '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.2) },
                }}
              >
                {density === 'compact' ? (
                  <DensityMediumIcon color="secondary" />
                ) : (
                  <DensitySmallIcon color="secondary" />
                )}
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1,
              }}
            >
              إضافة فاتورة
            </Button>
          </Box>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={60} sx={{ mb: 1 }} />
            ))}
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على فواتير. أضف أول فاتورة.</Alert>
          </Box>
        ) : (
          <>
            <Table {...getDensityProps()}>
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
                  {columnVisibility.invoiceNumber && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'invoiceNumber'}
                        direction={sortBy === 'invoiceNumber' ? sortOrder : 'asc'}
                        onClick={() => handleSort('invoiceNumber')}
                      >
                        رقم الفاتورة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.customer && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'customer'}
                        direction={sortBy === 'customer' ? sortOrder : 'asc'}
                        onClick={() => handleSort('customer')}
                      >
                        العميل
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.amount && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'amount'}
                        direction={sortBy === 'amount' ? sortOrder : 'asc'}
                        onClick={() => handleSort('amount')}
                      >
                        المبلغ
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.total && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'total'}
                        direction={sortBy === 'total' ? sortOrder : 'asc'}
                        onClick={() => handleSort('total')}
                      >
                        الإجمالي
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.status && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'status'}
                        direction={sortBy === 'status' ? sortOrder : 'asc'}
                        onClick={() => handleSort('status')}
                      >
                        الحالة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.invoiceDate && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'invoiceDate'}
                        direction={sortBy === 'invoiceDate' ? sortOrder : 'asc'}
                        onClick={() => handleSort('invoiceDate')}
                      >
                        تاريخ الفاتورة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.dueDate && <TableCell>تاريخ الاستحقاق</TableCell>}
                  {columnVisibility.paymentDate && <TableCell>تاريخ الدفع</TableCell>}
                  {columnVisibility.paymentMethod && <TableCell>طريقة الدفع</TableCell>}
                  {columnVisibility.tax && <TableCell>الضريبة</TableCell>}
                  {columnVisibility.discount && <TableCell>الخصم</TableCell>}
                  {columnVisibility.lastModified && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'lastModified'}
                        direction={sortBy === 'lastModified' ? sortOrder : 'asc'}
                        onClick={() => handleSort('lastModified')}
                      >
                        آخر تعديل
                      </TableSortLabel>
                    </TableCell>
                  )}
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
                      {columnVisibility.invoiceNumber && (
                        <TableCell>
                          <Typography variant="subtitle2" fontFamily="monospace">
                            {item.invoiceNumber}
                          </Typography>
                        </TableCell>
                      )}
                      {columnVisibility.customer && (
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                mr: 2,
                                bgcolor: 'primary.main',
                                boxShadow: 2,
                                border: '2px solid white',
                              }}
                            >
                              {item.customer.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {item.customer.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.customer.company || item.customer.email}
                              </Typography>
                              {item.customer.type === 'business' && (
                                <Chip
                                  label="شركة"
                                  size="small"
                                  color="info"
                                  variant="outlined"
                                  sx={{ mt: 0.5, fontSize: '0.7rem' }}
                                />
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                      )}
                      {columnVisibility.amount && (
                        <TableCell>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                              {formatCurrency(item.amount)}
                            </Typography>
                            {item.discount > 0 && (
                              <Typography
                                variant="caption"
                                color="success.main"
                                sx={{ display: 'block' }}
                              >
                                خصم: {formatCurrency(item.discount)}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                      )}
                      {columnVisibility.total && (
                        <TableCell>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                              {formatCurrency(item.total)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: 'block' }}
                            >
                              شامل الضريبة
                            </Typography>
                          </Box>
                        </TableCell>
                      )}
                      {columnVisibility.status && (
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={item.statusLabel}
                              size="small"
                              color={getStatusColor(item.status)}
                              variant="filled"
                              sx={{
                                fontWeight: 600,
                                boxShadow: 1,
                                '& .MuiChip-label': {
                                  px: 1.5,
                                },
                              }}
                            />
                            {item.priority === 'urgent' && (
                              <Chip
                                label="عاجل"
                                size="small"
                                color="error"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            )}
                            {item.recurring && (
                              <Chip
                                label="متكرر"
                                size="small"
                                color="info"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            )}
                          </Box>
                        </TableCell>
                      )}
                      {columnVisibility.invoiceDate && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(item.invoiceDate)}
                          </Typography>
                        </TableCell>
                      )}
                      {columnVisibility.dueDate && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(item.dueDate)}
                          </Typography>
                        </TableCell>
                      )}
                      {columnVisibility.paymentDate && (
                        <TableCell>
                          <Typography
                            variant="body2"
                            color={item.paymentDate ? 'success.main' : 'text.secondary'}
                          >
                            {item.paymentDate ? formatDate(item.paymentDate) : 'غير مدفوع'}
                          </Typography>
                        </TableCell>
                      )}
                      {columnVisibility.paymentMethod && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {item.paymentMethodLabel || '-'}
                          </Typography>
                        </TableCell>
                      )}
                      {columnVisibility.tax && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatCurrency(item.tax)}
                          </Typography>
                        </TableCell>
                      )}
                      {columnVisibility.discount && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatCurrency(item.discount)}
                          </Typography>
                        </TableCell>
                      )}
                      {columnVisibility.lastModified && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(item.lastModified)}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleView(item)}
                              aria-label="عرض تفاصيل الفاتورة"
                              sx={{
                                bgcolor: alpha(theme.palette.info.main, 0.1),
                                '&:hover': { bgcolor: alpha(theme.palette.info.main, 0.2) },
                              }}
                            >
                              <ViewIcon color="info" />
                            </IconButton>
                          </Tooltip>
                          {item.status !== 'paid' && (
                            <Tooltip title="تسجيل الدفع" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handlePayment(item)}
                                aria-label="تسجيل الدفع"
                                sx={{
                                  bgcolor: alpha(theme.palette.success.main, 0.1),
                                  '&:hover': { bgcolor: alpha(theme.palette.success.main, 0.2) },
                                }}
                              >
                                <PaymentIcon color="success" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="إرسال للعميل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleSend(item)}
                              aria-label="إرسال للعميل"
                              sx={{
                                bgcolor: alpha(theme.palette.warning.main, 0.1),
                                '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.2) },
                              }}
                            >
                              <SendIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الفاتورة" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="تعديل الفاتورة"
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                              }}
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الفاتورة" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(item)}
                              aria-label="حذف الفاتورة"
                              sx={{
                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) },
                              }}
                            >
                              <DeleteIcon color="error" />
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

      {/* Add/Edit Invoice Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedInvoice ? 'تعديل الفاتورة' : 'إضافة فاتورة جديدة'}</DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="معلومات الفاتورة" />
            <Tab label="تفاصيل العميل" />
            <Tab label="البنود والخدمات" />
            <Tab label="الدفع والشروط" />
          </Tabs>

          {activeTab === 0 && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="رقم الفاتورة"
                  placeholder="أدخل رقم الفاتورة"
                  defaultValue={selectedInvoice?.invoiceNumber || ''}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="تاريخ الفاتورة"
                  defaultValue={selectedInvoice?.invoiceDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="تاريخ الاستحقاق"
                  defaultValue={selectedInvoice?.dueDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>الحالة</InputLabel>
                  <Select label="الحالة" defaultValue={selectedInvoice?.status || 'draft'}>
                    {statusOptions.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>الأولوية</InputLabel>
                  <Select label="الأولوية" defaultValue={selectedInvoice?.priority || 'normal'}>
                    {priorityOptions.map((priority) => (
                      <MenuItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="المرجع"
                  placeholder="أدخل مرجع الفاتورة"
                  defaultValue={selectedInvoice?.reference || ''}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="ملاحظات"
                  placeholder="أدخل ملاحظات الفاتورة..."
                  defaultValue={selectedInvoice?.notes || ''}
                />
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="اسم العميل"
                  placeholder="أدخل اسم العميل"
                  defaultValue={selectedInvoice?.customer?.name || ''}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="البريد الإلكتروني"
                  placeholder="أدخل البريد الإلكتروني"
                  defaultValue={selectedInvoice?.customer?.email || ''}
                  type="email"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="رقم الهاتف"
                  placeholder="أدخل رقم الهاتف"
                  defaultValue={selectedInvoice?.customer?.phone || ''}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="الشركة"
                  placeholder="أدخل اسم الشركة"
                  defaultValue={selectedInvoice?.customer?.company || ''}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="العنوان"
                  placeholder="أدخل العنوان الكامل"
                  defaultValue={selectedInvoice?.customer?.address?.street || ''}
                />
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  بنود الفاتورة
                </Typography>
                {/* يمكن إضافة جدول للبنود هنا */}
                <Button variant="outlined" startIcon={<AddIcon />} sx={{ mb: 2 }}>
                  إضافة بند
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="المبلغ الإجمالي"
                  placeholder="0.00"
                  defaultValue={selectedInvoice?.amount || ''}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="الضريبة"
                  placeholder="0.00"
                  defaultValue={selectedInvoice?.tax || ''}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="الخصم"
                  placeholder="0.00"
                  defaultValue={selectedInvoice?.discount || ''}
                />
              </Grid>
            </Grid>
          )}

          {activeTab === 3 && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>طريقة الدفع</InputLabel>
                  <Select label="طريقة الدفع" defaultValue={selectedInvoice?.paymentMethod || ''}>
                    {paymentMethods.map((method) => (
                      <MenuItem key={method.value} value={method.value}>
                        {method.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>شروط الدفع</InputLabel>
                  <Select
                    label="شروط الدفع"
                    defaultValue={selectedInvoice?.paymentTerms || 'net_30'}
                  >
                    {paymentTerms.map((term) => (
                      <MenuItem key={term.value} value={term.value}>
                        {term.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="رسوم التأخير"
                  placeholder="0.00"
                  defaultValue={selectedInvoice?.lateFee || ''}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="خصم الدفع المبكر"
                  placeholder="0.00"
                  defaultValue={selectedInvoice?.earlyPaymentDiscount || ''}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="شروط وأحكام الدفع"
                  placeholder="أدخل شروط وأحكام الدفع..."
                  defaultValue={selectedInvoice?.terms || ''}
                />
              </Grid>
            </Grid>
          )}
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

      {/* Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>تسجيل الدفع</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="مبلغ الدفع" placeholder="0.00" type="number" required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>طريقة الدفع</InputLabel>
                <Select label="طريقة الدفع">
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الدفع"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="مرجع المعاملة" placeholder="أدخل مرجع المعاملة" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات الدفع"
                placeholder="أدخل ملاحظات الدفع..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handlePaymentConfirm}
            disabled={loading}
            startIcon={<PaymentIcon />}
          >
            {loading ? 'جاري التسجيل...' : 'تسجيل الدفع'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Send Dialog */}
      <Dialog
        open={openSendDialog}
        onClose={() => setOpenSendDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>إرسال الفاتورة</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedInvoice?.customer?.email || ''}
                type="email"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الموضوع"
                placeholder="أدخل موضوع الرسالة"
                defaultValue={`فاتورة ${selectedInvoice?.invoiceNumber || ''}`}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="نص الرسالة"
                placeholder="أدخل نص الرسالة..."
                defaultValue="مرحباً، يرجى الاطلاع على الفاتورة المرفقة. شكراً لثقتكم في خدماتنا."
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="إرسال نسخة PDF" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="إرسال تذكير تلقائي" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSendDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleSendConfirm}
            disabled={loading}
            startIcon={<SendIcon />}
          >
            {loading ? 'جاري الإرسال...' : 'إرسال'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف الفاتورة</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذه الفاتورة؟
          </Typography>
          {selectedInvoice && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedInvoice.invoiceNumber}</Typography>
              <Typography variant="body2" color="text.secondary">
                العميل: {selectedInvoice.customer.name} | المبلغ:{' '}
                {formatCurrency(selectedInvoice.total)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            disabled={loading}
          >
            {loading ? 'جاري الحذف...' : 'حذف'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Drawer المحسن */}
      <Drawer
        anchor="right"
        open={viewDrawer}
        onClose={() => setViewDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 700,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.background.paper,
              0.95,
            )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          },
        }}
      >
        <Box sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box
            sx={{
              p: 3,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.1,
              )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                تفاصيل الفاتورة
              </Typography>
              <IconButton onClick={() => setViewDrawer(false)} sx={{ color: 'text.secondary' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {selectedInvoice && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 70,
                    height: 70,
                    mr: 3,
                    boxShadow: 3,
                    border: '3px solid white',
                  }}
                >
                  <ReceiptIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                    {selectedInvoice.invoiceNumber}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    العميل: {selectedInvoice.customer.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={selectedInvoice.statusLabel}
                      color={getStatusColor(selectedInvoice.status)}
                      variant="filled"
                      sx={{ fontWeight: 600 }}
                    />
                    {selectedInvoice.priority === 'urgent' && (
                      <Chip label="عاجل" color="error" variant="outlined" />
                    )}
                    {selectedInvoice.recurring && (
                      <Chip label="متكرر" color="info" variant="outlined" />
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {selectedInvoice && (
              <Box sx={{ p: 3 }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  sx={{
                    mb: 3,
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      textTransform: 'none',
                      minHeight: 48,
                    },
                  }}
                >
                  <Tab label="التفاصيل العامة" />
                  <Tab label="البنود والخدمات" />
                  <Tab label="المدفوعات" />
                  <Tab label="التاريخ والأنشطة" />
                </Tabs>

                {/* Tab 1: General Details */}
                {activeTab === 0 && (
                  <Box>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}
                          >
                            <AttachMoneyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            المبالغ المالية
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              المبلغ الأساسي:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {formatCurrency(selectedInvoice.amount)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              الضريبة:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="warning.main">
                              {formatCurrency(selectedInvoice.tax)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              الخصم:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="success.main">
                              {formatCurrency(selectedInvoice.discount)}
                            </Typography>
                          </Box>
                          <Divider sx={{ my: 1 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" color="primary.main" fontWeight="bold">
                              الإجمالي:
                            </Typography>
                            <Typography variant="h6" color="primary.main" fontWeight="bold">
                              {formatCurrency(selectedInvoice.total)}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}
                          >
                            <CalendarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            التواريخ المهمة
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              تاريخ الفاتورة:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {formatDate(selectedInvoice.invoiceDate)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              تاريخ الاستحقاق:
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color={
                                selectedInvoice.status === 'overdue' ? 'error.main' : 'text.primary'
                              }
                            >
                              {formatDate(selectedInvoice.dueDate)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              تاريخ الدفع:
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color={
                                selectedInvoice.paymentDate ? 'success.main' : 'text.secondary'
                              }
                            >
                              {selectedInvoice.paymentDate
                                ? formatDate(selectedInvoice.paymentDate)
                                : 'غير مدفوع'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">
                              آخر تعديل:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {formatDate(selectedInvoice.lastModified)}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Card
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}
                          >
                            <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            معلومات العميل
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar
                                  sx={{ width: 50, height: 50, mr: 2, bgcolor: 'primary.main' }}
                                >
                                  {selectedInvoice.customer.name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {selectedInvoice.customer.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {selectedInvoice.customer.company || 'عميل فردي'}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <List dense>
                                <ListItem sx={{ px: 0 }}>
                                  <ListItemIcon>
                                    <EmailIcon color="primary" />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary="البريد الإلكتروني"
                                    secondary={selectedInvoice.customer.email}
                                  />
                                </ListItem>
                                <ListItem sx={{ px: 0 }}>
                                  <ListItemIcon>
                                    <PhoneIcon color="primary" />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary="رقم الهاتف"
                                    secondary={selectedInvoice.customer.phone}
                                  />
                                </ListItem>
                                {selectedInvoice.customer.company && (
                                  <ListItem sx={{ px: 0 }}>
                                    <ListItemIcon>
                                      <BusinessIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="الشركة"
                                      secondary={selectedInvoice.customer.company}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Tab 2: Items */}
                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                      <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      بنود الفاتورة
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>الوصف</TableCell>
                          <TableCell align="center">الكمية</TableCell>
                          <TableCell align="right">سعر الوحدة</TableCell>
                          <TableCell align="right">الإجمالي</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedInvoice.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Typography variant="body2" fontWeight="bold">
                                {item.description}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={item.quantity}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight="bold">
                                {formatCurrency(item.unitPrice)}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight="bold" color="primary.main">
                                {formatCurrency(item.total)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                )}

                {/* Tab 3: Payments */}
                {activeTab === 2 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                      <PaymentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      تاريخ المدفوعات
                    </Typography>
                    {selectedInvoice.paymentHistory.length > 0 ? (
                      <List>
                        {selectedInvoice.paymentHistory.map((payment) => (
                          <ListItem
                            key={payment.id}
                            sx={{
                              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                              borderRadius: 2,
                              mb: 1,
                            }}
                          >
                            <ListItemIcon>
                              <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText
                              primary={`دفعة بقيمة ${formatCurrency(payment.amount)}`}
                              secondary={`${formatDate(payment.date)} - ${payment.method} - ${
                                payment.reference
                              }`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Alert severity="info">لا توجد مدفوعات مسجلة</Alert>
                    )}
                  </Box>
                )}

                {/* Tab 4: Timeline */}
                {activeTab === 3 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                      <TimelineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      الجدول الزمني
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <ReceiptIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="تم إنشاء الفاتورة"
                          secondary={`${formatDate(selectedInvoice.invoiceDate)} - بواسطة ${
                            selectedInvoice.createdBy
                          }`}
                        />
                      </ListItem>
                      {selectedInvoice.sentDate && (
                        <ListItem>
                          <ListItemIcon>
                            <SendIcon color="info" />
                          </ListItemIcon>
                          <ListItemText
                            primary="تم إرسال الفاتورة للعميل"
                            secondary={formatDate(selectedInvoice.sentDate)}
                          />
                        </ListItem>
                      )}
                      {selectedInvoice.viewedDate && (
                        <ListItem>
                          <ListItemIcon>
                            <VisibilityIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText
                            primary="تم عرض الفاتورة من قبل العميل"
                            secondary={formatDate(selectedInvoice.viewedDate)}
                          />
                        </ListItem>
                      )}
                      {selectedInvoice.paymentDate && (
                        <ListItem>
                          <ListItemIcon>
                            <PaymentIcon color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary="تم تسجيل الدفع"
                            secondary={`${formatDate(selectedInvoice.paymentDate)} - ${
                              selectedInvoice.paymentMethodLabel
                            }`}
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {/* Footer Actions */}
          <Box
            sx={{
              p: 3,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
            }}
          >
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              >
                طباعة
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              >
                تصدير
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => {
                  setViewDrawer(false);
                  handleEdit(selectedInvoice);
                }}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              >
                تعديل
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Column Visibility Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: { minWidth: 200, p: 1 },
        }}
      >
        <Typography variant="subtitle2" sx={{ p: 1, fontWeight: 600, color: 'primary.main' }}>
          إظهار/إخفاء الأعمدة
        </Typography>
        <Divider sx={{ my: 1 }} />
        {Object.entries(columnVisibility).map(([column, visible]) => (
          <MenuItem key={column} onClick={() => handleColumnToggle(column)}>
            <Checkbox checked={visible} size="small" />
            <ListItemText
              primary={
                column === 'invoiceNumber'
                  ? 'رقم الفاتورة'
                  : column === 'customer'
                  ? 'العميل'
                  : column === 'amount'
                  ? 'المبلغ'
                  : column === 'status'
                  ? 'الحالة'
                  : column === 'invoiceDate'
                  ? 'تاريخ الفاتورة'
                  : column === 'dueDate'
                  ? 'تاريخ الاستحقاق'
                  : column === 'paymentDate'
                  ? 'تاريخ الدفع'
                  : column === 'paymentMethod'
                  ? 'طريقة الدفع'
                  : column === 'tax'
                  ? 'الضريبة'
                  : column === 'discount'
                  ? 'الخصم'
                  : column === 'total'
                  ? 'الإجمالي'
                  : column === 'notes'
                  ? 'الملاحظات'
                  : column === 'createdBy'
                  ? 'أنشأ بواسطة'
                  : column === 'lastModified'
                  ? 'آخر تعديل'
                  : column
              }
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default CustomerInvoices;
