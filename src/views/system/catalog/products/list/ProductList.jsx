import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Menu,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
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
  Inventory as InventoryIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  CheckCircleOutline as CheckIcon,
  BlockOutlined as CloseIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon,
  DensityMedium as DensityMediumIcon,
  DensitySmall as DensitySmallIcon,
  DensityLarge as DensityLargeIcon,
} from '@mui/icons-material';

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [columnVisibility, setColumnVisibility] = useState({
    sku: true,
    barcode: false,
    category: true,
    subCategory: false,
    brand: true,
    model: false,
    manufacturer: false,
    price: true,
    comparePrice: false,
    cost: false,
    wholesalePrice: false,
    stock: true,
    minStock: false,
    maxStock: false,
    weight: false,
    dimensions: false,
    unit: false,
    status: true,
    visibility: false,
    featured: false,
    digital: false,
    seoTitle: false,
    tags: false,
    keywords: false,
    availableStores: false,
    specifications: false,
    features: false,
    warranty: false,
    specialOffers: false,
    rewardPoints: false,
    loyaltyProgram: false,
    shippingClass: false,
    freeShipping: false,
    taxClass: false,
    taxable: false,
    sales: true,
    lastModified: true,
  });
  const [viewDrawer, setViewDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data - more comprehensive with new fields
  const productData = [
    {
      id: 1,
      name: 'سماعات بلوتوث لاسلكية',
      sku: 'WH-001',
      barcode: '1234567890123',
      category: 'إلكترونيات',
      subCategory: 'صوتي',
      brand: 'TechSound',
      model: 'TS-WH-2024',
      manufacturer: 'TechSound Inc.',
      price: 99.99,
      comparePrice: 149.99,
      cost: 45.0,
      wholesalePrice: 75.0,
      retailPrice: 99.99,
      stock: 45,
      minStock: 10,
      maxStock: 100,
      weight: 0.3,
      dimensions: { length: 20, width: 15, height: 8 },
      unit: 'piece',
      status: 'active',
      visibility: 'public',
      featured: true,
      digital: false,
      downloadable: false,
      requiresShipping: true,
      seoTitle: 'Wireless Bluetooth Headphones - TechSound Premium Audio',
      seoDescription: 'High-quality wireless headphones with noise cancellation technology',
      metaKeywords: 'wireless headphones, bluetooth, noise cancellation, audio',
      tags: ['wireless', 'bluetooth', 'audio', 'headphones'],
      keywords: ['wireless headphones', 'bluetooth audio', 'noise cancellation'],
      availableStores: ['Main Store', 'Sub Store 1', 'Mobile App'],
      specifications: [
        { name: 'Battery Life', value: '30 hours' },
        { name: 'Connectivity', value: 'Bluetooth 5.0' },
        { name: 'Noise Cancellation', value: 'Active' },
      ],
      features: ['Noise Cancellation', '30-hour Battery', 'Quick Charge'],
      benefits: ['Crystal Clear Audio', 'Comfortable Fit', 'Long Battery Life'],
      warranty: '2 years manufacturer warranty',
      warrantyPeriod: '2 years',
      warrantyType: 'manufacturer',
      specialOffers: [
        {
          title: 'Summer Sale',
          description: '20% off all audio products',
          discount: 20,
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          active: true,
        },
      ],
      rewardPoints: 100,
      loyaltyProgram: true,
      loyaltyMultiplier: 1.5,
      images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
      videos: [],
      documents: [],
      shippingClass: 'standard',
      shippingWeight: 0.3,
      shippingDimensions: { length: 20, width: 15, height: 8 },
      freeShipping: false,
      shippingCost: 5.99,
      taxClass: 'standard',
      taxRate: 8.5,
      taxable: true,
      requiresApproval: false,
      approvalStatus: 'approved',
      customFields: [
        { name: 'Color', value: 'Black', type: 'text' },
        { name: 'Material', value: 'Plastic', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 1250,
      lastModified: '2024-01-15',
      image: '/api/placeholder/40/40',
      description: 'High-quality wireless headphones with noise cancellation',
      shortDescription: 'Premium wireless headphones with active noise cancellation',
      rating: 4.5,
      reviews: 89,
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      sku: 'SW-002',
      barcode: '1234567890124',
      category: 'Electronics',
      subCategory: 'Wearables',
      brand: 'FitTech',
      model: 'FT-SW-2024',
      manufacturer: 'FitTech Corp.',
      price: 299.99,
      comparePrice: 399.99,
      cost: 120.0,
      wholesalePrice: 200.0,
      retailPrice: 299.99,
      stock: 12,
      minStock: 5,
      maxStock: 50,
      weight: 0.05,
      dimensions: { length: 4, width: 3, height: 1 },
      unit: 'piece',
      status: 'active',
      visibility: 'public',
      featured: true,
      digital: false,
      downloadable: false,
      requiresShipping: true,
      seoTitle: 'Smart Fitness Watch - FitTech Advanced Health Tracking',
      seoDescription: 'Advanced fitness tracking with heart rate monitoring and GPS',
      metaKeywords: 'fitness watch, smartwatch, health tracking, heart rate',
      tags: ['fitness', 'smartwatch', 'health', 'tracking'],
      keywords: ['fitness watch', 'health tracking', 'smartwatch'],
      availableStores: ['Main Store', 'Sub Store 2', 'Mobile App'],
      specifications: [
        { name: 'Battery Life', value: '7 days' },
        { name: 'Water Resistance', value: '5ATM' },
        { name: 'GPS', value: 'Built-in' },
      ],
      features: ['Heart Rate Monitor', 'GPS Tracking', 'Sleep Analysis'],
      benefits: ['24/7 Health Monitoring', 'Fitness Insights', 'Long Battery Life'],
      warranty: '1 year manufacturer warranty',
      warrantyPeriod: '1 year',
      warrantyType: 'manufacturer',
      specialOffers: [],
      rewardPoints: 300,
      loyaltyProgram: true,
      loyaltyMultiplier: 2.0,
      images: ['/api/placeholder/300/300'],
      videos: [],
      documents: [],
      shippingClass: 'standard',
      shippingWeight: 0.05,
      shippingDimensions: { length: 4, width: 3, height: 1 },
      freeShipping: true,
      shippingCost: 0,
      taxClass: 'standard',
      taxRate: 8.5,
      taxable: true,
      requiresApproval: false,
      approvalStatus: 'approved',
      customFields: [
        { name: 'Color', value: 'Black', type: 'text' },
        { name: 'Size', value: 'Large', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 890,
      lastModified: '2024-01-14',
      image: '/api/placeholder/40/40',
      description: 'Advanced fitness tracking with heart rate monitoring',
      shortDescription: 'Smart fitness watch with comprehensive health tracking',
      rating: 4.2,
      reviews: 156,
    },
    {
      id: 3,
      name: 'Premium Coffee Maker',
      sku: 'CM-003',
      barcode: '1234567890125',
      category: 'Appliances',
      subCategory: 'Kitchen',
      brand: 'BrewMaster',
      model: 'BM-CM-2024',
      manufacturer: 'BrewMaster Appliances',
      price: 149.99,
      comparePrice: 199.99,
      cost: 80.0,
      wholesalePrice: 120.0,
      retailPrice: 149.99,
      stock: 0,
      minStock: 5,
      maxStock: 25,
      weight: 3.5,
      dimensions: { length: 30, width: 20, height: 35 },
      unit: 'piece',
      status: 'out_of_stock',
      visibility: 'public',
      featured: false,
      digital: false,
      downloadable: false,
      requiresShipping: true,
      seoTitle: 'Premium Coffee Maker - BrewMaster Professional Grade',
      seoDescription: 'Professional-grade coffee maker with programmable settings',
      metaKeywords: 'coffee maker, espresso, programmable, professional',
      tags: ['coffee', 'espresso', 'programmable', 'kitchen'],
      keywords: ['coffee maker', 'espresso machine', 'programmable'],
      availableStores: ['Main Store', 'Sub Store 1'],
      specifications: [
        { name: 'Capacity', value: '12 cups' },
        { name: 'Material', value: 'Stainless Steel' },
        { name: 'Programmable', value: 'Yes' },
      ],
      features: ['Programmable Timer', 'Stainless Steel', '12-Cup Capacity'],
      benefits: ['Perfect Coffee Every Time', 'Durable Construction', 'Easy to Clean'],
      warranty: '2 years manufacturer warranty',
      warrantyPeriod: '2 years',
      warrantyType: 'manufacturer',
      specialOffers: [],
      rewardPoints: 150,
      loyaltyProgram: false,
      loyaltyMultiplier: 1,
      images: ['/api/placeholder/300/300'],
      videos: [],
      documents: [],
      shippingClass: 'oversized',
      shippingWeight: 3.5,
      shippingDimensions: { length: 30, width: 20, height: 35 },
      freeShipping: false,
      shippingCost: 15.99,
      taxClass: 'standard',
      taxRate: 8.5,
      taxable: true,
      requiresApproval: false,
      approvalStatus: 'approved',
      customFields: [
        { name: 'Color', value: 'Silver', type: 'text' },
        { name: 'Material', value: 'Stainless Steel', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 567,
      lastModified: '2024-01-13',
      image: '/api/placeholder/40/40',
      description: 'Professional-grade coffee maker with programmable settings',
      shortDescription: 'Premium coffee maker with advanced brewing technology',
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 4,
      name: 'Gaming Mechanical Keyboard',
      sku: 'GMK-004',
      barcode: '1234567890126',
      category: 'Electronics',
      subCategory: 'Gaming',
      brand: 'GameTech',
      model: 'GT-GMK-2024',
      manufacturer: 'GameTech Gaming',
      price: 199.99,
      comparePrice: 249.99,
      cost: 90.0,
      wholesalePrice: 150.0,
      retailPrice: 199.99,
      stock: 8,
      minStock: 5,
      maxStock: 30,
      weight: 1.2,
      dimensions: { length: 45, width: 15, height: 3 },
      unit: 'piece',
      status: 'active',
      visibility: 'public',
      featured: false,
      digital: false,
      downloadable: false,
      requiresShipping: true,
      seoTitle: 'Gaming Mechanical Keyboard - GameTech RGB Gaming',
      seoDescription: 'RGB mechanical keyboard for gaming enthusiasts with customizable lighting',
      metaKeywords: 'gaming keyboard, mechanical, RGB, gaming, keyboard',
      tags: ['gaming', 'keyboard', 'mechanical', 'RGB'],
      keywords: ['gaming keyboard', 'mechanical keyboard', 'RGB keyboard'],
      availableStores: ['Main Store', 'Sub Store 3', 'Mobile App'],
      specifications: [
        { name: 'Switch Type', value: 'Cherry MX Blue' },
        { name: 'Backlight', value: 'RGB' },
        { name: 'Connectivity', value: 'USB-C' },
      ],
      features: ['RGB Backlighting', 'Mechanical Switches', 'Gaming Mode'],
      benefits: ['Enhanced Gaming Performance', 'Durable Construction', 'Customizable Lighting'],
      warranty: '1 year manufacturer warranty',
      warrantyPeriod: '1 year',
      warrantyType: 'manufacturer',
      specialOffers: [],
      rewardPoints: 200,
      loyaltyProgram: true,
      loyaltyMultiplier: 1.5,
      images: ['/api/placeholder/300/300'],
      videos: [],
      documents: [],
      shippingClass: 'standard',
      shippingWeight: 1.2,
      shippingDimensions: { length: 45, width: 15, height: 3 },
      freeShipping: false,
      shippingCost: 8.99,
      taxClass: 'standard',
      taxRate: 8.5,
      taxable: true,
      requiresApproval: false,
      approvalStatus: 'approved',
      customFields: [
        { name: 'Switch Type', value: 'Cherry MX Blue', type: 'text' },
        { name: 'Layout', value: 'Full Size', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 432,
      lastModified: '2024-01-12',
      image: '/api/placeholder/40/40',
      description: 'RGB mechanical keyboard for gaming enthusiasts',
      shortDescription: 'High-performance gaming keyboard with RGB lighting',
      rating: 4.6,
      reviews: 78,
    },
    {
      id: 5,
      name: 'Wireless Charging Pad',
      sku: 'WCP-005',
      barcode: '1234567890127',
      category: 'Electronics',
      subCategory: 'Accessories',
      brand: 'PowerUp',
      model: 'PU-WCP-2024',
      manufacturer: 'PowerUp Technologies',
      price: 49.99,
      comparePrice: 79.99,
      cost: 25.0,
      wholesalePrice: 35.0,
      retailPrice: 49.99,
      stock: 25,
      minStock: 10,
      maxStock: 100,
      weight: 0.2,
      dimensions: { length: 10, width: 10, height: 1 },
      unit: 'piece',
      status: 'active',
      visibility: 'public',
      featured: false,
      digital: false,
      downloadable: false,
      requiresShipping: true,
      seoTitle: 'Wireless Charging Pad - PowerUp Fast Wireless Charging',
      seoDescription: 'Fast wireless charging pad for smartphones with LED indicator',
      metaKeywords: 'wireless charging, charging pad, fast charging, smartphone',
      tags: ['wireless', 'charging', 'accessories', 'smartphone'],
      keywords: ['wireless charging', 'charging pad', 'fast charging'],
      availableStores: ['Main Store', 'Sub Store 1', 'Sub Store 2', 'Mobile App'],
      specifications: [
        { name: 'Charging Speed', value: '15W' },
        { name: 'Compatibility', value: 'Qi Standard' },
        { name: 'LED Indicator', value: 'Yes' },
      ],
      features: ['Fast Charging', 'LED Indicator', 'Qi Compatible'],
      benefits: ['Convenient Charging', 'Fast Charging Speed', 'Universal Compatibility'],
      warranty: '1 year manufacturer warranty',
      warrantyPeriod: '1 year',
      warrantyType: 'manufacturer',
      specialOffers: [],
      rewardPoints: 50,
      loyaltyProgram: false,
      loyaltyMultiplier: 1,
      images: ['/api/placeholder/300/300'],
      videos: [],
      documents: [],
      shippingClass: 'standard',
      shippingWeight: 0.2,
      shippingDimensions: { length: 10, width: 10, height: 1 },
      freeShipping: true,
      shippingCost: 0,
      taxClass: 'standard',
      taxRate: 8.5,
      taxable: true,
      requiresApproval: false,
      approvalStatus: 'approved',
      customFields: [
        { name: 'Color', value: 'White', type: 'text' },
        { name: 'Material', value: 'Silicone', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 678,
      lastModified: '2024-01-11',
      image: '/api/placeholder/40/40',
      description: 'Fast wireless charging pad for smartphones',
      shortDescription: 'Convenient wireless charging pad with fast charging',
      rating: 4.3,
      reviews: 145,
    },
  ];

  const categories = ['Electronics', 'Appliances', 'Clothing', 'Books', 'Sports'];
  const brands = ['TechSound', 'FitTech', 'BrewMaster', 'GameTech', 'PowerUp'];

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
    notify(`${action} المنتجات`, `${selectedItems.length} منتج`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setViewDrawer(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المنتج', selectedProduct ? 'تم تحديث المنتج' : 'تم إنشاء المنتج');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المنتج', 'تم حذف المنتج');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير المنتجات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const handleColumnToggle = (column) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const filteredData = productData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesBrand = brandFilter === 'all' || item.brand === brandFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesBrand;
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

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'error', label: 'نفد من المخزون' };
    if (stock < 10) return { color: 'warning', label: 'مخزون منخفض' };
    return { color: 'success', label: 'متوفر' };
  };

  const getDensityProps = () => {
    switch (density) {
      case 'compact':
        return { size: 'small' };
      case 'comfortable':
        return { size: 'medium' };
      default:
        return { size: 'small' };
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة المنتجات
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة كتالوج المنتجات والمخزون بطريقة شاملة ومتطورة.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/catalog">
            الكتالوج
          </Link>
          <Typography color="text.primary">المنتجات</Typography>
        </Breadcrumbs>
      </Box>

      {/* Stats Cards */}
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: 2 }}>
                  <InventoryIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {productData.length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المنتجات
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, mr: 2 }}>
                  <TrendingUpIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {productData.filter((p) => p.status === 'active').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                المنتجات النشطة
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, mr: 2 }}>
                  <TrendingDownIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {productData.filter((p) => p.stock > 0 && p.stock < 10).length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مخزون منخفض
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'error.main', width: 48, height: 48, mr: 2 }}>
                  <TrendingDownIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {productData.filter((p) => p.stock === 0).length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                نفد من المخزون
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="البحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={statusFilter}
                  label="الحالة"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الحالات</MenuItem>
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                  <MenuItem value="out of stock">نفد من المخزون</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الفئة</InputLabel>
                <Select
                  value={categoryFilter}
                  label="الفئة"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الفئات</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>العلامة التجارية</InputLabel>
                <Select
                  value={brandFilter}
                  label="العلامة التجارية"
                  onChange={(e) => setBrandFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع العلامات</MenuItem>
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
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
                  setCategoryFilter('all');
                  setBrandFilter('all');
                }}
                fullWidth
              >
                إعادة تعيين
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                تم العثور على {filteredData.length}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            قائمة المنتجات
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تفعيل')} sx={{ mr: 1 }}>
                تفعيل ({selectedItems.length})
              </Button>
              <Button size="small" color="error" onClick={() => handleBulkAction('حذف')}>
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Tooltip title="تصدير CSV">
            <IconButton onClick={handleExport} sx={{ mr: 1 }}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="رؤية الأعمدة">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ mr: 1 }}>
              <ViewColumnIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="الكثافة">
            <IconButton
              onClick={() => handleDensityChange(density === 'compact' ? 'comfortable' : 'compact')}
              sx={{ mr: 1 }}
            >
              {density === 'compact' ? <DensityMediumIcon /> : <DensitySmallIcon />}
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              navigate('/system/catalog/products/create');
            }}
          >
            إضافة منتج
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={60} sx={{ mb: 1 }} />
            ))}
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error">خطأ في تحميل المنتجات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على منتجات. أضف أول منتج.</Alert>
          </Box>
        ) : (
          <>
            <Table {...getDensityProps()}>
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
المنتج
                    </TableSortLabel>
                  </TableCell>
                  {columnVisibility.sku && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'sku'}
                        direction={sortBy === 'sku' ? sortOrder : 'asc'}
                        onClick={() => handleSort('sku')}
                      >
رمز المنتج
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.barcode && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'barcode'}
                        direction={sortBy === 'barcode' ? sortOrder : 'asc'}
                        onClick={() => handleSort('barcode')}
                      >
الباركود
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.category && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'category'}
                        direction={sortBy === 'category' ? sortOrder : 'asc'}
                        onClick={() => handleSort('category')}
                      >
الفئة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.subCategory && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'subCategory'}
                        direction={sortBy === 'subCategory' ? sortOrder : 'asc'}
                        onClick={() => handleSort('subCategory')}
                      >
الفئة الفرعية
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.brand && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'brand'}
                        direction={sortBy === 'brand' ? sortOrder : 'asc'}
                        onClick={() => handleSort('brand')}
                      >
العلامة التجارية
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.model && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'model'}
                        direction={sortBy === 'model' ? sortOrder : 'asc'}
                        onClick={() => handleSort('model')}
                      >
الموديل
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.manufacturer && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'manufacturer'}
                        direction={sortBy === 'manufacturer' ? sortOrder : 'asc'}
                        onClick={() => handleSort('manufacturer')}
                      >
الشركة المصنعة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.price && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'price'}
                        direction={sortBy === 'price' ? sortOrder : 'asc'}
                        onClick={() => handleSort('price')}
                      >
السعر
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.comparePrice && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'comparePrice'}
                        direction={sortBy === 'comparePrice' ? sortOrder : 'asc'}
                        onClick={() => handleSort('comparePrice')}
                      >
سعر المقارنة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.cost && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'cost'}
                        direction={sortBy === 'cost' ? sortOrder : 'asc'}
                        onClick={() => handleSort('cost')}
                      >
التكلفة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.wholesalePrice && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'wholesalePrice'}
                        direction={sortBy === 'wholesalePrice' ? sortOrder : 'asc'}
                        onClick={() => handleSort('wholesalePrice')}
                      >
سعر الجملة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.stock && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'stock'}
                        direction={sortBy === 'stock' ? sortOrder : 'asc'}
                        onClick={() => handleSort('stock')}
                      >
المخزون
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.sales && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'sales'}
                        direction={sortBy === 'sales' ? sortOrder : 'asc'}
                        onClick={() => handleSort('sales')}
                      >
المبيعات
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.status && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'status'}
                        direction={sortBy === 'status' ? sortOrder : 'asc'}
                        onClick={() => handleSort('status')}
                      >
الحالة
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {columnVisibility.lastModified && (
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'lastModified'}
                        direction={sortBy === 'lastModified' ? sortOrder : 'asc'}
                        onClick={() => handleSort('lastModified')}
                      >
آخر تعديل
                      </TableSortLabel>
                    </TableCell>
                  )}
                  <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    const stockStatus = getStockStatus(item.stock);
                    return (
                      <TableRow key={item.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={item.image} sx={{ width: 40, height: 40, mr: 2 }} />
                            <Box>
                              <Typography variant="subtitle2">{item.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        {columnVisibility.sku && (
                          <TableCell>
                            <Typography variant="body2" fontFamily="monospace">
                              {item.sku}
                            </Typography>
                          </TableCell>
                        )}
                        {columnVisibility.barcode && (
                          <TableCell>
                            <Typography variant="body2" fontFamily="monospace">
                              {item.barcode}
                            </Typography>
                          </TableCell>
                        )}
                        {columnVisibility.category && (
                          <TableCell>
                            <Chip label={item.category} size="small" variant="outlined" />
                          </TableCell>
                        )}
                        {columnVisibility.subCategory && (
                          <TableCell>
                            <Chip
                              label={item.subCategory}
                              size="small"
                              variant="outlined"
                              color="secondary"
                            />
                          </TableCell>
                        )}
                        {columnVisibility.brand && (
                          <TableCell>
                            <Typography variant="body2">{item.brand}</Typography>
                          </TableCell>
                        )}
                        {columnVisibility.model && (
                          <TableCell>
                            <Typography variant="body2">{item.model}</Typography>
                          </TableCell>
                        )}
                        {columnVisibility.manufacturer && (
                          <TableCell>
                            <Typography variant="body2">{item.manufacturer}</Typography>
                          </TableCell>
                        )}
                        {columnVisibility.price && (
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                              ${item.price.toFixed(2)}
                            </Typography>
                          </TableCell>
                        )}
                        {columnVisibility.comparePrice && (
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              ${item.comparePrice.toFixed(2)}
                            </Typography>
                          </TableCell>
                        )}
                        {columnVisibility.cost && (
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              ${item.cost.toFixed(2)}
                            </Typography>
                          </TableCell>
                        )}
                        {columnVisibility.wholesalePrice && (
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              ${item.wholesalePrice.toFixed(2)}
                            </Typography>
                          </TableCell>
                        )}
                        {columnVisibility.stock && (
                          <TableCell>
                            <Box sx={{ minWidth: 100 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                  {item.stock}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.min((item.stock / 100) * 100, 100)}
                                  sx={{ flexGrow: 1 }}
                                  color={stockStatus.color}
                                />
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                {stockStatus.label}
                              </Typography>
                            </Box>
                          </TableCell>
                        )}
                        {columnVisibility.sales && (
                          <TableCell>
                            <Typography variant="body2">{item.sales.toLocaleString()}</Typography>
                          </TableCell>
                        )}
                        {columnVisibility.status && (
                          <TableCell>
                            <Chip
                              label={item.status}
                              size="small"
                              color={item.status === 'Active' ? 'success' : 'default'}
                            />
                          </TableCell>
                        )}
                        {columnVisibility.lastModified && (
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {item.lastModified}
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleView(item)}
                                aria-label="عرض تفاصيل المنتج"
                              >
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل المنتج" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(item)}
                                aria-label="تعديل المنتج"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف المنتج" arrow>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(item)}
                                aria-label="حذف المنتج"
                              >
                                <DeleteIcon />
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
            />
          </>
        )}
      </Paper>

      {/* Edit Dialog - فقط للتعديل */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>تعديل المنتج</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم المنتج"
                placeholder="أدخل اسم المنتج"
                defaultValue={selectedProduct?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رمز المنتج"
                placeholder="أدخل رمز المنتج"
                defaultValue={selectedProduct?.sku || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الفئة</InputLabel>
                <Select label="الفئة" defaultValue={selectedProduct?.category || ''}>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>العلامة التجارية</InputLabel>
                <Select label="العلامة التجارية" defaultValue={selectedProduct?.brand || ''}>
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="السعر"
                placeholder="0.00"
                defaultValue={selectedProduct?.price || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="كمية المخزون"
                placeholder="0"
                defaultValue={selectedProduct?.stock || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedProduct?.status || 'نشط'}>
                  <MenuItem value="Active">نشط</MenuItem>
                  <MenuItem value="Inactive">غير نشط</MenuItem>
                  <MenuItem value="Out of Stock">نفد من المخزون</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الوصف"
                placeholder="أدخل وصف المنتج"
                defaultValue={selectedProduct?.description || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف المنتج</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا المنتج؟
          </Typography>
          {selectedProduct && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedProduct.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                SKU: {selectedProduct.sku} | Price: ${selectedProduct.price}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            disabled={loading}
          >
            {loading ? 'جاري الحذف...' : 'حذف'}
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
          <Typography variant="h6" gutterBottom>
            تفاصيل المنتج
          </Typography>
          {selectedProduct && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={selectedProduct.image} sx={{ width: 60, height: 60, mr: 2 }} />
                <Box>
                  <Typography variant="h6">{selectedProduct.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    SKU: {selectedProduct.sku}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="رمز المنتج" secondary={selectedProduct.sku} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الباركود" secondary={selectedProduct.barcode} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الفئة" secondary={selectedProduct.category} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الفئة الفرعية" secondary={selectedProduct.subCategory} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العلامة التجارية" secondary={selectedProduct.brand} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموديل" secondary={selectedProduct.model} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الشركة المصنعة" secondary={selectedProduct.manufacturer} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="السعر" secondary={`$${selectedProduct.price}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="سعر المقارنة"
                    secondary={`$${selectedProduct.comparePrice}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التكلفة" secondary={`$${selectedProduct.cost}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="سعر الجملة"
                    secondary={`$${selectedProduct.wholesalePrice}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المخزون" secondary={selectedProduct.stock} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحد الأدنى للمخزون" secondary={selectedProduct.minStock} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحد الأقصى للمخزون" secondary={selectedProduct.maxStock} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الوزن" secondary={`${selectedProduct.weight} كيلو`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأبعاد"
                    secondary={`${selectedProduct.dimensions.length} x ${selectedProduct.dimensions.width} x ${selectedProduct.dimensions.height} سم`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الوحدة" secondary={selectedProduct.unit} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={selectedProduct.status} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الرؤية" secondary={selectedProduct.visibility} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="مميز"
                    secondary={selectedProduct.featured ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="رقمي"
                    secondary={selectedProduct.digital ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="يتطلب شحن"
                    secondary={selectedProduct.requiresShipping ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبيعات"
                    secondary={selectedProduct.sales.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="التقييم"
                    secondary={`${selectedProduct.rating}/5 (${selectedProduct.reviews} تقييم)`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="نقاط المكافآت" secondary={selectedProduct.rewardPoints} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="برنامج الولاء"
                    secondary={selectedProduct.loyaltyProgram ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="شحن مجاني"
                    secondary={selectedProduct.freeShipping ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="فئة الضريبة" secondary={selectedProduct.taxClass} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="خاضع للضريبة"
                    secondary={selectedProduct.taxable ? 'نعم' : 'لا'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="آخر تعديل" secondary={selectedProduct.lastModified} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProduct.description}
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Column Visibility Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem>
          <ListItemText primary="رؤية الأعمدة" />
        </MenuItem>
        <Divider />
        {Object.entries(columnVisibility).map(([column, visible]) => (
          <MenuItem key={column} onClick={() => handleColumnToggle(column)}>
            <Checkbox checked={visible} />
            <ListItemText primary={column.charAt(0).toUpperCase() + column.slice(1)} />
          </MenuItem>
        ))}
      </Menu>

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

export default ProductList;
