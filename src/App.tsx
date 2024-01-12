import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as MUIthemeProvider } from "@mui/material";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CoreLayout } from "./modules/core/pages/core-layout-page";
import { ThemeProvider, defaultMUITheme } from "themes";
import { NotificationProvider, ServiceClientProvider } from "lib";
import ticketsReducer from './modules/tickets/storage/tickets-slice';
import { AuthProvider } from "modules/login/auth-provider-context";

const store = configureStore({
  reducer: {
    tickets: ticketsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const queryClient = new QueryClient();

export default function App() {

  return (
    <MUIthemeProvider theme={defaultMUITheme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NotificationProvider>
            <BrowserRouter>
              <ThemeProvider>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <AuthProvider>
                    <ServiceClientProvider>
                      <CoreLayout />
                    </ServiceClientProvider>
                  </AuthProvider>
                </LocalizationProvider>
              </ThemeProvider>
            </BrowserRouter>
          </NotificationProvider>
        </Provider>
      </QueryClientProvider>
    </MUIthemeProvider>

  )
}
