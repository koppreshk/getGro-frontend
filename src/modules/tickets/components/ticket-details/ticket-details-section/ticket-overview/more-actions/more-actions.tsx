import { Delete, Merge, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { useState } from "react";
import { MoreOptionEnum } from "../ticket-overview";

export const MoreActions = (props: { onMenuItemSelect: (key: string) => void }) => {
    const { onMenuItemSelect } = props;
    const [anchor, setAnchor] = useState<unknown>(null);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    }

    const onMenuSelection = (key: string) => {
        onMenuItemSelect(key);
        handleClose();
    }

    const menuItems = [
        { key: MoreOptionEnum.mergeTicket, label: 'Merge Ticket', icon: <Merge /> },
        { key: MoreOptionEnum.deleteTicket, label: 'Delete Ticket', icon: <Delete /> }
    ];

    return (
        <>
            <IconButton onClick={handleOpen}>
                <MoreVert />
            </IconButton>
            <Menu open={Boolean(anchor)} onClose={handleClose} anchorEl={anchor as Element} slotProps={{ paper: { sx: { width: '200px' } } }}>
                {menuItems.map(item => (
                    <MenuItem key={item.key} onClick={() => onMenuSelection(item.key)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        {item.label}
                    </MenuItem>
                ))
                }
            </Menu>
        </>
    )
}