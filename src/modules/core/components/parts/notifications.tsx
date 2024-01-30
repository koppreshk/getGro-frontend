import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Badge, IconButton, Typography } from '@mui/material';
import { FlexBox, PopoverWithBeak } from 'lib/ui-ux';
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

const StyledIconButton = styled(IconButton) <{ $showAnimation: boolean }>`
    &&{
        @keyframes zoomNotification {
            from {
                transform: scale3d(1, 1, 1);
            }
            10%, 20% {
                transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
            }
            30%, 50%, 70%, 90% {
                transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
            }
            40%, 60%, 80% {
                transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
            }
            to {
                transform: scale3d(1, 1, 1);
            }
        }
        animation: ${(props) => props.$showAnimation ? 'zoomNotification 2s infinite' : 'none'};
        &:hover{
            background-color: ${({ theme }) => theme.pallete.toolbarBgColorOnHover};
        }
    }
`;

export const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showAnimation, setShowAnimation] = useState((notifications.length > 0));

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setShowAnimation(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowAnimation(true)
    };

    return (
        <>
            <StyledIconButton onClick={handleClick} $showAnimation={showAnimation}>
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationsOutlinedIcon sx={{ color: '#fff' }} />
                </Badge>
            </StyledIconButton>
            <PopoverWithBeak
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}>
                <NotifiacationsContainer padding="16px" flexDirection="column" gap="8px" maxWidth='200px'>
                    {notifications.map((item) => (
                        <StyledNotification key={item.value} flexDirection='column' className='single-notification'>
                            <Typography variant='body3'>{item.value}</Typography>
                        </StyledNotification>
                    ))}
                </NotifiacationsContainer>
            </PopoverWithBeak>
        </>

    );
}