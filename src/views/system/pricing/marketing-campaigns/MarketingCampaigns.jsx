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
  Divider,
  Stack,
  Avatar,
  LinearProgress,
  Checkbox,
  TableSortLabel,
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
  Campaign as CampaignIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircleOutline as CheckIcon,
  Download as DownloadIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

const MarketingCampaigns = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for marketing campaigns
  const campaignsData = [
    {
      id: 1,
      name: 'حملة الربيع 2024',
      type: 'email',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: 50000,
      spent: 25000,
      targetAudience: 'العملاء الحاليين',
      goal: 'زيادة المبيعات بنسبة 25%',
      description: 'حملة تسويقية شاملة للترويج للمنتجات الجديدة في فصل الربيع',
      content: {
        subject: 'اكتشف منتجات الربيع الجديدة',
        body: 'نقدم لك مجموعة رائعة من المنتجات الجديدة المصممة خصيصاً لفصل الربيع...',
        images: ['spring-banner.jpg', 'product-showcase.jpg'],
        cta: 'تسوق الآن',
        ctaUrl: 'https://store.com/spring-sale',
      },
      metrics: {
        sent: 10000,
        delivered: 9500,
        opened: 3800,
        clicked: 950,
        converted: 190,
        revenue: 125000,
        openRate: 40,
        clickRate: 10,
        conversionRate: 5,
      },
      channels: ['email', 'social', 'website'],
      tags: ['ربيع', 'مبيعات', 'منتجات جديدة'],
      createdBy: 'فريق التسويق',
      createdDate: '2024-01-10',
      lastModified: '2024-01-20',
    },
    {
      id: 2,
      name: 'عرض الصيف الكبير',
      type: 'social',
      status: 'completed',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      budget: 75000,
      spent: 72000,
      targetAudience: 'جميع العملاء',
      goal: 'زيادة الوعي بالعلامة التجارية',
      description: 'حملة تسويقية على وسائل التواصل الاجتماعي للترويج لعرض الصيف',
      content: {
        subject: 'عرض الصيف الكبير - خصم حتى 50%',
        body: 'لا تفوت فرصة الحصول على خصم يصل إلى 50% على جميع المنتجات...',
        images: ['summer-sale-banner.jpg', 'discount-badge.jpg'],
        cta: 'احصل على الخصم',
        ctaUrl: 'https://store.com/summer-sale',
      },
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
        revenue: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0,
      },
      channels: ['facebook', 'instagram', 'twitter'],
      tags: ['صيف', 'خصم', 'عرض'],
      createdBy: 'فريق التسويق',
      createdDate: '2023-05-25',
      lastModified: '2023-08-31',
    },
    {
      id: 3,
      name: 'حملة العملاء الجدد',
      type: 'email',
      status: 'draft',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      budget: 30000,
      spent: 0,
      targetAudience: 'العملاء الجدد',
      goal: 'ترحيب بالعملاء الجدد',
      description: 'حملة ترحيبية للعملاء الجدد مع عرض خاص',
      content: {
        subject: 'مرحباً بك في عائلتنا',
        body: 'نحن سعداء بانضمامك إلينا. إليك عرض ترحيبي خاص...',
        images: ['welcome-banner.jpg', 'special-offer.jpg'],
        cta: 'استفد من العرض',
        ctaUrl: 'https://store.com/welcome-offer',
      },
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
        revenue: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0,
      },
      channels: ['email'],
      tags: ['ترحيب', 'عملاء جدد', 'عرض خاص'],
      createdBy: 'فريق التسويق',
      createdDate: '2024-01-25',
      lastModified: '2024-01-25',
    },
    {
      id: 4,
      name: 'حملة العودة للمدرسة',
      type: 'mixed',
      status: 'active',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      budget: 40000,
      spent: 15000,
      targetAudience: 'الطلاب والأهالي',
      goal: 'زيادة مبيعات المستلزمات المدرسية',
      description: 'حملة متعددة القنوات للترويج للمستلزمات المدرسية',
      content: {
        subject: 'استعد للعام الدراسي الجديد',
        body: 'نقدم لك جميع المستلزمات المدرسية التي تحتاجها بأسعار منافسة...',
        images: ['back-to-school-banner.jpg', 'school-supplies.jpg'],
        cta: 'تسوق الآن',
        ctaUrl: 'https://store.com/back-to-school',
      },
      metrics: {
        sent: 5000,
        delivered: 4800,
        opened: 1920,
        clicked: 480,
        converted: 96,
        revenue: 48000,
        openRate: 40,
        clickRate: 10,
        conversionRate: 2,
      },
      channels: ['email', 'social', 'website', 'sms'],
      tags: ['مدرسة', 'طلاب', 'مستلزمات'],
      createdBy: 'فريق التسويق',
      createdDate: '2024-01-15',
      lastModified: '2024-01-25',
    },
    {
      id: 5,
      name: 'حملة الولاء',
      type: 'email',
      status: 'paused',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 100000,
      spent: 35000,
      targetAudience: 'عملاء الولاء',
      goal: 'زيادة ولاء العملاء',
      description: 'حملة طويلة المدى لزيادة ولاء العملاء وزيادة معدل الاحتفاظ',
      content: {
        subject: 'شكراً لك على ولائك',
        body: 'نقدر ثقتك فينا ونقدم لك مكافآت حصرية...',
        images: ['loyalty-banner.jpg', 'rewards.jpg'],
        cta: 'استفد من المكافآت',
        ctaUrl: 'https://store.com/loyalty-rewards',
      },
      metrics: {
        sent: 15000,
        delivered: 14250,
        opened: 5700,
        clicked: 1425,
        converted: 285,
        revenue: 142500,
        openRate: 40,
        clickRate: 10,
        conversionRate: 2,
      },
      channels: ['email', 'app'],
      tags: ['ولاء', 'مكافآت', 'عملاء'],
      createdBy: 'فريق التسويق',
      createdDate: '2023-12-20',
      lastModified: '2024-01-20',
    },
  ];

  const campaignTypes = [
    { value: 'email', label: 'بريد إلكتروني', color: 'primary' },
    { value: 'social', label: 'وسائل التواصل', color: 'info' },
    { value: 'mixed', label: 'مختلط', color: 'success' },
    { value: 'sms', label: 'رسائل نصية', color: 'warning' },
    { value: 'push', label: 'إشعارات', color: 'default' },
  ];

  const campaignStatuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'scheduled', label: 'مجدولة', color: 'info' },
    { value: 'active', label: 'نشطة', color: 'success' },
    { value: 'paused', label: 'متوقفة', color: 'warning' },
    { value: 'completed', label: 'مكتملة', color: 'primary' },
    { value: 'cancelled', label: 'ملغية', color: 'error' },
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
    notify(`${action} الحملات`, `${selectedItems.length} حملة`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenViewDialog(true);
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenDialog(true);
  };

  const handleDelete = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الحملة', selectedCampaign ? 'تم تحديث الحملة' : 'تم إضافة الحملة');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الحملة', 'تم حذف الحملة');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الحملات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = campaignsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetAudience.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.goal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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

  const getTypeColor = (type) => {
    const typeInfo = campaignTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.color : 'default';
  };

  const getTypeLabel = (type) => {
    const typeInfo = campaignTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

  const getStatusColor = (status) => {
    const statusInfo = campaignStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = campaignStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
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

  const totalCampaigns = campaignsData.length;
  const activeCampaigns = campaignsData.filter((campaign) => campaign.status === 'active').length;
  const totalBudget = campaignsData.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaignsData.reduce((sum, campaign) => sum + campaign.spent, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          حملات التسويق
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتتبع جميع حملات التسويق مع مراقبة الأداء والنتائج.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/crm">
            إدارة العملاء (CRM)
          </Link>
          <Typography color="text.primary">حملات التسويق</Typography>
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
                  <CampaignIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalCampaigns}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الحملات
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
                {activeCampaigns}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                حملات نشطة
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
                  <AttachMoneyIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {formatCurrency(totalBudget)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الميزانية
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
                  <TrendingUpIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {formatCurrency(totalSpent)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المصروف
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
                placeholder="البحث في الحملات..."
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
                  {campaignStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>نوع الحملة</InputLabel>
                <Select
                  value={typeFilter}
                  label="نوع الحملة"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الأنواع</MenuItem>
                  {campaignTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
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
                  setTypeFilter('all');
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
            قائمة الحملات
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تفعيل')} sx={{ mr: 1 }}>
                تفعيل ({selectedItems.length})
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
            إضافة حملة
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
            <Alert severity="error">خطأ في تحميل الحملات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على حملات. أضف أول حملة.</Alert>
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
                      اسم الحملة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'type'}
                      direction={sortBy === 'type' ? sortOrder : 'asc'}
                      onClick={() => handleSort('type')}
                    >
                      نوع الحملة
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
                      active={sortBy === 'startDate'}
                      direction={sortBy === 'startDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('startDate')}
                    >
                      تاريخ البداية
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'budget'}
                      direction={sortBy === 'budget' ? sortOrder : 'asc'}
                      onClick={() => handleSort('budget')}
                    >
                      الميزانية
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
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 0.5 }}
                          >
                            {item.description.length > 50
                              ? `${item.description.substring(0, 50)}...`
                              : item.description}
                          </Typography>
                        </Box>
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
                        <Typography variant="body2">{formatDate(item.startDate)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {formatCurrency(item.budget)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            مصروف: {formatCurrency(item.spent)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الحملة" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الحملة" arrow>
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
        <DialogTitle>{selectedCampaign ? 'تعديل الحملة' : 'إضافة حملة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم الحملة"
                placeholder="أدخل اسم الحملة"
                defaultValue={selectedCampaign?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع الحملة</InputLabel>
                <Select label="نوع الحملة" defaultValue={selectedCampaign?.type || ''}>
                  {campaignTypes.map((type) => (
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
                <Select label="الحالة" defaultValue={selectedCampaign?.status || 'draft'}>
                  {campaignStatuses.map((status) => (
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
                type="number"
                label="الميزانية"
                placeholder="50000"
                defaultValue={selectedCampaign?.budget || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ البداية"
                defaultValue={selectedCampaign?.startDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ النهاية"
                defaultValue={selectedCampaign?.endDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الجمهور المستهدف"
                placeholder="العملاء الحاليين"
                defaultValue={selectedCampaign?.targetAudience || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الهدف"
                placeholder="زيادة المبيعات بنسبة 25%"
                defaultValue={selectedCampaign?.goal || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الوصف"
                placeholder="أدخل وصف الحملة"
                defaultValue={selectedCampaign?.description || ''}
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
        <DialogTitle>حذف الحملة</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذه الحملة؟
          </Typography>
          {selectedCampaign && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedCampaign.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {getTypeLabel(selectedCampaign.type)} - {formatDate(selectedCampaign.startDate)}
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
            تفاصيل الحملة
          </Typography>
          {selectedCampaign && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    bgcolor: `${getTypeColor(selectedCampaign.type)}.main`,
                  }}
                >
                  <CampaignIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedCampaign.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getTypeLabel(selectedCampaign.type)}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم الحملة" secondary={selectedCampaign.name} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="نوع الحملة"
                    secondary={getTypeLabel(selectedCampaign.type)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedCampaign.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ البداية"
                    secondary={formatDate(selectedCampaign.startDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ النهاية"
                    secondary={formatDate(selectedCampaign.endDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الميزانية"
                    secondary={formatCurrency(selectedCampaign.budget)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المصروف"
                    secondary={formatCurrency(selectedCampaign.spent)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الجمهور المستهدف"
                    secondary={selectedCampaign.targetAudience}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الهدف" secondary={selectedCampaign.goal} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedCampaign.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المحتوى
              </Typography>
              <Box sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>الموضوع:</strong> {selectedCampaign.content.subject}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>المحتوى:</strong> {selectedCampaign.content.body}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>دعوة للعمل:</strong> {selectedCampaign.content.cta}
                </Typography>
                <Typography variant="body2">
                  <strong>الرابط:</strong> {selectedCampaign.content.ctaUrl}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المقاييس
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: 'center', p: 1, borderRadius: 1 }}>
                    <Typography variant="h6" color="primary.main">
                      {selectedCampaign.metrics.sent.toLocaleString()}
                    </Typography>
                    <Typography variant="caption">مرسل</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: 'center', p: 1, borderRadius: 1 }}>
                    <Typography variant="h6" color="success.main">
                      {selectedCampaign.metrics.opened.toLocaleString()}
                    </Typography>
                    <Typography variant="caption">مفتوح</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: 'center', p: 1, borderRadius: 1 }}>
                    <Typography variant="h6" color="info.main">
                      {selectedCampaign.metrics.clicked.toLocaleString()}
                    </Typography>
                    <Typography variant="caption">نقرة</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: 'center', p: 1, borderRadius: 1 }}>
                    <Typography variant="h6" color="warning.main">
                      {selectedCampaign.metrics.converted.toLocaleString()}
                    </Typography>
                    <Typography variant="caption">تحويل</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                القنوات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedCampaign.channels.map((channel, index) => (
                  <Chip
                    key={index}
                    label={channel}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                العلامات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedCampaign.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" color="secondary" variant="outlined" />
                ))}
              </Box>
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

export default MarketingCampaigns;
