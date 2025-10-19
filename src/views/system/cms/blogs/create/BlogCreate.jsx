import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  Toolbar,
  Alert,
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
  Chip,
  Switch,
  FormControlLabel,
  CircularProgress,
  Avatar,
  LinearProgress,
  Skeleton,
  Fade,
  Zoom,
  Checkbox,
  Menu,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Badge,
  TableSortLabel,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Home as HomeIcon,
  Article as ArticleIcon,
  Publish as PublishIcon,
  Preview as PreviewIcon,
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
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
  Category as CategoryIcon,
  LocalOffer as TagIcon,
  Description as DescriptionIcon,
  AutoAwesome as AutoAwesomeIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';

const BlogCreate = () => {
  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    status: 'draft',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    publishDate: ''
  });

  // Enhanced mock data for stats
  const blogStats = {
    totalPosts: 156,
    publishedPosts: 142,
    draftPosts: 14,
    totalViews: 125000,
    categories: 8,
    tags: 45,
    featuredPosts: 12,
    scheduledPosts: 5
  };

  useEffect(() => {
    // Simulate initial data loading
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    setLoading(false);
    setSnackbar({ open: true, message: 'Data refreshed successfully', severity: 'success' });
  };

  const handleSave = (status) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({ 
        open: true, 
        message: `Blog post ${status} successfully`, 
        severity: 'success' 
      });
    }, 1000);
  };

  const handlePreview = () => {
    setOpenPreview(true);
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
              Create New Blog Post
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Create and manage your blog content with advanced features
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
              <Link color="inherit" href="/main-store/cms">
                CMS
              </Link>
              <Link color="inherit" href="/main-store/cms/blogs/list">
                Blog List
              </Link>
              <Typography color="text.primary">Create Post</Typography>
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
            <Button variant="outlined" startIcon={<PreviewIcon />} onClick={handlePreview}>
              Preview
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
                    <ArticleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {blogStats.totalPosts}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Total Posts
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
                    <PublicIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {blogStats.publishedPosts}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Published
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
                    <LockIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {blogStats.draftPosts}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Drafts
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
                    <VisibilityIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {blogStats.totalViews.toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Total Views
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Loading State */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <DescriptionIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Blog Content
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Write your blog post content
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Post Title"
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  placeholder="Enter blog post title"
                />
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange('excerpt')}
                  placeholder="Brief description of the post"
                />
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  label="Content"
                  value={formData.content}
                  onChange={handleInputChange('content')}
                  placeholder="Write your blog post content here..."
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Publish Settings */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                  <PublishIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Publish Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Control publication status
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      label="Status"
                      onChange={handleInputChange('status')}
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="published">Published</MenuItem>
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Publish Date"
                    value={formData.publishDate}
                    onChange={handleInputChange('publishDate')}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      />
                    }
                    label="Featured Post"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Categories & Tags */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}>
                  <CategoryIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Categories & Tags
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Organize your content
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Category"
                      onChange={handleInputChange('category')}
                    >
                      <MenuItem value="technology">Technology</MenuItem>
                      <MenuItem value="business">Business</MenuItem>
                      <MenuItem value="lifestyle">Lifestyle</MenuItem>
                      <MenuItem value="news">News</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Tags"
                    placeholder="Enter tags separated by commas"
                    helperText="Separate multiple tags with commas"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* SEO Settings */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
                  <AnalyticsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    SEO Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Optimize for search engines
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="SEO Title"
                    value={formData.seoTitle}
                    onChange={handleInputChange('seoTitle')}
                    placeholder="SEO optimized title"
                  />
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="SEO Description"
                    value={formData.seoDescription}
                    onChange={handleInputChange('seoDescription')}
                    placeholder="Meta description for search engines"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Enhanced Action Buttons */}
      <Paper sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
              <AutoAwesomeIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Ready to publish?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Save as draft or publish your blog post
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={() => handleSave('saved as draft')}
              disabled={loading}
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <PublishIcon />}
              onClick={() => handleSave('published')}
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish'}
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Enhanced Preview Dialog */}
      <Dialog open={openPreview} onClose={() => setOpenPreview(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <PreviewIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Blog Post Preview</Typography>
              <Typography variant="body2" color="text.secondary">
                Preview how your blog post will appear to readers
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                {formData.title || 'Untitled Post'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={formData.status} size="small" color="primary" variant="outlined" />
                {formData.featured && <Chip label="Featured" size="small" color="secondary" />}
                {formData.category && <Chip label={formData.category} size="small" />}
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                {formData.excerpt || 'No excerpt provided'}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {formData.content || 'No content provided'}
              </Typography>
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenPreview(false)} variant="outlined">
            Close
          </Button>
          <Button variant="contained" startIcon={<EditIcon />}>
            Edit Post
          </Button>
        </DialogActions>
      </Dialog>

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

export default BlogCreate;
