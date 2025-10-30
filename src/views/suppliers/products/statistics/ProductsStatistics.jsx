import React from 'react';
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
  alpha,
  useTheme,
} from '@mui/material';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconShoppingCart,
  IconPackage,
  IconCash,
  IconStar,
} from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'إحصائيات المنتجات',
  },
];

const ProductsStatistics = () => {
  const theme = useTheme();
  // Mock data
  const topProducts = [
    {
      id: 1,
      name: 'سماعات سوني WH-1000XM5',
      sales: 78,
      revenue: 93600,
      trend: 'up',
      trendValue: 12,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'لابتوب ديل إكس بي إس 13',
      sales: 45,
      revenue: 202500,
      trend: 'up',
      trendValue: 8,
      rating: 4.6,
    },
    {
      id: 3,
      name: 'هاتف آيفون 15 برو',
      sales: 32,
      revenue: 176000,
      trend: 'down',
      trendValue: 5,
      rating: 4.9,
    },
    {
      id: 4,
      name: 'كاميرا كانون EOS R5',
      sales: 12,
      revenue: 144000,
      trend: 'up',
      trendValue: 15,
      rating: 4.7,
    },
  ];

  // Calculate product statistics
  const totalProducts = topProducts.length;
  const totalSales = topProducts.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = topProducts.reduce((sum, p) => sum + p.revenue, 0);
  const avgRating = (
    topProducts.reduce((sum, p) => sum + p.rating, 0) / topProducts.length
  ).toFixed(1);
  const trendingUp = topProducts.filter((p) => p.trend === 'up').length;

  const stats = [
    {
      icon: IconPackage,
      title: 'أفضل المنتجات',
      value: totalProducts.toString(),
      change: '+12%',
      trend: 'up',
      color: 'primary',
    },
    {
      icon: IconShoppingCart,
      title: 'إجمالي المبيعات',
      value: totalSales.toString(),
      change: '+23%',
      trend: 'up',
      color: 'success',
    },
    {
      icon: IconCash,
      title: 'إجمالي الإيرادات',
      value: `${(totalRevenue / 1000).toFixed(0)}K ر.س`,
      change: '+18%',
      trend: 'up',
      color: 'warning',
    },
    {
      icon: IconStar,
      title: 'متوسط التقييم',
      value: avgRating,
      change: '+0.3',
      trend: 'up',
      color: 'error',
    },
  ];

  return (
    <PageContainer title="إحصائيات المنتجات" description="عرض إحصائيات المنتجات">
      <Breadcrumb title="إحصائيات المنتجات" items={BCrumb} />

      <Box>
        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
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
                }}
              >
                <CardContent>
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
                  <Typography variant="h4" fontWeight={700} mb={1}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {stat.title}
                  </Typography>
                  <Chip
                    icon={
                      stat.trend === 'up' ? (
                        <IconTrendingUp size={16} />
                      ) : (
                        <IconTrendingDown size={16} />
                      )
                    }
                    label={stat.change}
                    size="small"
                    color={stat.trend === 'up' ? 'success' : 'error'}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Top Products */}
        <DashboardCard
          title="المنتجات الأكثر مبيعاً"
          subtitle="عرض المنتجات الأكثر مبيعاً هذا الشهر"
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>المنتج</TableCell>
                  <TableCell align="center">المبيعات</TableCell>
                  <TableCell align="center">الإيرادات (ر.س)</TableCell>
                  <TableCell align="center">الاتجاه</TableCell>
                  <TableCell align="center">التقييم</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Chip
                        label={index + 1}
                        size="small"
                        color={index === 0 ? 'warning' : 'default'}
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {product.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="primary">
                        {product.sales}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        {product.revenue.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        icon={
                          product.trend === 'up' ? (
                            <IconTrendingUp size={16} />
                          ) : (
                            <IconTrendingDown size={16} />
                          )
                        }
                        label={`${product.trendValue}%`}
                        size="small"
                        color={product.trend === 'up' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                        <IconStar size={18} fill="#FFC107" stroke="#FFC107" />
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.rating}
                        </Typography>
                      </Box>
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

export default ProductsStatistics;
