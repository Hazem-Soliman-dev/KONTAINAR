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
  Card,
  CardContent,
  Divider,
  Stack,
  LinearProgress,
  Avatar,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Save as SaveIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Category as CategoryIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  Tag as TagIcon,
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  PhotoCamera as PhotoCameraIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  Code as CodeIcon,
  Language as LanguageIcon,
  Translate as TranslateIcon,
  Search as SeoIcon,
  Analytics as AnalyticsIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';

const CreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentCategory: '',
    status: 'draft',
    featured: false,
    image: null,
    icon: '',
    color: '#1976d2',
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    displayOrder: 0,
    isActive: true,
    showInMenu: true,
    showInFooter: false,
    allowProducts: true,
    allowSubcategories: true,
    seoKeywords: '',
    customFields: [],
    translations: {},
  });

  const steps = [
    'Basic Information',
    'Category Details',
    'SEO & Meta',
    'Display Settings',
    'Review & Publish',
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({ open: true, message: 'Category created successfully', severity: 'success' });
    }, 1000);
  };

  const handleSaveDraft = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({ open: true, message: 'Category saved as draft', severity: 'success' });
    }, 1000);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
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
              Create New Category
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              Create a new product category with detailed configuration options
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
              <Link color="inherit" href="/main-store/catalog/categories">
                Categories
              </Link>
              <Typography color="text.primary">Create Category</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
              Create Category
            </Button>
          </Stack>
        </Box>

        {/* Progress Stepper */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} orientation="horizontal">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>

      {/* Main Form Content */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
              <Tab label="Basic Info" />
              <Tab label="Details" />
              <Tab label="SEO" />
              <Tab label="Display" />
              <Tab label="Advanced" />
            </Tabs>

            {/* Basic Information Tab */}
            {tabValue === 0 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Category Name"
                    placeholder="e.g., Electronics, Clothing, Books"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    helperText="This will be displayed to customers"
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="URL Slug"
                    placeholder="electronics"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    helperText="URL-friendly version of the name"
                    InputProps={{
                      startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Parent Category</InputLabel>
                    <Select
                      value={formData.parentCategory}
                      label="Parent Category"
                      onChange={(e) => handleInputChange('parentCategory', e.target.value)}
                    >
                      <MenuItem value="">No Parent (Root Category)</MenuItem>
                      <MenuItem value="electronics">Electronics</MenuItem>
                      <MenuItem value="clothing">Clothing</MenuItem>
                      <MenuItem value="books">Books</MenuItem>
                      <MenuItem value="home">Home & Garden</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    placeholder="Describe this category..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    helperText="This helps customers understand what products belong in this category"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      label="Status"
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="published">Published</MenuItem>
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Display Order"
                    placeholder="0"
                    value={formData.displayOrder}
                    onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value))}
                    helperText="Lower numbers appear first"
                  />
                </Grid>
              </Grid>
            )}

            {/* Category Details Tab */}
            {tabValue === 1 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Category Image
                  </Typography>
                  <Paper
                    sx={{
                      p: 4,
                      border: '2px dashed #ccc',
                      textAlign: 'center',
                      borderRadius: 2,
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
                    <PhotoCameraIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Upload Category Image
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Recommended size: 400x300px
                    </Typography>
                    <Button variant="outlined" startIcon={<UploadIcon />}>
                      Choose Image
                    </Button>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Icon"
                    placeholder="smartphone"
                    value={formData.icon}
                    onChange={(e) => handleInputChange('icon', e.target.value)}
                    helperText="Material Design icon name"
                    InputProps={{
                      startAdornment: <CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="color"
                    label="Category Color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    helperText="Color theme for this category"
                    InputProps={{
                      startAdornment: <PaletteIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={['electronics', 'technology', 'gadgets', 'mobile', 'computers']}
                    value={formData.keywords}
                    onChange={(event, newValue) => {
                      handleInputChange('keywords', newValue);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                          key={index}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Keywords"
                        placeholder="Add keywords..."
                        helperText="Keywords help with search and categorization"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}

            {/* SEO Tab */}
            {tabValue === 2 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <SeoIcon />
                    SEO Settings
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Meta Title"
                    placeholder="Best Electronics - Shop Now"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                    helperText="Title for search engines (50-60 characters recommended)"
                    InputProps={{
                      startAdornment: <TextFieldsIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Meta Description"
                    placeholder="Discover the latest electronics..."
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    helperText="Description for search engines (150-160 characters recommended)"
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="SEO Keywords"
                    placeholder="electronics, gadgets, technology"
                    value={formData.seoKeywords}
                    onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                    helperText="Comma-separated keywords for SEO"
                    InputProps={{
                      startAdornment: <TagIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>SEO Tips:</strong> Use relevant keywords, write compelling
                      descriptions, and ensure your meta title and description accurately represent
                      your category.
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            )}

            {/* Display Settings Tab */}
            {tabValue === 3 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Display Settings
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isActive}
                          onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        />
                      }
                      label="Active Category"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.featured}
                          onChange={(e) => handleInputChange('featured', e.target.checked)}
                        />
                      }
                      label="Featured Category"
                    />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.showInMenu}
                          onChange={(e) => handleInputChange('showInMenu', e.target.checked)}
                        />
                      }
                      label="Show in Navigation Menu"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.showInFooter}
                          onChange={(e) => handleInputChange('showInFooter', e.target.checked)}
                        />
                      }
                      label="Show in Footer"
                    />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.allowProducts}
                          onChange={(e) => handleInputChange('allowProducts', e.target.checked)}
                        />
                      }
                      label="Allow Products"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.allowSubcategories}
                          onChange={(e) =>
                            handleInputChange('allowSubcategories', e.target.checked)
                          }
                        />
                      }
                      label="Allow Subcategories"
                    />
                  </Stack>
                </Grid>
              </Grid>
            )}

            {/* Advanced Tab */}
            {tabValue === 4 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Advanced Settings
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Custom Fields</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <SettingsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          Custom Fields
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Add custom fields for this category
                        </Typography>
                        <Button variant="outlined" startIcon={<AddIcon />}>
                          Add Custom Field
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Translations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <TranslateIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          Multi-language Support
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Add translations for different languages
                        </Typography>
                        <Button variant="outlined" startIcon={<LanguageIcon />}>
                          Add Translation
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Category Preview */}
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <VisibilityIcon />
                  Category Preview
                </Typography>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: formData.color, width: 40, height: 40 }}>
                      <CategoryIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {formData.name || 'Category Name'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formData.slug || 'category-slug'}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {formData.description || 'Category description will appear here...'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSaveDraft}>
                    Save as Draft
                  </Button>
                  <Button variant="outlined" startIcon={<ScheduleIcon />}>
                    Schedule Publish
                  </Button>
                  <Button variant="outlined" startIcon={<CopyIcon />}>
                    Duplicate Category
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Category Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Category Stats
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Products:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      0
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Subcategories:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      0
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Views:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      0
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

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

export default CreateCategory;
