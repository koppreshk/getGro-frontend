import React, { useState } from "react";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { AccountCircle, Settings, Logout } from '@mui/icons-material';
import { useAuth } from "modules/login";
import { getInitialsByName } from "lib/utils";
import { useTheme } from "styled-components";
import { Link } from "react-router-dom";
import { useAppSelector } from "lib/hooks";

export const AccountMenu = () => {
    const [anchor, setAnchor] = useState<unknown>(null);
    const { logout, user } = useAuth();
    const { pallete } = useTheme();
    const config = useAppSelector((state) => state.core);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    }

    const onLogout = () => {
        logout();
        handleClose()
    }

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Avatar sx={{ width: 32, height: 32, fontSize: '1rem', background: pallete.primaryPurple }}>{getInitialsByName(user?.email || 'M')}</Avatar>
            </IconButton>
            <Menu open={Boolean(anchor)} onClose={handleClose} anchorEl={anchor as Element} slotProps={{ paper: { sx: { width: '200px' } } }}>
                <MenuItem onClick={handleClose}>
                    <Link to='/userProfile' style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        User Profile
                    </Link>
                </MenuItem>
                {config.config?.modules.includes('configurations')
                    ? <MenuItem >
                        <Link to='/configurations' style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            Settings
                        </Link>
                    </MenuItem> : null}
                <Divider />
                <MenuItem onClick={onLogout} sx={{ color: '#d32f2f' }}>
                    <ListItemIcon>
                        <Logout sx={{ color: '#d32f2f' }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>

            </Menu>
        </>
    )
}