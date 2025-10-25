import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
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
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline,
  Search as SearchIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Analytics as AnalyticsIcon,
  Campaign as CampaignIcon,
  Percent as PercentIcon,
  AutoAwesome as AutoAwesomeIcon,
  Timer as TimerIcon,
  QrCode as QrCodeIcon,
  ContentCopy as ContentCopyIcon,
  Star as StarIcon,
  Diamond as DiamondIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

const LoyaltyWallets = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('walletId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(false);

  const walletsData = [
    {
      id: 1,
      walletId: 'WALLET-001',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      tier: 'gold',
      points: 1500,
      balance: 150.0,
      status: 'active',
      lastActivity: '2024-01-15',
      lastUpdated: '2024-01-15',
      createdDate: '2023-06-01',
      totalEarned: 2500,
      totalSpent: 1000,
      currency: 'SAR',
      membershipDate: '2023-06-01',
      nextTierPoints: 500,
      tierBenefits: ['خصم 15%', 'شحن مجاني', 'دعم أولوية'],
    },
    {
      id: 2,
      walletId: 'WALLET-002',
      customerName: 'فاطمة أحمد',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966507654321',
      tier: 'silver',
      points: 850,
      balance: 85.0,
      status: 'active',
      lastActivity: '2024-01-10',
      lastUpdated: '2024-01-10',
      createdDate: '2023-08-15',
      totalEarned: 1200,
      totalSpent: 350,
      currency: 'SAR',
      membershipDate: '2023-08-15',
      nextTierPoints: 150,
      tierBenefits: ['خصم 10%', 'شحن مجاني'],
    },
    {
      id: 3,
      walletId: 'WALLET-003',
      customerName: 'محمد علي',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+966509876543',
      tier: 'bronze',
      points: 320,
      balance: 32.0,
      status: 'inactive',
      lastActivity: '2023-12-20',
      lastUpdated: '2023-12-20',
      createdDate: '2023-10-01',
      totalEarned: 500,
      totalSpent: 180,
      currency: 'SAR',
      membershipDate: '2023-10-01',
      nextTierPoints: 180,
      tierBenefits: ['خصم 5%'],
    },
    {
      id: 4,
      walletId: 'WALLET-004',
      customerName: 'سارة خالد',
      customerEmail: 'sara@example.com',
      customerPhone: '+966501111111',
      tier: 'platinum',
      points: 2500,
      balance: 250.0,
      status: 'active',
      lastActivity: '2024-01-12',
      lastUpdated: '2024-01-12',
      createdDate: '2023-03-01',
      totalEarned: 5000,
      totalSpent: 2500,
      currency: 'SAR',
      membershipDate: '2023-03-01',
      nextTierPoints: 0,
      tierBenefits: ['خصم 20%', 'شحن مجاني', 'دعم أولوية', 'هدايا حصرية'],
    },
  ];

  const walletStats = [
    {
      title: 'إجمالي المحافظ',
      value: walletsData.length.toString(),
      color: 'primary',
      icon: AccountBalanceWalletIcon,
      change: '+20%',
      description: 'زيادة في عدد محافظ الولاء',
    },
    {
      title: 'المحافظ النشطة',
      value: walletsData.filter((w) => w.status === 'active').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '3 نشطة',
      description: 'المحافظ المستخدمة حالياً',
    },
    {
      title: 'إجمالي النقاط',
      value: walletsData.reduce((sum, w) => sum + w.points, 0).toString(),
      color: 'info',
      icon: TrendingUpIcon,
      change: '5170 نقطة',
      description: 'النقاط المتراكمة في جميع المحافظ',
    },
    {
      title: 'إجمالي الرصيد',
      value: walletsData.reduce((sum, w) => sum + w.balance, 0).toFixed(0),
      color: 'warning',
      icon: AttachMoneyIcon,
      change: '517 ريال',
      description: 'القيمة النقدية في جميع المحافظ',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث محافظ الولاء بنجاح', severity: 'success' });
    }, 1000);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(walletsData.map((w) => w.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleView = (wallet) => {
    setSelectedWallet(wallet);
    setViewDrawer(true);
  };

  const handleEdit = (wallet) => {
    setSelectedWallet(wallet);
    setOpenDialog(true);
  };

  const handleDelete = (wallet) => {
    setSnackbar({
      open: true,
      message: `تم حذف محفظة الولاء ${wallet.walletId} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = walletsData.filter((wallet) => {
    const matchesSearch =
      wallet.walletId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wallet.status === statusFilter;
    const matchesTier = tierFilter === 'all' || wallet.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'suspended':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'platinum':
        return 'secondary';
      case 'gold':
        return 'warning';
      case 'silver':
        return 'default';
      case 'bronze':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'platinum':
        return <DiamondIcon />;
      case 'gold':
        return <StarIcon />;
      case 'silver':
        return <EmojiEventsIcon />;
      case 'bronze':
        return <AccountBalanceWalletIcon />;
      default:
        return <AccountBalanceWalletIcon />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'inactive':
        return 'غير نشط';
      case 'suspended':
        return 'معلق';
      case 'pending':
        return 'في الانتظار';
      default:
        return status;
    }
  };

  const getTierText = (tier) => {
    switch (tier) {
      case 'platinum':
        return 'بلاتيني';
      case 'gold':
        return 'ذهبي';
      case 'silver':
        return 'فضي';
      case 'bronze':
        return 'برونزي';
      default:
        return tier;
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة محافظ الولاء
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة محافظ العملاء ونقاط الولاء والمكافآت
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
              <Link color="inherit" href="/main-store/pricing">
                التسعير
              </Link>
              <Typography color="text.primary">محافظ الولاء</Typography>
            </Breadcrumbs>
          </Box>
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
              إضافة محفظة جديدة
            </Button>
          </Stack>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {walletStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const color = stat.color;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette[color].main,
                      0.08,
                    )} 0%, ${alpha(theme.palette[color].main, 0.04)} 100%)`,
                    border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${alpha(theme.palette[color].main, 0.15)}`,
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: alpha(theme.palette[color].main, 0.1),
                        color: theme.palette[color].main,
                      }}
                    >
                      <IconComponent />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 600, color: theme.palette[color].main, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette[color].main, mb: 1 }}>
                      {stat.change}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block' }}
                    >
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            البحث والتصفية
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => setAdvancedFilters(!advancedFilters)}
            >
              {advancedFilters ? 'إخفاء المرشحات المتقدمة' : 'مرشحات متقدمة'}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTierFilter('all');
              }}
            >
              مسح المرشحات
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="البحث في المحافظ"
              size="small"
              placeholder="البحث بالمعرف أو اسم العميل أو البريد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select
                label="الحالة"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
                <MenuItem value="suspended">معلق</MenuItem>
                <MenuItem value="pending">في الانتظار</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>المستوى</InputLabel>
              <Select
                label="المستوى"
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
              >
                <MenuItem value="all">جميع المستويات</MenuItem>
                <MenuItem value="platinum">بلاتيني</MenuItem>
                <MenuItem value="gold">ذهبي</MenuItem>
                <MenuItem value="silver">فضي</MenuItem>
                <MenuItem value="bronze">برونزي</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} نتيجة
            </Typography>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {advancedFilters && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              مرشحات متقدمة
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأدنى للنقاط"
                  type="number"
                  size="small"
                  placeholder="مثال: 100"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأقصى للنقاط"
                  type="number"
                  size="small"
                  placeholder="مثال: 5000"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأدنى للرصيد"
                  type="number"
                  size="small"
                  placeholder="مثال: 50"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأقصى للرصيد"
                  type="number"
                  size="small"
                  placeholder="مثال: 1000"
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Data Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading && <LinearProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < walletsData.length
                  }
                  checked={walletsData.length > 0 && selectedItems.length === walletsData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'walletId'}
                  direction={sortBy === 'walletId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('walletId')}
                >
                  معرف المحفظة
                </TableSortLabel>
              </TableCell>
              <TableCell>العميل</TableCell>
              <TableCell>المستوى</TableCell>
              <TableCell>النقاط</TableCell>
              <TableCell>الرصيد</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>آخر نشاط</TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((wallet) => (
                <TableRow key={wallet.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(wallet.id)}
                      onChange={() => handleSelectItem(wallet.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {wallet.walletId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {wallet.customerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {wallet.customerEmail}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTierText(wallet.tier)}
                      color={getTierColor(wallet.tier)}
                      size="small"
                      icon={getTierIcon(wallet.tier)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                      {wallet.points.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                      {wallet.balance.toFixed(2)} {wallet.currency}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(wallet.status)}
                      color={getStatusColor(wallet.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {wallet.lastActivity}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="عرض التفاصيل" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(wallet)}
                          aria-label="عرض المحفظة"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تعديل المحفظة" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(wallet)}
                          aria-label="تعديل المحفظة"
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف المحفظة" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(wallet)}
                          aria-label="حذف المحفظة"
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedWallet ? 'تعديل محفظة الولاء' : 'إضافة محفظة ولاء جديدة'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="معرف المحفظة"
                value={selectedWallet?.walletId || ''}
                size="small"
                disabled
                helperText="يتم إنشاء المعرف تلقائياً"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المستوى</InputLabel>
                <Select value={selectedWallet?.tier || 'bronze'} label="المستوى">
                  <MenuItem value="platinum">بلاتيني</MenuItem>
                  <MenuItem value="gold">ذهبي</MenuItem>
                  <MenuItem value="silver">فضي</MenuItem>
                  <MenuItem value="bronze">برونزي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم العميل"
                value={selectedWallet?.customerName || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                type="email"
                value={selectedWallet?.customerEmail || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                value={selectedWallet?.customerPhone || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="النقاط"
                type="number"
                value={selectedWallet?.points || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الرصيد"
                type="number"
                value={selectedWallet?.balance || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ العضوية"
                type="date"
                value={selectedWallet?.membershipDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select value={selectedWallet?.status || 'active'} label="الحالة">
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                  <MenuItem value="suspended">معلق</MenuItem>
                  <MenuItem value="pending">في الانتظار</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="تفعيل المكافآت التلقائية"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={() => {
              setSnackbar({
                open: true,
                message: 'تم حفظ محفظة الولاء بنجاح',
                severity: 'success',
              });
              setOpenDialog(false);
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDrawer} onClose={() => setViewDrawer(false)} maxWidth="md" fullWidth>
        <DialogTitle>تفاصيل محفظة الولاء</DialogTitle>
        <DialogContent>
          {selectedWallet && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معرف المحفظة
                </Typography>
                <Typography variant="body1">{selectedWallet.walletId}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  المستوى
                </Typography>
                <Chip
                  label={getTierText(selectedWallet.tier)}
                  color={getTierColor(selectedWallet.tier)}
                  size="small"
                  icon={getTierIcon(selectedWallet.tier)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  العميل
                </Typography>
                <Typography variant="body1">{selectedWallet.customerName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedWallet.customerEmail} - {selectedWallet.customerPhone}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  النقاط
                </Typography>
                <Typography variant="body1" color="primary.main" sx={{ fontWeight: 500 }}>
                  {selectedWallet.points.toLocaleString()}
                </Typography>
                {selectedWallet.nextTierPoints > 0 && (
                  <Typography variant="caption" color="text.secondary">
                    {selectedWallet.nextTierPoints} نقطة للوصول للمستوى التالي
                  </Typography>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الرصيد
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 500 }}>
                  {selectedWallet.balance.toFixed(2)} {selectedWallet.currency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={getStatusText(selectedWallet.status)}
                  color={getStatusColor(selectedWallet.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ العضوية
                </Typography>
                <Typography variant="body1">{selectedWallet.membershipDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  إجمالي النقاط المكتسبة
                </Typography>
                <Typography variant="body1">
                  {selectedWallet.totalEarned.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  إجمالي النقاط المستخدمة
                </Typography>
                <Typography variant="body1">
                  {selectedWallet.totalSpent.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر نشاط
                </Typography>
                <Typography variant="body1">{selectedWallet.lastActivity}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر تحديث
                </Typography>
                <Typography variant="body1">{selectedWallet.lastUpdated}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  مزايا المستوى
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {selectedWallet.tierBenefits.map((benefit, index) => (
                    <Chip
                      key={index}
                      label={benefit}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
          <Button variant="contained" onClick={() => handleEdit(selectedWallet)}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoyaltyWallets;
