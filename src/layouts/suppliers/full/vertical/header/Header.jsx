import React, { useContext } from 'react';
import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { CustomizerContext } from '../../../../../context/CustomizerContext.jsx';
import { ProductProvider } from '../../../../../context/EcommerceContext/index.jsx'
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import config from '../../../../../context/config.js'

// components
import Notifications from './Notifications.jsx';
import Profile from './Profile.jsx';
import Cart from './Cart.jsx';
import Search from './Search.jsx';
import Language from './Language.jsx';
import Navigation from './Navigation.jsx';
import MobileRightSidebar from './MobileRightSidebar.jsx';

const Header = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const TopbarHeight = config.topbarHeight;

  // drawer
  const { activeMode, setActiveMode, setIsCollapse, isCollapse, isMobileSidebar, setIsMobileSidebar } = useContext(CustomizerContext);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <ProductProvider>
      <AppBarStyled position="sticky" color="default">
        <ToolbarStyled>
          {/* ------------------------------------------- */}
          {/* Toggle Button Sidebar */}
          {/* ------------------------------------------- */}
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => {
              // Toggle sidebar on both mobile and desktop based on screen size
              if (lgUp) {
                // For large screens, toggle between full-sidebar and mini-sidebar
                isCollapse === "full-sidebar" ? setIsCollapse("mini-sidebar") : setIsCollapse("full-sidebar");
              } else {
                // For smaller screens, toggle mobile sidebar
                setIsMobileSidebar(!isMobileSidebar);
              }
            }}>
            <IconMenu2 size="20" />
          </IconButton>
          {/* ------------------------------------------- */}
          {/* Search Dropdown */}
          {/* ------------------------------------------- */}
          <Search />
          {lgUp ? (
            <>
              <Navigation />
            </>
          ) : null}

          <Box flexGrow={1} />
          <Stack spacing={1} direction="row" alignItems="center">
            <Language />
            {/* ------------------------------------------- */}
            {/* Ecommerce Dropdown */}
            {/* ------------------------------------------- */}
            <Cart />

            {activeMode === 'light' ? (
              <IconButton size="large" color="inherit" onClick={() => setActiveMode("dark")}>
                <IconMoon size="21" stroke="1.5" />
              </IconButton>
            ) : (
              <IconButton size="large" color="inherit" onClick={() => setActiveMode("light")}>
                <IconSun size="21" stroke="1.5" />
              </IconButton>
            )}

            {/* ------------------------------------------- */}
            {/* End Ecommerce Dropdown */}
            {/* ------------------------------------------- */}
            <Notifications />
            {/* ------------------------------------------- */}
            {/* Toggle Right Sidebar for mobile */}
            {/* ------------------------------------------- */}
            {lgDown ? <MobileRightSidebar /> : null}
            <Profile />
          </Stack>
        </ToolbarStyled>
      </AppBarStyled>
    </ProductProvider>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleSidebar: PropTypes.func,
};

export default Header;
