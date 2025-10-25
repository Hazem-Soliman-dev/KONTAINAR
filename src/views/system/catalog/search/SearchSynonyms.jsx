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
  Skeleton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Stack,
  Avatar,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Policy as PolicyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  VisibilityOutlined,
  FilterList as FilterListIcon,
} from '@mui/icons-material';

const SearchSynonyms = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('term');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedSynonym, setSelectedSynonym] = useState(null);

  // Mock data for search synonyms
  const synonymsData = [
    {
      id: 1,
      term: 'لاب توب',
      synonyms: ['لاب توب', 'كمبيوتر', 'بي سي'],
      pinnedResult: 'لاب توب',
      status: 'نشط',
      updatedAt: '2024-01-15',
    },
    {
      id: 2,
      term: 'هاتف',
      synonyms: ['هاتف', 'هاتف محمول', 'هاتف ذكي'],
      pinnedResult: 'هاتف',
      status: 'نشط',
      updatedAt: '2024-01-14',
    },
    {
      id: 3,
      term: 'قميص',
      synonyms: ['قميص', 'قميص أعلى', 'قميص تي شيرت'],
      pinnedResult: 'قميص',
      status: 'غير نشط',
      updatedAt: '2024-01-13',
    },
    {
      id: 4,
      term: 'أحذية',
      synonyms: ['أحذية', 'أحذية سنكرز', 'أحذية بوتس'],
      pinnedResult: 'أحذية',
      status: 'نشط',
      updatedAt: '2024-01-12',
    },
    {
      id: 5,
      term: 'مشينج',
      synonyms: ['مشينج', 'مشينج محمول', 'مشينج حقيبة'],
      pinnedResult: 'مشينج',
      status: 'نشط',
      updatedAt: '2024-01-11',
    },
  ];

  // Mock data for search stats
  const searchStats = [
    { title: 'عدد المصطلحات', value: '156', change: '+8%', color: 'primary', icon: SearchIcon },
    {
      title: 'متوسط المرادفات',
      value: '3.2',
      change: '+0.4',
      color: 'secondary',
      icon: SettingsIcon,
    },
    {
      title: 'النتائج المثبتة',
      value: '89',
      change: '+12',
      color: 'success',
      icon: CheckCircleIcon,
    },
    { title: 'محدث اليوم', value: '24', change: '+5', color: 'info', icon: AnalyticsIcon },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const notify = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
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
      setSelectedItems(synonymsData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action) => {
    if (selectedItems.length === 0) return;

    switch (action) {
      case 'delete':
        notify(`Deleted ${selectedItems.length} synonyms`);
        setSelectedItems([]);
        break;
      case 'export':
        notify(`Exported ${selectedItems.length} synonyms`);
        break;
      default:
        break;
    }
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (synonym) => {
    setSelectedSynonym(synonym);
    setViewDrawer(true);
  };

  const handleEdit = (synonym) => {
    setSelectedSynonym(synonym);
    setOpenDialog(true);
  };

  const handleDelete = (synonym) => {
    setSelectedSynonym(synonym);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setOpenDialog(false);
    notify('Synonym updated successfully');
  };

  const handleDeleteConfirm = () => {
    setOpenDeleteDialog(false);
    notify('Synonym deleted successfully');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('Data refreshed successfully');
    }, 1000);
  };

  const filteredData = synonymsData.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  const [formData, setFormData] = useState({
    title: 'Search Synonyms',
    content: '',
    isActive: true,
    synonymType: 'exact',
    sourceTerm: '',
    targetTerm: '',
    contactInfo: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Synonym Rules',
      content: 'Configure search synonym rules to improve search results.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'Synonym Types',
      content: 'Define different types of synonyms including exact and fuzzy matches.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'Synonym Testing',
      content: 'Test synonym rules to ensure they work correctly.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'Synonym Analytics',
      content: 'View synonym usage and performance analytics.',
      isExpanded: false,
    },
  ]);

  const handleAddSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: 'New Section',
      content: '',
      isExpanded: false,
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleSectionChange = (id, field, value) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)),
    );
  };

  const handleToggleExpanded = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, isExpanded: !section.isExpanded } : section,
      ),
    );
  };

  return (
    <Box
      sx={{ p: 3 }}
      role="main"
      aria-label="إدارة مرادفات البحث"
      aria-hidden="false"
      tabIndex={0}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
          إدارة مرادفات البحث
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          إدارة مرادفات البحث لتحسين نتائج البحث وتجربة المستخدم
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="مسار التنقل">
          <Link color="inherit" href="/main-store" aria-label="الذهاب إلى المتجر الرئيسي">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            المتجر الرئيسي
          </Link>
          <Link color="inherit" href="/main-store/catalog" aria-label="الذهاب إلى الكتالوج">
            الكتالوج
          </Link>
          <Typography color="text.primary">مرادفات البحث</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
              aria-label="تحديث البيانات"
              aria-hidden="false"
              tabIndex={0}
            >
              تحديث
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              aria-label="إضافة مرادف جديد"
              aria-hidden="false"
              tabIndex={0}
            >
              إضافة مرادف
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {searchStats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette[stat.color].main,
                  0.08,
                )} 0%, ${alpha(theme.palette[stat.color].main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette[stat.color].main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette[stat.color].main, 0.1),
                    color: theme.palette[stat.color].main,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <stat.icon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <Chip label={stat.change} size="small" color={stat.color} variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters & Search */}
      <Paper sx={{ p: 3, mb: 4 }} aria-hidden="false">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            الفلاتر والبحث
          </Typography>
          <Button
            variant="outlined"
            size="small"
            aria-label="مسح الفلاتر"
            aria-hidden="false"
            tabIndex={0}
          >
            مسح الفلاتر
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="البحث في المرادفات..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="البحث في المرادفات"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select
                value={statusFilter}
                label="الحالة"
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="فلتر الحالة"
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>النوع</InputLabel>
              <Select value="all" label="النوع" aria-label="فلتر النوع">
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="exact">مطابقة دقيقة</MenuItem>
                <MenuItem value="fuzzy">مطابقة تقريبية</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              تم العثور على {filteredData.length} مرادف
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading && <LinearProgress />}

        {selectedItems.length > 0 && (
          <Toolbar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
            <Typography variant="subtitle1" sx={{ flex: '1 1 100%' }}>
              {selectedItems.length} محدد
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleBulkAction('export')}
              sx={{ mr: 1 }}
              aria-label="تصدير المحدد"
              aria-hidden="false"
              tabIndex={0}
            >
              تصدير
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleBulkAction('delete')}
              aria-label="حذف المحدد"
              aria-hidden="false"
              tabIndex={0}
            >
              حذف
            </Button>
          </Toolbar>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < synonymsData.length
                  }
                  checked={synonymsData.length > 0 && selectedItems.length === synonymsData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'term'}
                  direction={sortBy === 'term' ? sortOrder : 'asc'}
                  onClick={() => handleSort('term')}
                >
                  المصطلح
                </TableSortLabel>
              </TableCell>
              <TableCell>المرادفات</TableCell>
              <TableCell>النتيجة المثبتة</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>آخر تحديث</TableCell>
              <TableCell>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Alert severity="info">لم يتم العثور على مرادفات</Alert>
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((synonym) => (
                  <TableRow key={synonym.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(synonym.id)}
                        onChange={() => handleSelectItem(synonym.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {synonym.term}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {synonym.synonyms.map((syn, index) => (
                          <Chip key={index} label={syn} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {synonym.pinnedResult}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={synonym.status}
                        size="small"
                        color={synonym.status === 'active' ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" color="text.secondary">
                        {synonym.updatedAt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="عرض التفاصيل">
                          <IconButton
                            size="small"
                            onClick={() => handleView(synonym)}
                            aria-label="عرض المرادف"
                            aria-hidden="false"
                            tabIndex={0}
                          >
                            <VisibilityOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تعديل المرادف">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(synonym)}
                            aria-label="تعديل المرادف"
                            aria-hidden="false"
                            tabIndex={0}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="حذف المرادف">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(synonym)}
                            aria-label="حذف المرادف"
                            color="error"
                            aria-hidden="false"
                            tabIndex={0}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">تعديل المرادف</DialogTitle>
        <DialogContent id="dialog-description">
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="المصطلح"
                value={selectedSynonym?.term || ''}
                variant="outlined"
                helperText="أدخل المصطلح الرئيسي للبحث"
                aria-label="المصطلح"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="المرادفات"
                multiline
                rows={3}
                value={selectedSynonym?.synonyms?.join(', ') || ''}
                variant="outlined"
                helperText="أدخل المرادفات مفصولة بفواصل"
                aria-label="المرادفات"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="النتيجة المثبتة"
                value={selectedSynonym?.pinnedResult || ''}
                variant="outlined"
                helperText="أدخل نتيجة البحث المثبتة"
                aria-label="النتيجة المثبتة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={selectedSynonym?.status || 'active'}
                  label="الحالة"
                  aria-label="حالة المرادف"
                >
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            aria-label="إلغاء العملية"
            aria-hidden="false"
            tabIndex={0}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            aria-label="حفظ المرادف"
            aria-hidden="false"
            tabIndex={0}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">حذف المرادف</DialogTitle>
        <DialogContent id="delete-dialog-description">
          <Typography>
            هل أنت متأكد من حذف "{selectedSynonym?.term}"؟ لا يمكن التراجع عن هذا الإجراء.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            aria-label="إلغاء الحذف"
            aria-hidden="false"
            tabIndex={0}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            aria-label="تأكيد الحذف"
            aria-hidden="false"
            tabIndex={0}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Drawer */}
      <Drawer
        anchor="right"
        open={viewDrawer}
        onClose={() => setViewDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
        aria-labelledby="drawer-title"
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }} id="drawer-title">
            تفاصيل المرادف
          </Typography>
          {selectedSynonym && (
            <List>
              <ListItem>
                <ListItemText primary="المصطلح" secondary={selectedSynonym.term} />
              </ListItem>
              <ListItem>
                <ListItemText primary="المرادفات" secondary={selectedSynonym.synonyms.join(', ')} />
              </ListItem>
              <ListItem>
                <ListItemText primary="النتيجة المثبتة" secondary={selectedSynonym.pinnedResult} />
              </ListItem>
              <ListItem>
                <ListItemText primary="الحالة" secondary={selectedSynonym.status} />
              </ListItem>
              <ListItem>
                <ListItemText primary="آخر تحديث" secondary={selectedSynonym.updatedAt} />
              </ListItem>
            </List>
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

export default SearchSynonyms;
