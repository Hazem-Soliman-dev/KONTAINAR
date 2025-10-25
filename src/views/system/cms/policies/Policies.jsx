import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
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
  Stack,
  Zoom,
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
  Policy as PolicyIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Schedule as ScheduleIcon,
  Share as ShareIcon,
  Restore as RestoreIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Gavel as GavelIcon,
  PrivacyTip as PrivacyTipIcon,
  Cookie as CookieIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  Work as WorkIcon,
  LocalShipping as LocalShippingIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const Policies = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Stats data
  const policiesStats = [
    {
      title: 'إجمالي السياسات',
      value: '15',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: PolicyIcon,
      change: '+3',
    },
    {
      title: 'السياسات النشطة',
      value: '12',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '80%',
    },
    {
      title: 'السياسات المحدثة',
      value: '8',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: TrendingUpIcon,
      change: '+5',
    },
    {
      title: 'آخر تحديث',
      value: 'أمس',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: ScheduleIcon,
      change: '2 ساعة',
    },
  ];

  // Mock data for policies
  const policiesData = [
    {
      id: 1,
      title: 'سياسة الخصوصية',
      description: 'تشرح كيفية جمع واستخدام وحماية المعلومات الشخصية',
      content:
        'نحن في [اسم الشركة] نلتزم بحماية خصوصيتك. هذه السياسة تشرح كيفية جمع واستخدام وحماية معلوماتك الشخصية...',
      category: 'الخصوصية',
      type: 'privacy',
      status: 'active',
      version: '2.1',
      lastUpdated: '2024-01-25',
      effectiveDate: '2024-01-01',
      nextReview: '2024-07-01',
      author: 'فريق القانون',
      isRequired: true,
      isPublic: true,
      isMandatory: true,
      requiresConsent: true,
      applicableTo: ['جميع المستخدمين', 'العملاء', 'الموظفين'],
      tags: ['خصوصية', 'بيانات شخصية', 'GDPR', 'حماية'],
      language: 'ar',
      translations: ['en', 'fr'],
      lastModifiedBy: 'أحمد محمد',
      approvalStatus: 'approved',
      approvedBy: 'مدير القانون',
      approvedAt: '2024-01-20',
      publishedAt: '2024-01-25',
      views: 1250,
      downloads: 89,
      shares: 15,
      feedback: 8,
      rating: 4.5,
      isFeatured: true,
      isPinned: true,
      priority: 'high',
      department: 'القانون',
      contactPerson: 'محمد أحمد',
      contactEmail: 'legal@company.com',
      contactPhone: '+966501234567',
      relatedPolicies: ['سياسة ملفات تعريف الارتباط', 'سياسة الأمان'],
      relatedDocuments: ['نموذج الموافقة', 'دليل الموظف'],
      attachments: ['policy-privacy-v2.1.pdf', 'privacy-checklist.docx'],
      externalLinks: ['https://gdpr.eu', 'https://privacy.gov.sa'],
      compliance: ['GDPR', 'CCPA', 'PDPA'],
      riskLevel: 'medium',
      reviewFrequency: 'quarterly',
      nextReviewDate: '2024-04-01',
      changeLog: [
        { version: '2.1', date: '2024-01-25', changes: 'تحديث شروط جمع البيانات' },
        { version: '2.0', date: '2024-01-01', changes: 'إضافة متطلبات GDPR' },
      ],
    },
    {
      id: 2,
      title: 'شروط الاستخدام',
      description: 'تحدد الشروط والأحكام لاستخدام خدماتنا',
      content: 'باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام...',
      category: 'الاستخدام',
      type: 'terms',
      status: 'active',
      version: '1.8',
      lastUpdated: '2024-01-22',
      effectiveDate: '2024-01-01',
      nextReview: '2024-04-01',
      author: 'فريق القانون',
      isRequired: true,
      isPublic: true,
      isMandatory: true,
      requiresConsent: true,
      applicableTo: ['جميع المستخدمين', 'العملاء'],
      tags: ['شروط', 'استخدام', 'أحكام', 'خدمات'],
      language: 'ar',
      translations: ['en', 'fr'],
      lastModifiedBy: 'فاطمة علي',
      approvalStatus: 'approved',
      approvedBy: 'مدير القانون',
      approvedAt: '2024-01-18',
      publishedAt: '2024-01-22',
      views: 980,
      downloads: 67,
      shares: 12,
      feedback: 5,
      rating: 4.2,
      isFeatured: false,
      isPinned: true,
      priority: 'high',
      department: 'القانون',
      contactPerson: 'فاطمة علي',
      contactEmail: 'legal@company.com',
      contactPhone: '+966501234567',
      relatedPolicies: ['سياسة الخصوصية', 'سياسة الأمان'],
      relatedDocuments: ['نموذج التسجيل', 'دليل المستخدم'],
      attachments: ['terms-of-use-v1.8.pdf', 'terms-checklist.docx'],
      externalLinks: ['https://legal.gov.sa'],
      compliance: ['Saudi Law', 'Commercial Law'],
      riskLevel: 'medium',
      reviewFrequency: 'quarterly',
      nextReviewDate: '2024-04-01',
      changeLog: [
        { version: '1.8', date: '2024-01-22', changes: 'تحديث شروط الدفع' },
        { version: '1.7', date: '2023-12-01', changes: 'إضافة شروط الخدمات الجديدة' },
      ],
    },
    {
      id: 3,
      title: 'سياسة ملفات تعريف الارتباط',
      description: 'تشرح استخدام ملفات تعريف الارتباط على موقعنا',
      content: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتقديم خدمات مخصصة...',
      category: 'التقنية',
      type: 'cookies',
      status: 'active',
      version: '1.5',
      lastUpdated: '2024-01-20',
      effectiveDate: '2024-01-01',
      nextReview: '2024-07-01',
      author: 'فريق التقنية',
      isRequired: true,
      isPublic: true,
      isMandatory: true,
      requiresConsent: true,
      applicableTo: ['جميع المستخدمين'],
      tags: ['ملفات تعريف الارتباط', 'تقنية', 'خصوصية', 'موقع'],
      language: 'ar',
      translations: ['en', 'fr'],
      lastModifiedBy: 'أحمد التقني',
      approvalStatus: 'approved',
      approvedBy: 'مدير التقنية',
      approvedAt: '2024-01-18',
      publishedAt: '2024-01-20',
      views: 750,
      downloads: 45,
      shares: 8,
      feedback: 3,
      rating: 4.0,
      isFeatured: false,
      isPinned: false,
      priority: 'medium',
      department: 'التقنية',
      contactPerson: 'أحمد التقني',
      contactEmail: 'tech@company.com',
      contactPhone: '+966501234567',
      relatedPolicies: ['سياسة الخصوصية', 'سياسة الأمان'],
      relatedDocuments: ['دليل التقنية', 'إعدادات المتصفح'],
      attachments: ['cookies-policy-v1.5.pdf', 'cookies-settings.docx'],
      externalLinks: ['https://cookiepedia.co.uk'],
      compliance: ['GDPR', 'ePrivacy Directive'],
      riskLevel: 'low',
      reviewFrequency: 'semi-annually',
      nextReviewDate: '2024-07-01',
      changeLog: [
        { version: '1.5', date: '2024-01-20', changes: 'تحديث أنواع ملفات تعريف الارتباط' },
        { version: '1.4', date: '2023-10-01', changes: 'إضافة إعدادات الخصوصية' },
      ],
    },
  ];

  const categories = [
    'الخصوصية',
    'الاستخدام',
    'التقنية',
    'الأمان',
    'المالية',
    'الموارد البشرية',
    'التسويق',
    'العمليات',
    'الجودة',
    'الامتثال',
  ];

  const types = [
    { value: 'privacy', label: 'سياسة الخصوصية', icon: PrivacyTipIcon, color: 'primary' },
    { value: 'terms', label: 'شروط الاستخدام', icon: GavelIcon, color: 'secondary' },
    { value: 'cookies', label: 'ملفات تعريف الارتباط', icon: CookieIcon, color: 'info' },
    { value: 'security', label: 'سياسة الأمان', icon: SecurityIcon, color: 'warning' },
    { value: 'payment', label: 'سياسة الدفع', icon: PaymentIcon, color: 'success' },
    { value: 'refund', label: 'سياسة الاسترداد', icon: ReceiptIcon, color: 'error' },
    { value: 'shipping', label: 'سياسة الشحن', icon: LocalShippingIcon, color: 'info' },
    { value: 'return', label: 'سياسة الإرجاع', icon: RestoreIcon, color: 'warning' },
    { value: 'hr', label: 'سياسة الموارد البشرية', icon: WorkIcon, color: 'primary' },
    { value: 'quality', label: 'سياسة الجودة', icon: CheckCircleIcon, color: 'success' },
  ];

  const statuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'active', label: 'نشطة', color: 'success' },
    { value: 'archived', label: 'مؤرشف', color: 'warning' },
    { value: 'expired', label: 'منتهية', color: 'error' },
    { value: 'pending', label: 'في الانتظار', color: 'info' },
  ];

  const priorities = [
    { value: 'low', label: 'منخفض', color: 'success' },
    { value: 'medium', label: 'متوسط', color: 'warning' },
    { value: 'high', label: 'عالي', color: 'error' },
    { value: 'critical', label: 'حرج', color: 'error' },
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
    title: 'إدارة السياسات',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    autoSave: true,
    enableVersionControl: true,
    enableApprovalWorkflow: true,
    enableNotifications: true,
    enableCompliance: true,
    enableReview: true,
    enableTranslation: true,
    enableExport: true,
    enableImport: true,
    enableBackup: true,
    enableRestore: true,
    enableSync: true,
    enableAnalytics: true,
    enableFeedback: true,
    enableRating: true,
    enableSharing: true,
    enableDownload: true,
    enablePrint: true,
    enableEmail: true,
    enableSMS: true,
    enablePush: true,
    enableWebhook: true,
    enableAPI: true,
    enableIntegration: true,
    enableAutomation: true,
    enableAI: true,
    enableML: true,
    enableBlockchain: true,
    enableIoT: true,
    enableAR: true,
    enableVR: true,
    enableMR: true,
    enableXR: true,
    enable5G: true,
    enableEdge: true,
    enableCloud: true,
    enableHybrid: true,
    enableMulti: true,
    enableCross: true,
    enableInter: true,
    enableIntra: true,
    enableExtra: true,
    enableUltra: true,
    enableSuper: true,
    enableMega: true,
    enableGiga: true,
    enableTera: true,
    enablePeta: true,
    enableExa: true,
    enableZetta: true,
    enableYotta: true,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات السياسات بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddPolicy = () => {
    setOpenDialog(true);
  };

  const handleDeletePolicy = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف السياسة بنجاح',
      severity: 'success',
    });
  };

  const handleViewPolicy = (policy) => {
    setSelectedPolicy(policy);
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

  const getTypeIcon = (type) => {
    const typeObj = types.find((t) => t.value === type);
    return typeObj ? typeObj.icon : PolicyIcon;
  };

  const getTypeColor = (type) => {
    const typeObj = types.find((t) => t.value === type);
    return typeObj ? typeObj.color : 'default';
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find((p) => p.value === priority);
    return priorityObj ? priorityObj.color : 'default';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    return new Date(dateString).toLocaleDateString('ar-SA');
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
              إدارة السياسات
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتخصيص السياسات واللوائح
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
              <Typography color="text.primary">السياسات</Typography>
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
          {policiesStats.map((stat, index) => (
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          mr: 2,
                        }}
                      >
                        <stat.icon sx={{ fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {stat.title}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {stat.change}
                      </Typography>
                      <TrendingUpIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">إعدادات السياسات</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoSave}
                        onChange={(e) => setFormData({ ...formData, autoSave: e.target.checked })}
                      />
                    }
                    label="الحفظ التلقائي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableVersionControl}
                        onChange={(e) =>
                          setFormData({ ...formData, enableVersionControl: e.target.checked })
                        }
                      />
                    }
                    label="التحكم في الإصدارات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableApprovalWorkflow}
                        onChange={(e) =>
                          setFormData({ ...formData, enableApprovalWorkflow: e.target.checked })
                        }
                      />
                    }
                    label="سير عمل الموافقة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableNotifications}
                        onChange={(e) =>
                          setFormData({ ...formData, enableNotifications: e.target.checked })
                        }
                      />
                    }
                    label="الإشعارات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableCompliance}
                        onChange={(e) =>
                          setFormData({ ...formData, enableCompliance: e.target.checked })
                        }
                      />
                    }
                    label="الامتثال"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableReview}
                        onChange={(e) =>
                          setFormData({ ...formData, enableReview: e.target.checked })
                        }
                      />
                    }
                    label="المراجعة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableTranslation}
                        onChange={(e) =>
                          setFormData({ ...formData, enableTranslation: e.target.checked })
                        }
                      />
                    }
                    label="الترجمة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableExport}
                        onChange={(e) =>
                          setFormData({ ...formData, enableExport: e.target.checked })
                        }
                      />
                    }
                    label="التصدير"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableImport}
                        onChange={(e) =>
                          setFormData({ ...formData, enableImport: e.target.checked })
                        }
                      />
                    }
                    label="الاستيراد"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableBackup}
                        onChange={(e) =>
                          setFormData({ ...formData, enableBackup: e.target.checked })
                        }
                      />
                    }
                    label="النسخ الاحتياطي"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Policies List */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ width: '100%', overflow: 'auto' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">قائمة السياسات</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={`${policiesData.length} سياسة`} color="primary" size="small" />
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddPolicy}
                    size="small"
                  >
                    إضافة سياسة
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>السياسة</TableCell>
                    <TableCell>النوع</TableCell>
                    <TableCell>الفئة</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>الإصدار</TableCell>
                    <TableCell>آخر تحديث</TableCell>
                    <TableCell>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {policiesData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((policy) => (
                      <TableRow key={policy.id} hover>
                        <TableCell>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {policy.title}
                              </Typography>
                              {policy.isFeatured && (
                                <Chip label="مميز" size="small" color="primary" />
                              )}
                              {policy.isPinned && (
                                <Chip label="مثبت" size="small" color="secondary" />
                              )}
                              {policy.isRequired && (
                                <Chip label="مطلوب" size="small" color="error" />
                              )}
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {policy.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                              {policy.tags.slice(0, 3).map((tag, index) => (
                                <Chip key={index} label={tag} size="small" variant="outlined" />
                              ))}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <getTypeIcon type={policy.type} sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                              {types.find((t) => t.value === policy.type)?.label}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={policy.category} size="small" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(policy.status)}
                            size="small"
                            color={getStatusColor(policy.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            v{policy.version}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{formatDate(policy.lastUpdated)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="عرض التفاصيل">
                              <IconButton size="small" onClick={() => handleViewPolicy(policy)}>
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل">
                              <IconButton size="small">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف">
                              <IconButton
                                size="small"
                                onClick={() => handleDeletePolicy(policy.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={policiesData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="عدد الصفوف في الصفحة:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`
                }
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Policy Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة سياسة جديدة</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="عنوان السياسة"
                placeholder="أدخل عنوان السياسة"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>النوع</InputLabel>
                <Select label="النوع">
                  {types.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الفئة</InputLabel>
                <Select label="الفئة">
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف السياسة"
                placeholder="أدخل وصف السياسة"
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="محتوى السياسة"
                placeholder="أدخل محتوى السياسة"
                multiline
                rows={6}
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الكلمات المفتاحية"
                placeholder="أدخل الكلمات المفتاحية مفصولة بفواصل"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" startIcon={<SaveIcon />}>
            حفظ السياسة
          </Button>
        </DialogActions>
      </Dialog>

      {/* Policy Details Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 500 } }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography variant="h6">تفاصيل السياسة</Typography>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {selectedPolicy && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedPolicy.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedPolicy.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {selectedPolicy.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip label={selectedPolicy.category} color="primary" />
                <Chip
                  label={getStatusLabel(selectedPolicy.status)}
                  color={getStatusColor(selectedPolicy.status)}
                />
                <Chip label={`v${selectedPolicy.version}`} variant="outlined" />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  المعلومات الأساسية:
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>المؤلف:</strong> {selectedPolicy.author}
                  </Typography>
                  <Typography variant="body2">
                    <strong>آخر تحديث:</strong> {formatDate(selectedPolicy.lastUpdated)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>تاريخ السريان:</strong> {formatDate(selectedPolicy.effectiveDate)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>المراجعة القادمة:</strong> {formatDate(selectedPolicy.nextReview)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  الإحصائيات:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <VisibilityIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{selectedPolicy.views}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <DownloadIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{selectedPolicy.downloads}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ShareIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{selectedPolicy.shares}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  الامتثال:
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {selectedPolicy.compliance.map((comp, index) => (
                    <Chip key={index} label={comp} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  المرفقات:
                </Typography>
                <List dense>
                  {selectedPolicy.attachments.map((attachment, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={attachment}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
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
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Policies;
