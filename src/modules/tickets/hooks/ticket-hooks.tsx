/// <reference types="vite-plugin-svgr/client" />

import { Theme } from '@emotion/react';
import {
  FacebookRounded as Facebook,
  Email,
  WhatsApp,
  Twitter,
  LocalPhone,
  Instagram,
  Sms,
  Web,
  Google,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { SxProps } from '@mui/system';
import { useTheme } from 'styled-components';

import FacebookMessenger from '../../../assets/svg/fb-messenger.svg?react';
import InstagramMessenger from '../../../assets/svg/instagram-messenger.svg?react';

export const useSourceIcon = () => {
  const theme = useTheme();
  const getSourceIcon = (source: string, sx?: SxProps<Theme>) => {
    switch (source.toLocaleLowerCase()) {
      case 'facebook':
      case 'fb_page_comment':
        return (
          <Facebook
            sx={{ fill: theme.channelSpecific.facebook + '!important', ...sx }}
          />
        );
      case 'fb_page_message':
        return (
          <SvgIcon
            sx={{ color: theme.channelSpecific.facebook + '!important', ...sx }}
          >
            <FacebookMessenger />
          </SvgIcon>
        );
      case 'email':
        return (
          <Email
            sx={{ fill: theme.channelSpecific.email + '!important', ...sx }}
          />
        );
      case 'whatsapp':
      case 'whatsapp_message':
        return (
          <WhatsApp
            sx={{ fill: theme.channelSpecific.whatsApp + '!important', ...sx }}
          />
        );
      case 'twitter':
        return (
          <Twitter
            sx={{ fill: theme.channelSpecific.twitter + '!important', ...sx }}
          />
        );
      case 'ivr':
        return (
          <LocalPhone
            sx={{
              fill: theme.channelSpecific.telephonic + '!important',
              ...sx,
            }}
          />
        );
      case 'instagram':
        return (
          <Instagram
            sx={{ fill: theme.channelSpecific.instagram + '!important', ...sx }}
          />
        );
      case 'instagram_message':
        return (
          <SvgIcon
            inheritViewBox
            sx={{
              color: theme.channelSpecific.instagram + '!important',
              ...sx,
            }}
          >
            <InstagramMessenger />
          </SvgIcon>
        );
      case 'sms':
        return <Sms sx={{ fill: theme.channelSpecific.sms + '!important' }} />;
      case 'web_form':
        return <Web />;
      case 'google_review':
        return <Google sx={sx} />;
      default:
        return <></>;
    }
  };

  return getSourceIcon;
};
