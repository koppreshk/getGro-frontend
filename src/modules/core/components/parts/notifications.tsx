import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Badge, IconButton, Popover, Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { useState } from 'react';
import styled from 'styled-components';

const notifications = [
    {
        value: `It's important to have a good customer service, a customer service provider.`
    },
    {
        value: 'Some tincidunt mauris eu risus.'
    },
    {
        value: 'The author of the article does not'
    },
    {
        value: 'Now I am laughing at that fear.'
    }
];

const NotifiacationsContainer = styled(FlexBox)`
    .single-notification:last-child {
        border: none;
        padding: 0;
    }
`;

const StyledNotification = styled(FlexBox)`
    padding-bottom: 10px;
    border-bottom: ${(props) => props.theme.semantics.standardBorder};
`;


export const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationsOutlinedIcon />
                </Badge>
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}>
                <NotifiacationsContainer $padding="16px" $flexDirection="column" $gap="8px" $maxWidth='200px'>
                    {notifications.map((item) => (
                        <StyledNotification key={item.value} $flexDirection='column' className='single-notification'>
                            <Typography variant='body3'>{item.value}</Typography>
                        </StyledNotification>
                    ))}
                </NotifiacationsContainer>
            </Popover>
        </>

    );
}