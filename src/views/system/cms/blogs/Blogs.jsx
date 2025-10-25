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
  Avatar,
  Stack,
  Zoom,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Drawer,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Article as ArticleIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Comment as CommentIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Publish as PublishIcon,
  EditNote as DraftIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Blogs = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list, grid, timeline

  // Stats data
  const blogsStats = [
    {
      title: 'إجمالي المدونات',
      value: '247',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: ArticleIcon,
      change: '+23',
    },
    {
      title: 'المدونات المنشورة',
      value: '189',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: PublishIcon,
      change: '76%',
    },
    {
      title: 'المدونات المسودة',
      value: '45',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: DraftIcon,
      change: '+8',
    },
    {
      title: 'إجمالي المشاهدات',
      value: '125,430',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: VisibilityIcon,
      change: '+15.2%',
    },
  ];

  // Mock data for blogs
  const blogsData = [
    {
      id: 1,
      title: 'دليل شامل لتطوير تطبيقات الويب الحديثة',
      content: 'في هذا المقال سنتعرف على أحدث التقنيات والممارسات لتطوير تطبيقات الويب...',
      excerpt: 'دليل شامل يغطي جميع جوانب تطوير تطبيقات الويب الحديثة من البداية للنهاية',
      author: 'أحمد محمد',
      authorAvatar: '/images/avatar1.jpg',
      category: 'تطوير الويب',
      tags: ['تطوير', 'ويب', 'تقنية', 'برمجة'],
      status: 'published',
      publishedAt: '2024-01-25',
      createdAt: '2024-01-20',
      lastUpdated: '2024-01-25',
      views: 1250,
      likes: 89,
      comments: 23,
      shares: 15,
      readingTime: '8 دقائق',
      featuredImage: '/images/blog1.jpg',
      isFeatured: true,
      isPinned: false,
      seoTitle: 'دليل شامل لتطوير تطبيقات الويب الحديثة - أفضل الممارسات',
      seoDescription: 'تعلم كيفية تطوير تطبيقات الويب الحديثة باستخدام أحدث التقنيات والممارسات',
      seoKeywords: ['تطوير ويب', 'تقنية', 'برمجة', 'تطبيقات'],
      slug: 'complete-guide-modern-web-development',
      language: 'ar',
      allowComments: true,
      allowSharing: true,
      showAuthor: true,
      showDate: true,
      showReadingTime: true,
      showTags: true,
      showCategory: true,
      showSocialShare: true,
      showRelatedPosts: true,
      autoSave: true,
      schedulePublish: false,
      scheduledAt: null,
      archiveAt: null,
      archived: false,
    },
    {
      id: 2,
      title: 'أفضل أدوات التصميم للمطورين في 2024',
      content: 'سنتعرف في هذا المقال على أفضل أدوات التصميم التي يمكن للمطورين استخدامها...',
      excerpt: 'قائمة شاملة بأفضل أدوات التصميم للمطورين مع شرح مفصل لكل أداة',
      author: 'فاطمة علي',
      authorAvatar: '/images/avatar2.jpg',
      category: 'تصميم',
      tags: ['تصميم', 'أدوات', 'مطورين', 'UI/UX'],
      status: 'published',
      publishedAt: '2024-01-22',
      createdAt: '2024-01-18',
      lastUpdated: '2024-01-22',
      views: 980,
      likes: 67,
      comments: 18,
      shares: 12,
      readingTime: '6 دقائق',
      featuredImage: '/images/blog2.jpg',
      isFeatured: false,
      isPinned: true,
      seoTitle: 'أفضل أدوات التصميم للمطورين في 2024 - دليل شامل',
      seoDescription: 'اكتشف أفضل أدوات التصميم التي يمكن للمطورين استخدامها لتحسين عملهم',
      seoKeywords: ['أدوات تصميم', 'مطورين', 'UI/UX', 'تصميم'],
      slug: 'best-design-tools-developers-2024',
      language: 'ar',
      allowComments: true,
      allowSharing: true,
      showAuthor: true,
      showDate: true,
      showReadingTime: true,
      showTags: true,
      showCategory: true,
      showSocialShare: true,
      showRelatedPosts: true,
      autoSave: true,
      schedulePublish: false,
      scheduledAt: null,
      archiveAt: null,
      archived: false,
    },
    {
      id: 3,
      title: 'كيفية تحسين أداء المواقع الإلكترونية',
      content: 'في هذا المقال سنتعرف على أهم الطرق لتحسين أداء المواقع الإلكترونية...',
      excerpt: 'دليل شامل لتحسين أداء المواقع الإلكترونية من خلال تقنيات متقدمة',
      author: 'محمد أحمد',
      authorAvatar: '/images/avatar3.jpg',
      category: 'تحسين الأداء',
      tags: ['أداء', 'تحسين', 'سرعة', 'SEO'],
      status: 'draft',
      publishedAt: null,
      createdAt: '2024-01-24',
      lastUpdated: '2024-01-25',
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      readingTime: '10 دقائق',
      featuredImage: '/images/blog3.jpg',
      isFeatured: false,
      isPinned: false,
      seoTitle: 'كيفية تحسين أداء المواقع الإلكترونية - دليل شامل',
      seoDescription: 'تعلم كيفية تحسين أداء المواقع الإلكترونية باستخدام أحدث التقنيات',
      seoKeywords: ['تحسين الأداء', 'سرعة الموقع', 'SEO', 'تحسين'],
      slug: 'how-to-optimize-website-performance',
      language: 'ar',
      allowComments: true,
      allowSharing: true,
      showAuthor: true,
      showDate: true,
      showReadingTime: true,
      showTags: true,
      showCategory: true,
      showSocialShare: true,
      showRelatedPosts: true,
      autoSave: true,
      schedulePublish: true,
      scheduledAt: '2024-02-01T10:00:00Z',
      archiveAt: null,
      archived: false,
    },
  ];

  const categories = [
    'تطوير الويب',
    'تصميم',
    'تحسين الأداء',
    'تقنية',
    'برمجة',
    'أمن المعلومات',
    'ذكاء اصطناعي',
    'بيانات',
    'شبكات',
    'أخرى',
  ];

  const statuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'published', label: 'منشور', color: 'success' },
    { value: 'scheduled', label: 'مجدول', color: 'info' },
    { value: 'archived', label: 'مؤرشف', color: 'warning' },
    { value: 'deleted', label: 'محذوف', color: 'error' },
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
    title: 'إدارة المدونات',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    allowComments: true,
    allowSharing: true,
    showAuthor: true,
    showDate: true,
    showReadingTime: true,
    showTags: true,
    showCategory: true,
    showSocialShare: true,
    showRelatedPosts: true,
    autoSave: true,
    enableSEO: true,
    enableAnalytics: true,
    enableSocialMedia: true,
    enableEmailNotifications: true,
    enableRSS: true,
    enableSitemap: true,
    enableCache: true,
    enableCDN: true,
    enableCompression: true,
    enableMinification: true,
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableCodeHighlighting: true,
    enableMathEquations: true,
    enableTableOfContents: true,
    enablePrintFriendly: true,
    enableDarkMode: true,
    enableAccessibility: true,
    enableMultiLanguage: true,
    enableTranslation: true,
    enableVersionControl: true,
    enableCollaboration: true,
    enableReviewProcess: true,
    enableApprovalWorkflow: true,
    enableScheduling: true,
    enableArchiving: true,
    enableBackup: true,
    enableRestore: true,
    enableExport: true,
    enableImport: true,
    enableSync: true,
    enableBackup: true,
    enableRestore: true,
    enableExport: true,
    enableImport: true,
    enableSync: true,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات المدونات بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddBlog = () => {
    setOpenDialog(true);
  };

  const handleDeleteBlog = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف المدونة بنجاح',
      severity: 'success',
    });
  };

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
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
              إدارة المدونات
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتخصيص المدونات والمقالات
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
              <Typography color="text.primary">المدونات</Typography>
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
          {blogsStats.map((stat, index) => (
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
                <Typography variant="h6">إعدادات المدونات</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowComments}
                        onChange={(e) =>
                          setFormData({ ...formData, allowComments: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالتعليقات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowSharing}
                        onChange={(e) =>
                          setFormData({ ...formData, allowSharing: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالمشاركة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showAuthor}
                        onChange={(e) => setFormData({ ...formData, showAuthor: e.target.checked })}
                      />
                    }
                    label="عرض اسم المؤلف"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showDate}
                        onChange={(e) => setFormData({ ...formData, showDate: e.target.checked })}
                      />
                    }
                    label="عرض التاريخ"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showReadingTime}
                        onChange={(e) =>
                          setFormData({ ...formData, showReadingTime: e.target.checked })
                        }
                      />
                    }
                    label="عرض وقت القراءة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showTags}
                        onChange={(e) => setFormData({ ...formData, showTags: e.target.checked })}
                      />
                    }
                    label="عرض التصنيفات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showCategory}
                        onChange={(e) =>
                          setFormData({ ...formData, showCategory: e.target.checked })
                        }
                      />
                    }
                    label="عرض الفئة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showSocialShare}
                        onChange={(e) =>
                          setFormData({ ...formData, showSocialShare: e.target.checked })
                        }
                      />
                    }
                    label="عرض أزرار المشاركة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showRelatedPosts}
                        onChange={(e) =>
                          setFormData({ ...formData, showRelatedPosts: e.target.checked })
                        }
                      />
                    }
                    label="عرض المقالات ذات الصلة"
                  />
                </Grid>
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
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Blogs List */}
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
                <Typography variant="h6">قائمة المدونات</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={`${blogsData.length} مدونة`} color="primary" size="small" />
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddBlog}
                    size="small"
                  >
                    إضافة مدونة
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>المدونة</TableCell>
                    <TableCell>المؤلف</TableCell>
                    <TableCell>الفئة</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>المشاهدات</TableCell>
                    <TableCell>التاريخ</TableCell>
                    <TableCell>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((blog) => (
                      <TableRow key={blog.id} hover>
                        <TableCell>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {blog.title}
                              </Typography>
                              {blog.isFeatured && (
                                <Chip label="مميز" size="small" color="primary" />
                              )}
                              {blog.isPinned && (
                                <Chip label="مثبت" size="small" color="secondary" />
                              )}
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {blog.excerpt}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <Chip key={index} label={tag} size="small" variant="outlined" />
                              ))}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32 }} src={blog.authorAvatar} />
                            <Typography variant="body2">{blog.author}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={blog.category} size="small" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(blog.status)}
                            size="small"
                            color={getStatusColor(blog.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{blog.views.toLocaleString()}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(blog.publishedAt || blog.createdAt)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="عرض التفاصيل">
                              <IconButton size="small" onClick={() => handleViewBlog(blog)}>
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل">
                              <IconButton size="small">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف">
                              <IconButton size="small" onClick={() => handleDeleteBlog(blog.id)}>
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
                count={blogsData.length}
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

      {/* Add/Edit Blog Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة مدونة جديدة</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="عنوان المدونة"
                placeholder="أدخل عنوان المدونة"
                variant="outlined"
              />
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
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="محتوى المدونة"
                placeholder="أدخل محتوى المدونة"
                multiline
                rows={6}
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الملخص"
                placeholder="أدخل ملخص المدونة"
                multiline
                rows={3}
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
            حفظ المدونة
          </Button>
        </DialogActions>
      </Dialog>

      {/* Blog Details Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography variant="h6">تفاصيل المدونة</Typography>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {selectedBlog && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedBlog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedBlog.excerpt}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {selectedBlog.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar src={selectedBlog.authorAvatar} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {selectedBlog.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(selectedBlog.publishedAt)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VisibilityIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">{selectedBlog.views}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ThumbUpIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">{selectedBlog.likes}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CommentIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">{selectedBlog.comments}</Typography>
                </Box>
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

export default Blogs;
