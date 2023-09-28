import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { CoreLayoutPage } from "./modules/core/pages/core-layout-page";
import { ThemeProvider, defaultMUITheme } from "themes";
import { ThemeProvider as MUIthemeProvider } from "@mui/material";
import { NotificationProvider } from "lib";
import { DataGrid, FlexBox, columns, defaultData } from "lib/ui-ux";

const store = configureStore({
  reducer: {},
})

export default function App() {
  return (
    <MUIthemeProvider theme={defaultMUITheme}>
      <Provider store={store}>
        <NotificationProvider>
          <BrowserRouter>
            <ThemeProvider>
              <FlexBox $width="100%" $height="100%">
                <CoreLayoutPage />
                <Routes>
                  <Route element={<DataGrid columns={columns} data={defaultData} />} key="route1" path="/route1" />
                </Routes>
              </FlexBox>
            </ThemeProvider>
          </BrowserRouter>
        </NotificationProvider>
      </Provider>
    </MUIthemeProvider>

  )
}
