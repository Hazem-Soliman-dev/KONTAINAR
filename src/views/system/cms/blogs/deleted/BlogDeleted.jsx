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
  Badge,
  LinearProgress,
  Fade,
  Zoom,
  TableSortLabel,
  Checkbox,
  Menu,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Restore as RestoreIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Home as HomeIcon,
  Article as ArticleIcon,
  RestoreFromTrash as RestoreFromTrashIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  DragIndicator as DragIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  ContentCopy,
  Share as ShareIcon,
  Category as CategoryIcon,
  LocalOffer as LocalOfferIcon,
  Description as DescriptionIcon,
  AutoAwesome as AutoAwesomeIcon,
  Analytics as AnalyticsIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  DeleteForever as DeleteForeverIcon,
  RestoreFromTrash as RestoreFromTrashIcon2,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const BlogDeleted = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deletedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Mock data
  const deletedBlogData = [
    {
      id: 1,
      title: 'Old Marketing Strategy',
      author: 'Admin',
      category: 'Marketing',
      deletedDate: '2024-01-10',
      deletedBy: 'Admin',
      reason: 'Outdated content',
      status: 'Deleted',
      priority: 'High',
      views: 1250,
      featured: false,
      color: '#f44336',
    },
    {
      id: 2,
      title: 'Temporary Post',
      author: 'Editor',
      category: 'News',
      deletedDate: '2024-01-08',
      deletedBy: 'Editor',
      reason: 'No longer needed',
      status: 'Deleted',
      priority: 'Medium',
      views: 850,
      featured: false,
      color: '#ff9800',
    },
    {
      id: 3,
      title: 'Test Article',
      author: 'Admin',
      category: 'Test',
      deletedDate: '2024-01-05',
      deletedBy: 'Admin',
      reason: 'Test content',
      status: 'Deleted',
      priority: 'Low',
      views: 120,
      featured: false,
      color: '#9e9e9e',
    },
    {
      id: 4,
      title: 'Seasonal Promotion',
      author: 'Marketing',
      category: 'Promotions',
      deletedDate: '2024-01-03',
      deletedBy: 'Marketing',
      reason: 'Season ended',
      status: 'Deleted',
      priority: 'High',
      views: 2100,
      featured: true,
      color: '#e91e63',
    },
    {
      id: 5,
      title: 'Product Review',
      author: 'Editor',
      category: 'Reviews',
      deletedDate: '2024-01-01',
      deletedBy: 'Editor',
      reason: 'Product discontinued',
      status: 'Deleted',
      priority: 'Medium',
      views: 950,
      featured: false,
      color: '#2196f3',
    },
  ];

  // Stats data
  const deletedStats = {
    totalDeleted: 5,
    recentlyDeleted: 3,
    permanentlyDeleted: 0,
    restored: 2,
  };

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'Data refreshed successfully', severity: 'success' });
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
      setSelectedItems(deletedBlogData.map((item) => item.id));
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Deleted':
        return 'error';
      case 'Restored':
        return 'success';
      case 'Permanent':
        return 'warning';
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
        return 'info';
      default:
        return 'default';
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for items:`, selectedItems);
    setSnackbar({
      open: true,
      message: `${action} completed for ${selectedItems.length} posts`,
      severity: 'success',
    });
    setSelectedItems([]);
  };

  const handleRestore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'Blog post restored successfully', severity: 'success' });
    }, 1000);
  };

  const handlePermanentDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'Blog post permanently deleted', severity: 'success' });
    }, 1000);
  };

  const filteredData = deletedBlogData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.category.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority =
      priorityFilter === 'all' || item.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'deletedDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
              Deleted Blog Posts
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Manage deleted blog posts and restore if needed. Monitor deletion patterns and restore
              content when necessary.
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
              <Link
                color="inherit"
                href="/main-store"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Dashboard
              </Link>
              <Link color="inherit" href="/main-store/cms/blogs/list">
                Blog Posts
              </Link>
              <Typography color="text.primary">Deleted Posts</Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
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
              startIcon={<RestoreFromTrashIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Bulk Restore
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
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
                  {deletedStats.totalDeleted}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Total Deleted
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
                    <ScheduleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {deletedStats.recentlyDeleted}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Recent Deletions
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
                  <Avatar sx={{ bgcolor: 'purple', width: 48, height: 48, mr: 2 }}>
                    <DeleteForeverIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'purple', mb: 1 }}>
                  {deletedStats.permanentlyDeleted}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Permanently Deleted
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
                  {deletedStats.restored}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Restored Posts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: 'info.main' }}>
            <FilterIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Filters & Search
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Filter and search through deleted blog posts
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search deleted posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={statusFilter}
                label="Category"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="news">News</MenuItem>
                <MenuItem value="test">Test</MenuItem>
                <MenuItem value="promotions">Promotions</MenuItem>
                <MenuItem value="reviews">Reviews</MenuItem>
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
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              fullWidth
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {sortedData.length} deleted posts found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, sortedData.length)}{' '}
            of {sortedData.length}
          </Typography>
        </Box>
      </Paper>

      {/* Content */}
      <Paper sx={{ borderRadius: 2 }}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <ArticleIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Deleted Blog Posts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage and restore deleted blog content
              </Typography>
            </Box>
          </Box>
          {selectedItems.length > 0 && (
            <Fade in={selectedItems.length > 0}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  color="success"
                  onClick={() => handleBulkAction('Restore')}
                  startIcon={<RestoreFromTrashIcon />}
                  variant="contained"
                >
                  Restore ({selectedItems.length})
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleBulkAction('Permanently Delete')}
                  startIcon={<DeleteForeverIcon />}
                  variant="outlined"
                >
                  Delete Forever ({selectedItems.length})
                </Button>
              </Box>
            </Fade>
          )}
        </Toolbar>

        {loading && <LinearProgress />}

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
              No deleted posts found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              All your blog posts are currently active
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArticleIcon />}
              href="/main-store/cms/blogs/list"
            >
              View All Posts
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
                      active={sortBy === 'title'}
                      direction={sortBy === 'title' ? sortOrder : 'asc'}
                      onClick={() => handleSort('title')}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'deletedDate'}
                      direction={sortBy === 'deletedDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('deletedDate')}
                    >
                      Deleted Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Deleted By</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>Reason</TableCell>
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
                          <Avatar sx={{ width: 40, height: 40, bgcolor: item.color }}>
                            <ArticleIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {item.reason}
                            </Typography>
                            {item.featured && (
                              <Chip
                                label="Featured"
                                size="small"
                                color="secondary"
                                sx={{ mt: 0.5 }}
                              />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                            {item.author.charAt(0)}
                          </Avatar>
                          {item.author}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.category}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.deletedDate}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                            {item.deletedBy.charAt(0)}
                          </Avatar>
                          {item.deletedBy}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.priority}
                          size="small"
                          color={getPriorityColor(item.priority)}
                          variant="outlined"
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
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {item.reason}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <Tooltip title="View Details" arrow>
                            <IconButton size="small" color="primary">
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Restore Post" arrow>
                            <IconButton size="small" color="success">
                              <RestoreIcon />
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'success.main' }}>
              <RestoreIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Restore Blog Posts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Restore selected blog posts to active status
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: 'warning.main' }}>
                <WarningIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Confirmation Required
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please confirm your action
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to restore {selectedItems.length} blog post
              {selectedItems.length > 1 ? 's' : ''}? They will be moved back to the active posts
              list and will be visible to your audience.
            </Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Note:</strong> Restored posts will maintain their original publication date
                and author information.
              </Typography>
            </Alert>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleRestore}
            disabled={loading}
            startIcon={<RestoreIcon />}
          >
            {loading
              ? 'Restoring...'
              : `Restore ${selectedItems.length} Post${selectedItems.length > 1 ? 's' : ''}`}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 200 },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <RestoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Restore Post</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
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
            <DeleteForeverIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete Forever</ListItemText>
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="filled"
        sx={{ borderRadius: 2 }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogDeleted;
