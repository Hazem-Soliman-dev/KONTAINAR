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
  AccountBalanceWallet as AccountBalanceWalletIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

const LoyaltyWallets = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('walletId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const walletsData = [
    {
      id: 1,
      walletId: 'WALLET-001',
      customerName: 'أحمد محمد',
      tier: 'gold',
      points: 1500,
      balance: 150.0,
      status: 'active',
      lastActivity: '2024-01-15',
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      walletId: 'WALLET-002',
      customerName: 'Jane Smith',
      tier: 'silver',
      points: 850,
      balance: 85.0,
      status: 'active',
      lastActivity: '2024-01-10',
      lastUpdated: '2024-01-10',
    },
    {
      id: 3,
      walletId: 'WALLET-003',
      customerName: 'Bob Johnson',
      tier: 'bronze',
      points: 320,
      balance: 32.0,
      status: 'inactive',
      lastActivity: '2023-12-20',
      lastUpdated: '2023-12-20',
    },
  ];

  const walletStats = [
    {
      title: 'Total Wallets',
      value: walletsData.length.toString(),
      color: 'primary',
      icon: AccountBalanceWalletIcon,
      change: '+20%',
    },
    {
      title: 'Active Wallets',
      value: walletsData.filter((w) => w.status === 'active').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '2 active',
    },
    {
      title: 'Total Points',
      value: walletsData.reduce((sum, w) => sum + w.points, 0).toString(),
      color: 'info',
      icon: TrendingUpIcon,
      change: '2670 pts',
    },
    {
      title: 'Total Balance',
      value: '$' + walletsData.reduce((sum, w) => sum + w.balance, 0).toFixed(2),
      color: 'warning',
      icon: AttachMoneyIcon,
      change: '$267.00',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'Wallets refreshed successfully', severity: 'success' });
    }, 1000);
  };
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(walletsData.map((w) => w.id));
    } else {
      setSelectedItems([]);
    }
  };
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  const handleView = (wallet) => {
    setSelectedWallet(wallet);
    setViewDrawer(true);
  };
  const handleEdit = (wallet) => {
    setSelectedWallet(wallet);
    setOpenDialog(true);
  };
  const handleDelete = (wallet) => {
    setSnackbar({
      open: true,
      message: `Wallet ${wallet.walletId} deleted successfully`,
      severity: 'success',
    });
  };
  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = walletsData.filter((wallet) => {
    const matchesSearch =
      wallet.walletId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wallet.status === statusFilter;
    const matchesTier = tierFilter === 'all' || wallet.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
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
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };
  const getTierColor = (tier) => {
    switch (tier) {
      case 'gold':
        return 'warning';
      case 'silver':
        return 'default';
      case 'bronze':
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
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Loyalty Wallets Management
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Manage customer loyalty wallets and points
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
              <Link color="inherit" href="/main-store/pricing">
                Pricing
              </Link>
              <Link color="inherit" href="/main-store/pricing/loyalty">
                Loyalty Wallets
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
              Add Wallet
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {walletStats.map((stat, index) => {
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
              setTierFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Search Wallets"
              size="small"
              placeholder="Search by wallet ID or customer..."
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
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Tier</InputLabel>
              <Select
                label="Tier"
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
              >
                <MenuItem value="all">All Tiers</MenuItem>
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="silver">Silver</MenuItem>
                <MenuItem value="bronze">Bronze</MenuItem>
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

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading && <LinearProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < walletsData.length
                  }
                  checked={walletsData.length > 0 && selectedItems.length === walletsData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'walletId'}
                  direction={sortBy === 'walletId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('walletId')}
                >
                  Wallet ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Tier</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                Last Activity
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((wallet) => (
                <TableRow key={wallet.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(wallet.id)}
                      onChange={() => handleSelectItem(wallet.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {wallet.walletId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{wallet.customerName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={wallet.tier} color={getTierColor(wallet.tier)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{wallet.points}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">${wallet.balance.toFixed(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={wallet.status}
                      color={getStatusColor(wallet.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {wallet.lastActivity}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View Details" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(wallet)}
                          aria-label="view wallet"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Wallet" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(wallet)}
                          aria-label="edit wallet"
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Wallet" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(wallet)}
                          aria-label="delete wallet"
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedWallet ? 'Edit Wallet' : 'Add New Wallet'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Wallet ID"
                value={selectedWallet?.walletId || ''}
                size="small"
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Customer Name"
                value={selectedWallet?.customerName || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Tier</InputLabel>
                <Select value={selectedWallet?.tier || 'bronze'} label="Tier">
                  <MenuItem value="gold">Gold</MenuItem>
                  <MenuItem value="silver">Silver</MenuItem>
                  <MenuItem value="bronze">Bronze</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Points"
                type="number"
                value={selectedWallet?.points || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Balance"
                type="number"
                value={selectedWallet?.balance || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select value={selectedWallet?.status || 'active'} label="Status">
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
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
                message: 'Wallet saved successfully',
                severity: 'success',
              });
              setOpenDialog(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={viewDrawer} onClose={() => setViewDrawer(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Wallet Details</DialogTitle>
        <DialogContent>
          {selectedWallet && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Wallet ID
                </Typography>
                <Typography variant="body1">{selectedWallet.walletId}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Customer
                </Typography>
                <Typography variant="body1">{selectedWallet.customerName}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tier
                </Typography>
                <Chip
                  label={selectedWallet.tier}
                  color={getTierColor(selectedWallet.tier)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Points
                </Typography>
                <Typography variant="body1">{selectedWallet.points}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Balance
                </Typography>
                <Typography variant="body1">${selectedWallet.balance.toFixed(2)}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedWallet.status}
                  color={getStatusColor(selectedWallet.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Activity
                </Typography>
                <Typography variant="body1">{selectedWallet.lastActivity}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>Close</Button>
        </DialogActions>
      </Dialog>

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

export default LoyaltyWallets;
