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
  AccessTime as AccessTimeIcon,
  CheckCircleOutline as CheckIcon,
  BlockOutlined as CloseIcon,
  Download as DownloadIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const Attendance = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for attendance
  const attendanceData = [
    {
      id: 1,
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      department: 'المبيعات',
      position: 'مدير مبيعات',
      date: '2024-01-15',
      checkIn: '08:30',
      checkOut: '17:30',
      totalHours: 9,
      overtime: 1,
      status: 'present',
      lateMinutes: 0,
      earlyLeaveMinutes: 0,
      breakTime: 60,
      notes: 'حضور عادي',
      createdBy: 'نظام الحضور',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      employeeName: 'فاطمة أحمد السعيد',
      employeeId: 'EMP002',
      department: 'المحاسبة',
      position: 'محاسب',
      date: '2024-01-15',
      checkIn: '09:15',
      checkOut: '18:00',
      totalHours: 8.75,
      overtime: 0.75,
      status: 'late',
      lateMinutes: 45,
      earlyLeaveMinutes: 0,
      breakTime: 60,
      notes: 'تأخير بسبب المواصلات',
      createdBy: 'نظام الحضور',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 3,
      employeeName: 'خالد عبدالله المطيري',
      employeeId: 'EMP003',
      department: 'التقنية',
      position: 'مطور برمجيات',
      date: '2024-01-15',
      checkIn: '08:00',
      checkOut: '16:30',
      totalHours: 8.5,
      overtime: 0,
      status: 'early_leave',
      lateMinutes: 0,
      earlyLeaveMinutes: 30,
      breakTime: 60,
      notes: 'مغادرة مبكرة بموافقة المدير',
      createdBy: 'نظام الحضور',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 4,
      employeeName: 'سارة محمد الحسن',
      employeeId: 'EMP004',
      department: 'الموارد البشرية',
      position: 'أخصائي موارد بشرية',
      date: '2024-01-15',
      checkIn: '08:00',
      checkOut: '17:00',
      totalHours: 9,
      overtime: 1,
      status: 'present',
      lateMinutes: 0,
      earlyLeaveMinutes: 0,
      breakTime: 60,
      notes: 'حضور عادي',
      createdBy: 'نظام الحضور',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 5,
      employeeName: 'محمد عبدالرحمن الشمري',
      employeeId: 'EMP005',
      department: 'المبيعات',
      position: 'مندوب مبيعات',
      date: '2024-01-15',
      checkIn: null,
      checkOut: null,
      totalHours: 0,
      overtime: 0,
      status: 'absent',
      lateMinutes: 0,
      earlyLeaveMinutes: 0,
      breakTime: 0,
      notes: 'غياب بدون عذر',
      createdBy: 'نظام الحضور',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
    },
  ];

  const attendanceStatuses = [
    { value: 'present', label: 'حاضر', color: 'success' },
    { value: 'late', label: 'متأخر', color: 'warning' },
    { value: 'early_leave', label: 'مغادرة مبكرة', color: 'info' },
    { value: 'absent', label: 'غائب', color: 'error' },
    { value: 'sick_leave', label: 'إجازة مرضية', color: 'default' },
    { value: 'vacation', label: 'إجازة', color: 'default' },
  ];

  const departments = [
    'المبيعات',
    'المحاسبة',
    'التقنية',
    'الموارد البشرية',
    'التسويق',
    'الإدارة',
    'العمليات',
  ];

  const positions = [
    'مدير مبيعات',
    'محاسب',
    'مطور برمجيات',
    'أخصائي موارد بشرية',
    'مندوب مبيعات',
    'مدير تقنية',
    'مدير عام',
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
    notify(`${action} سجلات الحضور`, `${selectedItems.length} سجل`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (attendance) => {
    setSelectedAttendance(attendance);
    setOpenViewDialog(true);
  };

  const handleEdit = (attendance) => {
    setSelectedAttendance(attendance);
    setOpenDialog(true);
  };

  const handleDelete = (attendance) => {
    setSelectedAttendance(attendance);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث سجل الحضور', selectedAttendance ? 'تم تحديث السجل' : 'تم إضافة السجل');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف سجل الحضور', 'تم حذف السجل');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير سجلات الحضور', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = attendanceData.filter((item) => {
    const matchesSearch =
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || item.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
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
    const statusInfo = attendanceStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = attendanceStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const formatTime = (timeString) => {
    return timeString || '--:--';
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

  const totalEmployees = attendanceData.length;
  const presentEmployees = attendanceData.filter((att) => att.status === 'present').length;
  const lateEmployees = attendanceData.filter((att) => att.status === 'late').length;
  const absentEmployees = attendanceData.filter((att) => att.status === 'absent').length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة الحضور والإجازات
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          تتبع سجلات الحضور والانصراف للموظفين مع إدارة الإجازات والغياب.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/hr">
            شؤون الموظفين
          </Link>
          <Typography color="text.primary">الحضور والإجازات</Typography>
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
                {totalEmployees}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الموظفين
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
                {presentEmployees}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الحضور
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
                  <AccessTimeIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {lateEmployees}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                المتأخرين
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
                  <CloseIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {absentEmployees}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الغائبين
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
                placeholder="البحث في سجلات الحضور..."
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
                  {attendanceStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>القسم</InputLabel>
                <Select
                  value={departmentFilter}
                  label="القسم"
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الأقسام</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
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
                  setDepartmentFilter('all');
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
            سجلات الحضور والانصراف
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
            إضافة سجل حضور
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
            <Alert severity="error">خطأ في تحميل سجلات الحضور. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على سجلات حضور. أضف أول سجل.</Alert>
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
                      active={sortBy === 'employeeName'}
                      direction={sortBy === 'employeeName' ? sortOrder : 'asc'}
                      onClick={() => handleSort('employeeName')}
                    >
                      اسم الموظف
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'department'}
                      direction={sortBy === 'department' ? sortOrder : 'asc'}
                      onClick={() => handleSort('department')}
                    >
                      القسم
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
                      active={sortBy === 'checkIn'}
                      direction={sortBy === 'checkIn' ? sortOrder : 'asc'}
                      onClick={() => handleSort('checkIn')}
                    >
                      وقت الدخول
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'checkOut'}
                      direction={sortBy === 'checkOut' ? sortOrder : 'asc'}
                      onClick={() => handleSort('checkOut')}
                    >
                      وقت الخروج
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalHours'}
                      direction={sortBy === 'totalHours' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalHours')}
                    >
                      إجمالي الساعات
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
                          <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                            {item.employeeName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.employeeName}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.employeeId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{item.department}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.position}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.date)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color={item.checkIn ? 'success.main' : 'error.main'}
                        >
                          {formatTime(item.checkIn)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color={item.checkOut ? 'success.main' : 'error.main'}
                        >
                          {formatTime(item.checkOut)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {item.totalHours} ساعة
                        </Typography>
                        {item.overtime > 0 && (
                          <Typography variant="caption" color="warning.main">
                            +{item.overtime} إضافي
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل السجل" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف السجل" arrow>
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
        <DialogTitle>{selectedAttendance ? 'تعديل سجل الحضور' : 'إضافة سجل حضور جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الموظف</InputLabel>
                <Select label="الموظف" defaultValue={selectedAttendance?.employeeId || ''}>
                  {attendanceData.map((emp) => (
                    <MenuItem key={emp.employeeId} value={emp.employeeId}>
                      {emp.employeeName} - {emp.employeeId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="التاريخ"
                defaultValue={selectedAttendance?.date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="time"
                label="وقت الدخول"
                defaultValue={selectedAttendance?.checkIn || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="time"
                label="وقت الخروج"
                defaultValue={selectedAttendance?.checkOut || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedAttendance?.status || 'present'}>
                  {attendanceStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="إجمالي الساعات"
                placeholder="8"
                defaultValue={selectedAttendance?.totalHours || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="دقائق التأخير"
                placeholder="0"
                defaultValue={selectedAttendance?.lateMinutes || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="دقائق المغادرة المبكرة"
                placeholder="0"
                defaultValue={selectedAttendance?.earlyLeaveMinutes || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                placeholder="أدخل ملاحظات حول الحضور"
                defaultValue={selectedAttendance?.notes || ''}
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
        <DialogTitle>حذف سجل الحضور</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا السجل؟
          </Typography>
          {selectedAttendance && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedAttendance.employeeName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(selectedAttendance.date)} - {getStatusLabel(selectedAttendance.status)}
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
            تفاصيل سجل الحضور
          </Typography>
          {selectedAttendance && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  {selectedAttendance.employeeName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedAttendance.employeeName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedAttendance.employeeId}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم الموظف" secondary={selectedAttendance.employeeName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الموظف" secondary={selectedAttendance.employeeId} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="القسم" secondary={selectedAttendance.department} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المنصب" secondary={selectedAttendance.position} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التاريخ" secondary={formatDate(selectedAttendance.date)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="وقت الدخول"
                    secondary={formatTime(selectedAttendance.checkIn)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="وقت الخروج"
                    secondary={formatTime(selectedAttendance.checkOut)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي الساعات"
                    secondary={`${selectedAttendance.totalHours} ساعة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الساعات الإضافية"
                    secondary={`${selectedAttendance.overtime} ساعة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedAttendance.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="دقائق التأخير"
                    secondary={`${selectedAttendance.lateMinutes} دقيقة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="دقائق المغادرة المبكرة"
                    secondary={`${selectedAttendance.earlyLeaveMinutes} دقيقة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="وقت الراحة"
                    secondary={`${selectedAttendance.breakTime} دقيقة`}
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedAttendance.notes}
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

export default Attendance;
