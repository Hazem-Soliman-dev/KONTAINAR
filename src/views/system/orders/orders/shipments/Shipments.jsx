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
  LocalShipping as LocalShippingIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';

const Shipments = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [carrierFilter, setCarrierFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('shipmentId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for shipments
  const shipmentsData = [
    {
      id: 1,
      shipmentId: 'SHP-001',
      orderNo: 'ORD-12345',
      customer: 'John Doe',
      carrier: 'DHL Express',
      trackingNo: 'DHL123456789',
      status: 'in-transit',
      origin: 'New York, USA',
      destination: 'London, UK',
      shippedDate: '2024-01-15',
      estimatedDelivery: '2024-01-20',
      lastUpdated: '2024-01-17',
    },
    {
      id: 2,
      shipmentId: 'SHP-002',
      orderNo: 'ORD-12346',
      customer: 'Jane Smith',
      carrier: 'FedEx',
      trackingNo: 'FDX987654321',
      status: 'delivered',
      origin: 'Los Angeles, USA',
      destination: 'Paris, France',
      shippedDate: '2024-01-10',
      estimatedDelivery: '2024-01-15',
      lastUpdated: '2024-01-15',
    },
    {
      id: 3,
      shipmentId: 'SHP-003',
      orderNo: 'ORD-12347',
      customer: 'Bob Johnson',
      carrier: 'UPS',
      trackingNo: 'UPS456789123',
      status: 'pending',
      origin: 'Chicago, USA',
      destination: 'Berlin, Germany',
      shippedDate: null,
      estimatedDelivery: '2024-01-25',
      lastUpdated: '2024-01-16',
    },
  ];

  // Stats data
  const shipmentStats = [
    {
      title: 'Total Shipments',
      value: shipmentsData.length.toString(),
      color: 'primary',
      icon: LocalShippingIcon,
      change: '+15%',
    },
    {
      title: 'In Transit',
      value: shipmentsData.filter((s) => s.status === 'in-transit').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '1 active',
    },
    {
      title: 'Delivered',
      value: shipmentsData.filter((s) => s.status === 'delivered').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '85%',
    },
    {
      title: 'Pending',
      value: shipmentsData.filter((s) => s.status === 'pending').length.toString(),
      color: 'info',
      icon: InventoryIcon,
      change: '1 pending',
    },
  ];

  // Handler functions
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'Shipments refreshed successfully', severity: 'success' });
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
      setSelectedItems(shipmentsData.map((shipment) => shipment.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (shipmentId) => {
    if (selectedItems.includes(shipmentId)) {
      setSelectedItems(selectedItems.filter((id) => id !== shipmentId));
    } else {
      setSelectedItems([...selectedItems, shipmentId]);
    }
  };

  const handleView = (shipment) => {
    setSelectedShipment(shipment);
    setViewDrawer(true);
  };

  const handleEdit = (shipment) => {
    setSelectedShipment(shipment);
    setOpenDialog(true);
  };

  const handleDelete = (shipment) => {
    setSnackbar({
      open: true,
      message: `Shipment ${shipment.shipmentId} deleted successfully`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = shipmentsData.filter((shipment) => {
    const matchesSearch =
      shipment.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    const matchesCarrier = carrierFilter === 'all' || shipment.carrier === carrierFilter;
    return matchesSearch && matchesStatus && matchesCarrier;
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
      case 'delivered':
        return 'success';
      case 'in-transit':
        return 'warning';
      case 'pending':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
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
              Shipments Management
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Manage your store's shipments, tracking, and delivery
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
              <Link color="inherit" href="/main-store/orders/shipments">
                Shipments
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
              Add Shipment
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {shipmentStats.map((stat, index) => {
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
              setCarrierFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Search Shipments"
              size="small"
              placeholder="Search by shipment ID, tracking, or customer..."
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
                <MenuItem value="in-transit">In Transit</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Carrier</InputLabel>
              <Select
                label="Carrier"
                value={carrierFilter}
                onChange={(e) => setCarrierFilter(e.target.value)}
              >
                <MenuItem value="all">All Carriers</MenuItem>
                <MenuItem value="DHL Express">DHL Express</MenuItem>
                <MenuItem value="FedEx">FedEx</MenuItem>
                <MenuItem value="UPS">UPS</MenuItem>
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
                    selectedItems.length > 0 && selectedItems.length < shipmentsData.length
                  }
                  checked={
                    shipmentsData.length > 0 && selectedItems.length === shipmentsData.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'shipmentId'}
                  direction={sortBy === 'shipmentId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('shipmentId')}
                >
                  Shipment ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Order No</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Carrier</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Tracking No</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Shipped Date</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                Est. Delivery
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((shipment) => (
                <TableRow key={shipment.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(shipment.id)}
                      onChange={() => handleSelectItem(shipment.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {shipment.shipmentId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{shipment.orderNo}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{shipment.customer}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{shipment.carrier}</Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {shipment.trackingNo}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={shipment.status}
                      color={getStatusColor(shipment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {shipment.shippedDate || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {shipment.estimatedDelivery}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View Details" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(shipment)}
                          aria-label="view shipment"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Shipment" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(shipment)}
                          aria-label="edit shipment"
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Shipment" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(shipment)}
                          aria-label="delete shipment"
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
        <DialogTitle>{selectedShipment ? 'Edit Shipment' : 'Add New Shipment'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Shipment ID"
                value={selectedShipment?.shipmentId || ''}
                size="small"
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Order Number"
                value={selectedShipment?.orderNo || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Customer"
                value={selectedShipment?.customer || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Carrier</InputLabel>
                <Select value={selectedShipment?.carrier || 'DHL Express'} label="Carrier">
                  <MenuItem value="DHL Express">DHL Express</MenuItem>
                  <MenuItem value="FedEx">FedEx</MenuItem>
                  <MenuItem value="UPS">UPS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Tracking Number"
                value={selectedShipment?.trackingNo || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select value={selectedShipment?.status || 'pending'} label="Status">
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-transit">In Transit</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
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
                message: 'Shipment saved successfully',
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
        <DialogTitle>Shipment Details</DialogTitle>
        <DialogContent>
          {selectedShipment && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Shipment ID
                </Typography>
                <Typography variant="body1">{selectedShipment.shipmentId}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="body1">{selectedShipment.orderNo}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Customer
                </Typography>
                <Typography variant="body1">{selectedShipment.customer}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Carrier
                </Typography>
                <Typography variant="body1">{selectedShipment.carrier}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tracking Number
                </Typography>
                <Typography variant="body1">{selectedShipment.trackingNo}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedShipment.status}
                  color={getStatusColor(selectedShipment.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Origin
                </Typography>
                <Typography variant="body1">{selectedShipment.origin}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Destination
                </Typography>
                <Typography variant="body1">{selectedShipment.destination}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Shipped Date
                </Typography>
                <Typography variant="body1">{selectedShipment.shippedDate || 'N/A'}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Estimated Delivery
                </Typography>
                <Typography variant="body1">{selectedShipment.estimatedDelivery}</Typography>
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

export default Shipments;
