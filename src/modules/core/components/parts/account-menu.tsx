import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { Icon } from "lib/ui-ux"
import React from "react";
import { useState } from "react";
import styled from "styled-components"

const SettingsIcon = styled(Icon)`
    color: grey;
`;

export const AccountMenu = () => {
    const [menuVisibility, setMenuVisibility ] = useState(false);
    const onClick = React.useCallback(() => {
        setMenuVisibility( (x) => !x);
    }, [])

    return (
        <>
            <IconButton onClick={onClick}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Menu open={menuVisibility}>
                <MenuItem >
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem >
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem >
                    <ListItemIcon>
                    <SettingsIcon className="material-symbols-outlined" iconName="settings" />
                    </ListItemIcon>
                    Settings
                </MenuItem>

            </Menu>
        </>
    )
}