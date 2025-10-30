import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  IconButton,
  alpha,
  useTheme,
} from '@mui/material';
import {
  IconAlertCircle,
  IconPackageOff,
  IconTruckDelivery,
  IconReplace,
  IconEye,
  IconCheck,
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
    title: 'المنتجات التالفة',
  },
];

const ReturnsDamaged = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // Mock data
  const damagedProducts = [
    {
      id: 'DMG-2024-001',
      orderId: 'ORD-2023-145',
      date: '2024-01-12',
      customerName: 'شركة التقنية المتقدمة',
      productName: 'لابتوب ديل إكس بي إس 13',
      sku: 'DL-XPS13-001',
      quantity: 1,
      damageType: 'تلف أثناء الشحن',
      estimatedLoss: 4500,
      status: 'قيد المراجعة',
      action: 'استبدال',
    },
    {
      id: 'DMG-2024-002',
      orderId: 'ORD-2023-138',
      date: '2024-01-10',
      customerName: 'متجر الإلكترونيات',
      productName: 'سماعات سوني WH-1000XM5',
      sku: 'SN-WH1000XM5-001',
      quantity: 2,
      damageType: 'عيب تصنيع',
      estimatedLoss: 2400,
      status: 'تم الاستبدال',
      action: 'استبدال',
    },
    {
      id: 'DMG-2023-156',
      orderId: 'ORD-2023-125',
      date: '2023-12-28',
      customerName: 'مؤسسة النجاح',
      productName: 'كاميرا كانون EOS R5',
      sku: 'CN-EOSR5-001',
      quantity: 1,
      damageType: 'تلف أثناء الشحن',
      estimatedLoss: 12000,
      status: 'تم الاسترداد',
      action: 'استرداد',
    },
    {
      id: 'DMG-2023-155',
      orderId: 'ORD-2023-120',
      date: '2023-12-25',
      customerName: 'شركة الابتكار الرقمي',
      productName: 'هاتف آيفون 15 برو',
      sku: 'AP-IP15P-001',
      quantity: 1,
      damageType: 'لا يعمل بشكل صحيح',
      estimatedLoss: 5500,
      status: 'قيد المراجعة',
      action: 'استبدال',
    },
  ];

  const stats = [
    {
      icon: IconPackageOff,
      title: 'منتجات تالفة',
      value: '23',
      color: 'error',
    },
    {
      icon: IconTruckDelivery,
      title: 'تلف أثناء الشحن',
      value: '15',
      color: 'warning',
    },
    {
      icon: IconAlertCircle,
      title: 'عيوب تصنيع',
      value: '8',
      color: 'info',
    },
    {
      icon: IconReplace,
      title: 'تم الاستبدال',
      value: '18',
      color: 'success',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'تم الاستبدال':
      case 'تم الاسترداد':
        return 'success';
      case 'قيد المراجعة':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer title="المنتجات التالفة" description="عرض المنتجات التالفة">
      <Breadcrumb title="المنتجات التالفة" items={BCrumb} />

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
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Damaged Products Table */}
        <DashboardCard
          title="المنتجات التالفة"
          subtitle="عرض جميع المنتجات التالفة والإجراءات المتخذة"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.error.main}0F 0%, ${theme.palette.error.main}08 100%)`,
            border: `1px solid ${theme.palette.error.main}22`,
          })}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>رقم البلاغ</TableCell>
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell>المنتج</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell align="center">الكمية</TableCell>
                  <TableCell>نوع التلف</TableCell>
                  <TableCell align="center">الخسارة المقدرة</TableCell>
                  <TableCell align="center">الإجراء</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {damagedProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="error">
                        {product.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {product.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{product.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {product.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{product.productName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {product.sku}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={product.quantity} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<IconAlertCircle size={16} />}
                        label={product.damageType}
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="error.main">
                        {product.estimatedLoss.toLocaleString()} ر.س
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={product.action} size="small" color="info" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={product.status}
                        size="small"
                        color={getStatusColor(product.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap={1} justifyContent="center">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/suppliers/returns/details/${product.id}`)}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        {product.status === 'قيد المراجعة' && (
                          <IconButton
                            color="success"
                            size="small"
                            onClick={() => alert(`تم قبول التلف ${product.id}`)}
                          >
                            <IconCheck size={18} />
                          </IconButton>
                        )}
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

export default ReturnsDamaged;
