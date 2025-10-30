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
import { IconSearch, IconEye, IconDownload } from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { downloadInvoicePdf } from '../common/shared';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'قائمة الفواتير',
  },
];

const InvoicesList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  // Mock data
  const invoices = [
    {
      id: 'INV-2024-001',
      orderId: 'ORD-2023-156',
      date: '2024-01-10',
      dueDate: '2024-02-10',
      customerName: 'شركة التقنية المتقدمة',
      amount: 112500,
      paid: 112500,
      status: 'مدفوعة',
      paymentMethod: 'تحويل بنكي',
    },
    {
      id: 'INV-2024-002',
      orderId: 'ORD-2023-155',
      date: '2024-01-08',
      dueDate: '2024-02-08',
      customerName: 'متجر الإلكترونيات',
      amount: 79200,
      paid: 0,
      status: 'معلقة',
      paymentMethod: '-',
    },
    {
      id: 'INV-2024-003',
      orderId: 'ORD-2023-152',
      date: '2024-01-01',
      dueDate: '2024-02-01',
      customerName: 'شركة الأمل',
      amount: 36000,
      paid: 36000,
      status: 'مدفوعة',
      paymentMethod: 'بطاقة ائتمان',
    },
    {
      id: 'INV-2023-158',
      orderId: 'ORD-2023-142',
      date: '2023-12-28',
      dueDate: '2024-01-28',
      customerName: 'مؤسسة النجاح',
      amount: 135000,
      paid: 67500,
      status: 'مدفوعة جزئياً',
      paymentMethod: 'تحويل بنكي',
    },
    {
      id: 'INV-2023-157',
      orderId: 'ORD-2023-140',
      date: '2023-12-25',
      dueDate: '2024-01-15',
      customerName: 'شركة الابتكار',
      amount: 98500,
      paid: 0,
      status: 'متأخرة',
      paymentMethod: '-',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'مدفوعة':
        return 'success';
      case 'معلقة':
        return 'warning';
      case 'متأخرة':
        return 'error';
      case 'مدفوعة جزئياً':
        return 'info';
      default:
        return 'default';
    }
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      (statusFilter === 'الكل' || invoice.status === statusFilter) &&
      (invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <PageContainer title="قائمة الفواتير" description="عرض جميع الفواتير">
      <Breadcrumb title="قائمة الفواتير" items={BCrumb} />

      <Box>
        {/* Invoices Table */}
        <DashboardCard
          title="قائمة الفواتير"
          subtitle="عرض جميع الفواتير"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.info.main}0F 0%, ${theme.palette.info.main}08 100%)`,
            border: `1px solid ${theme.palette.info.main}22`,
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
                  <MenuItem value="مدفوعة">مدفوعة</MenuItem>
                  <MenuItem value="معلقة">معلقة</MenuItem>
                  <MenuItem value="متأخرة">متأخرة</MenuItem>
                  <MenuItem value="مدفوعة جزئياً">مدفوعة جزئياً</MenuItem>
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
                  <TableCell>رقم الفاتورة</TableCell>
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>تاريخ الاستحقاق</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell align="center">المبلغ (ر.س)</TableCell>
                  <TableCell align="center">المدفوع (ر.س)</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="primary">
                        {invoice.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {invoice.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{invoice.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{invoice.dueDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {invoice.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600}>
                        {invoice.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        {invoice.paid.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={invoice.status}
                        size="small"
                        color={getStatusColor(invoice.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap={1} justifyContent="center">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/suppliers/invoices/details/${invoice.id}`)}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => downloadInvoicePdf(invoice.id)}
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

export default InvoicesList;
