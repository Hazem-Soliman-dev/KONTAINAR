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
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Analytics as AnalyticsIcon,
  Group as GroupIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';

const Segments = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('segmentId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(false);

  const segmentsData = [
    {
      id: 1,
      segmentId: 'SEG-001',
      name: 'العملاء المميزين',
      description: 'العملاء الذين حققوا مبيعات عالية ومستمرة',
      type: 'manual',
      customersCount: 250,
      status: 'active',
      criteria: 'طلبات أكثر من 5000 ريال',
      lastUpdated: '2024-01-15',
      createdDate: '2023-12-01',
      tags: ['VIP', 'High Value'],
      conversionRate: 85.5,
      avgOrderValue: 1250.0,
    },
    {
      id: 2,
      segmentId: 'SEG-002',
      name: 'العملاء الجدد',
      description: 'العملاء الذين انضموا مؤخراً للمنصة',
      type: 'auto',
      customersCount: 1200,
      status: 'active',
      criteria: 'انضمام خلال 30 يوم',
      lastUpdated: '2024-01-10',
      createdDate: '2024-01-01',
      tags: ['New', 'Fresh'],
      conversionRate: 45.2,
      avgOrderValue: 180.0,
    },
    {
      id: 3,
      segmentId: 'SEG-003',
      name: 'العملاء غير النشطين',
      description: 'العملاء الذين لم يقوموا بمشتريات لفترة طويلة',
      type: 'auto',
      customersCount: 350,
      status: 'active',
      criteria: 'لا توجد مشتريات لأكثر من 90 يوم',
      lastUpdated: '2024-01-08',
      createdDate: '2023-11-15',
      tags: ['Inactive', 'At Risk'],
      conversionRate: 12.8,
      avgOrderValue: 0.0,
    },
    {
      id: 4,
      segmentId: 'SEG-004',
      name: 'العملاء المتكررين',
      description: 'العملاء الذين يقومون بمشتريات متكررة',
      type: 'auto',
      customersCount: 890,
      status: 'active',
      criteria: 'أكثر من 3 مشتريات في 6 أشهر',
      lastUpdated: '2024-01-12',
      createdDate: '2023-10-01',
      tags: ['Loyal', 'Frequent'],
      conversionRate: 92.3,
      avgOrderValue: 450.0,
    },
  ];

  const segmentStats = [
    {
      title: 'إجمالي الشرائح',
      value: segmentsData.length.toString(),
      color: 'primary',
      icon: GroupIcon,
      change: '+15%',
      description: 'زيادة في عدد الشرائح',
    },
    {
      title: 'الشرائح النشطة',
      value: segmentsData.filter((s) => s.status === 'active').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '4 نشطة',
      description: 'جميع الشرائح تعمل بشكل طبيعي',
    },
    {
      title: 'الشرائح التلقائية',
      value: segmentsData.filter((s) => s.type === 'auto').length.toString(),
      color: 'info',
      icon: AutoAwesomeIcon,
      change: '3 تلقائية',
      description: 'تحديث تلقائي للعملاء',
    },
    {
      title: 'إجمالي العملاء',
      value: segmentsData.reduce((sum, s) => sum + s.customersCount, 0).toString(),
      color: 'warning',
      icon: PeopleIcon,
      change: '2690 عميل',
      description: 'عدد العملاء في جميع الشرائح',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث الشرائح بنجاح', severity: 'success' });
    }, 1000);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(segmentsData.map((s) => s.id));
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

  const handleView = (segment) => {
    setSelectedSegment(segment);
    setViewDrawer(true);
  };

  const handleEdit = (segment) => {
    setSelectedSegment(segment);
    setOpenDialog(true);
  };

  const handleDelete = (segment) => {
    setSnackbar({
      open: true,
      message: `تم حذف الشريحة ${segment.segmentId} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = segmentsData.filter((segment) => {
    const matchesSearch =
      segment.segmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || segment.status === statusFilter;
    const matchesType = typeFilter === 'all' || segment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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
      case 'draft':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'auto':
        return 'info';
      case 'manual':
        return 'primary';
      default:
        return 'default';
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
              إدارة شرائح العملاء
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة وتنظيم العملاء في شرائح مختلفة لتحسين الاستهداف والتسويق
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
              <Link color="inherit" href="/main-store/crm">
                إدارة العملاء
              </Link>
              <Typography color="text.primary">شرائح العملاء</Typography>
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
              إضافة شريحة جديدة
            </Button>
          </Stack>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {segmentStats.map((stat, index) => {
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
                setTypeFilter('all');
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
              label="البحث في الشرائح"
              size="small"
              placeholder="البحث بالمعرف أو الاسم أو الوصف..."
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
                <MenuItem value="draft">مسودة</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>النوع</InputLabel>
              <Select
                label="النوع"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="manual">يدوي</MenuItem>
                <MenuItem value="auto">تلقائي</MenuItem>
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
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="الحد الأدنى للعملاء"
                  type="number"
                  size="small"
                  placeholder="مثال: 100"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="الحد الأقصى للعملاء"
                  type="number"
                  size="small"
                  placeholder="مثال: 1000"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>ترتيب حسب</InputLabel>
                  <Select label="ترتيب حسب">
                    <MenuItem value="customers">عدد العملاء</MenuItem>
                    <MenuItem value="conversion">معدل التحويل</MenuItem>
                    <MenuItem value="orderValue">متوسط قيمة الطلب</MenuItem>
                    <MenuItem value="lastUpdated">آخر تحديث</MenuItem>
                  </Select>
                </FormControl>
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
                    selectedItems.length > 0 && selectedItems.length < segmentsData.length
                  }
                  checked={segmentsData.length > 0 && selectedItems.length === segmentsData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'segmentId'}
                  direction={sortBy === 'segmentId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('segmentId')}
                >
                  معرف الشريحة
                </TableSortLabel>
              </TableCell>
              <TableCell>الاسم</TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>عدد العملاء</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>المعايير</TableCell>
              <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>معدل التحويل</TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((segment) => (
                <TableRow key={segment.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(segment.id)}
                      onChange={() => handleSelectItem(segment.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {segment.segmentId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {segment.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {segment.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={segment.type === 'auto' ? 'تلقائي' : 'يدوي'}
                      color={getTypeColor(segment.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {segment.customersCount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={segment.status === 'active' ? 'نشط' : 'غير نشط'}
                      color={getStatusColor(segment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {segment.criteria}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                    <Typography variant="body2" color="success.main">
                      {segment.conversionRate}%
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="عرض التفاصيل" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(segment)}
                          aria-label="عرض الشريحة"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تعديل الشريحة" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(segment)}
                          aria-label="تعديل الشريحة"
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف الشريحة" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(segment)}
                          aria-label="حذف الشريحة"
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
        <DialogTitle>{selectedSegment ? 'تعديل الشريحة' : 'إضافة شريحة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="معرف الشريحة"
                value={selectedSegment?.segmentId || ''}
                size="small"
                disabled
                helperText="يتم إنشاء المعرف تلقائياً"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>النوع</InputLabel>
                <Select value={selectedSegment?.type || 'manual'} label="النوع">
                  <MenuItem value="manual">يدوي</MenuItem>
                  <MenuItem value="auto">تلقائي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم الشريحة"
                value={selectedSegment?.name || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف الشريحة"
                multiline
                rows={3}
                value={selectedSegment?.description || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="معايير التصنيف"
                multiline
                rows={2}
                value={selectedSegment?.criteria || ''}
                size="small"
                placeholder="مثال: طلبات أكثر من 5000 ريال"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select value={selectedSegment?.status || 'active'} label="الحالة">
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                  <MenuItem value="draft">مسودة</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="تفعيل التحديث التلقائي"
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
                message: 'تم حفظ الشريحة بنجاح',
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
        <DialogTitle>تفاصيل الشريحة</DialogTitle>
        <DialogContent>
          {selectedSegment && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معرف الشريحة
                </Typography>
                <Typography variant="body1">{selectedSegment.segmentId}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  النوع
                </Typography>
                <Chip
                  label={selectedSegment.type === 'auto' ? 'تلقائي' : 'يدوي'}
                  color={getTypeColor(selectedSegment.type)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الاسم
                </Typography>
                <Typography variant="body1">{selectedSegment.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الوصف
                </Typography>
                <Typography variant="body1">{selectedSegment.description}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد العملاء
                </Typography>
                <Typography variant="body1">
                  {selectedSegment.customersCount.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={selectedSegment.status === 'active' ? 'نشط' : 'غير نشط'}
                  color={getStatusColor(selectedSegment.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معايير التصنيف
                </Typography>
                <Typography variant="body1">{selectedSegment.criteria}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معدل التحويل
                </Typography>
                <Typography variant="body1" color="success.main">
                  {selectedSegment.conversionRate}%
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  متوسط قيمة الطلب
                </Typography>
                <Typography variant="body1">
                  {selectedSegment.avgOrderValue.toLocaleString()} ريال
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر تحديث
                </Typography>
                <Typography variant="body1">{selectedSegment.lastUpdated}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
          <Button variant="contained" onClick={() => handleEdit(selectedSegment)}>
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

export default Segments;
