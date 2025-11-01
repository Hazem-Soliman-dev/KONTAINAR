import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab, Tooltip } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import DashboardCard from '../../../shared/DashboardCard.jsx';

const MonthlyEarnings = () => {
    const navigate = useNavigate();

    const handleViewFinancials = () => {
        navigate('/suppliers/analytics/sales');
    };

    // chart color
    const theme = useTheme();
    const secondary = '#FF9800'; // Orange
    const secondarylight = '#FFB74D'; // Light Orange
    const errorlight = '#FFCDD2'; // Light Red

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'area',
            fontFamily: "'Cairo', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [secondarylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            x: {
                show: false,
            }
        },
    };
    const seriescolumnchart = [
        {
            name: '',
            color: secondary,
            data: [25, 66, 20, 40, 12, 58, 20],
        },
    ];

    return (
        <DashboardCard
            title="إيراداتي الشهرية"
            action={
                <Tooltip title="عرض التفاصيل المالية" arrow>
                    <Fab color="secondary" size="medium" onClick={handleViewFinancials}>
                        <IconCurrencyDollar width={24} />
                    </Fab>
                </Tooltip>
            }
            footer={
                <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
            }
        >
            <>
                <Typography variant="h3" fontWeight="700" mt="-20px">
                    $284,750
                </Typography>
                <Stack direction="row" spacing={1} my={1} alignItems="center">
                    <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                        <IconArrowDownRight width={20} color="#FF9800" />
                    </Avatar>
                    <Typography variant="subtitle2" fontWeight="600">
                        +12.5%
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        this month
                    </Typography>
                </Stack>
            </>
        </DashboardCard>
    );
};

export default MonthlyEarnings;
