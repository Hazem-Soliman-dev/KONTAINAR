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
        {/* Summary Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
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
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <IconCategory size={32} />
                </Avatar>
                <Typography variant="h4" fontWeight={700} mb={1}>
                  {categories.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  إجمالي التصنيفات
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
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
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <IconPackage size={32} />
                </Avatar>
                <Typography variant="h4" fontWeight={700} mb={1}>
                  {totalProducts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  إجمالي المنتجات
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
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
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <IconShoppingCart size={32} />
                </Avatar>
                <Typography variant="h4" fontWeight={700} mb={1}>
                  {totalSales}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  إجمالي المبيعات
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
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
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: theme.palette.error.main,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <IconTrendingUp size={32} />
                </Avatar>
                <Typography variant="h4" fontWeight={700} mb={1}>
                  {(totalRevenue / 1000).toFixed(0)}K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  إجمالي الإيرادات
                </Typography>
              </CardContent>
            </Card>
          </Grid>
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

