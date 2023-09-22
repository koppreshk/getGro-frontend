import { BrowserRouter, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { CoreLayoutPage } from "./modules/core/pages/core-layout-page";
import { ThemeProvider, defaultMUITheme } from "themes";
import { ThemeProvider as MUIthemeProvider } from "@mui/material";

const store = configureStore({
  reducer: {},
})

export default function App() {
  return (
    <MUIthemeProvider theme={defaultMUITheme}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <CoreLayoutPage />
            <Routes>

            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </MUIthemeProvider>
  )
}
