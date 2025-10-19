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
  ColorLens as ColorLensIcon,
  Straighten as SizeIcon,
  Memory as MemoryIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  AttachMoney as PriceIcon,
  ShoppingCart as CartIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const VariantsManager = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Enhanced mock data with product variants
  const variantsData = [
    {
      id: 1,
      name: 'iPhone 15 Pro - Space Black - 128GB',
      productName: 'iPhone 15 Pro',
      sku: 'IPH15P-SB-128',
      status: 'Active',
      lastModified: '2024-01-15',
      author: 'Admin',
      priority: 'High',
      views: 1250,
      clicks: 89,
      price: 999.99,
      stock: 45,
      attributes: {
        color: 'Space Black',
        storage: '128GB',
        size: '6.1"',
      },
      images: 3,
      featured: true,
      position: 1,
      description: 'Latest iPhone with advanced camera system',
      tags: ['smartphone', 'apple', 'premium'],
    },
    {
      id: 2,
      name: 'iPhone 15 Pro - Natural Titanium - 256GB',
      productName: 'iPhone 15 Pro',
      sku: 'IPH15P-NT-256',
      status: 'Active',
      lastModified: '2024-01-14',
      author: 'Admin',
      priority: 'High',
      views: 890,
      clicks: 67,
      price: 1099.99,
      stock: 32,
      attributes: {
        color: 'Natural Titanium',
        storage: '256GB',
        size: '6.1"',
      },
      images: 3,
      featured: true,
      position: 2,
      description: 'Latest iPhone with advanced camera system',
      tags: ['smartphone', 'apple', 'premium'],
    },
    {
      id: 3,
      name: 'Samsung Galaxy S24 - Phantom Black - 128GB',
      productName: 'Samsung Galaxy S24',
      sku: 'SGS24-PB-128',
      status: 'Draft',
      lastModified: '2024-01-13',
      author: 'Editor',
      priority: 'Medium',
      views: 0,
      clicks: 0,
      price: 799.99,
      stock: 0,
      attributes: {
        color: 'Phantom Black',
        storage: '128GB',
        size: '6.2"',
      },
      images: 2,
      featured: false,
      position: 3,
      description: 'Samsung flagship smartphone with AI features',
      tags: ['smartphone', 'samsung', 'android'],
    },
    {
      id: 4,
      name: 'MacBook Air M3 - Midnight - 8GB/256GB',
      productName: 'MacBook Air M3',
      sku: 'MBA-M3-MD-8-256',
      status: 'Active',
      lastModified: '2024-01-12',
      author: 'Admin',
      priority: 'High',
      views: 650,
      clicks: 23,
      price: 1199.99,
      stock: 12,
      attributes: {
        color: 'Midnight',
        memory: '8GB',
        storage: '256GB',
        size: '13"',
      },
      images: 4,
      featured: true,
      position: 4,
      description: 'Ultra-thin laptop with M3 chip',
      tags: ['laptop', 'apple', 'macbook'],
    },
    {
      id: 5,
      name: 'MacBook Air M3 - Starlight - 16GB/512GB',
      productName: 'MacBook Air M3',
      sku: 'MBA-M3-SL-16-512',
      status: 'Scheduled',
      lastModified: '2024-01-11',
      author: 'Editor',
      priority: 'Medium',
      views: 0,
      clicks: 0,
      price: 1499.99,
      stock: 0,
      attributes: {
        color: 'Starlight',
        memory: '16GB',
        storage: '512GB',
        size: '13"',
      },
      images: 4,
      featured: false,
      position: 5,
      description: 'Ultra-thin laptop with M3 chip',
      tags: ['laptop', 'apple', 'macbook'],
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
      setSelectedItems(variantsData.map((item) => item.id));
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

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'Variant updated successfully', severity: 'success' });
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'scheduled':
        return 'info';
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

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'error', text: 'Out of Stock', icon: <WarningIcon /> };
    if (stock < 10) return { color: 'warning', text: 'Low Stock', icon: <WarningIcon /> };
    return { color: 'success', text: 'In Stock', icon: <CheckCircleIcon /> };
  };

  const filteredData = variantsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(item.attributes).some((attr) =>
        attr.toLowerCase().includes(searchTerm.toLowerCase()),
      );
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

  const renderAttributes = (attributes) => {
    return Object.entries(attributes).map(([key, value]) => (
      <Chip
        key={key}
        label={`${key}: ${value}`}
        size="small"
        variant="outlined"
        sx={{ mr: 0.5, mb: 0.5 }}
      />
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Enhanced Header with Stats */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Product Variants Manager
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Manage product variants, attributes, pricing, and inventory across all products
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
              <Typography color="text.primary">Variants Manager</Typography>
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
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              Add Variant
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: 2 }}>
                    <InventoryIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {variantsData.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Total Variants
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
                  'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%)',
                border: '1px solid rgba(46, 125, 50, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(46, 125, 50, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, mr: 2 }}>
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {variantsData.filter((item) => item.status === 'Active').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Active Variants
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
                    <WarningIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {variantsData.filter((item) => item.stock < 10).length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Low Stock
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
                    <PriceIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  ${variantsData.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Total Value
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
              placeholder="Search variants, SKUs, or attributes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Stock Status</InputLabel>
              <Select value="all" label="Stock Status" onChange={() => {}}>
                <MenuItem value="all">All Stock</MenuItem>
                <MenuItem value="in-stock">In Stock</MenuItem>
                <MenuItem value="low-stock">Low Stock</MenuItem>
                <MenuItem value="out-of-stock">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {sortedData.length} variants found
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Enhanced Content Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
            Product Variants
          </Typography>
          {selectedItems.length > 0 && (
            <Fade in={selectedItems.length > 0}>
              <Box sx={{ mr: 2, display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PublicIcon />}
                  onClick={() => handleBulkAction('Activate')}
                >
                  Activate ({selectedItems.length})
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleBulkAction('Delete')}
                >
                  Delete ({selectedItems.length})
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
            <InventoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No product variants found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first product variant to get started
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              Add First Variant
            </Button>
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
                      Variant Details
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Attributes</TableCell>
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
                      active={sortBy === 'status'}
                      direction={sortBy === 'status' ? sortOrder : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'lastModified'}
                      direction={sortBy === 'lastModified' ? sortOrder : 'asc'}
                      onClick={() => handleSort('lastModified')}
                    >
                      Last Modified
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    const stockStatus = getStockStatus(item.stock);
                    return (
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
                            <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}>
                              <InventoryIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {item.productName} • SKU: {item.sku}
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
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {renderAttributes(item.attributes)}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                            ${item.price.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={stockStatus.text}
                              size="small"
                              color={stockStatus.color}
                              icon={stockStatus.icon}
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({item.stock})
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            color={getStatusColor(item.status)}
                            icon={
                              item.status === 'Active' ? (
                                <PublicIcon />
                              ) : item.status === 'Draft' ? (
                                <LockIcon />
                              ) : item.status === 'Scheduled' ? (
                                <ScheduleIcon />
                              ) : (
                                <VisibilityIcon />
                              )
                            }
                          />
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
                        <TableCell>
                          <Typography variant="body2">{item.lastModified}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <Tooltip title="View Details" arrow>
                              <IconButton size="small" color="primary">
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Variant" arrow>
                              <IconButton size="small" color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="More Actions" arrow>
                              <IconButton size="small" onClick={(e) => handleMenuClick(e, item)}>
                                <MoreVertIcon />
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
              sx={{ borderTop: 1, borderColor: 'divider' }}
            />
          </>
        )}
      </Paper>

      {/* Enhanced Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AddIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Add Product Variant</Typography>
              <Typography variant="body2" color="text.secondary">
                Create a new variant for an existing product
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
            <Tab label="Basic Info" />
            <Tab label="Attributes" />
            <Tab label="Pricing" />
            <Tab label="Inventory" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Variant Name"
                  placeholder="e.g., iPhone 15 Pro - Space Black - 128GB"
                  helperText="This will be displayed to customers"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Parent Product</InputLabel>
                  <Select label="Parent Product">
                    <MenuItem value="iphone15">iPhone 15 Pro</MenuItem>
                    <MenuItem value="samsung-s24">Samsung Galaxy S24</MenuItem>
                    <MenuItem value="macbook-air">MacBook Air M3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="SKU"
                  placeholder="e.g., IPH15P-SB-128"
                  helperText="Unique identifier for this variant"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  placeholder="Describe this variant..."
                  helperText="Optional description for this specific variant"
                />
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Color</InputLabel>
                  <Select label="Color">
                    <MenuItem value="space-black">Space Black</MenuItem>
                    <MenuItem value="natural-titanium">Natural Titanium</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Storage</InputLabel>
                  <Select label="Storage">
                    <MenuItem value="128gb">128GB</MenuItem>
                    <MenuItem value="256gb">256GB</MenuItem>
                    <MenuItem value="512gb">512GB</MenuItem>
                    <MenuItem value="1tb">1TB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Memory</InputLabel>
                  <Select label="Memory">
                    <MenuItem value="8gb">8GB</MenuItem>
                    <MenuItem value="16gb">16GB</MenuItem>
                    <MenuItem value="32gb">32GB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Select label="Size">
                    <MenuItem value="13-inch">13"</MenuItem>
                    <MenuItem value="15-inch">15"</MenuItem>
                    <MenuItem value="6.1-inch">6.1"</MenuItem>
                    <MenuItem value="6.2-inch">6.2"</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  placeholder="999.99"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Compare at Price"
                  placeholder="1199.99"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Cost Price"
                  placeholder="600.00"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Tax Class</InputLabel>
                  <Select label="Tax Class">
                    <MenuItem value="standard">Standard Tax</MenuItem>
                    <MenuItem value="reduced">Reduced Tax</MenuItem>
                    <MenuItem value="exempt">Tax Exempt</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="number" label="Stock Quantity" placeholder="100" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="number" label="Low Stock Threshold" placeholder="10" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Track Inventory</InputLabel>
                  <Select label="Track Inventory">
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Allow Backorders</InputLabel>
                  <Select label="Allow Backorders">
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="notify">Notify Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button variant="outlined" startIcon={<SaveIcon />} onClick={() => handleSave()}>
            Save Draft
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <LinearProgress size={20} /> : <PublicIcon />}
          >
            {loading ? 'Saving...' : 'Save & Activate'}
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
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Variant</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
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

export default VariantsManager;
