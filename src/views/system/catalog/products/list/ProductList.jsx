import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Stack,
  Avatar,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Menu,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  Divider,
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
  Inventory as InventoryIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Download as DownloadIcon,
  ViewColumn as ViewColumnIcon,
  DensityMedium as DensityMediumIcon,
  DensitySmall as DensitySmallIcon,
} from '@mui/icons-material';
import PageContainer from '../../../../../components/container/PageContainer';
import Breadcrumb from '../../../../../layouts/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/system',
    title: 'الرئيسية',
  },
  {
    to: '/system/catalog',
    title: 'الكتالوج',
  },
  {
    title: 'المنتجات',
  },
];

const ProductList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
      seoTitle: 'سماعات بلوتوث لاسلكية - TechSound صوت عالي الجودة',
      seoDescription: 'سماعات لاسلكية عالية الجودة مع تقنية إلغاء الضوضاء',
      metaKeywords: 'سماعات لاسلكية, بلوتوث, إلغاء الضوضاء, صوت',
      tags: ['لاسلكي', 'بلوتوث', 'صوت', 'سماعات'],
      keywords: ['سماعات لاسلكية', 'صوت بلوتوث', 'إلغاء الضوضاء'],
      availableStores: ['المتجر الرئيسي', 'المتجر الفرعي 1', 'التطبيق المحمول'],
      specifications: [
        { name: 'مدة البطارية', value: '30 ساعة' },
        { name: 'الاتصال', value: 'Bluetooth 5.0' },
        { name: 'إلغاء الضوضاء', value: 'نشط' },
      ],
      features: ['إلغاء الضوضاء', 'بطارية 30 ساعة', 'شحن سريع'],
      benefits: ['صوت واضح', 'راحة في الاستخدام', 'مدة بطارية طويلة'],
      warranty: 'ضمان الشركة المصنعة لمدة سنتين',
      warrantyPeriod: 'سنتان',
      warrantyType: 'manufacturer',
      specialOffers: [
        {
          title: 'عرض الصيف',
          description: 'خصم 20% على جميع المنتجات الصوتية',
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
        { name: 'اللون', value: 'أسود', type: 'text' },
        { name: 'المادة', value: 'بلاستيك', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 1250,
      lastModified: '2024-01-15',
      image: '/api/placeholder/40/40',
      description: 'سماعات لاسلكية عالية الجودة مع تقنية إلغاء الضوضاء',
      shortDescription: 'سماعات لاسلكية متميزة مع إلغاء الضوضاء النشط',
      rating: 4.5,
      reviews: 89,
    },
    {
      id: 2,
      name: 'ساعة ذكية لللياقة البدنية',
      sku: 'SW-002',
      barcode: '1234567890124',
      category: 'إلكترونيات',
      subCategory: 'أجهزة قابلة للارتداء',
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
      seoTitle: 'ساعة ذكية لللياقة البدنية - FitTech تتبع صحي متقدم',
      seoDescription: 'تتبع لياقة بدنية متقدم مع مراقبة معدل ضربات القلب ونظام GPS',
      metaKeywords: 'ساعة لياقة, ساعة ذكية, تتبع صحي, معدل ضربات القلب',
      tags: ['لياقة', 'ساعة ذكية', 'صحة', 'تتبع'],
      keywords: ['ساعة لياقة', 'تتبع صحي', 'ساعة ذكية'],
      availableStores: ['المتجر الرئيسي', 'المتجر الفرعي 2', 'التطبيق المحمول'],
      specifications: [
        { name: 'مدة البطارية', value: '7 أيام' },
        { name: 'مقاومة الماء', value: '5ATM' },
        { name: 'GPS', value: 'مدمج' },
      ],
      features: ['مراقب معدل ضربات القلب', 'تتبع GPS', 'تحليل النوم'],
      benefits: ['مراقبة صحية 24/7', 'رؤى اللياقة', 'مدة بطارية طويلة'],
      warranty: 'ضمان الشركة المصنعة لمدة سنة',
      warrantyPeriod: 'سنة واحدة',
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
        { name: 'اللون', value: 'أسود', type: 'text' },
        { name: 'الحجم', value: 'كبير', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 890,
      lastModified: '2024-01-14',
      image: '/api/placeholder/40/40',
      description: 'تتبع لياقة بدنية متقدم مع مراقبة معدل ضربات القلب',
      shortDescription: 'ساعة ذكية لللياقة البدنية مع تتبع صحي شامل',
      rating: 4.2,
      reviews: 156,
    },
    {
      id: 3,
      name: 'ماكينة قهوة متميزة',
      sku: 'CM-003',
      barcode: '1234567890125',
      category: 'أجهزة منزلية',
      subCategory: 'مطبخ',
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
      seoTitle: 'ماكينة قهوة متميزة - BrewMaster درجة احترافية',
      seoDescription: 'ماكينة قهوة درجة احترافية مع إعدادات قابلة للبرمجة',
      metaKeywords: 'ماكينة قهوة, إسبرسو, قابل للبرمجة, احترافي',
      tags: ['قهوة', 'إسبرسو', 'قابل للبرمجة', 'مطبخ'],
      keywords: ['ماكينة قهوة', 'آلة إسبرسو', 'قابل للبرمجة'],
      availableStores: ['المتجر الرئيسي', 'المتجر الفرعي 1'],
      specifications: [
        { name: 'السعة', value: '12 كوب' },
        { name: 'المادة', value: 'فولاذ مقاوم للصدأ' },
        { name: 'قابل للبرمجة', value: 'نعم' },
      ],
      features: ['مؤقت قابل للبرمجة', 'فولاذ مقاوم للصدأ', 'سعة 12 كوب'],
      benefits: ['قهوة مثالية في كل مرة', 'بناء متين', 'سهل التنظيف'],
      warranty: 'ضمان الشركة المصنعة لمدة سنتين',
      warrantyPeriod: 'سنتان',
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
        { name: 'اللون', value: 'فضي', type: 'text' },
        { name: 'المادة', value: 'فولاذ مقاوم للصدأ', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 567,
      lastModified: '2024-01-13',
      image: '/api/placeholder/40/40',
      description: 'ماكينة قهوة درجة احترافية مع إعدادات قابلة للبرمجة',
      shortDescription: 'ماكينة قهوة متميزة مع تقنية تخمير متقدمة',
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 4,
      name: 'لوحة مفاتيح ميكانيكية للألعاب',
      sku: 'GMK-004',
      barcode: '1234567890126',
      category: 'إلكترونيات',
      subCategory: 'ألعاب',
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
      seoTitle: 'لوحة مفاتيح ميكانيكية للألعاب - GameTech RGB للألعاب',
      seoDescription: 'لوحة مفاتيح ميكانيكية RGB لعشاق الألعاب مع إضاءة قابلة للتخصيص',
      metaKeywords: 'لوحة مفاتيح ألعاب, ميكانيكية, RGB, ألعاب, لوحة مفاتيح',
      tags: ['ألعاب', 'لوحة مفاتيح', 'ميكانيكية', 'RGB'],
      keywords: ['لوحة مفاتيح ألعاب', 'لوحة مفاتيح ميكانيكية', 'لوحة مفاتيح RGB'],
      availableStores: ['المتجر الرئيسي', 'المتجر الفرعي 3', 'التطبيق المحمول'],
      specifications: [
        { name: 'نوع المفاتيح', value: 'Cherry MX Blue' },
        { name: 'الإضاءة الخلفية', value: 'RGB' },
        { name: 'الاتصال', value: 'USB-C' },
      ],
      features: ['إضاءة خلفية RGB', 'مفاتيح ميكانيكية', 'وضع الألعاب'],
      benefits: ['أداء ألعاب محسن', 'بناء متين', 'إضاءة قابلة للتخصيص'],
      warranty: 'ضمان الشركة المصنعة لمدة سنة',
      warrantyPeriod: 'سنة واحدة',
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
        { name: 'نوع المفاتيح', value: 'Cherry MX Blue', type: 'text' },
        { name: 'التخطيط', value: 'حجم كامل', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 432,
      lastModified: '2024-01-12',
      image: '/api/placeholder/40/40',
      description: 'لوحة مفاتيح ميكانيكية RGB لعشاق الألعاب',
      shortDescription: 'لوحة مفاتيح ألعاب عالية الأداء مع إضاءة RGB',
      rating: 4.6,
      reviews: 78,
    },
    {
      id: 5,
      name: 'لوحة شحن لاسلكية',
      sku: 'WCP-005',
      barcode: '1234567890127',
      category: 'إلكترونيات',
      subCategory: 'ملحقات',
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
      seoTitle: 'لوحة شحن لاسلكية - PowerUp شحن لاسلكي سريع',
      seoDescription: 'لوحة شحن لاسلكية سريعة للهواتف الذكية مع مؤشر LED',
      metaKeywords: 'شحن لاسلكي, لوحة شحن, شحن سريع, هاتف ذكي',
      tags: ['لاسلكي', 'شحن', 'ملحقات', 'هاتف ذكي'],
      keywords: ['شحن لاسلكي', 'لوحة شحن', 'شحن سريع'],
      availableStores: ['المتجر الرئيسي', 'المتجر الفرعي 1', 'المتجر الفرعي 2', 'التطبيق المحمول'],
      specifications: [
        { name: 'سرعة الشحن', value: '15W' },
        { name: 'التوافق', value: 'معيار Qi' },
        { name: 'مؤشر LED', value: 'نعم' },
      ],
      features: ['شحن سريع', 'مؤشر LED', 'متوافق مع Qi'],
      benefits: ['شحن مريح', 'سرعة شحن عالية', 'توافق عالمي'],
      warranty: 'ضمان الشركة المصنعة لمدة سنة',
      warrantyPeriod: 'سنة واحدة',
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
        { name: 'اللون', value: 'أبيض', type: 'text' },
        { name: 'المادة', value: 'سيليكون', type: 'text' },
      ],
      variants: [],
      attributes: [],
      sales: 678,
      lastModified: '2024-01-11',
      image: '/api/placeholder/40/40',
      description: 'لوحة شحن لاسلكية سريعة للهواتف الذكية',
      shortDescription: 'لوحة شحن لاسلكية مريحة مع شحن سريع',
      rating: 4.3,
      reviews: 145,
    },
  ];

  const categories = ['إلكترونيات', 'أجهزة منزلية', 'ملابس', 'كتب', 'رياضة'];
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

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        setSelectedItems(productData.map((item) => item.id));
      } else {
        setSelectedItems([]);
      }
    },
    [productData],
  );

  const handleSelectItem = useCallback((itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
  }, []);

  const handleBulkAction = useCallback(
    (action) => {
      notify(`${action} المنتجات`, `${selectedItems.length} منتج`);
      setSelectedItems([]);
    },
    [selectedItems.length, notify],
  );

  const handleSort = useCallback(
    (property) => {
      const isAsc = sortBy === property && sortOrder === 'asc';
      setSortOrder(isAsc ? 'desc' : 'asc');
      setSortBy(property);
    },
    [sortBy, sortOrder],
  );

  const handleView = useCallback((product) => {
    setSelectedProduct(product);
    setViewDrawer(true);
  }, []);

  const handleEdit = useCallback((product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  }, []);

  const handleDelete = useCallback((product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  }, []);

  const handleSave = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المنتج', selectedProduct ? 'تم تحديث المنتج' : 'تم إنشاء المنتج');
    }, 1000);
  }, [selectedProduct, notify]);

  const handleDeleteConfirm = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المنتج', 'تم حذف المنتج');
    }, 1000);
  }, [notify]);

  const handleExport = useCallback(() => {
    notify('تصدير المنتجات', 'تم تصدير البيانات');
  }, [notify]);

  const handleDensityChange = useCallback((newDensity) => {
    setDensity(newDensity);
  }, []);

  const handleColumnToggle = useCallback((column) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  }, []);

  const filteredData = useMemo(() => {
    return productData.filter((item) => {
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
  }, [productData, searchTerm, statusFilter, categoryFilter, brandFilter]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
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
  }, [filteredData, sortBy, sortOrder]);

  const getStockStatus = useCallback((stock) => {
    if (stock === 0) return { color: 'error', label: 'نفد من المخزون' };
    if (stock < 10) return { color: 'warning', label: 'مخزون منخفض' };
    return { color: 'success', label: 'متوفر' };
  }, []);

  const getDensityProps = useCallback(() => {
    switch (density) {
      case 'compact':
        return { size: 'small' };
      case 'comfortable':
        return { size: 'medium' };
      default:
        return { size: 'small' };
    }
  }, [density]);

  return (
    <PageContainer
      title="إدارة المنتجات"
      description="إدارة كتالوج المنتجات والمخزون بطريقة شاملة ومتطورة"
    >
      <Breadcrumb title="إدارة المنتجات" items={BCrumb} />

      <Box>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <InventoryIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {productData.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      إجمالي المنتجات
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.success.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.success.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <TrendingUpIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {productData.filter((p) => p.status === 'active').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      المنتجات النشطة
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.warning.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.warning.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <TrendingDownIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {productData.filter((p) => p.stock > 0 && p.stock < 10).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      مخزون منخفض
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.error.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.error.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        color: theme.palette.error.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <TrendingDownIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {productData.filter((p) => p.stock === 0).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      نفد من المخزون
                    </Typography>
                  </Box>
                </Box>
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
                onClick={() =>
                  handleDensityChange(density === 'compact' ? 'comfortable' : 'compact')
                }
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
                        checked={
                          selectedItems.length === sortedData.length && sortedData.length > 0
                        }
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
                    <ListItemText
                      primary="الشركة المصنعة"
                      secondary={selectedProduct.manufacturer}
                    />
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
                    <ListItemText
                      primary="الحد الأدنى للمخزون"
                      secondary={selectedProduct.minStock}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="الحد الأقصى للمخزون"
                      secondary={selectedProduct.maxStock}
                    />
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
                    <ListItemText
                      primary="نقاط المكافآت"
                      secondary={selectedProduct.rewardPoints}
                    />
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
    </PageContainer>
  );
};

export default ProductList;
