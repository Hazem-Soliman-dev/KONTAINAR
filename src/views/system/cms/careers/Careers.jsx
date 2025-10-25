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
  Switch,
  FormControlLabel,
  Avatar,
  Stack,
  Zoom,
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

const Careers = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCareer, setSelectedCareer] = useState(null);

  // Stats data
  const careersStats = [
    {
      title: 'إجمالي الوظائف',
      value: '45',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: WorkIcon,
      change: '+8',
    },
    {
      title: 'الوظائف النشطة',
      value: '38',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '84%',
    },
    {
      title: 'الطلبات المستلمة',
      value: '1,250',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: TrendingUpIcon,
      change: '+25%',
    },
    {
      title: 'معدل التوظيف',
      value: '92.5%',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: EmojiEventsIcon,
      change: '+5.2%',
    },
  ];

  // Mock data for careers
  const careersData = [
    {
      id: 1,
      title: 'مطور ويب متقدم',
      department: 'التطوير',
      location: 'الرياض',
      type: 'دوام كامل',
      experience: '3-5 سنوات',
      salary: '15,000 - 20,000 ريال',
      status: 'active',
      applications: 45,
      views: 1250,
      createdAt: '2024-01-15',
      deadline: '2024-02-15',
      description:
        'نبحث عن مطور ويب متقدم للانضمام إلى فريق التطوير لدينا. يجب أن يكون لديه خبرة في React, Node.js, و MongoDB.',
      requirements: [
        'خبرة 3-5 سنوات في تطوير الويب',
        'إتقان React, Node.js, MongoDB',
        'خبرة في Git و Agile',
        'شهادة جامعية في علوم الحاسوب أو ما يعادلها',
      ],
      benefits: ['راتب تنافسي', 'تأمين صحي شامل', 'إجازة سنوية 30 يوم', 'بيئة عمل مرنة'],
      tags: ['تطوير', 'ويب', 'React', 'Node.js'],
      isFeatured: true,
      isUrgent: false,
    },
    {
      id: 2,
      title: 'مصمم جرافيك',
      department: 'التصميم',
      location: 'جدة',
      type: 'دوام جزئي',
      experience: '2-3 سنوات',
      salary: '8,000 - 12,000 ريال',
      status: 'active',
      applications: 23,
      views: 890,
      createdAt: '2024-01-18',
      deadline: '2024-02-20',
      description:
        'نبحث عن مصمم جرافيك مبدع للانضمام إلى فريق التصميم لدينا. يجب أن يكون لديه خبرة في Adobe Creative Suite.',
      requirements: [
        'خبرة 2-3 سنوات في التصميم الجرافيكي',
        'إتقان Adobe Creative Suite',
        'خبرة في تصميم الشعارات والهويات البصرية',
        'شهادة في التصميم الجرافيكي أو ما يعادلها',
      ],
      benefits: ['راتب تنافسي', 'تأمين صحي', 'إجازة سنوية 25 يوم', 'بيئة عمل إبداعية'],
      tags: ['تصميم', 'جرافيك', 'Adobe', 'إبداع'],
      isFeatured: false,
      isUrgent: true,
    },
    {
      id: 3,
      title: 'مدير تسويق رقمي',
      department: 'التسويق',
      location: 'الدمام',
      type: 'دوام كامل',
      experience: '5-7 سنوات',
      salary: '18,000 - 25,000 ريال',
      status: 'draft',
      applications: 0,
      views: 0,
      createdAt: '2024-01-20',
      deadline: '2024-03-01',
      description: 'نبحث عن مدير تسويق رقمي محترف لقيادة استراتيجية التسويق الرقمي لدينا.',
      requirements: [
        'خبرة 5-7 سنوات في التسويق الرقمي',
        'إتقان Google Ads, Facebook Ads',
        'خبرة في تحليل البيانات',
        'شهادة في التسويق الرقمي',
      ],
      benefits: ['راتب تنافسي', 'تأمين صحي شامل', 'إجازة سنوية 30 يوم', 'مكافآت الأداء'],
      tags: ['تسويق', 'رقمي', 'إدارة', 'تحليل'],
      isFeatured: false,
      isUrgent: false,
    },
  ];

  const departments = [
    'التطوير',
    'التصميم',
    'التسويق',
    'المبيعات',
    'الموارد البشرية',
    'المالية',
    'الدعم الفني',
    'إدارة المنتج',
    'أخرى',
  ];

  const jobTypes = ['دوام كامل', 'دوام جزئي', 'عقد مؤقت', 'عمل عن بُعد', 'تدريب', 'استشارة'];

  const statuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'paused', label: 'معلق', color: 'warning' },
    { value: 'closed', label: 'مغلق', color: 'error' },
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
    title: 'الوظائف المتاحة',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    showSalary: true,
    showBenefits: true,
    showRequirements: true,
    showDeadline: true,
    allowApplications: true,
    requireResume: true,
    requireCoverLetter: false,
    autoApprove: false,
    requireInterview: true,
    maxApplications: 100,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات الوظائف بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddCareer = () => {
    setOpenDialog(true);
  };

  const handleDeleteCareer = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف الوظيفة بنجاح',
      severity: 'success',
    });
  };

  const handleViewCareer = (career) => {
    setSelectedCareer(career);
    setOpenDrawer(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    const statusObj = statuses.find((s) => s.value === status);
    return statusObj ? statusObj.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusObj = statuses.find((s) => s.value === status);
    return statusObj ? statusObj.label : 'غير محدد';
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
              إدارة الوظائف
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتخصيص الوظائف المتاحة والفرص الوظيفية
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
              <Typography color="text.primary">الوظائف</Typography>
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
          {careersStats.map((stat, index) => (
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
            <WorkIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات الوظائف
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة الوظائف المتاحة
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الوظائف"
              size="small"
              placeholder="البحث في الوظائف..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select value="all" label="الحالة">
                <MenuItem value="all">الكل</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>القسم</InputLabel>
              <Select value="all" label="القسم">
                <MenuItem value="all">الكل</MenuItem>
                {departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
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
                حفظ الإعدادات
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddCareer}
                size="small"
              >
                إضافة وظيفة
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Careers Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات الوظائف
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
                    label="الوظائف نشطة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showSalary}
                        onChange={(e) => setFormData({ ...formData, showSalary: e.target.checked })}
                      />
                    }
                    label="عرض الراتب"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showBenefits}
                        onChange={(e) =>
                          setFormData({ ...formData, showBenefits: e.target.checked })
                        }
                      />
                    }
                    label="عرض المميزات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showRequirements}
                        onChange={(e) =>
                          setFormData({ ...formData, showRequirements: e.target.checked })
                        }
                      />
                    }
                    label="عرض المتطلبات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showDeadline}
                        onChange={(e) =>
                          setFormData({ ...formData, showDeadline: e.target.checked })
                        }
                      />
                    }
                    label="عرض الموعد النهائي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowApplications}
                        onChange={(e) =>
                          setFormData({ ...formData, allowApplications: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالتقديم"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireResume}
                        onChange={(e) =>
                          setFormData({ ...formData, requireResume: e.target.checked })
                        }
                      />
                    }
                    label="طلب السيرة الذاتية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireCoverLetter}
                        onChange={(e) =>
                          setFormData({ ...formData, requireCoverLetter: e.target.checked })
                        }
                      />
                    }
                    label="طلب خطاب التغطية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoApprove}
                        onChange={(e) =>
                          setFormData({ ...formData, autoApprove: e.target.checked })
                        }
                      />
                    }
                    label="الموافقة التلقائية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireInterview}
                        onChange={(e) =>
                          setFormData({ ...formData, requireInterview: e.target.checked })
                        }
                      />
                    }
                    label="طلب مقابلة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الحد الأقصى للطلبات"
                    type="number"
                    value={formData.maxApplications}
                    onChange={(e) =>
                      setFormData({ ...formData, maxApplications: parseInt(e.target.value) })
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Careers Table */}
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
                <Typography variant="h6">قائمة الوظائف</Typography>
                <Chip label={`${careersData.length} وظيفة`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>الوظيفة</TableCell>
                    <TableCell>القسم</TableCell>
                    <TableCell>الموقع</TableCell>
                    <TableCell>النوع</TableCell>
                    <TableCell>الراتب</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>الطلبات</TableCell>
                    <TableCell align="right">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {careersData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((career) => (
                      <TableRow key={career.id} hover>
                        <TableCell>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {career.title}
                              </Typography>
                              {career.isFeatured && (
                                <Chip label="مميز" size="small" color="primary" />
                              )}
                              {career.isUrgent && <Chip label="عاجل" size="small" color="error" />}
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {career.description.substring(0, 100)}...
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={career.department} size="small" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{career.location}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{career.type}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {career.salary}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(career.status)}
                        size="small"
                            color={getStatusColor(career.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {career.applications}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton size="small" onClick={() => handleViewCareer(career)}>
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل" arrow>
                              <IconButton size="small">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف" arrow>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteCareer(career.id)}
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
                count={careersData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Career Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة وظيفة جديدة</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="عنوان الوظيفة"
                placeholder="مطور ويب متقدم"
                helperText="عنوان واضح ومحدد للوظيفة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                label="وصف الوظيفة"
                placeholder="نبحث عن مطور ويب متقدم للانضمام إلى فريق التطوير..."
                      multiline
                      rows={4}
                helperText="وصف تفصيلي للوظيفة والمهام المطلوبة"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>القسم</InputLabel>
                <Select label="القسم">
                  {departments.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="الموقع" placeholder="الرياض" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع الوظيفة</InputLabel>
                <Select label="نوع الوظيفة">
                  {jobTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="الخبرة المطلوبة" placeholder="3-5 سنوات" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="الراتب" placeholder="15,000 - 20,000 ريال" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة">
                  {statuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الموعد النهائي"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="المتطلبات"
                placeholder="خبرة 3-5 سنوات في تطوير الويب, إتقان React, Node.js, MongoDB"
                multiline
                rows={3}
                helperText="افصل المتطلبات بفاصلة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="المميزات"
                placeholder="راتب تنافسي, تأمين صحي شامل, إجازة سنوية 30 يوم"
                multiline
                rows={3}
                helperText="افصل المميزات بفاصلة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="العلامات"
                placeholder="تطوير, ويب, React, Node.js"
                helperText="افصل العلامات بفاصلة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="وظيفة مميزة" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="وظيفة عاجلة" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة الوظيفة
          </Button>
        </DialogActions>
      </Dialog>

      {/* Career Details Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل الوظيفة
          </Typography>
          {selectedCareer && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                {selectedCareer.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedCareer.description}
                  </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText primary="القسم" secondary={selectedCareer.department} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموقع" secondary={selectedCareer.location} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="نوع الوظيفة" secondary={selectedCareer.type} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الخبرة المطلوبة" secondary={selectedCareer.experience} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الراتب" secondary={selectedCareer.salary} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedCareer.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الطلبات" secondary={selectedCareer.applications} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المشاهدات"
                    secondary={selectedCareer.views.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تاريخ الإنشاء" secondary={selectedCareer.createdAt} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموعد النهائي" secondary={selectedCareer.deadline} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العلامات" secondary={selectedCareer.tags.join(', ')} />
                </ListItem>
              </List>
                </Box>
              )}
        </Box>
      </Drawer>

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

export default Careers;
