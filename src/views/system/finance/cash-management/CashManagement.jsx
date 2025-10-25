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
  FormControlLabel,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
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
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
  PostAdd as PostAddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccountBalanceWallet as WalletIcon,
  LocalAtm as AtmIcon,
  CreditCard as CreditCardIcon,
  SwapHoriz as SwapHorizIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

const CashManagement = () => {
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
  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for cash and bank accounts
  const cashAccountsData = [
    {
      id: 1,
      name: 'الصندوق الرئيسي',
      type: 'cash',
      accountNumber: 'CASH-001',
      bankName: 'الصندوق النقدي',
      balance: 50000,
      currency: 'SAR',
      status: 'active',
      description: 'الصندوق النقدي الرئيسي',
      transactions: [
        {
          id: 1,
          date: '2024-01-15',
          type: 'deposit',
          amount: 10000,
          description: 'إيداع من المبيعات',
          reference: 'SALES-001',
        },
        {
          id: 2,
          date: '2024-01-15',
          type: 'withdrawal',
          amount: 5000,
          description: 'سحب للمصروفات',
          reference: 'EXP-001',
        },
      ],
    },
    {
      id: 2,
      name: 'البنك الأهلي التجاري',
      type: 'bank',
      accountNumber: '1234567890',
      bankName: 'البنك الأهلي التجاري',
      balance: 250000,
      currency: 'SAR',
      status: 'active',
      description: 'الحساب الجاري الرئيسي',
      transactions: [
        {
          id: 3,
          date: '2024-01-15',
          type: 'deposit',
          amount: 50000,
          description: 'تحويل من العميل',
          reference: 'TRANSFER-001',
        },
        {
          id: 4,
          date: '2024-01-14',
          type: 'withdrawal',
          amount: 20000,
          description: 'دفع للموردين',
          reference: 'PAYMENT-001',
        },
      ],
    },
    {
      id: 3,
      name: 'بنك الراجحي',
      type: 'bank',
      accountNumber: '9876543210',
      bankName: 'بنك الراجحي',
      balance: 150000,
      currency: 'SAR',
      status: 'active',
      description: 'حساب التوفير',
      transactions: [
        {
          id: 5,
          date: '2024-01-15',
          type: 'deposit',
          amount: 25000,
          description: 'إيداع شهري',
          reference: 'MONTHLY-001',
        },
      ],
    },
    {
      id: 4,
      name: 'صندوق الطوارئ',
      type: 'cash',
      accountNumber: 'CASH-002',
      bankName: 'الصندوق النقدي',
      balance: 10000,
      currency: 'SAR',
      status: 'active',
      description: 'صندوق الطوارئ',
      transactions: [],
    },
  ];

  const accountTypes = [
    { value: 'cash', label: 'نقدي', icon: AtmIcon, color: 'primary' },
    { value: 'bank', label: 'بنكي', icon: AccountBalanceIcon, color: 'success' },
    { value: 'credit', label: 'ائتماني', icon: CreditCardIcon, color: 'warning' },
  ];

  const transactionTypes = [
    { value: 'deposit', label: 'إيداع', color: 'success' },
    { value: 'withdrawal', label: 'سحب', color: 'error' },
    { value: 'transfer', label: 'تحويل', color: 'info' },
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

  const handleAddTransaction = (account) => {
    setSelectedAccount(account);
    setOpenTransactionDialog(true);
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

  const handleTransactionSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenTransactionDialog(false);
      notify('إضافة معاملة', 'تم إضافة المعاملة');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير كشوف الحسابات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = cashAccountsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bankName.toLowerCase().includes(searchTerm.toLowerCase());
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

  const getAccountTypeIcon = (type) => {
    const typeInfo = accountTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.icon : AccountBalanceIcon;
  };

  const getTransactionTypeColor = (type) => {
    const typeInfo = transactionTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.color : 'default';
  };

  const getTransactionTypeLabel = (type) => {
    const typeInfo = transactionTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.label : type;
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

  const totalBalance = cashAccountsData.reduce((sum, account) => sum + account.balance, 0);
  const activeAccounts = cashAccountsData.filter((account) => account.status === 'active').length;
  const totalTransactions = cashAccountsData.reduce((sum, account) => sum + account.transactions.length, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة البنوك والصناديق
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة شاملة للحسابات البنكية والصناديق النقدية مع تتبع المعاملات.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/finance">
            الحسابات والمالية
          </Link>
          <Typography color="text.primary">البنوك والصناديق</Typography>
        </Breadcrumbs>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
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
                  <AccountBalanceIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {cashAccountsData.length}
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
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
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
                {formatCurrency(totalBalance)}
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
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)',
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
                {activeAccounts}
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
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)',
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
                  <ReceiptIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {totalTransactions}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المعاملات
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Account Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {cashAccountsData.map((account) => {
          const AccountIcon = getAccountTypeIcon(account.type);
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={account.id}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, rgba(${
                    account.type === 'cash' ? '25, 118, 210' : '76, 175, 80'
                  }, 0.1) 0%, rgba(${
                    account.type === 'cash' ? '25, 118, 210' : '76, 175, 80'
                  }, 0.05) 100%)`,
                  border: `1px solid rgba(${
                    account.type === 'cash' ? '25, 118, 210' : '76, 175, 80'
                  }, 0.2)`,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 25px rgba(${
                      account.type === 'cash' ? '25, 118, 210' : '76, 175, 80'
                    }, 0.15)`,
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: account.type === 'cash' ? 'primary.main' : 'success.main',
                        width: 48,
                        height: 48,
                        mr: 2,
                      }}
                    >
                      <AccountIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {account.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {account.accountNumber}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    {formatCurrency(account.balance)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {getAccountTypeLabel(account.type)}
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="عرض التفاصيل">
                      <IconButton size="small" onClick={() => handleView(account)}>
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="إضافة معاملة">
                      <IconButton size="small" color="success" onClick={() => handleAddTransaction(account)}>
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="تعديل">
                      <IconButton size="small" onClick={() => handleEdit(account)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
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
                <Select value={typeFilter} label="نوع الحساب" onChange={(e) => setTypeFilter(e.target.value)}>
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
                <Select value={statusFilter} label="الحالة" onChange={(e) => setStatusFilter(e.target.value)}>
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
            <Grid size={{ xs: 12, md: 3 }}>
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
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
                      indeterminate={selectedItems.length > 0 && selectedItems.length < sortedData.length}
                      onChange={handleSelectAll}
                    />
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
                      active={sortBy === 'accountNumber'}
                      direction={sortBy === 'accountNumber' ? sortOrder : 'asc'}
                      onClick={() => handleSort('accountNumber')}
                    >
                      رقم الحساب
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
                  .map((item) => {
                    const AccountIcon = getAccountTypeIcon(item.type);
                    return (
                      <TableRow key={item.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                mr: 2,
                                bgcolor: `${getAccountTypeColor(item.type)}.main`,
                              }}
                            >
                              <AccountIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">{item.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.bankName}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="monospace">
                            {item.accountNumber}
                          </Typography>
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
                            {formatCurrency(item.balance)}
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
                            <Tooltip title="إضافة معاملة" arrow>
                              <IconButton size="small" color="success" onClick={() => handleAddTransaction(item)}>
                                <AddIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل الحساب" arrow>
                              <IconButton size="small" onClick={() => handleEdit(item)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف الحساب" arrow>
                              <IconButton size="small" color="error" onClick={() => handleDelete(item)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

      {/* Add/Edit Account Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedAccount ? 'تعديل الحساب' : 'إضافة حساب جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
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
              <TextField
                fullWidth
                label="رقم الحساب"
                placeholder="أدخل رقم الحساب"
                defaultValue={selectedAccount?.accountNumber || ''}
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
              <TextField
                fullWidth
                label="اسم البنك"
                placeholder="أدخل اسم البنك"
                defaultValue={selectedAccount?.bankName || ''}
              />
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

      {/* Add Transaction Dialog */}
      <Dialog open={openTransactionDialog} onClose={() => setOpenTransactionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>إضافة معاملة جديدة</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="المرجع"
                placeholder="مثال: TRANS-001"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع المعاملة</InputLabel>
                <Select label="نوع المعاملة">
                  {transactionTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="المبلغ"
                placeholder="0.00"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الوصف"
                placeholder="أدخل وصف المعاملة"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTransactionDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleTransactionSave}
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
                {selectedAccount.accountNumber} - {getAccountTypeLabel(selectedAccount.type)}
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
        sx={{ '& .MuiDrawer-paper': { width: 500 } }}
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
                  {React.createElement(getAccountTypeIcon(selectedAccount.type))}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedAccount.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedAccount.accountNumber}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم الحساب" secondary={selectedAccount.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الحساب" secondary={selectedAccount.accountNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="نوع الحساب" secondary={getAccountTypeLabel(selectedAccount.type)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="اسم البنك" secondary={selectedAccount.bankName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الرصيد" secondary={formatCurrency(selectedAccount.balance)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العملة" secondary={selectedAccount.currency} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={selectedAccount.status === 'active' ? 'نشط' : 'غير نشط'} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المعاملات الأخيرة
              </Typography>
              {selectedAccount.transactions.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>التاريخ</TableCell>
                      <TableCell>النوع</TableCell>
                      <TableCell>المبلغ</TableCell>
                      <TableCell>الوصف</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedAccount.transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <Typography variant="body2">{formatDate(transaction.date)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getTransactionTypeLabel(transaction.type)}
                            size="small"
                            color={getTransactionTypeColor(transaction.type)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(transaction.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{transaction.description}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  لا توجد معاملات
                </Typography>
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

export default CashManagement;
