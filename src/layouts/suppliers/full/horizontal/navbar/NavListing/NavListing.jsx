import React, { useContext } from 'react';
import Menudata from '../Menudata.jsx';
import { useLocation } from 'react-router-dom';
import { Box, List, useMediaQuery } from '@mui/material';
import { CustomizerContext } from '../../../../../../context/CustomizerContext.jsx';
import NavItem from '../NavItem/NavItem.jsx';
import NavCollapse from '../NavCollapse/NavCollapse.jsx';

const NavListing = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const { isCollapse, isSidebarHover } = useContext(CustomizerContext);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? isCollapse == "mini-sidebar" && !isSidebarHover : '';

  return (
    <Box>
      <List sx={{ p: 0, display: 'flex', gap: '3px', zIndex: '100' }}>
        {Menudata.map((item, index) => {
          if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} hideMenu={hideMenu} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default NavListing;
