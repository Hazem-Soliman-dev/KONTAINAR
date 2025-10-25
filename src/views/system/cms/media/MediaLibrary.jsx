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
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  PhotoLibrary as PhotoLibraryIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Speed as SpeedIcon,
  Download as DownloadIcon,
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  VideoLibrary as VideoLibraryIcon,
  Archive as ArchiveIcon,
  ViewList as ViewListIcon,
  GridView as GridViewIcon,
  InsertDriveFile as InsertDriveFileIcon,
  AudioFile as AudioFileIcon,
} from '@mui/icons-material';

const MediaLibrary = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Stats data
  const mediaStats = [
    {
      title: 'إجمالي الملفات',
      value: '2,450',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: PhotoLibraryIcon,
      change: '+125',
    },
    {
      title: 'المساحة المستخدمة',
      value: '15.2 جيجا',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: AttachFileIcon,
      change: '68%',
    },
    {
      title: 'الملفات الجديدة',
      value: '89',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: TrendingUpIcon,
      change: '+12%',
    },
    {
      title: 'معدل الاستخدام',
      value: '94.5%',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: SpeedIcon,
      change: '+2.1%',
    },
  ];

  // Mock data for media files
  const mediaData = [
    {
      id: 1,
      name: 'صورة المنتج الرئيسي',
      type: 'image',
      size: '2.5 ميجا',
      format: 'jpg',
      url: '/images/product-main.jpg',
      thumbnail: '/images/product-main-thumb.jpg',
      category: 'منتجات',
      tags: ['منتج', 'رئيسي', 'صورة'],
      uploadedBy: 'أحمد محمد',
      uploadedAt: '2024-01-15',
      lastModified: '2024-01-20',
      views: 1250,
      downloads: 45,
      isPublic: true,
      isFeatured: true,
      dimensions: '1920x1080',
      alt: 'صورة المنتج الرئيسي',
      description: 'صورة عالية الجودة للمنتج الرئيسي',
    },
    {
      id: 2,
      name: 'فيديو العرض التوضيحي',
      type: 'video',
      size: '45.2 ميجا',
      format: 'mp4',
      url: '/videos/demo.mp4',
      thumbnail: '/images/demo-thumb.jpg',
      category: 'عروض',
      tags: ['فيديو', 'عرض', 'توضيحي'],
      uploadedBy: 'فاطمة علي',
      uploadedAt: '2024-01-18',
      lastModified: '2024-01-22',
      views: 890,
      downloads: 23,
      isPublic: true,
      isFeatured: false,
      dimensions: '1920x1080',
      alt: 'فيديو العرض التوضيحي',
      description: 'فيديو توضيحي للمنتج',
    },
    {
      id: 3,
      name: 'دليل المستخدم',
      type: 'document',
      size: '3.8 ميجا',
      format: 'pdf',
      url: '/documents/user-guide.pdf',
      thumbnail: '/images/pdf-thumb.jpg',
      category: 'وثائق',
      tags: ['دليل', 'مستخدم', 'وثيقة'],
      uploadedBy: 'محمد أحمد',
      uploadedAt: '2024-01-20',
      lastModified: '2024-01-25',
      views: 450,
      downloads: 67,
      isPublic: false,
      isFeatured: false,
      dimensions: 'A4',
      alt: 'دليل المستخدم',
      description: 'دليل شامل لاستخدام المنتج',
    },
  ];

  const categories = ['منتجات', 'عروض', 'وثائق', 'صور', 'فيديوهات', 'أصوات', 'أخرى'];

  const fileTypes = [
    { value: 'image', label: 'صور', icon: ImageIcon, color: 'primary' },
    { value: 'video', label: 'فيديوهات', icon: VideoLibraryIcon, color: 'secondary' },
    { value: 'document', label: 'وثائق', icon: DescriptionIcon, color: 'info' },
    { value: 'audio', label: 'أصوات', icon: AudioFileIcon, color: 'warning' },
    { value: 'archive', label: 'أرشيف', icon: ArchiveIcon, color: 'error' },
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
    title: 'مكتبة الوسائط',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    allowUpload: true,
    allowDownload: true,
    allowSharing: true,
    showThumbnails: true,
    showDetails: true,
    showCategories: true,
    showTags: true,
    requireApproval: false,
    maxFileSize: 100,
    allowedFormats: ['jpg', 'png', 'gif', 'mp4', 'pdf', 'doc', 'docx'],
    maxFiles: 1000,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات مكتبة الوسائط بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddMedia = () => {
    setOpenDialog(true);
  };

  const handleDeleteMedia = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف الملف بنجاح',
      severity: 'success',
    });
  };

  const handleViewMedia = (media) => {
    setSelectedMedia(media);
    setOpenDrawer(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getFileTypeIcon = (type) => {
    const fileType = fileTypes.find((ft) => ft.value === type);
    return fileType ? fileType.icon : InsertDriveFileIcon;
  };

  const getFileTypeColor = (type) => {
    const fileType = fileTypes.find((ft) => ft.value === type);
    return fileType ? fileType.color : 'default';
  };

  const formatFileSize = (size) => {
    return size;
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
              مكتبة الوسائط
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتنظيم الملفات والوسائط في المكتبة
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
              <Typography color="text.primary">مكتبة الوسائط</Typography>
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
          {mediaStats.map((stat, index) => (
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
            <PhotoLibraryIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات مكتبة الوسائط
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة مكتبة الوسائط
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الملفات"
              size="small"
              placeholder="البحث في الملفات..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>النوع</InputLabel>
              <Select value="all" label="النوع">
                <MenuItem value="all">الكل</MenuItem>
                {fileTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الفئة</InputLabel>
              <Select value="all" label="الفئة">
                <MenuItem value="all">الكل</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
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
                onClick={handleAddMedia}
                size="small"
              >
                إضافة ملف
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Media Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات المكتبة
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
                    label="المكتبة نشطة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowUpload}
                        onChange={(e) =>
                          setFormData({ ...formData, allowUpload: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالرفع"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowDownload}
                        onChange={(e) =>
                          setFormData({ ...formData, allowDownload: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالتحميل"
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
                        checked={formData.showThumbnails}
                        onChange={(e) =>
                          setFormData({ ...formData, showThumbnails: e.target.checked })
                        }
                      />
                    }
                    label="عرض الصور المصغرة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showDetails}
                        onChange={(e) =>
                          setFormData({ ...formData, showDetails: e.target.checked })
                        }
                      />
                    }
                    label="عرض التفاصيل"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showCategories}
                        onChange={(e) =>
                          setFormData({ ...formData, showCategories: e.target.checked })
                        }
                      />
                    }
                    label="عرض الفئات"
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
                    label="عرض العلامات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireApproval}
                        onChange={(e) =>
                          setFormData({ ...formData, requireApproval: e.target.checked })
                        }
                      />
                    }
                    label="طلب الموافقة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الحد الأقصى لحجم الملف (ميجا)"
                    type="number"
                    value={formData.maxFileSize}
                    onChange={(e) =>
                      setFormData({ ...formData, maxFileSize: parseInt(e.target.value) })
                    }
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الحد الأقصى للملفات"
                    type="number"
                    value={formData.maxFiles}
                    onChange={(e) =>
                      setFormData({ ...formData, maxFiles: parseInt(e.target.value) })
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Media Files */}
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
                <Typography variant="h6">قائمة الملفات</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={`${mediaData.length} ملف`} color="primary" size="small" />
                  <IconButton
                    size="small"
                    onClick={() => setViewMode('grid')}
                    color={viewMode === 'grid' ? 'primary' : 'default'}
                  >
                    <GridViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setViewMode('list')}
                    color={viewMode === 'list' ? 'primary' : 'default'}
                  >
                    <ViewListIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {viewMode === 'grid' ? (
                <ImageList cols={3} gap={16}>
                  {mediaData.map((media) => (
                    <ImageListItem key={media.id}>
                      <img
                        src={media.thumbnail || media.url}
                        alt={media.alt}
                        loading="lazy"
                        style={{ height: 200, objectFit: 'cover' }}
                      />
                      <ImageListItemBar
                        title={media.name}
                        subtitle={
                          <Box>
                            <Typography variant="body2" color="white">
                              {media.size} • {media.format.toUpperCase()}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <Chip label={media.category} size="small" color="primary" />
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <VisibilityIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                {media.views}
                              </Box>
                            </Box>
                          </Box>
                        }
                        actionIcon={
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="عرض" arrow>
                              <IconButton
                                size="small"
                                sx={{ color: 'white' }}
                                onClick={() => handleViewMedia(media)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تحميل" arrow>
                              <IconButton size="small" sx={{ color: 'white' }}>
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف" arrow>
                              <IconButton
                        size="small"
                                sx={{ color: 'white' }}
                                onClick={() => handleDeleteMedia(media.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                        </Tooltip>
                          </Stack>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>الملف</TableCell>
                      <TableCell>النوع</TableCell>
                      <TableCell>الحجم</TableCell>
                      <TableCell>الفئة</TableCell>
                      <TableCell>المشاهدات</TableCell>
                      <TableCell>التحميلات</TableCell>
                      <TableCell align="right">الإجراءات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mediaData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((media) => (
                        <TableRow key={media.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ bgcolor: `${getFileTypeColor(media.type)}.main` }}>
                                <getFileTypeIcon type={media.type} />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {media.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {media.description}
                                </Typography>
                      </Box>
                    </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                fileTypes.find((ft) => ft.value === media.type)?.label || media.type
                              }
                      size="small"
                              color={getFileTypeColor(media.type)}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {media.size}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={media.category} size="small" color="primary" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {media.views.toLocaleString()}
                  </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {media.downloads.toLocaleString()}
                  </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              <Tooltip title="عرض" arrow>
                                <IconButton size="small" onClick={() => handleViewMedia(media)}>
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="تحميل" arrow>
                                <IconButton size="small">
                                  <DownloadIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="حذف" arrow>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleDeleteMedia(media.id)}
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
              )}
              {viewMode === 'list' && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={mediaData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Media Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة ملف جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ py: 3 }}
              >
                رفع ملف
                <input type="file" hidden multiple />
              </Button>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم الملف"
                placeholder="صورة المنتج الرئيسي"
                helperText="اسم واضح ومحدد للملف"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف الملف"
                placeholder="صورة عالية الجودة للمنتج الرئيسي"
                multiline
                rows={3}
                helperText="وصف تفصيلي للملف"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>النوع</InputLabel>
                <Select label="النوع">
                  {fileTypes.map((type) => (
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
                label="العلامات"
                placeholder="منتج, رئيسي, صورة"
                helperText="افصل العلامات بفاصلة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="ملف عام" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="ملف مميز" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة الملف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Media Details Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل الملف
          </Typography>
          {selectedMedia && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <img
                  src={selectedMedia.thumbnail || selectedMedia.url}
                  alt={selectedMedia.alt}
                  style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
                />
              </Box>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                {selectedMedia.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedMedia.description}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary="النوع"
                    secondary={
                      fileTypes.find((ft) => ft.value === selectedMedia.type)?.label ||
                      selectedMedia.type
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحجم" secondary={selectedMedia.size} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التنسيق" secondary={selectedMedia.format.toUpperCase()} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الفئة" secondary={selectedMedia.category} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رفع بواسطة" secondary={selectedMedia.uploadedBy} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تاريخ الرفع" secondary={selectedMedia.uploadedAt} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="آخر تعديل" secondary={selectedMedia.lastModified} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المشاهدات"
                    secondary={selectedMedia.views.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="التحميلات"
                    secondary={selectedMedia.downloads.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الأبعاد" secondary={selectedMedia.dimensions} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العلامات" secondary={selectedMedia.tags.join(', ')} />
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

export default MediaLibrary;
