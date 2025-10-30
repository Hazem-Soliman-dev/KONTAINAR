import React from 'react';
import { Box, CardContent, Chip, Paper, Stack, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SavingsImg from '../../../../assets/images/backgrounds/piggy.png';

const sells = [
  {
    product: 'Electronics Hub',
    price: '45,230',
    percent: 55,
    color: 'primary',
  },
  {
    product: 'Fashion Store',
    price: '32,150',
    percent: 20,
    color: 'secondary',
  },
];

const SellingProducts = () => {
  const theme = useTheme();
  const secondarylight = '#FFE0B2'; // Light Orange
  const primarylight = '#C8E6C9'; // Light Green
  const secondary = '#FF9800'; // Orange
  const primary = '#4CAF50'; // Green
  const borderColor = theme.palette.grey[100];

  return (
    <Paper sx={{ bgcolor: primary, border: `1px solid ${borderColor}` }} variant="outlined">
      <CardContent>
        <Typography variant="h5" color="white">
          أفضل منتجاتي مبيعاً
        </Typography>
        <Typography variant="subtitle1" color="white" mb={4}>
          نظرة عامة 2025
        </Typography>

        <Box textAlign="center" mt={2} mb="-90px">
          <img src={SavingsImg} alt={SavingsImg} width={'300px'} />
        </Box>
      </CardContent>
      <Paper sx={{ overflow: 'hidden', zIndex: '1', position: 'relative', margin: '10px' }}>
        <Box p={3}>
          <Stack spacing={3}>
            {sells.map((sell, i) => (
              <Box key={i}>
                <Stack
                  direction="row"
                  spacing={2}
                  mb={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">{sell.product}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ${sell.price}
                    </Typography>
                  </Box>
                  <Chip
                    sx={{
                      backgroundColor: sell.color === 'primary' ? primarylight : secondarylight,
                      color: sell.color === 'primary' ? primary : secondary,
                      borderRadius: '4px',
                      width: 55,
                      height: 24,
                    }}
                    label={sell.percent + '%'}
                  />
                </Stack>
                <LinearProgress value={sell.percent} variant="determinate" color={sell.color} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Paper>
  );
};

export default SellingProducts;
