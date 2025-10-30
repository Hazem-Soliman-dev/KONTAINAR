import React, { useState } from 'react';
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
import { IconSearch, IconEye, IconDownload } from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { StatusChip, downloadOrderPdf } from '../common/shared';
import { useNavigate } from 'react-router-dom';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'سجل الطلبات',
  },
];

const OrdersHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  // Mock data
  const orders = [
    {
      id: 'ORD-2023-156',
      date: '2024-01-10',
      customerName: 'شركة التقنية المتقدمة',
      products: 25,
      totalAmount: 112500,
      status: 'مكتمل',
      deliveryDate: '2024-01-12',
    },
    {
      id: 'ORD-2023-155',
      date: '2024-01-08',
      customerName: 'متجر الإلكترونيات',
      products: 18,
      totalAmount: 79200,
      status: 'مكتمل',
      deliveryDate: '2024-01-11',
    },
    {
      id: 'ORD-2023-154',
      date: '2024-01-05',
      customerName: 'شركة الابتكار الرقمي',
      products: 12,
      totalAmount: 54000,
      status: 'ملغى',
      deliveryDate: '-',
    },
    {
      id: 'ORD-2023-153',
      date: '2024-01-03',
      customerName: 'مؤسسة النجاح',
      products: 30,
      totalAmount: 135000,
      status: 'قيد التنفيذ',
      deliveryDate: '2024-01-16',
    },
    {
      id: 'ORD-2023-152',
      date: '2024-01-01',
      customerName: 'شركة الأمل',
      products: 8,
      totalAmount: 36000,
      status: 'مكتمل',
      deliveryDate: '2024-01-04',
    },
  ];

  // status colors are unified in shared helpers

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === 'الكل' || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <PageContainer title="سجل الطلبات" description="عرض سجل جميع الطلبات">
      <Breadcrumb title="سجل الطلبات" items={BCrumb} />

      <Box>
        {/* Orders History Table */}
        <DashboardCard
          title="سجل الطلبات"
          subtitle="عرض جميع الطلبات السابقة"
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
                  <MenuItem value="مكتمل">مكتمل</MenuItem>
                  <MenuItem value="قيد التنفيذ">قيد التنفيذ</MenuItem>
                  <MenuItem value="ملغى">ملغى</MenuItem>
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
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell align="center">المنتجات</TableCell>
                  <TableCell align="center">المبلغ (ر.س)</TableCell>
                  <TableCell align="center">تاريخ التسليم</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="primary">
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {order.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={order.products} size="small" color="primary" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        {order.totalAmount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{order.deliveryDate}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <StatusChip label={order.status} />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap={1} justifyContent="center">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/suppliers/orders/details/${order.id}`)}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => downloadOrderPdf(order.id)}
                        >
                          <IconDownload size={18} />
                        </IconButton>
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

export default OrdersHistory;
