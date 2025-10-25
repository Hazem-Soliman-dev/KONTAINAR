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
  Divider,
  Stack,
  Avatar,
  Checkbox,
  TableSortLabel,
  LinearProgress,
  Skeleton,
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
  People as PeopleIcon,
  CheckCircleOutline as CheckIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  Work as WorkIcon,
  Engineering as EngineeringIcon,
  DesignServices as DesignServicesIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const Resources = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for resources
  const resourcesData = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      type: 'human',
      role: 'مطور برمجيات',
      department: 'التقنية',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      availability: 'available',
      hourlyRate: 150,
      totalHours: 160,
      utilizedHours: 120,
      utilizationRate: 75,
      currentProjects: ['مشروع النظام الجديد', 'تطوير الموقع'],
      experience: '5 سنوات',
      location: 'الرياض',
      email: 'ahmed@company.com',
      phone: '+966501234567',
      startDate: '2022-01-15',
      notes: 'مطور متميز مع خبرة واسعة في التقنيات الحديثة',
      createdBy: 'مدير الموارد',
      createdDate: '2022-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      name: 'فاطمة أحمد السعيد',
      type: 'human',
      role: 'مصممة واجهات',
      department: 'التصميم',
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Sketch'],
      availability: 'busy',
      hourlyRate: 120,
      totalHours: 160,
      utilizedHours: 160,
      utilizationRate: 100,
      currentProjects: ['تصميم النظام الجديد'],
      experience: '3 سنوات',
      location: 'جدة',
      email: 'fatima@company.com',
      phone: '+966501234568',
      startDate: '2023-03-01',
      notes: 'مصممة مبدعة مع عين فنية ممتازة',
      createdBy: 'مدير الموارد',
      createdDate: '2023-03-01',
      lastModified: '2024-01-10',
    },
    {
      id: 3,
      name: 'خالد عبدالله المطيري',
      type: 'human',
      role: 'مدير مشاريع',
      department: 'إدارة المشاريع',
      skills: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
      availability: 'available',
      hourlyRate: 200,
      totalHours: 160,
      utilizedHours: 100,
      utilizationRate: 62.5,
      currentProjects: ['إدارة الفريق التقني'],
      experience: '8 سنوات',
      location: 'الدمام',
      email: 'khalid@company.com',
      phone: '+966501234569',
      startDate: '2021-06-01',
      notes: 'مدير مشاريع محترف مع خبرة في إدارة الفرق الكبيرة',
      createdBy: 'مدير الموارد',
      createdDate: '2021-06-01',
      lastModified: '2024-01-12',
    },
    {
      id: 4,
      name: 'سارة محمد الحسن',
      type: 'human',
      role: 'محللة أعمال',
      department: 'التحليل',
      skills: ['Business Analysis', 'Data Analysis', 'SQL', 'Excel'],
      availability: 'partially_available',
      hourlyRate: 130,
      totalHours: 160,
      utilizedHours: 80,
      utilizationRate: 50,
      currentProjects: ['تحليل متطلبات النظام'],
      experience: '4 سنوات',
      location: 'الرياض',
      email: 'sara@company.com',
      phone: '+966501234570',
      startDate: '2022-09-01',
      notes: 'محللة أعمال دقيقة مع مهارات تحليلية ممتازة',
      createdBy: 'مدير الموارد',
      createdDate: '2022-09-01',
      lastModified: '2024-01-08',
    },
    {
      id: 5,
      name: 'خادم التطوير الرئيسي',
      type: 'equipment',
      role: 'خادم',
      department: 'التقنية',
      skills: ['Server Management', 'Cloud Computing', 'Database'],
      availability: 'available',
      hourlyRate: 0,
      totalHours: 24,
      utilizedHours: 18,
      utilizationRate: 75,
      currentProjects: ['استضافة التطبيقات'],
      experience: '2 سنوات',
      location: 'مركز البيانات',
      email: 'server@company.com',
      phone: 'N/A',
      startDate: '2022-01-01',
      notes: 'خادم عالي الأداء لاستضافة التطبيقات',
      createdBy: 'مدير التقنية',
      createdDate: '2022-01-01',
      lastModified: '2024-01-05',
    },
  ];

  const resourceStatuses = [
    { value: 'available', label: 'متاح', color: 'success' },
    { value: 'busy', label: 'مشغول', color: 'warning' },
    { value: 'partially_available', label: 'متاح جزئياً', color: 'info' },
    { value: 'unavailable', label: 'غير متاح', color: 'error' },
  ];

  const resourceTypes = [
    { value: 'human', label: 'موارد بشرية' },
    { value: 'equipment', label: 'معدات' },
    { value: 'software', label: 'برمجيات' },
    { value: 'other', label: 'أخرى' },
  ];

  const departments = [
    'التقنية',
    'التصميم',
    'إدارة المشاريع',
    'التحليل',
    'المبيعات',
    'التسويق',
    'الموارد البشرية',
  ];

  const skills = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'UI/UX Design',
    'Figma',
    'Project Management',
    'Agile',
    'Business Analysis',
    'Data Analysis',
    'SQL',
    'Server Management',
    'Cloud Computing',
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
    notify(`${action} الموارد`, `${selectedItems.length} مورد`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (resource) => {
    setSelectedResource(resource);
    setOpenViewDialog(true);
  };

  const handleEdit = (resource) => {
    setSelectedResource(resource);
    setOpenDialog(true);
  };

  const handleDelete = (resource) => {
    setSelectedResource(resource);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المورد', selectedResource ? 'تم تحديث المورد' : 'تم إضافة المورد');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المورد', 'تم حذف المورد');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الموارد', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = resourcesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.availability === statusFilter;
    const matchesSkill = skillFilter === 'all' || item.skills.includes(skillFilter);
    return matchesSearch && matchesStatus && matchesSkill;
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
    const statusInfo = resourceStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = resourceStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'human':
        return <PersonIcon />;
      case 'equipment':
        return <EngineeringIcon />;
      case 'software':
        return <DesignServicesIcon />;
      default:
        return <WorkIcon />;
    }
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

  const totalResources = resourcesData.length;
  const availableResources = resourcesData.filter(
    (resource) => resource.availability === 'available',
  ).length;
  const humanResources = resourcesData.filter((resource) => resource.type === 'human').length;
  const averageUtilization =
    resourcesData.reduce((sum, resource) => sum + resource.utilizationRate, 0) /
    resourcesData.length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          تخصيص الموارد
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتخصيص الموارد البشرية والمعدات للمشاريع مع تتبع الاستخدام والتوفر.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/projects">
            إدارة المشاريع
          </Link>
          <Typography color="text.primary">تخصيص الموارد</Typography>
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
                  <PeopleIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalResources}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الموارد
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
                {availableResources}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الموارد المتاحة
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
                  <PersonIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {humanResources}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الموارد البشرية
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
                  <AssessmentIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {Math.round(averageUtilization)}%
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                متوسط الاستخدام
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
                placeholder="البحث في الموارد..."
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
                  {resourceStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المهارة</InputLabel>
                <Select
                  value={skillFilter}
                  label="المهارة"
                  onChange={(e) => setSkillFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع المهارات</MenuItem>
                  {skills.map((skill) => (
                    <MenuItem key={skill} value={skill}>
                      {skill}
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
                  setSkillFilter('all');
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
            قائمة الموارد
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تخصيص')} sx={{ mr: 1 }}>
                تخصيص ({selectedItems.length})
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
            إضافة مورد
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
            <Alert severity="error">خطأ في تحميل الموارد. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على موارد. أضف أول مورد.</Alert>
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
                      اسم المورد
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
                      active={sortBy === 'role'}
                      direction={sortBy === 'role' ? sortOrder : 'asc'}
                      onClick={() => handleSort('role')}
                    >
                      الدور
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
                      active={sortBy === 'availability'}
                      direction={sortBy === 'availability' ? sortOrder : 'asc'}
                      onClick={() => handleSort('availability')}
                    >
                      التوفر
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'utilizationRate'}
                      direction={sortBy === 'utilizationRate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('utilizationRate')}
                    >
                      معدل الاستخدام
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
                            {getTypeIcon(item.type)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.role}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            resourceTypes.find((t) => t.value === item.type)?.label || item.type
                          }
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.role}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.department}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.availability)}
                          size="small"
                          color={getStatusColor(item.availability)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {item.utilizationRate}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={item.utilizationRate}
                            sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                            color={
                              item.utilizationRate > 80
                                ? 'error'
                                : item.utilizationRate > 60
                                ? 'warning'
                                : 'success'
                            }
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل المورد" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف المورد" arrow>
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
        <DialogTitle>{selectedResource ? 'تعديل المورد' : 'إضافة مورد جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم المورد"
                placeholder="أدخل اسم المورد"
                defaultValue={selectedResource?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع المورد</InputLabel>
                <Select label="نوع المورد" defaultValue={selectedResource?.type || 'human'}>
                  {resourceTypes.map((type) => (
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
                label="الدور"
                placeholder="أدخل دور المورد"
                defaultValue={selectedResource?.role || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>القسم</InputLabel>
                <Select label="القسم" defaultValue={selectedResource?.department || ''}>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedResource?.availability || 'available'}>
                  {resourceStatuses.map((status) => (
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
                label="السعر بالساعة"
                placeholder="0"
                defaultValue={selectedResource?.hourlyRate || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الخبرة"
                placeholder="مثال: 5 سنوات"
                defaultValue={selectedResource?.experience || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الموقع"
                placeholder="أدخل الموقع"
                defaultValue={selectedResource?.location || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="example@company.com"
                defaultValue={selectedResource?.email || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="+966501234567"
                defaultValue={selectedResource?.phone || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ البداية"
                defaultValue={selectedResource?.startDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الملاحظات"
                placeholder="أدخل ملاحظات حول المورد"
                defaultValue={selectedResource?.notes || ''}
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
        <DialogTitle>حذف المورد</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا المورد؟
          </Typography>
          {selectedResource && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedResource.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedResource.role} - {selectedResource.department}
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
            تفاصيل المورد
          </Typography>
          {selectedResource && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  {getTypeIcon(selectedResource.type)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedResource.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedResource.role}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم المورد" secondary={selectedResource.name} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="النوع"
                    secondary={
                      resourceTypes.find((t) => t.value === selectedResource.type)?.label ||
                      selectedResource.type
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الدور" secondary={selectedResource.role} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="القسم" secondary={selectedResource.department} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedResource.availability)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="السعر بالساعة"
                    secondary={
                      selectedResource.hourlyRate > 0
                        ? formatCurrency(selectedResource.hourlyRate)
                        : 'غير محدد'
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي الساعات"
                    secondary={`${selectedResource.totalHours} ساعة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الساعات المستخدمة"
                    secondary={`${selectedResource.utilizedHours} ساعة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="معدل الاستخدام"
                    secondary={`${selectedResource.utilizationRate}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الخبرة" secondary={selectedResource.experience} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموقع" secondary={selectedResource.location} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البريد الإلكتروني" secondary={selectedResource.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedResource.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ البداية"
                    secondary={formatDate(selectedResource.startDate)}
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المهارات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedResource.skills.map((skill, index) => (
                  <Chip key={index} label={skill} size="small" color="primary" variant="outlined" />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المشاريع الحالية
              </Typography>
              <List dense>
                {selectedResource.currentProjects.map((project, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={project} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedResource.notes}
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

export default Resources;
