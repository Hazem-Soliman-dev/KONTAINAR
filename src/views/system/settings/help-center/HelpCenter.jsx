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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  LinearProgress,
  Skeleton,
  Divider,
  Stack,
  Avatar,
  Checkbox,
  TableSortLabel,
  ListItemText,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
} from '@mui/material';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Save as SaveIcon,
  Home as HomeIcon,
  CheckCircleOutline as CheckIcon,
  Download as DownloadIcon,
  Assignment as AssignmentIcon,
  HelpCenter as HelpCenterIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const HelpCenter = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for help center articles
  const articlesData = [
    {
      id: 1,
      title: 'كيفية إضافة منتج جديد',
      content: 'هذا دليل شامل لإضافة منتج جديد في النظام. يتضمن خطوات مفصلة مع الصور التوضيحية.',
      category: 'products',
      status: 'published',
      priority: 'high',
      tags: ['منتجات', 'إضافة', 'دليل'],
      author: 'فريق الدعم',
      createdDate: '2024-01-01',
      lastModified: '2024-01-15',
      views: 1250,
      helpful: 95,
      notHelpful: 5,
      language: 'ar',
      isFeatured: true,
      isPinned: false,
      attachments: [
        { name: 'دليل إضافة المنتج.pdf', type: 'pdf', size: '2.5 MB' },
        { name: 'صورة توضيحية.png', type: 'image', size: '1.2 MB' },
      ],
      relatedArticles: [2, 3, 4],
      comments: [
        {
          id: 1,
          author: 'أحمد محمد',
          content: 'شكراً لك، هذا الدليل مفيد جداً',
          date: '2024-01-10',
          isHelpful: true,
        },
        {
          id: 2,
          author: 'سارة أحمد',
          content: 'هل يمكن إضافة المزيد من التفاصيل حول التصنيفات؟',
          date: '2024-01-12',
          isHelpful: false,
        },
      ],
    },
    {
      id: 2,
      title: 'إدارة الطلبات والمتابعة',
      content: 'دليل شامل لإدارة الطلبات من الاستلام حتى التسليم مع إمكانيات المتابعة المتقدمة.',
      category: 'orders',
      status: 'published',
      priority: 'high',
      tags: ['طلبات', 'إدارة', 'متابعة'],
      author: 'فريق الدعم',
      createdDate: '2024-01-02',
      lastModified: '2024-01-16',
      views: 980,
      helpful: 88,
      notHelpful: 12,
      language: 'ar',
      isFeatured: true,
      isPinned: false,
      attachments: [{ name: 'دليل إدارة الطلبات.pdf', type: 'pdf', size: '3.1 MB' }],
      relatedArticles: [1, 5, 6],
      comments: [
        {
          id: 3,
          author: 'محمد علي',
          content: 'مفيد جداً، شكراً لكم',
          date: '2024-01-14',
          isHelpful: true,
        },
      ],
    },
    {
      id: 3,
      title: 'إعدادات النظام الأساسية',
      content: 'دليل شامل لإعدادات النظام الأساسية والتكوين الأولي للنظام.',
      category: 'settings',
      status: 'published',
      priority: 'medium',
      tags: ['إعدادات', 'نظام', 'تكوين'],
      author: 'فريق الدعم',
      createdDate: '2024-01-03',
      lastModified: '2024-01-17',
      views: 750,
      helpful: 82,
      notHelpful: 18,
      language: 'ar',
      isFeatured: false,
      isPinned: true,
      attachments: [],
      relatedArticles: [7, 8, 9],
      comments: [
        {
          id: 4,
          author: 'فاطمة محمد',
          content: 'هل يمكن إضافة المزيد من الأمثلة؟',
          date: '2024-01-18',
          isHelpful: false,
        },
      ],
    },
    {
      id: 4,
      title: 'تقارير المبيعات والتحليلات',
      content: 'دليل شامل لاستخدام تقارير المبيعات والتحليلات المتقدمة في النظام.',
      category: 'reports',
      status: 'published',
      priority: 'medium',
      tags: ['تقارير', 'مبيعات', 'تحليلات'],
      author: 'فريق الدعم',
      createdDate: '2024-01-04',
      lastModified: '2024-01-19',
      views: 650,
      helpful: 78,
      notHelpful: 22,
      language: 'ar',
      isFeatured: false,
      isPinned: false,
      attachments: [
        { name: 'دليل التقارير.pdf', type: 'pdf', size: '4.2 MB' },
        { name: 'أمثلة التقارير.xlsx', type: 'excel', size: '1.8 MB' },
      ],
      relatedArticles: [10, 11, 12],
      comments: [],
    },
    {
      id: 5,
      title: 'إدارة المستودعات والمخزون',
      content: 'دليل شامل لإدارة المستودعات والمخزون مع إمكانيات التتبع المتقدمة.',
      category: 'inventory',
      status: 'published',
      priority: 'high',
      tags: ['مستودعات', 'مخزون', 'إدارة'],
      author: 'فريق الدعم',
      createdDate: '2024-01-05',
      lastModified: '2024-01-20',
      views: 890,
      helpful: 91,
      notHelpful: 9,
      language: 'ar',
      isFeatured: true,
      isPinned: false,
      attachments: [{ name: 'دليل إدارة المخزون.pdf', type: 'pdf', size: '3.8 MB' }],
      relatedArticles: [2, 13, 14],
      comments: [
        {
          id: 5,
          author: 'خالد أحمد',
          content: 'مفيد جداً، شكراً لكم',
          date: '2024-01-21',
          isHelpful: true,
        },
      ],
    },
    {
      id: 6,
      title: 'إدارة العملاء والعلاقات',
      content: 'دليل شامل لإدارة العملاء وبناء العلاقات مع إمكانيات CRM المتقدمة.',
      category: 'customers',
      status: 'published',
      priority: 'medium',
      tags: ['عملاء', 'علاقات', 'CRM'],
      author: 'فريق الدعم',
      createdDate: '2024-01-06',
      lastModified: '2024-01-22',
      views: 720,
      helpful: 85,
      notHelpful: 15,
      language: 'ar',
      isFeatured: false,
      isPinned: false,
      attachments: [],
      relatedArticles: [15, 16, 17],
      comments: [],
    },
    {
      id: 7,
      title: 'إعدادات الأمان والحماية',
      content: 'دليل شامل لإعدادات الأمان والحماية في النظام مع أفضل الممارسات.',
      category: 'security',
      status: 'published',
      priority: 'high',
      tags: ['أمان', 'حماية', 'إعدادات'],
      author: 'فريق الدعم',
      createdDate: '2024-01-07',
      lastModified: '2024-01-23',
      views: 580,
      helpful: 92,
      notHelpful: 8,
      language: 'ar',
      isFeatured: true,
      isPinned: true,
      attachments: [{ name: 'دليل الأمان.pdf', type: 'pdf', size: '2.9 MB' }],
      relatedArticles: [3, 18, 19],
      comments: [],
    },
    {
      id: 8,
      title: 'استخدام التقارير المالية',
      content: 'دليل شامل لاستخدام التقارير المالية والمحاسبية في النظام.',
      category: 'finance',
      status: 'published',
      priority: 'medium',
      tags: ['تقارير', 'مالية', 'محاسبة'],
      author: 'فريق الدعم',
      createdDate: '2024-01-08',
      lastModified: '2024-01-24',
      views: 680,
      helpful: 87,
      notHelpful: 13,
      language: 'ar',
      isFeatured: false,
      isPinned: false,
      attachments: [{ name: 'دليل التقارير المالية.pdf', type: 'pdf', size: '3.5 MB' }],
      relatedArticles: [4, 20, 21],
      comments: [],
    },
    {
      id: 9,
      title: 'إدارة المستخدمين والصلاحيات',
      content: 'دليل شامل لإدارة المستخدمين والصلاحيات في النظام.',
      category: 'users',
      status: 'published',
      priority: 'medium',
      tags: ['مستخدمين', 'صلاحيات', 'إدارة'],
      author: 'فريق الدعم',
      createdDate: '2024-01-09',
      lastModified: '2024-01-25',
      views: 620,
      helpful: 83,
      notHelpful: 17,
      language: 'ar',
      isFeatured: false,
      isPinned: false,
      attachments: [],
      relatedArticles: [7, 22, 23],
      comments: [],
    },
    {
      id: 10,
      title: 'استكشاف الأخطاء وإصلاحها',
      content: 'دليل شامل لاستكشاف الأخطاء الشائعة وإصلاحها في النظام.',
      category: 'troubleshooting',
      status: 'published',
      priority: 'high',
      tags: ['أخطاء', 'إصلاح', 'استكشاف'],
      author: 'فريق الدعم',
      createdDate: '2024-01-10',
      lastModified: '2024-01-26',
      views: 1100,
      helpful: 94,
      notHelpful: 6,
      language: 'ar',
      isFeatured: true,
      isPinned: true,
      attachments: [{ name: 'دليل استكشاف الأخطاء.pdf', type: 'pdf', size: '4.1 MB' }],
      relatedArticles: [24, 25, 26],
      comments: [
        {
          id: 6,
          author: 'نورا محمد',
          content: 'مفيد جداً، ساعدني في حل مشكلة',
          date: '2024-01-27',
          isHelpful: true,
        },
      ],
    },
  ];

  const articleStatuses = [
    { value: 'published', label: 'منشور', color: 'success' },
    { value: 'draft', label: 'مسودة', color: 'warning' },
    { value: 'archived', label: 'مؤرشف', color: 'info' },
    { value: 'pending', label: 'في الانتظار', color: 'error' },
  ];

  const articleCategories = [
    { value: 'products', label: 'المنتجات', color: 'primary' },
    { value: 'orders', label: 'الطلبات', color: 'success' },
    { value: 'settings', label: 'الإعدادات', color: 'info' },
    { value: 'reports', label: 'التقارير', color: 'warning' },
    { value: 'inventory', label: 'المخزون', color: 'error' },
    { value: 'customers', label: 'العملاء', color: 'secondary' },
    { value: 'security', label: 'الأمان', color: 'error' },
    { value: 'finance', label: 'المالية', color: 'success' },
    { value: 'users', label: 'المستخدمين', color: 'info' },
    { value: 'troubleshooting', label: 'استكشاف الأخطاء', color: 'warning' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'منخفض', color: 'success' },
    { value: 'medium', label: 'متوسط', color: 'warning' },
    { value: 'high', label: 'عالي', color: 'error' },
  ];

  const languages = [
    { value: 'ar', label: 'العربية', color: 'primary' },
    { value: 'en', label: 'الإنجليزية', color: 'info' },
    { value: 'fr', label: 'الفرنسية', color: 'success' },
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
    notify(`${action} المقالات`, `${selectedItems.length} مقال`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (article) => {
    setSelectedArticle(article);
    setOpenViewDialog(true);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setOpenDialog(true);
  };

  const handleDelete = (article) => {
    setSelectedArticle(article);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المقال', selectedArticle ? 'تم تحديث المقال' : 'تم إضافة المقال');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المقال', 'تم حذف المقال');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير المقالات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = articlesData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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

  const getStatusColor = (status) => {
    const statusInfo = articleStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = articleStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getCategoryColor = (category) => {
    const categoryInfo = articleCategories.find((c) => c.value === category);
    return categoryInfo ? categoryInfo.color : 'default';
  };

  const getCategoryLabel = (category) => {
    const categoryInfo = articleCategories.find((c) => c.value === category);
    return categoryInfo ? categoryInfo.label : category;
  };

  const getPriorityColor = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.color : 'default';
  };

  const getPriorityLabel = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.label : priority;
  };

  const getLanguageColor = (language) => {
    const languageInfo = languages.find((l) => l.value === language);
    return languageInfo ? languageInfo.color : 'default';
  };

  const getLanguageLabel = (language) => {
    const languageInfo = languages.find((l) => l.value === language);
    return languageInfo ? languageInfo.label : language;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const getDensityProps = () => {
    switch (density) {
      case 'compact':
        return { size: 'small' };
      case 'comfortable':
        return { size: 'medium' };
      default:
        return { size: 'small' };
    }
  };

  const totalArticles = articlesData.length;
  const publishedArticles = articlesData.filter((article) => article.status === 'published').length;
  const featuredArticles = articlesData.filter((article) => article.isFeatured).length;
  const pinnedArticles = articlesData.filter((article) => article.isPinned).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          مركز المساعدة
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة مقالات المساعدة والدعم مع إمكانية التعديل والمراقبة.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/settings">
            الإعدادات
          </Link>
          <Typography color="text.primary">مركز المساعدة</Typography>
        </Breadcrumbs>
      </Box>

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
                  <HelpCenterIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalArticles}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المقالات
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
                  <CheckIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {publishedArticles}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                منشورة
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
                  <StarIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {featuredArticles}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مميزة
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
                  <AssignmentIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {pinnedArticles}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مثبتة
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="البحث في المقالات..."
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
                  <MenuItem value="all">جميع الحالات</MenuItem>
                  {articleStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>التصنيف</InputLabel>
                <Select
                  value={categoryFilter}
                  label="التصنيف"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع التصنيفات</MenuItem>
                  {articleCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                fullWidth
              >
                إعادة تعيين
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                تم العثور على {filteredData.length}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            قائمة مقالات المساعدة
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تحديث الحالة')} sx={{ mr: 1 }}>
                تحديث الحالة ({selectedItems.length})
              </Button>
              <Button size="small" color="error" onClick={() => handleBulkAction('حذف')}>
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Tooltip title="تصدير CSV">
            <IconButton onClick={handleExport} sx={{ mr: 1 }}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة مقال
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={60} sx={{ mb: 1 }} />
            ))}
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error">خطأ في تحميل المقالات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على مقالات. أضف أول مقال.</Alert>
          </Box>
        ) : (
          <>
            <Table {...getDensityProps()}>
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
                      active={sortBy === 'title'}
                      direction={sortBy === 'title' ? sortOrder : 'asc'}
                      onClick={() => handleSort('title')}
                    >
                      عنوان المقال
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'category'}
                      direction={sortBy === 'category' ? sortOrder : 'asc'}
                      onClick={() => handleSort('category')}
                    >
                      التصنيف
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'status'}
                      direction={sortBy === 'status' ? sortOrder : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      الحالة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'priority'}
                      direction={sortBy === 'priority' ? sortOrder : 'asc'}
                      onClick={() => handleSort('priority')}
                    >
                      الأولوية
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'views'}
                      direction={sortBy === 'views' ? sortOrder : 'asc'}
                      onClick={() => handleSort('views')}
                    >
                      المشاهدات
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'helpful'}
                      direction={sortBy === 'helpful' ? sortOrder : 'asc'}
                      onClick={() => handleSort('helpful')}
                    >
                      مفيد
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
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            {item.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block' }}
                          >
                            {item.content.substring(0, 100)}...
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {item.isFeatured && (
                              <Chip label="مميز" size="small" color="warning" variant="outlined" />
                            )}
                            {item.isPinned && (
                              <Chip label="مثبت" size="small" color="error" variant="outlined" />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getCategoryLabel(item.category)}
                          size="small"
                          color={getCategoryColor(item.category)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getPriorityLabel(item.priority)}
                          size="small"
                          color={getPriorityColor(item.priority)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.views.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                            {item.helpful}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            /
                          </Typography>
                          <Typography variant="body2" color="error.main" sx={{ fontWeight: 500 }}>
                            {item.notHelpful}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض المقال" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل المقال" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف المقال" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
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

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedArticle ? 'تعديل المقال' : 'إضافة مقال جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="عنوان المقال"
                placeholder="أدخل عنوان المقال"
                defaultValue={selectedArticle?.title || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="محتوى المقال"
                placeholder="أدخل محتوى المقال"
                defaultValue={selectedArticle?.content || ''}
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>التصنيف</InputLabel>
                <Select label="التصنيف" defaultValue={selectedArticle?.category || 'products'}>
                  {articleCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedArticle?.status || 'draft'}>
                  {articleStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية" defaultValue={selectedArticle?.priority || 'medium'}>
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>اللغة</InputLabel>
                <Select label="اللغة" defaultValue={selectedArticle?.language || 'ar'}>
                  {languages.map((language) => (
                    <MenuItem key={language.value} value={language.value}>
                      {language.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="العلامات"
                placeholder="منتجات، إضافة، دليل"
                defaultValue={selectedArticle?.tags?.join(', ') || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المؤلف"
                placeholder="أدخل اسم المؤلف"
                defaultValue={selectedArticle?.author || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={<Switch defaultChecked={selectedArticle?.isFeatured || false} />}
                label="مميز"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={<Switch defaultChecked={selectedArticle?.isPinned || false} />}
                label="مثبت"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف المقال</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا المقال؟
          </Typography>
          {selectedArticle && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedArticle.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedArticle.category} - {selectedArticle.status}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            disabled={loading}
          >
            {loading ? 'جاري الحذف...' : 'حذف'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Drawer */}
      <Drawer
        anchor="right"
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        sx={{ '& .MuiDrawer-paper': { width: 600 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل المقال
          </Typography>
          {selectedArticle && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <HelpCenterIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedArticle.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedArticle.author}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="عنوان المقال" secondary={selectedArticle.title} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المحتوى" secondary={selectedArticle.content} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="التصنيف"
                    secondary={getCategoryLabel(selectedArticle.category)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedArticle.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedArticle.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="اللغة"
                    secondary={getLanguageLabel(selectedArticle.language)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المؤلف" secondary={selectedArticle.author} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المشاهدات"
                    secondary={selectedArticle.views.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="مفيد" secondary={selectedArticle.helpful} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="غير مفيد" secondary={selectedArticle.notHelpful} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="مميز"
                    secondary={selectedArticle.isFeatured ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="مثبت"
                    secondary={selectedArticle.isPinned ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العلامات" secondary={selectedArticle.tags.join(', ')} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الإنشاء"
                    secondary={formatDate(selectedArticle.createdDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="آخر تعديل"
                    secondary={formatDate(selectedArticle.lastModified)}
                  />
                </ListItem>
              </List>
              {selectedArticle.attachments && selectedArticle.attachments.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    المرفقات
                  </Typography>
                  <List dense>
                    {selectedArticle.attachments.map((attachment, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={attachment.name}
                          secondary={`${attachment.type} - ${attachment.size}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              {selectedArticle.comments && selectedArticle.comments.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    التعليقات
                  </Typography>
                  <List dense>
                    {selectedArticle.comments.map((comment) => (
                      <ListItem key={comment.id}>
                        <ListItemText primary={comment.author} secondary={comment.content} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
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
  );
};

export default HelpCenter;
