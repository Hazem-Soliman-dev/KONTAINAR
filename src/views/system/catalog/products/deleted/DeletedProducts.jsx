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
  Checkbox,
  TableSortLabel,
  LinearProgress,
  Avatar,
  Badge,
  Fade,
  Zoom,
  Menu,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Autocomplete,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText as MuiListItemText,
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
  NavigateNext as NavigateNextIcon,
  MoreVert as MoreVertIcon,
  DragIndicator as DragIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Inventory as InventoryIcon,
  ShoppingCart as CartIcon,
  AttachMoney as PriceIcon,
  Analytics as AnalyticsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  Restore as RestoreIcon,
  DeleteForever as DeleteForeverIcon,
  Archive as ArchiveIcon,
  History as HistoryIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Settings as SettingsIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  RestoreFromTrash as RestoreFromTrashIcon,
} from '@mui/icons-material';

const DeletedProducts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('deletedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Enhanced mock data with deleted products
  const deletedProductsData = [
    {
      id: 1,
      name: 'iPhone 14 Pro Max 256GB',
      sku: 'IPH14PM-256',
      status: 'Deleted',
      deletedDate: '2024-01-15',
      deletedBy: 'Admin',
      reason: 'Product Discontinued',
      priority: 'High',
      views: 1250,
      clicks: 89,
      price: 1099.99,
      stock: 0,
      originalStock: 45,
      category: 'Smartphones',
      brand: 'Apple',
      tags: ['smartphone', 'apple', 'discontinued'],
      featured: true,
      position: 1,
      description: 'Previous generation iPhone with advanced camera system',
      lastModified: '2024-01-10',
      canRestore: true,
      restoreDate: null,
      deletionType: 'Soft Delete',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23 Ultra 512GB',
      sku: 'SGS23U-512',
      status: 'Deleted',
      deletedDate: '2024-01-14',
      deletedBy: 'Editor',
      reason: 'Low Performance',
      priority: 'Medium',
      views: 890,
      clicks: 67,
      price: 1199.99,
      stock: 0,
      originalStock: 32,
      category: 'Smartphones',
      brand: 'Samsung',
      tags: ['smartphone', 'samsung', 'low-performance'],
      featured: false,
      position: 2,
      description: 'Samsung flagship with S Pen and advanced camera',
      lastModified: '2024-01-08',
      canRestore: true,
      restoreDate: null,
      deletionType: 'Soft Delete',
    },
    {
      id: 3,
      name: 'MacBook Pro M2 16" 1TB',
      sku: 'MBP-M2-16-1TB',
      status: 'Deleted',
      deletedDate: '2024-01-13',
      deletedBy: 'Admin',
      reason: 'Replaced by M3',
      priority: 'High',
      views: 650,
      clicks: 23,
      price: 2499.99,
      stock: 0,
      originalStock: 12,
      category: 'Laptops',
      brand: 'Apple',
      tags: ['laptop', 'apple', 'macbook', 'replaced'],
      featured: true,
      position: 3,
      description: 'Previous generation MacBook Pro with M2 chip',
      lastModified: '2024-01-05',
      canRestore: false,
      restoreDate: null,
      deletionType: 'Hard Delete',
    },
    {
      id: 4,
      name: 'Dell XPS 13 Plus 1TB',
      sku: 'DXP13P-1TB',
      status: 'Deleted',
      deletedDate: '2024-01-12',
      deletedBy: 'Editor',
      reason: 'Quality Issues',
      priority: 'Medium',
      views: 420,
      clicks: 15,
      price: 1599.99,
      stock: 0,
      originalStock: 8,
      category: 'Laptops',
      brand: 'Dell',
      tags: ['laptop', 'dell', 'quality-issues'],
      featured: false,
      position: 4,
      description: 'Ultrabook with premium design and performance',
      lastModified: '2024-01-03',
      canRestore: true,
      restoreDate: null,
      deletionType: 'Soft Delete',
    },
    {
      id: 5,
      name: 'Sony WH-1000XM4 Headphones',
      sku: 'SNY-WH1000XM4',
      status: 'Deleted',
      deletedDate: '2024-01-11',
      deletedBy: 'Admin',
      reason: 'Replaced by XM5',
      priority: 'Low',
      views: 320,
      clicks: 12,
      price: 349.99,
      stock: 0,
      originalStock: 25,
      category: 'Audio',
      brand: 'Sony',
      tags: ['headphones', 'sony', 'replaced'],
      featured: false,
      position: 5,
      description: 'Previous generation noise-canceling headphones',
      lastModified: '2024-01-01',
      canRestore: true,
      restoreDate: null,
      deletionType: 'Soft Delete',
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(deletedProductsData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    setLoading(false);
    setSnackbar({ open: true, message: 'Data refreshed successfully', severity: 'success' });
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for items:`, selectedItems);
    setSnackbar({
      open: true,
      message: `${action} completed for ${selectedItems.length} items`,
      severity: 'success',
    });
    setSelectedItems([]);
  };

  const handleRestore = (product) => {
    setSelectedProduct(product);
    setOpenRestoreDialog(true);
  };

  const handlePermanentDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'Product restored successfully', severity: 'success' });
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'deleted':
        return 'error';
      case 'restored':
        return 'success';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getDeletionTypeColor = (deletionType) => {
    switch (deletionType.toLowerCase()) {
      case 'soft delete':
        return 'warning';
      case 'hard delete':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredData = deletedProductsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Enhanced Header with Stats */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Deleted Products
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Manage deleted products, restore items, or permanently remove them
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link
                color="inherit"
                href="/main-store"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Dashboard
              </Link>
              <Link color="inherit" href="/main-store/catalog">
                Catalog
              </Link>
              <Link color="inherit" href="/main-store/catalog/products">
                Products
              </Link>
              <Typography color="text.primary">Deleted Products</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<RestoreIcon />}
              onClick={() => setOpenRestoreDialog(true)}
            >
              Bulk Restore
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'error.main', width: 48, height: 48, mr: 2 }}>
                    <DeleteIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                  {deletedProductsData.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Deleted Products
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, mr: 2 }}>
                    <RestoreIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {deletedProductsData.filter((item) => item.canRestore).length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Can Restore
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, mr: 2 }}>
                    <ArchiveIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {deletedProductsData.filter((item) => item.deletionType === 'Soft Delete').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Soft Deleted
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
                  'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)',
                border: '1px solid rgba(156, 39, 176, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(156, 39, 176, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, mr: 2 }}>
                    <HistoryIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {deletedProductsData.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Total Views
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Enhanced Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters & Search
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search deleted products, SKUs, or reasons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Deletion Type</InputLabel>
              <Select
                value={statusFilter}
                label="Deletion Type"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="soft delete">Soft Delete</MenuItem>
                <MenuItem value="hard delete">Hard Delete</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Can Restore</InputLabel>
              <Select value="all" label="Can Restore" onChange={() => {}}>
                <MenuItem value="all">All Products</MenuItem>
                <MenuItem value="yes">Can Restore</MenuItem>
                <MenuItem value="no">Cannot Restore</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {sortedData.length} products found
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Enhanced Content Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
            Deleted Products
          </Typography>
          {selectedItems.length > 0 && (
            <Fade in={selectedItems.length > 0}>
              <Box sx={{ mr: 2, display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  startIcon={<RestoreIcon />}
                  onClick={() => handleBulkAction('Restore')}
                >
                  Restore ({selectedItems.length})
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => handleBulkAction('Permanent Delete')}
                >
                  Delete Forever ({selectedItems.length})
                </Button>
              </Box>
            </Fade>
          )}
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 3 }}>
            <LinearProgress sx={{ mb: 2 }} />
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} height={80} sx={{ mb: 2, borderRadius: 1 }} />
            ))}
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <DeleteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No deleted products found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Deleted products will appear here for management and restoration
            </Typography>
          </Box>
        ) : (
          <>
            <Table>
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
                      Product Details
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Deletion Info</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'price'}
                      direction={sortBy === 'price' ? sortOrder : 'asc'}
                      onClick={() => handleSort('price')}
                    >
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'deletedDate'}
                      direction={sortBy === 'deletedDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('deletedDate')}
                    >
                      Deleted Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow
                      key={item.id}
                      hover
                      sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 40, height: 40, bgcolor: 'error.light' }}>
                            <DeleteIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              SKU: {item.sku} • {item.category}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                              {item.tags.slice(0, 2).map((tag, index) => (
                                <Chip key={index} label={tag} size="small" variant="outlined" />
                              ))}
                              {item.tags.length > 2 && (
                                <Chip
                                  label={`+${item.tags.length - 2}`}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Chip
                            label={item.deletionType}
                            size="small"
                            color={getDeletionTypeColor(item.deletionType)}
                            icon={<DeleteIcon />}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item.reason}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            by {item.deletedBy}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'error.main' }}>
                            0 units
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            (was {item.originalStock})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.deletedDate}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography
                            variant="body2"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <VisibilityIcon fontSize="small" />
                            {item.views.toLocaleString()}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                          >
                            <TrendingUpIcon fontSize="small" />
                            {item.clicks}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <Tooltip title="View Details" arrow>
                            <IconButton size="small" color="primary">
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          {item.canRestore && (
                            <Tooltip title="Restore Product" arrow>
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleRestore(item)}
                              >
                                <RestoreIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="More Actions" arrow>
                            <IconButton size="small" onClick={(e) => handleMenuClick(e, item)}>
                              <MoreVertIcon />
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
              sx={{ borderTop: 1, borderColor: 'divider' }}
            />
          </>
        )}
      </Paper>

      {/* Restore Dialog */}
      <Dialog
        open={openRestoreDialog}
        onClose={() => setOpenRestoreDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'success.main' }}>
              <RestoreIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Restore Product</Typography>
              <Typography variant="body2" color="text.secondary">
                Restore this product to your catalog
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                This will restore the product to your main catalog. All product data, pricing, and
                inventory will be restored.
              </Alert>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Restore Reason"
                placeholder="Why are you restoring this product?"
                multiline
                rows={3}
                helperText="Optional reason for restoring this product"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Restore to Category</InputLabel>
                <Select label="Restore to Category">
                  <MenuItem value="smartphones">Smartphones</MenuItem>
                  <MenuItem value="laptops">Laptops</MenuItem>
                  <MenuItem value="audio">Audio</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status">
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2}>
                <FormControlLabel control={<Switch defaultChecked />} label="Restore Inventory" />
                <FormControlLabel control={<Switch defaultChecked />} label="Restore Pricing" />
                <FormControlLabel control={<Switch defaultChecked />} label="Restore Images" />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenRestoreDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <LinearProgress size={20} /> : <RestoreIcon />}
          >
            {loading ? 'Restoring...' : 'Restore Product'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permanent Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'error.main' }}>
              <DeleteForeverIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Permanent Delete</Typography>
              <Typography variant="body2" color="text.secondary">
                This action cannot be undone
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Warning: Permanent Deletion
            </Typography>
            <Typography variant="body2">
              This will permanently delete the product and all associated data. This action cannot
              be undone.
            </Typography>
          </Alert>
          <TextField
            fullWidth
            label="Confirmation"
            placeholder="Type 'DELETE' to confirm"
            helperText="Type DELETE to confirm permanent deletion"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <LinearProgress size={20} /> : <DeleteForeverIcon />}
          >
            {loading ? 'Deleting...' : 'Delete Forever'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        {selectedItem?.canRestore && (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <RestoreIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Restore Product</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View History</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete Forever</ListItemText>
        </MenuItem>
      </Menu>

      {/* Enhanced Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeletedProducts;
