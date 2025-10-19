import { styled, Container, Box, useTheme } from '@mui/material';
import { CustomizerContext } from '../../../context/CustomizerContext.jsx';
import config from '../../../context/config.js';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './vertical/header/Header.jsx';
import HorizontalHeader from '../full/horizontal/header/Header.jsx';
import Sidebar from './vertical/sidebar/Sidebar.jsx';
import Customizer from '../../shared/customizer/Customizer.jsx';
import Navigation from './horizontal/navbar/Navbar.jsx';
import ScrollToTop from '../../../components/shared/ScrollToTop.jsx';
import LoadingBar from '../../../LoadingBar.jsx';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const { activeLayout, isLayout, activeMode, isCollapse } = useContext(CustomizerContext);

  const theme = useTheme();
  const MiniSidebarWidth = config.miniSidebarWidth;

  return (
    <>
      <LoadingBar />
      <MainWrapper className={activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        {activeLayout === 'horizontal' ? '' : <Sidebar />}
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(isCollapse === 'mini-sidebar' && {
              [theme.breakpoints.up('lg')]: { ml: `${MiniSidebarWidth}px` },
            }),
          }}
        >
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          {activeLayout === 'horizontal' ? <HorizontalHeader /> : <Header />}
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          {activeLayout === 'horizontal' ? <Navigation /> : ''}
          <Container
            sx={{
              pt: '30px',
              maxWidth: isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Page Route */}
            {/* ------------------------------------------- */}
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <ScrollToTop>
                <Outlet />
              </ScrollToTop>
            </Box>
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
          <Customizer />
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
