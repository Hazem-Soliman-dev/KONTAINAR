import React from 'react';
import DashboardCard from '../../../shared/DashboardCard';
import CustomSelect from '../../../../components/theme-elements/CustomSelect.jsx';
import {
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TableContainer,
  Stack,
} from '@mui/material';
import TopPerformerData from './TopPerformerData.jsx';

const performers = TopPerformerData;

const TopPerformers = () => {
  // for select
  const [month, setMonth] = React.useState('1');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <DashboardCard
      title="أفضل المتاجر أداءً"
      subtitle="أفضل المتاجر الفرعية"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>مارس 2025</MenuItem>
          <MenuItem value={2}>أبريل 2025</MenuItem>
          <MenuItem value={3}>مايو 2025</MenuItem>
        </CustomSelect>
      }
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  المتجر
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  الفئة
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  الأداء
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  الإيرادات
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {performers.map((basic) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Avatar src={basic.imgsrc} alt={basic.imgsrc} sx={{ width: 40, height: 40 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {basic.name}
                      </Typography>
                      <Typography color="textSecondary" fontSize="12px" variant="subtitle2">
                        {basic.post}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {basic.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      bgcolor:
                        basic.status === 'High'
                          ? (theme) => theme.palette.success.light
                          : basic.status === 'Medium'
                          ? (theme) => theme.palette.warning.light
                          : basic.status === 'Low'
                          ? (theme) => theme.palette.error.light
                          : (theme) => theme.palette.secondary.light,
                      color:
                        basic.status === 'High'
                          ? (theme) => theme.palette.success.main
                          : basic.status === 'Medium'
                          ? (theme) => theme.palette.warning.main
                          : basic.status === 'Low'
                          ? (theme) => theme.palette.error.main
                          : (theme) => theme.palette.secondary.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={basic.status}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{basic.budget}k ر.س</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default TopPerformers;
