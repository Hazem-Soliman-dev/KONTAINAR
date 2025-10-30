import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { IconClock } from '@tabler/icons-react';

export const getPriorityColor = (priority) => {
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

export const getOrderStatusColor = (status) => {
  // Unified mapping across Orders pages
  switch (status) {
    case 'جديد':
      return 'primary';
    case 'قيد المراجعة':
    case 'قيد التنفيذ':
      return 'warning';
    case 'مكتمل':
      return 'success';
    case 'ملغى':
      return 'error';
    default:
      return 'default';
  }
};

export const StatusChip = ({ label }) => (
  <Chip label={label} size="small" color={getOrderStatusColor(label)} />
);

export const PriorityChip = ({ label }) => (
  <Chip label={label} size="small" color={getPriorityColor(label)} />
);

export const DateWithIcon = ({ date, size = 16 }) => (
  <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
    <IconClock size={size} />
    <Typography variant="body2">{date}</Typography>
  </Box>
);

export const downloadOrderPdf = (orderId) => {
  const content = `PDF for Order ${orderId}\nGenerated at: ${new Date().toISOString()}`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `order-${orderId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};


