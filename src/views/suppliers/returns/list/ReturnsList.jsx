import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { IconSearch, IconEye, IconCheck, IconX } from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'قائمة المرتجعات',
  },
];

const ReturnsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  // Mock data
  const returns = [
    {
      id: 'RET-2024-001',
      orderId: 'ORD-2023-145',
      date: '2024-01-12',
      customerName: 'شركة التقنية المتقدمة',
      productName: 'لابتوب ديل إكس بي إس 13',
      quantity: 2,
      reason: 'عيب تصنيع',
      status: 'قيد المراجعة',
      refundAmount: 9000,
    },
    {
      id: 'RET-2024-002',
      orderId: 'ORD-2023-142',
      date: '2024-01-10',
      customerName: 'متجر الإلكترونيات',
      productName: 'هاتف آيفون 15 برو',
      quantity: 1,
      reason: 'لا يعمل بشكل صحيح',
      status: 'مقبول',
      refundAmount: 5500,
    },
    {
      id: 'RET-2024-003',
      orderId: 'ORD-2023-138',
      date: '2024-01-08',
      customerName: 'شركة الابتكار الرقمي',
      productName: 'سماعات سوني WH-1000XM5',
      quantity: 3,
      reason: 'طلب خاطئ',
      status: 'مرفوض',
      refundAmount: 0,
    },
    {
      id: 'RET-2023-156',
      orderId: 'ORD-2023-125',
      date: '2023-12-28',
      customerName: 'مؤسسة النجاح',
      productName: 'كاميرا كانون EOS R5',
      quantity: 1,
      reason: 'تلف أثناء الشحن',
      status: 'مكتمل',
      refundAmount: 12000,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل':
        return 'success';
      case 'مقبول':
        return 'info';
      case 'قيد المراجعة':
        return 'warning';
      case 'مرفوض':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredReturns = returns.filter(
    (returnItem) =>
      (statusFilter === 'الكل' || returnItem.status === statusFilter) &&
      (returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <PageContainer title="قائمة المرتجعات" description="عرض جميع المرتجعات">
      <Breadcrumb title="قائمة المرتجعات" items={BCrumb} />

      <Box>
        {/* Returns Table */}
        <DashboardCard
          title="قائمة المرتجعات"
          subtitle="عرض جميع طلبات الإرجاع"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.warning.main}0F 0%, ${theme.palette.warning.main}08 100%)`,
            border: `1px solid ${theme.palette.warning.main}22`,
          })}
          action={
            <Box display="flex" gap={2}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={statusFilter}
                  label="الحالة"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="الكل">الكل</MenuItem>
                  <MenuItem value="قيد المراجعة">قيد المراجعة</MenuItem>
                  <MenuItem value="مقبول">مقبول</MenuItem>
                  <MenuItem value="مرفوض">مرفوض</MenuItem>
                  <MenuItem value="مكتمل">مكتمل</MenuItem>
                </Select>
              </FormControl>
              <TextField
                size="small"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          }
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>رقم المرتجع</TableCell>
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell>المنتج</TableCell>
                  <TableCell align="center">الكمية</TableCell>
                  <TableCell>السبب</TableCell>
                  <TableCell align="center">المبلغ المسترد</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReturns.map((returnItem) => (
                  <TableRow key={returnItem.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="primary">
                        {returnItem.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {returnItem.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{returnItem.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {returnItem.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{returnItem.productName}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={returnItem.quantity} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={returnItem.reason} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        {returnItem.refundAmount > 0
                          ? `${returnItem.refundAmount.toLocaleString()} ر.س`
                          : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={returnItem.status}
                        size="small"
                        color={getStatusColor(returnItem.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap={1} justifyContent="center">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/suppliers/returns/details/${returnItem.id}`)}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        {returnItem.status === 'قيد المراجعة' && (
                          <>
                            <IconButton
                              color="success"
                              size="small"
                              onClick={() => alert(`تم قبول المرتجع ${returnItem.id}`)}
                            >
                              <IconCheck size={18} />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => alert(`تم رفض المرتجع ${returnItem.id}`)}
                            >
                              <IconX size={18} />
                            </IconButton>
                          </>
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

export default ReturnsList;
