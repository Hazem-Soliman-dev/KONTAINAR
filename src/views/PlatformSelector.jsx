import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  ThemeProvider,
  CircularProgress,
} from '@mui/material';
import { platformTheme, platformDarkTheme } from '../theme/PlatformTheme.jsx';
import {
  IconChartLine,
  IconTruck,
  IconBuildingStore,
  IconShoppingBag,
  IconSun,
  IconMoon,
} from '@tabler/icons-react';

const PlatformSelector = memo(() => {
  const navigate = useNavigate();

  // إدارة الوضع الليلي/النهاري
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('platform-selector-theme');
    return saved ? JSON.parse(saved) : false;
  });

  // حفظ الوضع في localStorage
  useEffect(() => {
    localStorage.setItem('platform-selector-theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  const handlePlatformSelect = useCallback(
    (route) => {
      navigate(route);
    },
    [navigate],
  );

  const platforms = useMemo(
    () => [
      {
        id: 1,
        title: 'النظام الرئيسي',
        description: 'النظام الرئيسي للشركة',
        icon: <IconChartLine size={24} />,
        color: '#3498db', // blue
        features: [
          'لوحة التحكم والتحليلات',
          'المخزون والمالية',
          'طلبات المبيعات والفواتير',
          'الأدوار والصلاحيات',
        ],
        buttonText: 'الدخول إلى النظام الرئيسي',
        route: '/system',
      },
      {
        id: 2,
        title: 'نظام الموردين',
        description: 'إدارة الموردين والمشتريات',
        icon: <IconTruck size={24} />,
        color: '#2ecc71', // green
        features: ['دليل الموردين', 'طلبات الشراء', 'فواتير والدفع', 'ASN والاستلام'],
        buttonText: 'الدخول إلى نظام الموردين',
        route: '/suppliers',
      },
      {
        id: 3,
        title: 'المتجر الرئيسي',
        description: 'المتجر الرئيسي للشركة',
        icon: <IconBuildingStore size={24} />,
        color: '#9b59b6', // purple
        features: ['كتالوج المنتجات', 'البحث والفلترة', 'السلة والدفع', 'حسابات العملاء'],
        buttonText: 'الدخول إلى المتجر الرئيسي',
        route: '/main-store',
      },
      {
        id: 4,
        title: 'المتاجر الفرعية',
        description: 'المتاجر الفرعية داخل السوق',
        icon: <IconShoppingBag size={24} />,
        color: '#e67e22', // orange
        features: ['العلامة التجارية للمتجر', 'المنتجات والطلبات', 'الترويجات', 'التعليقات'],
        buttonText: 'الدخول إلى المتاجر الفرعية',
        route: '/sub-stores',
      },
    ],
    [],
  );

  const currentTheme = useMemo(
    () => (isDarkMode ? platformDarkTheme : platformTheme),
    [isDarkMode],
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: isDarkMode
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          py: 4,
          transition: 'all 0.3s ease',
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        <Container maxWidth="xl">
          {/* Header with Theme Toggle */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 6,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box textAlign="center" sx={{ flex: 1, minWidth: '300px' }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                مرحباً بك في منصة كونتينر
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  opacity: 0.9,
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                }}
              >
                اختر منصتك للبدء.
              </Typography>
            </Box>

            {/* Theme Toggle */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isDarkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {platforms.map((platform) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                key={platform.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 320,
                    borderRadius: 3,
                    boxShadow: isDarkMode
                      ? '0 8px 32px rgba(0,0,0,0.3)'
                      : '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'white',
                    backdropFilter: 'blur(10px)',
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDarkMode
                        ? '0 16px 48px rgba(0,0,0,0.4)'
                        : '0 16px 48px rgba(0,0,0,0.15)',
                      bgcolor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'white',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box textAlign="center" mb={3}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: platform.color,
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {platform.icon}
                      </Avatar>
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: isDarkMode ? 'white' : 'black',
                        }}
                      >
                        {platform.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: platform.color,
                          fontWeight: 500,
                          mb: 2,
                        }}
                      >
                        {platform.description}
                      </Typography>
                    </Box>

                    <List dense sx={{ mb: 3 }}>
                      {platform.features.map((feature, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: platform.color,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgb(49, 49, 49)',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handlePlatformSelect(platform.route)}
                      sx={{
                        bgcolor: platform.color,
                        color: 'white',
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          bgcolor: platform.color,
                          opacity: 0.9,
                        },
                      }}
                    >
                      {platform.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
});

PlatformSelector.displayName = 'PlatformSelector';

export default PlatformSelector;
