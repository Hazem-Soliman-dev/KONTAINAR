import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Paper,
  Divider,
  Chip,
  IconButton,
  alpha,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  Snackbar,
  Alert,
  Badge,
} from '@mui/material';
import {
  IconMessageCircle,
  IconSend,
  IconPaperclip,
  IconClock,
  IconCheck,
  IconAlertCircle,
  IconEye,
  IconPlus,
  IconX,
  IconEdit,
  IconTrash,
  IconRefresh,
  IconCheckbox,
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
    title: 'الدعم الفني',
  },
];

const Support = () => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openNewTicketDialog, setOpenNewTicketDialog] = useState(false);
  const [openEditTicketDialog, setOpenEditTicketDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newTicket, setNewTicket] = useState({ subject: '', priority: 'متوسطة', description: '' });
  const [editTicket, setEditTicket] = useState({
    subject: '',
    priority: 'متوسطة',
    description: '',
  });
  const [newStatus, setNewStatus] = useState('');

  // Mock data
  const tickets = [
    {
      id: 'TKT-2024-001',
      subject: 'مشكلة في شحن الطلب ORD-2024-005',
      date: '2024-01-15 10:30',
      status: 'مفتوحة',
      priority: 'عالية',
      lastReply: 'منذ ساعتين',
    },
    {
      id: 'TKT-2024-002',
      subject: 'استفسار عن الفواتير',
      date: '2024-01-14 14:20',
      status: 'قيد المعالجة',
      priority: 'متوسطة',
      lastReply: 'منذ 5 ساعات',
    },
    {
      id: 'TKT-2024-003',
      subject: 'تحديث بيانات الحساب',
      date: '2024-01-12 09:15',
      status: 'مغلقة',
      priority: 'منخفضة',
      lastReply: 'منذ 3 أيام',
    },
    {
      id: 'TKT-2024-004',
      subject: 'طلب تحديث منتج',
      date: '2024-01-10 11:00',
      status: 'مغلقة',
      priority: 'منخفضة',
      lastReply: 'منذ 5 أيام',
    },
    {
      id: 'TKT-2024-005',
      subject: 'مشكلة في السداد',
      date: '2024-01-16 08:45',
      status: 'مفتوحة',
      priority: 'عالية',
      lastReply: 'منذ 30 دقيقة',
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: 'support',
      name: 'فريق الدعم',
      message: 'مرحباً بك! كيف يمكننا مساعدتك اليوم؟',
      time: '10:30',
      avatar: '/images/profile/user-1.jpg',
    },
    {
      id: 2,
      sender: 'supplier',
      name: 'أنت',
      message: 'لدي استفسار حول الطلب ORD-2024-005',
      time: '10:32',
      avatar: '/images/profile/user-2.jpg',
    },
    {
      id: 3,
      sender: 'support',
      name: 'فريق الدعم',
      message: 'بالتأكيد، دعني أتحقق من تفاصيل الطلب...',
      time: '10:33',
      avatar: '/images/profile/user-1.jpg',
    },
    {
      id: 4,
      sender: 'support',
      name: 'فريق الدعم',
      message: 'الطلب ORD-2024-005 قيد التوصيل حالياً، من المتوقع وصوله خلال يومين.',
      time: '10:35',
      avatar: '/images/profile/user-1.jpg',
    },
  ];

  // Calculate support statistics
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === 'مفتوحة').length;
  const inProgressTickets = tickets.filter((t) => t.status === 'قيد المعالجة').length;
  const closedTickets = tickets.filter((t) => t.status === 'مغلقة').length;
  const highPriorityTickets = tickets.filter((t) => t.priority === 'عالية').length;

  const stats = [
    {
      icon: IconMessageCircle,
      title: 'تذاكر مفتوحة',
      value: openTickets.toString(),
      color: 'primary',
    },
    {
      icon: IconClock,
      title: 'قيد المعالجة',
      value: inProgressTickets.toString(),
      color: 'warning',
    },
    {
      icon: IconCheck,
      title: 'تم الحل',
      value: closedTickets.toString(),
      color: 'success',
    },
    {
      icon: IconAlertCircle,
      title: 'عاجل',
      value: highPriorityTickets.toString(),
      color: 'error',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'مفتوحة':
        return 'primary';
      case 'قيد المعالجة':
        return 'warning';
      case 'مغلقة':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'عالية':
        return 'error';
      case 'متوسطة':
        return 'warning';
      case 'منخفضة':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // إرسال الرسالة
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setOpenViewDrawer(true);
  };

  const handleNewTicket = () => {
    setNewTicket({ subject: '', priority: 'متوسطة', description: '' });
    setOpenNewTicketDialog(true);
  };

  const handleCreateTicket = () => {
    setSnackbar({
      open: true,
      message: 'تم إنشاء التذكرة بنجاح',
      severity: 'success',
    });
    setOpenNewTicketDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
    setEditTicket({
      subject: ticket.subject,
      priority: ticket.priority,
      description: ticket.subject,
    });
    setOpenEditTicketDialog(true);
  };

  const handleSaveEdit = () => {
    setSnackbar({
      open: true,
      message: `تم تحديث التذكرة ${selectedTicket?.id} بنجاح`,
      severity: 'success',
    });
    setOpenEditTicketDialog(false);
  };

  const handleChangeStatus = (ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setOpenStatusDialog(true);
  };

  const handleSaveStatus = () => {
    setSnackbar({
      open: true,
      message: `تم تحديث حالة التذكرة ${selectedTicket?.id}`,
      severity: 'success',
    });
    setOpenStatusDialog(false);
  };

  const handleDeleteTicket = (ticket) => {
    setSelectedTicket(ticket);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setSnackbar({
      open: true,
      message: `تم حذف التذكرة ${selectedTicket?.id}`,
      severity: 'error',
    });
    setOpenDeleteDialog(false);
  };

  const handleCloseTicket = (ticket) => {
    setSnackbar({
      open: true,
      message: `تم إغلاق التذكرة ${ticket.id}`,
      severity: 'success',
    });
  };

  const handleReopenTicket = (ticket) => {
    setSnackbar({
      open: true,
      message: `تم إعادة فتح التذكرة ${ticket.id}`,
      severity: 'info',
    });
  };

  return (
    <PageContainer title="الدعم الفني" description="التواصل مع فريق الدعم">
      <Breadcrumb title="الدعم الفني" items={BCrumb} />

      <Box>
        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
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
                }}
              >
                <CardContent>
                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" width="70px" height="80px" margin="auto">
                    <Avatar sx={{ bgcolor: alpha(theme.palette[stat.color].main, 0.1), color: theme.palette[stat.color].main, width: 56, height: 56, justifyContent: 'center', mb: 2 }}>
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

        {/* Support Tickets Table */}
        <Grid container spacing={3}>
          <DashboardCard
            title="تذاكر الدعم الفني"
            subtitle="إدارة جميع تذاكر الدعم"
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<IconPlus />}
                onClick={handleNewTicket}
              >
                تذكرة جديدة
              </Button>
            }
          >
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>رقم التذكرة</TableCell>
                    <TableCell>الموضوع</TableCell>
                    <TableCell align="center">الأولوية</TableCell>
                    <TableCell align="center">الحالة</TableCell>
                    <TableCell>التاريخ</TableCell>
                    <TableCell>آخر رد</TableCell>
                    <TableCell align="center">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id} hover flexDirection="column">
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} color="primary">
                          {ticket.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{ticket.subject}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={ticket.priority}
                          size="small"
                          color={getPriorityColor(ticket.priority)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={ticket.status}
                          size="small"
                          color={getStatusColor(ticket.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{ticket.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="textSecondary">
                          {ticket.lastReply}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Tooltip title="عرض التفاصيل">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleViewTicket(ticket)}
                            >
                              <IconEye size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل التذكرة">
                            <IconButton
                              color="warning"
                              size="small"
                              onClick={() => handleEditTicket(ticket)}
                            >
                              <IconEdit size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تغيير الحالة">
                            <IconButton
                              color="info"
                              size="small"
                              onClick={() => handleChangeStatus(ticket)}
                            >
                              <IconRefresh size={18} />
                            </IconButton>
                          </Tooltip>
                          {ticket.status === 'مفتوحة' || ticket.status === 'قيد المعالجة' ? (
                            <Tooltip title="إغلاق التذكرة">
                              <IconButton
                                color="success"
                                size="small"
                                onClick={() => handleCloseTicket(ticket)}
                              >
                                <IconCheck size={18} />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="إعادة فتح">
                              <IconButton
                                color="secondary"
                                size="small"
                                onClick={() => handleReopenTicket(ticket)}
                              >
                                <IconCheckbox size={18} />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="حذف">
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteTicket(ticket)}
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
        </Grid>

        {/* View Ticket Drawer */}
        <Drawer
          anchor="left"
          open={openViewDrawer}
          onClose={() => setOpenViewDrawer(false)}
          PaperProps={{ sx: { width: { xs: '100%', sm: 500 } } }}
        >
          {selectedTicket && (
            <Box sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  تفاصيل التذكرة
                </Typography>
                <IconButton onClick={() => setOpenViewDrawer(false)}>
                  <IconX />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    رقم التذكرة
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    {selectedTicket.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الموضوع
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedTicket.subject}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    التاريخ
                  </Typography>
                  <Typography variant="body1">{selectedTicket.date}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الأولوية
                  </Typography>
                  <Chip
                    label={selectedTicket.priority}
                    size="small"
                    color={getPriorityColor(selectedTicket.priority)}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الحالة
                  </Typography>
                  <Chip
                    label={selectedTicket.status}
                    size="small"
                    color={getStatusColor(selectedTicket.status)}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    آخر رد
                  </Typography>
                  <Typography variant="body1">{selectedTicket.lastReply}</Typography>
                </Box>
              </Stack>

              {/* Chat Messages */}
              <Box mt={4}>
                <Typography variant="subtitle2" color="textSecondary" mb={2}>
                  المحادثة
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, bgcolor: 'grey.50', maxHeight: 300, overflowY: 'auto' }}
                >
                  {chatMessages.map((msg) => (
                    <Box
                      key={msg.id}
                      display="flex"
                      justifyContent={msg.sender === 'supplier' ? 'flex-end' : 'flex-start'}
                      mb={2}
                    >
                      <Box
                        sx={{
                          maxWidth: '80%',
                          display: 'flex',
                          gap: 1,
                          flexDirection: msg.sender === 'supplier' ? 'row-reverse' : 'row',
                        }}
                      >
                        <Avatar src={msg.avatar} sx={{ width: 32, height: 32 }} />
                        <Box>
                          <Paper
                            sx={{
                              p: 1.5,
                              bgcolor: msg.sender === 'supplier' ? 'primary.main' : 'white',
                              color: msg.sender === 'supplier' ? 'white' : 'text.primary',
                            }}
                          >
                            <Typography variant="body2">{msg.message}</Typography>
                          </Paper>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{
                              display: 'block',
                              mt: 0.5,
                              textAlign: msg.sender === 'supplier' ? 'right' : 'left',
                            }}
                          >
                            {msg.time}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Box>

              {/* Reply Input */}
              <Box mt={3}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="اكتب ردك هنا..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<IconSend />}
                  onClick={handleSendMessage}
                  sx={{ mt: 2 }}
                >
                  إرسال الرد
                </Button>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* New Ticket Dialog */}
        <Dialog
          open={openNewTicketDialog}
          onClose={() => setOpenNewTicketDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>تذكرة دعم جديدة</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="الموضوع"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="الأولوية"
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                  SelectProps={{ native: true }}
                >
                  <option value="عالية">عالية</option>
                  <option value="متوسطة">متوسطة</option>
                  <option value="منخفضة">منخفضة</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="الوصف"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="اشرح مشكلتك بالتفصيل..."
                  required
                />
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNewTicketDialog(false)}>إلغاء</Button>
            <Button
              variant="contained"
              onClick={handleCreateTicket}
              disabled={!newTicket.subject || !newTicket.description}
            >
              إنشاء التذكرة
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Ticket Dialog */}
        <Dialog
          open={openEditTicketDialog}
          onClose={() => setOpenEditTicketDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>تعديل التذكرة</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                التذكرة: {selectedTicket?.id}
              </Typography>
              <TextField
                fullWidth
                label="الموضوع"
                value={editTicket.subject}
                onChange={(e) => setEditTicket({ ...editTicket, subject: e.target.value })}
                required
              />
              <TextField
                fullWidth
                select
                label="الأولوية"
                value={editTicket.priority}
                onChange={(e) => setEditTicket({ ...editTicket, priority: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="عالية">عالية</option>
                <option value="متوسطة">متوسطة</option>
                <option value="منخفضة">منخفضة</option>
              </TextField>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="الوصف"
                value={editTicket.description}
                onChange={(e) => setEditTicket({ ...editTicket, description: e.target.value })}
                placeholder="تفاصيل التذكرة..."
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditTicketDialog(false)}>إلغاء</Button>
            <Button
              variant="contained"
              onClick={handleSaveEdit}
              disabled={!editTicket.subject || !editTicket.description}
            >
              حفظ التغييرات
            </Button>
          </DialogActions>
        </Dialog>

        {/* Change Status Dialog */}
        <Dialog
          open={openStatusDialog}
          onClose={() => setOpenStatusDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>تغيير حالة التذكرة</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                التذكرة: {selectedTicket?.id}
              </Typography>
              <TextField
                fullWidth
                select
                label="الحالة الجديدة"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                SelectProps={{ native: true }}
                sx={{ mt: 2 }}
              >
                <option value="مفتوحة">مفتوحة</option>
                <option value="قيد المعالجة">قيد المعالجة</option>
                <option value="مغلقة">مغلقة</option>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenStatusDialog(false)}>إلغاء</Button>
            <Button variant="contained" onClick={handleSaveStatus}>
              تحديث الحالة
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" gutterBottom>
                هل أنت متأكد من حذف التذكرة؟
              </Typography>
              <Typography variant="body2" color="error" fontWeight={600}>
                {selectedTicket?.id}
              </Typography>
              <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
                لا يمكن التراجع عن هذا الإجراء
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              حذف التذكرة
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

export default Support;
