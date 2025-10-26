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
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Stack,
  Switch,
  FormControlLabel,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  Autocomplete,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  Checkbox,
  FormGroup,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Home as HomeIcon,
  Inventory as InventoryIcon,
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
  NavigateNext as NavigateNextIcon,
  Image as ImageIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Discount as DiscountIcon,
  Store as StoreIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  Description as DescriptionIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Upload as UploadIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  AttachMoney as AttachMoneyIcon,
  PhotoCamera as CameraIcon,
  CloudUpload as CloudUploadIcon,
  Videocam as VideocamIcon,
} from '@mui/icons-material';

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder, label, helperText }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Check formatting states based on current selection
  const checkFormattingStates = () => {
    const textarea = document.getElementById('rich-text-editor');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    // Check if selected text has formatting tags
    setIsBold(selectedText.includes('<strong>') || selectedText.includes('</strong>'));
    setIsItalic(selectedText.includes('<em>') || selectedText.includes('</em>'));
    setIsUnderline(selectedText.includes('<u>') || selectedText.includes('</u>'));
  };

  // Update formatting states when selection changes
  useEffect(() => {
    const textarea = document.getElementById('rich-text-editor');
    if (textarea) {
      const handleSelectionChange = () => {
        setTimeout(checkFormattingStates, 10);
      };

      textarea.addEventListener('mouseup', handleSelectionChange);
      textarea.addEventListener('keyup', handleSelectionChange);
      textarea.addEventListener('selectionchange', handleSelectionChange);

      return () => {
        textarea.removeEventListener('mouseup', handleSelectionChange);
        textarea.removeEventListener('keyup', handleSelectionChange);
        textarea.removeEventListener('selectionchange', handleSelectionChange);
      };
    }
  }, [value]);

  const handleFormat = (format) => {
    const textarea = document.getElementById('rich-text-editor');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    let newText = value;

    switch (format) {
      case 'bold':
        if (selectedText) {
          if (selectedText.includes('<strong>')) {
            // Remove bold formatting
            newText =
              value.substring(0, start) +
              selectedText.replace(/<\/?strong>/g, '') +
              value.substring(end);
          } else {
            // Add bold formatting
            newText =
              value.substring(0, start) + `<strong>${selectedText}</strong>` + value.substring(end);
          }
        } else {
          newText = value + '<strong></strong>';
        }
        setIsBold(!isBold);
        break;
      case 'italic':
        if (selectedText) {
          if (selectedText.includes('<em>')) {
            // Remove italic formatting
            newText =
              value.substring(0, start) +
              selectedText.replace(/<\/?em>/g, '') +
              value.substring(end);
          } else {
            // Add italic formatting
            newText = value.substring(0, start) + `<em>${selectedText}</em>` + value.substring(end);
          }
        } else {
          newText = value + '<em></em>';
        }
        setIsItalic(!isItalic);
        break;
      case 'underline':
        if (selectedText) {
          if (selectedText.includes('<u>')) {
            // Remove underline formatting
            newText =
              value.substring(0, start) +
              selectedText.replace(/<\/?u>/g, '') +
              value.substring(end);
          } else {
            // Add underline formatting
            newText = value.substring(0, start) + `<u>${selectedText}</u>` + value.substring(end);
          }
        } else {
          newText = value + '<u></u>';
        }
        setIsUnderline(!isUnderline);
        break;
      case 'list':
        const lines = value.split('\n');
        const newLines = lines.map((line) => (line.trim() ? `• ${line}` : line));
        newText = newLines.join('\n');
        break;
      case 'numberList':
        const numberedLines = value.split('\n');
        const numberedNewLines = numberedLines.map((line, index) =>
          line.trim() ? `${index + 1}. ${line}` : line,
        );
        newText = numberedNewLines.join('\n');
        break;
      case 'link':
        const url = prompt('أدخل عنوان URL:');
        if (url) {
          newText =
            value.substring(0, start) +
            `[${selectedText || 'Link'}](${url})` +
            value.substring(end);
        }
        break;
      case 'image':
        const imageUrl = prompt('أدخل عنوان الصورة:');
        if (imageUrl) {
          newText =
            value.substring(0, start) +
            `![${selectedText || 'الصورة'}](${imageUrl})` +
            value.substring(end);
        }
        break;
      case 'table':
        const table = `| العنوان 1 | العنوان 2 | العنوان 3 |
|----------|----------|----------|
| الخلية 1   | الخلية 2   | الخلية 3   |
| الخلية 4   | الخلية 5   | الخلية 6   |`;
        newText = value + (value ? '\n\n' : '') + table;
        break;
      case 'clear':
        newText = value
          .replace(/<[^>]*>/g, '')
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1');
        break;
      default:
        return;
    }

    onChange(newText);

    // Refocus textarea
    setTimeout(() => {
      textarea.focus();
      if (format !== 'table' && format !== 'clear') {
        const offset =
          format === 'bold' ? 8 : format === 'italic' ? 4 : format === 'underline' ? 3 : 0;
        textarea.setSelectionRange(start + offset, end + offset);
      }
    }, 0);
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>

      {/* Toolbar */}
      <Paper
        elevation={1}
        sx={{
          p: 1,
          mb: 1,
          display: 'flex',
          gap: 0.5,
          flexWrap: 'wrap',
          border: '1px solid',
          borderColor: 'divider',
          alignItems: 'center',
        }}
      >
        {/* Help Button */}
        <Tooltip title="المساعدة">
          <IconButton size="small" sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="body2">?</Typography>
          </IconButton>
        </Tooltip>

        {/* Source Code Button */}
        <Tooltip title="الكود المصدري">
          <IconButton size="small" sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="body2">&lt;/&gt;</Typography>
          </IconButton>
        </Tooltip>

        {/* Maximize Button */}
        <Tooltip title="تكبير">
          <IconButton size="small" sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="body2">⤢</Typography>
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Image Button */}
        <Tooltip title="إدخال الصورة">
          <IconButton
            size="small"
            onClick={() => handleFormat('image')}
            sx={{ '&:hover': { bgcolor: 'action.hover' } }}
          >
            <ImageIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Link Button */}
        <Tooltip title="إدخال الرابط">
          <IconButton
            size="small"
            onClick={() => handleFormat('link')}
            sx={{ '&:hover': { bgcolor: 'action.hover' } }}
          >
            <Typography variant="body2">🔗</Typography>
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Table Button */}
        <Tooltip title="إدخال الجدول">
          <IconButton
            size="small"
            onClick={() => handleFormat('table')}
            sx={{ '&:hover': { bgcolor: 'action.hover' } }}
          >
            <Typography variant="body2">⊞</Typography>
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* List Buttons */}
        <Tooltip title="قائمة العلامات">
          <IconButton
            size="small"
            onClick={() => handleFormat('list')}
            sx={{ '&:hover': { bgcolor: 'action.hover' } }}
          >
            <Typography variant="body2">•</Typography>
          </IconButton>
        </Tooltip>

        <Tooltip title="قائمة الأرقام">
          <IconButton
            size="small"
            onClick={() => handleFormat('numberList')}
            sx={{ '&:hover': { bgcolor: 'action.hover' } }}
          >
            <Typography variant="body2">1.</Typography>
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Formatting Buttons */}
        <Tooltip title="Bold">
          <IconButton
            size="small"
            onClick={() => handleFormat('bold')}
            sx={{
              bgcolor: isBold ? 'action.selected' : 'transparent',
              border: isBold ? '1px solid' : '1px solid transparent',
              borderColor: isBold ? 'primary.main' : 'transparent',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              B
            </Typography>
          </IconButton>
        </Tooltip>

        <Tooltip title="ميل">
          <IconButton
            size="small"
            onClick={() => handleFormat('italic')}
            sx={{
              bgcolor: isItalic ? 'action.selected' : 'transparent',
              border: isItalic ? '1px solid' : '1px solid transparent',
              borderColor: isItalic ? 'primary.main' : 'transparent',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              I
            </Typography>
          </IconButton>
        </Tooltip>

        <Tooltip title="تسطير">
          <IconButton
            size="small"
            onClick={() => handleFormat('underline')}
            sx={{
              bgcolor: isUnderline ? 'action.selected' : 'transparent',
              border: isUnderline ? '1px solid' : '1px solid transparent',
              borderColor: isUnderline ? 'primary.main' : 'transparent',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
              U
            </Typography>
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Clear Formatting */}
        <Tooltip title="مسح التنسيق">
          <IconButton
            size="small"
            onClick={() => handleFormat('clear')}
            sx={{ '&:hover': { bgcolor: 'action.hover' } }}
          >
            <Typography variant="body2">✨</Typography>
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Text Area */}
      <Box sx={{ position: 'relative' }}>
        <TextField
          id="rich-text-editor"
          fullWidth
          multiline
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: 1.5,
              resize: 'vertical',
              minHeight: '150px',
            },
          }}
        />

        {/* Resize Handle */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'nw-resize',
            opacity: 0.6,
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '12px' }}>
            ⋮
          </Typography>
        </Box>
      </Box>

      {helperText && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ar');
  const [languageTabs, setLanguageTabs] = useState(['en']);

  // Stats data
  const productStats = [
    {
      title: 'المنتجات الكلية',
      value: '1,247',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: InventoryIcon,
      change: '+12',
    },
    {
      title: 'المنتجات النشطة',
      value: '1,156',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '92.7%',
    },
    {
      title: 'الإيرادات الكلية',
      value: '45,678 ر.س',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: AttachMoneyIcon,
      change: '+8.2%',
    },
    {
      title: 'التقييم المتوسط',
      value: '4.3',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: StarIcon,
      change: 'ممتاز',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح', severity: 'success' });
    }, 1000);
  };

  const [formData, setFormData] = useState({
    // Basic Information
    name: {
      en: '',
      ar: '',
    },
    sku: '',
    barcode: '',
    description: {
      en: '',
      ar: '',
    },
    shortDescription: {
      en: '',
      ar: '',
    },
    mainCategory: '',
    subCategory: '',
    categoryDescription: '',
    brand: '',
    model: '',

    // Pricing
    cost: '', // سعر التكلفة (سعر الشراء) - من ERP
    wholesalePrice: '', // الجملة (الحد الأدنى للبيع) - من ERP
    storeCostPrice: '', // سعر تكلفة المتجر (سعر اقتراح البيع) - يظهر في الرئيسي
    branchPrice: '', // سعر بيع المتجر الفرعي - يظهر في الفرعي
    comparePrice: '',
    discount: '',
    discountType: 'percentage', // percentage or fixed
    discountStartDate: '',
    discountEndDate: '',

    // Inventory
    stock: '',
    minStock: '',
    maxStock: '',
    mainStoreStock: '',
    suppliersStock: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    unit: 'piece', // piece, kg, liter, etc.

    // Status & Visibility
    availability: 'available', // available, unavailable
    productStatus: 'new', // new, just_arrived, available, best_selling, most_requested (for available)
    unavailableReason: '', // unavailable, 1-3_days, 1-7_days, 1-15_days, pre_order, disabled (for unavailable)
    visibility: 'public', // public, private, hidden
    featured: false,
    digital: false,
    downloadable: false,
    requiresShipping: true,

    // SEO & Marketing
    seoTitle: {
      en: '',
      ar: '',
    },
    seoDescription: {
      en: '',
      ar: '',
    },
    metaKeywords: '',
    metaTags: [],
    tags: [],
    keywords: [],

    // Stores & Availability
    availableStores: [],
    storeSpecificPricing: {},
    storeSpecificStock: {},

    // Product Specifications
    specifications: [],
    features: [],
    benefits: [],
    warranty: '',
    warrantyPeriod: '',
    warrantyType: '',

    // Image Properties
    imageProperties: {
      required: false, // إجبارية أو اختيارية
      minImages: 1, // الحد الأدنى للصور
      maxImages: 10, // الحد الأقصى للصور
      allowedFormats: ['jpg', 'jpeg', 'png', 'webp'], // الصيغ المسموحة
      maxFileSize: 5, // الحد الأقصى لحجم الملف (MB)
      seoEnabled: false, // تفعيل SEO للصور
    },

    // Offers & Promotions
    specialOffers: [],
    bundleOffers: [],
    crossSellProducts: [],
    upSellProducts: [],

    // Rewards & Loyalty
    rewardPoints: 0,
    loyaltyProgram: false,
    loyaltyMultiplier: 1,

    // Images & Media
    images: [],
    videos: [],
    documents: [],

    // Shipping & Delivery
    shippingClass: '',
    shippingWeight: '',
    shippingDimensions: { length: '', width: '', height: '' },
    freeShipping: false,
    shippingCost: '',

    // Tax & Compliance
    taxClass: '',
    taxRate: '',
    taxable: true,

    // Advanced Settings
    requiresApproval: false,
    approvalStatus: 'pending',
    customFields: [],
    variants: [],
    attributes: [],
  });

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleLanguageInputChange = (field, language) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [language]: value,
      },
    }));
  };

  const addLanguage = (language) => {
    if (!languageTabs.includes(language)) {
      setLanguageTabs((prev) => [...prev, language]);
      setSelectedLanguage(language);
    }
  };

  const removeLanguage = (language) => {
    if (languageTabs.length > 1 && language !== 'en') {
      setLanguageTabs((prev) => prev.filter((lang) => lang !== language));
      if (selectedLanguage === language) {
        setSelectedLanguage('en');
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);

    // توليد باركود تلقائي عند تحميل الصفحة
    if (!formData.barcode) {
      const autoBarcode =
        'BC' +
        Date.now().toString().slice(-8) +
        Math.random().toString(36).substring(2, 6).toUpperCase();
      setFormData((prev) => ({ ...prev, barcode: autoBarcode }));
    }
  }, []);

  const handleSave = (status) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: `تم إنشاء المنتج ${status} بنجاح`,
        severity: 'success',
      });
    }, 1000);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
              إنشاء منتج جديد
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              أضف منتج جديد إلى كتالوجك مع التفاصيل الشاملة
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link
                color="inherit"
                href="/main-store"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/main-store/catalog">
                الكتالوج
              </Link>
              <Link color="inherit" href="/main-store/catalog/products/list">
                المنتجات
              </Link>
              <Typography color="text.primary">إنشاء منتج</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            {/* Language Selector */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>اللغة</InputLabel>
              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                label="اللغة"
              >
                <MenuItem value="ar">العربية</MenuItem>
                <MenuItem value="en">الإنجليزية</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => window.history.back()}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'جاري الحفظ...' : 'حفظ المنتج'}
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
                    <InventoryIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  1,247
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  المنتجات الكلية
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
                  1,156
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, mr: 2 }}>
                    <LockIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  91
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  المنتجات المسودة
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
                    <TrendingUpIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  24
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  الفئات
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="عام" icon={<SettingsIcon />} />
                <Tab label="التسعير" icon={<MoneyIcon />} />
                <Tab label="المخزون" icon={<InventoryIcon />} />
                <Tab label="خيارات المنتج" icon={<DescriptionIcon />} />
                <Tab label="العروض والترويج" icon={<DiscountIcon />} />
                <Tab label="المتاجر والتوفر" icon={<StoreIcon />} />
                <Tab label="الوسائط والملفات" icon={<ImageIcon />} />
              </Tabs>
            </Box>

            {/* General Tab */}
            {activeTab === 0 && (
              <Grid container spacing={3}>
                {/* Product Main Image */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <ImageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    الصورة الأساسية للمنتج
                  </Typography>
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 4,
                      border: 2,
                      borderStyle: 'dashed',
                      borderRadius: 2,
                      borderColor: 'primary.main',
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
                    <Typography variant="h6" gutterBottom>
                      رفع الصورة الأساسية للمنتج
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      اسحب وأفلت الصورة هنا أو انقر للتصفح
                    </Typography>
                    <Button variant="contained" startIcon={<UploadIcon />} sx={{ mr: 2 }}>
                      رفع الصورة
                    </Button>
                    <Button variant="outlined" startIcon={<CameraIcon />}>
                      التقط صورة
                    </Button>
                  </Box>
                </Grid>

                {/* Language Tabs */}
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                      value={selectedLanguage === 'ar' ? 0 : 1}
                      onChange={(event, newValue) => {
                        setSelectedLanguage(newValue === 0 ? 'ar' : 'en');
                      }}
                      variant="fullWidth"
                    >
                      <Tab label="العربية" />
                      <Tab label="English" />
                    </Tabs>
                  </Box>
                </Grid>

                {/* Product Name */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label={`اسم المنتج (${selectedLanguage === 'en' ? 'English' : 'العربية'})`}
                    value={formData.name[selectedLanguage] || ''}
                    onChange={handleLanguageInputChange('name', selectedLanguage)}
                    placeholder={
                      selectedLanguage === 'en' ? 'Enter product name' : 'أدخل اسم المنتج'
                    }
                    required
                    helperText={
                      selectedLanguage === 'en'
                        ? 'The main product name that will be displayed to customers'
                        : 'الاسم الرئيسي للمنتج الذي سيظهر للعملاء'
                    }
                    dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                  />
                </Grid>

                {/* SKU */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="رمز المنتج"
                    value={formData.sku}
                    onChange={handleInputChange('sku')}
                    placeholder="Enter SKU"
                    required
                    helperText="رمز التخزين - معرف فريد"
                  />
                </Grid>

                {/* Main Category */}
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>القسم الرئيسي</InputLabel>
                    <Select
                      value={formData.mainCategory}
                      label="القسم الرئيسي"
                      onChange={handleInputChange('mainCategory')}
                    >
                      <MenuItem value="electronics">الإلكترونيات</MenuItem>
                      <MenuItem value="clothing">الملابس</MenuItem>
                      <MenuItem value="home">المنزل والحديقة</MenuItem>
                      <MenuItem value="sports">الرياضة والترفيه</MenuItem>
                      <MenuItem value="books">الكتب</MenuItem>
                      <MenuItem value="beauty">الجمال والصحة</MenuItem>
                      <MenuItem value="automotive">السيارات</MenuItem>
                      <MenuItem value="toys">الألعاب والألعاب</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Sub Category */}
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>القسم الفرعي</InputLabel>
                    <Select
                      value={formData.subCategory}
                      label="القسم الفرعي"
                      onChange={handleInputChange('subCategory')}
                    >
                      <MenuItem value="">اختر القسم الفرعي</MenuItem>
                      <MenuItem value="smartphones">الهواتف الذكية</MenuItem>
                      <MenuItem value="laptops">الكمبيوترات</MenuItem>
                      <MenuItem value="accessories">الملحقات</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Category Description */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="وصف الأقسام"
                    value={formData.categoryDescription}
                    onChange={handleInputChange('categoryDescription')}
                    placeholder="أدخل وصف للأقسام المختارة"
                    helperText="وصف تفصيلي للأقسام المختارة للمنتج"
                  />
                </Grid>

                {/* Brand */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="العلامة التجارية"
                    value={formData.brand}
                    onChange={handleInputChange('brand')}
                    placeholder="أدخل اسم العلامة التجارية"
                  />
                </Grid>

                {/* Model */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الموديل"
                    value={formData.model}
                    onChange={handleInputChange('model')}
                    placeholder="أدخل رقم الموديل"
                  />
                </Grid>

                {/* Barcode */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الباركود"
                    value={formData.barcode}
                    onChange={handleInputChange('barcode')}
                    placeholder="سيتم توليد الباركود تلقائياً"
                    helperText="باركود المنتج للمسح الضوئي"
                    InputProps={{
                      endAdornment: (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<RefreshIcon />}
                          onClick={() => {
                            // توليد باركود حسب الفئات
                            const generateBarcode = () => {
                              // القسم الرئيسي - 3 أرقام
                              const mainCategoryCode = formData.mainCategory ? 
                                String(formData.mainCategory).padStart(3, '0') : '001';
                              
                              // القسم الفرعي - 3 أرقام  
                              const subCategoryCode = formData.subCategory ? 
                                String(formData.subCategory).padStart(3, '0') : '001';
                              
                              // العلامة التجارية - 5 أرقام
                              const brandCode = formData.brand ? 
                                String(formData.brand).padStart(5, '0') : '00001';
                              
                              // الموديل - 4 أرقام
                              const modelCode = formData.model ? 
                                String(formData.model).padStart(4, '0') : '0001';
                              
                              return `${mainCategoryCode}-${subCategoryCode}-${brandCode}-${modelCode}`;
                            };
                            
                            const newBarcode = generateBarcode();
                            setFormData({ ...formData, barcode: newBarcode });
                          }}
                          sx={{ ml: 1 }}
                        >
                          توليد
                        </Button>
                      ),
                    }}
                  />
                </Grid>

                {/* Short Description */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label={`وصف قصير للمنتج (${selectedLanguage === 'en' ? 'English' : 'العربية'})`}
                    value={formData.shortDescription[selectedLanguage] || ''}
                    onChange={handleLanguageInputChange('shortDescription', selectedLanguage)}
                    placeholder={
                      selectedLanguage === 'en'
                        ? 'Brief product description (appears in product listings)'
                        : 'وصف مختصر للمنتج (يظهر في قوائم المنتجات)'
                    }
                    helperText={
                      selectedLanguage === 'en'
                        ? 'This will be shown in product cards and search results'
                        : 'سيظهر هذا في بطاقات المنتج ونتائج البحث'
                    }
                    dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                  />
                </Grid>

                {/* Full Description */}
                <Grid size={{ xs: 12 }}>
                  <RichTextEditor
                    value={formData.description[selectedLanguage] || ''}
                    onChange={(value) => {
                      const event = { target: { value } };
                      handleLanguageInputChange('description', selectedLanguage)(event);
                    }}
                    placeholder={
                      selectedLanguage === 'en' ? 'Detailed product description' : 'وصف مفصل للمنتج'
                    }
                    label={`وصف كامل للمنتج (${selectedLanguage === 'en' ? 'English' : 'العربية'})`}
                    helperText={
                      selectedLanguage === 'en'
                        ? 'Complete product description with all details and features'
                        : 'وصف كامل للمنتج مع جميع التفاصيل والمميزات'
                    }
                  />
                </Grid>

                {/* SEO Section */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    إعدادات SEO
                  </Typography>
                </Grid>

                {/* SEO Description */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label={`وصف SEO (${selectedLanguage === 'en' ? 'English' : 'العربية'})`}
                    value={formData.seoDescription[selectedLanguage] || ''}
                    onChange={handleLanguageInputChange('seoDescription', selectedLanguage)}
                    placeholder={
                      selectedLanguage === 'en'
                        ? 'SEO description for search engines (150-160 characters)'
                        : 'وصف SEO لمحركات البحث (150-160 حرف)'
                    }
                    helperText={`${
                      (formData.seoDescription[selectedLanguage] || '').length
                    }/160 characters`}
                    inputProps={{ maxLength: 160 }}
                    dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                  />
                </Grid>

                {/* Meta Tag Title */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label={`ميتا تاج المنتج (${selectedLanguage === 'en' ? 'English' : 'العربية'})`}
                    value={formData.seoTitle[selectedLanguage] || ''}
                    onChange={handleLanguageInputChange('seoTitle', selectedLanguage)}
                    placeholder={
                      selectedLanguage === 'en'
                        ? 'SEO optimized title (50-60 characters)'
                        : 'عنوان محسن لمحركات البحث (50-60 حرف)'
                    }
                    helperText={`${(formData.seoTitle[selectedLanguage] || '').length}/60 كلمة`}
                    inputProps={{ maxLength: 60 }}
                    dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                  />
                </Grid>

                {/* Meta Tag Description */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label={`وصف ميتا تاج المنتج (${selectedLanguage === 'en' ? 'English' : 'العربية'})`}
                    value={formData.seoDescription[selectedLanguage] || ''}
                    onChange={handleLanguageInputChange('seoDescription', selectedLanguage)}
                    placeholder={
                      selectedLanguage === 'en'
                        ? 'Meta description for search engines (150-160 characters)'
                        : 'وصف ميتا لمحركات البحث (150-160 حرف)'
                    }
                    helperText={`${
                      (formData.seoDescription[selectedLanguage] || '').length
                    }/160 characters`}
                    inputProps={{ maxLength: 160 }}
                    dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                  />
                </Grid>

                {/* Keywords */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الكلمات الدليلية"
                    value={formData.metaKeywords}
                    onChange={handleInputChange('metaKeywords')}
                    placeholder="أدخل الكلمات الدليلية مفصولة بفواصل"
                    helperText="الكلمات الدليلية لتحسين محركات البحث"
                  />
                </Grid>

                {/* Product Availability */}
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>توفر المنتج</InputLabel>
                    <Select
                      value={formData.availability}
                      label="توفر المنتج"
                      onChange={handleInputChange('availability')}
                    >
                      <MenuItem value="available">متوفر</MenuItem>
                      <MenuItem value="unavailable">غير متوفر</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Product Status - Available */}
                {formData.availability === 'available' && (
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel>حالة المنتج المتوفر</InputLabel>
                      <Select
                        value={formData.productStatus}
                        label="حالة المنتج المتوفر"
                        onChange={handleInputChange('productStatus')}
                      >
                        <MenuItem value="new">جديد</MenuItem>
                        <MenuItem value="just_arrived">وصل حديثاً</MenuItem>
                        <MenuItem value="available">متوفر</MenuItem>
                        <MenuItem value="best_selling">الأكثر مبيعاً</MenuItem>
                        <MenuItem value="most_requested">الأكثر طلباً</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {/* Unavailable Reason - Unavailable */}
                {formData.availability === 'unavailable' && (
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel>سبب عدم التوفر</InputLabel>
                      <Select
                        value={formData.unavailableReason}
                        label="سبب عدم التوفر"
                        onChange={handleInputChange('unavailableReason')}
                      >
                        <MenuItem value="unavailable">غير متوفر</MenuItem>
                        <MenuItem value="1-3_days">من 1 - 3 أيام</MenuItem>
                        <MenuItem value="1-7_days">من 1 - 7 أيام</MenuItem>
                        <MenuItem value="1-15_days">من 1 - 15 يوم</MenuItem>
                        <MenuItem value="pre_order">حجز مسبق</MenuItem>
                        <MenuItem value="disabled">تعطيل</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {/* Visibility */}
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>الرؤية</InputLabel>
                    <Select
                      value={formData.visibility}
                      label="الرؤية"
                      onChange={handleInputChange('visibility')}
                    >
                      <MenuItem value="public">عمومي</MenuItem>
                      <MenuItem value="private">خاص</MenuItem>
                      <MenuItem value="hidden">مخفي</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Product Type Switches */}
                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      إعدادات نوع المنتج
                    </Typography>
                    <Stack direction="row" spacing={4} flexWrap="wrap">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.featured}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                            }
                          />
                        }
                        label="منتج مميز"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.digital}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, digital: e.target.checked }))
                            }
                          />
                        }
                        label="منتج رقمي"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.downloadable}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, downloadable: e.target.checked }))
                            }
                          />
                        }
                        label="قابل للتحميل"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.requiresShipping}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                requiresShipping: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="يتطلب شحن"
                      />
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* Pricing Tab */}
            {activeTab === 1 && (
              <Grid container spacing={3}>
                {/* ERP Pricing */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <MoneyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    التسعير من نظام ERP
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر التكلفة (سعر الشراء)"
                    value={formData.cost}
                    onChange={handleInputChange('cost')}
                    placeholder="0.00"
                    helperText="سعر الشراء من المورد"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر الجملة (الحد الأدنى للبيع)"
                    value={formData.wholesalePrice}
                    onChange={handleInputChange('wholesalePrice')}
                    placeholder="0.00"
                    helperText="الحد الأدني للبيع"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                    }}
                  />
                </Grid>

                {/* Store Pricing */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    <StoreIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    تسعير المتاجر
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر تكلفة المتجر (سعر اقتراح البيع)"
                    value={formData.storeCostPrice}
                    onChange={handleInputChange('storeCostPrice')}
                    placeholder="0.00"
                    required
                    helperText="سعر اقتراح البيع - يظهر في المتجر الرئيسي"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر بيع المتجر الفرعي"
                    value={formData.branchPrice}
                    onChange={handleInputChange('branchPrice')}
                    placeholder="0.00"
                    helperText="سعر البيع في المتجر الفرعي - يحدده الفرعي"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر المقارنة"
                    value={formData.comparePrice}
                    onChange={handleInputChange('comparePrice')}
                    placeholder="0.00"
                    helperText="سعر المقارنة الذي سيظهر في المنتج"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                    }}
                  />
                </Grid>

                {/* Discount Settings */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    <DiscountIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    إعدادات الخصم
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label={formData.discountType === 'percentage' ? 'نسبة الخصم (%)' : 'مبلغ الخصم (ر.س)'}
                    value={formData.discount}
                    onChange={handleInputChange('discount')}
                    placeholder="0"
                    helperText={
                      formData.discountType === 'percentage'
                        ? 'نسبة الخصم المئوية (مثال: 10 لخصم 10%)'
                        : 'مبلغ الخصم بالريال السعودي (مثال: 50 لخصم 50 ر.س)'
                    }
                    InputProps={{
                      endAdornment:
                        formData.discountType === 'percentage' ? (
                          <Typography sx={{ ml: 1 }}>%</Typography>
                        ) : (
                          <Typography sx={{ ml: 1 }}>ر.س</Typography>
                        ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>نوع الخصم</InputLabel>
                    <Select
                      value={formData.discountType}
                      label="نوع الخصم"
                      onChange={handleInputChange('discountType')}
                    >
                      <MenuItem value="percentage">نسبة مئوية (%)</MenuItem>
                      <MenuItem value="fixed">مبلغ ثابت (ر.س)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="تاريخ بدء الخصم"
                    value={formData.discountStartDate}
                    onChange={handleInputChange('discountStartDate')}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="تاريخ إنتهاء الخصم"
                    value={formData.discountEndDate}
                    onChange={handleInputChange('discountEndDate')}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Profit Calculation Display */}
                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      تحليل الربح والأسعار
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          هامش الربح الرئيسي:
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {formData.storeCostPrice && formData.cost
                            ? `${(
                                ((parseFloat(formData.storeCostPrice) - parseFloat(formData.cost)) /
                                  parseFloat(formData.storeCostPrice)) *
                                100
                              ).toFixed(2)}%`
                            : '0%'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          ربح المتجر الرئيسي:
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {formData.storeCostPrice && formData.cost
                            ? `${(
                                parseFloat(formData.storeCostPrice) - parseFloat(formData.cost)
                              ).toFixed(2)} ر.س`
                            : '0.00 ر.س'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          ربح المتجر الفرعي:
                        </Typography>
                        <Typography variant="h6" color="info.main">
                          {formData.branchPrice && formData.cost
                            ? `${(
                                parseFloat(formData.branchPrice) - parseFloat(formData.cost)
                              ).toFixed(2)} ر.س`
                            : '0.00 ر.س'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          الفرق بين المتاجر:
                        </Typography>
                        <Typography variant="h6" color="warning.main">
                          {formData.branchPrice && formData.storeCostPrice
                            ? `${(
                                parseFloat(formData.branchPrice) -
                                parseFloat(formData.storeCostPrice)
                              ).toFixed(2)} ر.س`
                            : '0.00 ر.س'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* Inventory Tab */}
            {activeTab === 2 && (
              <Grid container spacing={3}>
                {/* Stock Management */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <InventoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    إدارة المخزون
                  </Typography>
                </Grid>

                {/* Main Store Stock */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="الكمية في المخزن الرئيسي"
                    value={formData.mainStoreStock}
                    onChange={handleInputChange('mainStoreStock')}
                    placeholder="0"
                    helperText="الكمية المتاحة في المخزن الرئيسي"
                  />
                </Grid>

                {/* Suppliers Stock */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="الكمية في مخزن الموردين"
                    value={formData.suppliersStock}
                    onChange={handleInputChange('suppliersStock')}
                    placeholder="0"
                    helperText="الكمية المتاحة في مخزن الموردين"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="المخزون الأدنى"
                    value={formData.minStock}
                    onChange={handleInputChange('minStock')}
                    placeholder="0"
                    helperText="الحد الأدنى للتنبيه بالمخزون"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="المخزون الأقصى"
                    value={formData.maxStock}
                    onChange={handleInputChange('maxStock')}
                    placeholder="0"
                    helperText="الحد الأقصى للمخزون المسموح به"
                  />
                </Grid>

                {/* Physical Properties */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    الخصائص الفيزيائية
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الوزن"
                    value={formData.weight}
                    onChange={handleInputChange('weight')}
                    placeholder="0.0"
                    helperText="وزن المنتج لحساب الشحن"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>kg</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>وحدة القياس</InputLabel>
                    <Select
                      value={formData.unit}
                      label="وحدة القياس"
                      onChange={handleInputChange('unit')}
                    >
                      <MenuItem value="piece">قطعة</MenuItem>
                      <MenuItem value="kg">كيلوجرام</MenuItem>
                      <MenuItem value="g">جرام</MenuItem>
                      <MenuItem value="liter">لتر</MenuItem>
                      <MenuItem value="ml">مليلتر</MenuItem>
                      <MenuItem value="meter">متر</MenuItem>
                      <MenuItem value="cm">سنتيمتر</MenuItem>
                      <MenuItem value="box">علبة</MenuItem>
                      <MenuItem value="pack">حزمة</MenuItem>
                      <MenuItem value="set">مجموعة</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Dimensions */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    الأبعاد الفيزيائية
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الطول"
                    value={formData.dimensions.length}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dimensions: { ...prev.dimensions, length: e.target.value },
                      }))
                    }
                    placeholder="0"
                    helperText="الطول بالسنتيمتر"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>cm</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="العرض"
                    value={formData.dimensions.width}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dimensions: { ...prev.dimensions, width: e.target.value },
                      }))
                    }
                    placeholder="0"
                    helperText="العرض بالسنتيمتر"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>cm</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الإرتفاع"
                    value={formData.dimensions.height}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dimensions: { ...prev.dimensions, height: e.target.value },
                      }))
                    }
                    placeholder="0"
                    helperText="الإرتفاع بالسنتيمتر"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>cm</Typography>,
                    }}
                  />
                </Grid>


                {/* Stock Alerts */}
                <Grid size={{ xs: 12 }}>
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>تنبيه المخزون:</strong> سيتم إعلامك عندما ينخفض المخزون أدنى الحد
                      الأدنى.
                      {formData.stock &&
                        formData.minStock &&
                        parseFloat(formData.stock) <= parseFloat(formData.minStock) && (
                          <Typography sx={{ mt: 1 }}>
                            ⚠️ المخزون الحالي هو أو أدنى الحد الأدنى!
                          </Typography>
                        )}
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            )}


            {/* Specifications Tab */}
            {activeTab === 3 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    خيارات المنتج
                  </Typography>
                </Grid>

                {/* Features */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    الميزات الرئيسية
                  </Typography>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={formData.features}
                    onChange={(event, newValue) => {
                      setFormData((prev) => ({ ...prev, features: newValue }));
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="الميزات الرئيسية"
                        placeholder="أضف الميزات الرئيسية..."
                        helperText="الميزات الرئيسية والفوائد للمنتج"
                      />
                    )}
                  />
                </Grid>

                {/* Benefits */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    فوائد العملاء
                  </Typography>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={formData.benefits}
                    onChange={(event, newValue) => {
                      setFormData((prev) => ({ ...prev, benefits: newValue }));
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="فوائد العملاء"
                        placeholder="أضف الفوائد..."
                        helperText="ما هي الفوائد التي يقدمها هذا المنتج للعملاء؟"
                      />
                    )}
                  />
                </Grid>

                {/* Warranty */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    معلومات الضمان
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="وصف الضمان"
                    value={formData.warranty}
                    onChange={handleInputChange('warranty')}
                    placeholder="تفاصيل الضمان..."
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="فترة الضمان"
                    value={formData.warrantyPeriod}
                    onChange={handleInputChange('warrantyPeriod')}
                    placeholder="مثلا, 1 سنة, 2 سنة"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>نوع الضمان</InputLabel>
                    <Select
                      value={formData.warrantyType}
                      label="نوع الضمان"
                      onChange={handleInputChange('warrantyType')}
                    >
                      <MenuItem value="manufacturer">المصنع</MenuItem>
                      <MenuItem value="seller">البائع</MenuItem>
                      <MenuItem value="extended">ممتد</MenuItem>
                      <MenuItem value="none">بدون ضمان</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Image Properties */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    <ImageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    خصائص الصور
                  </Typography>
                </Grid>

                {/* Image Requirements */}
                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      متطلبات الصور
                    </Typography>
                    <Stack direction="row" spacing={4} flexWrap="wrap" sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.imageProperties.required}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                imageProperties: { ...prev.imageProperties, required: e.target.checked },
                              }))
                            }
                          />
                        }
                        label="الصور إجبارية"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.imageProperties.seoEnabled}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                imageProperties: { ...prev.imageProperties, seoEnabled: e.target.checked },
                              }))
                            }
                          />
                        }
                        label="تفعيل SEO للصور"
                      />
                    </Stack>
                  </Card>
                </Grid>

                {/* Image Settings */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="الحد الأدنى للصور"
                    value={formData.imageProperties.minImages}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        imageProperties: { ...prev.imageProperties, minImages: parseInt(e.target.value) },
                      }))
                    }
                    placeholder="1"
                    helperText="الحد الأدنى المطلوب من الصور"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="الحد الأقصى للصور"
                    value={formData.imageProperties.maxImages}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        imageProperties: { ...prev.imageProperties, maxImages: parseInt(e.target.value) },
                      }))
                    }
                    placeholder="10"
                    helperText="الحد الأقصى المسموح من الصور"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="الحد الأقصى لحجم الملف (MB)"
                    value={formData.imageProperties.maxFileSize}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        imageProperties: { ...prev.imageProperties, maxFileSize: parseInt(e.target.value) },
                      }))
                    }
                    placeholder="5"
                    helperText="الحد الأقصى لحجم كل صورة"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="الصيغ المسموحة"
                    value={formData.imageProperties.allowedFormats.join(', ')}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        imageProperties: { ...prev.imageProperties, allowedFormats: e.target.value.split(', ') },
                      }))
                    }
                    placeholder="jpg, jpeg, png, webp"
                    helperText="الصيغ المسموحة للصور (مفصولة بفواصل)"
                  />
                </Grid>

                {/* SEO for Images */}
                {formData.imageProperties.seoEnabled && (
                  <Grid size={{ xs: 12 }}>
                    <Card sx={{ p: 2, bgcolor: 'primary.50' }}>
                      <Typography variant="h6" gutterBottom>
                        <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        إعدادات SEO للصور
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        عند تفعيل SEO للصور، سيتم إضافة النصوص البديلة والوصف للصور تلقائياً
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Chip label="Alt Text" color="primary" />
                        <Chip label="Title Attribute" color="primary" />
                        <Chip label="Caption" color="primary" />
                      </Stack>
                    </Card>
                  </Grid>
                )}

                {/* Custom Specifications */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                    مواصفات مخصصة
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const newSpec = { name: '', value: '' };
                      setFormData((prev) => ({
                        ...prev,
                        specifications: [...prev.specifications, newSpec],
                      }));
                    }}
                    sx={{ mb: 2 }}
                  >
                    إضافة خصائص
                  </Button>

                  {formData.specifications.map((spec, index) => (
                    <Card key={index} sx={{ p: 2, mb: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 5 }}>
                          <TextField
                            fullWidth
                            label="اسم الخصائص"
                            value={spec.name}
                            onChange={(e) => {
                              const newSpecs = [...formData.specifications];
                              newSpecs[index].name = e.target.value;
                              setFormData((prev) => ({ ...prev, specifications: newSpecs }));
                            }}
                            placeholder="مثلا, حجم الشاشة, المعالج"
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                          <TextField
                            fullWidth
                            label="القيمة"
                            value={spec.value}
                            onChange={(e) => {
                              const newSpecs = [...formData.specifications];
                              newSpecs[index].value = e.target.value;
                              setFormData((prev) => ({ ...prev, specifications: newSpecs }));
                            }}
                            placeholder="مثلا, 15.6 بوصة, Intel i7"
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                          <IconButton
                            color="error"
                            onClick={() => {
                              const newSpecs = formData.specifications.filter(
                                (_, i) => i !== index,
                              );
                              setFormData((prev) => ({ ...prev, specifications: newSpecs }));
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            )}

            {/* Offers & Promotions Tab */}
            {activeTab === 4 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <DiscountIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    العروض والترويجات
                  </Typography>
                </Grid>

                {/* Special Offers */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    العروض الخاصة
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const newOffer = {
                        title: '',
                        description: '',
                        discount: '',
                        startDate: '',
                        endDate: '',
                        active: false,
                      };
                      setFormData((prev) => ({
                        ...prev,
                        specialOffers: [...prev.specialOffers, newOffer],
                      }));
                    }}
                    sx={{ mb: 2 }}
                  >
                    إضافة عرض خاص
                  </Button>

                  {formData.specialOffers.map((offer, index) => (
                    <Card key={index} sx={{ p: 2, mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            fullWidth
                            label="عنوان العرض"
                            value={offer.title}
                            onChange={(e) => {
                              const newOffers = [...formData.specialOffers];
                              newOffers[index].title = e.target.value;
                              setFormData((prev) => ({ ...prev, specialOffers: newOffers }));
                            }}
                            placeholder="مثلا, عرض الصيف, الجمعة السوداء"
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            fullWidth
                            type="number"
                            label="الخصم (%)"
                            value={offer.discount}
                            onChange={(e) => {
                              const newOffers = [...formData.specialOffers];
                              newOffers[index].discount = e.target.value;
                              setFormData((prev) => ({ ...prev, specialOffers: newOffers }));
                            }}
                            placeholder="0"
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="وصف العرض"
                            value={offer.description}
                            onChange={(e) => {
                              const newOffers = [...formData.specialOffers];
                              newOffers[index].description = e.target.value;
                              setFormData((prev) => ({ ...prev, specialOffers: newOffers }));
                            }}
                            placeholder="وصف تفاصيل العرض..."
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            fullWidth
                            type="date"
                            label="تاريخ البدء"
                            value={offer.startDate}
                            onChange={(e) => {
                              const newOffers = [...formData.specialOffers];
                              newOffers[index].startDate = e.target.value;
                              setFormData((prev) => ({ ...prev, specialOffers: newOffers }));
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            fullWidth
                            type="date"
                            label="تاريخ الانتهاء"
                            value={offer.endDate}
                            onChange={(e) => {
                              const newOffers = [...formData.specialOffers];
                              newOffers[index].endDate = e.target.value;
                              setFormData((prev) => ({ ...prev, specialOffers: newOffers }));
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={offer.active}
                                  onChange={(e) => {
                                    const newOffers = [...formData.specialOffers];
                                    newOffers[index].active = e.target.checked;
                                    setFormData((prev) => ({ ...prev, specialOffers: newOffers }));
                                  }}
                                />
                              }
                              label="العرض النشط"
                            />
                            <IconButton
                              color="error"
                              onClick={() => {
                                const newOffers = formData.specialOffers.filter(
                                  (_, i) => i !== index,
                                );
                                setFormData((prev) => ({ ...prev, specialOffers: newOffers }));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Grid>

                {/* Bundle Offers */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    عروض الباقات
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const newBundle = {
                        title: '',
                        products: [],
                        discount: '',
                        active: false,
                      };
                      setFormData((prev) => ({
                        ...prev,
                        bundleOffers: [...prev.bundleOffers, newBundle],
                      }));
                    }}
                    sx={{ mb: 2 }}
                  >
                    إضافة عرض باقة
                  </Button>

                  {formData.bundleOffers.map((bundle, index) => (
                    <Card key={index} sx={{ p: 2, mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            fullWidth
                            label="عنوان الباقة"
                            value={bundle.title}
                            onChange={(e) => {
                              const newBundles = [...formData.bundleOffers];
                              newBundles[index].title = e.target.value;
                              setFormData((prev) => ({ ...prev, bundleOffers: newBundles }));
                            }}
                            placeholder="مثلا, باقة الكمبيوتر والفأرة"
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            fullWidth
                            type="number"
                            label="خصم الباقة (%)"
                            value={bundle.discount}
                            onChange={(e) => {
                              const newBundles = [...formData.bundleOffers];
                              newBundles[index].discount = e.target.value;
                              setFormData((prev) => ({ ...prev, bundleOffers: newBundles }));
                            }}
                            placeholder="0"
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={bundle.active}
                                  onChange={(e) => {
                                    const newBundles = [...formData.bundleOffers];
                                    newBundles[index].active = e.target.checked;
                                    setFormData((prev) => ({ ...prev, bundleOffers: newBundles }));
                                  }}
                                />
                              }
                              label="الباقة النشطة"
                            />
                            <IconButton
                              color="error"
                              onClick={() => {
                                const newBundles = formData.bundleOffers.filter(
                                  (_, i) => i !== index,
                                );
                                setFormData((prev) => ({ ...prev, bundleOffers: newBundles }));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            )}

            {/* Stores & Availability Tab */}
            {activeTab === 5 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <StoreIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    توفر في المتاجر
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    متاجر متاحة
                  </Typography>
                  <FormGroup>
                    {[
                      'المتجر الرئيسي',
                      'المتجر الفرعي 1',
                      'المتجر الفرعي 2',
                      'المتجر الفرعي 3',
                      'التطبيق المحمول',
                    ].map((store) => (
                      <FormControlLabel
                        key={store}
                        control={
                          <Checkbox
                            checked={formData.availableStores.includes(store)}
                            onChange={(e) => {
                              const newStores = e.target.checked
                                ? [...formData.availableStores, store]
                                : formData.availableStores.filter((s) => s !== store);
                              setFormData((prev) => ({ ...prev, availableStores: newStores }));
                            }}
                          />
                        }
                        label={store}
                      />
                    ))}
                  </FormGroup>
                </Grid>

                {/* Store-specific Pricing */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    تسعير مخصص للمتاجر
                  </Typography>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>ملاحظة:</strong> الأسعار الأساسية من ERP (سعر التكلفة والجملة) يمكن
                      تعديلها. يمكنك تحديد أسعار البيع لكل متجر.
                    </Typography>
                  </Alert>

                  {formData.availableStores.map((store) => (
                    <Card key={store} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {store} - التسعير والمخزون
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <TextField
                            fullWidth
                            type="number"
                            label={`سعر البيع في ${store}`}
                            value={formData.storeSpecificPricing[store] || ''}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                storeSpecificPricing: {
                                  ...prev.storeSpecificPricing,
                                  [store]: e.target.value,
                                },
                              }));
                            }}
                            placeholder="0.00"
                            helperText={
                              store === 'المتجر الرئيسي'
                                ? 'سعر البيع في المتجر الرئيسي'
                                : 'سعر البيع في المتجر الفرعي'
                            }
                            InputProps={{
                              startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <TextField
                            fullWidth
                            type="number"
                            label={`المخزون في ${store}`}
                            value={formData.storeSpecificStock[store] || ''}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                storeSpecificStock: {
                                  ...prev.storeSpecificStock,
                                  [store]: e.target.value,
                                },
                              }));
                            }}
                            placeholder="0"
                            helperText="كمية المخزون المتاحة"
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <Box sx={{ p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              معلومات من ERP (قابلة للتعديل):
                            </Typography>
                            <Typography variant="body2">
                              سعر التكلفة: {formData.cost || '0.00'} ر.س
                            </Typography>
                            <Typography variant="body2">
                              سعر الجملة: {formData.wholesalePrice || '0.00'} ر.س
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            )}


            {/* Media & Files Tab */}
            {activeTab === 6 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <ImageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    الوسائط والملفات
                  </Typography>
                </Grid>

                {/* Product Images */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    صور المنتج
                  </Typography>
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 4,
                      border: 2,
                      borderStyle: 'dashed',
                      borderRadius: 2,
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      رفع صور المنتج
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      إسقاط صور هنا أو انقر للتصفح
                    </Typography>
                    <Button variant="contained" startIcon={<UploadIcon />} sx={{ mr: 2 }}>
                      رفع الصور
                    </Button>
                    <Button variant="outlined" startIcon={<CameraIcon />}>
                      التقط صورة
                    </Button>
                  </Box>
                </Grid>

                {/* Product Videos */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    فيديوهات المنتج
                  </Typography>
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 4,
                      border: 2,
                      borderStyle: 'dashed',
                      borderRadius: 2,
                    }}
                  >
                    <VideocamIcon sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      رفع فيديوهات المنتج
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      رفع فيديوهات العرض التعريفي للمنتج
                    </Typography>
                    <Button variant="contained" startIcon={<UploadIcon />} sx={{ mr: 2 }}>
                      رفع الفيديوهات
                    </Button>
                    <Button variant="outlined" startIcon={<VideocamIcon />}>
                      التقط فيديو
                    </Button>
                  </Box>
                </Grid>

                {/* Product Documents */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    المستندات المنتج
                  </Typography>
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 4,
                      border: 2,
                      borderStyle: 'dashed',
                      borderRadius: 2,
                    }}
                  >
                    <DescriptionIcon sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      رفع المستندات المنتج
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      رفع الوثائق, المواصفات, الشهادات, etc.
                    </Typography>
                    <Button variant="contained" startIcon={<UploadIcon />}>
                      رفع الوثائق
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}

          </Paper>
        </Grid>

      </Grid>

      {/* Action Buttons */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            آخر حفظ: {new Date().toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => window.history.back()}
            size="large"
          >
            إلغاء
          </Button>

          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={() => handleSave('saved as draft')}
            disabled={loading}
            size="large"
          >
            حفظ المسودة
          </Button>

          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={() => handleSave('created')}
            disabled={loading}
            size="large"
          >
            {loading ? 'جاري الإنشاء...' : 'إنشاء المنتج'}
          </Button>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductCreate;
