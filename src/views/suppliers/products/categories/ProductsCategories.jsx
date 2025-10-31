import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
} from '@mui/material';
import { IconCategory, IconPackage, IconTrendingUp, IconShoppingCart } from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'التصنيفات',
  },
];

const ProductsCategories = () => {
  const theme = useTheme();
  // Mock data
  const categories = [
    {
      id: 1,
      name: 'أجهزة كمبيوتر',
      icon: '💻',
      productsCount: 45,
      totalSales: 234,
      revenue: 1050000,
      percentage: 35,
      color: 'primary',
    },
    {
      id: 2,
      name: 'هواتف ذكية',
      icon: '📱',
      productsCount: 32,
      totalSales: 189,
      revenue: 1039500,
      percentage: 28,
      color: 'success',
    },
    {
      id: 3,
      name: 'سماعات',
      icon: '🎧',
      productsCount: 28,
      totalSales: 345,
      revenue: 414000,
      percentage: 20,
      color: 'warning',
    },
    {
      id: 4,
      name: 'كاميرات',
      icon: '📷',
      productsCount: 15,
      totalSales: 67,
      revenue: 804000,
      percentage: 10,
      color: 'error',
    },
    {
      id: 5,
      name: 'اكسسوارات',
      icon: '🔌',
      productsCount: 22,
      totalSales: 412,
      revenue: 82400,
      percentage: 7,
      color: 'info',
    },
  ];

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productsCount, 0);
  const totalSales = categories.reduce((sum, cat) => sum + cat.totalSales, 0);
  const totalRevenue = categories.reduce((sum, cat) => sum + cat.revenue, 0);

  return (
    <PageContainer title="تصنيفات المنتجات" description="عرض تصنيفات المنتجات">
      <Breadcrumb title="تصنيفات المنتجات" items={BCrumb} />

      <Box>
        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          {[
            {
              title: 'إجمالي التصنيفات',
              value: categories.length,
              icon: IconCategory,
              color: 'primary',
            },
            { title: 'إجمالي المنتجات', value: totalProducts, icon: IconPackage, color: 'info' },
            {
              title: 'إجمالي المبيعات',
              value: totalSales,
              icon: IconShoppingCart,
              color: 'success',
            },
            {
              title: 'إجمالي الإيرادات',
              value: (totalRevenue / 1000).toFixed(0) + 'K',
              icon: IconTrendingUp,
              color: 'warning',
            },
          ].map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  flexDirection: 'row',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette[stat.color].main,
                    0.08,
                  )} 0%, ${alpha(theme.palette[stat.color].main, 0.04)} 100%)`,
                  border: `1px solid ${alpha(theme.palette[stat.color].main, 0.2)}`,
                  transition: 'all .3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                  '& .stat-icon': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette[stat.color].main, 0.1),
                        color: theme.palette[stat.color].main,
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <stat.icon />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {stat.title}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Categories Table */}
        <DashboardCard title="تصنيفات المنتجات" subtitle="عرض جميع تصنيفات منتجاتك">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>التصنيف</TableCell>
                  <TableCell align="center">عدد المنتجات</TableCell>
                  <TableCell align="center">إجمالي المبيعات</TableCell>
                  <TableCell align="center">الإيرادات (ر.س)</TableCell>
                  <TableCell>النسبة من المبيعات</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            bgcolor: `${category.color}.light`,
                            color: `${category.color}.main`,
                            width: 48,
                            height: 48,
                            fontSize: '24px',
                          }}
                        >
                          {category.icon}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {category.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={category.productsCount} color={category.color} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600}>
                        {category.totalSales}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        {category.revenue.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={category.percentage}
                            color={category.color}
                            sx={{ height: 8, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {category.percentage}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="نشط" size="small" color="success" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default ProductsCategories;
