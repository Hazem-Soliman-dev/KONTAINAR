import * as React from 'react';
import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import Notifications from '../../vertical/header/Notifications.jsx';
import Cart from '../../vertical/header/Cart.jsx';
import Profile from '../../vertical/header/Profile.jsx';
import Search from '../../vertical/header/Search.jsx';
import Language from '../../vertical/header/Language.jsx';
import Navigation from '../navbar/Navbar.jsx';
import Logo from '../../../../shared/logo/Logo.jsx';
import config from '../../../../../context/config.js';
import { CustomizerContext } from '../../../../../context/CustomizerContext.jsx';
import { ProductProvider } from '../../../../../context/EcommerceContext/index.jsx';

const Header = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const { isLayout, setIsMobileSidebar, isMobileSidebar, activeMode, setActiveMode } =
    React.useContext(CustomizerContext);
  const TopbarHeight = config.topbarHeight;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',

    [theme.breakpoints.up('lg')]: {
      minHeight: TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    margin: '0 auto',
    width: '100%',
    color: `${theme.palette.text.secondary} !important`,
  }));

  return (
    <ProductProvider>
      <AppBarStyled position="sticky" color="default" elevation={8}>
        <ToolbarStyled
          sx={{
            maxWidth: isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          <Box sx={{ width: lgDown ? '45px' : 'auto', overflow: 'hidden' }}>
            <Logo />
          </Box>
          {/* ------------------------------------------- */}
          {/* Toggle Button Sidebar */}
          {/* ------------------------------------------- */}
          {lgDown ? (
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={() => setIsMobileSidebar(!isMobileSidebar)}
            >
              <IconMenu2 />
            </IconButton>
          ) : (
            ''
          )}
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
            {/* ------------------------------------------- */}
            {/* End Ecommerce Dropdown */}
            {/* ------------------------------------------- */}

            <IconButton size="large" color="inherit">
              {activeMode === 'light' ? (
                <IconMoon size="21" stroke="1.5" onClick={() => setActiveMode('dark')} />
              ) : (
                <IconSun size="21" stroke="1.5" onClick={() => setActiveMode('light')} />
              )}
            </IconButton>

            <Notifications />
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
