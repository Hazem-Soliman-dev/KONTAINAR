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
  Collections as CollectionsIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Schedule as ScheduleIcon2,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';

const CollectionList = () => {
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
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Mock data for collections
  const collectionsData = [
    {
      id: 1,
      name: 'Summer Collection',
      type: 'manual',
      productsCount: 45,
      status: 'active',
      scheduleFrom: '2024-06-01',
      scheduleTo: '2024-08-31',
      updatedAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Winter Essentials',
      type: 'rule',
      productsCount: 32,
      status: 'active',
      scheduleFrom: '2024-12-01',
      scheduleTo: '2025-02-28',
      updatedAt: '2024-01-14',
    },
    {
      id: 3,
      name: 'Tech Gadgets',
      type: 'manual',
      productsCount: 28,
      status: 'inactive',
      scheduleFrom: '2024-03-01',
      scheduleTo: '2024-05-31',
      updatedAt: '2024-01-13',
    },
    {
      id: 4,
      name: 'Home & Garden',
      type: 'rule',
      productsCount: 67,
      status: 'active',
      scheduleFrom: '2024-01-01',
      scheduleTo: '2024-12-31',
      updatedAt: '2024-01-12',
    },
    {
      id: 5,
      name: 'Fashion Trends',
      type: 'manual',
      productsCount: 89,
      status: 'active',
      scheduleFrom: '2024-02-01',
      scheduleTo: '2024-04-30',
      updatedAt: '2024-01-11',
    },
  ];

  // Mock data for collection stats
  const collectionStats = [
    {
      title: 'Total Collections',
      value: '24',
      change: '+12%',
      color: 'primary',
      icon: CollectionsIcon,
    },
    {
      title: 'Manual vs Rule',
      value: '18/6',
      change: '+3',
      color: 'secondary',
      icon: SettingsIcon,
    },
    { title: 'Scheduled Now', value: '8', change: '+2', color: 'success', icon: ScheduleIcon2 },
    {
      title: 'Products/Collection Avg',
      value: '156',
      change: '+23',
      color: 'info',
      icon: AnalyticsIcon,
    },
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
      setSelectedItems(collectionsData.map((item) => item.id));
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
        notify(`Deleted ${selectedItems.length} collections`);
        setSelectedItems([]);
        break;
      case 'export':
        notify(`Exported ${selectedItems.length} collections`);
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

  const handleView = (collection) => {
    setSelectedCollection(collection);
    setViewDrawer(true);
  };

  const handleEdit = (collection) => {
    setSelectedCollection(collection);
    setOpenDialog(true);
  };

  const handleDelete = (collection) => {
    setSelectedCollection(collection);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setOpenDialog(false);
    notify('Collection updated successfully');
  };

  const handleDeleteConfirm = () => {
    setOpenDeleteDialog(false);
    notify('Collection deleted successfully');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('Data refreshed successfully');
    }, 1000);
  };

  const filteredData = collectionsData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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
    title: 'Collection List',
    content: '',
    isActive: true,
    collectionName: '',
    collectionDescription: '',
    collectionImage: '',
    contactInfo: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Collection Management',
      content: 'Manage product collections and their configurations.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'Collection Products',
      content: 'View and manage products in each collection.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'Collection Display',
      content: 'Configure how collections are displayed to customers.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'Collection Analytics',
      content: 'View collection performance and analytics.',
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
          Collection List
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Manage your product collections with manual or rule-based selection
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="/main-store">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Main Store
          </Link>
          <Link color="inherit" href="/main-store/catalog">
            Catalog
          </Link>
          <Typography color="text.primary">Collection List</Typography>
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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              href="/main-store/catalog/collections/create"
            >
              Add Collection
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {collectionStats.map((stat, index) => (
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
              placeholder="Search collections..."
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
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="manual">Manual</MenuItem>
                <MenuItem value="rule">Rule-based</MenuItem>
              </Select>
            </FormControl>
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
                <MenuItem value="inactive">Inactive</MenuItem>
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
              {filteredData.length} collections found
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
              onClick={() => handleBulkAction('export')}
              sx={{ mr: 1 }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleBulkAction('delete')}
            >
              Delete
            </Button>
          </Toolbar>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < collectionsData.length
                  }
                  checked={
                    collectionsData.length > 0 && selectedItems.length === collectionsData.length
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
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Schedule</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Updated</TableCell>
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
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
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
                  <Alert severity="info">No collections found</Alert>
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((collection) => (
                  <TableRow key={collection.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(collection.id)}
                        onChange={() => handleSelectItem(collection.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {collection.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={collection.type}
                        size="small"
                        color={collection.type === 'manual' ? 'primary' : 'secondary'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{collection.productsCount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={collection.status}
                        size="small"
                        color={collection.status === 'active' ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" color="text.secondary">
                        {collection.scheduleFrom} - {collection.scheduleTo}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" color="text.secondary">
                        {collection.updatedAt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleView(collection)}
                            aria-label="view collection"
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Collection">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(collection)}
                            aria-label="edit collection"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Collection">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(collection)}
                            aria-label="delete collection"
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
        <DialogTitle>Edit Collection</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Collection Name"
                value={selectedCollection?.name || ''}
                variant="outlined"
                helperText="Enter a descriptive name for the collection"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={selectedCollection?.description || ''}
                variant="outlined"
                helperText="Describe the collection's purpose and content"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={selectedCollection?.type || 'manual'} label="Type">
                  <MenuItem value="manual">Manual</MenuItem>
                  <MenuItem value="rule">Rule-based</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={selectedCollection?.status || 'active'} label="Status">
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
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
        <DialogTitle>Delete Collection</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedCollection?.name}"? This action cannot be
            undone.
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
            Collection Details
          </Typography>
          {selectedCollection && (
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={selectedCollection.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Type" secondary={selectedCollection.type} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Products Count"
                  secondary={selectedCollection.productsCount}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Status" secondary={selectedCollection.status} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Schedule"
                  secondary={`${selectedCollection.scheduleFrom} - ${selectedCollection.scheduleTo}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last Updated" secondary={selectedCollection.updatedAt} />
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

export default CollectionList;
