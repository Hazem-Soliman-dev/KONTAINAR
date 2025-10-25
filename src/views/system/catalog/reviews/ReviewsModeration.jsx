import React, { useState, useEffect } from 'react';
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
  Divider,
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
  Skeleton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Avatar,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Policy as PolicyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Reviews as ReviewsIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  VisibilityOutlined,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const ReviewsModeration = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Mock data for reviews
  const reviewsData = [
    {
      id: 1,
      sku: 'لاب توب-001',
      customer: 'محمود هشام',
      rating: 5,
      comment: 'لاب توب ممتاز، سريع جدا!',
      status: 'في الانتظار',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      sku: 'هاتف-002',
      customer: 'محمد عبد الله',
      rating: 4,
      comment: 'هاتف ممتاز، لكن البطارية يمكن أن تكون أفضل',
      status: 'موافقة',
      createdAt: '2024-01-14',
    },
    {
      id: 3,
      sku: 'قميص-003',
      customer: 'مؤمن ابوعلي',
      rating: 3,
      comment: 'جودة جيدة، تناسب جيدا',
      status: 'مرفوض',
      createdAt: '2024-01-13',
    },
    {
      id: 4,
      sku: 'أحذية-004',
      customer: 'محمد حسن',
      rating: 5,
      comment: 'تناسب جيدا ومريح جدا',
      status: 'موافقة',
      createdAt: '2024-01-12',
    },
    {
      id: 5,
      sku: 'مشينج-005',
      customer: 'أحمد خالد',
      rating: 2,
      comment: 'جودة سيئة، الخيط سقط بسرعة',
      status: 'في الانتظار',
      createdAt: '2024-01-11',
    },
  ];

  // Mock data for review stats
  const reviewStats = [
    { title: 'في الانتظار', value: '24', change: '+3', color: 'warning', icon: ScheduleIcon },
    {
      title: 'موافق عليه اليوم',
      value: '18',
      change: '+5',
      color: 'success',
      icon: CheckCircleIcon,
    },
    { title: 'مرفوض اليوم', value: '6', change: '+2', color: 'error', icon: WarningIcon },
    { title: 'متوسط التقييم', value: '4.2', change: '+0.1', color: 'info', icon: StarIcon },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const notify = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
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
      setSelectedItems(reviewsData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action) => {
    if (selectedItems.length === 0) return;

    switch (action) {
      case 'approve':
        notify(`موافقة ${selectedItems.length} مراجعات`);
        setSelectedItems([]);
        break;
      case 'reject':
        notify(`مرفوض ${selectedItems.length} مراجعات`);
        setSelectedItems([]);
        break;
      case 'export':
        notify(`تصدير ${selectedItems.length} مراجعات`);
        break;
      default:
        break;
    }
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (review) => {
    setSelectedReview(review);
    setViewDrawer(true);
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setOpenDialog(true);
  };

  const handleDelete = (review) => {
    setSelectedReview(review);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setOpenDialog(false);
    notify('Review updated successfully');
  };

  const handleDeleteConfirm = () => {
    setOpenDeleteDialog(false);
    notify('Review deleted successfully');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('Data refreshed successfully');
    }, 1000);
  };

  const filteredData = reviewsData.filter((item) => {
    const matchesSearch =
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || item.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
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
  const [formData, setFormData] = useState({
    title: 'إدارة المراجعات',
    content: '',
    isActive: true,
    moderationLevel: 'auto',
    reviewThreshold: 3,
    contactInfo: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'قواعد المراجعة',
      content: 'تضبيط قواعد المراجعة وعملية الموافقة.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'مرشحات المراجعات',
      content: 'تعيين مرشحات لمراجعة المراجعات تلقائياً.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'موافقة المراجعات',
      content: 'إدارة عملية موافقة المراجعات والإشعارات.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليل المراجعات',
      content: 'عرض تحليلات مراجعة المراجعات والأداء.',
      isExpanded: false,
    },
  ]);

  const handleAddSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: 'قسم جديد',
      content: '',
      isExpanded: false,
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleSectionChange = (id, field, value) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)),
    );
  };

  const handleToggleExpanded = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, isExpanded: !section.isExpanded } : section,
      ),
    );
  };

  return (
    <Box
      sx={{ p: 3 }}
      role="main"
      aria-label="إدارة مراجعات العملاء"
      aria-hidden="false"
      tabIndex={0}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
          إدارة مراجعات العملاء
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          مراجعة وإدارة تقييمات العملاء للحفاظ على الجودة والثقة
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="مسار التنقل">
          <Link color="inherit" href="/main-store" aria-label="الذهاب إلى المتجر الرئيسي">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            المتجر الرئيسي
          </Link>
          <Link color="inherit" href="/main-store/catalog" aria-label="الذهاب إلى الكتالوج">
            الكتالوج
          </Link>
          <Typography color="text.primary">إدارة المراجعات</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
              aria-label="تحديث البيانات"
              aria-hidden="false"
              tabIndex={0}
            >
              تحديث
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              aria-label="إضافة مراجعة جديدة"
              aria-hidden="false"
              tabIndex={0}
            >
              إضافة مراجعة
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reviewStats.map((stat, index) => (
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
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette[stat.color].main, 0.1),
                    color: theme.palette[stat.color].main,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <stat.icon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <Chip label={stat.change} size="small" color={stat.color} variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters & Search */}
      <Paper sx={{ p: 3, mb: 4 }} aria-hidden="false">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            الفلاتر والبحث
          </Typography>
          <Button
            variant="outlined"
            size="small"
            aria-label="مسح الفلاتر"
            aria-hidden="false"
            tabIndex={0}
          >
            مسح الفلاتر
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="البحث في المراجعات..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="البحث في المراجعات"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select
                value={statusFilter}
                label="الحالة"
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="فلتر الحالة"
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="في الانتظار">في الانتظار</MenuItem>
                <MenuItem value="موافقة">موافق عليه</MenuItem>
                <MenuItem value="مرفوض">مرفوض</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>التقييم</InputLabel>
              <Select
                value={ratingFilter}
                label="التقييم"
                onChange={(e) => setRatingFilter(e.target.value)}
                aria-label="فلتر التقييم"
              >
                <MenuItem value="all">جميع التقييمات</MenuItem>
                <MenuItem value="5">5 نجوم</MenuItem>
                <MenuItem value="4">4 نجوم</MenuItem>
                <MenuItem value="3">3 نجوم</MenuItem>
                <MenuItem value="2">2 نجوم</MenuItem>
                <MenuItem value="1">1 نجمة</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              تم العثور على {filteredData.length} مراجعة
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading && <LinearProgress />}

        {selectedItems.length > 0 && (
          <Toolbar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
            <Typography variant="subtitle1" sx={{ flex: '1 1 100%' }}>
              {selectedItems.length} محدد
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleBulkAction('approve')}
              sx={{ mr: 1 }}
              aria-label="الموافقة على المحدد"
              aria-hidden="false"
              tabIndex={0}
            >
              موافقة
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleBulkAction('reject')}
              sx={{ mr: 1 }}
              aria-label="رفض المحدد"
              aria-hidden="false"
              tabIndex={0}
            >
              رفض
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleBulkAction('export')}
              aria-label="تصدير المحدد"
              aria-hidden="false"
              tabIndex={0}
            >
              تصدير
            </Button>
          </Toolbar>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < reviewsData.length
                  }
                  checked={reviewsData.length > 0 && selectedItems.length === reviewsData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>العميل</TableCell>
              <TableCell>رمز المنتج</TableCell>
              <TableCell>التقييم</TableCell>
              <TableCell>التعليق</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                تاريخ الإنشاء
              </TableCell>
              <TableCell>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Alert severity="info">لم يتم العثور على مراجعات</Alert>
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((review) => (
                  <TableRow key={review.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(review.id)}
                        onChange={() => handleSelectItem(review.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {review.customer}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {review.sku}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Rating value={review.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {review.comment}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={review.status}
                        size="small"
                        color={
                          review.status === 'موافقة'
                            ? 'success'
                            : review.status === 'مرفوض'
                            ? 'error'
                            : 'warning'
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" color="text.secondary">
                        {review.createdAt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="عرض التفاصيل">
                          <IconButton
                            size="small"
                            onClick={() => handleView(review)}
                            aria-label="عرض المراجعة"
                            aria-hidden="false"
                            tabIndex={0}
                          >
                            <VisibilityOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تعديل المراجعة">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(review)}
                            aria-label="تعديل المراجعة"
                            aria-hidden="false"
                            tabIndex={0}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="حذف المراجعة">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(review)}
                            aria-label="حذف المراجعة"
                            color="error"
                            aria-hidden="false"
                            tabIndex={0}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            )}
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

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">تعديل المراجعة</DialogTitle>
        <DialogContent id="dialog-description">
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="العميل"
                value={selectedReview?.customer || ''}
                variant="outlined"
                helperText="اسم العميل"
                aria-label="اسم العميل"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="رمز المنتج"
                value={selectedReview?.sku || ''}
                variant="outlined"
                helperText="رمز المنتج"
                aria-label="رمز المنتج"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="التعليق"
                multiline
                rows={3}
                value={selectedReview?.comment || ''}
                variant="outlined"
                helperText="تعليق المراجعة"
                aria-label="تعليق المراجعة"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>التقييم</InputLabel>
                <Select
                  value={selectedReview?.rating || 5}
                  label="التقييم"
                  aria-label="تقييم المراجعة"
                >
                  <MenuItem value={1}>1 نجمة</MenuItem>
                  <MenuItem value={2}>2 نجوم</MenuItem>
                  <MenuItem value={3}>3 نجوم</MenuItem>
                  <MenuItem value={4}>4 نجوم</MenuItem>
                  <MenuItem value={5}>5 نجوم</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={selectedReview?.status || 'في الانتظار'}
                  label="الحالة"
                  aria-label="حالة المراجعة"
                >
                  <MenuItem value="في الانتظار">في الانتظار</MenuItem>
                  <MenuItem value="موافقة">موافق عليه</MenuItem>
                  <MenuItem value="مرفوض">مرفوض</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            aria-label="إلغاء العملية"
            aria-hidden="false"
            tabIndex={0}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            aria-label="حفظ المراجعة"
            aria-hidden="false"
            tabIndex={0}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">حذف المراجعة</DialogTitle>
        <DialogContent id="delete-dialog-description">
          <Typography>
            هل أنت متأكد من حذف المراجعة من "{selectedReview?.customer}"؟ لا يمكن التراجع عن هذا
            الإجراء.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            aria-label="إلغاء الحذف"
            aria-hidden="false"
            tabIndex={0}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            aria-label="تأكيد الحذف"
            aria-hidden="false"
            tabIndex={0}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Drawer */}
      <Drawer
        anchor="right"
        open={viewDrawer}
        onClose={() => setViewDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
        aria-labelledby="drawer-title"
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }} id="drawer-title">
            تفاصيل المراجعة
          </Typography>
          {selectedReview && (
            <List>
              <ListItem>
                <ListItemText primary="العميل" secondary={selectedReview.customer} />
              </ListItem>
              <ListItem>
                <ListItemText primary="رمز المنتج" secondary={selectedReview.sku} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="التقييم"
                  secondary={<Rating value={selectedReview.rating} readOnly />}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="التعليق" secondary={selectedReview.comment} />
              </ListItem>
              <ListItem>
                <ListItemText primary="الحالة" secondary={selectedReview.status} />
              </ListItem>
              <ListItem>
                <ListItemText primary="تاريخ الإنشاء" secondary={selectedReview.createdAt} />
              </ListItem>
            </List>
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
      {/* Moderation Settings */}
      <Paper sx={{ p: 3, mt: 4 }} aria-hidden="false">
        <Typography variant="h6" gutterBottom>
          إعدادات المراجعة
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth size="small">
              <InputLabel>مستوى المراجعة</InputLabel>
              <Select
                value={formData.moderationLevel}
                label="مستوى المراجعة"
                onChange={(e) => setFormData({ ...formData, moderationLevel: e.target.value })}
                aria-label="مستوى المراجعة"
              >
                <MenuItem value="auto">تلقائي</MenuItem>
                <MenuItem value="manual">يدوي</MenuItem>
                <MenuItem value="hybrid">مختلط</MenuItem>
                <MenuItem value="disabled">معطل</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="حد المراجعة"
              type="number"
              value={formData.reviewThreshold}
              onChange={(e) => setFormData({ ...formData, reviewThreshold: e.target.value })}
              size="small"
              helperText="أقل تقييم للموافقة التلقائية على المراجعات"
              aria-label="حد المراجعة"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="المراجعة نشطة"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="معلومات الاتصال"
              multiline
              rows={2}
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              size="small"
              placeholder="تفاصيل الاتصال بفريق مراجعة المراجعات..."
              aria-label="معلومات الاتصال"
            />
          </Grid>
        </Grid>
      </Paper>

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

export default ReviewsModeration;
