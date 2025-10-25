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
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  Percent as PercentIcon,
  LocalOffer as LocalOfferIcon,
} from '@mui/icons-material';

const Opportunities = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('expectedCloseDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'table'

  // Mock data for opportunities
  const opportunitiesData = [
    {
      id: 1,
      name: 'مشروع نظام إدارة المخزون',
      customer: 'شركة التقنية المتقدمة',
      contact: 'أحمد محمد السعيد',
      email: 'ahmed@tech.com',
      phone: '+966501234567',
      stage: 'proposal',
      priority: 'high',
      probability: 75,
      expectedValue: 150000,
      currency: 'SAR',
      expectedCloseDate: '2024-02-15',
      actualCloseDate: null,
      description: 'تطوير نظام شامل لإدارة المخزون مع واجهة ويب وتطبيق جوال',
      notes: 'العميل مهتم جداً بالحل المقترح',
      assignedTo: 'سارة أحمد',
      createdDate: '2024-01-10',
      lastActivityDate: '2024-01-18',
      nextFollowUp: '2024-01-25',
      tags: ['تقنية', 'نظام إدارة', 'B2B'],
      activities: [
        {
          id: 1,
          type: 'meeting',
          description: 'اجتماع أولي مع العميل',
          date: '2024-01-15',
          user: 'سارة أحمد',
        },
        {
          id: 2,
          type: 'proposal',
          description: 'إرسال عرض تقني مفصل',
          date: '2024-01-18',
          user: 'سارة أحمد',
        },
      ],
      products: [
        { name: 'نظام إدارة المخزون', quantity: 1, unitPrice: 100000 },
        { name: 'تطبيق الجوال', quantity: 1, unitPrice: 50000 },
      ],
      competitors: ['المنافس الأول', 'المنافس الثاني'],
      decisionFactors: ['السعر', 'الجودة', 'الدعم الفني'],
    },
    {
      id: 2,
      name: 'حلول التسويق الرقمي',
      customer: 'مؤسسة الأثاث الحديث',
      contact: 'فاطمة علي حسن',
      email: 'fatima@furniture.com',
      phone: '+966502345678',
      stage: 'negotiation',
      priority: 'medium',
      probability: 60,
      expectedValue: 75000,
      currency: 'SAR',
      expectedCloseDate: '2024-02-28',
      actualCloseDate: null,
      description: 'حزمة شاملة لحلول التسويق الرقمي تشمل إدارة وسائل التواصل الاجتماعي',
      notes: 'في مرحلة التفاوض على السعر',
      assignedTo: 'خالد محمد',
      createdDate: '2024-01-08',
      lastActivityDate: '2024-01-19',
      nextFollowUp: '2024-01-26',
      tags: ['تسويق', 'رقمي', 'B2B'],
      activities: [
        {
          id: 3,
          type: 'call',
          description: 'مكالمة تفاوضية',
          date: '2024-01-19',
          user: 'خالد محمد',
        },
      ],
      products: [{ name: 'حلول التسويق الرقمي', quantity: 1, unitPrice: 75000 }],
      competitors: ['المنافس الثالث'],
      decisionFactors: ['السعر', 'النتائج'],
    },
    {
      id: 3,
      name: 'نظام إدارة الموارد البشرية',
      customer: 'شركة المواد الخام',
      contact: 'محمد عبدالله سالم',
      email: 'mohammed@materials.com',
      phone: '+966503456789',
      stage: 'qualified',
      priority: 'high',
      probability: 90,
      expectedValue: 200000,
      currency: 'SAR',
      expectedCloseDate: '2024-03-15',
      actualCloseDate: null,
      description: 'نظام متكامل لإدارة الموارد البشرية مع وحدات الرواتب والحضور',
      notes: 'عميل مؤهل ومهتم جداً',
      assignedTo: 'نورا علي',
      createdDate: '2024-01-05',
      lastActivityDate: '2024-01-20',
      nextFollowUp: '2024-01-28',
      tags: ['موارد بشرية', 'نظام إدارة', 'B2B'],
      activities: [
        {
          id: 4,
          type: 'demo',
          description: 'عرض توضيحي للنظام',
          date: '2024-01-20',
          user: 'نورا علي',
        },
      ],
      products: [
        { name: 'نظام إدارة الموارد البشرية', quantity: 1, unitPrice: 150000 },
        { name: 'وحدة الرواتب', quantity: 1, unitPrice: 30000 },
        { name: 'وحدة الحضور', quantity: 1, unitPrice: 20000 },
      ],
      competitors: ['المنافس الأول'],
      decisionFactors: ['الميزات', 'الدعم', 'التكلفة'],
    },
    {
      id: 4,
      name: 'حلول إدارة المبيعات',
      customer: 'شركة الخدمات التقنية',
      contact: 'سارة أحمد محمد',
      email: 'sara@techservices.com',
      phone: '+966504567890',
      stage: 'prospecting',
      priority: 'medium',
      probability: 40,
      expectedValue: 50000,
      currency: 'SAR',
      expectedCloseDate: '2024-04-30',
      actualCloseDate: null,
      description: 'نظام إدارة المبيعات مع تتبع العملاء المحتملين',
      notes: 'في مرحلة الاستكشاف الأولي',
      assignedTo: 'عبدالله حسن',
      createdDate: '2024-01-12',
      lastActivityDate: '2024-01-17',
      nextFollowUp: '2024-01-24',
      tags: ['مبيعات', 'إدارة', 'B2B'],
      activities: [
        {
          id: 5,
          type: 'email',
          description: 'إرسال معلومات أولية',
          date: '2024-01-17',
          user: 'عبدالله حسن',
        },
      ],
      products: [{ name: 'نظام إدارة المبيعات', quantity: 1, unitPrice: 50000 }],
      competitors: ['المنافس الثاني', 'المنافس الثالث'],
      decisionFactors: ['السعر', 'البساطة'],
    },
    {
      id: 5,
      name: 'مشروع الذكاء الاصطناعي',
      customer: 'شركة المعدات الصناعية',
      contact: 'خالد حسن علي',
      email: 'khalid@industrial.com',
      phone: '+966505678901',
      stage: 'closed_won',
      priority: 'high',
      probability: 100,
      expectedValue: 300000,
      currency: 'SAR',
      expectedCloseDate: '2024-01-15',
      actualCloseDate: '2024-01-15',
      description: 'تطبيق حلول الذكاء الاصطناعي في العمليات الصناعية',
      notes: 'تم إغلاق الصفقة بنجاح',
      assignedTo: 'فاطمة سالم',
      createdDate: '2024-01-01',
      lastActivityDate: '2024-01-15',
      nextFollowUp: null,
      tags: ['ذكاء اصطناعي', 'صناعة', 'B2B'],
      activities: [
        {
          id: 6,
          type: 'contract',
          description: 'توقيع العقد',
          date: '2024-01-15',
          user: 'فاطمة سالم',
        },
      ],
      products: [{ name: 'حلول الذكاء الاصطناعي', quantity: 1, unitPrice: 300000 }],
      competitors: [],
      decisionFactors: ['التقنية', 'الخبرة'],
    },
    {
      id: 6,
      name: 'نظام إدارة المشاريع',
      customer: 'شركة التطوير العقاري',
      contact: 'نورا محمد أحمد',
      email: 'nora@realestate.com',
      phone: '+966506789012',
      stage: 'closed_lost',
      priority: 'low',
      probability: 0,
      expectedValue: 80000,
      currency: 'SAR',
      expectedCloseDate: '2024-01-20',
      actualCloseDate: '2024-01-20',
      description: 'نظام إدارة المشاريع العقارية',
      notes: 'اختار العميل منافس آخر',
      assignedTo: 'أحمد علي',
      createdDate: '2024-01-03',
      lastActivityDate: '2024-01-20',
      nextFollowUp: null,
      tags: ['مشاريع', 'عقارات', 'B2B'],
      activities: [
        {
          id: 7,
          type: 'call',
          description: 'مكالمة نهائية',
          date: '2024-01-20',
          user: 'أحمد علي',
        },
      ],
      products: [{ name: 'نظام إدارة المشاريع', quantity: 1, unitPrice: 80000 }],
      competitors: ['المنافس الأول'],
      decisionFactors: ['السعر'],
    },
  ];

  const opportunityStages = [
    { value: 'prospecting', label: 'استكشاف', color: 'info', probability: 20 },
    { value: 'qualified', label: 'مؤهل', color: 'warning', probability: 40 },
    { value: 'proposal', label: 'عرض', color: 'primary', probability: 60 },
    { value: 'negotiation', label: 'تفاوض', color: 'secondary', probability: 80 },
    { value: 'closed_won', label: 'مكتمل', color: 'success', probability: 100 },
    { value: 'closed_lost', label: 'مفقود', color: 'error', probability: 0 },
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
    notify(`${action} الفرص`, `${selectedItems.length} فرصة`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpenViewDialog(true);
  };

  const handleEdit = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpenDialog(true);
  };

  const handleDelete = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpenDeleteDialog(true);
  };

  const handleConvert = (opportunity) => {
    notify('تحويل الفرصة', `تم تحويل ${opportunity.name} إلى صفقة`);
  };

  const handleFollowUp = (opportunity) => {
    notify('جدولة متابعة', `تم جدولة متابعة لـ ${opportunity.name}`);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الفرصة', selectedOpportunity ? 'تم تحديث الفرصة' : 'تم إنشاء الفرصة');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الفرصة', 'تم حذف الفرصة');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الفرص', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = opportunitiesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || item.stage === stageFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesStage && matchesPriority;
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

  const getStageColor = (stage) => {
    const stageInfo = opportunityStages.find((s) => s.value === stage);
    return stageInfo ? stageInfo.color : 'default';
  };

  const getStageLabel = (stage) => {
    const stageInfo = opportunityStages.find((s) => s.value === stage);
    return stageInfo ? stageInfo.label : stage;
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

  const totalOpportunities = opportunitiesData.length;
  const activeOpportunities = opportunitiesData.filter((opp) => !opp.actualCloseDate).length;
  const wonOpportunities = opportunitiesData.filter((opp) => opp.stage === 'closed_won').length;
  const totalValue = opportunitiesData.reduce((sum, opp) => sum + opp.expectedValue, 0);
  const wonValue = opportunitiesData
    .filter((opp) => opp.stage === 'closed_won')
    .reduce((sum, opp) => sum + opp.expectedValue, 0);

  const renderKanbanBoard = () => {
    return (
      <Grid container spacing={3}>
        {filteredData.map((opportunity) => (
          <Grid key={opportunity.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
              onClick={() => handleView(opportunity)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 40, height: 40, mr: 2 }}>{opportunity.name.charAt(0)}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {opportunity.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {opportunity.customer}
                  </Typography>
                </Box>
                <Chip
                  label={getStageLabel(opportunity.stage)}
                  size="small"
                  color={getStageColor(opportunity.stage)}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                  {formatCurrency(opportunity.expectedValue)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  القيمة المتوقعة
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    الاحتمالية
                  </Typography>
                  <Typography variant="body2">{opportunity.probability}%</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    الأولوية
                  </Typography>
                  <Chip
                    label={getPriorityLabel(opportunity.priority)}
                    size="small"
                    color={getPriorityColor(opportunity.priority)}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    المسؤول
                  </Typography>
                  <Typography variant="body2">{opportunity.assignedTo}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    تاريخ الإغلاق
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatDate(opportunity.expectedCloseDate)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <Typography variant="caption" color="text.secondary">
                  تاريخ الإنشاء: {formatDate(opportunity.createdDate)}
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
          الفرص والمبيعات
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة فرص المبيعات مع تتبع مراحل البيع وتقييم الاحتمالات.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/crm">
            إدارة علاقات العملاء
          </Link>
          <Typography color="text.primary">الفرص والمبيعات</Typography>
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
                  <TrendingUpIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalOpportunities}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الفرص
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
                {wonOpportunities}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الفرص المكتملة
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
                {activeOpportunities}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الفرص النشطة
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
                placeholder="البحث في الفرص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المرحلة</InputLabel>
                <Select
                  value={stageFilter}
                  label="المرحلة"
                  onChange={(e) => setStageFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع المراحل</MenuItem>
                  {opportunityStages.map((stage) => (
                    <MenuItem key={stage.value} value={stage.value}>
                      {stage.label}
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
                  <MenuItem value="all">جميع الأولويات</MenuItem>
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
                  setStageFilter('all');
                  setPriorityFilter('all');
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
            {viewMode === 'kanban' ? 'لوحة الفرص' : 'قائمة الفرص'}
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
            إضافة فرصة جديدة
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
            <Alert severity="error">خطأ في تحميل الفرص. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : viewMode === 'kanban' ? (
          <Box sx={{ p: 2 }}>{renderKanbanBoard()}</Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على فرص. أضف أول فرصة.</Alert>
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
                      الفرصة
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
                      active={sortBy === 'stage'}
                      direction={sortBy === 'stage' ? sortOrder : 'asc'}
                      onClick={() => handleSort('stage')}
                    >
                      المرحلة
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
                      active={sortBy === 'expectedValue'}
                      direction={sortBy === 'expectedValue' ? sortOrder : 'asc'}
                      onClick={() => handleSort('expectedValue')}
                    >
                      القيمة المتوقعة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'probability'}
                      direction={sortBy === 'probability' ? sortOrder : 'asc'}
                      onClick={() => handleSort('probability')}
                    >
                      الاحتمالية
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'expectedCloseDate'}
                      direction={sortBy === 'expectedCloseDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('expectedCloseDate')}
                    >
                      تاريخ الإغلاق المتوقع
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
                              {item.contact}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.customer}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.assignedTo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStageLabel(item.stage)}
                          size="small"
                          color={getStageColor(item.stage)}
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
                          {formatCurrency(item.expectedValue)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {item.probability}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={item.probability}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(item.expectedCloseDate)}
                        </Typography>
                        {item.actualCloseDate && (
                          <Typography variant="caption" color="text.secondary">
                            تم الإغلاق: {formatDate(item.actualCloseDate)}
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
                          <Tooltip title="تعديل الفرصة" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تحويل إلى صفقة" arrow>
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
                          <Tooltip title="حذف الفرصة" arrow>
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
        <DialogTitle>{selectedOpportunity ? 'تعديل الفرصة' : 'إضافة فرصة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم الفرصة"
                placeholder="أدخل اسم الفرصة"
                defaultValue={selectedOpportunity?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="العميل"
                placeholder="أدخل اسم العميل"
                defaultValue={selectedOpportunity?.customer || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="جهة الاتصال"
                placeholder="أدخل اسم جهة الاتصال"
                defaultValue={selectedOpportunity?.contact || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedOpportunity?.email || ''}
                type="email"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="أدخل رقم الهاتف"
                defaultValue={selectedOpportunity?.phone || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>المرحلة</InputLabel>
                <Select label="المرحلة" defaultValue={selectedOpportunity?.stage || 'prospecting'}>
                  {opportunityStages.map((stage) => (
                    <MenuItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية" defaultValue={selectedOpportunity?.priority || 'medium'}>
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
                defaultValue={selectedOpportunity?.expectedValue || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="الاحتمالية (%)"
                placeholder="0"
                defaultValue={selectedOpportunity?.probability || ''}
                inputProps={{ min: 0, max: 100 }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الإغلاق المتوقع"
                defaultValue={selectedOpportunity?.expectedCloseDate || ''}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المسؤول"
                placeholder="أدخل اسم المسؤول"
                defaultValue={selectedOpportunity?.assignedTo || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ المتابعة التالية"
                defaultValue={selectedOpportunity?.nextFollowUp || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                placeholder="أدخل وصف الفرصة"
                defaultValue={selectedOpportunity?.description || ''}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
                defaultValue={selectedOpportunity?.notes || ''}
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
        <DialogTitle>حذف الفرصة</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذه الفرصة؟
          </Typography>
          {selectedOpportunity && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedOpportunity.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedOpportunity.customer} - {formatCurrency(selectedOpportunity.expectedValue)}
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
            تفاصيل الفرصة
          </Typography>
          {selectedOpportunity && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  {selectedOpportunity.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedOpportunity.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedOpportunity.customer}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم الفرصة" secondary={selectedOpportunity.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العميل" secondary={selectedOpportunity.customer} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="جهة الاتصال" secondary={selectedOpportunity.contact} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البريد الإلكتروني" secondary={selectedOpportunity.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedOpportunity.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المرحلة"
                    secondary={getStageLabel(selectedOpportunity.stage)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedOpportunity.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الاحتمالية"
                    secondary={`${selectedOpportunity.probability}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="القيمة المتوقعة"
                    secondary={formatCurrency(selectedOpportunity.expectedValue)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المسؤول" secondary={selectedOpportunity.assignedTo} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الإنشاء"
                    secondary={formatDate(selectedOpportunity.createdDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الإغلاق المتوقع"
                    secondary={formatDate(selectedOpportunity.expectedCloseDate)}
                  />
                </ListItem>
                {selectedOpportunity.actualCloseDate && (
                  <ListItem>
                    <ListItemText
                      primary="تاريخ الإغلاق الفعلي"
                      secondary={formatDate(selectedOpportunity.actualCloseDate)}
                    />
                  </ListItem>
                )}
                {selectedOpportunity.nextFollowUp && (
                  <ListItem>
                    <ListItemText
                      primary="المتابعة التالية"
                      secondary={formatDate(selectedOpportunity.nextFollowUp)}
                    />
                  </ListItem>
                )}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedOpportunity.description}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedOpportunity.notes}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المنتجات/الخدمات
              </Typography>
              <List dense>
                {selectedOpportunity.products.map((product, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.quantity} × ${formatCurrency(
                        product.unitPrice,
                      )} = ${formatCurrency(product.quantity * product.unitPrice)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المنافسون
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedOpportunity.competitors.map((competitor, index) => (
                  <Chip key={index} label={competitor} size="small" />
                ))}
              </Box>
              <Typography variant="subtitle2" gutterBottom>
                عوامل القرار
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedOpportunity.decisionFactors.map((factor, index) => (
                  <Chip key={index} label={factor} size="small" color="primary" />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الأنشطة
              </Typography>
              <List dense>
                {selectedOpportunity.activities.map((activity) => (
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
                {selectedOpportunity.tags.map((tag, index) => (
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

export default Opportunities;
