import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Alert,
  Divider,
  Stack,
} from '@mui/material';
import {
  IconDeviceFloppy,
  IconArrowLeft,
  IconCurrencyDollar,
  IconPackage,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    to: '/suppliers/products/list',
    title: 'قائمة المنتجات',
  },
  {
    title: 'إضافة منتج جديد',
  },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    specifications: '',
    warranty: '',
    brand: '',
    model: '',
    weight: '',
    dimensions: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const categories = [
    'أجهزة كمبيوتر',
    'هواتف ذكية',
    'سماعات',
    'كاميرات',
    'شاشات',
    'ملحقات',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'اسم المنتج مطلوب';
    }
    if (!formData.sku.trim()) {
      newErrors.sku = 'رمز المنتج (SKU) مطلوب';
    }
    if (!formData.category) {
      newErrors.category = 'التصنيف مطلوب';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'السعر يجب أن يكون أكبر من صفر';
    }
    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'الكمية يجب أن تكون صفر أو أكثر';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'الوصف مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: Submit to API
      console.log('Form Data:', formData);
      setSuccessMessage('تم إضافة المنتج بنجاح!');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/suppliers/products/list');
      }, 2000);
    }
  };

  const handleCancel = () => {
    navigate('/suppliers/products/list');
  };

  return (
    <PageContainer title="إضافة منتج جديد" description="إضافة منتج جديد للمورد">
      <Breadcrumb title="إضافة منتج جديد" items={BCrumb} />

      <Box>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight={600} mb={3}>
              معلومات المنتج الأساسية
            </Typography>
            <Grid container spacing={3} flexDirection={"column"}>
              {/* Product Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="اسم المنتج *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  placeholder="أدخل اسم المنتج"
                />
              </Grid>

              {/* SKU */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="رمز المنتج (SKU) *"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  error={!!errors.sku}
                  helperText={errors.sku}
                  placeholder="مثال: DL-XPS13-001"
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>التصنيف *</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="التصنيف *"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                      {errors.category}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Brand */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="العلامة التجارية"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="مثال: Dell, Apple, Sony"
                />
              </Grid>

              {/* Model */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="الموديل"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="مثال: XPS 13"
                />
              </Grid>

              {/* Price */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="السعر *"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconCurrencyDollar size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">ر.س</InputAdornment>,
                  }}
                />
              </Grid>

              {/* Stock */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="الكمية المتوفرة *"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  error={!!errors.stock}
                  helperText={errors.stock}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconPackage size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Warranty */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="فترة الضمان"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                  placeholder="مثال: سنة واحدة، سنتان"
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="الوصف *"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  multiline
                  rows={4}
                  placeholder="أدخل وصف تفصيلي للمنتج..."
                />
              </Grid>

              {/* Specifications */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="المواصفات التقنية"
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="أدخل المواصفات التقنية للمنتج..."
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight={600} mb={3}>
              معلومات الشحن
            </Typography>
            <Grid container spacing={3}>
                {/* Weight */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="الوزن"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="مثال: 1.5"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">كجم</InputAdornment>,
                    }}
                  />
                </Grid>

                {/* Dimensions */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="الأبعاد"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    placeholder="مثال: 30 × 20 × 5"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">سم</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

          {/* Action Buttons */}
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                size="large"
                startIcon={<IconArrowLeft />}
                onClick={handleCancel}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<IconDeviceFloppy />}
              >
                حفظ المنتج
              </Button>
            </Stack>
          </Paper>
        </form>
      </Box>
    </PageContainer>
  );
};

export default AddProduct;

