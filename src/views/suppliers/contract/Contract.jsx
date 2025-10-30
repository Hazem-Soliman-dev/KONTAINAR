import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme,
} from '@mui/material';
import {
  IconFileDescription,
  IconCalendar,
  IconCheck,
  IconDownload,
  IconPrinter,
  IconCircleCheck,
} from '@tabler/icons-react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'العقد والاتفاقية',
  },
];

const Contract = () => {
  const theme = useTheme();
  // Mock contract data
  const contractInfo = {
    contractNumber: 'CON-2023-00145',
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    status: 'نشط',
    supplierName: 'شركة التقنية المتقدمة',
    containerName: 'منصة كونتينر',
    contractValue: '2,500,000',
    paymentTerms: '30 يوم',
    renewalOption: 'تلقائي',
  };

  const contractTerms = [
    'يلتزم المورد بتوريد المنتجات وفقاً للمواصفات المتفق عليها',
    'يتم الدفع خلال 30 يوم من تاريخ استلام الفاتورة',
    'يضمن المورد جودة المنتجات المقدمة وخلوها من العيوب',
    'يحق للمورد طلب إعادة التفاوض على الأسعار كل 6 أشهر',
    'يلتزم الطرفان بالحفاظ على سرية المعلومات التجارية',
    'يتم تجديد العقد تلقائياً لمدة سنة ما لم يتم الإخطار بالإلغاء قبل 60 يوم',
  ];

  const stats = [
    {
      icon: IconFileDescription,
      title: 'رقم العقد',
      value: contractInfo.contractNumber,
      color: 'primary',
    },
    {
      icon: IconCalendar,
      title: 'مدة العقد',
      value: '3 سنوات',
      color: 'success',
    },
    {
      icon: IconCheck,
      title: 'الحالة',
      value: contractInfo.status,
      color: 'info',
    },
    {
      icon: IconCircleCheck,
      title: 'التجديد',
      value: contractInfo.renewalOption,
      color: 'warning',
    },
  ];

  return (
    <PageContainer title="العقد والاتفاقية" description="عرض تفاصيل العقد">
      <Breadcrumb title="العقد والاتفاقية" items={BCrumb} />

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

        <Grid container spacing={3}>
          {/* Contract Details */}
          <Grid item xs={12} lg={8}>
            <DashboardCard
              title="تفاصيل العقد"
              subtitle="الاتفاقية بين المورد ومنصة كونتينر"
              action={
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<IconDownload size={20} />}
                  >
                    تحميل
                  </Button>
                  <Button variant="outlined" color="info" startIcon={<IconPrinter size={20} />}>
                    طباعة
                  </Button>
                </Box>
              }
            >
              <Box>
                {/* Contract Header */}
                <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                  <Typography variant="h5" fontWeight={700} align="center" mb={2}>
                    عقد توريد بين
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        الطرف الأول (المورد)
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {contractInfo.supplierName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        الطرف الثاني (المنصة)
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {contractInfo.containerName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Contract Info */}
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} md={6}>
                    <Box mb={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        تاريخ البدء
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {contractInfo.startDate}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box mb={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        تاريخ الانتهاء
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {contractInfo.endDate}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box mb={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        قيمة العقد
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="success.main">
                        {contractInfo.contractValue} ر.س
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box mb={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        شروط الدفع
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {contractInfo.paymentTerms}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Contract Terms */}
                <Typography variant="h6" fontWeight={700} mb={2}>
                  بنود وشروط العقد
                </Typography>
                <List>
                  {contractTerms.map((term, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <IconCheck color="green" size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            {index + 1}. {term}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </DashboardCard>
          </Grid>

          {/* Contract Status */}
          <Grid item xs={12} lg={4}>
            <DashboardCard title="حالة العقد" subtitle="معلومات إضافية">
              <Box>
                <Box mb={3}>
                  <Typography variant="subtitle2" color="textSecondary" mb={1}>
                    حالة العقد
                  </Typography>
                  <Chip label={contractInfo.status} color="success" size="medium" />
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle2" color="textSecondary" mb={1}>
                    الأيام المتبقية
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    689 يوم
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box mb={3}>
                  <Typography variant="subtitle2" color="textSecondary" mb={1}>
                    التجديد التلقائي
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {contractInfo.renewalOption}
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle2" color="textSecondary" mb={1}>
                    إشعار الإلغاء
                  </Typography>
                  <Typography variant="body2">60 يوم قبل انتهاء العقد</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="subtitle2" color="textSecondary" mb={2}>
                    الإجراءات
                  </Typography>
                  <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                    طلب تعديل العقد
                  </Button>
                  <Button variant="outlined" color="error" fullWidth>
                    طلب إنهاء العقد
                  </Button>
                </Box>
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Contract;

