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
} from '@mui/material';
import {
  IconMessageCircle,
  IconSend,
  IconPaperclip,
  IconClock,
  IconCheck,
  IconAlertCircle,
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
  const [visibleTickets, setVisibleTickets] = useState(3);

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

  const stats = [
    {
      icon: IconMessageCircle,
      title: 'تذاكر مفتوحة',
      value: '5',
      color: 'primary',
    },
    {
      icon: IconClock,
      title: 'قيد المعالجة',
      value: '3',
      color: 'warning',
    },
    {
      icon: IconCheck,
      title: 'تم الحل',
      value: '47',
      color: 'success',
    },
    {
      icon: IconAlertCircle,
      title: 'عاجل',
      value: '2',
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

  return (
    <PageContainer title="الدعم الفني" description="التواصل مع فريق الدعم">
      <Breadcrumb title="الدعم الفني" items={BCrumb} />

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

        <Grid container rowSpacing={3} columnSpacing={0}>
          {/* Chat Box */}
          <DashboardCard
            title="محادثة مباشرة"
            subtitle="تواصل مع فريق الدعم"
            sx={(theme) => ({
              borderRadius: 12,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}0F 0%, ${theme.palette.primary.main}08 100%)`,
              border: `1px solid ${theme.palette.primary.main}22`,
            })}
          >
            <Box>
              {/* Chat Messages */}
              <Paper
                variant="outlined"
                sx={{
                  height: '400px',
                  overflowY: 'auto',
                  p: 2,
                  mb: 2,
                  bgcolor: 'grey.50',
                }}
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
                        maxWidth: '70%',
                        display: 'flex',
                        gap: 1,
                        flexDirection: msg.sender === 'supplier' ? 'row-reverse' : 'row',
                      }}
                    >
                      <Avatar src={msg.avatar} sx={{ width: 40, height: 40 }} />
                      <Box>
                        <Paper
                          sx={{
                            p: 2,
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

              {/* Message Input */}
              <Box display="flex" gap={1}>
                <IconButton color="primary">
                  <IconPaperclip size={20} />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="اكتب رسالتك هنا..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  multiline
                  maxRows={3}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                  endIcon={<IconSend size={20} />}
                >
                  إرسال
                </Button>
              </Box>
            </Box>
          </DashboardCard>
        </Grid>

        {/* Support Tickets */}
        <Grid item xs={12} lg={4}>
          <DashboardCard
            title="تذاكر الدعم"
            subtitle="آخر التذاكر المفتوحة"
            sx={(theme) => ({
              borderRadius: 12,
              background: `linear-gradient(135deg, ${theme.palette.info.main}0F 0%, ${theme.palette.info.main}08 100%)`,
              border: `1px solid ${theme.palette.info.main}22`,
            })}
          >
            <Box>
              {tickets.slice(0, visibleTickets).map((ticket, index) => (
                <Box key={ticket.id}>
                  <Box py={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                      <Typography variant="subtitle2" fontWeight={700} color="primary">
                        {ticket.id}
                      </Typography>
                      <Chip
                        label={ticket.status}
                        size="small"
                        color={getStatusColor(ticket.status)}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight={600} mb={1}>
                      {ticket.subject}
                    </Typography>
                    <Box display="flex" gap={1} mb={1}>
                      <Chip
                        label={ticket.priority}
                        size="small"
                        color={getPriorityColor(ticket.priority)}
                        variant="outlined"
                      />
                      <Typography variant="caption" color="textSecondary">
                        {ticket.lastReply}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                      {ticket.date}
                    </Typography>
                  </Box>
                  {index < tickets.length - 1 && <Divider />}
                </Box>
              ))}
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  setVisibleTickets((prev) =>
                    prev < tickets.length ? Math.min(prev + 3, tickets.length) : 3,
                  )
                }
              >
                {visibleTickets < tickets.length ? 'عرض المزيد' : 'عرض أقل'}
              </Button>
            </Box>
          </DashboardCard>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Support;
