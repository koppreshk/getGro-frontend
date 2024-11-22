/// <reference types="vite-plugin-svgr/client" />

import { Theme } from '@emotion/react';
import { FacebookRounded as Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram, Sms } from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { useTheme } from 'styled-components';
import InstagramMessenger from '../../../assets/svg/instagram-messenger.svg?react';

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
            case 'ivr':
                return <LocalPhone sx={{ fill: theme.channelSpecific.telephonic + '!important', ...sx }} />
            case 'instagram':
                return <Instagram sx={{ fill: theme.channelSpecific.instagram + '!important', ...sx }} />
            case 'instagram_message':
                return <InstagramMessenger width={16} height={16}/>
            case 'sms':
                return <Sms sx={{ fill: theme.channelSpecific.sms + '!important' }} />
            default:
                return <></>;
        }
    }

    return getSourceIcon;
}