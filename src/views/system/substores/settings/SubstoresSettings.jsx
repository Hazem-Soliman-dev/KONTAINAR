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
  Skeleton,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Save as SaveIcon,
  Home as HomeIcon,
  Store as StoreIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  CheckCircleOutline as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

// Custom TabPanel component
const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const SubstoresSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);

  // Settings data
  const [settings, setSettings] = useState({
    general: {
      storeName: 'نظام إدارة المتاجر الفرعية',
      storeCode: 'KONTAINAR',
      defaultCurrency: 'SAR',
      timezone: 'Asia/Riyadh',
      language: 'ar',
      dateFormat: 'dd/mm/yyyy',
      timeFormat: '24h',
      autoBackup: true,
      backupFrequency: 'daily',
      maxFileSize: '10MB',
      sessionTimeout: 30,
    },
    security: {
      requireLogin: true,
      twoFactorAuth: false,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      ipWhitelist: [],
      sslRequired: true,
      auditLog: true,
      dataEncryption: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      orderAlerts: true,
      stockAlerts: true,
      paymentAlerts: true,
      systemAlerts: true,
      reportAlerts: false,
    },
    payment: {
      defaultPaymentMethod: 'bank_transfer',
      allowCash: true,
      allowCard: true,
      allowOnline: true,
      autoApprove: false,
      minOrderAmount: 100,
      maxOrderAmount: 10000,
      paymentTerms: 30,
      lateFeeRate: 2.5,
    },
    inventory: {
      autoReorder: true,
      reorderLevel: 10,
      reorderQuantity: 50,
      trackExpiry: true,
      expiryWarningDays: 30,
      allowNegativeStock: false,
      batchTracking: true,
      serialTracking: false,
    },
    staff: {
      requireApproval: true,
      maxStaffPerStore: 10,
      allowRemoteAccess: false,
      roleBasedAccess: true,
      timeTracking: true,
      shiftScheduling: true,
      performanceTracking: true,
    },
    reports: {
      autoGenerate: false,
      reportFrequency: 'monthly',
      includeCharts: true,
      emailReports: true,
      reportFormat: 'pdf',
      dataRetention: 365,
      customFields: [],
    },
  });

  const currencies = [
    { value: 'SAR', label: 'ريال سعودي' },
    { value: 'USD', label: 'دولار أمريكي' },
    { value: 'EUR', label: 'يورو' },
    { value: 'AED', label: 'درهم إماراتي' },
  ];

  const timezones = [
    { value: 'Asia/Riyadh', label: 'الرياض (GMT+3)' },
    { value: 'Asia/Dubai', label: 'دبي (GMT+4)' },
    { value: 'Asia/Kuwait', label: 'الكويت (GMT+3)' },
    { value: 'Asia/Bahrain', label: 'البحرين (GMT+3)' },
  ];

  const languages = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
  ];

  const dateFormats = [
    { value: 'dd/mm/yyyy', label: 'يوم/شهر/سنة' },
    { value: 'mm/dd/yyyy', label: 'شهر/يوم/سنة' },
    { value: 'yyyy-mm-dd', label: 'سنة-شهر-يوم' },
  ];

  const timeFormats = [
    { value: '12h', label: '12 ساعة (AM/PM)' },
    { value: '24h', label: '24 ساعة' },
  ];

  const backupFrequencies = [
    { value: 'hourly', label: 'كل ساعة' },
    { value: 'daily', label: 'يومياً' },
    { value: 'weekly', label: 'أسبوعياً' },
    { value: 'monthly', label: 'شهرياً' },
  ];

  const paymentMethods = [
    { value: 'bank_transfer', label: 'تحويل بنكي' },
    { value: 'cash', label: 'نقداً' },
    { value: 'card', label: 'بطاقة ائتمان' },
    { value: 'online', label: 'دفع إلكتروني' },
  ];

  const reportFrequencies = [
    { value: 'daily', label: 'يومياً' },
    { value: 'weekly', label: 'أسبوعياً' },
    { value: 'monthly', label: 'شهرياً' },
    { value: 'quarterly', label: 'ربع سنوياً' },
  ];

  const reportFormats = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel' },
    { value: 'csv', label: 'CSV' },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const notify = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notify('تم حفظ الإعدادات بنجاح');
    }, 1000);
  };

  const handleReset = () => {
    notify('تم إعادة تعيين الإعدادات', 'info');
  };

  const handleExport = () => {
    notify('تم تصدير الإعدادات');
  };

  const handleImport = () => {
    notify('تم استيراد الإعدادات');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderGeneralSettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="اسم النظام"
          value={settings.general.storeName}
          onChange={(e) =>
            setSettings({
              ...settings,
              general: { ...settings.general, storeName: e.target.value },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="كود النظام"
          value={settings.general.storeCode}
          onChange={(e) =>
            setSettings({
              ...settings,
              general: { ...settings.general, storeCode: e.target.value },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>العملة الافتراضية</InputLabel>
          <Select
            value={settings.general.defaultCurrency}
            label="العملة الافتراضية"
            onChange={(e) =>
              setSettings({
                ...settings,
                general: { ...settings.general, defaultCurrency: e.target.value },
              })
            }
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.value} value={currency.value}>
                {currency.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>المنطقة الزمنية</InputLabel>
          <Select
            value={settings.general.timezone}
            label="المنطقة الزمنية"
            onChange={(e) =>
              setSettings({
                ...settings,
                general: { ...settings.general, timezone: e.target.value },
              })
            }
          >
            {timezones.map((tz) => (
              <MenuItem key={tz.value} value={tz.value}>
                {tz.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>اللغة</InputLabel>
          <Select
            value={settings.general.language}
            label="اللغة"
            onChange={(e) =>
              setSettings({
                ...settings,
                general: { ...settings.general, language: e.target.value },
              })
            }
          >
            {languages.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>تنسيق التاريخ</InputLabel>
          <Select
            value={settings.general.dateFormat}
            label="تنسيق التاريخ"
            onChange={(e) =>
              setSettings({
                ...settings,
                general: { ...settings.general, dateFormat: e.target.value },
              })
            }
          >
            {dateFormats.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>تنسيق الوقت</InputLabel>
          <Select
            value={settings.general.timeFormat}
            label="تنسيق الوقت"
            onChange={(e) =>
              setSettings({
                ...settings,
                general: { ...settings.general, timeFormat: e.target.value },
              })
            }
          >
            {timeFormats.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>تكرار النسخ الاحتياطي</InputLabel>
          <Select
            value={settings.general.backupFrequency}
            label="تكرار النسخ الاحتياطي"
            onChange={(e) =>
              setSettings({
                ...settings,
                general: { ...settings.general, backupFrequency: e.target.value },
              })
            }
          >
            {backupFrequencies.map((freq) => (
              <MenuItem key={freq.value} value={freq.value}>
                {freq.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="حجم الملف الأقصى"
          value={settings.general.maxFileSize}
          onChange={(e) =>
            setSettings({
              ...settings,
              general: { ...settings.general, maxFileSize: e.target.value },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="مهلة الجلسة (دقيقة)"
          value={settings.general.sessionTimeout}
          onChange={(e) =>
            setSettings({
              ...settings,
              general: { ...settings.general, sessionTimeout: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.general.autoBackup}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, autoBackup: e.target.checked },
                })
              }
            />
          }
          label="النسخ الاحتياطي التلقائي"
        />
      </Grid>
    </Grid>
  );

  const renderSecuritySettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.security.requireLogin}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, requireLogin: e.target.checked },
                })
              }
            />
          }
          label="طلب تسجيل الدخول"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.security.twoFactorAuth}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, twoFactorAuth: e.target.checked },
                })
              }
            />
          }
          label="المصادقة الثنائية"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="انتهاء صلاحية كلمة المرور (يوم)"
          value={settings.security.passwordExpiry}
          onChange={(e) =>
            setSettings({
              ...settings,
              security: { ...settings.security, passwordExpiry: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="عدد محاولات الدخول الأقصى"
          value={settings.security.maxLoginAttempts}
          onChange={(e) =>
            setSettings({
              ...settings,
              security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="مدة الحظر (دقيقة)"
          value={settings.security.lockoutDuration}
          onChange={(e) =>
            setSettings({
              ...settings,
              security: { ...settings.security, lockoutDuration: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="قائمة IP المسموحة (مفصولة بفواصل)"
          placeholder="192.168.1.1, 10.0.0.1"
          value={settings.security.ipWhitelist.join(', ')}
          onChange={(e) =>
            setSettings({
              ...settings,
              security: { ...settings.security, ipWhitelist: e.target.value.split(', ') },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.security.sslRequired}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, sslRequired: e.target.checked },
                })
              }
            />
          }
          label="طلب SSL"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.security.auditLog}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, auditLog: e.target.checked },
                })
              }
            />
          }
          label="سجل التدقيق"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.security.dataEncryption}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, dataEncryption: e.target.checked },
                })
              }
            />
          }
          label="تشفير البيانات"
        />
      </Grid>
    </Grid>
  );

  const renderNotificationSettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.emailNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    emailNotifications: e.target.checked,
                  },
                })
              }
            />
          }
          label="الإشعارات عبر البريد الإلكتروني"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.smsNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, smsNotifications: e.target.checked },
                })
              }
            />
          }
          label="الإشعارات عبر الرسائل النصية"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.pushNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, pushNotifications: e.target.checked },
                })
              }
            />
          }
          label="الإشعارات الفورية"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.orderAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, orderAlerts: e.target.checked },
                })
              }
            />
          }
          label="تنبيهات الطلبات"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.stockAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, stockAlerts: e.target.checked },
                })
              }
            />
          }
          label="تنبيهات المخزون"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.paymentAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, paymentAlerts: e.target.checked },
                })
              }
            />
          }
          label="تنبيهات المدفوعات"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.systemAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, systemAlerts: e.target.checked },
                })
              }
            />
          }
          label="تنبيهات النظام"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.reportAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, reportAlerts: e.target.checked },
                })
              }
            />
          }
          label="تنبيهات التقارير"
        />
      </Grid>
    </Grid>
  );

  const renderPaymentSettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>طريقة الدفع الافتراضية</InputLabel>
          <Select
            value={settings.payment.defaultPaymentMethod}
            label="طريقة الدفع الافتراضية"
            onChange={(e) =>
              setSettings({
                ...settings,
                payment: { ...settings.payment, defaultPaymentMethod: e.target.value },
              })
            }
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method.value} value={method.value}>
                {method.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="الحد الأدنى للطلب (ريال)"
          value={settings.payment.minOrderAmount}
          onChange={(e) =>
            setSettings({
              ...settings,
              payment: { ...settings.payment, minOrderAmount: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="الحد الأقصى للطلب (ريال)"
          value={settings.payment.maxOrderAmount}
          onChange={(e) =>
            setSettings({
              ...settings,
              payment: { ...settings.payment, maxOrderAmount: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="شروط الدفع (يوم)"
          value={settings.payment.paymentTerms}
          onChange={(e) =>
            setSettings({
              ...settings,
              payment: { ...settings.payment, paymentTerms: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="معدل الرسوم المتأخرة (%)"
          value={settings.payment.lateFeeRate}
          onChange={(e) =>
            setSettings({
              ...settings,
              payment: { ...settings.payment, lateFeeRate: parseFloat(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.payment.allowCash}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  payment: { ...settings.payment, allowCash: e.target.checked },
                })
              }
            />
          }
          label="السماح بالدفع النقدي"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.payment.allowCard}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  payment: { ...settings.payment, allowCard: e.target.checked },
                })
              }
            />
          }
          label="السماح بالدفع بالبطاقة"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.payment.allowOnline}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  payment: { ...settings.payment, allowOnline: e.target.checked },
                })
              }
            />
          }
          label="السماح بالدفع الإلكتروني"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.payment.autoApprove}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  payment: { ...settings.payment, autoApprove: e.target.checked },
                })
              }
            />
          }
          label="الموافقة التلقائية"
        />
      </Grid>
    </Grid>
  );

  const renderInventorySettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.inventory.autoReorder}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  inventory: { ...settings.inventory, autoReorder: e.target.checked },
                })
              }
            />
          }
          label="إعادة الطلب التلقائي"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="مستوى إعادة الطلب"
          value={settings.inventory.reorderLevel}
          onChange={(e) =>
            setSettings({
              ...settings,
              inventory: { ...settings.inventory, reorderLevel: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="كمية إعادة الطلب"
          value={settings.inventory.reorderQuantity}
          onChange={(e) =>
            setSettings({
              ...settings,
              inventory: { ...settings.inventory, reorderQuantity: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.inventory.trackExpiry}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  inventory: { ...settings.inventory, trackExpiry: e.target.checked },
                })
              }
            />
          }
          label="تتبع انتهاء الصلاحية"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="أيام تحذير انتهاء الصلاحية"
          value={settings.inventory.expiryWarningDays}
          onChange={(e) =>
            setSettings({
              ...settings,
              inventory: { ...settings.inventory, expiryWarningDays: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.inventory.allowNegativeStock}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  inventory: { ...settings.inventory, allowNegativeStock: e.target.checked },
                })
              }
            />
          }
          label="السماح بالمخزون السلبي"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.inventory.batchTracking}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  inventory: { ...settings.inventory, batchTracking: e.target.checked },
                })
              }
            />
          }
          label="تتبع الدفعات"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.inventory.serialTracking}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  inventory: { ...settings.inventory, serialTracking: e.target.checked },
                })
              }
            />
          }
          label="تتبع الأرقام التسلسلية"
        />
      </Grid>
    </Grid>
  );

  const renderStaffSettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.staff.requireApproval}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  staff: { ...settings.staff, requireApproval: e.target.checked },
                })
              }
            />
          }
          label="طلب موافقة على الموظفين"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="الحد الأقصى للموظفين لكل متجر"
          value={settings.staff.maxStaffPerStore}
          onChange={(e) =>
            setSettings({
              ...settings,
              staff: { ...settings.staff, maxStaffPerStore: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.staff.allowRemoteAccess}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  staff: { ...settings.staff, allowRemoteAccess: e.target.checked },
                })
              }
            />
          }
          label="السماح بالوصول عن بُعد"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.staff.roleBasedAccess}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  staff: { ...settings.staff, roleBasedAccess: e.target.checked },
                })
              }
            />
          }
          label="الوصول المبني على الأدوار"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.staff.timeTracking}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  staff: { ...settings.staff, timeTracking: e.target.checked },
                })
              }
            />
          }
          label="تتبع الوقت"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.staff.shiftScheduling}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  staff: { ...settings.staff, shiftScheduling: e.target.checked },
                })
              }
            />
          }
          label="جدولة الورديات"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.staff.performanceTracking}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  staff: { ...settings.staff, performanceTracking: e.target.checked },
                })
              }
            />
          }
          label="تتبع الأداء"
        />
      </Grid>
    </Grid>
  );

  const renderReportSettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.reports.autoGenerate}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  reports: { ...settings.reports, autoGenerate: e.target.checked },
                })
              }
            />
          }
          label="إنشاء التقارير التلقائي"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>تكرار التقارير</InputLabel>
          <Select
            value={settings.reports.reportFrequency}
            label="تكرار التقارير"
            onChange={(e) =>
              setSettings({
                ...settings,
                reports: { ...settings.reports, reportFrequency: e.target.value },
              })
            }
          >
            {reportFrequencies.map((freq) => (
              <MenuItem key={freq.value} value={freq.value}>
                {freq.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>تنسيق التقرير</InputLabel>
          <Select
            value={settings.reports.reportFormat}
            label="تنسيق التقرير"
            onChange={(e) =>
              setSettings({
                ...settings,
                reports: { ...settings.reports, reportFormat: e.target.value },
              })
            }
          >
            {reportFormats.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="احتفاظ البيانات (يوم)"
          value={settings.reports.dataRetention}
          onChange={(e) =>
            setSettings({
              ...settings,
              reports: { ...settings.reports, dataRetention: parseInt(e.target.value) },
            })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.reports.includeCharts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  reports: { ...settings.reports, includeCharts: e.target.checked },
                })
              }
            />
          }
          label="تضمين الرسوم البيانية"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.reports.emailReports}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  reports: { ...settings.reports, emailReports: e.target.checked },
                })
              }
            />
          }
          label="إرسال التقارير بالبريد الإلكتروني"
        />
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إعدادات المتاجر الفرعية
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتكوين جميع إعدادات النظام للمتاجر الفرعية.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/substores">
            إدارة المتاجر الفرعية
          </Link>
          <Typography color="text.primary">الإعدادات</Typography>
        </Breadcrumbs>
      </Box>

      {/* Settings Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<SettingsIcon />} label="عام" iconPosition="start" />
          <Tab icon={<SecurityIcon />} label="الأمان" iconPosition="start" />
          <Tab icon={<NotificationsIcon />} label="الإشعارات" iconPosition="start" />
          <Tab icon={<PaymentIcon />} label="المدفوعات" iconPosition="start" />
          <Tab icon={<InventoryIcon />} label="المخزون" iconPosition="start" />
          <Tab icon={<PeopleIcon />} label="الموظفين" iconPosition="start" />
          <Tab icon={<AssessmentIcon />} label="التقارير" iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Settings Content */}
      <Paper sx={{ p: 3 }}>
        {loading ? (
          <Box>
            <LinearProgress sx={{ mb: 2 }} />
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} height={60} sx={{ mb: 1 }} />
            ))}
          </Box>
        ) : error ? (
          <Alert severity="error">خطأ في تحميل الإعدادات. يرجى المحاولة مرة أخرى.</Alert>
        ) : (
          <Box>
            {activeTab === 0 && renderGeneralSettings()}
            {activeTab === 1 && renderSecuritySettings()}
            {activeTab === 2 && renderNotificationSettings()}
            {activeTab === 3 && renderPaymentSettings()}
            {activeTab === 4 && renderInventorySettings()}
            {activeTab === 5 && renderStaffSettings()}
            {activeTab === 6 && renderReportSettings()}
          </Box>
        )}
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Box>
          <Button variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>
            إعادة تعيين
          </Button>
          <Button variant="outlined" onClick={handleExport} sx={{ mr: 2 }}>
            تصدير
          </Button>
          <Button variant="outlined" onClick={handleImport}>
            استيراد
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          startIcon={<SaveIcon />}
        >
          {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </Button>
      </Box>

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

export default SubstoresSettings;
