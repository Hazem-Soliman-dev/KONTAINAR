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
  Stack,
  Avatar,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Switch,
  FormControlLabel,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Fade,
  Zoom,
  Menu,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Drawer,
  List,
  ListItem,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Collections as CollectionsIcon,
  CheckCircleOutline as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Save as SaveIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Public as PublicIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  Language as LanguageIcon,
  Translate as TranslateIcon,
  ContentCopy as CopyIcon,
  Star as StarIcon,
  DragIndicator as DragIcon,
  Visibility as VisibilityIcon,
  ShoppingCart as CartIcon,
  AttachMoney as PriceIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  RestoreFromTrash as RestoreFromTrashIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  Policy as PolicyIcon,
} from '@mui/icons-material';

const CollectionsManager = () => {
  const theme = useTheme();
  
  // State management
  const [activeTab, setActiveTab] = useState(0);
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
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewDrawer, setViewDrawer] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'manual',
    status: 'active',
    scheduleFrom: '',
    scheduleTo: '',
    image: '',
    isActive: true,
    featured: false,
    displayOrder: 0,
    products: [],
    rules: [],
    displaySettings: {
      showTitle: true,
      showDescription: true,
      showImage: true,
      layout: 'grid',
      itemsPerRow: 4,
    },
    seoSettings: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'معلومات المجموعة',
      content: 'أدخل المعلومات الأساسية للمجموعة بما في ذلك الاسم والوصف.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'منتجات المجموعة',
      content: 'أضف المنتجات إلى المجموعة وإدارة ترتيبها.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'عرض المجموعة',
      content: 'تكوين كيفية عرض المجموعة للعملاء.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليلات المجموعة',
      content: 'تكوين تتبع الأداء والتحليلات للمجموعة.',
      isExpanded: false,
    },
  ]);

  // Mock data for collections
  const collections = [
    {
      id: 1,
      name: 'مجموعة الصيف',
      type: 'manual',
      productsCount: 45,
      status: 'active',
      scheduleFrom: '2024-06-01',
      scheduleTo: '2024-08-31',
      updatedAt: '2024-01-15',
      description: 'مجموعة منتجات الصيف المميزة',
      image: '/images/collections/summer.jpg',
      featured: true,
      displayOrder: 1,
    },
    {
      id: 2,
      name: 'أساسيات الشتاء',
      type: 'rule',
      productsCount: 32,
      status: 'active',
      scheduleFrom: '2024-12-01',
      scheduleTo: '2025-02-28',
      updatedAt: '2024-01-14',
      description: 'منتجات أساسية لفصل الشتاء',
      image: '/images/collections/winter.jpg',
      featured: false,
      displayOrder: 2,
    },
    {
      id: 3,
      name: 'أدوات التقنية',
      type: 'manual',
      productsCount: 28,
      status: 'inactive',
      scheduleFrom: '2024-03-01',
      scheduleTo: '2024-05-31',
      updatedAt: '2024-01-13',
      description: 'أحدث الأدوات التقنية',
      image: '/images/collections/tech.jpg',
      featured: false,
      displayOrder: 3,
    },
    {
      id: 4,
      name: 'المنزل والحديقة',
      type: 'rule',
      productsCount: 67,
      status: 'active',
      scheduleFrom: '2024-01-01',
      scheduleTo: '2024-12-31',
      updatedAt: '2024-01-12',
      description: 'منتجات للمنزل والحديقة',
      image: '/images/collections/home.jpg',
      featured: true,
      displayOrder: 4,
    },
    {
      id: 5,
      name: 'اتجاهات الموضة',
      type: 'manual',
      productsCount: 89,
      status: 'active',
      scheduleFrom: '2024-02-01',
      scheduleTo: '2024-04-30',
      updatedAt: '2024-01-11',
      description: 'أحدث اتجاهات الموضة',
      image: '/images/collections/fashion.jpg',
      featured: false,
      displayOrder: 5,
    },
  ];

  const steps = [
    'معلومات المجموعة',
    'إعدادات المنتجات',
    'إعدادات العرض',
    'التحليلات والمراجعة',
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

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === collections.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(collections.map((item) => item.id));
    }
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (collection) => {
    setSelectedCollection(collection);
    setViewDrawer(true);
  };

  const handleEdit = (collection) => {
    setSelectedCollection(collection);
    setFormData({
      ...collection,
      displaySettings: collection.displaySettings || {
        showTitle: true,
        showDescription: true,
        showImage: true,
        layout: 'grid',
        itemsPerRow: 4,
      },
      seoSettings: collection.seoSettings || {
        metaTitle: '',
        metaDescription: '',
        keywords: [],
      },
    });
    setOpenDialog(true);
  };

  const handleDelete = (collection) => {
    setSelectedCollection(collection);
    setOpenDeleteDialog(true);
  };

  const handleBulkDelete = () => {
    notify('حذف جماعي', `تم حذف ${selectedItems.length} مجموعة`);
    setSelectedItems([]);
  };

  const handleBulkExport = () => {
    notify('تصدير جماعي', `تم تصدير ${selectedItems.length} مجموعة`);
    setSelectedItems([]);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    setLoading(false);
    setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح', severity: 'success' });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('حفظ المجموعة', 'تم حفظ المجموعة بنجاح');
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'manual':
        return 'primary';
      case 'rule':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const filteredData = collections.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
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

  const renderStatsCards = () => (
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
                <CollectionsIcon />
              </Avatar>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              {collections.length}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              إجمالي المجموعات
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
                <CheckCircleIcon />
              </Avatar>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
              {collections.filter((c) => c.status === 'active').length}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              المجموعات النشطة
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
                <ScheduleIcon />
              </Avatar>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
              {collections.filter((c) => c.status === 'active' && c.scheduleFrom <= new Date().toISOString().split('T')[0] && c.scheduleTo >= new Date().toISOString().split('T')[0]).length}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              مجدولة الآن
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            p: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)',
            border: '1px solid rgba(156, 39, 176, 0.2)',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(156, 39, 176, 0.15)',
            },
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, mr: 2 }}>
                <AnalyticsIcon />
              </Avatar>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
              {Math.round(collections.reduce((sum, c) => sum + c.productsCount, 0) / collections.length)}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              متوسط المنتجات
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderFilters = () => (
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            placeholder="البحث في المجموعات..."
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
            <InputLabel>النوع</InputLabel>
            <Select
              value={typeFilter}
              label="النوع"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">جميع الأنواع</MenuItem>
              <MenuItem value="manual">يدوي</MenuItem>
              <MenuItem value="rule">قائم على القواعد</MenuItem>
            </Select>
          </FormControl>
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
            {filteredData.length} مجموعة موجودة
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderTable = () => (
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
            onClick={handleBulkExport}
            sx={{ mr: 1 }}
          >
            تصدير
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleBulkDelete}
          >
            حذف
          </Button>
        </Toolbar>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedItems.length > 0 && selectedItems.length < collections.length
                }
                checked={
                  collections.length > 0 && selectedItems.length === collections.length
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
                اسم المجموعة
              </TableSortLabel>
            </TableCell>
            <TableCell>النوع</TableCell>
            <TableCell>المنتجات</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>الجدولة</TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>آخر تحديث</TableCell>
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
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
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
                <Alert severity="info">لم يتم العثور على مجموعات</Alert>
              </TableCell>
            </TableRow>
          ) : (
            sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((collection) => (
                <TableRow key={collection.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(collection.id)}
                      onChange={() => handleSelectItem(collection.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={collection.image} sx={{ width: 40, height: 40, mr: 2 }}>
                        <CollectionsIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {collection.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {collection.description}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={collection.type === 'manual' ? 'يدوي' : 'قائم على القواعد'}
                      size="small"
                      color={getTypeColor(collection.type)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{collection.productsCount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={collection.status === 'active' ? 'نشط' : 'غير نشط'}
                      size="small"
                      color={getStatusColor(collection.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {collection.scheduleFrom} - {collection.scheduleTo}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {collection.updatedAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="عرض التفاصيل">
                        <IconButton
                          size="small"
                          onClick={() => handleView(collection)}
                          aria-label="عرض المجموعة"
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تعديل المجموعة">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(collection)}
                          aria-label="تعديل المجموعة"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف المجموعة">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(collection)}
                          aria-label="حذف المجموعة"
                          color="error"
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
  );

  return (
    <Box sx={{ p: 3 }} role="main" aria-label="إدارة المجموعات" aria-hidden="false" tabIndex={0}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة المجموعات
        </Typography>
        <Typography variant="body2" color="text.secondary">
          إدارة مجموعات المنتجات مع الاختيار اليدوي أو القائم على القواعد.
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }} aria-label="مسار التنقل">
          <Link color="inherit" href="/main-store" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            المتجر الرئيسي
          </Link>
          <Link color="inherit" href="/main-store/catalog">
            الكتالوج
          </Link>
          <Typography color="text.primary">المجموعات</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              تحديث
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              إضافة مجموعة
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Loading State */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Stats Cards */}
      {renderStatsCards()}

      {/* Filters */}
      {renderFilters()}

      {/* Table */}
      {renderTable()}

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCollection ? 'تعديل المجموعة' : 'إضافة مجموعة جديدة'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم المجموعة"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                helperText="أدخل اسماً وصفياً للمجموعة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                helperText="اوصف الغرض من المجموعة ومحتواها"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>النوع</InputLabel>
                <Select
                  value={formData.type}
                  label="النوع"
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <MenuItem value="manual">يدوي</MenuItem>
                  <MenuItem value="rule">قائم على القواعد</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={formData.status}
                  label="الحالة"
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ البداية"
                value={formData.scheduleFrom}
                onChange={(e) => handleInputChange('scheduleFrom', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ النهاية"
                value={formData.scheduleTo}
                onChange={(e) => handleInputChange('scheduleTo', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    />
                  }
                  label="نشط"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                    />
                  }
                  label="مميز"
                />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button onClick={handleSave} variant="contained">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف المجموعة</DialogTitle>
        <DialogContent>
          <Typography>
            هل أنت متأكد من حذف "{selectedCollection?.name}"؟ لا يمكن التراجع عن هذا الإجراء.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              notify('حذف المجموعة', `تم حذف المجموعة "${selectedCollection?.name}"`);
            }}
            color="error"
            variant="contained"
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
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            تفاصيل المجموعة
          </Typography>
          {selectedCollection && (
            <List>
              <ListItem>
                <ListItemText primary="الاسم" secondary={selectedCollection.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="النوع" secondary={selectedCollection.type === 'manual' ? 'يدوي' : 'قائم على القواعد'} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="عدد المنتجات"
                  secondary={selectedCollection.productsCount}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="الحالة" secondary={selectedCollection.status === 'active' ? 'نشط' : 'غير نشط'} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="الجدولة"
                  secondary={`${selectedCollection.scheduleFrom} - ${selectedCollection.scheduleTo}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="آخر تحديث" secondary={selectedCollection.updatedAt} />
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
    </Box>
  );
};

export default CollectionsManager;
