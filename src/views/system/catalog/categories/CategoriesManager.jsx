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
} from '@mui/material';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Inventory as InventoryIcon,
  CheckCircleOutline as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Save as SaveIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Restore as RestoreIcon,
  DeleteForever as DeleteForeverIcon,
  Archive as ArchiveIcon,
  History as HistoryIcon,
  Category as CategoryIcon,
  PhotoCamera as PhotoCameraIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  Tag as TagIcon,
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  Settings as SettingsIcon,
  Language as LanguageIcon,
  Translate as TranslateIcon,
  Analytics as AnalyticsIcon,
  ContentCopy as CopyIcon,
  Schedule as ScheduleIcon,
  Public as PublicIcon,
  Lock as LockIcon,
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
} from '@mui/icons-material';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import { useTheme } from '@mui/material/styles';

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
    title: 'التصنيفات',
  },
];

const CategoriesManager = () => {
  const theme = useTheme();
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentCategory: '',
    status: 'draft',
    featured: false,
    image: null,
    icon: '',
    color: '#1976d2',
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    displayOrder: 0,
    isActive: true,
    showInMenu: true,
    showInFooter: false,
    allowProducts: true,
    allowSubcategories: true,
    seoKeywords: '',
    customFields: [],
    translations: {},
  });
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  // Mock data for active categories
  const activeCategories = [
    {
      id: 1,
      name: 'الإلكترونيات',
      description: 'الأجهزة الإلكترونية والإكسسوارات',
      status: 'active',
      productsCount: 245,
      image: '/images/categories/electronics.jpg',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      parentCategory: '',
      featured: true,
      color: '#1976d2',
      icon: 'smartphone',
      views: 1250,
      clicks: 89,
    },
    {
      id: 2,
      name: 'الملابس',
      description: 'الموضة والملابس',
      status: 'active',
      productsCount: 189,
      image: '/images/categories/clothing.jpg',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      parentCategory: '',
      featured: false,
      color: '#4caf50',
      icon: 'checkroom',
      views: 890,
      clicks: 67,
    },
    {
      id: 3,
      name: 'المنزل والحديقة',
      description: 'أدوات تحسين المنزل ومستلزمات الحديقة',
      status: 'inactive',
      productsCount: 67,
      image: '/images/categories/home.jpg',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
      parentCategory: '',
      featured: false,
      color: '#ff9800',
      icon: 'home',
      views: 650,
      clicks: 23,
    },
    {
      id: 4,
      name: 'الرياضة والهواء الطلق',
      description: 'معدات الرياضة ومعدات الهواء الطلق',
      status: 'active',
      productsCount: 132,
      image: '/images/categories/sports.jpg',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19',
      parentCategory: '',
      featured: true,
      color: '#9c27b0',
      icon: 'sports',
      views: 420,
      clicks: 15,
    },
    {
      id: 5,
      name: 'الكتب والوسائط',
      description: 'الكتب والمجلات والمحتوى الإعلامي',
      status: 'active',
      productsCount: 98,
      image: '/images/categories/books.jpg',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-17',
      parentCategory: '',
      featured: false,
      color: '#f44336',
      icon: 'book',
      views: 320,
      clicks: 12,
    },
  ];

  // Mock data for deleted categories
  const deletedCategories = [
    {
      id: 6,
      name: 'الإلكترونيات القديمة',
      slug: 'old-electronics',
      status: 'Deleted',
      deletedDate: '2024-01-15',
      deletedBy: 'المدير',
      reason: 'إعادة هيكلة التصنيفات',
      priority: 'High',
      views: 1250,
      clicks: 89,
      products: 0,
      originalProducts: 45,
      subcategories: 0,
      originalSubcategories: 3,
      parentCategory: 'الإلكترونيات',
      featured: true,
      position: 1,
      description: 'تصنيف الإلكترونيات السابق قبل إعادة الهيكلة',
      tags: ['إلكترونيات', 'قديم', 'مُعاد هيكلته'],
      lastModified: '2024-01-10',
      canRestore: true,
      restoreDate: null,
      deletionType: 'حذف مؤقت',
      color: '#1976d2',
      icon: 'smartphone',
    },
    {
      id: 7,
      name: 'الهواتف القديمة',
      slug: 'outdated-phones',
      status: 'Deleted',
      deletedDate: '2024-01-14',
      deletedBy: 'المحرر',
      reason: 'توقف المنتجات',
      priority: 'Medium',
      views: 890,
      clicks: 67,
      products: 0,
      originalProducts: 32,
      subcategories: 0,
      originalSubcategories: 2,
      parentCategory: 'الهواتف المحمولة',
      featured: false,
      position: 2,
      description: 'تصنيف لنماذج الهواتف المتوقفة',
      tags: ['هواتف', 'متوقف', 'قديم'],
      lastModified: '2024-01-08',
      canRestore: true,
      restoreDate: null,
      deletionType: 'حذف مؤقت',
      color: '#4caf50',
      icon: 'phone',
    },
  ];

  const steps = [
    'المعلومات الأساسية',
    'تفاصيل التصنيف',
    'SEO والبيانات الوصفية',
    'إعدادات العرض',
    'المراجعة والنشر',
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
    const currentData = activeTab === 0 ? activeCategories : deletedCategories;
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData.map((item) => item.id));
    }
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setOpenViewDialog(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleRestore = (category) => {
    setSelectedCategory(category);
    setOpenRestoreDialog(true);
  };

  const handleBulkDelete = () => {
    notify('حذف جماعي', `تم حذف ${selectedItems.length} فئة`);
    setSelectedItems([]);
  };

  const handleBulkRestore = () => {
    notify('استعادة جماعية', `تم استعادة ${selectedItems.length} فئة`);
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
      notify('حفظ التصنيف', 'تم حفظ التصنيف بنجاح');
    }, 1000);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'Deleted':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getDeletionTypeColor = (deletionType) => {
    switch (deletionType?.toLowerCase()) {
      case 'حذف مؤقت':
        return 'warning';
      case 'حذف نهائي':
        return 'error';
      default:
        return 'default';
    }
  };

  const getCurrentData = () => {
    return activeTab === 0 ? activeCategories : deletedCategories;
  };

  const filteredData = getCurrentData().filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
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

  const renderActiveCategories = () => (
    <>
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
                  <InventoryIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {activeCategories.length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي التصنيفات
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
                  <CheckCircleIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {activeCategories.filter((c) => c.status === 'active').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                التصنيفات النشطة
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
                {activeCategories.reduce((sum, c) => sum + c.productsCount, 0)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المنتجات
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
                'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)',
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
                  <InventoryIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                {activeCategories.filter((c) => c.status === 'inactive').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                التصنيفات غير النشطة
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="البحث في التصنيفات"
              size="small"
              placeholder="البحث في التصنيفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              إعادة تعيين
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
              onClick={() => setOpenDialog(true)}
            >
              إضافة تصنيف
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );

  const renderDeletedCategories = () => (
    <>
      {/* Stats Cards for Deleted */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
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
                  <CategoryIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {deletedCategories.length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                التصنيفات المحذوفة
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
                  <RestoreIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {deletedCategories.filter((item) => item.canRestore).length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                يمكن استعادتها
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
                  <ArchiveIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {deletedCategories.filter((item) => item.deletionType === 'حذف مؤقت').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                محذوفة مؤقتاً
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
                'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)',
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
                  <HistoryIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                {deletedCategories.reduce((sum, item) => sum + item.originalProducts, 0)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المنتجات
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters for Deleted */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            الفلاتر والبحث
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              مسح الفلاتر
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="البحث في التصنيفات المحذوفة أو الأسباب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع الحذف</InputLabel>
              <Select
                value={statusFilter}
                label="نوع الحذف"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="حذف مؤقت">حذف مؤقت</MenuItem>
                <MenuItem value="حذف نهائي">حذف نهائي</MenuItem>
                <MenuItem value="archived">مؤرشف</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>يمكن الاستعادة</InputLabel>
              <Select value="all" label="يمكن الاستعادة" onChange={() => {}}>
                <MenuItem value="all">جميع التصنيفات</MenuItem>
                <MenuItem value="yes">يمكن الاستعادة</MenuItem>
                <MenuItem value="no">لا يمكن الاستعادة</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {sortedData.length} تصنيف موجود
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );

  const renderTable = () => (
    <Paper>
      {loading ? (
        <Box sx={{ p: 2 }}>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height={60} sx={{ mb: 1 }} />
          ))}
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      ) : sortedData.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {activeTab === 0 ? 'لم يتم العثور على تصنيفات' : 'لم يتم العثور على تصنيفات محذوفة'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {activeTab === 0
              ? 'جرب تعديل معايير البحث أو أضف تصنيفاً جديداً.'
              : 'ستظهر التصنيفات المحذوفة هنا للإدارة والاستعادة'}
          </Typography>
        </Box>
      ) : (
        <>
          {/* Toolbar */}
          {selectedItems.length > 0 && (
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                {selectedItems.length} عنصر محدد
              </Typography>
              {activeTab === 0 ? (
                <Button size="small" color="error" onClick={handleBulkDelete}>
                  حذف المحدد
                </Button>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    startIcon={<RestoreIcon />}
                    onClick={handleBulkRestore}
                  >
                    استعادة ({selectedItems.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteForeverIcon />}
                    onClick={handleBulkDelete}
                  >
                    حذف نهائي ({selectedItems.length})
                  </Button>
                </Stack>
              )}
            </Toolbar>
          )}

          {/* Table */}
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
                    {activeTab === 0 ? 'اسم التصنيف' : 'تفاصيل التصنيف'}
                  </TableSortLabel>
                </TableCell>
                {activeTab === 1 && <TableCell>معلومات الحذف</TableCell>}
                <TableCell>المنتجات</TableCell>
                {activeTab === 1 && <TableCell>التصنيفات الفرعية</TableCell>}
                <TableCell>
                  <TableSortLabel
                    active={(sortBy === activeTab) === 0 ? 'updatedAt' : 'deletedDate'}
                    direction={
                      sortBy === (activeTab === 0 ? 'updatedAt' : 'deletedDate') ? sortOrder : 'asc'
                    }
                    onClick={() => handleSort(activeTab === 0 ? 'updatedAt' : 'deletedDate')}
                  >
                    {activeTab === 0 ? 'آخر تحديث' : 'تاريخ الحذف'}
                  </TableSortLabel>
                </TableCell>
                {activeTab === 1 && <TableCell>الأداء</TableCell>}
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
                        <Avatar
                          src={item.image}
                          sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            bgcolor: item.color || 'primary.main',
                          }}
                        >
                          <CategoryIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{item.name}</Typography>
                          {activeTab === 1 && (
                            <>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {item.slug} • {item.parentCategory}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                                {item.tags?.slice(0, 2).map((tag, index) => (
                                  <Chip key={index} label={tag} size="small" variant="outlined" />
                                ))}
                                {item.tags?.length > 2 && (
                                  <Chip
                                    label={`+${item.tags.length - 2}`}
                                    size="small"
                                    variant="outlined"
                                  />
                                )}
                              </Box>
                            </>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    {activeTab === 1 && (
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Chip
                            label={item.deletionType}
                            size="small"
                            color={getDeletionTypeColor(item.deletionType)}
                            icon={<DeleteIcon />}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item.reason}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            بواسطة {item.deletedBy}
                          </Typography>
                        </Box>
                      </TableCell>
                    )}
                    <TableCell>
                      <Typography variant="body2">
                        {activeTab === 0 ? (
                          item.productsCount
                        ) : (
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500, color: 'error.main' }}
                            >
                              0 منتج
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              (كان {item.originalProducts})
                            </Typography>
                          </Box>
                        )}
                      </Typography>
                    </TableCell>
                    {activeTab === 1 && (
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'error.main' }}>
                            0 تصنيف فرعي
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            (كان {item.originalSubcategories})
                          </Typography>
                        </Box>
                      </TableCell>
                    )}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {activeTab === 0 ? item.updatedAt : item.deletedDate}
                      </Typography>
                    </TableCell>
                    {activeTab === 1 && (
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography
                            variant="body2"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <VisibilityIcon fontSize="small" />
                            {item.views?.toLocaleString()}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <TrendingUpIcon fontSize="small" />
                            {item.clicks}
                          </Typography>
                        </Box>
                      </TableCell>
                    )}
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="عرض التفاصيل" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleView(item)}
                            aria-label="عرض تفاصيل التصنيف"
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        {activeTab === 0 ? (
                          <>
                            <Tooltip title="تعديل التصنيف" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(item)}
                                aria-label="تعديل التصنيف"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف التصنيف" arrow>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(item)}
                                aria-label="حذف التصنيف"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            {item.canRestore && (
                              <Tooltip title="استعادة التصنيف" arrow>
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleRestore(item)}
                                >
                                  <RestoreIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="حذف نهائي" arrow>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(item)}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
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
        </>
      )}
    </Paper>
  );

  return (
    <PageContainer title="إدارة التصنيفات" description="إدارة تصنيفات المنتجات">
      <Breadcrumb title="إدارة التصنيفات" items={BCrumb} />

      <Box>
        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="التصنيفات النشطة" icon={<CategoryIcon />} iconPosition="start" />
            <Tab label="التصنيفات المحذوفة" icon={<ArchiveIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Loading State */}
        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Content based on active tab */}
        {activeTab === 0 ? renderActiveCategories() : renderDeletedCategories()}

        {/* Table */}
        {renderTable()}

        {/* Create/Edit Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>{selectedCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="اسم التصنيف"
                  placeholder="أدخل اسم التصنيف"
                  defaultValue={selectedCategory?.name || ''}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="الوصف"
                  placeholder="أدخل وصف التصنيف"
                  multiline
                  rows={3}
                  defaultValue={selectedCategory?.description || ''}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>الحالة</InputLabel>
                  <Select label="الحالة" defaultValue={selectedCategory?.status || 'active'}>
                    <MenuItem value="active">نشط</MenuItem>
                    <MenuItem value="inactive">غير نشط</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpenDialog(false);
                notify('حفظ التصنيف', 'تم حفظ التصنيف بنجاح');
              }}
            >
              حفظ
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Dialog */}
        <Dialog
          open={openViewDialog}
          onClose={() => setOpenViewDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>تفاصيل التصنيف</DialogTitle>
          <DialogContent>
            {selectedCategory && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">{selectedCategory.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {selectedCategory.description}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">عدد المنتجات</Typography>
                  <Typography variant="body2">{selectedCategory.productsCount}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">الحالة</Typography>
                  <Chip
                    label={selectedCategory.status}
                    size="small"
                    color={getStatusColor(selectedCategory.status)}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenViewDialog(false)}>إغلاق</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>حذف التصنيف</DialogTitle>
          <DialogContent>
            {selectedCategory && (
              <Typography>
                هل أنت متأكد من حذف "{selectedCategory.name}"؟ لا يمكن التراجع عن هذا الإجراء.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
            <Button
              color="error"
              onClick={() => {
                setOpenDeleteDialog(false);
                notify('حذف التصنيف', `تم حذف التصنيف "${selectedCategory?.name}"`);
              }}
            >
              حذف
            </Button>
          </DialogActions>
        </Dialog>

        {/* Restore Dialog */}
        <Dialog
          open={openRestoreDialog}
          onClose={() => setOpenRestoreDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <RestoreIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">استعادة التصنيف</Typography>
                <Typography variant="body2" color="text.secondary">
                  استعادة هذا التصنيف إلى الكتالوج
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  سيتم استعادة التصنيف إلى الكتالوج الرئيسي. سيتم استعادة جميع بيانات التصنيف
                  والإعدادات والهيكل.
                </Alert>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="سبب الاستعادة"
                  placeholder="لماذا تقوم باستعادة هذا التصنيف؟"
                  multiline
                  rows={3}
                  helperText="سبب اختياري لاستعادة هذا التصنيف"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>استعادة إلى التصنيف الأب</InputLabel>
                  <Select label="استعادة إلى التصنيف الأب">
                    <MenuItem value="">لا يوجد تصنيف أب (تصنيف جذر)</MenuItem>
                    <MenuItem value="electronics">الإلكترونيات</MenuItem>
                    <MenuItem value="clothing">الملابس</MenuItem>
                    <MenuItem value="books">الكتب</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>الحالة</InputLabel>
                  <Select label="الحالة">
                    <MenuItem value="draft">مسودة</MenuItem>
                    <MenuItem value="active">نشط</MenuItem>
                    <MenuItem value="scheduled">مجدول</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack direction="row" spacing={2}>
                  <FormControlLabel control={<Switch defaultChecked />} label="استعادة المنتجات" />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="استعادة التصنيفات الفرعية"
                  />
                  <FormControlLabel control={<Switch defaultChecked />} label="استعادة الإعدادات" />
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={() => setOpenRestoreDialog(false)} variant="outlined">
              إلغاء
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              disabled={loading}
              startIcon={loading ? <LinearProgress size={20} /> : <RestoreIcon />}
            >
              {loading ? 'جاري الاستعادة...' : 'استعادة التصنيف'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={2500}
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

export default CategoriesManager;
