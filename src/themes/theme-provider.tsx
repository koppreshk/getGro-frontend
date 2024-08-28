import React from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

const defaultTheme: DefaultTheme = {
    pallete: {
        white: '#fff',
        black: '#000',
        blue: '#1976d2',
        standardBorderColor: '#E9EBED',
        green: '#198754',
        powderBlue: '#f0f7ff',
        grayVariant1: '#CACED5',
        grayVariant2: '#676E7B',
        grayVariant3: '#667287',
        grayVariant4: '#CACED5',
        grayVariant5: '#F1F2F4',
        grayVariant6: '#F8F9FA',
        grayVariant7: '#f9f9f9',
        grayTextVariant5: '#4a4a4a',
        primaryPurple: '#6a69f6',
        primaryPurpleText: '#5d5de2',
        purpleLight: '#f3f3fd',
        grayNeutral: '#787f83',
        defaultTextColor: '#3b4455',
        genericBackgroundColor: '#F1F2F4',
        toolbarBgColor: '#323452',
        toolbarBgColorOnHover: '#ffffff1a'
    },
    semantics: {
        standardBorder: '1px solid #E9EBED',
        secondaryTextColor: '#667287',
        borderRadius: {
            xs: '4px',
            sm: '6px',
            md: '8px',
            lg: '10px',
            xl: '12px'
        }
    },
    channelSpecific: {
        facebook: '#3b5998',
        email: '#2F4F4F',
        whatsApp: '#25d366',
        instagram: '#d62976',
        twitter: '#00acee',
        telephonic: '#00b7ef',
        sms: '#ffb800s'
    },
    others: {
        scrollContainerColor: '#E4E4E4',
        scrollHandleColor: '#CECECE',
        sideMenuBg: '#f7f8f9',
        sideMenuIconColor: '#4f5762',
        sideMenuHoverColor: '#e8eaed'
    },
    dashboard: {
        graphBgColor1: '#938BB7',
        graphTextColor1: '#777194',
        graphBgColor2: '#6A69F6',
        graphBgColor3: '#E757D3',
        graphBgColor4: '#FF629F',
        graphBgColor5: '#FF9171',
        graphBgColor6: '#FFC759',
        graphBgColor7: '#F9F871'
    }
}

export const ThemeProvider = React.memo((props: { children: React.ReactNode }) => {
    return (
        <StyledThemeProvider theme={defaultTheme}>
            {props.children}
        </StyledThemeProvider>
    )
})