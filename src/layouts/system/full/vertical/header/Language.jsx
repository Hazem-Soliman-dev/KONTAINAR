import React, { useContext, useEffect } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomizerContext } from '../../../../../context/CustomizerContext.jsx';
import FlagEn from '../../../../../assets/images/flag/icon-flag-en.svg';
import FlagSa from '../../../../../assets/images/flag/icon-flag-sa.svg';

const Languages = [
  {
    flagname: 'عربي (Arabic)',
    icon: FlagSa,
    value: 'ar',
  },
  {
    flagname: 'English (US)',
    icon: FlagEn,
    value: 'en',
  },

];

const Language = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isLanguage, setIsLanguage } = useContext(CustomizerContext);

  const open = Boolean(anchorEl);

  const currentLang =
    Languages.find((_lang) => _lang.value === isLanguage) || Languages[1];
  const { i18n } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    i18n.changeLanguage(isLanguage);
  }, []);

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar src={currentLang.icon} alt={currentLang.value} sx={{ width: 20, height: 20 }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        {Languages.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ py: 2, px: 3 }}
            onClick={() => setIsLanguage(option.value)}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={option.icon} alt={option.icon} sx={{ width: 20, height: 20 }} />
              <Typography> {option.flagname}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Language;
