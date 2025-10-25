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
  ListItemText,
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
  Schedule as ScheduleIcon,
  Timeline as TimelineIcon,
  Assignment as AssignmentIcon,
  CheckCircleOutline as CheckIcon,
  Phone as CallIcon,
  MeetingRoom as MeetingIcon,
  Email as EmailIcon,
  Task as TaskIcon,
  Note as NoteIcon,
} from '@mui/icons-material';

const CustomerActivities = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for customer activities
  const activitiesData = [
    {
      id: 1,
      type: 'call',
      subject: 'مكالمة هاتفية مع العميل',
      customer: 'أحمد محمد علي',
      customerEmail: 'ahmed@company.com',
      customerPhone: '+966501234567',
      company: 'شركة التقنية المتقدمة',
      date: '2024-01-20',
      time: '10:30',
      duration: 15,
      status: 'completed',
      priority: 'medium',
      assignedTo: 'سارة أحمد',
      assignedToEmail: 'sara@company.com',
      description: 'مناقشة متطلبات المشروع الجديد وتوضيح التفاصيل الفنية',
      outcome: 'تم الاتفاق على موعد اجتماع تفصيلي',
      nextAction: 'إرسال عرض سعر مفصل',
      nextActionDate: '2024-01-22',
      tags: ['مشروع جديد', 'تقنية', 'عرض سعر'],
      attachments: [
        { name: 'ملاحظات المكالمة.pdf', size: '1.2 MB', type: 'pdf' },
        { name: 'متطلبات المشروع.docx', size: '0.8 MB', type: 'docx' },
      ],
      createdBy: 'سارة أحمد',
      createdDate: '2024-01-20',
      lastModified: '2024-01-20',
    },
    {
      id: 2,
      type: 'meeting',
      subject: 'اجتماع مع فريق العميل',
      customer: 'فاطمة أحمد السعيد',
      customerEmail: 'fatima@company.com',
      customerPhone: '+966501234568',
      company: 'مؤسسة الأجهزة المكتبية',
      date: '2024-01-19',
      time: '14:00',
      duration: 60,
      status: 'completed',
      priority: 'high',
      assignedTo: 'محمد عبدالله',
      assignedToEmail: 'mohammed@company.com',
      description: 'عرض الحلول المقترحة لمنظومة إدارة المخزون',
      outcome: 'تم الموافقة على الحل المقترح',
      nextAction: 'إعداد عقد المشروع',
      nextActionDate: '2024-01-25',
      tags: ['اجتماع', 'عرض', 'عقد'],
      attachments: [
        { name: 'عرض الحلول.pptx', size: '5.2 MB', type: 'pptx' },
        { name: 'جدول الأعمال.pdf', size: '0.5 MB', type: 'pdf' },
      ],
      createdBy: 'محمد عبدالله',
      createdDate: '2024-01-19',
      lastModified: '2024-01-19',
    },
    {
      id: 3,
      type: 'email',
      subject: 'إرسال عرض سعر للمشروع',
      customer: 'خالد عبدالله المطيري',
      customerEmail: 'khalid@company.com',
      customerPhone: '+966501234569',
      company: 'شركة المواد الخام الصناعية',
      date: '2024-01-18',
      time: '09:15',
      duration: 0,
      status: 'completed',
      priority: 'medium',
      assignedTo: 'نورا محمد',
      assignedToEmail: 'nora@company.com',
      description: 'إرسال عرض سعر مفصل لمشروع تطوير نظام إدارة المبيعات',
      outcome: 'تم إرسال العرض بنجاح',
      nextAction: 'متابعة الرد من العميل',
      nextActionDate: '2024-01-25',
      tags: ['عرض سعر', 'مبيعات', 'تطوير'],
      attachments: [
        { name: 'عرض السعر.pdf', size: '2.1 MB', type: 'pdf' },
        { name: 'المواصفات الفنية.docx', size: '1.8 MB', type: 'docx' },
      ],
      createdBy: 'نورا محمد',
      createdDate: '2024-01-18',
      lastModified: '2024-01-18',
    },
    {
      id: 4,
      type: 'task',
      subject: 'إعداد تقرير الأداء الشهري',
      customer: 'سارة محمد الحسن',
      customerEmail: 'sara@company.com',
      customerPhone: '+966501234570',
      company: 'شركة الخدمات اللوجستية',
      date: '2024-01-17',
      time: '11:00',
      duration: 30,
      status: 'in_progress',
      priority: 'low',
      assignedTo: 'أحمد علي',
      assignedToEmail: 'ahmed@company.com',
      description: 'إعداد تقرير شامل عن أداء النظام خلال الشهر الماضي',
      outcome: 'قيد الإعداد',
      nextAction: 'مراجعة البيانات وإكمال التقرير',
      nextActionDate: '2024-01-24',
      tags: ['تقرير', 'أداء', 'شهري'],
      attachments: [{ name: 'بيانات الأداء.xlsx', size: '3.2 MB', type: 'xlsx' }],
      createdBy: 'أحمد علي',
      createdDate: '2024-01-17',
      lastModified: '2024-01-17',
    },
    {
      id: 5,
      type: 'note',
      subject: 'ملاحظات مهمة حول العميل',
      customer: 'محمد عبدالرحمن الشمري',
      customerEmail: 'mohammed@company.com',
      customerPhone: '+966501234571',
      company: 'شركة الأثاث الفاخر',
      date: '2024-01-16',
      time: '16:45',
      duration: 0,
      status: 'completed',
      priority: 'low',
      assignedTo: 'فاطمة أحمد',
      assignedToEmail: 'fatima@company.com',
      description: 'تسجيل ملاحظات مهمة حول تفضيلات العميل ومتطلباته الخاصة',
      outcome: 'تم تسجيل الملاحظات',
      nextAction: 'مراجعة الملاحظات في الاجتماع القادم',
      nextActionDate: '2024-01-23',
      tags: ['ملاحظات', 'تفضيلات', 'متطلبات'],
      attachments: [],
      createdBy: 'فاطمة أحمد',
      createdDate: '2024-01-16',
      lastModified: '2024-01-16',
    },
    {
      id: 6,
      type: 'call',
      subject: 'مكالمة متابعة للمشروع',
      customer: 'أحمد محمد علي',
      customerEmail: 'ahmed@company.com',
      customerPhone: '+966501234567',
      company: 'شركة التقنية المتقدمة',
      date: '2024-01-15',
      time: '13:30',
      duration: 25,
      status: 'completed',
      priority: 'high',
      assignedTo: 'سارة أحمد',
      assignedToEmail: 'sara@company.com',
      description: 'متابعة تقدم المشروع ومناقشة التحديات',
      outcome: 'تم حل المشكلة المطروحة',
      nextAction: 'إرسال التحديثات المطلوبة',
      nextActionDate: '2024-01-18',
      tags: ['متابعة', 'مشروع', 'تحديات'],
      attachments: [{ name: 'تقرير التقدم.pdf', size: '1.5 MB', type: 'pdf' }],
      createdBy: 'سارة أحمد',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 7,
      type: 'meeting',
      subject: 'اجتماع مراجعة الربع الأول',
      customer: 'فاطمة أحمد السعيد',
      customerEmail: 'fatima@company.com',
      customerPhone: '+966501234568',
      company: 'مؤسسة الأجهزة المكتبية',
      date: '2024-01-14',
      time: '10:00',
      duration: 90,
      status: 'completed',
      priority: 'high',
      assignedTo: 'محمد عبدالله',
      assignedToEmail: 'mohammed@company.com',
      description: 'مراجعة شاملة لأداء النظام خلال الربع الأول من العام',
      outcome: 'تم تحديد نقاط التحسين المطلوبة',
      nextAction: 'تنفيذ التحسينات المقترحة',
      nextActionDate: '2024-02-01',
      tags: ['مراجعة', 'ربع سنوي', 'تحسينات'],
      attachments: [
        { name: 'تقرير الربع الأول.pdf', size: '4.2 MB', type: 'pdf' },
        { name: 'خطة التحسينات.docx', size: '2.1 MB', type: 'docx' },
      ],
      createdBy: 'محمد عبدالله',
      createdDate: '2024-01-14',
      lastModified: '2024-01-14',
    },
    {
      id: 8,
      type: 'email',
      subject: 'إرسال تحديثات النظام',
      customer: 'خالد عبدالله المطيري',
      customerEmail: 'khalid@company.com',
      customerPhone: '+966501234569',
      company: 'شركة المواد الخام الصناعية',
      date: '2024-01-13',
      time: '08:30',
      duration: 0,
      status: 'completed',
      priority: 'medium',
      assignedTo: 'نورا محمد',
      assignedToEmail: 'nora@company.com',
      description: 'إرسال تحديثات النظام الجديدة وميزاتها للعميل',
      outcome: 'تم إرسال التحديثات بنجاح',
      nextAction: 'تدريب العميل على الميزات الجديدة',
      nextActionDate: '2024-01-20',
      tags: ['تحديثات', 'نظام', 'تدريب'],
      attachments: [
        { name: 'دليل التحديثات.pdf', size: '3.1 MB', type: 'pdf' },
        { name: 'فيديو التدريب.mp4', size: '15.2 MB', type: 'mp4' },
      ],
      createdBy: 'نورا محمد',
      createdDate: '2024-01-13',
      lastModified: '2024-01-13',
    },
    {
      id: 9,
      type: 'task',
      subject: 'إعداد خطة الصيانة الشهرية',
      customer: 'سارة محمد الحسن',
      customerEmail: 'sara@company.com',
      customerPhone: '+966501234570',
      company: 'شركة الخدمات اللوجستية',
      date: '2024-01-12',
      time: '14:15',
      duration: 45,
      status: 'completed',
      priority: 'medium',
      assignedTo: 'أحمد علي',
      assignedToEmail: 'ahmed@company.com',
      description: 'إعداد خطة شاملة لصيانة النظام خلال الشهر القادم',
      outcome: 'تم إعداد الخطة بنجاح',
      nextAction: 'تنفيذ خطة الصيانة',
      nextActionDate: '2024-02-01',
      tags: ['صيانة', 'خطة', 'شهرية'],
      attachments: [
        { name: 'خطة الصيانة.pdf', size: '2.8 MB', type: 'pdf' },
        { name: 'جدول الصيانة.xlsx', size: '0.9 MB', type: 'xlsx' },
      ],
      createdBy: 'أحمد علي',
      createdDate: '2024-01-12',
      lastModified: '2024-01-12',
    },
    {
      id: 10,
      type: 'note',
      subject: 'ملاحظات حول الأداء',
      customer: 'محمد عبدالرحمن الشمري',
      customerEmail: 'mohammed@company.com',
      customerPhone: '+966501234571',
      company: 'شركة الأثاث الفاخر',
      date: '2024-01-11',
      time: '17:20',
      duration: 0,
      status: 'completed',
      priority: 'low',
      assignedTo: 'فاطمة أحمد',
      assignedToEmail: 'fatima@company.com',
      description: 'تسجيل ملاحظات حول أداء النظام ورضا العميل',
      outcome: 'تم تسجيل الملاحظات',
      nextAction: 'مراجعة الملاحظات مع الفريق',
      nextActionDate: '2024-01-18',
      tags: ['أداء', 'رضا', 'ملاحظات'],
      attachments: [],
      createdBy: 'فاطمة أحمد',
      createdDate: '2024-01-11',
      lastModified: '2024-01-11',
    },
  ];

  const activityTypes = [
    { value: 'call', label: 'مكالمة هاتفية', color: 'primary', icon: CallIcon },
    { value: 'meeting', label: 'اجتماع', color: 'success', icon: MeetingIcon },
    { value: 'email', label: 'بريد إلكتروني', color: 'info', icon: EmailIcon },
    { value: 'task', label: 'مهمة', color: 'warning', icon: TaskIcon },
    { value: 'note', label: 'ملاحظة', color: 'default', icon: NoteIcon },
  ];

  const activityStatuses = [
    { value: 'completed', label: 'مكتمل', color: 'success' },
    { value: 'in_progress', label: 'قيد التنفيذ', color: 'warning' },
    { value: 'pending', label: 'في الانتظار', color: 'info' },
    { value: 'cancelled', label: 'ملغي', color: 'error' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'منخفض', color: 'success' },
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
    notify(`${action} الأنشطة`, `${selectedItems.length} نشاط`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (activity) => {
    setSelectedActivity(activity);
    setOpenViewDialog(true);
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setOpenDialog(true);
  };

  const handleDelete = (activity) => {
    setSelectedActivity(activity);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث النشاط', selectedActivity ? 'تم تحديث النشاط' : 'تم إضافة النشاط');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف النشاط', 'تم حذف النشاط');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الأنشطة', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = activitiesData.filter((item) => {
    const matchesSearch =
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
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

  const getTypeColor = (type) => {
    const typeInfo = activityTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.color : 'default';
  };

  const getTypeLabel = (type) => {
    const typeInfo = activityTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

  const getTypeIcon = (type) => {
    const typeInfo = activityTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.icon : AssignmentIcon;
  };

  const getStatusColor = (status) => {
    const statusInfo = activityStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = activityStatuses.find((s) => s.value === status);
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

  const formatTime = (timeString) => {
    return timeString;
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

  const totalActivities = activitiesData.length;
  const completedActivities = activitiesData.filter(
    (activity) => activity.status === 'completed',
  ).length;
  const inProgressActivities = activitiesData.filter(
    (activity) => activity.status === 'in_progress',
  ).length;
  const totalDuration = activitiesData.reduce((sum, activity) => sum + activity.duration, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          اتصالات العميل
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتتبع جميع اتصالات العملاء والأنشطة المرتبطة بهم.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/crm">
            إدارة العملاء (CRM)
          </Link>
          <Typography color="text.primary">اتصالات العميل</Typography>
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
                {totalActivities}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الأنشطة
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
                {completedActivities}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مكتملة
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
                  <ScheduleIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {inProgressActivities}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                قيد التنفيذ
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
                  <TimelineIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {totalDuration}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                دقيقة إجمالي
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
                placeholder="البحث في الأنشطة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>نوع النشاط</InputLabel>
                <Select
                  value={typeFilter}
                  label="نوع النشاط"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الأنواع</MenuItem>
                  {activityTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
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
                  <MenuItem value="all">جميع الحالات</MenuItem>
                  {activityStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
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
                  setTypeFilter('all');
                  setStatusFilter('all');
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
            قائمة الأنشطة
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تأكيد')} sx={{ mr: 1 }}>
                تأكيد ({selectedItems.length})
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
            إضافة نشاط
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
            <Alert severity="error">خطأ في تحميل الأنشطة. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على أنشطة. أضف أول نشاط.</Alert>
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
                      active={sortBy === 'type'}
                      direction={sortBy === 'type' ? sortOrder : 'asc'}
                      onClick={() => handleSort('type')}
                    >
                      نوع النشاط
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'subject'}
                      direction={sortBy === 'subject' ? sortOrder : 'asc'}
                      onClick={() => handleSort('subject')}
                    >
                      الموضوع
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'customer'}
                      direction={sortBy === 'customer' ? sortOrder : 'asc'}
                      onClick={() => handleSort('customer')}
                    >
                      العميل
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'date'}
                      direction={sortBy === 'date' ? sortOrder : 'asc'}
                      onClick={() => handleSort('date')}
                    >
                      التاريخ
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
                  <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    const TypeIcon = getTypeIcon(item.type);
                    return (
                      <TableRow key={item.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                mr: 2,
                                bgcolor: `${getTypeColor(item.type)}.main`,
                              }}
                            >
                              <TypeIcon />
                            </Avatar>
                            <Typography variant="body2">{getTypeLabel(item.type)}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.subject}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: 'block', mt: 0.5 }}
                            >
                              {item.description.length > 50
                                ? `${item.description.substring(0, 50)}...`
                                : item.description}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.customer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.company}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{formatDate(item.date)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatTime(item.time)}
                            </Typography>
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
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton size="small" onClick={() => handleView(item)}>
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل النشاط" arrow>
                              <IconButton size="small" onClick={() => handleEdit(item)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف النشاط" arrow>
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
                    );
                  })}
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
        <DialogTitle>{selectedActivity ? 'تعديل النشاط' : 'إضافة نشاط جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع النشاط</InputLabel>
                <Select label="نوع النشاط" defaultValue={selectedActivity?.type || ''}>
                  {activityTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الموضوع"
                placeholder="أدخل موضوع النشاط"
                defaultValue={selectedActivity?.subject || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="العميل"
                placeholder="أدخل اسم العميل"
                defaultValue={selectedActivity?.customer || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الشركة"
                placeholder="أدخل اسم الشركة"
                defaultValue={selectedActivity?.company || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="التاريخ"
                defaultValue={selectedActivity?.date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="time"
                label="الوقت"
                defaultValue={selectedActivity?.time || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedActivity?.status || 'pending'}>
                  {activityStatuses.map((status) => (
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
                <Select label="الأولوية" defaultValue={selectedActivity?.priority || 'medium'}>
                  {priorityLevels.map((priority) => (
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
                label="المدة (دقيقة)"
                placeholder="15"
                defaultValue={selectedActivity?.duration || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المسؤول"
                placeholder="أدخل اسم المسؤول"
                defaultValue={selectedActivity?.assignedTo || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الوصف"
                placeholder="أدخل وصف النشاط"
                defaultValue={selectedActivity?.description || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="النتيجة"
                placeholder="أدخل نتيجة النشاط"
                defaultValue={selectedActivity?.outcome || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الإجراء التالي"
                placeholder="أدخل الإجراء التالي"
                defaultValue={selectedActivity?.nextAction || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الإجراء التالي"
                defaultValue={selectedActivity?.nextActionDate || ''}
                InputLabelProps={{ shrink: true }}
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
        <DialogTitle>حذف النشاط</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا النشاط؟
          </Typography>
          {selectedActivity && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedActivity.subject}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedActivity.customer} - {formatDate(selectedActivity.date)}
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
            تفاصيل النشاط
          </Typography>
          {selectedActivity && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    bgcolor: `${getTypeColor(selectedActivity.type)}.main`,
                  }}
                >
                  {React.createElement(getTypeIcon(selectedActivity.type))}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedActivity.subject}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getTypeLabel(selectedActivity.type)}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="نوع النشاط"
                    secondary={getTypeLabel(selectedActivity.type)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموضوع" secondary={selectedActivity.subject} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العميل" secondary={selectedActivity.customer} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الشركة" secondary={selectedActivity.company} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="البريد الإلكتروني"
                    secondary={selectedActivity.customerEmail}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedActivity.customerPhone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التاريخ" secondary={formatDate(selectedActivity.date)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الوقت" secondary={formatTime(selectedActivity.time)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المدة" secondary={`${selectedActivity.duration} دقيقة`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedActivity.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedActivity.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المسؤول" secondary={selectedActivity.assignedTo} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="البريد الإلكتروني للمسؤول"
                    secondary={selectedActivity.assignedToEmail}
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedActivity.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                النتيجة
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedActivity.outcome}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الإجراء التالي
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {selectedActivity.nextAction}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <strong>التاريخ:</strong> {formatDate(selectedActivity.nextActionDate)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                العلامات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedActivity.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" color="primary" variant="outlined" />
                ))}
              </Box>
              {selectedActivity.attachments.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    المرفقات
                  </Typography>
                  <List dense>
                    {selectedActivity.attachments.map((attachment, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={attachment.name}
                          secondary={`${attachment.type.toUpperCase()} - ${attachment.size}`}
                        />
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

export default CustomerActivities;
