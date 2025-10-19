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
  Checkbox,
  TableSortLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Drawer,
  Menu,
  ListItemButton,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
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
  ShoppingCart as ShoppingCartIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreVertIcon,
  CheckCircleOutline as CheckIcon,
  BlockOutlined as CloseIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';

const OrdersUnfulfilled = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewDrawer, setViewDrawer] = useState(false);

  // Mock data for order stats
  const orderStats = [
    { title: 'New', value: '24', change: '+3', color: 'primary', icon: ShoppingCartIcon },
    { title: 'Picking', value: '18', change: '+5', color: 'warning', icon: ScheduleIcon },
    { title: 'Packed', value: '12', change: '+2', color: 'info', icon: CheckIcon },
    { title: 'Aging > 24h', value: '8', change: '+1', color: 'error', icon: CloseIcon },
  ];

  // Mock data - more comprehensive
  const unfulfilledOrdersData = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0123',
      items: 3,
      total: 299.99,
      status: 'New',
      orderDate: '2024-01-15',
      priority: 'High',
      shippingAddress: '123 Main St, City, State 12345',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      itemsList: [
        { name: 'Wireless Headphones', qty: 1, price: 99.99 },
        { name: 'Smart Watch', qty: 1, price: 199.99 },
        { name: 'Phone Case', qty: 1, price: 29.99 },
      ],
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1-555-0124',
      items: 1,
      total: 99.99,
      status: 'Processing',
      orderDate: '2024-01-14',
      priority: 'Medium',
      shippingAddress: '456 Oak Ave, City, State 12346',
      paymentMethod: 'PayPal',
      paymentStatus: 'Paid',
      itemsList: [{ name: 'Coffee Maker', qty: 1, price: 99.99 }],
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1-555-0125',
      items: 2,
      total: 149.99,
      status: 'Ready to Ship',
      orderDate: '2024-01-13',
      priority: 'Low',
      shippingAddress: '789 Pine St, City, State 12347',
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'Paid',
      itemsList: [
        { name: 'Gaming Keyboard', qty: 1, price: 129.99 },
        { name: 'Mouse Pad', qty: 1, price: 19.99 },
      ],
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      phone: '+1-555-0126',
      items: 1,
      total: 49.99,
      status: 'New',
      orderDate: '2024-01-12',
      priority: 'High',
      shippingAddress: '321 Elm St, City, State 12348',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Pending',
      itemsList: [{ name: 'Wireless Charger', qty: 1, price: 49.99 }],
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      customer: 'Charlie Wilson',
      email: 'charlie@example.com',
      phone: '+1-555-0127',
      items: 4,
      total: 399.99,
      status: 'Processing',
      orderDate: '2024-01-11',
      priority: 'Medium',
      shippingAddress: '654 Maple Ave, City, State 12349',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      itemsList: [
        { name: 'Laptop Stand', qty: 1, price: 79.99 },
        { name: 'USB Hub', qty: 1, price: 29.99 },
        { name: 'HDMI Cable', qty: 2, price: 19.99 },
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading
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
    notify(`${action} Orders`, `${selectedItems.length} طلب`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewDrawer(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('Update Order', selectedOrder ? 'تم تحديث الطلب' : 'تم إنشاء الطلب');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('Delete Order', 'تم حذف الطلب');
    }, 1000);
  };

  const handleExport = () => {
    notify('Export Orders', 'تم تصدير البيانات');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('Data refreshed successfully', 'تم تحديث البيانات بنجاح');
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'error';
      case 'Processing':
        return 'warning';
      case 'Ready to Ship':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredData = unfulfilledOrdersData.filter((item) => {
    const matchesSearch =
      item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority =
      priorityFilter === 'all' || item.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPriority;
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
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
          Unfulfilled Orders
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Manage and track unfulfilled orders to ensure timely delivery
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="/main-store">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Main Store
          </Link>
          <Link color="inherit" href="/main-store/orders">
            Orders
          </Link>
          <Typography color="text.primary">Unfulfilled Orders</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              Refresh
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              Add Order
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {orderStats.map((stat, index) => (
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
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters & Search
          </Typography>
          <Button variant="outlined" size="small">
            Clear Filters
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search orders..."
              variant="outlined"
              size="small"
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
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="picking">Picking</MenuItem>
                <MenuItem value="packed">Packed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter}
                label="Priority"
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
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
              {filteredData.length} orders found
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
              {selectedItems.length} selected
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleBulkAction('fulfill')}
              sx={{ mr: 1 }}
            >
              Fulfill
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleBulkAction('export')}
              sx={{ mr: 1 }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleBulkAction('cancel')}
            >
              Cancel
            </Button>
          </Toolbar>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < unfulfilledOrdersData.length
                  }
                  checked={
                    unfulfilledOrdersData.length > 0 &&
                    selectedItems.length === unfulfilledOrdersData.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Order #</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Order Date</TableCell>
              <TableCell>Actions</TableCell>
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
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Alert severity="info">No orders found</Alert>
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(order.id)}
                        onChange={() => handleSelectItem(order.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {order.orderNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {order.customer}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.items}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        ${order.total}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        color={
                          order.status === 'New'
                            ? 'primary'
                            : order.status === 'Processing'
                            ? 'warning'
                            : 'info'
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.priority}
                        size="small"
                        color={getPriorityColor(order.priority)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" color="text.secondary">
                        {order.orderDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleView(order)}
                            aria-label="view order"
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Order">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(order)}
                            aria-label="edit order"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Order">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(order)}
                            aria-label="delete order"
                            color="error"
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Order Number"
                value={selectedOrder?.orderNumber || ''}
                variant="outlined"
                helperText="Order number"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Customer"
                value={selectedOrder?.customer || ''}
                variant="outlined"
                helperText="Customer name"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                value={selectedOrder?.email || ''}
                variant="outlined"
                helperText="Customer email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={selectedOrder?.status || 'New'} label="Status">
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Ready to Ship">Ready to Ship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select value={selectedOrder?.priority || 'Medium'} label="Priority">
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete order "{selectedOrder?.orderNumber}"? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Drawer */}
      <Drawer
        anchor="right"
        open={viewDrawer}
        onClose={() => setViewDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Order Details
          </Typography>
          {selectedOrder && (
            <List>
              <ListItem>
                <ListItemText primary="Order Number" secondary={selectedOrder.orderNumber} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Customer" secondary={selectedOrder.customer} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={selectedOrder.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone" secondary={selectedOrder.phone} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Items" secondary={selectedOrder.items} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Total" secondary={`$${selectedOrder.total}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Status" secondary={selectedOrder.status} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Priority" secondary={selectedOrder.priority} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Order Date" secondary={selectedOrder.orderDate} />
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

export default OrdersUnfulfilled;
