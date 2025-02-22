import { AccountCircle, Settings, Logout } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { getInitialsByName } from 'lib/utils';
import { useAuth } from 'modules/login';
import { useLogoutUser } from 'modules/login/apis';
import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

export const AccountMenu = () => {
  const [anchor, setAnchor] = useState<unknown>(null);
  const { logout } = useAuth();
  const { pallete } = useTheme();
  const config = useAppSelector((state) => state.core);
  const { mutateAsync } = useLogoutUser();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const onLogout = () => {
    mutateAsync().then(() => {
      logout();
      handleClose();
    });
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '14px',
            background: pallete.primaryPurple,
          }}
          src={config.config?.user_details.image_url}
        >
          {getInitialsByName(config.config?.user_details.display_name || 'M')}
        </Avatar>
      </IconButton>
      <Menu
        open={Boolean(anchor)}
        onClose={handleClose}
        anchorEl={anchor as Element}
        slotProps={{ paper: { sx: { width: '200px' } } }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/userProfile"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <Trans i18nKey={'user_profile'} />
          </Link>
        </MenuItem>
        {config.config?.modules.includes('configurations') ? (
          <MenuItem>
            <Link
              to="/configurations"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <Trans i18nKey={'configurations'} />
            </Link>
          </MenuItem>
        ) : null}
        <Divider />
        <MenuItem onClick={onLogout} sx={{ color: '#d32f2f' }}>
          <ListItemIcon>
            <Logout sx={{ color: '#d32f2f' }} />
          </ListItemIcon>
          <Trans i18nKey={'logout'} />
        </MenuItem>
      </Menu>
    </>
  );
};
