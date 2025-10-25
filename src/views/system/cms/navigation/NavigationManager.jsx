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
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Stack,
  Zoom,
  LinearProgress,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Menu as MenuIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Navigation as NavigationIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';

const NavigationManager = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Stats data
  const navigationStats = [
    {
      title: 'إجمالي القوائم',
      value: '8',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: MenuIcon,
      change: '+2',
    },
    {
      title: 'القوائم النشطة',
      value: '6',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '75%',
    },
    {
      title: 'عناصر القائمة',
      value: '45',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: NavigationIcon,
      change: '+12',
    },
    {
      title: 'المستخدمون النشطون',
      value: '1,250',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: VisibilityIcon,
      change: '+8%',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح', severity: 'success' });
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const [formData, setFormData] = useState({
    title: 'إدارة التنقل',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    mainMenu: true,
    footerMenu: true,
    mobileMenu: true,
    breadcrumbs: true,
    searchEnabled: true,
    socialLinks: true,
  });

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: 'الرئيسية',
      url: '/',
      icon: 'HomeIcon',
      order: 1,
      isActive: true,
      parentId: null,
      children: [],
    },
    {
      id: 2,
      title: 'المنتجات',
      url: '/products',
      icon: 'ShoppingCartIcon',
      order: 2,
      isActive: true,
      parentId: null,
      children: [
        {
          id: 21,
          title: 'الإلكترونيات',
          url: '/products/electronics',
          icon: 'PhoneIcon',
          order: 1,
          isActive: true,
          parentId: 2,
        },
        {
          id: 22,
          title: 'الملابس',
          url: '/products/clothing',
          icon: 'CheckroomIcon',
          order: 2,
          isActive: true,
          parentId: 2,
        },
      ],
    },
    {
      id: 3,
      title: 'من نحن',
      url: '/about',
      icon: 'InfoIcon',
      order: 3,
      isActive: true,
      parentId: null,
      children: [],
    },
    {
      id: 4,
      title: 'اتصل بنا',
      url: '/contact',
      icon: 'ContactMailIcon',
      order: 4,
      isActive: true,
      parentId: null,
      children: [],
    },
  ]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات التنقل بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddMenuItem = () => {
    const newItem = {
      id: menuItems.length + 1,
      title: 'عنصر جديد',
      url: '/new-item',
      icon: 'LinkIcon',
      order: menuItems.length + 1,
      isActive: true,
      parentId: null,
      children: [],
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleDeleteMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleMenuItemChange = (id, field, value) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleToggleActive = (id) => {
    setMenuItems(
      menuItems.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)),
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
              إدارة التنقل والقوائم
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتخصيص قوائم التنقل والروابط في الموقع لتحسين تجربة المستخدم
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link
                color="inherit"
                href="/main-store"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                المتجر الرئيسي
              </Link>
              <Link color="inherit" href="/main-store/cms">
                إدارة المحتوى
              </Link>
              <Typography color="text.primary">إدارة التنقل</Typography>
            </Breadcrumbs>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={isRefreshing ? null : <RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'جاري التحديث...' : 'تحديث'}
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={loading}
            >
              حفظ التغييرات
            </Button>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {navigationStats.map((stat, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  sx={{
                    background: stat.color,
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                          {stat.title}
                        </Typography>
                        <Chip
                          label={stat.change}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        }}
                      >
                        <stat.icon sx={{ fontSize: 30 }} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Loading State */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: 'info.main' }}>
            <MenuIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات التنقل
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة قوائم التنقل
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في القوائم"
              size="small"
              placeholder="البحث في عناصر القائمة..."
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
              <InputLabel>النوع</InputLabel>
              <Select value="all" label="النوع">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="main">الرئيسية</MenuItem>
                <MenuItem value="footer">التذييل</MenuItem>
                <MenuItem value="mobile">المحمول</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button variant="outlined" size="small" fullWidth>
              إعادة تعيين الفلاتر
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={loading}
                size="small"
              >
                حفظ القوائم
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddMenuItem}
                size="small"
              >
                إضافة عنصر
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Navigation Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات التنقل
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="عنوان الصفحة"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    size="small"
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
                    label="التنقل نشط"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.mainMenu}
                        onChange={(e) => setFormData({ ...formData, mainMenu: e.target.checked })}
                      />
                    }
                    label="القائمة الرئيسية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.footerMenu}
                        onChange={(e) => setFormData({ ...formData, footerMenu: e.target.checked })}
                      />
                    }
                    label="قائمة التذييل"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.mobileMenu}
                        onChange={(e) => setFormData({ ...formData, mobileMenu: e.target.checked })}
                      />
                    }
                    label="قائمة المحمول"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.breadcrumbs}
                        onChange={(e) =>
                          setFormData({ ...formData, breadcrumbs: e.target.checked })
                        }
                      />
                    }
                    label="مسار التنقل"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.searchEnabled}
                        onChange={(e) =>
                          setFormData({ ...formData, searchEnabled: e.target.checked })
                        }
                      />
                    }
                    label="البحث مفعل"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.socialLinks}
                        onChange={(e) =>
                          setFormData({ ...formData, socialLinks: e.target.checked })
                        }
                      />
                    }
                    label="روابط التواصل الاجتماعي"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Menu Items */}
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
                <Typography variant="h6">عناصر القائمة</Typography>
                <Chip label={`${menuItems.length} عنصر`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              {menuItems.map((item) => (
                <Accordion key={item.id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <DragIndicatorIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <TextField
                        value={item.title}
                        onChange={(e) => handleMenuItemChange(item.id, 'title', e.target.value)}
                        size="small"
                        sx={{ flexGrow: 1, mr: 2 }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={item.isActive}
                            onChange={() => handleToggleActive(item.id)}
                          />
                        }
                        label="نشط"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Box>
                  </AccordionSummary>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, gap: 1 }}>
                    <Tooltip title="حذف العنصر">
                      <IconButton size="small" onClick={() => handleDeleteMenuItem(item.id)}>
                            <DeleteIcon fontSize="small" />
                      </IconButton>
                        </Tooltip>
                      </Box>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label="العنوان"
                          value={item.title}
                          onChange={(e) => handleMenuItemChange(item.id, 'title', e.target.value)}
                          size="small"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label="الرابط"
                          value={item.url}
                          onChange={(e) => handleMenuItemChange(item.id, 'url', e.target.value)}
                          size="small"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label="الأيقونة"
                          value={item.icon}
                          onChange={(e) => handleMenuItemChange(item.id, 'icon', e.target.value)}
                          size="small"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                          label="الترتيب"
                          type="number"
                          value={item.order}
                          onChange={(e) =>
                            handleMenuItemChange(item.id, 'order', parseInt(e.target.value))
                          }
                      size="small"
                    />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}

              {menuItems.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <MenuIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    لا توجد عناصر قائمة بعد
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    أضف أول عنصر قائمة للبدء
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddMenuItem}>
                    إضافة أول عنصر
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NavigationManager;
