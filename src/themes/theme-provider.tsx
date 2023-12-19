import React from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

const defaultTheme: DefaultTheme = {
    pallete: {
        white: '#fff',
        black: '#000',
        blue: '#1976d2',
        green: '#198754',
        powderBlue: '#f0f7ff',
        grayVariant1: '#CACED5',
        grayVariant2: '#676E7B',
        grayVariant3: '#667287',
        grayVariant4: '#CACED5',
        grayVariant5: '#F1F2F4',
        grayVariant6: '#F8F9FA',
        primaryPurple: '#6969ff',
        purpleLight: '#f3f3fd',
        grayNeutral: '#787f83'
    },
    semantics: {
        standardBorder: '1px solid #E9EBED'
    },
    channelSpecific: {
        facebook: '#3b5998',
        email: '#df4b3a',
        whatsApp: '#25d366',
        instagram: '#d62976',
        twitter: '#00acee',
        telephonic: '#00c2ff',
        sms: '#ffb800s'
    },
    others: {
        scrollContainerColor: '#E4E4E4',
        scrollHandleColor: '#CECECE'
    }
}

export const ThemeProvider = React.memo((props: { children: React.ReactNode }) => {
    return (
        <StyledThemeProvider theme={defaultTheme}>
            {props.children}
        </StyledThemeProvider>
    )
})