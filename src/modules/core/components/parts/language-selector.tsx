import LanguageIcon from '@mui/icons-material/Language';
import { Menu, MenuItem, ListItemText, IconButton } from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { useEditProfile } from 'modules/settings/apis/users-and-permissions';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mutateAsync } = useEditProfile();
  const config = useAppSelector((state) => state.core.config);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const defaultLanguage = config?.language || 'en'; // Fallback to English if API fails
    i18n.changeLanguage(defaultLanguage); // Set default language
  }, []);

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language: string) => {
    mutateAsync({ language }).then((res) => {
      if (res.status) {
        i18n.changeLanguage(language);
        handleClose();
      }
    });
  };

  const menuOptions = [
    { key: 'en', label: 'English' },
    { key: 'fr', label: 'French' },
    { key: 'zh-CN', label: 'Simp Chinease' },
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
