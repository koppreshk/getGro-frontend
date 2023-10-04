import React from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

const defaultTheme: DefaultTheme = {
    pallete: {
        white: '#fff',
        black: '#000',
        blue: '#1976d2',
        powderBlue: '#f0f7ff'
    }
}

export const ThemeProvider = React.memo((props: { children: React.ReactNode }) => {
    return (
        <StyledThemeProvider theme={defaultTheme}>
            {props.children}
        </StyledThemeProvider>
    )
})