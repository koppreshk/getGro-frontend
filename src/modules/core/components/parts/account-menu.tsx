import React, { useState } from "react";
import styled from "styled-components"
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { Icon } from "lib/ui-ux"

const StyledIcon = styled(Icon)`
    color: grey;
`;

export const AccountMenu = () => {
    const [anchor, setAnchor] = useState<unknown>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    }

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Menu open={Boolean(anchor)} onClose={handleClose} anchorEl={anchor as Element } slotProps={{ paper: { sx: { width: '200px' } } }}>
                <MenuItem >
                    <ListItemIcon>
                        <StyledIcon className="material-symbols-outlined" iconName="account_circle" />
                    </ListItemIcon>
                    User Profile
                </MenuItem>
                <MenuItem >
                    <ListItemIcon>
                        <StyledIcon className="material-symbols-outlined" iconName="settings" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem >
                    <ListItemIcon>
                        <StyledIcon className="material-symbols-outlined" iconName="logout" />
                    </ListItemIcon>
                    Logout
                </MenuItem>

            </Menu>
        </>
    )
}