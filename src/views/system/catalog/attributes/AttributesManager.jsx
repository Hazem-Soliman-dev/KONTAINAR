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
  Category as CategoryIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/system',
    title: 'الرئيسية',
  },
  {
    to: '/system/catalog',
    title: 'الكتالوج',
  },
  {
    title: 'الخصائص',
  },
];

const AttributesManager = () => {
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
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [formData, setFormData] = useState({
    title: 'إنشاء خاصية جديدة',
    content: '',
    isActive: true,
    attributeName: '',
    attributeType: 'text',
    attributeDescription: '',
    contactInfo: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'معلومات الخاصية',
      content: 'أدخل المعلومات الأساسية للخاصية بما في ذلك الاسم والنوع.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'قيم الخاصية',
      content: 'حدد القيم المحتملة للخاصية.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'التحقق من الخاصية',
      content: 'قم بإعداد قواعد التحقق للخاصية.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'عرض الخاصية',
      content: 'قم بتكوين كيفية عرض الخاصية للعملاء.',
      isExpanded: false,
    },
  ]);

  // Mock data for attributes
  const attributesData = [
    {
      id: 1,
      name: 'اللون',
      type: 'select',
      valuesCount: 12,
      isActive: true,
      updatedAt: '2024-01-15',
      description: 'تغيرات لون المنتج',
    },
    {
      id: 2,
      name: 'الحجم',
      type: 'select',
      valuesCount: 8,
      isActive: true,
      updatedAt: '2024-01-14',
      description: 'خيارات حجم المنتج',
    },
    {
      id: 3,
      name: 'المادة',
      type: 'text',
      valuesCount: 0,
      isActive: true,
      updatedAt: '2024-01-13',
      description: 'معلومات مادة المنتج',
    },
    {
      id: 4,
      name: 'الوزن',
      type: 'number',
      valuesCount: 0,
      isActive: false,
      updatedAt: '2024-01-12',
      description: 'وزن المنتج بالجرام',
    },
    {
      id: 5,
      name: 'العلامة التجارية',
      type: 'select',
      valuesCount: 15,
      isActive: true,
      updatedAt: '2024-01-11',
      description: 'معلومات العلامة التجارية للمنتج',
    },
  ];

  // Mock data for attribute stats
  const attributeStats = [
    {
      title: 'إجمالي الخصائص',
      value: attributesData.length.toString(),
      icon: CategoryIcon,
      color: 'primary',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'الأنواع المستخدمة',
      value: '8',
      icon: SettingsIcon,
      color: 'secondary',
      change: '+3',
      changeType: 'positive',
    },
    {
      title: 'متوسط القيم/الخاصية',
      value: '7.0',
      icon: TrendingUpIcon,
      color: 'success',
      change: '+2.1',
      changeType: 'positive',
    },
    {
      title: 'محدث اليوم',
      value: '3',
      icon: AnalyticsIcon,
      color: 'warning',
      change: '+4',
      changeType: 'positive',
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
    notify(`${action} الخصائص`, `${selectedItems.length} خاصية`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (attribute) => {
    setSelectedAttribute(attribute);
    setViewDrawer(true);
  };

  const handleEdit = (attribute) => {
    setSelectedAttribute(attribute);
    setOpenDialog(true);
  };

  const handleDelete = (attribute) => {
    setSelectedAttribute(attribute);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الخاصية', selectedAttribute ? 'تم تحديث الخاصية' : 'تم إنشاء الخاصية');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الخاصية', 'تم حذف الخاصية');
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('تحديث', 'تم تحديث البيانات');
    }, 1000);
  };

  const handleCreateSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم إنشاء الخاصية بنجاح',
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

  const filteredData = attributesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && item.isActive) ||
      (statusFilter === 'inactive' && !item.isActive);
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

  const renderListTab = () => (
    <Box>
      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {attributeStats.map((stat, index) => {
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
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setTypeFilter('all');
            }}
          >
            مسح الفلاتر
          </Button>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الخصائص"
              size="small"
              placeholder="البحث في خصائص المنتجات..."
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
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع الخاصية</InputLabel>
              <Select
                value={typeFilter}
                label="نوع الخاصية"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="text">نص</MenuItem>
                <MenuItem value="number">رقم</MenuItem>
                <MenuItem value="select">اختيار</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              تم العثور على {filteredData.length} خاصية
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<FilterIcon />} onClick={() => {}} size="small">
                فلتر
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            قائمة الخصائص
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
            <Alert severity="info">لم يتم العثور على خصائص. أنشئ أول خاصية للبدء.</Alert>
          </Box>
        ) : (
          <>
            <Table>
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
                      الاسم
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
                  <TableCell>عدد القيم</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'isActive'}
                      direction={sortBy === 'isActive' ? sortOrder : 'asc'}
                      onClick={() => handleSort('isActive')}
                    >
                      الحالة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'updatedAt'}
                      direction={sortBy === 'updatedAt' ? sortOrder : 'asc'}
                      onClick={() => handleSort('updatedAt')}
                    >
                      آخر تحديث
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Box>
                            <Typography variant="subtitle2">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={item.type} size="small" color="primary" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.valuesCount} قيمة</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.isActive ? 'نشط' : 'غير نشط'}
                          size="small"
                          color={item.isActive ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.updatedAt}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleView(item)}
                              aria-label="عرض تفاصيل الخاصية"
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الخاصية" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="تعديل الخاصية"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الخاصية" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
                              aria-label="حذف الخاصية"
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
    </Box>
  );

  const renderCreateTab = () => (
    <Box>
      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {attributeStats.map((stat, index) => {
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
              label="البحث في الخصائص"
              size="small"
              placeholder="البحث في الخصائص الموجودة..."
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
              <InputLabel>نوع الخاصية</InputLabel>
              <Select value="all" label="نوع الخاصية">
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="text">نص</MenuItem>
                <MenuItem value="number">رقم</MenuItem>
                <MenuItem value="select">اختيار</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              تم العثور على 24 خاصية
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
        {/* Attribute Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات الخاصية
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="اسم الخاصية"
                    value={formData.attributeName}
                    onChange={(e) => setFormData({ ...formData, attributeName: e.target.value })}
                    size="small"
                    helperText="أدخل اسم فريد للخاصية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>نوع الخاصية</InputLabel>
                    <Select
                      value={formData.attributeType}
                      label="نوع الخاصية"
                      onChange={(e) => setFormData({ ...formData, attributeType: e.target.value })}
                    >
                      <MenuItem value="text">نص</MenuItem>
                      <MenuItem value="number">رقم</MenuItem>
                      <MenuItem value="select">اختيار</MenuItem>
                      <MenuItem value="multiselect">اختيار متعدد</MenuItem>
                      <MenuItem value="boolean">منطقي</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="وصف الخاصية"
                    multiline
                    rows={3}
                    value={formData.attributeDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, attributeDescription: e.target.value })
                    }
                    size="small"
                    helperText="اوصف الغرض والاستخدام من هذه الخاصية"
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
                    label="الخاصية نشطة"
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
                    placeholder="تفاصيل الاتصال لإدارة الخاصية..."
                    helperText="معلومات الاتصال الاختيارية لإدارة الخاصية"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Attribute Sections */}
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
                <Typography variant="h6">تكوين الخاصية</Typography>
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
                            component="div"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                              cursor: 'pointer',
                              borderRadius: '50%',
                              '&:hover': {
                                backgroundColor: 'action.hover',
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSection(section.id);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
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
                    لا توجد أقسام خاصية بعد
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    أضف أول قسم خاصية للبدء
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
    <PageContainer title="إدارة الخصائص" description="إدارة خصائص منتجات المتجر">
      <Breadcrumb title="إدارة الخصائص" items={BCrumb} />

      <Box>
        {/* Tabs */}
        <Paper sx={{ mb: 3 }} aria-hidden="false">
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="تبويبات إدارة الخصائص"
            aria-hidden="false"
          >
            <Tab label="قائمة الخصائص" aria-hidden="false" tabIndex={0} />
            <Tab label="إنشاء خاصية جديدة" aria-hidden="false" tabIndex={0} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && renderListTab()}
        {activeTab === 1 && renderCreateTab()}

        {/* Edit Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">
            {selectedAttribute ? 'تعديل الخاصية' : 'إنشاء خاصية جديدة'}
          </DialogTitle>
          <DialogContent id="dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="اسم الخاصية"
                  placeholder="أدخل اسم الخاصية"
                  defaultValue={selectedAttribute?.name || ''}
                  aria-label="اسم الخاصية"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>النوع</InputLabel>
                  <Select
                    label="النوع"
                    defaultValue={selectedAttribute?.type || 'text'}
                    aria-label="نوع الخاصية"
                  >
                    <MenuItem value="text">نص</MenuItem>
                    <MenuItem value="number">رقم</MenuItem>
                    <MenuItem value="select">اختيار</MenuItem>
                    <MenuItem value="multiselect">اختيار متعدد</MenuItem>
                    <MenuItem value="boolean">منطقي</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="الوصف"
                  placeholder="أدخل وصف الخاصية"
                  defaultValue={selectedAttribute?.description || ''}
                  aria-label="وصف الخاصية"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={<Switch defaultChecked={selectedAttribute?.isActive || true} />}
                  label="نشط"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} aria-label="إلغاء العملية">
              إلغاء
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              startIcon={<SaveIcon />}
              aria-label="حفظ الخاصية"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ الخاصية'}
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
          <DialogTitle id="delete-dialog-title">حذف الخاصية</DialogTitle>
          <DialogContent id="delete-dialog-description">
            <Typography variant="body2" sx={{ mb: 2 }}>
              هل أنت متأكد من أنك تريد حذف هذه الخاصية؟
            </Typography>
            {selectedAttribute && (
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2">{selectedAttribute.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  النوع: {selectedAttribute.type} | القيم: {selectedAttribute.valuesCount}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} aria-label="إلغاء الحذف">
              إلغاء
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
              disabled={loading}
              aria-label="تأكيد حذف الخاصية"
            >
              {loading ? 'جاري الحذف...' : 'حذف الخاصية'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Drawer */}
        <Drawer
          anchor="right"
          open={viewDrawer}
          onClose={() => setViewDrawer(false)}
          sx={{ '& .MuiDrawer-paper': { width: 500 } }}
          aria-labelledby="drawer-title"
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom id="drawer-title">
              تفاصيل الخاصية
            </Typography>
            {selectedAttribute && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CategoryIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="h6">{selectedAttribute.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedAttribute.description}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                <List dense>
                  <ListItem>
                    <ListItemText primary="النوع" secondary={selectedAttribute.type} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="عدد القيم" secondary={selectedAttribute.valuesCount} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="الحالة"
                      secondary={selectedAttribute.isActive ? 'نشط' : 'غير نشط'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="آخر تحديث" secondary={selectedAttribute.updatedAt} />
                  </ListItem>
                </List>
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
    </PageContainer>
  );
};

export default AttributesManager;
