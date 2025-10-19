import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  Stack,
  LinearProgress,
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline,
  Search as SearchIcon,
  AssignmentReturn as AssignmentReturnIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

const ReturnsRMA = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('rmaId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for returns
  const returnsData = [
    {
      id: 1,
      rmaId: 'RMA-001',
      orderNo: 'ORD-12345',
      customer: 'أحمد محمد',
      productName: 'سماعات لاسلكية',
      reason: 'معيب',
      status: 'معلق',
      refundAmount: 99.99,
      requestDate: '2024-01-15',
      resolvedDate: null,
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      rmaId: 'RMA-002',
      orderNo: 'ORD-12346',
      customer: 'فاطمة علي',
      productName: 'ساعة ذكية',
      reason: 'عنصر خاطئ',
      status: 'موافق عليه',
      refundAmount: 149.99,
      requestDate: '2024-01-10',
      resolvedDate: '2024-01-12',
      lastUpdated: '2024-01-12',
    },
    {
      id: 3,
      rmaId: 'RMA-003',
      orderNo: 'ORD-12347',
      customer: 'Bob Johnson',
      productName: 'Bluetooth Speaker',
      reason: 'not-as-described',
      status: 'rejected',
      refundAmount: 0,
      requestDate: '2024-01-08',
      resolvedDate: '2024-01-09',
      lastUpdated: '2024-01-09',
    },
  ];

  // Stats data
  const returnStats = [
    {
      title: 'Total Returns',
      value: returnsData.length.toString(),
      color: 'primary',
      icon: AssignmentReturnIcon,
      change: '+8%',
    },
    {
      title: 'Pending',
      value: returnsData.filter((r) => r.status === 'pending').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '1 pending',
    },
    {
      title: 'Approved',
      value: returnsData.filter((r) => r.status === 'approved').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '65%',
    },
    {
      title: 'Total Refunds',
      value:
        '$' +
        returnsData
          .filter((r) => r.status === 'approved')
          .reduce((sum, r) => sum + r.refundAmount, 0)
          .toFixed(2),
      color: 'info',
      icon: AttachMoneyIcon,
      change: '1 refund',
    },
  ];

  // Handler functions
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'Returns refreshed successfully', severity: 'success' });
    }, 1000);
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
      setSelectedItems(returnsData.map((rma) => rma.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (rmaId) => {
    if (selectedItems.includes(rmaId)) {
      setSelectedItems(selectedItems.filter((id) => id !== rmaId));
    } else {
      setSelectedItems([...selectedItems, rmaId]);
    }
  };

  const handleView = (returnItem) => {
    setSelectedReturn(returnItem);
    setViewDrawer(true);
  };

  const handleEdit = (returnItem) => {
    setSelectedReturn(returnItem);
    setOpenDialog(true);
  };

  const handleDelete = (returnItem) => {
    setSnackbar({
      open: true,
      message: `Return ${returnItem.rmaId} deleted successfully`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = returnsData.filter((returnItem) => {
    const matchesSearch =
      returnItem.rmaId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || returnItem.status === statusFilter;
    const matchesReason = reasonFilter === 'all' || returnItem.reason === reasonFilter;
    return matchesSearch && matchesStatus && matchesReason;
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'processing':
        return 'info';
      default:
        return 'default';
    }
  };

  const getReasonLabel = (reason) => {
    switch (reason) {
      case 'defective':
        return 'Defective';
      case 'wrong-item':
        return 'Wrong Item';
      case 'not-as-described':
        return 'Not As Described';
      case 'changed-mind':
        return 'Changed Mind';
      default:
        return reason;
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Enhanced Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Returns & RMA Management
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Manage customer returns and RMA requests
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
              <Link color="inherit" href="/main-store/orders">
                Orders
              </Link>
              <Link color="inherit" href="/main-store/orders/returns">
                Returns RMA
              </Link>
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
              Add Return
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {returnStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const color = stat.color;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette[color].main,
                      0.08,
                    )} 0%, ${alpha(theme.palette[color].main, 0.04)} 100%)`,
                    border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${alpha(theme.palette[color].main, 0.15)}`,
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: alpha(theme.palette[color].main, 0.1),
                        color: theme.palette[color].main,
                      }}
                    >
                      <IconComponent />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 600, color: theme.palette[color].main, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette[color].main }}>
                      {stat.change}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Enhanced Filters & Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters & Search
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setReasonFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Search Returns"
              size="small"
              placeholder="Search by RMA ID, order, or customer..."
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
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Reason</InputLabel>
              <Select
                label="Reason"
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
              >
                <MenuItem value="all">All Reasons</MenuItem>
                <MenuItem value="defective">Defective</MenuItem>
                <MenuItem value="wrong-item">Wrong Item</MenuItem>
                <MenuItem value="not-as-described">Not As Described</MenuItem>
                <MenuItem value="changed-mind">Changed Mind</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} results found
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Enhanced Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading && <LinearProgress />}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < returnsData.length
                  }
                  checked={returnsData.length > 0 && selectedItems.length === returnsData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'rmaId'}
                  direction={sortBy === 'rmaId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('rmaId')}
                >
                  RMA ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Order No</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Product</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                Refund Amount
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Request Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((returnItem) => (
                <TableRow key={returnItem.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(returnItem.id)}
                      onChange={() => handleSelectItem(returnItem.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {returnItem.rmaId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{returnItem.orderNo}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{returnItem.customer}</Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {returnItem.productName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getReasonLabel(returnItem.reason)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={returnItem.status}
                      color={getStatusColor(returnItem.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${returnItem.refundAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {returnItem.requestDate}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View Details" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(returnItem)}
                          aria-label="view return"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Return" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(returnItem)}
                          aria-label="edit return"
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Return" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(returnItem)}
                          aria-label="delete return"
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
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
        <DialogTitle>{selectedReturn ? 'Edit Return' : 'Add New Return'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="RMA ID"
                value={selectedReturn?.rmaId || ''}
                size="small"
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Order Number"
                value={selectedReturn?.orderNo || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Customer"
                value={selectedReturn?.customer || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Product Name"
                value={selectedReturn?.productName || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Reason</InputLabel>
                <Select value={selectedReturn?.reason || 'defective'} label="Reason">
                  <MenuItem value="defective">Defective</MenuItem>
                  <MenuItem value="wrong-item">Wrong Item</MenuItem>
                  <MenuItem value="not-as-described">Not As Described</MenuItem>
                  <MenuItem value="changed-mind">Changed Mind</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select value={selectedReturn?.status || 'pending'} label="Status">
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Refund Amount"
                type="number"
                value={selectedReturn?.refundAmount || ''}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setSnackbar({
                open: true,
                message: 'Return saved successfully',
                severity: 'success',
              });
              setOpenDialog(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDrawer} onClose={() => setViewDrawer(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Return Details</DialogTitle>
        <DialogContent>
          {selectedReturn && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  RMA ID
                </Typography>
                <Typography variant="body1">{selectedReturn.rmaId}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="body1">{selectedReturn.orderNo}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Customer
                </Typography>
                <Typography variant="body1">{selectedReturn.customer}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Product
                </Typography>
                <Typography variant="body1">{selectedReturn.productName}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Reason
                </Typography>
                <Chip
                  label={getReasonLabel(selectedReturn.reason)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedReturn.status}
                  color={getStatusColor(selectedReturn.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Refund Amount
                </Typography>
                <Typography variant="body1">${selectedReturn.refundAmount.toFixed(2)}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Request Date
                </Typography>
                <Typography variant="body1">{selectedReturn.requestDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Resolved Date
                </Typography>
                <Typography variant="body1">{selectedReturn.resolvedDate || 'N/A'}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReturnsRMA;
