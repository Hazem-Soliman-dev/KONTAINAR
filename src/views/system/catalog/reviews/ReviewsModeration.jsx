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
  Divider,
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
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  Rating,
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
  Reviews as ReviewsIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  VisibilityOutlined,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const ReviewsModeration = () => {
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
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Mock data for reviews
  const reviewsData = [
    {
      id: 1,
      sku: 'LAPTOP-001',
      customer: 'John Doe',
      rating: 5,
      comment: 'Excellent laptop, very fast!',
      status: 'pending',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      sku: 'PHONE-002',
      customer: 'Jane Smith',
      rating: 4,
      comment: 'Good phone but battery could be better',
      status: 'approved',
      createdAt: '2024-01-14',
    },
    {
      id: 3,
      sku: 'SHIRT-003',
      customer: 'Bob Johnson',
      rating: 3,
      comment: 'Average quality, fits well',
      status: 'rejected',
      createdAt: '2024-01-13',
    },
    {
      id: 4,
      sku: 'SHOES-004',
      customer: 'Alice Brown',
      rating: 5,
      comment: 'Perfect fit and very comfortable',
      status: 'approved',
      createdAt: '2024-01-12',
    },
    {
      id: 5,
      sku: 'BAG-005',
      customer: 'Charlie Wilson',
      rating: 2,
      comment: 'Poor quality, zipper broke quickly',
      status: 'pending',
      createdAt: '2024-01-11',
    },
  ];

  // Mock data for review stats
  const reviewStats = [
    { title: 'Pending', value: '24', change: '+3', color: 'warning', icon: ScheduleIcon },
    { title: 'Approved Today', value: '18', change: '+5', color: 'success', icon: CheckCircleIcon },
    { title: 'Rejected Today', value: '6', change: '+2', color: 'error', icon: WarningIcon },
    { title: 'Avg Rating', value: '4.2', change: '+0.1', color: 'info', icon: StarIcon },
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
      setSelectedItems(reviewsData.map((item) => item.id));
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
      case 'approve':
        notify(`Approved ${selectedItems.length} reviews`);
        setSelectedItems([]);
        break;
      case 'reject':
        notify(`Rejected ${selectedItems.length} reviews`);
        setSelectedItems([]);
        break;
      case 'export':
        notify(`Exported ${selectedItems.length} reviews`);
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

  const handleView = (review) => {
    setSelectedReview(review);
    setViewDrawer(true);
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setOpenDialog(true);
  };

  const handleDelete = (review) => {
    setSelectedReview(review);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setOpenDialog(false);
    notify('Review updated successfully');
  };

  const handleDeleteConfirm = () => {
    setOpenDeleteDialog(false);
    notify('Review deleted successfully');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('Data refreshed successfully');
    }, 1000);
  };

  const filteredData = reviewsData.filter((item) => {
    const matchesSearch =
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || item.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
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
    title: 'Reviews Moderation',
    content: '',
    isActive: true,
    moderationLevel: 'auto',
    reviewThreshold: 3,
    contactInfo: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Moderation Rules',
      content: 'Configure review moderation rules and approval process.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'Review Filters',
      content: 'Set up filters to automatically moderate reviews.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'Review Approval',
      content: 'Manage review approval workflow and notifications.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'Review Analytics',
      content: 'View review moderation analytics and performance.',
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
          Reviews Moderation
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Moderate and manage customer reviews to maintain quality and trust
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="/main-store">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Main Store
          </Link>
          <Link color="inherit" href="/main-store/catalog">
            Catalog
          </Link>
          <Typography color="text.primary">Reviews Moderation</Typography>
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
              Add Review
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reviewStats.map((stat, index) => (
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
              placeholder="Search reviews..."
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
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Rating</InputLabel>
              <Select
                value={ratingFilter}
                label="Rating"
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <MenuItem value="all">All Ratings</MenuItem>
                <MenuItem value="5">5 Stars</MenuItem>
                <MenuItem value="4">4 Stars</MenuItem>
                <MenuItem value="3">3 Stars</MenuItem>
                <MenuItem value="2">2 Stars</MenuItem>
                <MenuItem value="1">1 Star</MenuItem>
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
              {filteredData.length} reviews found
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
              onClick={() => handleBulkAction('approve')}
              sx={{ mr: 1 }}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleBulkAction('reject')}
              sx={{ mr: 1 }}
            >
              Reject
            </Button>
            <Button variant="outlined" size="small" onClick={() => handleBulkAction('export')}>
              Export
            </Button>
          </Toolbar>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < reviewsData.length
                  }
                  checked={reviewsData.length > 0 && selectedItems.length === reviewsData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Created</TableCell>
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
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Alert severity="info">No reviews found</Alert>
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((review) => (
                  <TableRow key={review.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(review.id)}
                        onChange={() => handleSelectItem(review.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {review.customer}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {review.sku}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Rating value={review.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {review.comment}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={review.status}
                        size="small"
                        color={
                          review.status === 'approved'
                            ? 'success'
                            : review.status === 'rejected'
                            ? 'error'
                            : 'warning'
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" color="text.secondary">
                        {review.createdAt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleView(review)}
                            aria-label="view review"
                          >
                            <VisibilityOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Review">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(review)}
                            aria-label="edit review"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Review">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(review)}
                            aria-label="delete review"
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
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Customer"
                value={selectedReview?.customer || ''}
                variant="outlined"
                helperText="Customer name"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="SKU"
                value={selectedReview?.sku || ''}
                variant="outlined"
                helperText="Product SKU"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Comment"
                multiline
                rows={3}
                value={selectedReview?.comment || ''}
                variant="outlined"
                helperText="Review comment"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Rating</InputLabel>
                <Select value={selectedReview?.rating || 5} label="Rating">
                  <MenuItem value={1}>1 Star</MenuItem>
                  <MenuItem value={2}>2 Stars</MenuItem>
                  <MenuItem value={3}>3 Stars</MenuItem>
                  <MenuItem value={4}>4 Stars</MenuItem>
                  <MenuItem value={5}>5 Stars</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={selectedReview?.status || 'pending'} label="Status">
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
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
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the review by "{selectedReview?.customer}"? This action
            cannot be undone.
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
            Review Details
          </Typography>
          {selectedReview && (
            <List>
              <ListItem>
                <ListItemText primary="Customer" secondary={selectedReview.customer} />
              </ListItem>
              <ListItem>
                <ListItemText primary="SKU" secondary={selectedReview.sku} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Rating"
                  secondary={<Rating value={selectedReview.rating} readOnly />}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Comment" secondary={selectedReview.comment} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Status" secondary={selectedReview.status} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Created" secondary={selectedReview.createdAt} />
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
      {/* Moderation Settings */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Moderation Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Moderation Level</InputLabel>
              <Select
                value={formData.moderationLevel}
                label="Moderation Level"
                onChange={(e) => setFormData({ ...formData, moderationLevel: e.target.value })}
              >
                <MenuItem value="auto">Auto</MenuItem>
                <MenuItem value="manual">Manual</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
                <MenuItem value="disabled">Disabled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Review Threshold"
              type="number"
              value={formData.reviewThreshold}
              onChange={(e) => setFormData({ ...formData, reviewThreshold: e.target.value })}
              size="small"
              helperText="Minimum rating to auto-approve reviews"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Moderation Active"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Contact Information"
              multiline
              rows={2}
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              size="small"
              placeholder="Review moderation team contact details..."
            />
          </Grid>
        </Grid>
      </Paper>

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

export default ReviewsModeration;
