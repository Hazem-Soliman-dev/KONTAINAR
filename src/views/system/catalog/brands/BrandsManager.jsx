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
import { alpha, useTheme } from '@mui/material/styles';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Policy as PolicyIcon,
  CheckCircleOutline as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  Public as PublicIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const BrandsManager = () => {
  const theme = useTheme();

  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    logo: '',
    status: 'Active',
    country: '',
    founded: '',
    contactInfo: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
    },
    categories: [],
    isActive: true,
    featured: false,
    warranty: false,
    supportEmail: '',
    supportPhone: '',
    address: '',
    taxId: '',
    registrationNumber: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  // Mock data for brands
  const brands = [
    {
      id: 1,
      name: 'تيك ساوند',
      description: 'معدات صوتية عالية الجودة وإكسسوارات',
      website: 'https://techsound.com',
      logo: '/api/placeholder/40/40',
      status: 'Active',
      country: 'الولايات المتحدة',
      founded: '2015',
      products: 45,
      revenue: 2500000,
      lastUpdated: '2024-01-15',
      categories: ['الإلكترونيات', 'الصوتيات'],
      socialMedia: {
        facebook: 'https://facebook.com/techsound',
        twitter: 'https://twitter.com/techsound',
        instagram: 'https://instagram.com/techsound',
      },
      featured: true,
      warranty: true,
      supportEmail: 'support@techsound.com',
      supportPhone: '+1-555-0123',
    },
    {
      id: 2,
      name: 'فيت تيك',
      description: 'أجهزة متقدمة لتتبع اللياقة البدنية ومراقبة الصحة',
      website: 'https://fittech.com',
      logo: '/api/placeholder/40/40',
      status: 'Active',
      country: 'ألمانيا',
      founded: '2018',
      products: 32,
      revenue: 1800000,
      lastUpdated: '2024-01-14',
      categories: ['الإلكترونيات', 'اللياقة البدنية'],
      socialMedia: {
        facebook: 'https://facebook.com/fittech',
        twitter: 'https://twitter.com/fittech',
        instagram: 'https://instagram.com/fittech',
      },
      featured: false,
      warranty: true,
      supportEmail: 'support@fittech.com',
      supportPhone: '+49-30-123456',
    },
    {
      id: 3,
      name: 'برو ماستر',
      description: 'معدات قهوة احترافية وإكسسوارات',
      website: 'https://brewmaster.com',
      logo: '/api/placeholder/40/40',
      status: 'Active',
      country: 'إيطاليا',
      founded: '2010',
      products: 28,
      revenue: 1200000,
      lastUpdated: '2024-01-13',
      categories: ['الأجهزة المنزلية', 'المطبخ'],
      socialMedia: {
        facebook: 'https://facebook.com/brewmaster',
        twitter: 'https://twitter.com/brewmaster',
        instagram: 'https://instagram.com/brewmaster',
      },
      featured: true,
      warranty: false,
      supportEmail: 'support@brewmaster.com',
      supportPhone: '+39-06-123456',
    },
    {
      id: 4,
      name: 'جيم تيك',
      description: 'ملحقات وأدوات الألعاب',
      website: 'https://gametech.com',
      logo: '/api/placeholder/40/40',
      status: 'Active',
      country: 'اليابان',
      founded: '2012',
      products: 67,
      revenue: 3200000,
      lastUpdated: '2024-01-12',
      categories: ['الإلكترونيات', 'الألعاب'],
      socialMedia: {
        facebook: 'https://facebook.com/gametech',
        twitter: 'https://twitter.com/gametech',
        instagram: 'https://instagram.com/gametech',
      },
      featured: false,
      warranty: true,
      supportEmail: 'support@gametech.com',
      supportPhone: '+81-3-1234-5678',
    },
    {
      id: 5,
      name: 'باور أب',
      description: 'حلول الشحن اللاسلكي والطاقة',
      website: 'https://powerup.com',
      logo: '/api/placeholder/40/40',
      status: 'Inactive',
      country: 'كوريا الجنوبية',
      founded: '2019',
      products: 15,
      revenue: 450000,
      lastUpdated: '2024-01-11',
      categories: ['الإلكترونيات', 'الطاقة'],
      socialMedia: {
        facebook: 'https://facebook.com/powerup',
        twitter: 'https://twitter.com/powerup',
        instagram: 'https://instagram.com/powerup',
      },
      featured: false,
      warranty: false,
      supportEmail: 'support@powerup.com',
      supportPhone: '+82-2-1234-5678',
    },
  ];

  const countries = [
    'الولايات المتحدة',
    'ألمانيا',
    'إيطاليا',
    'اليابان',
    'كوريا الجنوبية',
    'الصين',
    'المملكة المتحدة',
    'فرنسا',
    'كندا',
    'أستراليا',
  ];

  const steps = [
    'المعلومات الأساسية',
    'هوية العلامة التجارية',
    'معلومات الاتصال',
    'الوسائط الاجتماعية',
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
    if (selectedItems.length === brands.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(brands.map((item) => item.id));
    }
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (brand) => {
    setSelectedBrand(brand);
    setOpenViewDialog(true);
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setFormData({
      ...brand,
      socialMedia: brand.socialMedia || { facebook: '', twitter: '', instagram: '' },
    });
    setOpenDialog(true);
  };

  const handleDelete = (brand) => {
    setSelectedBrand(brand);
    setOpenDeleteDialog(true);
  };

  const handleBulkDelete = () => {
    notify('حذف جماعي', `تم حذف ${selectedItems.length} علامة تجارية`);
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

  const handleSocialMediaChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('حفظ العلامة التجارية', 'تم حفظ العلامة التجارية بنجاح');
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredData = brands.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.website.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCountry = countryFilter === 'all' || item.country === countryFilter;
    return matchesSearch && matchesStatus && matchesCountry;
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

  const renderStatsCards = () => (
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
                <BusinessIcon />
              </Avatar>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              {brands.length}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              إجمالي العلامات التجارية
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
              {brands.filter((b) => b.status === 'Active').length}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              العلامات التجارية النشطة
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
              {brands.reduce((sum, b) => sum + b.products, 0)}
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
                <PublicIcon />
              </Avatar>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
              {new Set(brands.map((b) => b.country)).size}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              عدد البلدان
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderFilters = () => (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            label="البحث في العلامات التجارية"
            size="small"
            placeholder="البحث في العلامات التجارية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <InputLabel>البلد</InputLabel>
            <Select
              value={countryFilter}
              label="البلد"
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              <MenuItem value="all">جميع البلدان</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
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
              setCountryFilter('all');
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
            إضافة علامة تجارية
          </Button>
        </Grid>
      </Grid>
    </Paper>
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
            لم يتم العثور على علامات تجارية
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            جرب تعديل معايير البحث أو أضف علامة تجارية جديدة.
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
              <Button size="small" color="error" onClick={handleBulkDelete}>
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
                    checked={selectedItems.length === brands.length}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < brands.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortBy === 'name' ? sortOrder : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    اسم العلامة التجارية
                  </TableSortLabel>
                </TableCell>
                <TableCell>الوصف</TableCell>
                <TableCell>المنتجات</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'status'}
                    direction={sortBy === 'status' ? sortOrder : 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    الحالة
                  </TableSortLabel>
                </TableCell>
                <TableCell>البلد</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'lastUpdated'}
                    direction={sortBy === 'lastUpdated' ? sortOrder : 'asc'}
                    onClick={() => handleSort('lastUpdated')}
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
                        <Avatar src={item.logo} sx={{ width: 40, height: 40, mr: 2 }}>
                          <BusinessIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.website}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{item.products}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.status} size="small" color={getStatusColor(item.status)} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{item.country}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {item.lastUpdated}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="عرض التفاصيل" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleView(item)}
                            aria-label="عرض تفاصيل العلامة التجارية"
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تعديل العلامة التجارية" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(item)}
                            aria-label="تعديل العلامة التجارية"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="حذف العلامة التجارية" arrow>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(item)}
                            aria-label="حذف العلامة التجارية"
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
    <Box sx={{ p: 3 }} role="main" aria-label="إدارة العلامات التجارية" aria-hidden="false" tabIndex={0}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة العلامات التجارية
        </Typography>
        <Typography variant="body2" color="text.secondary">
          إدارة العلامات التجارية وتنظيم المنتجات بطريقة احترافية.
        </Typography>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mt: 1 }}
          aria-label="مسار التنقل"
        >
          <Link color="inherit" href="/main-store" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            المتجر الرئيسي
          </Link>
          <Link color="inherit" href="/main-store/catalog">
            الكتالوج
          </Link>
          <Typography color="text.primary">العلامات التجارية</Typography>
        </Breadcrumbs>
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
          {selectedBrand ? 'تعديل العلامة التجارية' : 'إضافة علامة تجارية جديدة'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم العلامة التجارية"
                placeholder="أدخل اسم العلامة التجارية"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الموقع الإلكتروني"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                placeholder="أدخل وصف العلامة التجارية"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select
                  label="الحالة"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <MenuItem value="Active">نشط</MenuItem>
                  <MenuItem value="Inactive">غير نشط</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>البلد</InputLabel>
                <Select
                  label="البلد"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="سنة التأسيس"
                placeholder="2020"
                value={formData.founded}
                onChange={(e) => handleInputChange('founded', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رابط الشعار"
                placeholder="https://example.com/logo.png"
                value={formData.logo}
                onChange={(e) => handleInputChange('logo', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                الوسائط الاجتماعية
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="فيسبوك"
                placeholder="https://facebook.com/username"
                value={formData.socialMedia.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="تويتر"
                placeholder="https://twitter.com/username"
                value={formData.socialMedia.twitter}
                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="إنستغرام"
                placeholder="https://instagram.com/username"
                value={formData.socialMedia.instagram}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
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
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.warranty}
                      onChange={(e) => handleInputChange('warranty', e.target.checked)}
                    />
                  }
                  label="ضمان"
                />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(false);
              notify('حفظ العلامة التجارية', 'تم حفظ العلامة التجارية بنجاح');
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
        <DialogTitle>تفاصيل العلامة التجارية</DialogTitle>
        <DialogContent>
          {selectedBrand && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={selectedBrand.logo} sx={{ width: 60, height: 60, mr: 2 }}>
                    <BusinessIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedBrand.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedBrand.website}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedBrand.description}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2">عدد المنتجات</Typography>
                <Typography variant="body2">{selectedBrand.products}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2">الحالة</Typography>
                <Chip
                  label={selectedBrand.status}
                  size="small"
                  color={getStatusColor(selectedBrand.status)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2">البلد</Typography>
                <Typography variant="body2">{selectedBrand.country}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2">سنة التأسيس</Typography>
                <Typography variant="body2">{selectedBrand.founded}</Typography>
              </Grid>
              {selectedBrand.categories && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2">التصنيفات</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    {selectedBrand.categories.map((category, index) => (
                      <Chip key={index} label={category} size="small" />
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف العلامة التجارية</DialogTitle>
        <DialogContent>
          {selectedBrand && (
            <Typography>
              هل أنت متأكد من حذف "{selectedBrand.name}"؟ لا يمكن التراجع عن هذا الإجراء.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button
            color="error"
            onClick={() => {
              setOpenDeleteDialog(false);
              notify('حذف العلامة التجارية', `تم حذف العلامة التجارية "${selectedBrand?.name}"`);
            }}
          >
            حذف
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
  );
};

export default BrandsManager;
