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
  Tabs,
  Tab,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Policy as PolicyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  LocalOffer as LocalOfferIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Tag as TagIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

const ProductTagsManager = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('tag');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [formData, setFormData] = useState({
    title: 'إنشاء علامة منتج جديدة',
    content: '',
    isActive: true,
    tagName: '',
    tagDescription: '',
    tagColor: '#1976d2',
    contactInfo: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'معلومات العلامة',
      content: 'أدخل المعلومات الأساسية للعلامة بما في ذلك الاسم والوصف.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'مظهر العلامة',
      content: 'قم بتكوين مظهر العلامة بما في ذلك اللون والتنسيق.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'استخدام العلامة',
      content: 'حدد كيفية استخدام العلامة وتطبيقها على المنتجات.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليلات العلامة',
      content: 'قم بتكوين تتبع أداء العلامة والتحليلات.',
      isExpanded: false,
    },
  ]);

  // Mock data for product tags
  const tagsData = [
    { id: 1, tag: 'إلكترونيات', usage: 45, status: 'active', updatedAt: '2024-01-15' },
    { id: 2, tag: 'ملابس', usage: 32, status: 'active', updatedAt: '2024-01-14' },
    { id: 3, tag: 'كتب', usage: 28, status: 'inactive', updatedAt: '2024-01-13' },
    { id: 4, tag: 'منزل وحديقة', usage: 67, status: 'active', updatedAt: '2024-01-12' },
    { id: 5, tag: 'رياضة', usage: 89, status: 'active', updatedAt: '2024-01-11' },
  ];

  // Mock data for tag stats
  const tagStats = [
    { title: 'إجمالي العلامات', value: '156', change: '+8%', color: 'primary', icon: TagIcon },
    {
      title: 'متوسط الاستخدام',
      value: '3.2',
      change: '+0.4',
      color: 'secondary',
      icon: SettingsIcon,
    },
    {
      title: 'علامات مع منتجات',
      value: '89',
      change: '+12',
      color: 'success',
      icon: CheckCircleIcon,
    },
    { title: 'محدث اليوم', value: '24', change: '+5', color: 'info', icon: AnalyticsIcon },
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
      setSelectedItems(tagsData.map((item) => item.id));
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
      case 'delete':
        notify(`تم حذف ${selectedItems.length} علامة`);
        setSelectedItems([]);
        break;
      case 'export':
        notify(`تم تصدير ${selectedItems.length} علامة`);
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

  const handleView = (tag) => {
    setSelectedTag(tag);
    setViewDrawer(true);
  };

  const handleEdit = (tag) => {
    setSelectedTag(tag);
    setOpenDialog(true);
  };

  const handleDelete = (tag) => {
    setSelectedTag(tag);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setOpenDialog(false);
    notify('تم تحديث العلامة بنجاح');
  };

  const handleDeleteConfirm = () => {
    setOpenDeleteDialog(false);
    notify('تم حذف العلامة بنجاح');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('تم تحديث البيانات بنجاح');
    }, 1000);
  };

  const handleCreateSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم إنشاء علامة المنتج بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

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

  const filteredData = tagsData.filter((item) => {
    const matchesSearch = item.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
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

  const renderListTab = () => (
    <Box>
      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {tagStats.map((stat, index) => (
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
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            الفلاتر والبحث
          </Typography>
          <Button variant="outlined" size="small">
            مسح الفلاتر
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="البحث في العلامات..."
              variant="outlined"
              size="small"
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
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الاستخدام</InputLabel>
              <Select value="all" label="الاستخدام">
                <MenuItem value="all">جميع الاستخدامات</MenuItem>
                <MenuItem value="high">استخدام عالي</MenuItem>
                <MenuItem value="medium">استخدام متوسط</MenuItem>
                <MenuItem value="low">استخدام منخفض</MenuItem>
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
              تم العثور على {filteredData.length} علامة
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content - Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        {isRefreshing && <LinearProgress />}

        {/* Toolbar for bulk actions */}
        {selectedItems.length > 0 && (
          <Toolbar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08) }}>
            <Typography variant="subtitle1" sx={{ flex: '1 1 100%' }}>
              {selectedItems.length} محدد
            </Typography>
            <Button
              color="error"
              onClick={() => handleBulkAction('delete')}
              startIcon={<DeleteIcon />}
            >
              حذف المحدد
            </Button>
          </Toolbar>
        )}

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < filteredData.length
                  }
                  checked={filteredData.length > 0 && selectedItems.length === filteredData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'tag'}
                  direction={sortBy === 'tag' ? sortOrder : 'asc'}
                  onClick={() => handleSort('tag')}
                >
                  اسم العلامة
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                <TableSortLabel
                  active={sortBy === 'usage'}
                  direction={sortBy === 'usage' ? sortOrder : 'asc'}
                  onClick={() => handleSort('usage')}
                >
                  الاستخدام
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>الحالة</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                <TableSortLabel
                  active={sortBy === 'updatedAt'}
                  direction={sortBy === 'updatedAt' ? sortOrder : 'asc'}
                  onClick={() => handleSort('updatedAt')}
                >
                  آخر تحديث
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isRefreshing ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="rectangular" height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Skeleton variant="rectangular" width={60} height={20} />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={80} height={32} />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <Alert severity="info">لم يتم العثور على علامات. جرب تعديل معايير البحث.</Alert>
                </TableCell>
              </TableRow>
            ) : (
              sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tag) => (
                <TableRow key={tag.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(tag.id)}
                      onChange={() => handleSelectItem(tag.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TagIcon color="primary" />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {tag.tag}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Chip
                      label={`${tag.usage} منتج`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Chip
                      label={tag.status === 'active' ? 'نشط' : 'غير نشط'}
                      size="small"
                      color={tag.status === 'active' ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(tag.updatedAt).toLocaleDateString('ar-SA')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="عرض التفاصيل">
                        <IconButton
                          size="small"
                          onClick={() => handleView(tag)}
                          aria-label="عرض العلامة"
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تعديل العلامة">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(tag)}
                          aria-label="تعديل العلامة"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف العلامة">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(tag)}
                          aria-label="حذف العلامة"
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

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );

  const renderCreateTab = () => (
    <Box>
      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {tagStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
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
                      width: 56,
                      height: 56,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: alpha(theme.palette[stat.color].main, 0.1),
                      color: theme.palette[stat.color].main,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {stat.title}
                  </Typography>
                  <Chip
                    label={stat.change}
                    size="small"
                    color={stat.changeType === 'positive' ? 'success' : 'error'}
                    sx={{ fontSize: '0.75rem' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Filters & Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            الفلاتر والبحث
          </Typography>
          <Button variant="outlined" size="small" onClick={() => {}}>
            مسح الفلاتر
          </Button>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في العلامات"
              size="small"
              placeholder="البحث في العلامات الموجودة..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select value="all" label="الحالة">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع العلامة</InputLabel>
              <Select value="all" label="نوع العلامة">
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="category">فئة</MenuItem>
                <MenuItem value="feature">ميزة</MenuItem>
                <MenuItem value="promotion">عرض</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              تم العثور على 32 علامة
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddSection}
                size="small"
              >
                إضافة قسم
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Tag Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات العلامة
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="اسم العلامة"
                    value={formData.tagName}
                    onChange={(e) => setFormData({ ...formData, tagName: e.target.value })}
                    size="small"
                    helperText="أدخل اسم فريد للعلامة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="وصف العلامة"
                    multiline
                    rows={3}
                    value={formData.tagDescription}
                    onChange={(e) => setFormData({ ...formData, tagDescription: e.target.value })}
                    size="small"
                    helperText="اوصف الغرض والاستخدام من هذه العلامة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="لون العلامة"
                    type="color"
                    value={formData.tagColor}
                    onChange={(e) => setFormData({ ...formData, tagColor: e.target.value })}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    helperText="اختر لون للعلامة"
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
                    label="العلامة نشطة"
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
                    placeholder="تفاصيل الاتصال لإدارة العلامة..."
                    helperText="معلومات الاتصال الاختيارية لإدارة العلامة"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Tag Sections */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">تكوين العلامة</Typography>
                <Chip label={`${sections.length} قسم`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              {sections.map((section) => (
                <Accordion
                  key={section.id}
                  expanded={section.isExpanded}
                  onChange={() => handleToggleExpanded(section.id)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <PolicyIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <TextField
                        value={section.title}
                        onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                        size="small"
                        sx={{ flexGrow: 1, mr: 2 }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="حذف القسم">
                          <Box
                            component="span"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSection(section.id);
                            }}
                            sx={{
                              cursor: 'pointer',
                              p: 0.5,
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                          >
                            <DeleteIcon />
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={section.content}
                      onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                      placeholder="أدخل تفاصيل القسم..."
                      size="small"
                    />
                  </AccordionDetails>
                </Accordion>
              ))}

              {sections.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <PolicyIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    لا توجد أقسام علامة بعد
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    أضف أول قسم علامة للبدء
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddSection}>
                    إضافة أول قسم
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }} role="main" aria-label="إدارة علامات المنتجات" aria-hidden="false" tabIndex={0}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
          إدارة علامات المنتجات
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          إدارة علامات المنتجات وتكوينها لتنظيم أفضل
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="مسار التنقل">
          <Link color="inherit" href="/main-store" aria-label="الذهاب إلى المتجر الرئيسي">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            المتجر الرئيسي
          </Link>
          <Link color="inherit" href="/main-store/catalog" aria-label="الذهاب إلى الكتالوج">
            الكتالوج
          </Link>
          <Typography color="text.primary">إدارة علامات المنتجات</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
              aria-label="تحديث البيانات"
            >
              تحديث
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateSave}
              disabled={loading}
              aria-label="إنشاء علامة جديدة"
            >
              {loading ? 'جاري الإنشاء...' : 'إنشاء علامة'}
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="قائمة العلامات" />
          <Tab label="إنشاء علامة جديدة" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && renderListTab()}
      {activeTab === 1 && renderCreateTab()}

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedTag ? 'تعديل العلامة' : 'إضافة علامة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم العلامة"
                value={selectedTag?.tag || ''}
                onChange={(e) => setSelectedTag({ ...selectedTag, tag: e.target.value })}
                helperText="أدخل اسم علامة فريد"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                multiline
                rows={3}
                value={selectedTag?.description || ''}
                onChange={(e) => setSelectedTag({ ...selectedTag, description: e.target.value })}
                helperText="وصف اختياري لهذه العلامة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={selectedTag?.status || 'active'}
                  label="الحالة"
                  onChange={(e) => setSelectedTag({ ...selectedTag, status: e.target.value })}
                >
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedTag ? 'تحديث' : 'إنشاء'} العلامة
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>
            هل أنت متأكد من أنك تريد حذف هذه العلامة؟ لا يمكن التراجع عن هذا الإجراء.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
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
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل العلامة
          </Typography>
          {selectedTag && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                اسم العلامة
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedTag.tag}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedTag.description || 'لم يتم توفير وصف'}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                الحالة
              </Typography>
              <Chip
                label={selectedTag.status === 'active' ? 'نشط' : 'غير نشط'}
                color={selectedTag.status === 'active' ? 'success' : 'default'}
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary" gutterBottom>
                الاستخدام
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedTag.usage} منتج
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                آخر تحديث
              </Typography>
              <Typography variant="body1">
                {new Date(selectedTag.updatedAt).toLocaleDateString('ar-SA')}
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

export default ProductTagsManager;
