import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  alpha,
  useTheme,
} from '@mui/material';
import {
  IconArrowLeft,
  IconEdit,
  IconPackage,
  IconCategory,
  IconCurrencyDollar,
  IconTrendingUp,
  IconShoppingCart,
  IconStar,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

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
    title: 'تفاصيل المنتج',
  },
];

const ProductDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  // TODO: Fetch product data from API based on ID
  // Mock data for now
  const product = {
    id: id || '1',
    name: 'لابتوب ديل إكس بي إس 13',
    sku: 'DL-XPS13-001',
    category: 'أجهزة كمبيوتر',
    price: 4500,
    stock: 15,
    status: 'متوفر',
    totalSold: 78,
    image: '/images/products/s1.jpg',
    brand: 'Dell',
    model: 'XPS 13',
    warranty: 'سنة واحدة',
    weight: '1.2 كجم',
    dimensions: '30 × 20 × 1.5 سم',
    description: 'لابتوب ديل إكس بي إس 13 بشاشة 13.3 بوصة عالية الدقة، معالج Intel Core i7 من الجيل الحادي عشر، ذاكرة وصول عشوائي 16 جيجابايت، قرص صلب SSD سعة 512 جيجابايت. تصميم أنيق وخفيف الوزن مع أداء قوي.',
    specifications: `• المعالج: Intel Core i7-1165G7
• الذاكرة: 16GB DDR4
• التخزين: 512GB NVMe SSD
• الشاشة: 13.3" FHD (1920x1080)
• كرت الشاشة: Intel Iris Xe Graphics
• نظام التشغيل: Windows 11 Pro
• البطارية: حتى 12 ساعة`,
    rating: 4.7,
    reviews: 45,
    addedDate: '2024-01-10',
    lastUpdated: '2024-01-15',
  };

  // Statistics cards
  const stats = [
    {
      icon: IconPackage,
      title: 'المخزون المتوفر',
      value: product.stock.toString(),
      color: product.stock > 10 ? 'success' : 'warning',
    },
    {
      icon: IconShoppingCart,
      title: 'إجمالي المبيعات',
      value: product.totalSold.toString(),
      color: 'primary',
    },
    {
      icon: IconCurrencyDollar,
      title: 'إجمالي الإيرادات',
      value: `${(product.price * product.totalSold).toLocaleString()} ر.س`,
      color: 'info',
    },
    {
      icon: IconStar,
      title: 'التقييم',
      value: `${product.rating} (${product.reviews})`,
      color: 'warning',
    },
  ];

  const handleBack = () => {
    navigate('/suppliers/products/list');
  };

  const handleEdit = () => {
    navigate(`/suppliers/products/edit/${product.id}`);
  };

  return (
    <PageContainer title="تفاصيل المنتج" description="عرض تفاصيل المنتج">
      <Breadcrumb title="تفاصيل المنتج" items={BCrumb} />

      <Box>
        {/* Action Buttons */}
        <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="outlined"
            startIcon={<IconArrowLeft />}
            onClick={handleBack}
          >
            العودة للقائمة
          </Button>
          <Button
            variant="contained"
            startIcon={<IconEdit />}
            onClick={handleEdit}
          >
            تعديل المنتج
          </Button>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette[stat.color].main,
                    0.08,
                  )} 0%, ${alpha(theme.palette[stat.color].main, 0.04)} 100%)`,
                  border: `1px solid ${alpha(theme.palette[stat.color].main, 0.2)}`,
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette[stat.color].main, 0.1),
                      color: theme.palette[stat.color].main,
                      width: 48,
                      height: 48,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <stat.icon />
                  </Avatar>
                  <Typography variant="h5" fontWeight={700} mb={0.5}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid spacing={3} flexDirection={{xs: 'column', lg: 'row'}}>
          {/* Product Main Info */}
          <Grid item xs={{width: '100%'}} lg={{width: '60%'}}>
            <DashboardCard title="معلومات المنتج">
              <Box>
                {/* Product Image and Basic Info */}
                <Box display="flex" gap={3} mb={3}>
                  <Avatar
                    src={product.image}
                    variant="rounded"
                    sx={{ width: 150, height: 150 }}
                  />
                  <Box flex={1}>
                    <Typography variant="h4" fontWeight={700} mb={1}>
                      {product.name}
                    </Typography>
                    <Box display="flex" gap={1} mb={2}>
                      <Chip label={product.category} color="primary" size="small" />
                      <Chip
                        label={product.status}
                        color={product.stock > 0 ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="h5" color="primary.main" fontWeight={600} mb={1}>
                      {product.price.toLocaleString()} ر.س
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SKU: {product.sku}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Description */}
                <Box mb={3}>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    الوصف
                  </Typography>
                  <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                    {product.description}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Specifications */}
                <Box>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    المواصفات التقنية
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="pre"
                    sx={{ whiteSpace: 'pre-line', fontFamily: 'inherit'}}
                  >
                    {product.specifications}
                  </Typography>
                </Box>
              </Box>
            </DashboardCard>
          </Grid>

          {/* Product Details Sidebar */}
          <Grid item xs={{width: '100%'}} lg={{width: '40%'}}>
            <DashboardCard title="تفاصيل إضافية">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        العلامة التجارية
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{product.brand}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        الموديل
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{product.model}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        الضمان
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{product.warranty}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        الوزن
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{product.weight}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        الأبعاد
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{product.dimensions}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        تاريخ الإضافة
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{product.addedDate}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        آخر تحديث
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{product.lastUpdated}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DashboardCard>

            {/* Status Card */}
            <Box mt={3}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.success.main,
                    0.08,
                  )} 0%, ${alpha(theme.palette.success.main, 0.04)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                }}
              >
                <CardContent>
                  <IconCategory size={48} color={theme.palette.success.main} />
                  <Typography variant="h6" fontWeight={600} mt={2} mb={1}>
                    منتج نشط
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    هذا المنتج متاح للبيع حالياً
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ProductDetails;

