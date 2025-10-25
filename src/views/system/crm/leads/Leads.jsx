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
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  CheckCircleOutline as CheckIcon,
  BlockOutlined as CloseIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon,
  DensityMedium as DensityMediumIcon,
  DensitySmall as DensitySmallIcon,
  DensityLarge as DensityLargeIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
  PostAdd as PostAddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const Leads = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'table'

  // Mock data for leads
  const leadsData = [
    {
      id: 1,
      name: 'أحمد محمد السعيد',
      company: 'شركة التقنية المتقدمة',
      email: 'ahmed@tech.com',
      phone: '+966501234567',
      position: 'مدير تقني',
      status: 'new',
      source: 'website',
      priority: 'high',
      score: 85,
      estimatedValue: 50000,
      currency: 'SAR',
      description: 'عميل محتمل مهتم بحلول تقنية متقدمة',
      notes: 'يبدو مهتماً بحلول الذكاء الاصطناعي',
      assignedTo: 'سارة أحمد',
      createdDate: '2024-01-15',
      lastContactDate: '2024-01-15',
      nextFollowUp: '2024-01-20',
      tags: ['تقنية', 'ذكاء اصطناعي', 'B2B'],
      activities: [
        {
          id: 1,
          type: 'call',
          description: 'مكالمة هاتفية أولى',
          date: '2024-01-15',
          user: 'سارة أحمد',
        },
        {
          id: 2,
          type: 'email',
          description: 'إرسال عرض تقني',
          date: '2024-01-16',
          user: 'سارة أحمد',
        },
      ],
    },
    {
      id: 2,
      name: 'فاطمة علي حسن',
      company: 'مؤسسة الأثاث الحديث',
      email: 'fatima@furniture.com',
      phone: '+966502345678',
      position: 'مديرة تسويق',
      status: 'contacted',
      source: 'referral',
      priority: 'medium',
      score: 72,
      estimatedValue: 25000,
      currency: 'SAR',
      description: 'مهتمة بحلول التسويق الرقمي',
      notes: 'تم الاتصال بها وتبدو مهتمة',
      assignedTo: 'خالد محمد',
      createdDate: '2024-01-14',
      lastContactDate: '2024-01-16',
      nextFollowUp: '2024-01-22',
      tags: ['تسويق', 'B2B', 'أثاث'],
      activities: [
        {
          id: 3,
          type: 'meeting',
          description: 'اجتماع أولي',
          date: '2024-01-16',
          user: 'خالد محمد',
        },
      ],
    },
    {
      id: 3,
      name: 'محمد عبدالله سالم',
      company: 'شركة المواد الخام',
      email: 'mohammed@materials.com',
      phone: '+966503456789',
      position: 'مدير عمليات',
      status: 'qualified',
      source: 'exhibition',
      priority: 'high',
      score: 90,
      estimatedValue: 75000,
      currency: 'SAR',
      description: 'عميل مؤهل لمشروع كبير',
      notes: 'مؤهل للتعامل مع مشاريع كبيرة',
      assignedTo: 'نورا علي',
      createdDate: '2024-01-13',
      lastContactDate: '2024-01-17',
      nextFollowUp: '2024-01-25',
      tags: ['صناعة', 'B2B', 'مشروع كبير'],
      activities: [
        {
          id: 4,
          type: 'proposal',
          description: 'إرسال عرض مفصل',
          date: '2024-01-17',
          user: 'نورا علي',
        },
      ],
    },
    {
      id: 4,
      name: 'سارة أحمد محمد',
      company: 'شركة الخدمات التقنية',
      email: 'sara@techservices.com',
      phone: '+966504567890',
      position: 'مديرة مبيعات',
      status: 'proposal',
      source: 'social_media',
      priority: 'medium',
      score: 68,
      estimatedValue: 30000,
      currency: 'SAR',
      description: 'مهتمة بحلول إدارة المبيعات',
      notes: 'تم إرسال عرض مبدئي',
      assignedTo: 'عبدالله حسن',
      createdDate: '2024-01-12',
      lastContactDate: '2024-01-18',
      nextFollowUp: '2024-01-26',
      tags: ['مبيعات', 'B2B', 'إدارة'],
      activities: [
        {
          id: 5,
          type: 'email',
          description: 'إرسال عرض مبدئي',
          date: '2024-01-18',
          user: 'عبدالله حسن',
        },
      ],
    },
    {
      id: 5,
      name: 'خالد حسن علي',
      company: 'شركة المعدات الصناعية',
      email: 'khalid@industrial.com',
      phone: '+966505678901',
      position: 'مدير تقني',
      status: 'negotiation',
      source: 'cold_call',
      priority: 'high',
      score: 78,
      estimatedValue: 100000,
      currency: 'SAR',
      description: 'في مرحلة التفاوض على مشروع كبير',
      notes: 'يبدو مهتماً ولكن يريد خصم أكبر',
      assignedTo: 'فاطمة سالم',
      createdDate: '2024-01-11',
      lastContactDate: '2024-01-19',
      nextFollowUp: '2024-01-24',
      tags: ['صناعة', 'B2B', 'مشروع كبير', 'تفاوض'],
      activities: [
        {
          id: 6,
          type: 'meeting',
          description: 'اجتماع تفاوضي',
          date: '2024-01-19',
          user: 'فاطمة سالم',
        },
      ],
    },
    {
      id: 6,
      name: 'نورا محمد أحمد',
      company: 'شركة التطوير العقاري',
      email: 'nora@realestate.com',
      phone: '+966506789012',
      position: 'مديرة مشاريع',
      status: 'lost',
      source: 'website',
      priority: 'low',
      score: 45,
      estimatedValue: 15000,
      currency: 'SAR',
      description: 'لم تكن مهتمة بالحل المقترح',
      notes: 'اختارت منافس آخر',
      assignedTo: 'أحمد علي',
      createdDate: '2024-01-10',
      lastContactDate: '2024-01-15',
      nextFollowUp: null,
      tags: ['عقارات', 'B2B', 'مفقود'],
      activities: [
        {
          id: 7,
          type: 'call',
          description: 'مكالمة نهائية',
          date: '2024-01-15',
          user: 'أحمد علي',
        },
      ],
    },
  ];

  const leadStatuses = [
    { value: 'new', label: 'جديد', color: 'info' },
    { value: 'contacted', label: 'تم الاتصال', color: 'warning' },
    { value: 'qualified', label: 'مؤهل', color: 'success' },
    { value: 'proposal', label: 'عرض', color: 'primary' },
    { value: 'negotiation', label: 'تفاوض', color: 'secondary' },
    { value: 'won', label: 'مكتمل', color: 'success' },
    { value: 'lost', label: 'مفقود', color: 'error' },
  ];

  const leadSources = [
    { value: 'website', label: 'الموقع الإلكتروني' },
    { value: 'referral', label: 'إحالة' },
    { value: 'exhibition', label: 'معرض' },
    { value: 'social_media', label: 'وسائل التواصل' },
    { value: 'cold_call', label: 'مكالمة باردة' },
    { value: 'email', label: 'بريد إلكتروني' },
    { value: 'advertisement', label: 'إعلان' },
  ];

  const priorityLevels = [
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
    notify(`${action} العملاء المحتملين`, `${selectedItems.length} عميل`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    setOpenViewDialog(true);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setOpenDialog(true);
  };

  const handleDelete = (lead) => {
    setSelectedLead(lead);
    setOpenDeleteDialog(true);
  };

  const handleConvert = (lead) => {
    notify('تحويل العميل المحتمل', `تم تحويل ${lead.name} إلى عميل`);
  };

  const handleFollowUp = (lead) => {
    notify('جدولة متابعة', `تم جدولة متابعة لـ ${lead.name}`);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify(
        'تحديث العميل المحتمل',
        selectedLead ? 'تم تحديث العميل المحتمل' : 'تم إنشاء العميل المحتمل',
      );
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف العميل المحتمل', 'تم حذف العميل المحتمل');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير العملاء المحتملين', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = leadsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || item.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
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
    const statusInfo = leadStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = leadStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getSourceLabel = (source) => {
    const sourceInfo = leadSources.find((s) => s.value === source);
    return sourceInfo ? sourceInfo.label : source;
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

  const totalLeads = leadsData.length;
  const newLeads = leadsData.filter((lead) => lead.status === 'new').length;
  const qualifiedLeads = leadsData.filter((lead) => lead.status === 'qualified').length;
  const totalValue = leadsData.reduce((sum, lead) => sum + lead.estimatedValue, 0);

  const renderKanbanBoard = () => {
    return (
      <Grid container spacing={3}>
        {filteredData.map((lead) => (
          <Grid key={lead.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                p: 2,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => handleView(lead)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 40, height: 40, mr: 2 }}>{lead.name.charAt(0)}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {lead.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lead.company}
                  </Typography>
                </Box>
                <Chip
                  label={getStatusLabel(lead.status)}
                  size="small"
                  color={getStatusColor(lead.status)}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                  {formatCurrency(lead.estimatedValue)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  القيمة المتوقعة
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    المصدر
                  </Typography>
                  <Typography variant="body2">{getSourceLabel(lead.source)}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    الأولوية
                  </Typography>
                  <Chip
                    label={getPriorityLabel(lead.priority)}
                    size="small"
                    color={getPriorityColor(lead.priority)}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    المسؤول
                  </Typography>
                  <Typography variant="body2">{lead.assignedTo}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    النقاط
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {lead.score}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <Typography variant="caption" color="text.secondary">
                  تاريخ الإنشاء: {formatDate(lead.createdDate)}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          العملاء المحتملون
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة العملاء المحتملين مع تتبع مراحل المبيعات وتقييم الفرص.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/crm">
            إدارة علاقات العملاء
          </Link>
          <Typography color="text.primary">العملاء المحتملون</Typography>
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
                  <PersonIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalLeads}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي العملاء المحتملين
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
                {qualifiedLeads}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                العملاء المؤهلين
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
                {newLeads}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                عملاء جدد
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
                {formatCurrency(totalValue)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي القيمة المتوقعة
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
                placeholder="البحث في العملاء المحتملين..."
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
                  {leadStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المصدر</InputLabel>
                <Select
                  value={sourceFilter}
                  label="المصدر"
                  onChange={(e) => setSourceFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع المصادر</MenuItem>
                  {leadSources.map((source) => (
                    <MenuItem key={source.value} value={source.value}>
                      {source.label}
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
                  <MenuItem value="kanban">لوحة كانبان</MenuItem>
                  <MenuItem value="table">جدول</MenuItem>
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
                  setSourceFilter('all');
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
            {viewMode === 'kanban' ? 'لوحة العملاء المحتملين' : 'قائمة العملاء المحتملين'}
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تحويل')} sx={{ mr: 1 }}>
                تحويل ({selectedItems.length})
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
            إضافة عميل محتمل
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
            <Alert severity="error">خطأ في تحميل العملاء المحتملين. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : viewMode === 'kanban' ? (
          <Box sx={{ p: 2 }}>{renderKanbanBoard()}</Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على عملاء محتملين. أضف أول عميل محتمل.</Alert>
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
                      العميل المحتمل
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'company'}
                      direction={sortBy === 'company' ? sortOrder : 'asc'}
                      onClick={() => handleSort('company')}
                    >
                      الشركة
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
                      active={sortBy === 'estimatedValue'}
                      direction={sortBy === 'estimatedValue' ? sortOrder : 'asc'}
                      onClick={() => handleSort('estimatedValue')}
                    >
                      القيمة المتوقعة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'assignedTo'}
                      direction={sortBy === 'assignedTo' ? sortOrder : 'asc'}
                      onClick={() => handleSort('assignedTo')}
                    >
                      المسؤول
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
                              {item.position}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.company}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getSourceLabel(item.source)}
                        </Typography>
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
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.estimatedValue)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          النقاط: {item.score}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.assignedTo}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(item.createdDate)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل العميل المحتمل" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تحويل إلى عميل" arrow>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleConvert(item)}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="جدولة متابعة" arrow>
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleFollowUp(item)}
                            >
                              <ScheduleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف العميل المحتمل" arrow>
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
        <DialogTitle>{selectedLead ? 'تعديل العميل المحتمل' : 'إضافة عميل محتمل جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الاسم"
                placeholder="أدخل اسم العميل المحتمل"
                defaultValue={selectedLead?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الشركة"
                placeholder="أدخل اسم الشركة"
                defaultValue={selectedLead?.company || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedLead?.email || ''}
                type="email"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="أدخل رقم الهاتف"
                defaultValue={selectedLead?.phone || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المنصب"
                placeholder="أدخل المنصب"
                defaultValue={selectedLead?.position || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>المصدر</InputLabel>
                <Select label="المصدر" defaultValue={selectedLead?.source || ''}>
                  {leadSources.map((source) => (
                    <MenuItem key={source.value} value={source.value}>
                      {source.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedLead?.status || 'new'}>
                  {leadStatuses.map((status) => (
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
                <Select label="الأولوية" defaultValue={selectedLead?.priority || 'medium'}>
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
                label="القيمة المتوقعة"
                placeholder="0.00"
                defaultValue={selectedLead?.estimatedValue || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المسؤول"
                placeholder="أدخل اسم المسؤول"
                defaultValue={selectedLead?.assignedTo || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ المتابعة التالية"
                defaultValue={selectedLead?.nextFollowUp || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                placeholder="أدخل وصف العميل المحتمل"
                defaultValue={selectedLead?.description || ''}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
                defaultValue={selectedLead?.notes || ''}
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
        <DialogTitle>حذف العميل المحتمل</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا العميل المحتمل؟
          </Typography>
          {selectedLead && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedLead.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedLead.company} - {formatDate(selectedLead.createdDate)}
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
        sx={{ '& .MuiDrawer-paper': { width: 500 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل العميل المحتمل
          </Typography>
          {selectedLead && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  {selectedLead.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedLead.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedLead.company}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="الاسم" secondary={selectedLead.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الشركة" secondary={selectedLead.company} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البريد الإلكتروني" secondary={selectedLead.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedLead.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المنصب" secondary={selectedLead.position} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedLead.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المصدر" secondary={getSourceLabel(selectedLead.source)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedLead.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="النقاط" secondary={selectedLead.score} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="القيمة المتوقعة"
                    secondary={formatCurrency(selectedLead.estimatedValue)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المسؤول" secondary={selectedLead.assignedTo} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الإنشاء"
                    secondary={formatDate(selectedLead.createdDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="آخر اتصال"
                    secondary={formatDate(selectedLead.lastContactDate)}
                  />
                </ListItem>
                {selectedLead.nextFollowUp && (
                  <ListItem>
                    <ListItemText
                      primary="المتابعة التالية"
                      secondary={formatDate(selectedLead.nextFollowUp)}
                    />
                  </ListItem>
                )}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedLead.description}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedLead.notes}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الأنشطة
              </Typography>
              <List dense>
                {selectedLead.activities.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemText
                      primary={activity.description}
                      secondary={`${activity.user} - ${formatDate(activity.date)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                العلامات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedLead.tags.map((tag, index) => (
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

export default Leads;
