import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
} from '@mui/material';
import {
  IconSearch,
  IconEye,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'قائمة المنتجات',
  },
];

const ProductsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('الكل');

  const handleViewProduct = (productId) => {
    navigate(`/suppliers/products/details/${productId}`);
  };

  // Mock data - في التطبيق الحقيقي، سيتم جلب هذه البيانات من API
  const products = [
    {
      id: 1,
      name: 'لابتوب ديل إكس بي إس 13',
      sku: 'DL-XPS13-001',
      category: 'أجهزة كمبيوتر',
      price: 4500,
      stock: 15,
      status: 'متوفر',
      totalSold: 45,
      image: '/images/products/s1.jpg',
    },
    {
      id: 2,
      name: 'هاتف آيفون 15 برو',
      sku: 'AP-IP15P-001',
      category: 'هواتف ذكية',
      price: 5500,
      stock: 8,
      status: 'متوفر',
      totalSold: 32,
      image: '/images/products/s2.jpg',
    },
    {
      id: 3,
      name: 'سماعات سوني WH-1000XM5',
      sku: 'SN-WH1000XM5-001',
      category: 'سماعات',
      price: 1200,
      stock: 0,
      status: 'نفد المخزون',
      totalSold: 78,
      image: '/images/products/s3.jpg',
    },
    {
      id: 4,
      name: 'كاميرا كانون EOS R5',
      sku: 'CN-EOSR5-001',
      category: 'كاميرات',
      price: 12000,
      stock: 5,
      status: 'متوفر',
      totalSold: 12,
      image: '/images/products/s4.jpg',
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (categoryFilter === 'الكل' || product.category === categoryFilter) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <PageContainer title="قائمة المنتجات" description="إدارة منتجات المورد">
      <Breadcrumb title="قائمة المنتجات" items={BCrumb} />

      <Box>
        {/* Products List */}
        <DashboardCard
          title="قائمة المنتجات"
          subtitle="عرض وإدارة جميع منتجاتك"
          action={
            <Box display="flex" gap={2}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>التصنيف</InputLabel>
                <Select
                  value={categoryFilter}
                  label="التصنيف"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="الكل">الكل</MenuItem>
                  <MenuItem value="أجهزة كمبيوتر">أجهزة كمبيوتر</MenuItem>
                  <MenuItem value="هواتف ذكية">هواتف ذكية</MenuItem>
                  <MenuItem value="سماعات">سماعات</MenuItem>
                  <MenuItem value="كاميرات">كاميرات</MenuItem>
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
                  <TableCell>المنتج</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>التصنيف</TableCell>
                  <TableCell align="center">السعر</TableCell>
                  <TableCell align="center">المخزون</TableCell>
                  <TableCell align="center">المبيعات</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          src={product.image}
                          variant="rounded"
                          sx={{ width: 50, height: 50 }}
                        />
                        <Typography variant="subtitle1" fontWeight={600}>
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {product.sku}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={product.category} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600}>
                        {product.price.toLocaleString()} ر.س
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        color={product.stock > 0 ? 'success.main' : 'error.main'}
                        fontWeight={600}
                      >
                        {product.stock}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{product.totalSold}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={product.status}
                        size="small"
                        color={product.stock > 0 ? 'success' : 'error'}
                      />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <IconEye size={18} />
                          </IconButton>
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

export default ProductsList;

