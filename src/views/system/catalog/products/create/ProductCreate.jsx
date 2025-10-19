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
  Switch,
  FormControlLabel,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  Autocomplete,
  Slider,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  Zoom,
  LinearProgress,
  Fade,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Home as HomeIcon,
  Inventory as InventoryIcon,
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
  NavigateNext as NavigateNextIcon,
  ExpandMore as ExpandMoreIcon,
  Image as ImageIcon,
  AttachMoney as MoneyIcon,
  LocalShipping as ShippingIcon,
  Star as StarIcon,
  Discount as DiscountIcon,
  Store as StoreIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
  Tag as TagIcon,
  Description as DescriptionIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  ContentCopy as DuplicateIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Key as KeyIcon,
  Code as CodeIcon,
  Language as LanguageIcon,
  Translate as TranslateIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  Palette as PaletteIcon,
  PhotoCamera as CameraIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  CloudSync as CloudSyncIcon,
  Sync as SyncIcon,
  Autorenew as AutorenewIcon,
  Cached as CachedIcon,
  Update as UpdateIcon,
  Build as BuildIcon,
  Construction as ConstructionIcon,
  Engineering as EngineeringIcon,
  Science as ScienceIcon,
  Psychology as PsychologyIcon,
  Biotech as BiotechIcon,
  MedicalServices as MedicalIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  AccountBalance as AccountBalanceIcon,
  MonetizationOn as MonetizationOnIcon,
  TrendingDown as TrendingDownIcon,
  ShowChart as ShowChartIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Assessment as AssessmentIcon,
  Analytics as AnalyticsIcon,
  Insights as InsightsIcon,
  Timeline as TimelineIcon,
  History as HistoryIcon,
  Schedule as ScheduleIcon2,
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  DateRange as DateRangeIcon,
  AccessTime as AccessTimeIcon,
  Timer as TimerIcon,
  HourglassEmpty as HourglassIcon,
  Speed as SpeedIcon,
  FlashOn as FlashIcon,
  Bolt as BoltIcon,
  ElectricBolt as ElectricBoltIcon,
  Power as PowerIcon,
  BatteryFull as BatteryIcon,
  SignalCellularAlt as SignalIcon,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  Usb as UsbIcon,
  Cable as CableIcon,
  Router as RouterIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  SdCard as SdCardIcon,
  SimCard as SimCardIcon,
  CreditCard as CreditCardIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  Description as DescriptionIcon2,
  Article as ArticleIcon,
  TextSnippet as TextSnippetIcon,
  Notes as NotesIcon,
  StickyNote2 as StickyNoteIcon,
  Task as TaskIcon,
  Checklist as ChecklistIcon,
  Done as DoneIcon,
  DoneAll as DoneAllIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  IndeterminateCheckBox as IndeterminateCheckBoxIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
  Replay as ReplayIcon,
  Shuffle as ShuffleIcon,
  Repeat as RepeatIcon,
  VolumeUp as VolumeUpIcon,
  VolumeDown as VolumeDownIcon,
  VolumeOff as VolumeOffIcon,
  VolumeMute as VolumeMuteIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  CenterFocusStrong as CenterFocusStrongIcon,
  CenterFocusWeak as CenterFocusWeakIcon,
  Crop as CropIcon,
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
  Flip as FlipIcon,
  Transform as TransformIcon,
  Straighten as StraightenIcon,
  Tune as TuneIcon,
  Filter as FilterIcon2,
  SortByAlpha as SortByAlphaIcon,
  Sort as SortIcon2,
  SwapVert as SwapVertIcon,
  SwapHoriz as SwapHorizIcon,
  ImportExport as ImportExportIcon,
  CompareArrows as CompareArrowsIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingUp as TrendingUpIcon2,
  TrendingDown as TrendingDownIcon2,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon2,
  UnfoldMore as UnfoldMoreIcon,
  UnfoldLess as UnfoldLessIcon,
  OpenInFull as OpenInFullIcon,
  CloseFullscreen as CloseFullscreenIcon,
  Minimize as MinimizeIcon,
  Maximize as MaximizeIcon,
  Fullscreen as FullscreenIcon2,
  FullscreenExit as FullscreenExitIcon2,
  PictureInPicture as PictureInPictureIcon,
  PictureInPictureAlt as PictureInPictureAltIcon,
  AspectRatio as AspectRatioIcon,
  CropFree as CropFreeIcon,
  CropSquare as CropSquareIcon,
  CropPortrait as CropPortraitIcon,
  CropLandscape as CropLandscapeIcon,
  CropDin as CropDinIcon,
  CropOriginal as CropOriginalIcon,
  CropRotate as CropRotateIcon,
  Crop169 as Crop169Icon,
  CropDin as CropDinIcon2,
  CropFree as CropFreeIcon2,
  CropSquare as CropSquareIcon2,
  CropPortrait as CropPortraitIcon2,
  CropLandscape as CropLandscapeIcon2,
  CropOriginal as CropOriginalIcon2,
  CropRotate as CropRotateIcon2,
  Crop169 as Crop169Icon2,
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
      value: '$45,678',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: AttachMoneyIcon,
      change: '+8.2%',
    },
    {
      title: 'التقييم المتوسط',
      value: '4.3',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: StarIcon,
      change: 'Excellent',
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
    category: '',
    subCategory: '',
    brand: '',
    model: '',
    manufacturer: '',

    // Pricing
    price: '',
    comparePrice: '',
    cost: '',
    wholesalePrice: '',
    retailPrice: '',
    discount: '',
    discountType: 'percentage', // percentage or fixed
    discountStartDate: '',
    discountEndDate: '',

    // Inventory
    stock: '',
    minStock: '',
    maxStock: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    unit: 'piece', // piece, kg, liter, etc.

    // Status & Visibility
    status: 'draft', // draft, active, inactive, out_of_stock, discontinued
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
        <Grid size={{ xs: 12, md: 8 }}>
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
                <Tab label="SEO والتسويق" icon={<SearchIcon />} />
                <Tab label="المواصفات" icon={<DescriptionIcon />} />
                <Tab label="العروض والترويج" icon={<DiscountIcon />} />
                <Tab label="المتاجر والتوفر" icon={<StoreIcon />} />
                <Tab label="الشحن والتسليم" icon={<ShippingIcon />} />
                <Tab label="الوسائط والملفات" icon={<ImageIcon />} />
                <Tab label="الإعدادات المتقدمة" icon={<BuildIcon />} />
              </Tabs>
            </Box>

            {/* General Tab */}
            {activeTab === 0 && (
              <Grid container spacing={3}>
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

                {/* SKU and Barcode */}
                <Grid size={{ xs: 12, md: 6 }}>
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

                <Grid size={{ xs: 12, md: 6 }}>
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
                            // توليد باركود احترافي
                            const timestamp = Date.now().toString().slice(-6);
                            const random = Math.random().toString(36).substring(2, 8).toUpperCase();
                            const newBarcode = `BC${timestamp}${random}`;
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

                {/* Category and Subcategory */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>الفئة</InputLabel>
                    <Select
                      value={formData.category}
                      label="التصنيف"
                      onChange={handleInputChange('category')}
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

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>التصنيف الفرعي</InputLabel>
                    <Select
                      value={formData.subCategory}
                      label="التصنيف الفرعي"
                      onChange={handleInputChange('subCategory')}
                    >
                      <MenuItem value="">اختر التصنيف الفرعي</MenuItem>
                      <MenuItem value="smartphones">الهواتف الذكية</MenuItem>
                      <MenuItem value="laptops">الكمبيوترات</MenuItem>
                      <MenuItem value="accessories">الملحقات</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Brand and Manufacturer */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="العلامة التجارية"
                    value={formData.brand}
                    onChange={handleInputChange('brand')}
                    placeholder="أدخل اسم العلامة التجارية"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="الموديل"
                    value={formData.model}
                    onChange={handleInputChange('model')}
                    placeholder="أدخل رقم الموديل"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="الشركة المصنعة"
                    value={formData.manufacturer}
                    onChange={handleInputChange('manufacturer')}
                    placeholder="أدخل اسم الشركة المصنعة"
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

                {/* Product Status */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>حالة المنتج</InputLabel>
                    <Select
                      value={formData.status}
                      label="حالة المنتج"
                      onChange={handleInputChange('status')}
                    >
                      <MenuItem value="draft">مسودة</MenuItem>
                      <MenuItem value="active">نشط</MenuItem>
                      <MenuItem value="inactive">غير نشط</MenuItem>
                      <MenuItem value="out_of_stock">عدم وجود في المخزن</MenuItem>
                      <MenuItem value="discontinued">موقوف</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
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
                {/* Main Pricing */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <MoneyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    التسعير الرئيسي
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر البيع"
                    value={formData.price}
                    onChange={handleInputChange('price')}
                    placeholder="0.00"
                    required
                    helperText="سعر البيع الذي سيدفعه العميل"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر المقارنة"
                    value={formData.comparePrice}
                    onChange={handleInputChange('comparePrice')}
                    placeholder="0.00"
                    helperText="سعر المقارنة الذي سيظهر في المنتج"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر التكلفة"
                    value={formData.cost}
                    onChange={handleInputChange('cost')}
                    placeholder="0.00"
                    helperText="تكلفة الشراء/إنتاج هذا المنتج"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر الجملة"
                    value={formData.wholesalePrice}
                    onChange={handleInputChange('wholesalePrice')}
                    placeholder="0.00"
                    helperText="سعر الجملة/التسويق الجملي"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
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

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="مبلغ الخصم"
                    value={formData.discount}
                    onChange={handleInputChange('discount')}
                    placeholder="0"
                    helperText="قيمة الخصم"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel>نوع الخصم</InputLabel>
                    <Select
                      value={formData.discountType}
                      label="نوع الخصم"
                      onChange={handleInputChange('discountType')}
                    >
                      <MenuItem value="percentage">نسبة مئوية (%)</MenuItem>
                      <MenuItem value="fixed">مبلغ ثابت ($)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="تاريخ بدء الخصم"
                    value={formData.discountStartDate}
                    onChange={handleInputChange('discountStartDate')}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="تاريخ إنتهاء الخصم"
                    value={formData.discountEndDate}
                    onChange={handleInputChange('discountEndDate')}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="سعر البيع التجاري"
                    value={formData.retailPrice}
                    onChange={handleInputChange('retailPrice')}
                    placeholder="0.00"
                    helperText="سعر البيع التجاري المقترح"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>

                {/* Profit Calculation Display */}
                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      تحليل الربح
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          هامش الربح:
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {formData.price && formData.cost
                            ? `${(
                                ((parseFloat(formData.price) - parseFloat(formData.cost)) /
                                  parseFloat(formData.price)) *
                                100
                              ).toFixed(2)}%`
                            : '0%'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          مبلغ الربح:
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          $
                          {formData.price && formData.cost
                            ? (parseFloat(formData.price) - parseFloat(formData.cost)).toFixed(2)
                            : '0.00'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          مبلغ الخصم:
                        </Typography>
                        <Typography variant="h6" color="warning.main">
                          {formData.comparePrice && formData.price
                            ? `$${(
                                parseFloat(formData.comparePrice) - parseFloat(formData.price)
                              ).toFixed(2)}`
                            : '$0.00'}
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

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="المخزون الحالي"
                    value={formData.stock}
                    onChange={handleInputChange('stock')}
                    placeholder="0"
                    required
                    helperText="الكمية المتاحة"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
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

                <Grid size={{ xs: 12, md: 4 }}>
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

                <Grid size={{ xs: 12, md: 6 }}>
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

                <Grid size={{ xs: 12, md: 6 }}>
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

                <Grid size={{ xs: 12, md: 4 }}>
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

                <Grid size={{ xs: 12, md: 4 }}>
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

                <Grid size={{ xs: 12, md: 4 }}>
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

                {/* Stock Status */}
                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      حالة المخزون
                    </Typography>
                    <Stack direction="row" spacing={4} flexWrap="wrap">
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

            {/* SEO & Marketing Tab */}
            {activeTab === 3 && (
              <Grid container spacing={3}>
                {/* SEO Settings */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    إعدادات SEO
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label={`عنوان محسن لمحركات البحث (${
                      selectedLanguage === 'en' ? 'English' : 'العربية'
                    })`}
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

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label={`وصف ميتا لمحركات البحث (${
                      selectedLanguage === 'en' ? 'English' : 'العربية'
                    })`}
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

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="كلمات البحث الميتا"
                    value={formData.metaKeywords}
                    onChange={handleInputChange('metaKeywords')}
                    placeholder="أدخل كلمات البحث مفصولة بفواصل"
                    helperText="كلمات البحث لتحسين محركات البحث"
                  />
                </Grid>

                {/* Tags and Keywords */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    <TagIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    الوسوم وكلمات البحث
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={formData.tags}
                    onChange={(event, newValue) => {
                      setFormData((prev) => ({ ...prev, tags: newValue }));
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="وسوم المنتج"
                        placeholder="أضف وسوم..."
                        helperText="الوسوم تساعد العملاء على العثور على منتجك"
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={formData.keywords}
                    onChange={(event, newValue) => {
                      setFormData((prev) => ({ ...prev, keywords: newValue }));
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="كلمات البحث"
                        placeholder="أضف كلمات البحث..."
                        helperText="كلمات البحث للبحث الداخلي"
                      />
                    )}
                  />
                </Grid>

                {/* Marketing Settings */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    إعدادات التسويق
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      رؤية المنتج
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
                            checked={formData.loyaltyProgram}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, loyaltyProgram: e.target.checked }))
                            }
                          />
                        }
                        label="برنامج اللايفو"
                      />
                    </Stack>
                  </Card>
                </Grid>

                {/* Rewards & Loyalty */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <StarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    المكافآت واللايفو
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="نقاط المكافآت"
                    value={formData.rewardPoints}
                    onChange={handleInputChange('rewardPoints')}
                    placeholder="0"
                    helperText="نقاط تحصل عليها عند شراء هذا المنتج"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="مضاعف اللايفو"
                    value={formData.loyaltyMultiplier}
                    onChange={handleInputChange('loyaltyMultiplier')}
                    placeholder="1"
                    helperText="مضاعف لنقاط اللايفو"
                    disabled={!formData.loyaltyProgram}
                  />
                </Grid>

                {/* SEO Preview */}
                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      معاينة SEO
                    </Typography>
                    <Box sx={{ border: 1, p: 2, borderRadius: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {formData.seoTitle[selectedLanguage] ||
                          formData.name[selectedLanguage] ||
                          'عنوان المنتج'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {formData.seoDescription[selectedLanguage] ||
                          formData.shortDescription[selectedLanguage] ||
                          'وصف المنتج سيظهر هنا...'}
                      </Typography>
                      <Typography variant="caption" color="success.main">
                        https://yourstore.com/products/{formData.sku || 'رمز-المنتج'}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* Specifications Tab */}
            {activeTab === 4 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    مواصفات المنتج
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

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="وصف الضمان"
                    value={formData.warranty}
                    onChange={handleInputChange('warranty')}
                    placeholder="تفاصيل الضمان..."
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="فترة الضمان"
                    value={formData.warrantyPeriod}
                    onChange={handleInputChange('warrantyPeriod')}
                    placeholder="مثلا, 1 سنة, 2 سنة"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
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

                {/* Custom Specifications */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
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
            {activeTab === 5 && (
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
            {activeTab === 6 && (
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
                    تسعير مخصص للمتجر
                  </Typography>
                  {formData.availableStores.map((store) => (
                    <Card key={store} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {store} تسعير
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            fullWidth
                            type="number"
                            label={`سعر في ${store}`}
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
                            InputProps={{
                              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
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
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            )}

            {/* Shipping & Delivery Tab */}
            {activeTab === 7 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <ShippingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    الشحن والتوصيل
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>فئة الشحن</InputLabel>
                    <Select
                      value={formData.shippingClass}
                      label="فئة الشحن"
                      onChange={handleInputChange('shippingClass')}
                    >
                      <MenuItem value="standard">معياري</MenuItem>
                      <MenuItem value="express">سريع</MenuItem>
                      <MenuItem value="overnight">ليلي</MenuItem>
                      <MenuItem value="fragile">حساس</MenuItem>
                      <MenuItem value="oversized">كبير</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="وزن الشحن"
                    value={formData.shippingWeight}
                    onChange={handleInputChange('shippingWeight')}
                    placeholder="0.0"
                    helperText="وزن لحساب الشحن"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>kg</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    أبعاد الشحن
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="الطول"
                    value={formData.shippingDimensions.length}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        shippingDimensions: { ...prev.shippingDimensions, length: e.target.value },
                      }))
                    }
                    placeholder="0"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>cm</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="العرض"
                    value={formData.shippingDimensions.width}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        shippingDimensions: { ...prev.shippingDimensions, width: e.target.value },
                      }))
                    }
                    placeholder="0"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>cm</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="الإرتفاع"
                    value={formData.shippingDimensions.height}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        shippingDimensions: { ...prev.shippingDimensions, height: e.target.value },
                      }))
                    }
                    placeholder="0"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>cm</Typography>,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      خيارات الشحن
                    </Typography>
                    <Stack direction="row" spacing={4} flexWrap="wrap">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.freeShipping}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, freeShipping: e.target.checked }))
                            }
                          />
                        }
                        label="الشحن المجاني"
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

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="تكلفة الشحن"
                    value={formData.shippingCost}
                    onChange={handleInputChange('shippingCost')}
                    placeholder="0.00"
                    disabled={formData.freeShipping}
                    helperText="تكلفة شحن إضافية (إذا لم يكن مجانيا)"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {/* Media & Files Tab */}
            {activeTab === 8 && (
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

            {/* Advanced Settings Tab */}
            {activeTab === 9 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    <BuildIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    الإعدادات المتقدمة
                  </Typography>
                </Grid>

                {/* Tax Settings */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    إعدادات الضرائب
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>فئة الضريبة</InputLabel>
                    <Select
                      value={formData.taxClass}
                      label="فئة الضريبة"
                      onChange={handleInputChange('taxClass')}
                    >
                      <MenuItem value="standard">معياري</MenuItem>
                      <MenuItem value="reduced">مخفض</MenuItem>
                      <MenuItem value="zero">صفر</MenuItem>
                      <MenuItem value="exempt">معفي</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="نسبة الضريبة (%)"
                    value={formData.taxRate}
                    onChange={handleInputChange('taxRate')}
                    placeholder="0"
                    helperText="نسبة الضريبة"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.taxable}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, taxable: e.target.checked }))
                        }
                      />
                    }
                    label="المنتج الضريبي"
                  />
                </Grid>

                {/* Approval Settings */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    إعدادات الموافقة
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      موافقة المنتج
                    </Typography>
                    <Stack direction="row" spacing={4} flexWrap="wrap">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.requiresApproval}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                requiresApproval: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="الموافقة مطلوبة"
                      />
                    </Stack>

                    {formData.requiresApproval && (
                      <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel>حالة الموافقة</InputLabel>
                          <Select
                            value={formData.approvalStatus}
                            label="حالة الموافقة"
                            onChange={handleInputChange('approvalStatus')}
                          >
                            <MenuItem value="pending">قيد المراجعة</MenuItem>
                            <MenuItem value="approved">موافقة</MenuItem>
                            <MenuItem value="rejected">رفض</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                  </Card>
                </Grid>

                {/* Custom Fields */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    الحقول المخصصة
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const newField = { name: '', value: '', type: 'text' };
                      setFormData((prev) => ({
                        ...prev,
                        customFields: [...prev.customFields, newField],
                      }));
                    }}
                    sx={{ mb: 2 }}
                  >
                    إضافة حقل مخصص
                  </Button>

                  {formData.customFields.map((field, index) => (
                    <Card key={index} sx={{ p: 2, mb: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 3 }}>
                          <TextField
                            fullWidth
                            label="اسم الحقل"
                            value={field.name}
                            onChange={(e) => {
                              const newFields = [...formData.customFields];
                              newFields[index].name = e.target.value;
                              setFormData((prev) => ({ ...prev, customFields: newFields }));
                            }}
                            placeholder="مثلا, اللون, الحجم"
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                          <FormControl fullWidth>
                            <InputLabel>نوع الحقل</InputLabel>
                            <Select
                              value={field.type}
                              label="نوع الحقل"
                              onChange={(e) => {
                                const newFields = [...formData.customFields];
                                newFields[index].type = e.target.value;
                                setFormData((prev) => ({ ...prev, customFields: newFields }));
                              }}
                            >
                              <MenuItem value="text">نص</MenuItem>
                              <MenuItem value="number">رقم</MenuItem>
                              <MenuItem value="date">تاريخ</MenuItem>
                              <MenuItem value="boolean">منطقي</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <TextField
                            fullWidth
                            label="قيمة الحقل"
                            value={field.value}
                            onChange={(e) => {
                              const newFields = [...formData.customFields];
                              newFields[index].value = e.target.value;
                              setFormData((prev) => ({ ...prev, customFields: newFields }));
                            }}
                            placeholder="أدخل القيمة..."
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                          <IconButton
                            color="error"
                            onClick={() => {
                              const newFields = formData.customFields.filter((_, i) => i !== index);
                              setFormData((prev) => ({ ...prev, customFields: newFields }));
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
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Product Summary */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                ملخص المنتج
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    اسم المنتج:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {formData.name[selectedLanguage] || 'Not specified'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    الباركود:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {formData.sku || 'Not specified'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    السعر:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${formData.price || '0.00'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    المخزون:
                  </Typography>
                  <Typography variant="body1">{formData.stock || '0'} units</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    الحالة:
                  </Typography>
                  <Chip
                    label={formData.status}
                    color={formData.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
              </Stack>
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                الإجراءات السريعة
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  fullWidth
                  onClick={() => setFormData((prev) => ({ ...prev, visibility: 'public' }))}
                >
                  عرض المنتج
                </Button>

                <Button variant="outlined" startIcon={<ShareIcon />} fullWidth>
                  شارك المنتج
                </Button>

                <Button variant="outlined" startIcon={<DuplicateIcon />} fullWidth>
                  نسخ المنتج
                </Button>
              </Stack>
            </Paper>

            {/* Product Settings */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                إعدادات المنتج
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                      }
                    />
                  }
                  label="المنتج المميز"
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
                  label="المنتج الرقمي"
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
                        setFormData((prev) => ({ ...prev, requiresShipping: e.target.checked }))
                      }
                    />
                  }
                  label="الشحن مطلوب"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.freeShipping}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, freeShipping: e.target.checked }))
                      }
                    />
                  }
                  label="الشحن مجاني"
                />
              </Stack>
            </Paper>

            {/* Product Images */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <ImageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                صور المنتج
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ textAlign: 'center', py: 4 }}>
                <ImageIcon sx={{ fontSize: 48, mb: 2 }} />
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  رفع الصور
                </Button>
                <Button variant="outlined" startIcon={<CameraIcon />} fullWidth sx={{ mb: 2 }}>
                  التقط صورة
                </Button>
                <Typography variant="caption" color="text.secondary">
                  اسحب وأفلت الصور هنا أو انقر للتصفح
                </Typography>
              </Box>

              {formData.images.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    صور مرفوعة ({formData.images.length})
                  </Typography>
                  <Grid container spacing={1}>
                    {formData.images.map((image, index) => (
                      <Grid size={{ xs: 6 }} key={index}>
                        <Box sx={{ position: 'relative' }}>
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              '&:hover': { opacity: 0.8 },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Paper>

            {/* Product Variants */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                متغيرات المنتج
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Button variant="outlined" startIcon={<AddIcon />} fullWidth sx={{ mb: 2 }}>
                إضافة متغير
              </Button>

              {formData.variants.length > 0 ? (
                <Stack spacing={1}>
                  {formData.variants.map((variant, index) => (
                    <Card key={index} sx={{ p: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {variant.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ${variant.price}
                          </Typography>
                        </Box>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  لا يوجد متغيرات مضافة بعد
                </Typography>
              )}
            </Paper>

            {/* SEO Status */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                حالة التحسين المحركي
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">عنوان التحسين المحركي</Typography>
                    <Chip
                      label={formData.seoTitle[selectedLanguage] ? 'Set' : 'Missing'}
                      color={formData.seoTitle[selectedLanguage] ? 'success' : 'warning'}
                      size="small"
                    />
                  </Stack>
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">وصف التحسين المحركي</Typography>
                    <Chip
                      label={formData.seoDescription[selectedLanguage] ? 'Set' : 'Missing'}
                      color={formData.seoDescription[selectedLanguage] ? 'success' : 'warning'}
                      size="small"
                    />
                  </Stack>
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">الكلمات المفتاحية</Typography>
                    <Chip
                      label={formData.keywords.length}
                      color={formData.keywords.length > 0 ? 'success' : 'warning'}
                      size="small"
                    />
                  </Stack>
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">الوسوم</Typography>
                    <Chip
                      label={formData.tags.length}
                      color={formData.tags.length > 0 ? 'success' : 'warning'}
                      size="small"
                    />
                  </Stack>
                </Box>
              </Stack>
            </Paper>

            {/* Product Analytics */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <AnalyticsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                تحليلات المنتج
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    المشاهدات
                  </Typography>
                  <Typography variant="h6">0</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    المبيعات
                  </Typography>
                  <Typography variant="h6">0</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    نسبة التحويل
                  </Typography>
                  <Typography variant="h6">0%</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    الإيرادات
                  </Typography>
                  <Typography variant="h6">$0.00</Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
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
