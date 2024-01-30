import { Button, Menu, MenuItem, Typography } from "@mui/material"
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { convertCamelCaseStringToSpaceSeparated } from "lib/utils";

enum Statuses {
    Active = 'active',
    Busy = 'busy',
    Away = 'away',
    DoNotDisturb = 'doNotDisturb',
    Offline = 'offline'
}

const Status = styled.div<{ $status?: string }>`
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${({ $status }) => {
        switch ($status) {
            case Statuses.Active:
                return '#17e254';
            case Statuses.Busy:
                return '#ec3427';
            case Statuses.Away:
                return '#ffef0e';
            case Statuses.DoNotDisturb:
                return '#d80e00';
            default: return '#c9c2c2'
        }
    }};
`;

const StyledButton = styled(Button)`
    &&{
        background-color: ${({ theme }) => theme.pallete.toolbarBgColorOnHover};
        &:hover {
            background-color: ${({ theme }) => theme.pallete.toolbarBgColorOnHover};
        }
    }
`;

const options = [Statuses.Active, Statuses.Busy, Statuses.Away, Statuses.DoNotDisturb, Statuses.Offline];

export const AgentStatus = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (_event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <StyledButton variant="text" onClick={handleClick} sx={{ textTransform: 'unset', gap: '6px' }}>
                <Status $status={options[selectedIndex]} />
                <Typography variant="h6" color="#fff">
                    {convertCamelCaseStringToSpaceSeparated(options[selectedIndex])}
                </Typography>
                <ExpandMoreIcon sx={{ width: 16, height: 16, color: '#fff' }} />
            </StyledButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}>
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}>
                        {convertCamelCaseStringToSpaceSeparated(option)}
                    </MenuItem>))}
            </Menu>
        </>
    )
}