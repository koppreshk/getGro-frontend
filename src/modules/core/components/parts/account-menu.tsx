import React, { useState } from "react";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { useAuth } from "modules/login/hooks/use-auth";
import { AccountCircle, Settings, Logout } from '@mui/icons-material';

export const AccountMenu = () => {
    const [anchor, setAnchor] = useState<unknown>(null);
    const { logout } = useAuth();
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
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Menu open={Boolean(anchor)} onClose={handleClose} anchorEl={anchor as Element} slotProps={{ paper: { sx: { width: '200px' } } }}>
                <MenuItem >
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    User Profile
                </MenuItem>
                <MenuItem >
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Logout
                </MenuItem>

            </Menu>
        </>
    )
}