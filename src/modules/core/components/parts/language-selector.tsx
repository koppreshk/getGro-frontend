import LanguageIcon from '@mui/icons-material/Language';
import { Menu, MenuItem, ListItemText, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const menuOptions = [
    { key: 'en', label: 'English' },
    { key: 'fr', label: 'French' },
    { key: 'zh_CN', label: 'Simp Chinease' },
  ];
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <LanguageIcon sx={{ color: '#fff' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
      >
        {menuOptions.map((item) => (
          <MenuItem
            key={item.key}
            onClick={() => changeLanguage(item.key)}
            selected={i18n.language === item.key}
          >
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
