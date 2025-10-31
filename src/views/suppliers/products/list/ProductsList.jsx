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
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Drawer,
  Divider,
  Stack,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  IconSearch,
  IconEye,
  IconPackage,
  IconShoppingCart,
  IconAlertCircle,
  IconTrendingUp,
  IconEdit,
  IconTrash,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { useTheme } from '@mui/material/styles';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('الكل');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
  });
  const theme = useTheme();

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenViewDrawer(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description || '',
      image: product.image,
    });
    setOpenEditDialog(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleAddProduct = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      image: '',
    });
    setOpenAddDialog(true);
  };

  const handleSaveProduct = () => {
    // API call to save product
    setSnackbar({
      open: true,
      message: openEditDialog ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح',
      severity: 'success',
    });
    setOpenAddDialog(false);
    setOpenEditDialog(false);
  };

  const handleConfirmDelete = () => {
    // API call to delete product
    setSnackbar({
      open: true,
      message: 'تم حذف المنتج بنجاح',
      severity: 'success',
    });
    setOpenDeleteDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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

  // Calculate statistics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalSold = products.reduce((sum, p) => sum + p.totalSold, 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  const statsCards = [
    {
      title: 'إجمالي المنتجات',
      value: totalProducts,
      icon: IconPackage,
      color: 'primary',
    },
    {
      title: 'المخزون الكلي',
      value: totalStock,
      icon: IconTrendingUp,
      color: 'success',
    },
    {
      title: 'إجمالي المبيعات',
      value: totalSold,
      icon: IconShoppingCart,
      color: 'info',
    },
    {
      title: 'نفد المخزون',
      value: outOfStock,
      icon: IconAlertCircle,
      color: 'error',
    },
  ];

  return (
    <PageContainer title="قائمة المنتجات" description="إدارة منتجات المورد">
      <Breadcrumb title="قائمة المنتجات" items={BCrumb} />

      <Box>
        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          {statsCards.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{
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
              }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Avatar sx={{ bgcolor: alpha(theme.palette[stat.color].main, 0.1), color: theme.palette[stat.color].main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
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

        {/* Products List */}
        <DashboardCard
          title="قائمة المنتجات"
          subtitle="عرض وإدارة جميع منتجاتك"
          action={
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<IconPlus size={20} />}
                onClick={handleAddProduct}
              >
                إضافة منتج
              </Button>
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
                      <Chip
                        label={product.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
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
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="عرض التفاصيل">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewProduct(product)}
                          >
                            <IconEye size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تعديل">
                          <IconButton
                            color="secondary"
                            size="small"
                            onClick={() => handleEditProduct(product)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="حذف">
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteProduct(product)}
                          >
                            <IconTrash size={18} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* Add/Edit Product Dialog */}
        <Dialog
          open={openAddDialog || openEditDialog}
          onClose={() => {
            setOpenAddDialog(false);
            setOpenEditDialog(false);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>{openEditDialog ? 'تعديل المنتج' : 'إضافة منتج جديد'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="اسم المنتج"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="رمز المنتج (SKU)"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>التصنيف</InputLabel>
                    <Select
                      value={formData.category}
                      label="التصنيف"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <MenuItem value="أجهزة كمبيوتر">أجهزة كمبيوتر</MenuItem>
                      <MenuItem value="هواتف ذكية">هواتف ذكية</MenuItem>
                      <MenuItem value="سماعات">سماعات</MenuItem>
                      <MenuItem value="كاميرات">كاميرات</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="السعر (ر.س)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="المخزون"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="الوصف"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenAddDialog(false);
                setOpenEditDialog(false);
              }}
            >
              إلغاء
            </Button>
            <Button variant="contained" onClick={handleSaveProduct}>
              {openEditDialog ? 'تحديث' : 'إضافة'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Product Drawer */}
        <Drawer
          anchor="left"
          open={openViewDrawer}
          onClose={() => setOpenViewDrawer(false)}
          PaperProps={{ sx: { width: { xs: '100%', sm: 500 } } }}
        >
          {selectedProduct && (
            <Box sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  تفاصيل المنتج
                </Typography>
                <IconButton onClick={() => setOpenViewDrawer(false)}>
                  <IconX />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box textAlign="center" mb={3}>
                <Avatar
                  src={selectedProduct.image}
                  variant="rounded"
                  sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6" fontWeight={600}>
                  {selectedProduct.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  SKU: {selectedProduct.sku}
                </Typography>
              </Box>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    التصنيف
                  </Typography>
                  <Chip label={selectedProduct.category} size="small" color="primary" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    السعر
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedProduct.price.toLocaleString()} ر.س
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    المخزون
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color={selectedProduct.stock > 0 ? 'success.main' : 'error.main'}
                  >
                    {selectedProduct.stock}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    إجمالي المبيعات
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedProduct.totalSold}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الحالة
                  </Typography>
                  <Chip
                    label={selectedProduct.status}
                    size="small"
                    color={selectedProduct.stock > 0 ? 'success' : 'error'}
                  />
                </Box>
              </Stack>

              <Box mt={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<IconEdit />}
                  onClick={() => {
                    setOpenViewDrawer(false);
                    handleEditProduct(selectedProduct);
                  }}
                >
                  تعديل المنتج
                </Button>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogContent>
            <Typography>
              هل أنت متأكد من حذف المنتج "{selectedProduct?.name}"؟ لا يمكن التراجع عن هذا الإجراء.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              حذف
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </PageContainer>
  );
};

export default ProductsList;
