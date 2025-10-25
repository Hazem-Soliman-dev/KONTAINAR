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
  Card,
  CardContent,
  Divider,
  Stack,
  Avatar,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Menu,
  ListItemIcon,
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
  Download as DownloadIcon,
  AttachMoney as AttachMoneyIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Work as ProjectIcon,
} from '@mui/icons-material';

const ProjectsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for projects
  const projectsData = [
    {
      id: 1,
      name: 'مشروع نظام إدارة المخزون',
      description: 'تطوير نظام شامل لإدارة المخزون مع واجهة ويب وتطبيق جوال',
      status: 'in_progress',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      actualEndDate: null,
      budget: 500000,
      spent: 250000,
      currency: 'SAR',
      progress: 65,
      client: 'شركة التقنية المتقدمة',
      projectManager: 'أحمد محمد السعيد',
      team: [
        { id: 1, name: 'سارة أحمد', role: 'مطور فرونت إند', avatar: 'S' },
        { id: 2, name: 'خالد محمد', role: 'مطور باك إند', avatar: 'K' },
        { id: 3, name: 'فاطمة علي', role: 'مصمم واجهات', avatar: 'F' },
      ],
      tasks: [
        { id: 1, name: 'تحليل المتطلبات', status: 'completed', progress: 100 },
        { id: 2, name: 'تصميم قاعدة البيانات', status: 'completed', progress: 100 },
        { id: 3, name: 'تطوير الواجهة الأمامية', status: 'in_progress', progress: 80 },
        { id: 4, name: 'تطوير الواجهة الخلفية', status: 'in_progress', progress: 60 },
        { id: 5, name: 'اختبار النظام', status: 'pending', progress: 0 },
        { id: 6, name: 'نشر النظام', status: 'pending', progress: 0 },
      ],
      milestones: [
        { id: 1, name: 'إكمال التحليل', date: '2024-02-15', status: 'completed' },
        { id: 2, name: 'إكمال التصميم', date: '2024-03-15', status: 'completed' },
        { id: 3, name: 'إكمال التطوير', date: '2024-05-15', status: 'pending' },
        { id: 4, name: 'إكمال الاختبار', date: '2024-06-01', status: 'pending' },
        { id: 5, name: 'إكمال النشر', date: '2024-06-15', status: 'pending' },
      ],
      risks: [
        { id: 1, name: 'تأخير في التطوير', level: 'medium', impact: 'تأخير في التسليم' },
        { id: 2, name: 'تغيير في المتطلبات', level: 'high', impact: 'زيادة في التكلفة' },
      ],
      notes: 'مشروع مهم للعميل، يحتاج متابعة مستمرة',
    },
    {
      id: 2,
      name: 'مشروع تطوير تطبيق جوال',
      description: 'تطوير تطبيق جوال لإدارة المبيعات مع ميزات متقدمة',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-03-01',
      endDate: '2024-08-01',
      actualEndDate: null,
      budget: 300000,
      spent: 0,
      currency: 'SAR',
      progress: 15,
      client: 'شركة المبيعات الحديثة',
      projectManager: 'فاطمة علي حسن',
      team: [
        { id: 4, name: 'محمد عبدالله', role: 'مطور تطبيقات جوال', avatar: 'M' },
        { id: 5, name: 'نورا سالم', role: 'مصمم تجربة المستخدم', avatar: 'N' },
      ],
      tasks: [
        { id: 7, name: 'تحليل المتطلبات', status: 'in_progress', progress: 50 },
        { id: 8, name: 'تصميم التطبيق', status: 'pending', progress: 0 },
        { id: 9, name: 'تطوير التطبيق', status: 'pending', progress: 0 },
        { id: 10, name: 'اختبار التطبيق', status: 'pending', progress: 0 },
      ],
      milestones: [
        { id: 6, name: 'إكمال التحليل', date: '2024-03-15', status: 'pending' },
        { id: 7, name: 'إكمال التصميم', date: '2024-04-15', status: 'pending' },
        { id: 8, name: 'إكمال التطوير', date: '2024-07-01', status: 'pending' },
        { id: 9, name: 'إكمال الاختبار', date: '2024-07-15', status: 'pending' },
        { id: 10, name: 'إكمال النشر', date: '2024-08-01', status: 'pending' },
      ],
      risks: [{ id: 3, name: 'تعقيد التطبيق', level: 'high', impact: 'زيادة في الوقت المطلوب' }],
      notes: 'مشروع جديد، يحتاج تخطيط دقيق',
    },
    {
      id: 3,
      name: 'مشروع تحديث النظام القديم',
      description: 'تحديث نظام إدارة الموظفين القديم إلى نظام حديث',
      status: 'completed',
      priority: 'low',
      startDate: '2023-10-01',
      endDate: '2024-01-31',
      actualEndDate: '2024-01-25',
      budget: 200000,
      spent: 180000,
      currency: 'SAR',
      progress: 100,
      client: 'شركة الخدمات التقنية',
      projectManager: 'سارة أحمد محمد',
      team: [
        { id: 6, name: 'خالد حسن', role: 'مطور', avatar: 'K' },
        { id: 7, name: 'أحمد علي', role: 'محلل نظم', avatar: 'A' },
      ],
      tasks: [
        { id: 11, name: 'تحليل النظام القديم', status: 'completed', progress: 100 },
        { id: 12, name: 'تصميم النظام الجديد', status: 'completed', progress: 100 },
        { id: 13, name: 'تطوير النظام', status: 'completed', progress: 100 },
        { id: 14, name: 'اختبار النظام', status: 'completed', progress: 100 },
        { id: 15, name: 'نشر النظام', status: 'completed', progress: 100 },
      ],
      milestones: [
        { id: 11, name: 'إكمال التحليل', date: '2023-11-01', status: 'completed' },
        { id: 12, name: 'إكمال التصميم', date: '2023-12-01', status: 'completed' },
        { id: 13, name: 'إكمال التطوير', date: '2024-01-01', status: 'completed' },
        { id: 14, name: 'إكمال الاختبار', date: '2024-01-15', status: 'completed' },
        { id: 15, name: 'إكمال النشر', date: '2024-01-25', status: 'completed' },
      ],
      risks: [],
      notes: 'تم إكمال المشروع بنجاح قبل الموعد المحدد',
    },
    {
      id: 4,
      name: 'مشروع تطوير موقع إلكتروني',
      description: 'تطوير موقع إلكتروني للشركة مع نظام إدارة المحتوى',
      status: 'on_hold',
      priority: 'medium',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      actualEndDate: null,
      budget: 150000,
      spent: 45000,
      currency: 'SAR',
      progress: 30,
      client: 'شركة التسويق الرقمي',
      projectManager: 'خالد محمد علي',
      team: [
        { id: 8, name: 'نورا أحمد', role: 'مطور ويب', avatar: 'N' },
        { id: 9, name: 'محمد سالم', role: 'مصمم جرافيك', avatar: 'M' },
      ],
      tasks: [
        { id: 16, name: 'تحليل المتطلبات', status: 'completed', progress: 100 },
        { id: 17, name: 'تصميم الموقع', status: 'in_progress', progress: 60 },
        { id: 18, name: 'تطوير الموقع', status: 'pending', progress: 0 },
        { id: 19, name: 'اختبار الموقع', status: 'pending', progress: 0 },
      ],
      milestones: [
        { id: 16, name: 'إكمال التحليل', date: '2024-02-15', status: 'completed' },
        { id: 17, name: 'إكمال التصميم', date: '2024-03-15', status: 'pending' },
        { id: 18, name: 'إكمال التطوير', date: '2024-04-15', status: 'pending' },
        { id: 19, name: 'إكمال الاختبار', date: '2024-04-30', status: 'pending' },
      ],
      risks: [{ id: 4, name: 'تغيير في التصميم', level: 'medium', impact: 'تأخير في التطوير' }],
      notes: 'المشروع متوقف مؤقتاً بسبب تغيير في المتطلبات',
    },
  ];

  const projectStatuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'planning', label: 'تخطيط', color: 'info' },
    { value: 'in_progress', label: 'قيد التنفيذ', color: 'primary' },
    { value: 'on_hold', label: 'متوقف', color: 'warning' },
    { value: 'completed', label: 'مكتمل', color: 'success' },
    { value: 'cancelled', label: 'ملغي', color: 'error' },
  ];

  const priorityLevels = [
    { value: 'all', label: 'جميع الأولويات' },
    { value: 'low', label: 'منخفض', color: 'default' },
    { value: 'medium', label: 'متوسط', color: 'warning' },
    { value: 'high', label: 'عالي', color: 'error' },
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
    notify(`${action} المشاريع`, `${selectedItems.length} مشروع`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (project) => {
    setSelectedProject(project);
    setOpenViewDialog(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المشروع', selectedProject ? 'تم تحديث المشروع' : 'تم إنشاء المشروع');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المشروع', 'تم حذف المشروع');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير المشاريع', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = projectsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.projectManager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
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
    const statusInfo = projectStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = projectStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getPriorityColor = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.color : 'default';
  };

  const getPriorityLabel = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.label : priority;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
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

  const totalProjects = projectsData.length;
  const activeProjects = projectsData.filter((project) => project.status === 'in_progress').length;
  const completedProjects = projectsData.filter((project) => project.status === 'completed').length;
  const totalBudget = projectsData.reduce((sum, project) => sum + project.budget, 0);
  const totalSpent = projectsData.reduce((sum, project) => sum + project.spent, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          قائمة المشاريع
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة شاملة للمشاريع مع تتبع التقدم والميزانية والمواعيد النهائية.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/projects">
            إدارة المشاريع
          </Link>
          <Typography color="text.primary">قائمة المشاريع</Typography>
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
                  <ProjectIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalProjects}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المشاريع
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
                {completedProjects}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مشاريع مكتملة
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
                  <PendingIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {activeProjects}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مشاريع نشطة
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
                  <AttachMoneyIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {formatCurrency(totalBudget)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الميزانية
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
                placeholder="البحث في المشاريع..."
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
                  {projectStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الأولوية</InputLabel>
                <Select
                  value={priorityFilter}
                  label="الأولوية"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
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
                  setPriorityFilter('all');
                }}
                fullWidth
              >
                إعادة تعيين
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
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
            قائمة المشاريع
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تصدير')} sx={{ mr: 1 }}>
                تصدير ({selectedItems.length})
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
            إضافة مشروع جديد
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
            <Alert severity="error">خطأ في تحميل المشاريع. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على مشاريع. أضف أول مشروع.</Alert>
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
                      active={sortBy === 'name'}
                      direction={sortBy === 'name' ? sortOrder : 'asc'}
                      onClick={() => handleSort('name')}
                    >
                      المشروع
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
                      active={sortBy === 'progress'}
                      direction={sortBy === 'progress' ? sortOrder : 'asc'}
                      onClick={() => handleSort('progress')}
                    >
                      التقدم
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'budget'}
                      direction={sortBy === 'budget' ? sortOrder : 'asc'}
                      onClick={() => handleSort('budget')}
                    >
                      الميزانية
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'startDate'}
                      direction={sortBy === 'startDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('startDate')}
                    >
                      تاريخ البداية
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
                          <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                            {item.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.client}
                            </Typography>
                          </Box>
                        </Box>
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
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {item.progress}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={item.progress}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.budget)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          أنفق: {formatCurrency(item.spent)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.startDate)}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          انتهاء: {formatDate(item.endDate)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل المشروع" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف المشروع" arrow>
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
        <DialogTitle>{selectedProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم المشروع"
                placeholder="أدخل اسم المشروع"
                defaultValue={selectedProject?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="العميل"
                placeholder="أدخل اسم العميل"
                defaultValue={selectedProject?.client || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="مدير المشروع"
                placeholder="أدخل اسم مدير المشروع"
                defaultValue={selectedProject?.projectManager || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedProject?.status || 'planning'}>
                  {projectStatuses
                    .filter((status) => status.value !== 'all')
                    .map((status) => (
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
                <Select label="الأولوية" defaultValue={selectedProject?.priority || 'medium'}>
                  {priorityLevels
                    .filter((priority) => priority.value !== 'all')
                    .map((priority) => (
                      <MenuItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="الميزانية"
                placeholder="0.00"
                defaultValue={selectedProject?.budget || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ البداية"
                defaultValue={selectedProject?.startDate || ''}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ النهاية"
                defaultValue={selectedProject?.endDate || ''}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="التقدم (%)"
                placeholder="0"
                defaultValue={selectedProject?.progress || ''}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف المشروع"
                placeholder="أدخل وصف المشروع"
                defaultValue={selectedProject?.description || ''}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
                defaultValue={selectedProject?.notes || ''}
                multiline
                rows={3}
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
        <DialogTitle>حذف المشروع</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا المشروع؟
          </Typography>
          {selectedProject && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedProject.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProject.client} - {formatCurrency(selectedProject.budget)}
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
            تفاصيل المشروع
          </Typography>
          {selectedProject && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  {selectedProject.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedProject.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedProject.client}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم المشروع" secondary={selectedProject.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العميل" secondary={selectedProject.client} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="مدير المشروع" secondary={selectedProject.projectManager} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedProject.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedProject.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التقدم" secondary={`${selectedProject.progress}%`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الميزانية"
                    secondary={formatCurrency(selectedProject.budget)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبلغ المنفق"
                    secondary={formatCurrency(selectedProject.spent)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ البداية"
                    secondary={formatDate(selectedProject.startDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ النهاية"
                    secondary={formatDate(selectedProject.endDate)}
                  />
                </ListItem>
                {selectedProject.actualEndDate && (
                  <ListItem>
                    <ListItemText
                      primary="تاريخ الانتهاء الفعلي"
                      secondary={formatDate(selectedProject.actualEndDate)}
                    />
                  </ListItem>
                )}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                وصف المشروع
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedProject.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                فريق العمل
              </Typography>
              <List dense>
                {selectedProject.team.map((member) => (
                  <ListItem key={member.id}>
                    <Avatar sx={{ width: 32, height: 32, mr: 2 }}>{member.avatar}</Avatar>
                    <ListItemText primary={member.name} secondary={member.role} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المهام
              </Typography>
              <List dense>
                {selectedProject.tasks.map((task) => (
                  <ListItem key={task.id}>
                    <ListItemText
                      primary={task.name}
                      secondary={`${task.status} - ${task.progress}%`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المعالم
              </Typography>
              <List dense>
                {selectedProject.milestones.map((milestone) => (
                  <ListItem key={milestone.id}>
                    <ListItemText
                      primary={milestone.name}
                      secondary={`${formatDate(milestone.date)} - ${milestone.status}`}
                    />
                  </ListItem>
                ))}
              </List>
              {selectedProject.risks.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    المخاطر
                  </Typography>
                  <List dense>
                    {selectedProject.risks.map((risk) => (
                      <ListItem key={risk.id}>
                        <ListItemText
                          primary={risk.name}
                          secondary={`${risk.level} - ${risk.impact}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProject.notes}
              </Typography>
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

export default ProjectsList;
