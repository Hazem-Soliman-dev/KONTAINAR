import React, { useState, useMemo } from 'react';
import { Box, Grid, TextField, MenuItem, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

const BCrumb = [
  { to: '/suppliers', title: 'الرئيسية' },
  { to: '/suppliers/products/list', title: 'قائمة المنتجات' },
  { title: 'تعديل المنتج' },
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: fetch by id; mocked using defaults
  const initial = useMemo(
    () => ({
      id: id || '1',
      name: 'لابتوب ديل إكس بي إس 13',
      sku: 'DL-XPS13-001',
      category: 'أجهزة كمبيوتر',
      price: 4500,
      stock: 15,
      status: 'متوفر',
      description:
        'لابتوب ديل إكس بي إس 13 بشاشة 13.3 بوصة عالية الدقة، معالج Intel Core i7، ذاكرة 16GB، SSD 512GB.',
    }),
    [id],
  );

  const [form, setForm] = useState(initial);

  const handleChange = (field) => (e) => {
    const value = field === 'price' || field === 'stock' ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API to save
    console.log('Saving product', form);
    navigate(`/suppliers/products/details/${form.id}`);
  };

  return (
    <PageContainer title={`تعديل المنتج ${form.id}`} description="تحرير بيانات المنتج">
      <Breadcrumb title="تعديل المنتج" items={BCrumb} />

      <Box component="form" onSubmit={handleSubmit}>
        <DashboardCard
          title="بيانات المنتج"
          subtitle="قم بتعديل الحقول المطلوبة ثم احفظ التغييرات"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.warning.main}0F 0%, ${theme.palette.warning.main}08 100%)`,
            border: `1px solid ${theme.palette.warning.main}22`,
          })}
        >
          <Grid container spacing={2} flexDirection={'column'}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="اسم المنتج"
                value={form.name}
                onChange={handleChange('name')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="SKU" value={form.sku} onChange={handleChange('sku')} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="التصنيف"
                value={form.category}
                onChange={handleChange('category')}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="number"
                label="السعر"
                value={form.price}
                onChange={handleChange('price')}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="number"
                label="المخزون"
                value={form.stock}
                onChange={handleChange('stock')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="الحالة"
                value={form.status}
                onChange={handleChange('status')}
              >
                <MenuItem value="متوفر">متوفر</MenuItem>
                <MenuItem value="غير متوفر">غير متوفر</MenuItem>
                <MenuItem value="موقوف">موقوف</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="الوصف"
                value={form.description}
                onChange={handleChange('description')}
                multiline
                minRows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  إلغاء
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  حفظ التغييرات
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default EditProduct;
