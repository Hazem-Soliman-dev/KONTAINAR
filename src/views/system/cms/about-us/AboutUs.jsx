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
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Stack,
  Zoom,
  LinearProgress,
  Fade,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Public as PublicIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const AboutUs = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Stats data
  const aboutStats = [
    {
      title: 'سنوات الخبرة',
      value: '15+',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: BusinessIcon,
      change: '+2',
    },
    {
      title: 'العملاء الراضون',
      value: '10,000+',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: PeopleIcon,
      change: '98%',
    },
    {
      title: 'المنتجات المباعة',
      value: '50,000+',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: TrendingUpIcon,
      change: '+15%',
    },
    {
      title: 'التقييم العام',
      value: '4.9/5',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: StarIcon,
      change: '+0.2',
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
    title: 'من نحن',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    companyName: 'شركة كونتينار',
    foundedYear: '2009',
    headquarters: 'الرياض، المملكة العربية السعودية',
    mission: 'نحن ملتزمون بتقديم أفضل المنتجات والخدمات لعملائنا',
    vision: 'أن نكون الرائدين في مجال التجارة الإلكترونية في المنطقة',
    values: 'الجودة، الشفافية، الابتكار، خدمة العملاء',
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'قصة نجاحنا',
      content:
        'بدأت رحلتنا في عام 2009 برؤية واضحة لتقديم أفضل المنتجات والخدمات للعملاء. على مر السنين، تطورنا من متجر صغير إلى منصة تجارة إلكترونية رائدة في المنطقة.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'فريقنا المتميز',
      content:
        'نفتخر بفريق عمل متميز من الخبراء والمتخصصين الذين يعملون بجد لتقديم أفضل التجارب للعملاء. فريقنا متنوع ومتعدد الثقافات، مما يضيف قيمة كبيرة لخدماتنا.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'التزامنا بالجودة',
      content:
        'نلتزم بأعلى معايير الجودة في جميع منتجاتنا وخدماتنا. نحن نعمل باستمرار على تحسين عملياتنا وتطوير منتجاتنا لتلبية احتياجات عملائنا المتغيرة.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'الابتكار والتطوير',
      content:
        'نؤمن بقوة الابتكار والتطوير المستمر. نستثمر في أحدث التقنيات والحلول المبتكرة لتقديم تجربة تسوق فريدة ومتميزة لعملائنا.',
      isExpanded: false,
    },
  ]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث صفحة من نحن بنجاح',
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
              إدارة صفحة من نحن
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتخصيص صفحة من نحن لعرض معلومات الشركة وقيمها ورؤيتها
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
              <Typography color="text.primary">من نحن</Typography>
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
          {aboutStats.map((stat, index) => (
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
            <InfoIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات صفحة من نحن
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة محتوى صفحة من نحن
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الأقسام"
              size="small"
              placeholder="البحث في أقسام من نحن..."
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
              <InputLabel>اللغة</InputLabel>
              <Select value="ar" label="اللغة">
                <MenuItem value="ar">العربية</MenuItem>
                <MenuItem value="en">الإنجليزية</MenuItem>
                <MenuItem value="fr">الفرنسية</MenuItem>
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
                حفظ الصفحة
              </Button>
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
        {/* About Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات صفحة من نحن
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
                    label="الصفحة نشطة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="اسم الشركة"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="سنة التأسيس"
                    value={formData.foundedYear}
                    onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="المقر الرئيسي"
                    value={formData.headquarters}
                    onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الرسالة"
                    multiline
                    rows={2}
                    value={formData.mission}
                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                    size="small"
                    placeholder="رسالة الشركة..."
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الرؤية"
                    multiline
                    rows={2}
                    value={formData.vision}
                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    size="small"
                    placeholder="رؤية الشركة..."
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="القيم"
                    multiline
                    rows={2}
                    value={formData.values}
                    onChange={(e) => setFormData({ ...formData, values: e.target.value })}
                    size="small"
                    placeholder="قيم الشركة..."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* About Sections */}
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
                <Typography variant="h6">أقسام صفحة من نحن</Typography>
                <Chip label={`${sections.length} أقسام`} color="primary" size="small" />
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
                      <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
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
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              cursor: 'pointer',
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
                      placeholder="أدخل محتوى القسم..."
                      size="small"
                    />
                  </AccordionDetails>
                </Accordion>
              ))}

              {sections.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <InfoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    لا توجد أقسام بعد
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    أضف أول قسم لصفحة من نحن للبدء
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

export default AboutUs;
