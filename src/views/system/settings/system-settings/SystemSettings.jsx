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
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Stack,
  Avatar,
  Checkbox,
  TableSortLabel,
  LinearProgress,
  Skeleton,
  ListItemText,
  Switch,
  FormControlLabel,
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
  Assignment as AssignmentIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const SystemSettings = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for system settings
  const settingsData = [
    {
      id: 1,
      name: 'اسم النظام',
      key: 'system.name',
      value: 'كونتينر',
      type: 'text',
      category: 'general',
      status: 'active',
      description: 'اسم النظام المعروض في الواجهة',
      isRequired: true,
      isEditable: true,
      defaultValue: 'كونتينر',
      validation: 'required|string|max:100',
      helpText: 'اسم النظام الذي سيظهر في جميع صفحات النظام',
      group: 'عام',
      priority: 'high',
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-15',
      lastModifiedBy: 'أحمد محمد',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['عام', 'اسم', 'نظام'],
      notes: 'إعداد أساسي للنظام',
    },
    {
      id: 2,
      name: 'لغة النظام الافتراضية',
      key: 'system.language',
      value: 'ar',
      type: 'select',
      category: 'general',
      status: 'active',
      description: 'اللغة الافتراضية للنظام',
      isRequired: true,
      isEditable: true,
      defaultValue: 'ar',
      validation: 'required|in:ar,en,fr',
      helpText: 'اللغة التي سيتم عرض النظام بها افتراضياً',
      group: 'عام',
      priority: 'high',
      options: [
        { value: 'ar', label: 'العربية' },
        { value: 'en', label: 'الإنجليزية' },
        { value: 'fr', label: 'الفرنسية' },
      ],
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-10',
      lastModifiedBy: 'سارة أحمد',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['عام', 'لغة', 'افتراضي'],
      notes: 'إعداد مهم للواجهة',
    },
    {
      id: 3,
      name: 'المنطقة الزمنية',
      key: 'system.timezone',
      value: 'Asia/Riyadh',
      type: 'select',
      category: 'general',
      status: 'active',
      description: 'المنطقة الزمنية للنظام',
      isRequired: true,
      isEditable: true,
      defaultValue: 'Asia/Riyadh',
      validation: 'required|string',
      helpText: 'المنطقة الزمنية المستخدمة في النظام',
      group: 'عام',
      priority: 'medium',
      options: [
        { value: 'Asia/Riyadh', label: 'الرياض' },
        { value: 'Asia/Dubai', label: 'دبي' },
        { value: 'Europe/London', label: 'لندن' },
        { value: 'America/New_York', label: 'نيويورك' },
      ],
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-05',
      lastModifiedBy: 'محمد علي',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['عام', 'زمن', 'منطقة'],
      notes: 'إعداد مهم للتوقيت',
    },
    {
      id: 4,
      name: 'العملة الافتراضية',
      key: 'system.currency',
      value: 'SAR',
      type: 'select',
      category: 'financial',
      status: 'active',
      description: 'العملة الافتراضية للنظام',
      isRequired: true,
      isEditable: true,
      defaultValue: 'SAR',
      validation: 'required|in:SAR,USD,EUR,GBP',
      helpText: 'العملة التي سيتم عرض المبالغ بها افتراضياً',
      group: 'مالي',
      priority: 'high',
      options: [
        { value: 'SAR', label: 'ريال سعودي' },
        { value: 'USD', label: 'دولار أمريكي' },
        { value: 'EUR', label: 'يورو' },
        { value: 'GBP', label: 'جنيه إسترليني' },
      ],
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-08',
      lastModifiedBy: 'فاطمة محمد',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['مالي', 'عملة', 'افتراضي'],
      notes: 'إعداد مالي مهم',
    },
    {
      id: 5,
      name: 'معدل الضريبة الافتراضي',
      key: 'system.tax_rate',
      value: '15',
      type: 'number',
      category: 'financial',
      status: 'active',
      description: 'معدل الضريبة الافتراضي للنظام',
      isRequired: true,
      isEditable: true,
      defaultValue: '15',
      validation: 'required|numeric|min:0|max:100',
      helpText: 'معدل الضريبة الذي سيتم تطبيقه افتراضياً',
      group: 'مالي',
      priority: 'high',
      unit: '%',
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-12',
      lastModifiedBy: 'خالد أحمد',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['مالي', 'ضريبة', 'معدل'],
      notes: 'إعداد ضريبي مهم',
    },
    {
      id: 6,
      name: 'حد الطلب الأدنى',
      key: 'system.min_order_amount',
      value: '100',
      type: 'number',
      category: 'orders',
      status: 'active',
      description: 'الحد الأدنى لمبلغ الطلب',
      isRequired: true,
      isEditable: true,
      defaultValue: '100',
      validation: 'required|numeric|min:0',
      helpText: 'الحد الأدنى لمبلغ الطلب الذي يمكن قبوله',
      group: 'طلبات',
      priority: 'medium',
      unit: 'ريال',
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-18',
      lastModifiedBy: 'نورا محمد',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['طلبات', 'حد', 'أدنى'],
      notes: 'إعداد مهم للطلبات',
    },
    {
      id: 7,
      name: 'رسوم الشحن الافتراضية',
      key: 'system.shipping_fee',
      value: '50',
      type: 'number',
      category: 'shipping',
      status: 'active',
      description: 'رسوم الشحن الافتراضية',
      isRequired: true,
      isEditable: true,
      defaultValue: '50',
      validation: 'required|numeric|min:0',
      helpText: 'رسوم الشحن التي سيتم تطبيقها افتراضياً',
      group: 'شحن',
      priority: 'medium',
      unit: 'ريال',
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-20',
      lastModifiedBy: 'أحمد علي',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['شحن', 'رسوم', 'افتراضي'],
      notes: 'إعداد مهم للشحن',
    },
    {
      id: 8,
      name: 'مدة الصلاحية للجلسة',
      key: 'system.session_timeout',
      value: '30',
      type: 'number',
      category: 'security',
      status: 'active',
      description: 'مدة الصلاحية للجلسة بالدقائق',
      isRequired: true,
      isEditable: true,
      defaultValue: '30',
      validation: 'required|numeric|min:5|max:480',
      helpText: 'مدة الصلاحية للجلسة قبل انتهائها تلقائياً',
      group: 'أمان',
      priority: 'high',
      unit: 'دقيقة',
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-25',
      lastModifiedBy: 'سارة أحمد',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['أمان', 'جلسة', 'صلاحية'],
      notes: 'إعداد أمني مهم',
    },
    {
      id: 9,
      name: 'تفعيل المصادقة الثنائية',
      key: 'system.two_factor_auth',
      value: 'true',
      type: 'boolean',
      category: 'security',
      status: 'active',
      description: 'تفعيل المصادقة الثنائية للمستخدمين',
      isRequired: false,
      isEditable: true,
      defaultValue: 'false',
      validation: 'boolean',
      helpText: 'تفعيل المصادقة الثنائية لزيادة الأمان',
      group: 'أمان',
      priority: 'high',
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-01-30',
      lastModifiedBy: 'محمد عبدالله',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['أمان', 'مصادقة', 'ثنائية'],
      notes: 'إعداد أمني متقدم',
    },
    {
      id: 10,
      name: 'حد المحاولات للدخول',
      key: 'system.login_attempts_limit',
      value: '5',
      type: 'number',
      category: 'security',
      status: 'active',
      description: 'حد المحاولات المسموح للدخول',
      isRequired: true,
      isEditable: true,
      defaultValue: '5',
      validation: 'required|numeric|min:3|max:10',
      helpText: 'عدد المحاولات المسموح قبل قفل الحساب',
      group: 'أمان',
      priority: 'high',
      unit: 'محاولة',
      createdBy: 'مدير النظام',
      createdDate: '2024-01-01',
      lastModified: '2024-02-01',
      lastModifiedBy: 'فاطمة أحمد',
      language: 'ar',
      isPublished: true,
      publishDate: '2024-01-01',
      expiryDate: null,
      tags: ['أمان', 'دخول', 'حد'],
      notes: 'إعداد أمني مهم',
    },
  ];

  const settingStatuses = [
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'inactive', label: 'غير نشط', color: 'error' },
    { value: 'maintenance', label: 'صيانة', color: 'warning' },
    { value: 'deprecated', label: 'مهجور', color: 'info' },
  ];

  const settingCategories = [
    { value: 'general', label: 'عام', color: 'primary' },
    { value: 'financial', label: 'مالي', color: 'success' },
    { value: 'orders', label: 'طلبات', color: 'info' },
    { value: 'shipping', label: 'شحن', color: 'warning' },
    { value: 'security', label: 'أمان', color: 'error' },
    { value: 'notifications', label: 'إشعارات', color: 'secondary' },
  ];

  const settingTypes = [
    { value: 'text', label: 'نص', color: 'primary' },
    { value: 'number', label: 'رقم', color: 'info' },
    { value: 'boolean', label: 'منطقي', color: 'success' },
    { value: 'select', label: 'قائمة', color: 'warning' },
    { value: 'email', label: 'بريد إلكتروني', color: 'error' },
    { value: 'url', label: 'رابط', color: 'secondary' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'منخفض', color: 'success' },
    { value: 'medium', label: 'متوسط', color: 'warning' },
    { value: 'high', label: 'عالي', color: 'error' },
  ];

  const languages = [
    { value: 'ar', label: 'العربية', color: 'primary' },
    { value: 'en', label: 'الإنجليزية', color: 'info' },
    { value: 'fr', label: 'الفرنسية', color: 'success' },
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
    notify(`${action} الإعدادات`, `${selectedItems.length} إعداد`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (setting) => {
    setSelectedSetting(setting);
    setOpenViewDialog(true);
  };

  const handleEdit = (setting) => {
    setSelectedSetting(setting);
    setOpenDialog(true);
  };

  const handleDelete = (setting) => {
    setSelectedSetting(setting);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الإعداد', selectedSetting ? 'تم تحديث الإعداد' : 'تم إضافة الإعداد');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الإعداد', 'تم حذف الإعداد');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الإعدادات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = settingsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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
    const statusInfo = settingStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = settingStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getCategoryColor = (category) => {
    const categoryInfo = settingCategories.find((c) => c.value === category);
    return categoryInfo ? categoryInfo.color : 'default';
  };

  const getCategoryLabel = (category) => {
    const categoryInfo = settingCategories.find((c) => c.value === category);
    return categoryInfo ? categoryInfo.label : category;
  };

  const getTypeColor = (type) => {
    const typeInfo = settingTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.color : 'default';
  };

  const getTypeLabel = (type) => {
    const typeInfo = settingTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

  const getPriorityColor = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.color : 'default';
  };

  const getPriorityLabel = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.label : priority;
  };

  const getLanguageColor = (language) => {
    const languageInfo = languages.find((l) => l.value === language);
    return languageInfo ? languageInfo.color : 'default';
  };

  const getLanguageLabel = (language) => {
    const languageInfo = languages.find((l) => l.value === language);
    return languageInfo ? languageInfo.label : language;
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

  const totalSettings = settingsData.length;
  const activeSettings = settingsData.filter((setting) => setting.status === 'active').length;
  const requiredSettings = settingsData.filter((setting) => setting.isRequired).length;
  const editableSettings = settingsData.filter((setting) => setting.isEditable).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إعدادات النظام
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة إعدادات النظام العامة والمالية والأمنية مع إمكانية التعديل والمراقبة.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/settings">
            الإعدادات
          </Link>
          <Typography color="text.primary">إعدادات النظام</Typography>
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
                  <AssignmentIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalSettings}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الإعدادات
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
                {activeSettings}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                نشطة
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
                  <WarningIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {requiredSettings}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مطلوبة
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
                  <EditIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {editableSettings}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                قابلة للتعديل
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
                placeholder="البحث في الإعدادات..."
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
                  {settingStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>التصنيف</InputLabel>
                <Select
                  value={categoryFilter}
                  label="التصنيف"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع التصنيفات</MenuItem>
                  {settingCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
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
                  setCategoryFilter('all');
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
            قائمة إعدادات النظام
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
            إضافة إعداد
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
            <Alert severity="error">خطأ في تحميل الإعدادات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على إعدادات. أضف أول إعداد.</Alert>
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
                      active={sortBy === 'name'}
                      direction={sortBy === 'name' ? sortOrder : 'asc'}
                      onClick={() => handleSort('name')}
                    >
                      اسم الإعداد
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'key'}
                      direction={sortBy === 'key' ? sortOrder : 'asc'}
                      onClick={() => handleSort('key')}
                    >
                      المفتاح
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
                      active={sortBy === 'type'}
                      direction={sortBy === 'type' ? sortOrder : 'asc'}
                      onClick={() => handleSort('type')}
                    >
                      النوع
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
                      active={sortBy === 'value'}
                      direction={sortBy === 'value' ? sortOrder : 'asc'}
                      onClick={() => handleSort('value')}
                    >
                      القيمة
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
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            {item.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block' }}
                          >
                            {item.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {item.isRequired && (
                              <Chip label="مطلوب" size="small" color="error" variant="outlined" />
                            )}
                            {item.isEditable && (
                              <Chip
                                label="قابل للتعديل"
                                size="small"
                                color="success"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: 'monospace', fontWeight: 500 }}
                        >
                          {item.key}
                        </Typography>
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
                          label={getTypeLabel(item.type)}
                          size="small"
                          color={getTypeColor(item.type)}
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
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.value}
                          {item.unit && (
                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                              sx={{ ml: 1 }}
                            >
                              {item.unit}
                            </Typography>
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الإعداد" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الإعداد" arrow>
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
        <DialogTitle>{selectedSetting ? 'تعديل الإعداد' : 'إضافة إعداد جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم الإعداد"
                placeholder="أدخل اسم الإعداد"
                defaultValue={selectedSetting?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="مفتاح الإعداد"
                placeholder="system.setting_key"
                defaultValue={selectedSetting?.key || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="وصف الإعداد"
                placeholder="أدخل وصف الإعداد"
                defaultValue={selectedSetting?.description || ''}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>التصنيف</InputLabel>
                <Select label="التصنيف" defaultValue={selectedSetting?.category || 'general'}>
                  {settingCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>النوع</InputLabel>
                <Select label="النوع" defaultValue={selectedSetting?.type || 'text'}>
                  {settingTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedSetting?.status || 'active'}>
                  {settingStatuses.map((status) => (
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
                label="قيمة الإعداد"
                placeholder="أدخل قيمة الإعداد"
                defaultValue={selectedSetting?.value || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="القيمة الافتراضية"
                placeholder="أدخل القيمة الافتراضية"
                defaultValue={selectedSetting?.defaultValue || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="قواعد التحقق"
                placeholder="required|string|max:100"
                defaultValue={selectedSetting?.validation || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="نص المساعدة"
                placeholder="أدخل نص المساعدة"
                defaultValue={selectedSetting?.helpText || ''}
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المجموعة"
                placeholder="أدخل المجموعة"
                defaultValue={selectedSetting?.group || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية" defaultValue={selectedSetting?.priority || 'medium'}>
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
                <InputLabel>اللغة</InputLabel>
                <Select label="اللغة" defaultValue={selectedSetting?.language || 'ar'}>
                  {languages.map((language) => (
                    <MenuItem key={language.value} value={language.value}>
                      {language.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={<Switch defaultChecked={selectedSetting?.isRequired || false} />}
                label="مطلوب"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={<Switch defaultChecked={selectedSetting?.isEditable || false} />}
                label="قابل للتعديل"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={<Switch defaultChecked={selectedSetting?.isPublished || false} />}
                label="منشور"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الوحدة"
                placeholder="ريال، دقيقة، محاولة"
                defaultValue={selectedSetting?.unit || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="العلامات"
                placeholder="عام، اسم، نظام"
                defaultValue={selectedSetting?.tags?.join(', ') || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الملاحظات"
                placeholder="أدخل الملاحظات"
                defaultValue={selectedSetting?.notes || ''}
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
        <DialogTitle>حذف الإعداد</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا الإعداد؟
          </Typography>
          {selectedSetting && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedSetting.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedSetting.key} - {selectedSetting.value}
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
            تفاصيل الإعداد
          </Typography>
          {selectedSetting && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <AssignmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedSetting.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedSetting.key}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم الإعداد" secondary={selectedSetting.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="مفتاح الإعداد" secondary={selectedSetting.key} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الوصف" secondary={selectedSetting.description} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="التصنيف"
                    secondary={getCategoryLabel(selectedSetting.category)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="النوع" secondary={getTypeLabel(selectedSetting.type)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedSetting.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="القيمة" secondary={selectedSetting.value} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="القيمة الافتراضية"
                    secondary={selectedSetting.defaultValue}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="قواعد التحقق" secondary={selectedSetting.validation} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="نص المساعدة" secondary={selectedSetting.helpText} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المجموعة" secondary={selectedSetting.group} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedSetting.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="اللغة"
                    secondary={getLanguageLabel(selectedSetting.language)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="مطلوب"
                    secondary={selectedSetting.isRequired ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="قابل للتعديل"
                    secondary={selectedSetting.isEditable ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="منشور"
                    secondary={selectedSetting.isPublished ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الوحدة" secondary={selectedSetting.unit || 'غير محدد'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العلامات" secondary={selectedSetting.tags.join(', ')} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الملاحظات" secondary={selectedSetting.notes} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تم الإنشاء بواسطة" secondary={selectedSetting.createdBy} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الإنشاء"
                    secondary={formatDate(selectedSetting.createdDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="آخر تعديل"
                    secondary={formatDate(selectedSetting.lastModified)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="آخر تعديل بواسطة"
                    secondary={selectedSetting.lastModifiedBy}
                  />
                </ListItem>
              </List>
              {selectedSetting.options && selectedSetting.options.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    الخيارات المتاحة
                  </Typography>
                  <List dense>
                    {selectedSetting.options.map((option, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={option.label} secondary={option.value} />
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

export default SystemSettings;
