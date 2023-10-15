import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from 'react-query';
import { CoreLayoutPage } from "./modules/core/pages/core-layout-page";
import { ThemeProvider, defaultMUITheme } from "themes";
import { ThemeProvider as MUIthemeProvider } from "@mui/material";
import { NotificationProvider, ServiceClientProvider } from "lib";

const store = configureStore({
  reducer: {},
})

const queryClient = new QueryClient();

export default function App() {
  return (
    <MUIthemeProvider theme={defaultMUITheme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ServiceClientProvider>
            <NotificationProvider>
              <BrowserRouter>
                <ThemeProvider>
                  <CoreLayoutPage />
                </ThemeProvider>
              </BrowserRouter>
            </NotificationProvider>
          </ServiceClientProvider>
        </Provider>
      </QueryClientProvider>
    </MUIthemeProvider>

  )
}
