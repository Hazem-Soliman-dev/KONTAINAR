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
  Menu,
  ListItemIcon,
  ListItemText,
  Switch,
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
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  CheckCircleOutline as CheckIcon,
  BlockOutlined as CloseIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon,
  DensityMedium as DensityMediumIcon,
  DensitySmall as DensitySmallIcon,
  DensityLarge as DensityLargeIcon,
  AccountTree as AccountTreeIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const ChartOfAccounts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('code');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for chart of accounts
  const accountsData = [
    {
      id: 1,
      code: '1000',
      name: 'الأصول',
      type: 'asset',
      parentId: null,
      level: 1,
      balance: 1500000,
      status: 'active',
      description: 'جميع الأصول المالية والمادية',
      children: [
        {
          id: 11,
          code: '1100',
          name: 'الأصول المتداولة',
          type: 'asset',
          parentId: 1,
          level: 2,
          balance: 800000,
          status: 'active',
          description: 'الأصول التي يمكن تحويلها إلى نقد خلال سنة',
          children: [
            {
              id: 111,
              code: '1110',
              name: 'النقدية وما في حكمها',
              type: 'asset',
              parentId: 11,
              level: 3,
              balance: 150000,
              status: 'active',
              description: 'النقدية في الصندوق والبنك',
            },
            {
              id: 112,
              code: '1120',
              name: 'المخزون',
              type: 'asset',
              parentId: 11,
              level: 3,
              balance: 300000,
              status: 'active',
              description: 'مخزون البضائع',
            },
            {
              id: 113,
              code: '1130',
              name: 'الذمم المدينة',
              type: 'asset',
              parentId: 11,
              level: 3,
              balance: 200000,
              status: 'active',
              description: 'أموال العملاء المستحقة',
            },
          ],
        },
        {
          id: 12,
          code: '1200',
          name: 'الأصول الثابتة',
          type: 'asset',
          parentId: 1,
          level: 2,
          balance: 700000,
          status: 'active',
          description: 'الأصول طويلة الأجل',
          children: [
            {
              id: 121,
              code: '1210',
              name: 'المباني',
              type: 'asset',
              parentId: 12,
              level: 3,
              balance: 500000,
              status: 'active',
              description: 'قيمة المباني المملوكة',
            },
            {
              id: 122,
              code: '1220',
              name: 'المعدات',
              type: 'asset',
              parentId: 12,
              level: 3,
              balance: 200000,
              status: 'active',
              description: 'المعدات والآلات',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      code: '2000',
      name: 'الخصوم',
      type: 'liability',
      parentId: null,
      level: 1,
      balance: 800000,
      status: 'active',
      description: 'جميع الالتزامات المالية',
      children: [
        {
          id: 21,
          code: '2100',
          name: 'الخصوم المتداولة',
          type: 'liability',
          parentId: 2,
          level: 2,
          balance: 300000,
          status: 'active',
          description: 'الالتزامات المستحقة خلال سنة',
          children: [
            {
              id: 211,
              code: '2110',
              name: 'الذمم الدائنة',
              type: 'liability',
              parentId: 21,
              level: 3,
              balance: 150000,
              status: 'active',
              description: 'أموال الموردين المستحقة',
            },
            {
              id: 212,
              code: '2120',
              name: 'الرواتب المستحقة',
              type: 'liability',
              parentId: 21,
              level: 3,
              balance: 100000,
              status: 'active',
              description: 'الرواتب المستحقة للموظفين',
            },
          ],
        },
        {
          id: 22,
          code: '2200',
          name: 'الخصوم طويلة الأجل',
          type: 'liability',
          parentId: 2,
          level: 2,
          balance: 500000,
          status: 'active',
          description: 'الالتزامات طويلة الأجل',
          children: [
            {
              id: 221,
              code: '2210',
              name: 'القروض طويلة الأجل',
              type: 'liability',
              parentId: 22,
              level: 3,
              balance: 500000,
              status: 'active',
              description: 'القروض البنكية طويلة الأجل',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      code: '3000',
      name: 'حقوق الملكية',
      type: 'equity',
      parentId: null,
      level: 1,
      balance: 700000,
      status: 'active',
      description: 'حقوق المالكين في الشركة',
      children: [
        {
          id: 31,
          code: '3100',
          name: 'رأس المال',
          type: 'equity',
          parentId: 3,
          level: 2,
          balance: 500000,
          status: 'active',
          description: 'رأس المال المدفوع',
        },
        {
          id: 32,
          code: '3200',
          name: 'الأرباح المحتجزة',
          type: 'equity',
          parentId: 3,
          level: 2,
          balance: 200000,
          status: 'active',
          description: 'الأرباح المحتجزة من السنوات السابقة',
        },
      ],
    },
    {
      id: 4,
      code: '4000',
      name: 'الإيرادات',
      type: 'revenue',
      parentId: null,
      level: 1,
      balance: 0,
      status: 'active',
      description: 'جميع مصادر الإيرادات',
      children: [
        {
          id: 41,
          code: '4100',
          name: 'إيرادات المبيعات',
          type: 'revenue',
          parentId: 4,
          level: 2,
          balance: 0,
          status: 'active',
          description: 'إيرادات بيع المنتجات والخدمات',
        },
        {
          id: 42,
          code: '4200',
          name: 'إيرادات أخرى',
          type: 'revenue',
          parentId: 4,
          level: 2,
          balance: 0,
          status: 'active',
          description: 'الإيرادات الأخرى',
        },
      ],
    },
    {
      id: 5,
      code: '5000',
      name: 'المصروفات',
      type: 'expense',
      parentId: null,
      level: 1,
      balance: 0,
      status: 'active',
      description: 'جميع أنواع المصروفات',
      children: [
        {
          id: 51,
          code: '5100',
          name: 'تكلفة البضائع المباعة',
          type: 'expense',
          parentId: 5,
          level: 2,
          balance: 0,
          status: 'active',
          description: 'تكلفة البضائع المباعة',
        },
        {
          id: 52,
          code: '5200',
          name: 'المصروفات الإدارية',
          type: 'expense',
          parentId: 5,
          level: 2,
          balance: 0,
          status: 'active',
          description: 'المصروفات الإدارية والتشغيلية',
        },
      ],
    },
  ];

  const accountTypes = [
    { value: 'asset', label: 'الأصول', color: 'primary' },
    { value: 'liability', label: 'الخصوم', color: 'error' },
    { value: 'equity', label: 'حقوق الملكية', color: 'success' },
    { value: 'revenue', label: 'الإيرادات', color: 'info' },
    { value: 'expense', label: 'المصروفات', color: 'warning' },
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
      setSelectedItems(flattenedData.map((item) => item.id));
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
    notify(`${action} الحسابات`, `${selectedItems.length} حساب`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (account) => {
    setSelectedAccount(account);
    setOpenViewDialog(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setOpenDialog(true);
  };

  const handleDelete = (account) => {
    setSelectedAccount(account);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الحساب', selectedAccount ? 'تم تحديث الحساب' : 'تم إنشاء الحساب');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الحساب', 'تم حذف الحساب');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير شجرة الحسابات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  // Flatten the tree structure for table view
  const flattenAccounts = (accounts, level = 0) => {
    let result = [];
    accounts.forEach((account) => {
      result.push({ ...account, level });
      if (account.children) {
        result = result.concat(flattenAccounts(account.children, level + 1));
      }
    });
    return result;
  };

  const flattenedData = flattenAccounts(accountsData);

  const filteredData = flattenedData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
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

  const getAccountTypeColor = (type) => {
    const typeInfo = accountTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.color : 'default';
  };

  const getAccountTypeLabel = (type) => {
    const typeInfo = accountTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(balance);
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          شجرة الحسابات
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة شاملة لشجرة الحسابات المحاسبية مع إمكانية التصنيف الهرمي.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/finance">
            الحسابات والمالية
          </Link>
          <Typography color="text.primary">شجرة الحسابات</Typography>
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
                  <AccountTreeIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {flattenedData.length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الحسابات
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
                  <AttachMoneyIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {formatBalance(flattenedData.reduce((sum, acc) => sum + acc.balance, 0))}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الأرصدة
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
                  <TrendingUpIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {flattenedData.filter((acc) => acc.status === 'active').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الحسابات النشطة
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
                  <AssessmentIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {accountsData.length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الحسابات الرئيسية
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
                placeholder="البحث في الحسابات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>نوع الحساب</InputLabel>
                <Select
                  value={typeFilter}
                  label="نوع الحساب"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الأنواع</MenuItem>
                  {accountTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setStatusFilter('all');
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
            قائمة الحسابات
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
            إضافة حساب
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
            <Alert severity="error">خطأ في تحميل الحسابات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على حسابات. أضف أول حساب.</Alert>
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
                      active={sortBy === 'code'}
                      direction={sortBy === 'code' ? sortOrder : 'asc'}
                      onClick={() => handleSort('code')}
                    >
                      رمز الحساب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'name'}
                      direction={sortBy === 'name' ? sortOrder : 'asc'}
                      onClick={() => handleSort('name')}
                    >
                      اسم الحساب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'type'}
                      direction={sortBy === 'type' ? sortOrder : 'asc'}
                      onClick={() => handleSort('type')}
                    >
                      نوع الحساب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'balance'}
                      direction={sortBy === 'balance' ? sortOrder : 'asc'}
                      onClick={() => handleSort('balance')}
                    >
                      الرصيد
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
                        <Typography variant="body2" fontFamily="monospace">
                          {item.code}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{item.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getAccountTypeLabel(item.type)}
                          size="small"
                          color={getAccountTypeColor(item.type)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatBalance(item.balance)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status === 'active' ? 'نشط' : 'غير نشط'}
                          size="small"
                          color={item.status === 'active' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الحساب" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الحساب" arrow>
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
        <DialogTitle>{selectedAccount ? 'تعديل الحساب' : 'إضافة حساب جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رمز الحساب"
                placeholder="مثال: 1110"
                defaultValue={selectedAccount?.code || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم الحساب"
                placeholder="أدخل اسم الحساب"
                defaultValue={selectedAccount?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع الحساب</InputLabel>
                <Select label="نوع الحساب" defaultValue={selectedAccount?.type || ''}>
                  {accountTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحساب الأب</InputLabel>
                <Select label="الحساب الأب" defaultValue={selectedAccount?.parentId || ''}>
                  <MenuItem value="">حساب رئيسي</MenuItem>
                  {flattenedData.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.code} - {account.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="الرصيد الافتتاحي"
                placeholder="0.00"
                defaultValue={selectedAccount?.balance || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedAccount?.status || 'active'}>
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الوصف"
                placeholder="أدخل وصف الحساب"
                defaultValue={selectedAccount?.description || ''}
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
        <DialogTitle>حذف الحساب</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا الحساب؟
          </Typography>
          {selectedAccount && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedAccount.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedAccount.code} - {getAccountTypeLabel(selectedAccount.type)}
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
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل الحساب
          </Typography>
          {selectedAccount && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    bgcolor: `${getAccountTypeColor(selectedAccount.type)}.main`,
                  }}
                >
                  <AccountBalanceIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedAccount.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedAccount.code}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="رمز الحساب" secondary={selectedAccount.code} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="اسم الحساب" secondary={selectedAccount.name} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="نوع الحساب"
                    secondary={getAccountTypeLabel(selectedAccount.type)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الرصيد"
                    secondary={formatBalance(selectedAccount.balance)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={selectedAccount.status === 'active' ? 'نشط' : 'غير نشط'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المستوى" secondary={selectedAccount.level} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedAccount.description}
              </Typography>
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

export default ChartOfAccounts;
