import { Theme } from '@emotion/react';
import { Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram, Sms } from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { useTheme } from 'styled-components';

export const useSourceIcon = () => {
    const theme = useTheme();
    const getSourceIcon = (source: string, sx?: SxProps<Theme>) => {
        switch (source.toLocaleLowerCase()) {
            case 'facebook':
                return <Facebook sx={{ fill: theme.channelSpecific.facebook + '!important', ...sx }} />
            case 'email':
                return <Email sx={{ fill: theme.channelSpecific.email + '!important', ...sx }} />
            case 'whatsapp':
                return <WhatsApp sx={{ fill: theme.channelSpecific.whatsApp + '!important', ...sx }} />
            case 'twitter':
                return <Twitter sx={{ fill: theme.channelSpecific.twitter + '!important', ...sx }} />
            case 'telephonic':
                return <LocalPhone sx={{ fill: theme.channelSpecific.telephonic + '!important', ...sx }} />
            case 'instagram':
                return <Instagram sx={{ fill: theme.channelSpecific.instagram + '!important', ...sx }} />
            case 'sms':
                return <Sms sx={{ fill: theme.channelSpecific.sms + '!important' }} />
            default:
                return <></>;
        }
    }

    return getSourceIcon;
}