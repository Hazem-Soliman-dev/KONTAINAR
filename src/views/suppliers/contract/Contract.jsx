import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Drawer,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import {
  IconFileDescription,
  IconCalendar,
  IconCheck,
  IconDownload,
  IconPrinter,
  IconCircleCheck,
  IconEdit,
  IconHistory,
  IconFile,
  IconUpload,
  IconNotes,
  IconCurrencyDollar,
  IconEye,
  IconTrash,
  IconX,
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
  const [openAmendmentDialog, setOpenAmendmentDialog] = useState(false);
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [openDocumentsDialog, setOpenDocumentsDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openNotesDialog, setOpenNotesDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openViewDocumentDrawer, setOpenViewDocumentDrawer] = useState(false);
  const [openEditDocumentDialog, setOpenEditDocumentDialog] = useState(false);
  const [openDeleteDocumentDialog, setOpenDeleteDocumentDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [amendmentRequest, setAmendmentRequest] = useState('');
  const [newNote, setNewNote] = useState('');
  const [editDocumentData, setEditDocumentData] = useState({ name: '', type: '', notes: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleRequestAmendment = () => {
    setSnackbar({
      open: true,
      message: 'تم إرسال طلب تعديل العقد بنجاح',
      severity: 'success',
    });
    setOpenAmendmentDialog(false);
    setAmendmentRequest('');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUploadDocument = () => {
    setSnackbar({
      open: true,
      message: 'تم رفع المستند بنجاح',
      severity: 'success',
    });
    setOpenUploadDialog(false);
  };

  const handleAddNote = () => {
    setSnackbar({
      open: true,
      message: 'تم إضافة الملاحظة بنجاح',
      severity: 'success',
    });
    setOpenNotesDialog(false);
    setNewNote('');
  };

  const handleViewDocument = (doc) => {
    setSelectedDocument(doc);
    setOpenViewDocumentDrawer(true);
  };

  const handleEditDocument = (doc) => {
    setSelectedDocument(doc);
    setEditDocumentData({
      name: doc.name,
      type: doc.type,
      notes: '',
    });
    setOpenEditDocumentDialog(true);
  };

  const handleSaveEditDocument = () => {
    setSnackbar({
      open: true,
      message: `تم تحديث المستند ${selectedDocument?.name}`,
      severity: 'success',
    });
    setOpenEditDocumentDialog(false);
  };

  const handleDownloadDocument = (doc) => {
    setSnackbar({
      open: true,
      message: `جاري تحميل ${doc.name}...`,
      severity: 'info',
    });
    // Simulate download
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `تم تحميل ${doc.name} بنجاح`,
        severity: 'success',
      });
    }, 1000);
  };

  const handleDeleteDocument = (doc) => {
    setSelectedDocument(doc);
    setOpenDeleteDocumentDialog(true);
  };

  const handleConfirmDeleteDocument = () => {
    setSnackbar({
      open: true,
      message: `تم حذف المستند ${selectedDocument?.name}`,
      severity: 'error',
    });
    setOpenDeleteDocumentDialog(false);
  };

  const handleDownloadContractPDF = () => {
    setSnackbar({
      open: true,
      message: 'جاري تحميل نسخة PDF من العقد...',
      severity: 'info',
    });
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'تم تحميل العقد بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handlePrintContract = () => {
    setSnackbar({
      open: true,
      message: 'جاري تجهيز العقد للطباعة...',
      severity: 'info',
    });
    setTimeout(() => {
      window.print();
    }, 500);
  };

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

  const contractHistory = [
    {
      version: '3.0',
      date: '2024-01-15',
      changes: 'تحديث شروط الدفع والتجديد التلقائي',
      status: 'نشط',
    },
    {
      version: '2.0',
      date: '2023-06-01',
      changes: 'إضافة بند الجودة وشروط الإرجاع',
      status: 'منتهي',
    },
    {
      version: '1.0',
      date: '2023-01-01',
      changes: 'النسخة الأولى من العقد',
      status: 'منتهي',
    },
  ];

  const contractDocuments = [
    {
      id: 1,
      name: 'العقد الأساسي - نسخة موقعة',
      type: 'PDF',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'المنصة',
    },
    {
      id: 2,
      name: 'ملحق شروط الجودة',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2023-06-01',
      uploadedBy: 'المورد',
    },
    {
      id: 3,
      name: 'السجل التجاري',
      type: 'PDF',
      size: '800 KB',
      uploadDate: '2023-01-01',
      uploadedBy: 'المورد',
    },
  ];

  const paymentSchedule = [
    {
      id: 1,
      dueDate: '2024-02-01',
      amount: 250000,
      status: 'مدفوعة',
      paymentDate: '2024-01-30',
    },
    {
      id: 2,
      dueDate: '2024-03-01',
      amount: 250000,
      status: 'مدفوعة',
      paymentDate: '2024-02-28',
    },
    {
      id: 3,
      dueDate: '2024-04-01',
      amount: 250000,
      status: 'معلقة',
      paymentDate: null,
    },
    {
      id: 4,
      dueDate: '2024-05-01',
      amount: 250000,
      status: 'قادمة',
      paymentDate: null,
    },
  ];

  const contractNotes = [
    {
      id: 1,
      date: '2024-01-20',
      author: 'المورد',
      note: 'تم مناقشة تحديث شروط التسليم مع فريق المبيعات',
    },
    {
      id: 2,
      date: '2024-01-10',
      author: 'المنصة',
      note: 'تم الموافقة على طلب زيادة الكميات المطلوبة',
    },
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
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  flexDirection: 'row',
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette[stat.color].main,
                    0.08,
                  )} 0%, ${alpha(theme.palette[stat.color].main, 0.04)} 100%)`,
                  border: `1px solid ${alpha(theme.palette[stat.color].main, 0.2)}`,
                  transition: 'all .3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                  '& .stat-icon': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
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
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Contract Details */}
          <Grid size={{ xs: 12, sm: 6, lg: 8 }}>
            <DashboardCard
              title="تفاصيل العقد"
              subtitle="الاتفاقية بين المورد ومنصة كونتينر"
              sx={{
                height: '100%',
              }}
              action={
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<IconDownload size={18} />}
                    onClick={handleDownloadContractPDF}
                  >
                    تحميل
                  </Button>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    startIcon={<IconPrinter size={18} />}
                    onClick={handlePrintContract}
                  >
                    طباعة
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<IconHistory size={18} />}
                    onClick={() => setOpenHistoryDialog(true)}
                  >
                    السجل
                  </Button>
                </Stack>
              }
            >
              <Box>
                {/* Contract Header */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    mb: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" fontWeight={700} align="center" mb={3} color="primary">
                    عقد توريد بين
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          display="block"
                          mb={0.5}
                        >
                          الطرف الأول (المورد)
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {contractInfo.supplierName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          display="block"
                          mb={0.5}
                        >
                          الطرف الثاني (المنصة)
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {contractInfo.containerName}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Contract Info */}
                <Box mb={3}>
                  <Typography variant="h6" fontWeight={600} mb={2} color="text.primary">
                    معلومات العقد
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          bgcolor: 'background.default',
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          display="block"
                          mb={0.5}
                        >
                          تاريخ البدء
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {contractInfo.startDate}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          bgcolor: 'background.default',
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          display="block"
                          mb={0.5}
                        >
                          تاريخ الانتهاء
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {contractInfo.endDate}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          bgcolor: alpha(theme.palette.success.main, 0.04),
                          border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          display="block"
                          mb={0.5}
                        >
                          قيمة العقد
                        </Typography>
                        <Typography variant="h6" fontWeight={700} color="success.main">
                          {contractInfo.contractValue} ر.س
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          bgcolor: 'background.default',
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          display="block"
                          mb={0.5}
                        >
                          شروط الدفع
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {contractInfo.paymentTerms}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Contract Terms */}
                <Box>
                  <Typography variant="h6" fontWeight={600} mb={2} color="text.primary">
                    بنود وشروط العقد
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                    }}
                  >
                    <List sx={{ py: 0 }}>
                      {contractTerms.map((term, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            py: 1.5,
                            px: 1,
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.04),
                              borderRadius: 1,
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: alpha(theme.palette.success.main, 0.1),
                                color: 'success.main',
                              }}
                            >
                              <IconCheck size={16} />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" color="text.secondary">
                                {index + 1}. {term}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Box>
              </Box>
            </DashboardCard>
          </Grid>

          {/* Contract Status */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <DashboardCard
              title="حالة العقد"
              subtitle="معلومات إضافية"
              sx={{
                height: '100%',
              }}
            >
              <Stack spacing={3}>
                {/* Status Card */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.04),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" color="textSecondary" display="block" mb={1}>
                    حالة العقد
                  </Typography>
                  <Chip
                    label={contractInfo.status}
                    color="success"
                    size="medium"
                    sx={{ fontWeight: 600 }}
                  />
                </Paper>

                {/* Days Remaining */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="caption" color="textSecondary" display="block" mb={1}>
                    الأيام المتبقية
                  </Typography>
                  <Typography variant="h3" fontWeight={700} color="primary">
                    689
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    يوم
                  </Typography>
                </Paper>

                <Divider />

                {/* Additional Info */}
                <Box>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                        التجديد التلقائي
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {contractInfo.renewalOption}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                        إشعار الإلغاء
                      </Typography>
                      <Typography variant="body2">60 يوم قبل انتهاء العقد</Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                {/* Actions */}
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" mb={1.5} fontWeight={600}>
                    الإجراءات
                  </Typography>
                  <Stack spacing={1.5}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<IconEdit />}
                      onClick={() => setOpenAmendmentDialog(true)}
                    >
                      طلب تعديل العقد
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      startIcon={<IconFile />}
                      onClick={() => setOpenDocumentsDialog(true)}
                    >
                      المستندات المرفقة
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      fullWidth
                      startIcon={<IconCurrencyDollar />}
                      onClick={() => setOpenPaymentDialog(true)}
                    >
                      جدول الدفعات
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      startIcon={<IconNotes />}
                      onClick={() => setOpenNotesDialog(true)}
                    >
                      إضافة ملاحظة
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={() => {
                        setSnackbar({
                          open: true,
                          message: 'تم إرسال طلب إنهاء العقد',
                          severity: 'warning',
                        });
                      }}
                    >
                      طلب إنهاء العقد
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </DashboardCard>
          </Grid>
        </Grid>

        {/* Amendment Request Dialog */}
        <Dialog
          open={openAmendmentDialog}
          onClose={() => setOpenAmendmentDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>طلب تعديل العقد</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                العقد: {contractInfo.contractNumber}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="تفاصيل التعديل المطلوب"
                value={amendmentRequest}
                onChange={(e) => setAmendmentRequest(e.target.value)}
                sx={{ mt: 2 }}
                placeholder="اشرح التعديلات المطلوبة بالتفصيل..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAmendmentDialog(false)}>إلغاء</Button>
            <Button
              variant="contained"
              onClick={handleRequestAmendment}
              disabled={!amendmentRequest}
            >
              إرسال الطلب
            </Button>
          </DialogActions>
        </Dialog>

        {/* Contract History Dialog */}
        <Dialog
          open={openHistoryDialog}
          onClose={() => setOpenHistoryDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>سجل إصدارات العقد</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Timeline position="right">
                {contractHistory.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="text.secondary">
                      {item.date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color={item.status === 'نشط' ? 'success' : 'grey'}>
                        <IconFileDescription size={16} />
                      </TimelineDot>
                      {index < contractHistory.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper elevation={3} sx={{ p: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                          <Typography variant="h6" fontWeight={600}>
                            الإصدار {item.version}
                          </Typography>
                          <Chip
                            label={item.status}
                            size="small"
                            color={item.status === 'نشط' ? 'success' : 'default'}
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {item.changes}
                        </Typography>
                        <Button size="small" startIcon={<IconDownload size={16} />} sx={{ mt: 1 }}>
                          تحميل هذا الإصدار
                        </Button>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenHistoryDialog(false)}>إغلاق</Button>
          </DialogActions>
        </Dialog>

        {/* Documents Dialog */}
        <Dialog
          open={openDocumentsDialog}
          onClose={() => setOpenDocumentsDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">المستندات المرفقة</Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<IconUpload />}
                onClick={() => {
                  setOpenDocumentsDialog(false);
                  setOpenUploadDialog(true);
                }}
              >
                رفع مستند
              </Button>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>اسم المستند</TableCell>
                      <TableCell>النوع</TableCell>
                      <TableCell>الحجم</TableCell>
                      <TableCell>تاريخ الرفع</TableCell>
                      <TableCell>رفع بواسطة</TableCell>
                      <TableCell align="center">الإجراءات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contractDocuments.map((doc) => (
                      <TableRow key={doc.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {doc.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={doc.type} size="small" color="primary" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{doc.size}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{doc.uploadDate}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{doc.uploadedBy}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Tooltip title="عرض">
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={() => handleViewDocument(doc)}
                              >
                                <IconEye size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل">
                              <IconButton
                                color="warning"
                                size="small"
                                onClick={() => handleEditDocument(doc)}
                              >
                                <IconEdit size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تحميل">
                              <IconButton
                                color="info"
                                size="small"
                                onClick={() => handleDownloadDocument(doc)}
                              >
                                <IconDownload size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف">
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleDeleteDocument(doc)}
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDocumentsDialog(false)}>إغلاق</Button>
          </DialogActions>
        </Dialog>

        {/* Upload Document Dialog */}
        <Dialog
          open={openUploadDialog}
          onClose={() => setOpenUploadDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>رفع مستند جديد</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField fullWidth label="اسم المستند" placeholder="أدخل اسم المستند" />
              <TextField
                fullWidth
                select
                label="نوع المستند"
                defaultValue="pdf"
                SelectProps={{ native: true }}
              >
                <option value="pdf">ملف PDF</option>
                <option value="image">صورة</option>
                <option value="document">مستند</option>
                <option value="other">أخرى</option>
              </TextField>
              <Button variant="outlined" component="label" startIcon={<IconUpload />} fullWidth>
                اختر الملف
                <input type="file" hidden />
              </Button>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                placeholder="ملاحظات إضافية (اختياري)"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUploadDialog(false)}>إلغاء</Button>
            <Button variant="contained" onClick={handleUploadDocument}>
              رفع المستند
            </Button>
          </DialogActions>
        </Dialog>

        {/* Payment Schedule Dialog */}
        <Dialog
          open={openPaymentDialog}
          onClose={() => setOpenPaymentDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>جدول الدفعات</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>تاريخ الاستحقاق</TableCell>
                      <TableCell>المبلغ</TableCell>
                      <TableCell align="center">الحالة</TableCell>
                      <TableCell>تاريخ الدفع</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentSchedule.map((payment) => (
                      <TableRow key={payment.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {payment.dueDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="primary" fontWeight={600}>
                            {payment.amount.toLocaleString()} ر.س
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={payment.status}
                            size="small"
                            color={
                              payment.status === 'مدفوعة'
                                ? 'success'
                                : payment.status === 'معلقة'
                                ? 'warning'
                                : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{payment.paymentDate || '-'}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={3} p={2} bgcolor="grey.50" borderRadius={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">الإجمالي:</Typography>
                  <Typography variant="h6" color="primary" fontWeight={700}>
                    {paymentSchedule.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} ر.س
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPaymentDialog(false)}>إغلاق</Button>
          </DialogActions>
        </Dialog>

        {/* Add Note Dialog */}
        <Dialog
          open={openNotesDialog}
          onClose={() => setOpenNotesDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>ملاحظات العقد</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Existing Notes */}
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="textSecondary" mb={2}>
                  الملاحظات السابقة
                </Typography>
                <Stack spacing={2}>
                  {contractNotes.map((note) => (
                    <Box key={note.id}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" fontWeight={600}>
                          {note.author}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {note.date}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {note.note}
                      </Typography>
                      {note.id !== contractNotes[contractNotes.length - 1].id && (
                        <Divider sx={{ mt: 2 }} />
                      )}
                    </Box>
                  ))}
                </Stack>
              </Paper>

              {/* New Note */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="ملاحظة جديدة"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="أضف ملاحظتك هنا..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNotesDialog(false)}>إلغاء</Button>
            <Button variant="contained" onClick={handleAddNote} disabled={!newNote}>
              إضافة الملاحظة
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Document Drawer */}
        <Drawer
          anchor="left"
          open={openViewDocumentDrawer}
          onClose={() => setOpenViewDocumentDrawer(false)}
          PaperProps={{ sx: { width: { xs: '100%', sm: 600 } } }}
        >
          {selectedDocument && (
            <Box sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  عرض المستند
                </Typography>
                <IconButton onClick={() => setOpenViewDocumentDrawer(false)}>
                  <IconX />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" mb={1}>
                    اسم المستند
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedDocument.name}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                        نوع الملف
                      </Typography>
                      <Chip label={selectedDocument.type} size="small" color="primary" />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                        حجم الملف
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {selectedDocument.size}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                        تاريخ الرفع
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {selectedDocument.uploadDate}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                        رفع بواسطة
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {selectedDocument.uploadedBy}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Preview Area */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    minHeight: 300,
                    bgcolor: 'grey.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <IconFile size={64} color="gray" />
                    <Typography variant="body2" color="textSecondary">
                      معاينة المستند
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectedDocument.name}
                    </Typography>
                  </Stack>
                </Paper>
              </Stack>

              <Box mt={4}>
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<IconDownload />}
                    onClick={() => handleDownloadDocument(selectedDocument)}
                  >
                    تحميل المستند
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="warning"
                    startIcon={<IconEdit />}
                    onClick={() => {
                      setOpenViewDocumentDrawer(false);
                      handleEditDocument(selectedDocument);
                    }}
                  >
                    تعديل المستند
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* Edit Document Dialog */}
        <Dialog
          open={openEditDocumentDialog}
          onClose={() => setOpenEditDocumentDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>تعديل المستند</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                المستند الحالي: {selectedDocument?.name}
              </Typography>
              <TextField
                fullWidth
                label="اسم المستند"
                value={editDocumentData.name}
                onChange={(e) => setEditDocumentData({ ...editDocumentData, name: e.target.value })}
                required
              />
              <TextField
                fullWidth
                select
                label="نوع المستند"
                value={editDocumentData.type}
                onChange={(e) => setEditDocumentData({ ...editDocumentData, type: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="PDF">PDF</option>
                <option value="Word">Word</option>
                <option value="Excel">Excel</option>
                <option value="Image">صورة</option>
                <option value="Other">أخرى</option>
              </TextField>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                value={editDocumentData.notes}
                onChange={(e) =>
                  setEditDocumentData({ ...editDocumentData, notes: e.target.value })
                }
                placeholder="ملاحظات إضافية (اختياري)"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDocumentDialog(false)}>إلغاء</Button>
            <Button
              variant="contained"
              onClick={handleSaveEditDocument}
              disabled={!editDocumentData.name}
            >
              حفظ التغييرات
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Document Confirmation Dialog */}
        <Dialog
          open={openDeleteDocumentDialog}
          onClose={() => setOpenDeleteDocumentDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" gutterBottom>
                هل أنت متأكد من حذف هذا المستند؟
              </Typography>
              <Typography variant="body2" color="primary" fontWeight={600} sx={{ mt: 2 }}>
                {selectedDocument?.name}
              </Typography>
              <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
                لا يمكن التراجع عن هذا الإجراء
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDocumentDialog(false)}>إلغاء</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDeleteDocument}>
              حذف المستند
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

export default Contract;
