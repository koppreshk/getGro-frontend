import { Button, CircularProgress, Menu, MenuItem, Typography } from "@mui/material"
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { convertCamelCaseStringToSpaceSeparated } from "lib/utils";
import { useFetchAvailabilityStatuses, useFetchCurrentStatus, useUpdateStatus } from "modules/settings/apis/users-and-permissions";

export enum Statuses {
    Online = 'Online',
    Away = 'Away',
    Offline = 'Offline'
}

const Status = styled.div<{ $status?: string }>`
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${({ $status }) => {
        switch ($status) {
            case Statuses.Online:
                return '#17e254';
            // case Statuses.Busy:
            //     return '#ec3427';
            case Statuses.Away:
                return '#ffef0e';
            // case Statuses.DoNotDisturb:
            //     return '#d80e00';
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

export const AgentStatus = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { data, isLoading: dataLoading } = useFetchAvailabilityStatuses();
    const { data: currentStatus, isLoading } = useFetchCurrentStatus();
    const { mutateAsync } = useUpdateStatus();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (_event: React.MouseEvent<HTMLElement>, menuITemID: number) => {
        setAnchorEl(null);
        mutateAsync({
            availability_status_id: menuITemID
        })
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isLoading || dataLoading) {
        return <CircularProgress size={'24'} />
    }

    return (
        <>
            <StyledButton variant="text" onClick={handleClick} sx={{ textTransform: 'unset', gap: '6px' }}>
                <Status $status={currentStatus?.name} />
                <Typography variant="h6" color="#fff">
                    {convertCamelCaseStringToSpaceSeparated(currentStatus?.name ?? '')}
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
                {data?.map((option) => (
                    <MenuItem
                        key={option.availability_status_id}
                        selected={option.availability_status_id === currentStatus?.id}
                        onClick={(event) => handleMenuItemClick(event, option.availability_status_id)}>
                        {convertCamelCaseStringToSpaceSeparated(option.name)}
                    </MenuItem>))}
            </Menu>
        </>
    )
}