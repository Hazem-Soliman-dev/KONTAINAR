import React from 'react';
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
  Button,
  IconButton,
  Badge,
} from '@mui/material';
import { IconEye, IconDownload, IconClock, IconCheck } from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { PriorityChip, DateWithIcon, StatusChip, downloadOrderPdf } from '../common/shared';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'الطلبات الجديدة',
  },
];

const OrdersNew = () => {
  const navigate = useNavigate();
  // Mock data
  const newOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      customerName: 'شركة التقنية المتقدمة',
      products: 15,
      totalAmount: 67500,
      status: 'جديد',
      priority: 'عالية',
      dueDate: '2024-01-20',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-15',
      customerName: 'متجر الإلكترونيات',
      products: 8,
      totalAmount: 44000,
      status: 'جديد',
      priority: 'متوسطة',
      dueDate: '2024-01-22',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-14',
      customerName: 'شركة الابتكار الرقمي',
      products: 22,
      totalAmount: 98500,
      status: 'جديد',
      priority: 'عالية',
      dueDate: '2024-01-19',
    },
    {
      id: 'ORD-2024-004',
      date: '2024-01-14',
      customerName: 'مؤسسة النجاح',
      products: 5,
      totalAmount: 22500,
      status: 'قيد المراجعة',
      priority: 'منخفضة',
      dueDate: '2024-01-25',
    },
  ];

  // colors and chips now unified in shared helpers

  return (
    <PageContainer title="الطلبات الجديدة" description="عرض الطلبات الجديدة">
      <Breadcrumb title="الطلبات الجديدة" items={BCrumb} />

      <Box>
        {/* Orders Table */}
        <DashboardCard
          title="الطلبات الجديدة"
          subtitle="عرض جميع الطلبات الجديدة التي تتطلب مراجعتك"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}0F 0%, ${theme.palette.primary.main}08 100%)`,
            border: `1px solid ${theme.palette.primary.main}22`,
          })}
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
                  <TableCell align="center">الأولوية</TableCell>
                  <TableCell align="center">موعد التسليم</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newOrders.map((order) => (
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
                      <PriorityChip label={order.priority} />
                    </TableCell>
                    <TableCell align="center">
                      <DateWithIcon date={order.dueDate} />
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
                          color="success"
                          size="small"
                          onClick={() => alert(`تم قبول الطلب ${order.id}`)}
                        >
                          <IconCheck size={18} />
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

export default OrdersNew;
