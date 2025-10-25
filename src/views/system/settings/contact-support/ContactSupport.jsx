import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  FormControl,
  InputLabel,
  LinearProgress,
  Skeleton,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Stack,
  Avatar,
  Checkbox,
  TableSortLabel,
  Menu,
  ListItemText,
  Drawer,
  List,
  ListItem,
} from '@mui/material';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Save as SaveIcon,
  Home as HomeIcon,
  CheckCircleOutline as CheckIcon,
  Download as DownloadIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  ContactSupport as ContactSupportIcon,
} from '@mui/icons-material';

const ContactSupport = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for support tickets
  const ticketsData = [
    {
      id: 1,
      ticketNumber: 'SUP-2024-001',
      subject: 'مشكلة في تسجيل الدخول',
      description: 'لا أستطيع تسجيل الدخول إلى النظام رغم صحة البيانات',
      category: 'technical',
      priority: 'high',
      status: 'open',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      assignedTo: 'فريق الدعم الفني',
      createdDate: '2024-01-01',
      lastUpdated: '2024-01-15',
      resolutionDate: null,
      attachments: [{ name: 'screenshot.png', type: 'image', size: '1.2 MB' }],
      messages: [
        {
          id: 1,
          sender: 'أحمد محمد',
          content: 'مرحباً، لا أستطيع تسجيل الدخول إلى النظام',
          timestamp: '2024-01-01T10:00:00Z',
          isFromCustomer: true,
        },
        {
          id: 2,
          sender: 'فريق الدعم الفني',
          content: 'مرحباً أحمد، سنقوم بفحص المشكلة وإرجاع الرد قريباً',
          timestamp: '2024-01-01T10:30:00Z',
          isFromCustomer: false,
        },
      ],
      tags: ['تسجيل دخول', 'مشكلة تقنية'],
      satisfaction: null,
      notes: 'مشكلة في قاعدة البيانات',
    },
    {
      id: 2,
      ticketNumber: 'SUP-2024-002',
      subject: 'طلب إضافة ميزة جديدة',
      description: 'نريد إضافة ميزة تتبع الطلبات في الوقت الفعلي',
      category: 'feature',
      priority: 'medium',
      status: 'in_progress',
      customerName: 'سارة أحمد',
      customerEmail: 'sara@example.com',
      customerPhone: '+966501234568',
      assignedTo: 'فريق التطوير',
      createdDate: '2024-01-02',
      lastUpdated: '2024-01-16',
      resolutionDate: null,
      attachments: [],
      messages: [
        {
          id: 3,
          sender: 'سارة أحمد',
          content: 'مرحباً، نريد إضافة ميزة تتبع الطلبات',
          timestamp: '2024-01-02T09:00:00Z',
          isFromCustomer: true,
        },
        {
          id: 4,
          sender: 'فريق التطوير',
          content: 'شكراً لطلبك، سنقوم بدراسة الميزة وإضافتها في التحديث القادم',
          timestamp: '2024-01-02T11:00:00Z',
          isFromCustomer: false,
        },
      ],
      tags: ['ميزة جديدة', 'تطوير'],
      satisfaction: null,
      notes: 'مطلوب في التحديث القادم',
    },
    {
      id: 3,
      ticketNumber: 'SUP-2024-003',
      subject: 'مشكلة في الفواتير',
      description: 'الفواتير لا تظهر بشكل صحيح في النظام',
      category: 'billing',
      priority: 'high',
      status: 'resolved',
      customerName: 'محمد علي',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+966501234569',
      assignedTo: 'فريق المحاسبة',
      createdDate: '2024-01-03',
      lastUpdated: '2024-01-17',
      resolutionDate: '2024-01-17',
      attachments: [{ name: 'invoice_error.pdf', type: 'pdf', size: '2.1 MB' }],
      messages: [
        {
          id: 5,
          sender: 'محمد علي',
          content: 'مرحباً، الفواتير لا تظهر بشكل صحيح',
          timestamp: '2024-01-03T14:00:00Z',
          isFromCustomer: true,
        },
        {
          id: 6,
          sender: 'فريق المحاسبة',
          content: 'تم حل المشكلة، يمكنك الآن عرض الفواتير بشكل صحيح',
          timestamp: '2024-01-17T16:00:00Z',
          isFromCustomer: false,
        },
      ],
      tags: ['فواتير', 'مشكلة'],
      satisfaction: 5,
      notes: 'تم حل المشكلة بنجاح',
    },
    {
      id: 4,
      ticketNumber: 'SUP-2024-004',
      subject: 'طلب تدريب للموظفين',
      description: 'نريد تدريب الموظفين على استخدام النظام الجديد',
      category: 'training',
      priority: 'low',
      status: 'open',
      customerName: 'فاطمة محمد',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966501234570',
      assignedTo: 'فريق التدريب',
      createdDate: '2024-01-04',
      lastUpdated: '2024-01-18',
      resolutionDate: null,
      attachments: [],
      messages: [
        {
          id: 7,
          sender: 'فاطمة محمد',
          content: 'مرحباً، نريد تدريب الموظفين على النظام',
          timestamp: '2024-01-04T08:00:00Z',
          isFromCustomer: true,
        },
      ],
      tags: ['تدريب', 'موظفين'],
      satisfaction: null,
      notes: 'مطلوب جدولة جلسة تدريب',
    },
    {
      id: 5,
      ticketNumber: 'SUP-2024-005',
      subject: 'مشكلة في التقارير',
      description: 'التقارير لا تعمل بشكل صحيح',
      category: 'technical',
      priority: 'medium',
      status: 'in_progress',
      customerName: 'خالد أحمد',
      customerEmail: 'khalid@example.com',
      customerPhone: '+966501234571',
      assignedTo: 'فريق الدعم الفني',
      createdDate: '2024-01-05',
      lastUpdated: '2024-01-19',
      resolutionDate: null,
      attachments: [{ name: 'report_error.xlsx', type: 'excel', size: '1.5 MB' }],
      messages: [
        {
          id: 8,
          sender: 'خالد أحمد',
          content: 'مرحباً، التقارير لا تعمل بشكل صحيح',
          timestamp: '2024-01-05T12:00:00Z',
          isFromCustomer: true,
        },
        {
          id: 9,
          sender: 'فريق الدعم الفني',
          content: 'نحن نعمل على حل المشكلة، سنقوم بإرجاع الرد قريباً',
          timestamp: '2024-01-05T13:00:00Z',
          isFromCustomer: false,
        },
      ],
      tags: ['تقارير', 'مشكلة تقنية'],
      satisfaction: null,
      notes: 'مشكلة في قاعدة البيانات',
    },
    {
      id: 6,
      ticketNumber: 'SUP-2024-006',
      subject: 'طلب دعم فني متقدم',
      description: 'نحتاج دعم فني متقدم لتخصيص النظام',
      category: 'technical',
      priority: 'high',
      status: 'open',
      customerName: 'نورا محمد',
      customerEmail: 'nora@example.com',
      customerPhone: '+966501234572',
      assignedTo: 'فريق التطوير المتقدم',
      createdDate: '2024-01-06',
      lastUpdated: '2024-01-20',
      resolutionDate: null,
      attachments: [],
      messages: [
        {
          id: 10,
          sender: 'نورا محمد',
          content: 'مرحباً، نحتاج دعم فني متقدم',
          timestamp: '2024-01-06T15:00:00Z',
          isFromCustomer: true,
        },
      ],
      tags: ['دعم متقدم', 'تخصيص'],
      satisfaction: null,
      notes: 'مطلوب فريق متخصص',
    },
    {
      id: 7,
      ticketNumber: 'SUP-2024-007',
      subject: 'مشكلة في الشحن',
      description: 'لا يمكن تحديث حالة الشحن في النظام',
      category: 'shipping',
      priority: 'medium',
      status: 'resolved',
      customerName: 'عبدالله علي',
      customerEmail: 'abdullah@example.com',
      customerPhone: '+966501234573',
      assignedTo: 'فريق العمليات',
      createdDate: '2024-01-07',
      lastUpdated: '2024-01-21',
      resolutionDate: '2024-01-21',
      attachments: [],
      messages: [
        {
          id: 11,
          sender: 'عبدالله علي',
          content: 'مرحباً، لا يمكن تحديث حالة الشحن',
          timestamp: '2024-01-07T10:00:00Z',
          isFromCustomer: true,
        },
        {
          id: 12,
          sender: 'فريق العمليات',
          content: 'تم حل المشكلة، يمكنك الآن تحديث حالة الشحن',
          timestamp: '2024-01-21T14:00:00Z',
          isFromCustomer: false,
        },
      ],
      tags: ['شحن', 'مشكلة'],
      satisfaction: 4,
      notes: 'تم حل المشكلة بنجاح',
    },
    {
      id: 8,
      ticketNumber: 'SUP-2024-008',
      subject: 'طلب إضافة مستخدم جديد',
      description: 'نريد إضافة مستخدم جديد إلى النظام',
      category: 'user_management',
      priority: 'low',
      status: 'open',
      customerName: 'ريم أحمد',
      customerEmail: 'reem@example.com',
      customerPhone: '+966501234574',
      assignedTo: 'فريق إدارة المستخدمين',
      createdDate: '2024-01-08',
      lastUpdated: '2024-01-22',
      resolutionDate: null,
      attachments: [],
      messages: [
        {
          id: 13,
          sender: 'ريم أحمد',
          content: 'مرحباً، نريد إضافة مستخدم جديد',
          timestamp: '2024-01-08T11:00:00Z',
          isFromCustomer: true,
        },
      ],
      tags: ['مستخدمين', 'إضافة'],
      satisfaction: null,
      notes: 'مطلوب تفعيل الحساب',
    },
    {
      id: 9,
      ticketNumber: 'SUP-2024-009',
      subject: 'مشكلة في الأمان',
      description: 'نريد تحسين إعدادات الأمان في النظام',
      category: 'security',
      priority: 'high',
      status: 'in_progress',
      customerName: 'سعد محمد',
      customerEmail: 'saad@example.com',
      customerPhone: '+966501234575',
      assignedTo: 'فريق الأمان',
      createdDate: '2024-01-09',
      lastUpdated: '2024-01-23',
      resolutionDate: null,
      attachments: [],
      messages: [
        {
          id: 14,
          sender: 'سعد محمد',
          content: 'مرحباً، نريد تحسين إعدادات الأمان',
          timestamp: '2024-01-09T16:00:00Z',
          isFromCustomer: true,
        },
        {
          id: 15,
          sender: 'فريق الأمان',
          content: 'سنقوم بمراجعة إعدادات الأمان وتطبيق التحسينات المطلوبة',
          timestamp: '2024-01-09T17:00:00Z',
          isFromCustomer: false,
        },
      ],
      tags: ['أمان', 'تحسين'],
      satisfaction: null,
      notes: 'مطلوب مراجعة شاملة',
    },
    {
      id: 10,
      ticketNumber: 'SUP-2024-010',
      subject: 'مشكلة في النسخ الاحتياطي',
      description: 'النسخ الاحتياطي لا يعمل بشكل صحيح',
      category: 'technical',
      priority: 'high',
      status: 'resolved',
      customerName: 'منى علي',
      customerEmail: 'mona@example.com',
      customerPhone: '+966501234576',
      assignedTo: 'فريق الدعم الفني',
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-24',
      resolutionDate: '2024-01-24',
      attachments: [{ name: 'backup_log.txt', type: 'text', size: '0.5 MB' }],
      messages: [
        {
          id: 16,
          sender: 'منى علي',
          content: 'مرحباً، النسخ الاحتياطي لا يعمل',
          timestamp: '2024-01-10T09:00:00Z',
          isFromCustomer: true,
        },
        {
          id: 17,
          sender: 'فريق الدعم الفني',
          content: 'تم حل المشكلة، النسخ الاحتياطي يعمل الآن بشكل صحيح',
          timestamp: '2024-01-24T15:00:00Z',
          isFromCustomer: false,
        },
      ],
      tags: ['نسخ احتياطي', 'مشكلة تقنية'],
      satisfaction: 5,
      notes: 'تم حل المشكلة بنجاح',
    },
  ];

  const ticketStatuses = [
    { value: 'open', label: 'مفتوح', color: 'error' },
    { value: 'in_progress', label: 'قيد المعالجة', color: 'warning' },
    { value: 'resolved', label: 'تم الحل', color: 'success' },
    { value: 'closed', label: 'مغلق', color: 'info' },
  ];

  const ticketCategories = [
    { value: 'technical', label: 'تقني', color: 'primary' },
    { value: 'feature', label: 'ميزة جديدة', color: 'success' },
    { value: 'billing', label: 'فوترة', color: 'warning' },
    { value: 'training', label: 'تدريب', color: 'info' },
    { value: 'shipping', label: 'شحن', color: 'error' },
    { value: 'user_management', label: 'إدارة المستخدمين', color: 'secondary' },
    { value: 'security', label: 'أمان', color: 'error' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'منخفض', color: 'success' },
    { value: 'medium', label: 'متوسط', color: 'warning' },
    { value: 'high', label: 'عالي', color: 'error' },
  ];

  const satisfactionLevels = [
    { value: 1, label: 'مستاء جداً', color: 'error' },
    { value: 2, label: 'مستاء', color: 'error' },
    { value: 3, label: 'محايد', color: 'warning' },
    { value: 4, label: 'راضي', color: 'success' },
    { value: 5, label: 'راضي جداً', color: 'success' },
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

  const handleBulkAction = (action) => {
    notify(`${action} التذاكر`, `${selectedItems.length} تذكرة`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (ticket) => {
    setSelectedTicket(ticket);
    setOpenViewDialog(true);
  };

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setOpenDialog(true);
  };

  const handleDelete = (ticket) => {
    setSelectedTicket(ticket);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث التذكرة', selectedTicket ? 'تم تحديث التذكرة' : 'تم إضافة التذكرة');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف التذكرة', 'تم حذف التذكرة');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير التذاكر', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = ticketsData.filter((item) => {
    const matchesSearch =
      item.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedData = [...filteredData].sort((a, b) => {
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

  const getStatusColor = (status) => {
    const statusInfo = ticketStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = ticketStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getCategoryColor = (category) => {
    const categoryInfo = ticketCategories.find((c) => c.value === category);
    return categoryInfo ? categoryInfo.color : 'default';
  };

  const getCategoryLabel = (category) => {
    const categoryInfo = ticketCategories.find((c) => c.value === category);
    return categoryInfo ? categoryInfo.label : category;
  };

  const getPriorityColor = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.color : 'default';
  };

  const getPriorityLabel = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.label : priority;
  };

  const getSatisfactionColor = (satisfaction) => {
    if (satisfaction === null) return 'default';
    const satisfactionInfo = satisfactionLevels.find((s) => s.value === satisfaction);
    return satisfactionInfo ? satisfactionInfo.color : 'default';
  };

  const getSatisfactionLabel = (satisfaction) => {
    if (satisfaction === null) return 'غير محدد';
    const satisfactionInfo = satisfactionLevels.find((s) => s.value === satisfaction);
    return satisfactionInfo ? satisfactionInfo.label : satisfaction;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const getDensityProps = () => {
    switch (density) {
      case 'compact':
        return { size: 'small' };
      case 'comfortable':
        return { size: 'medium' };
      default:
        return { size: 'small' };
    }
  };

  const totalTickets = ticketsData.length;
  const openTickets = ticketsData.filter((ticket) => ticket.status === 'open').length;
  const inProgressTickets = ticketsData.filter((ticket) => ticket.status === 'in_progress').length;
  const resolvedTickets = ticketsData.filter((ticket) => ticket.status === 'resolved').length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          اتصل بالدعم
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة تذاكر الدعم والمساعدة مع إمكانية التتبع والمراقبة.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/settings">
            الإعدادات
          </Link>
          <Typography color="text.primary">اتصل بالدعم</Typography>
        </Breadcrumbs>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background:
                'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
              border: '1px solid rgba(25, 118, 210, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(25, 118, 210, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: 2 }}>
                  <ContactSupportIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalTickets}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي التذاكر
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background:
                'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)',
              border: '1px solid rgba(244, 67, 54, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(244, 67, 54, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'error.main', width: 48, height: 48, mr: 2 }}>
                  <WarningIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {openTickets}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مفتوحة
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background:
                'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(255, 152, 0, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, mr: 2 }}>
                  <PendingIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {inProgressTickets}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                قيد المعالجة
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background:
                'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
              border: '1px solid rgba(76, 175, 80, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, mr: 2 }}>
                  <CheckIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {resolvedTickets}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                تم الحل
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="البحث في التذاكر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
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
                  {ticketStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الأولوية</InputLabel>
                <Select
                  value={priorityFilter}
                  label="الأولوية"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الأولويات</MenuItem>
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </MenuItem>
                  ))}
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
                  setPriorityFilter('all');
                }}
                fullWidth
              >
                إعادة تعيين
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                تم العثور على {filteredData.length}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            قائمة تذاكر الدعم
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تحديث الحالة')} sx={{ mr: 1 }}>
                تحديث الحالة ({selectedItems.length})
              </Button>
              <Button size="small" color="error" onClick={() => handleBulkAction('حذف')}>
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Tooltip title="تصدير CSV">
            <IconButton onClick={handleExport} sx={{ mr: 1 }}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة تذكرة
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={60} sx={{ mb: 1 }} />
            ))}
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error">خطأ في تحميل التذاكر. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على تذاكر. أضف أول تذكرة.</Alert>
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
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'ticketNumber'}
                      direction={sortBy === 'ticketNumber' ? sortOrder : 'asc'}
                      onClick={() => handleSort('ticketNumber')}
                    >
                      رقم التذكرة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'subject'}
                      direction={sortBy === 'subject' ? sortOrder : 'asc'}
                      onClick={() => handleSort('subject')}
                    >
                      الموضوع
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'category'}
                      direction={sortBy === 'category' ? sortOrder : 'asc'}
                      onClick={() => handleSort('category')}
                    >
                      التصنيف
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'priority'}
                      direction={sortBy === 'priority' ? sortOrder : 'asc'}
                      onClick={() => handleSort('priority')}
                    >
                      الأولوية
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'status'}
                      direction={sortBy === 'status' ? sortOrder : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      الحالة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'customerName'}
                      direction={sortBy === 'customerName' ? sortOrder : 'asc'}
                      onClick={() => handleSort('customerName')}
                    >
                      العميل
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
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontFamily: 'monospace' }}
                        >
                          {item.ticketNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            {item.subject}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block' }}
                          >
                            {item.description.substring(0, 100)}...
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getCategoryLabel(item.category)}
                          size="small"
                          color={getCategoryColor(item.category)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getPriorityLabel(item.priority)}
                          size="small"
                          color={getPriorityColor(item.priority)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.customerName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.customerEmail}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التذكرة" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل التذكرة" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف التذكرة" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
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
        <DialogTitle>{selectedTicket ? 'تعديل التذكرة' : 'إضافة تذكرة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم التذكرة"
                placeholder="SUP-2024-001"
                defaultValue={selectedTicket?.ticketNumber || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الموضوع"
                placeholder="أدخل موضوع التذكرة"
                defaultValue={selectedTicket?.subject || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                placeholder="أدخل وصف التذكرة"
                defaultValue={selectedTicket?.description || ''}
                required
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>التصنيف</InputLabel>
                <Select label="التصنيف" defaultValue={selectedTicket?.category || 'technical'}>
                  {ticketCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية" defaultValue={selectedTicket?.priority || 'medium'}>
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedTicket?.status || 'open'}>
                  {ticketStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم العميل"
                placeholder="أدخل اسم العميل"
                defaultValue={selectedTicket?.customerName || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="بريد العميل الإلكتروني"
                placeholder="customer@example.com"
                defaultValue={selectedTicket?.customerEmail || ''}
                required
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="هاتف العميل"
                placeholder="+966501234567"
                defaultValue={selectedTicket?.customerPhone || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المسؤول"
                placeholder="فريق الدعم الفني"
                defaultValue={selectedTicket?.assignedTo || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="العلامات"
                placeholder="مشكلة، تقني، عاجل"
                defaultValue={selectedTicket?.tags?.join(', ') || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الملاحظات"
                placeholder="أدخل الملاحظات"
                defaultValue={selectedTicket?.notes || ''}
                multiline
                rows={2}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف التذكرة</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذه التذكرة؟
          </Typography>
          {selectedTicket && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedTicket.ticketNumber}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedTicket.subject} - {selectedTicket.customerName}
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

      {/* View Drawer */}
      <Drawer
        anchor="right"
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        sx={{ '& .MuiDrawer-paper': { width: 600 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل التذكرة
          </Typography>
          {selectedTicket && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <ContactSupportIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedTicket.ticketNumber}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTicket.subject}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="رقم التذكرة" secondary={selectedTicket.ticketNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموضوع" secondary={selectedTicket.subject} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الوصف" secondary={selectedTicket.description} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="التصنيف"
                    secondary={getCategoryLabel(selectedTicket.category)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedTicket.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedTicket.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="اسم العميل" secondary={selectedTicket.customerName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="بريد العميل" secondary={selectedTicket.customerEmail} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="هاتف العميل" secondary={selectedTicket.customerPhone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المسؤول" secondary={selectedTicket.assignedTo} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الإنشاء"
                    secondary={formatDate(selectedTicket.createdDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="آخر تحديث"
                    secondary={formatDate(selectedTicket.lastUpdated)}
                  />
                </ListItem>
                {selectedTicket.resolutionDate && (
                  <ListItem>
                    <ListItemText
                      primary="تاريخ الحل"
                      secondary={formatDate(selectedTicket.resolutionDate)}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="الرضا"
                    secondary={getSatisfactionLabel(selectedTicket.satisfaction)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العلامات" secondary={selectedTicket.tags.join(', ')} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الملاحظات" secondary={selectedTicket.notes} />
                </ListItem>
              </List>
              {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    المرفقات
                  </Typography>
                  <List dense>
                    {selectedTicket.attachments.map((attachment, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={attachment.name}
                          secondary={`${attachment.type} - ${attachment.size}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              {selectedTicket.messages && selectedTicket.messages.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    المحادثة
                  </Typography>
                  <List dense>
                    {selectedTicket.messages.map((message) => (
                      <ListItem key={message.id}>
                        <ListItemText primary={message.sender} secondary={message.content} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Box>
          )}
        </Box>
      </Drawer>

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

export default ContactSupport;
