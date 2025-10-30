import React from 'react';
import { Card, CardContent, Typography, Grid, Box, useTheme, alpha } from '@mui/material';

const Sparkline = ({ data, color }) => {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(' ');
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: 60 }}>
      <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
    </svg>
  );
};

const BarChart = ({ data, color }) => {
  const max = Math.max(...data);
  const barWidth = 100 / data.length;
  return (
    <Box display="flex" alignItems="flex-end" sx={{ height: 120, gap: 1, width: '100%' }}>
      {data.map((v, i) => (
        <Box
          key={i}
          sx={{
            width: `${barWidth - 1}%`,
            height: `${(v / max) * 100}%`,
            bgcolor: color,
            borderRadius: 1,
          }}
        />
      ))}
    </Box>
  );
};

const DonutChart = ({ value, total, color }) => {
  const pct = total === 0 ? 0 : Math.min(100, Math.round((value / total) * 100));
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <Box position="relative" display="inline-flex" alignItems="center" justifyContent="center">
      <svg width="80" height="80">
        <circle cx="40" cy="40" r={radius} stroke="#eee" strokeWidth="8" fill="none" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <Box position="absolute" textAlign="center">
        <Typography variant="subtitle1" fontWeight={700}>
          {pct}%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          اكتمال
        </Typography>
      </Box>
    </Box>
  );
};

const ChartsOverview = () => {
  const theme = useTheme();

  // Example data; replace with API data
  const salesMonthly = [12, 18, 14, 22, 26, 30, 28, 35, 40, 38, 44, 50];
  const ordersWeekly = [15, 22, 18, 26, 32, 28, 36];
  const fulfillment = { shipped: 820, total: 1000 };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4} sx={{ minWidth: 0 }}>
        <Card
          sx={{
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.06,
            )} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              المبيعات الشهرية
            </Typography>
            <Typography variant="h4" fontWeight={700} mb={2}>
              50,000 ر.س
            </Typography>
            <BarChart data={salesMonthly} color={theme.palette.primary.main} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={4} sx={{ minWidth: 0 }}>
        <Card
          sx={{
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.success.main,
              0.06,
            )} 0%, ${alpha(theme.palette.success.main, 0.02)} 100%)`,
            border: `1px solid ${alpha(theme.palette.success.main, 0.15)}`,
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              الطلبات (أسبوعي)
            </Typography>
            <Typography variant="h4" fontWeight={700} mb={2}>
              36
            </Typography>
            <Sparkline data={ordersWeekly} color={theme.palette.success.main} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={12} lg={4} sx={{ minWidth: 0 }}>
        <Card
          sx={{
            borderRadius: 3,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.info.main,
              0.06,
            )} 0%, ${alpha(theme.palette.info.main, 0.02)} 100%)`,
            border: `1px solid ${alpha(theme.palette.info.main, 0.15)}`,
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              نسبة الشحن
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
              <DonutChart
                value={fulfillment.shipped}
                total={fulfillment.total}
                color={theme.palette.info.main}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              تم شحن {fulfillment.shipped} من أصل {fulfillment.total} طلب
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsOverview;
