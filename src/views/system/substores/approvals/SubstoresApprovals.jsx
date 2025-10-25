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
  List,
  ListItem,
  Drawer,
} from '@mui/material';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Home as HomeIcon,
  Download as DownloadIcon,
  Assignment as AssignmentIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Custom Timeline components
const Timeline = ({ children, ...props }) => (
  <Box sx={{ position: 'relative', pl: 2 }} {...props}>
    {children}
  </Box>
);

const TimelineItem = ({ children, ...props }) => (
  <Box sx={{ position: 'relative', pb: 2 }} {...props}>
    {children}
  </Box>
);

const TimelineSeparator = ({ children, ...props }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} {...props}>
    {children}
  </Box>
);

const TimelineConnector = ({ ...props }) => (
  <Box
    sx={{
      position: 'absolute',
      left: 8,
      top: 0,
      bottom: 0,
      width: 2,
      backgroundColor: 'divider',
    }}
    {...props}
  />
);

const TimelineContent = ({ children, ...props }) => (
  <Box sx={{ ml: 2, flex: 1 }} {...props}>
    {children}
  </Box>
);

const TimelineDot = ({ children, color = 'primary', ...props }) => (
  <Box
    sx={{
      width: 16,
      height: 16,
      borderRadius: '50%',
      backgroundColor: `${color}.main`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
    }}
    {...props}
  >
    {children}
  </Box>
);

const SubstoresApprovals = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for approvals
  const approvalsData = [
    {
      id: 1,
      type: 'store_creation',
      title: 'طلب إنشاء متجر جديد - الرياض',
      description: 'طلب إنشاء متجر جديد في منطقة الرياض مع جميع الموافقات المطلوبة',
      status: 'pending',
      priority: 'high',
      requester: 'أحمد محمد علي',
      requesterEmail: 'ahmed@company.com',
      requesterPhone: '+966501234567',
      storeName: 'متجر الرياض الجديد',
      storeLocation: 'الرياض - حي النخيل',
      storeType: 'retail',
      estimatedBudget: 500000,
      expectedRevenue: 2000000,
      createdDate: '2024-01-15',
      dueDate: '2024-01-25',
      assignedTo: 'مدير العمليات',
      assignedToEmail: 'operations@company.com',
      assignedToPhone: '+966501234568',
      approvalSteps: [
        {
          step: 1,
          title: 'مراجعة الطلب',
          status: 'completed',
          approver: 'مدير العمليات',
          approvedDate: '2024-01-16',
          comments: 'تم مراجعة الطلب والموافقة عليه',
        },
        {
          step: 2,
          title: 'مراجعة المالية',
          status: 'pending',
          approver: 'مدير المالية',
          approvedDate: null,
          comments: 'في انتظار المراجعة المالية',
        },
        {
          step: 3,
          title: 'الموافقة النهائية',
          status: 'pending',
          approver: 'المدير العام',
          approvedDate: null,
          comments: 'في انتظار الموافقة النهائية',
        },
      ],
      documents: [
        { name: 'الدراسة المالية', type: 'pdf', size: '2.5 MB', uploadedDate: '2024-01-15' },
        { name: 'الموقع المقترح', type: 'jpg', size: '1.2 MB', uploadedDate: '2024-01-15' },
        { name: 'الخطة التسويقية', type: 'pdf', size: '3.1 MB', uploadedDate: '2024-01-15' },
      ],
      comments: [
        {
          author: 'مدير العمليات',
          date: '2024-01-16',
          comment: 'الطلب يبدو جيداً ويحتاج إلى مراجعة مالية',
        },
        {
          author: 'مدير المالية',
          date: '2024-01-17',
          comment: 'الميزانية المقترحة مناسبة ولكن نحتاج إلى ضمانات إضافية',
        },
      ],
      riskAssessment: {
        level: 'medium',
        factors: ['الموقع الجديد', 'الاستثمار الكبير', 'المنافسة العالية'],
        mitigation: ['دراسة السوق', 'خطة تسويقية قوية', 'تدريب الموظفين'],
      },
      compliance: {
        legal: true,
        financial: true,
        operational: false,
        technical: true,
      },
      timeline: [
        { date: '2024-01-15', event: 'تم تقديم الطلب', status: 'completed' },
        { date: '2024-01-16', event: 'تم مراجعة العمليات', status: 'completed' },
        { date: '2024-01-17', event: 'في انتظار المراجعة المالية', status: 'pending' },
        { date: '2024-01-25', event: 'الموافقة النهائية', status: 'pending' },
      ],
    },
    {
      id: 2,
      type: 'budget_increase',
      title: 'طلب زيادة الميزانية - متجر جدة',
      description: 'طلب زيادة الميزانية لمتجر جدة لتحسين الخدمات وتوسيع المنتجات',
      status: 'approved',
      priority: 'medium',
      requester: 'سارة أحمد السعيد',
      requesterEmail: 'sara@company.com',
      requesterPhone: '+966501234569',
      storeName: 'متجر جدة التجاري',
      storeLocation: 'جدة - شارع التحلية',
      storeType: 'commercial',
      estimatedBudget: 200000,
      expectedRevenue: 1500000,
      createdDate: '2024-01-10',
      dueDate: '2024-01-20',
      assignedTo: 'مدير المالية',
      assignedToEmail: 'finance@company.com',
      assignedToPhone: '+966501234570',
      approvalSteps: [
        {
          step: 1,
          title: 'مراجعة الطلب',
          status: 'completed',
          approver: 'مدير المالية',
          approvedDate: '2024-01-12',
          comments: 'تم مراجعة الطلب والموافقة عليه',
        },
        {
          step: 2,
          title: 'الموافقة النهائية',
          status: 'completed',
          approver: 'المدير العام',
          approvedDate: '2024-01-15',
          comments: 'تمت الموافقة النهائية على الطلب',
        },
      ],
      documents: [
        { name: 'تقرير الأداء', type: 'pdf', size: '1.8 MB', uploadedDate: '2024-01-10' },
        { name: 'الخطة المالية', type: 'xlsx', size: '0.9 MB', uploadedDate: '2024-01-10' },
      ],
      comments: [
        {
          author: 'مدير المالية',
          date: '2024-01-12',
          comment: 'الطلب مبرر بناءً على الأداء الممتاز للمتجر',
        },
        {
          author: 'المدير العام',
          date: '2024-01-15',
          comment: 'موافقة نهائية على زيادة الميزانية',
        },
      ],
      riskAssessment: {
        level: 'low',
        factors: ['الأداء الممتاز', 'الطلب المتزايد'],
        mitigation: ['مراقبة الأداء', 'تقييم دوري'],
      },
      compliance: {
        legal: true,
        financial: true,
        operational: true,
        technical: true,
      },
      timeline: [
        { date: '2024-01-10', event: 'تم تقديم الطلب', status: 'completed' },
        { date: '2024-01-12', event: 'تم مراجعة المالية', status: 'completed' },
        { date: '2024-01-15', event: 'تمت الموافقة النهائية', status: 'completed' },
      ],
    },
    {
      id: 3,
      type: 'staff_hiring',
      title: 'طلب توظيف موظفين جدد - متجر الدمام',
      description: 'طلب توظيف 3 موظفين جدد لمتجر الدمام الصناعي لتحسين الخدمة',
      status: 'rejected',
      priority: 'low',
      requester: 'خالد عبدالله المطيري',
      requesterEmail: 'khalid@company.com',
      requesterPhone: '+966501234571',
      storeName: 'متجر الدمام الصناعي',
      storeLocation: 'الدمام - المنطقة الصناعية',
      storeType: 'industrial',
      estimatedBudget: 150000,
      expectedRevenue: 0,
      createdDate: '2024-01-05',
      dueDate: '2024-01-15',
      assignedTo: 'مدير الموارد البشرية',
      assignedToEmail: 'hr@company.com',
      assignedToPhone: '+966501234572',
      approvalSteps: [
        {
          step: 1,
          title: 'مراجعة الطلب',
          status: 'completed',
          approver: 'مدير الموارد البشرية',
          approvedDate: '2024-01-08',
          comments: 'تم مراجعة الطلب',
        },
        {
          step: 2,
          title: 'الموافقة النهائية',
          status: 'rejected',
          approver: 'المدير العام',
          approvedDate: '2024-01-12',
          comments: 'تم رفض الطلب بسبب عدم توفر الميزانية',
        },
      ],
      documents: [
        { name: 'وصف الوظائف', type: 'pdf', size: '1.1 MB', uploadedDate: '2024-01-05' },
        { name: 'المتطلبات', type: 'docx', size: '0.8 MB', uploadedDate: '2024-01-05' },
      ],
      comments: [
        {
          author: 'مدير الموارد البشرية',
          date: '2024-01-08',
          comment: 'الطلب مبرر ولكن يحتاج إلى موافقة مالية',
        },
        {
          author: 'المدير العام',
          date: '2024-01-12',
          comment: 'تم رفض الطلب بسبب عدم توفر الميزانية المطلوبة',
        },
      ],
      riskAssessment: {
        level: 'high',
        factors: ['التكلفة العالية', 'عدم توفر الميزانية'],
        mitigation: ['تأجيل التوظيف', 'البحث عن بدائل'],
      },
      compliance: {
        legal: true,
        financial: false,
        operational: true,
        technical: true,
      },
      timeline: [
        { date: '2024-01-05', event: 'تم تقديم الطلب', status: 'completed' },
        { date: '2024-01-08', event: 'تم مراجعة الموارد البشرية', status: 'completed' },
        { date: '2024-01-12', event: 'تم رفض الطلب', status: 'rejected' },
      ],
    },
    {
      id: 4,
      type: 'equipment_purchase',
      title: 'طلب شراء معدات جديدة - متجر الخبر',
      description: 'طلب شراء معدات جديدة لمتجر الخبر الساحلي لتحسين الخدمة',
      status: 'pending',
      priority: 'medium',
      requester: 'فاطمة محمد الحسن',
      requesterEmail: 'fatima@company.com',
      requesterPhone: '+966501234573',
      storeName: 'متجر الخبر الساحلي',
      storeLocation: 'الخبر - الكورنيش',
      storeType: 'retail',
      estimatedBudget: 75000,
      expectedRevenue: 300000,
      createdDate: '2024-01-12',
      dueDate: '2024-01-22',
      assignedTo: 'مدير المشتريات',
      assignedToEmail: 'procurement@company.com',
      assignedToPhone: '+966501234574',
      approvalSteps: [
        {
          step: 1,
          title: 'مراجعة الطلب',
          status: 'completed',
          approver: 'مدير المشتريات',
          approvedDate: '2024-01-14',
          comments: 'تم مراجعة الطلب والموافقة عليه',
        },
        {
          step: 2,
          title: 'مراجعة المالية',
          status: 'pending',
          approver: 'مدير المالية',
          approvedDate: null,
          comments: 'في انتظار المراجعة المالية',
        },
        {
          step: 3,
          title: 'الموافقة النهائية',
          status: 'pending',
          approver: 'المدير العام',
          approvedDate: null,
          comments: 'في انتظار الموافقة النهائية',
        },
      ],
      documents: [
        { name: 'قائمة المعدات', type: 'pdf', size: '1.5 MB', uploadedDate: '2024-01-12' },
        { name: 'عروض الأسعار', type: 'xlsx', size: '2.1 MB', uploadedDate: '2024-01-12' },
        { name: 'المواصفات الفنية', type: 'pdf', size: '3.2 MB', uploadedDate: '2024-01-12' },
      ],
      comments: [
        {
          author: 'مدير المشتريات',
          date: '2024-01-14',
          comment: 'الطلب مبرر والمعدات مطلوبة لتحسين الخدمة',
        },
      ],
      riskAssessment: {
        level: 'medium',
        factors: ['التكلفة المتوسطة', 'المنفعة المتوقعة'],
        mitigation: ['مراقبة الأداء', 'تقييم النتائج'],
      },
      compliance: {
        legal: true,
        financial: true,
        operational: true,
        technical: true,
      },
      timeline: [
        { date: '2024-01-12', event: 'تم تقديم الطلب', status: 'completed' },
        { date: '2024-01-14', event: 'تم مراجعة المشتريات', status: 'completed' },
        { date: '2024-01-17', event: 'في انتظار المراجعة المالية', status: 'pending' },
        { date: '2024-01-22', event: 'الموافقة النهائية', status: 'pending' },
      ],
    },
    {
      id: 5,
      type: 'store_closure',
      title: 'طلب إغلاق متجر - متجر الطائف',
      description: 'طلب إغلاق متجر الطائف الجبلي بسبب قلة المبيعات والطلب',
      status: 'approved',
      priority: 'high',
      requester: 'محمد عبدالرحمن الشمري',
      requesterEmail: 'mohammed@company.com',
      requesterPhone: '+966501234575',
      storeName: 'متجر الطائف الجبلي',
      storeLocation: 'الطائف - شارع الملك عبدالعزيز',
      storeType: 'retail',
      estimatedBudget: 0,
      expectedRevenue: 0,
      createdDate: '2024-01-08',
      dueDate: '2024-01-18',
      assignedTo: 'مدير العمليات',
      assignedToEmail: 'operations@company.com',
      assignedToPhone: '+966501234576',
      approvalSteps: [
        {
          step: 1,
          title: 'مراجعة الطلب',
          status: 'completed',
          approver: 'مدير العمليات',
          approvedDate: '2024-01-10',
          comments: 'تم مراجعة الطلب والموافقة عليه',
        },
        {
          step: 2,
          title: 'مراجعة المالية',
          status: 'completed',
          approver: 'مدير المالية',
          approvedDate: '2024-01-12',
          comments: 'تمت مراجعة المالية والموافقة على الإغلاق',
        },
        {
          step: 3,
          title: 'الموافقة النهائية',
          status: 'completed',
          approver: 'المدير العام',
          approvedDate: '2024-01-15',
          comments: 'تمت الموافقة النهائية على إغلاق المتجر',
        },
      ],
      documents: [
        { name: 'تقرير الأداء', type: 'pdf', size: '2.3 MB', uploadedDate: '2024-01-08' },
        { name: 'التحليل المالي', type: 'xlsx', size: '1.7 MB', uploadedDate: '2024-01-08' },
        { name: 'خطة الإغلاق', type: 'pdf', size: '1.9 MB', uploadedDate: '2024-01-08' },
      ],
      comments: [
        {
          author: 'مدير العمليات',
          date: '2024-01-10',
          comment: 'الطلب مبرر بناءً على الأداء الضعيف للمتجر',
        },
        {
          author: 'مدير المالية',
          date: '2024-01-12',
          comment: 'الإغلاق سيوفر التكاليف التشغيلية',
        },
        {
          author: 'المدير العام',
          date: '2024-01-15',
          comment: 'موافقة نهائية على إغلاق المتجر',
        },
      ],
      riskAssessment: {
        level: 'low',
        factors: ['الأداء الضعيف', 'التكاليف العالية'],
        mitigation: ['إعادة توزيع الموظفين', 'بيع المعدات'],
      },
      compliance: {
        legal: true,
        financial: true,
        operational: true,
        technical: true,
      },
      timeline: [
        { date: '2024-01-08', event: 'تم تقديم الطلب', status: 'completed' },
        { date: '2024-01-10', event: 'تم مراجعة العمليات', status: 'completed' },
        { date: '2024-01-12', event: 'تم مراجعة المالية', status: 'completed' },
        { date: '2024-01-15', event: 'تمت الموافقة النهائية', status: 'completed' },
      ],
    },
  ];

  const approvalTypes = [
    { value: 'store_creation', label: 'إنشاء متجر' },
    { value: 'budget_increase', label: 'زيادة الميزانية' },
    { value: 'staff_hiring', label: 'توظيف موظفين' },
    { value: 'equipment_purchase', label: 'شراء معدات' },
    { value: 'store_closure', label: 'إغلاق متجر' },
    { value: 'policy_change', label: 'تغيير سياسة' },
  ];

  const approvalStatuses = [
    { value: 'pending', label: 'في الانتظار', color: 'warning' },
    { value: 'approved', label: 'موافق عليه', color: 'success' },
    { value: 'rejected', label: 'مرفوض', color: 'error' },
    { value: 'cancelled', label: 'ملغي', color: 'default' },
  ];

  const priorities = [
    { value: 'low', label: 'منخفضة', color: 'info' },
    { value: 'medium', label: 'متوسطة', color: 'warning' },
    { value: 'high', label: 'عالية', color: 'error' },
    { value: 'urgent', label: 'عاجلة', color: 'error' },
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
    notify(`${action} الطلبات`, `${selectedItems.length} طلب`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (approval) => {
    setSelectedApproval(approval);
    setOpenViewDialog(true);
  };

  const handleApprove = (approval) => {
    setSelectedApproval(approval);
    setOpenDialog(true);
  };

  const handleReject = (approval) => {
    setSelectedApproval(approval);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('الموافقة على الطلب', 'تمت الموافقة على الطلب');
    }, 1000);
  };

  const handleRejectConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('رفض الطلب', 'تم رفض الطلب');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الطلبات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = approvalsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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
    const statusInfo = approvalStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = approvalStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getTypeLabel = (type) => {
    const typeInfo = approvalTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

  const getPriorityColor = (priority) => {
    const priorityInfo = priorities.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.color : 'default';
  };

  const getPriorityLabel = (priority) => {
    const priorityInfo = priorities.find((p) => p.value === priority);
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

  const totalApprovals = approvalsData.length;
  const pendingApprovals = approvalsData.filter((approval) => approval.status === 'pending').length;
  const approvedApprovals = approvalsData.filter(
    (approval) => approval.status === 'approved',
  ).length;
  const rejectedApprovals = approvalsData.filter(
    (approval) => approval.status === 'rejected',
  ).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إشراف وموافقة المتاجر الفرعية
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة ومراجعة جميع طلبات الموافقة للمتاجر الفرعية.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/substores">
            إدارة المتاجر الفرعية
          </Link>
          <Typography color="text.primary">الإشراف والموافقة</Typography>
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
                {totalApprovals}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الطلبات
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
                  <HourglassEmptyIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {pendingApprovals}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                في الانتظار
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
                {approvedApprovals}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                موافق عليها
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
                  <CancelIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {rejectedApprovals}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مرفوضة
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
                placeholder="البحث في الطلبات..."
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
                  {approvalStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>النوع</InputLabel>
                <Select
                  value={typeFilter}
                  label="النوع"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الأنواع</MenuItem>
                  {approvalTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
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
                  setTypeFilter('all');
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
            قائمة طلبات الموافقة
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('الموافقة على')} sx={{ mr: 1 }}>
                موافقة ({selectedItems.length})
              </Button>
              <Button size="small" color="error" onClick={() => handleBulkAction('رفض')}>
                رفض ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Tooltip title="تصدير CSV">
            <IconButton onClick={handleExport} sx={{ mr: 1 }}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
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
            <Alert severity="error">خطأ في تحميل الطلبات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على طلبات. أضف أول طلب.</Alert>
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
                      عنوان الطلب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'type'}
                      direction={sortBy === 'type' ? sortOrder : 'asc'}
                      onClick={() => handleSort('type')}
                    >
                      النوع
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
                      active={sortBy === 'requester'}
                      direction={sortBy === 'requester' ? sortOrder : 'asc'}
                      onClick={() => handleSort('requester')}
                    >
                      مقدم الطلب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'createdDate'}
                      direction={sortBy === 'createdDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('createdDate')}
                    >
                      تاريخ التقديم
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'dueDate'}
                      direction={sortBy === 'dueDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('dueDate')}
                    >
                      تاريخ الاستحقاق
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
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.storeName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getTypeLabel(item.type)}
                          size="small"
                          color="primary"
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
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{item.requester}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.requesterEmail}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.createdDate)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.dueDate)}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          {item.status === 'pending' && (
                            <>
                              <Tooltip title="الموافقة" arrow>
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleApprove(item)}
                                >
                                  <CheckCircleIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="الرفض" arrow>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleReject(item)}
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
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

      {/* Approval Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>الموافقة على الطلب</DialogTitle>
        <DialogContent>
          {selectedApproval && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedApproval.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {selectedApproval.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="تعليق الموافقة"
                    placeholder="أدخل تعليقك على الموافقة..."
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>المستوى التالي</InputLabel>
                    <Select label="المستوى التالي">
                      <MenuItem value="finance">مراجعة مالية</MenuItem>
                      <MenuItem value="final">الموافقة النهائية</MenuItem>
                      <MenuItem value="complete">مكتمل</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            disabled={loading}
            startIcon={<CheckCircleIcon />}
          >
            {loading ? 'جاري الموافقة...' : 'موافقة'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>رفض الطلب</DialogTitle>
        <DialogContent>
          {selectedApproval && (
            <Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                هل أنت متأكد من رفض هذا الطلب؟
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                <Typography variant="subtitle2">{selectedApproval.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedApproval.requester} - {selectedApproval.storeName}
                </Typography>
              </Box>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="سبب الرفض"
                placeholder="أدخل سبب رفض الطلب..."
                required
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleRejectConfirm}
            disabled={loading}
          >
            {loading ? 'جاري الرفض...' : 'رفض'}
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
            تفاصيل الطلب
          </Typography>
          {selectedApproval && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {selectedApproval.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedApproval.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={getStatusLabel(selectedApproval.status)}
                    color={getStatusColor(selectedApproval.status)}
                  />
                  <Chip
                    label={getPriorityLabel(selectedApproval.priority)}
                    color={getPriorityColor(selectedApproval.priority)}
                  />
                  <Chip
                    label={getTypeLabel(selectedApproval.type)}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                معلومات الطلب
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="مقدم الطلب" secondary={selectedApproval.requester} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="البريد الإلكتروني"
                    secondary={selectedApproval.requesterEmail}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedApproval.requesterPhone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="اسم المتجر" secondary={selectedApproval.storeName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="موقع المتجر" secondary={selectedApproval.storeLocation} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="نوع المتجر" secondary={selectedApproval.storeType} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الميزانية المقدرة"
                    secondary={formatCurrency(selectedApproval.estimatedBudget)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الإيرادات المتوقعة"
                    secondary={formatCurrency(selectedApproval.expectedRevenue)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ التقديم"
                    secondary={formatDate(selectedApproval.createdDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الاستحقاق"
                    secondary={formatDate(selectedApproval.dueDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المسؤول" secondary={selectedApproval.assignedTo} />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                خطوات الموافقة
              </Typography>
              <Timeline>
                {selectedApproval.approvalSteps.map((step, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot
                        color={
                          step.status === 'completed'
                            ? 'success'
                            : step.status === 'rejected'
                            ? 'error'
                            : 'grey'
                        }
                      >
                        {step.status === 'completed' ? (
                          <CheckIcon />
                        ) : step.status === 'rejected' ? (
                          <CloseIcon />
                        ) : (
                          <HourglassEmptyIcon />
                        )}
                      </TimelineDot>
                      {index < selectedApproval.approvalSteps.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle2">{step.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.approver}
                      </Typography>
                      {step.approvedDate && (
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(step.approvedDate)}
                        </Typography>
                      )}
                      {step.comments && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {step.comments}
                        </Typography>
                      )}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                المستندات
              </Typography>
              <List dense>
                {selectedApproval.documents.map((doc, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={doc.name}
                      secondary={`${doc.type.toUpperCase()} - ${doc.size} - ${formatDate(
                        doc.uploadedDate,
                      )}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                التعليقات
              </Typography>
              <List dense>
                {selectedApproval.comments.map((comment, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={comment.comment}
                      secondary={`${comment.author} - ${formatDate(comment.date)}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                تقييم المخاطر
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>المستوى:</strong> {selectedApproval.riskAssessment.level}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>العوامل:</strong> {selectedApproval.riskAssessment.factors.join(', ')}
                </Typography>
                <Typography variant="body2">
                  <strong>التخفيف:</strong> {selectedApproval.riskAssessment.mitigation.join(', ')}
                </Typography>
              </Box>

              <Typography variant="h6" gutterBottom>
                الامتثال
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label="قانوني"
                  color={selectedApproval.compliance.legal ? 'success' : 'error'}
                  size="small"
                />
                <Chip
                  label="مالي"
                  color={selectedApproval.compliance.financial ? 'success' : 'error'}
                  size="small"
                />
                <Chip
                  label="تشغيلي"
                  color={selectedApproval.compliance.operational ? 'success' : 'error'}
                  size="small"
                />
                <Chip
                  label="تقني"
                  color={selectedApproval.compliance.technical ? 'success' : 'error'}
                  size="small"
                />
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

export default SubstoresApprovals;
