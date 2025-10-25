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
  ListItemButton,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  Search as SearchIcon,
  FilterList as FilterIcon,
  Save as SaveIcon,
  Home as HomeIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const Tasks = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'

  // Mock data for tasks
  const tasksData = [
    {
      id: 1,
      title: 'تحليل متطلبات نظام إدارة المخزون',
      description: 'تحليل شامل لمتطلبات العميل وتحديد المواصفات التقنية',
      project: 'مشروع نظام إدارة المخزون',
      projectId: 1,
      status: 'completed',
      priority: 'high',
      assignee: 'أحمد محمد السعيد',
      assigneeId: 1,
      reporter: 'سارة أحمد',
      reporterId: 2,
      dueDate: '2024-02-15',
      startDate: '2024-01-15',
      completedDate: '2024-02-10',
      estimatedHours: 40,
      actualHours: 35,
      progress: 100,
      tags: ['تحليل', 'متطلبات', 'نظام'],
      subtasks: [
        { id: 1, title: 'مقابلة العميل', status: 'completed' },
        { id: 2, title: 'تحليل العمليات', status: 'completed' },
        { id: 3, title: 'كتابة المواصفات', status: 'completed' },
      ],
      comments: [
        { id: 1, author: 'أحمد محمد السعيد', text: 'تم الانتهاء من التحليل', date: '2024-02-10' },
        { id: 2, author: 'سارة أحمد', text: 'ممتاز، العمل جيد', date: '2024-02-11' },
      ],
      attachments: [
        { id: 1, name: 'مواصفات النظام.pdf', size: '2.5 MB', type: 'pdf' },
        { id: 2, name: 'مخطط العمليات.vsd', size: '1.2 MB', type: 'vsd' },
      ],
    },
    {
      id: 2,
      title: 'تصميم قاعدة البيانات',
      description: 'تصميم قاعدة البيانات للمشروع مع تحديد الجداول والعلاقات',
      project: 'مشروع نظام إدارة المخزون',
      projectId: 1,
      status: 'completed',
      priority: 'high',
      assignee: 'خالد محمد',
      assigneeId: 3,
      reporter: 'أحمد محمد السعيد',
      reporterId: 1,
      dueDate: '2024-03-15',
      startDate: '2024-02-16',
      completedDate: '2024-03-10',
      estimatedHours: 30,
      actualHours: 28,
      progress: 100,
      tags: ['تصميم', 'قاعدة بيانات', 'نظام'],
      subtasks: [
        { id: 4, title: 'تحليل البيانات', status: 'completed' },
        { id: 5, title: 'تصميم الجداول', status: 'completed' },
        { id: 6, title: 'تحديد العلاقات', status: 'completed' },
      ],
      comments: [
        { id: 3, author: 'خالد محمد', text: 'تم الانتهاء من التصميم', date: '2024-03-10' },
      ],
      attachments: [{ id: 3, name: 'مخطط قاعدة البيانات.sql', size: '0.8 MB', type: 'sql' }],
    },
    {
      id: 3,
      title: 'تطوير الواجهة الأمامية',
      description: 'تطوير واجهة المستخدم باستخدام React',
      project: 'مشروع نظام إدارة المخزون',
      projectId: 1,
      status: 'in_progress',
      priority: 'high',
      assignee: 'فاطمة علي',
      assigneeId: 4,
      reporter: 'أحمد محمد السعيد',
      reporterId: 1,
      dueDate: '2024-05-15',
      startDate: '2024-03-16',
      completedDate: null,
      estimatedHours: 80,
      actualHours: 45,
      progress: 60,
      tags: ['تطوير', 'واجهة', 'React'],
      subtasks: [
        { id: 7, title: 'إعداد المشروع', status: 'completed' },
        { id: 8, title: 'تطوير الصفحات الرئيسية', status: 'in_progress' },
        { id: 9, title: 'تطوير صفحات الإدارة', status: 'pending' },
        { id: 10, title: 'اختبار الواجهة', status: 'pending' },
      ],
      comments: [{ id: 4, author: 'فاطمة علي', text: 'التقدم جيد، 60% مكتمل', date: '2024-04-15' }],
      attachments: [{ id: 4, name: 'تصميم الواجهة.fig', size: '3.2 MB', type: 'fig' }],
    },
    {
      id: 4,
      title: 'تطوير الواجهة الخلفية',
      description: 'تطوير API والخادم باستخدام Node.js',
      project: 'مشروع نظام إدارة المخزون',
      projectId: 1,
      status: 'in_progress',
      priority: 'high',
      assignee: 'محمد عبدالله',
      assigneeId: 5,
      reporter: 'أحمد محمد السعيد',
      reporterId: 1,
      dueDate: '2024-05-15',
      startDate: '2024-03-16',
      completedDate: null,
      estimatedHours: 70,
      actualHours: 35,
      progress: 50,
      tags: ['تطوير', 'API', 'Node.js'],
      subtasks: [
        { id: 11, title: 'إعداد الخادم', status: 'completed' },
        { id: 12, title: 'تطوير API', status: 'in_progress' },
        { id: 13, title: 'ربط قاعدة البيانات', status: 'pending' },
        { id: 14, title: 'اختبار API', status: 'pending' },
      ],
      comments: [
        { id: 5, author: 'محمد عبدالله', text: 'التقدم 50%، API الأساسي جاهز', date: '2024-04-10' },
      ],
      attachments: [{ id: 5, name: 'مواصفات API.md', size: '0.5 MB', type: 'md' }],
    },
    {
      id: 5,
      title: 'اختبار النظام',
      description: 'اختبار شامل للنظام للتأكد من جودة الأداء',
      project: 'مشروع نظام إدارة المخزون',
      projectId: 1,
      status: 'pending',
      priority: 'medium',
      assignee: 'نورا سالم',
      assigneeId: 6,
      reporter: 'أحمد محمد السعيد',
      reporterId: 1,
      dueDate: '2024-06-01',
      startDate: '2024-05-16',
      completedDate: null,
      estimatedHours: 25,
      actualHours: 0,
      progress: 0,
      tags: ['اختبار', 'جودة', 'نظام'],
      subtasks: [
        { id: 15, title: 'اختبار الوحدة', status: 'pending' },
        { id: 16, title: 'اختبار التكامل', status: 'pending' },
        { id: 17, title: 'اختبار الأداء', status: 'pending' },
      ],
      comments: [],
      attachments: [],
    },
    {
      id: 6,
      title: 'نشر النظام',
      description: 'نشر النظام على الخادم وإعداد البيئة الإنتاجية',
      project: 'مشروع نظام إدارة المخزون',
      projectId: 1,
      status: 'pending',
      priority: 'medium',
      assignee: 'خالد حسن',
      assigneeId: 7,
      reporter: 'أحمد محمد السعيد',
      reporterId: 1,
      dueDate: '2024-06-15',
      startDate: '2024-06-01',
      completedDate: null,
      estimatedHours: 15,
      actualHours: 0,
      progress: 0,
      tags: ['نشر', 'إنتاج', 'نظام'],
      subtasks: [
        { id: 18, title: 'إعداد الخادم', status: 'pending' },
        { id: 19, title: 'نشر التطبيق', status: 'pending' },
        { id: 20, title: 'اختبار النشر', status: 'pending' },
      ],
      comments: [],
      attachments: [],
    },
    {
      id: 7,
      title: 'تحليل متطلبات التطبيق الجوال',
      description: 'تحليل متطلبات تطبيق إدارة المبيعات الجوال',
      project: 'مشروع تطوير تطبيق جوال',
      projectId: 2,
      status: 'in_progress',
      priority: 'medium',
      assignee: 'فاطمة علي حسن',
      assigneeId: 8,
      reporter: 'نورا سالم',
      reporterId: 6,
      dueDate: '2024-03-15',
      startDate: '2024-03-01',
      completedDate: null,
      estimatedHours: 35,
      actualHours: 20,
      progress: 50,
      tags: ['تحليل', 'تطبيق جوال', 'مبيعات'],
      subtasks: [
        { id: 21, title: 'مقابلة العميل', status: 'completed' },
        { id: 22, title: 'تحليل العمليات', status: 'in_progress' },
        { id: 23, title: 'كتابة المواصفات', status: 'pending' },
      ],
      comments: [
        {
          id: 6,
          author: 'فاطمة علي حسن',
          text: 'التقدم 50%، مقابلة العميل مكتملة',
          date: '2024-03-10',
        },
      ],
      attachments: [{ id: 6, name: 'متطلبات التطبيق.pdf', size: '1.8 MB', type: 'pdf' }],
    },
    {
      id: 8,
      title: 'تصميم واجهة التطبيق',
      description: 'تصميم واجهة المستخدم للتطبيق الجوال',
      project: 'مشروع تطوير تطبيق جوال',
      projectId: 2,
      status: 'pending',
      priority: 'medium',
      assignee: 'نورا سالم',
      assigneeId: 6,
      reporter: 'فاطمة علي حسن',
      reporterId: 8,
      dueDate: '2024-04-15',
      startDate: '2024-04-01',
      completedDate: null,
      estimatedHours: 40,
      actualHours: 0,
      progress: 0,
      tags: ['تصميم', 'واجهة', 'جوال'],
      subtasks: [
        { id: 24, title: 'تصميم الشاشات', status: 'pending' },
        { id: 25, title: 'تصميم التدفق', status: 'pending' },
        { id: 26, title: 'إنشاء النماذج', status: 'pending' },
      ],
      comments: [],
      attachments: [],
    },
  ];

  const projects = [
    { value: 'all', label: 'جميع المشاريع' },
    { value: 1, label: 'مشروع نظام إدارة المخزون' },
    { value: 2, label: 'مشروع تطوير تطبيق جوال' },
    { value: 3, label: 'مشروع تحديث النظام القديم' },
    { value: 4, label: 'مشروع تطوير موقع إلكتروني' },
  ];

  const taskStatuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'pending', label: 'في الانتظار', color: 'warning' },
    { value: 'in_progress', label: 'قيد التنفيذ', color: 'primary' },
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
    notify(`${action} المهام`, `${selectedItems.length} مهمة`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (task) => {
    setSelectedTask(task);
    setOpenViewDialog(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المهمة', selectedTask ? 'تم تحديث المهمة' : 'تم إنشاء المهمة');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المهمة', 'تم حذف المهمة');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير المهام', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = tasksData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || item.projectId === projectFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesProject && matchesStatus && matchesPriority;
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
    const statusInfo = taskStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = taskStatuses.find((s) => s.value === status);
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

  const totalTasks = tasksData.length;
  const completedTasks = tasksData.filter((task) => task.status === 'completed').length;
  const inProgressTasks = tasksData.filter((task) => task.status === 'in_progress').length;
  const pendingTasks = tasksData.filter((task) => task.status === 'pending').length;

  const renderKanbanBoard = () => {
    const statusColumns = taskStatuses.map((status) => ({
      ...status,
      tasks: filteredData.filter((task) => task.status === status.value),
    }));

    return (
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
        {statusColumns.map((column) => (
          <Card key={column.value} sx={{ minWidth: 300, flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip label={column.label} color={column.color} size="small" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ flex: 1 }}>
                  {column.tasks.length}
                </Typography>
              </Box>
              <Stack spacing={2}>
                {column.tasks.map((task) => (
                  <Card
                    key={task.id}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 2,
                      },
                    }}
                    onClick={() => handleView(task)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{task.title.charAt(0)}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">{task.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {task.project}
                        </Typography>
                      </Box>
                      <Chip
                        label={getPriorityLabel(task.priority)}
                        size="small"
                        color={getPriorityColor(task.priority)}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {task.assignee}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {task.progress}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(task.dueDate)}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة المهام
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة شاملة للمهام مع تتبع التقدم والمواعيد النهائية.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/projects">
            إدارة المشاريع
          </Link>
          <Typography color="text.primary">إدارة المهام</Typography>
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
                  <AssignmentIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalTasks}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المهام
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
                {completedTasks}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مهام مكتملة
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
                {inProgressTasks}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مهام قيد التنفيذ
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
                  <ScheduleIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {pendingTasks}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مهام في الانتظار
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
                placeholder="البحث في المهام..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المشروع</InputLabel>
                <Select
                  value={projectFilter}
                  label="المشروع"
                  onChange={(e) => setProjectFilter(e.target.value)}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.value} value={project.value}>
                      {project.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={statusFilter}
                  label="الحالة"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {taskStatuses.map((status) => (
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
              <FormControl fullWidth size="small">
                <InputLabel>طريقة العرض</InputLabel>
                <Select
                  value={viewMode}
                  label="طريقة العرض"
                  onChange={(e) => setViewMode(e.target.value)}
                >
                  <MenuItem value="table">جدول</MenuItem>
                  <MenuItem value="kanban">لوحة كانبان</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setProjectFilter('all');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                }}
                fullWidth
              >
                إعادة تعيين
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {viewMode === 'kanban' ? 'لوحة المهام' : 'قائمة المهام'}
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
            إضافة مهمة جديدة
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
            <Alert severity="error">خطأ في تحميل المهام. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : viewMode === 'kanban' ? (
          <Box sx={{ p: 2 }}>{renderKanbanBoard()}</Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على مهام. أضف أول مهمة.</Alert>
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
                      المهمة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'project'}
                      direction={sortBy === 'project' ? sortOrder : 'asc'}
                      onClick={() => handleSort('project')}
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
                      active={sortBy === 'assignee'}
                      direction={sortBy === 'assignee' ? sortOrder : 'asc'}
                      onClick={() => handleSort('assignee')}
                    >
                      المسؤول
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'dueDate'}
                      direction={sortBy === 'dueDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('dueDate')}
                    >
                      الموعد النهائي
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
                            {item.title.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.title}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.progress}% مكتمل
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.project}</Typography>
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
                        <Typography variant="body2">{item.assignee}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.reporter}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.dueDate)}</Typography>
                        {item.completedDate && (
                          <Typography variant="caption" color="text.secondary">
                            مكتمل: {formatDate(item.completedDate)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل المهمة" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف المهمة" arrow>
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
        <DialogTitle>{selectedTask ? 'تعديل المهمة' : 'إضافة مهمة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="عنوان المهمة"
                placeholder="أدخل عنوان المهمة"
                defaultValue={selectedTask?.title || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>المشروع</InputLabel>
                <Select label="المشروع" defaultValue={selectedTask?.projectId || ''}>
                  {projects
                    .filter((project) => project.value !== 'all')
                    .map((project) => (
                      <MenuItem key={project.value} value={project.value}>
                        {project.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المسؤول"
                placeholder="أدخل اسم المسؤول"
                defaultValue={selectedTask?.assignee || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المراسل"
                placeholder="أدخل اسم المراسل"
                defaultValue={selectedTask?.reporter || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedTask?.status || 'pending'}>
                  {taskStatuses
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
                <Select label="الأولوية" defaultValue={selectedTask?.priority || 'medium'}>
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
                type="date"
                label="تاريخ البداية"
                defaultValue={selectedTask?.startDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="الموعد النهائي"
                defaultValue={selectedTask?.dueDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="الساعات المتوقعة"
                placeholder="0"
                defaultValue={selectedTask?.estimatedHours || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="التقدم (%)"
                placeholder="0"
                defaultValue={selectedTask?.progress || ''}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف المهمة"
                placeholder="أدخل وصف المهمة"
                defaultValue={selectedTask?.description || ''}
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
        <DialogTitle>حذف المهمة</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذه المهمة؟
          </Typography>
          {selectedTask && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedTask.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedTask.project} - {selectedTask.assignee}
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
            تفاصيل المهمة
          </Typography>
          {selectedTask && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  {selectedTask.title.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedTask.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTask.project}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="عنوان المهمة" secondary={selectedTask.title} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المشروع" secondary={selectedTask.project} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedTask.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedTask.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المسؤول" secondary={selectedTask.assignee} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المراسل" secondary={selectedTask.reporter} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ البداية"
                    secondary={formatDate(selectedTask.startDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الموعد النهائي"
                    secondary={formatDate(selectedTask.dueDate)}
                  />
                </ListItem>
                {selectedTask.completedDate && (
                  <ListItem>
                    <ListItemText
                      primary="تاريخ الإكمال"
                      secondary={formatDate(selectedTask.completedDate)}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="الساعات المتوقعة"
                    secondary={`${selectedTask.estimatedHours} ساعة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الساعات الفعلية"
                    secondary={`${selectedTask.actualHours} ساعة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التقدم" secondary={`${selectedTask.progress}%`} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                وصف المهمة
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedTask.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المهام الفرعية
              </Typography>
              <List dense>
                {selectedTask.subtasks.map((subtask) => (
                  <ListItem key={subtask.id}>
                    <ListItemText primary={subtask.title} secondary={subtask.status} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                التعليقات
              </Typography>
              <List dense>
                {selectedTask.comments.map((comment) => (
                  <ListItem key={comment.id}>
                    <ListItemText
                      primary={comment.text}
                      secondary={`${comment.author} - ${formatDate(comment.date)}`}
                    />
                  </ListItem>
                ))}
              </List>
              {selectedTask.attachments.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    المرفقات
                  </Typography>
                  <List dense>
                    {selectedTask.attachments.map((attachment) => (
                      <ListItem key={attachment.id}>
                        <ListItemText
                          primary={attachment.name}
                          secondary={`${attachment.size} - ${attachment.type}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                العلامات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedTask.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>
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

export default Tasks;
