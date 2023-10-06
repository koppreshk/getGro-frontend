import React from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

const defaultTheme: DefaultTheme = {
    pallete: {
        white: '#fff',
        black: '#000',
        blue: '#1976d2',
        powderBlue: '#f0f7ff',
        grayVariant1: '#CACED5',
        grayVariant2: '#676E7B',
        grayVariant3: '#667287',
        grayVariant4: '#CACED5',
        grayVariant5: '#F1F2F4',
        grayVariant6: '#F8F9FA',
    }
}

export const ThemeProvider = React.memo((props: { children: React.ReactNode }) => {
    return (
        <StyledThemeProvider theme={defaultTheme}>
            {props.children}
        </StyledThemeProvider>
    )
})