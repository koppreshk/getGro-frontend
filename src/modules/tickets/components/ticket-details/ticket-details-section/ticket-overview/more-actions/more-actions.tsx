import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { useState } from "react";

interface MoreActionsProps {
    onMenuItemSelect: (key: string) => void;
    menuItems: {
        key: string;
        label: string;
        icon: JSX.Element;
    }[];
    className?: string;
}

export const MoreActions = (props: MoreActionsProps) => {
    const { onMenuItemSelect, menuItems, className } = props;
    const [anchor, setAnchor] = useState<unknown>(null);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
        event.stopPropagation();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClose = (event?: any) => {
        setAnchor(null);
        event?.stopPropagation();
    }

    const onMenuSelection = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>, key: string) => {
        ev.stopPropagation();
        onMenuItemSelect(key);
        handleClose();
    }

    return (
        <>
            <IconButton onClick={handleOpen} className={className}>
                <MoreVert />
            </IconButton>
            <Menu open={Boolean(anchor)} onClose={handleClose} anchorEl={anchor as Element} slotProps={{ paper: { sx: { width: '200px' } } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                {menuItems.map(item => (
                    <MenuItem key={item.key} onClick={(ev) => onMenuSelection(ev, item.key)}>
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