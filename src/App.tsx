import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as MUIthemeProvider } from "@mui/material";
import { CoreLayout } from "./modules/core/pages/core-layout-page";
import { ThemeProvider, defaultMUITheme } from "themes";
import { NotificationProvider, ServiceClientProvider } from "lib";
import ticketsReducer from './modules/tickets/storage/tickets-slice';
import configurationsReducer from './modules/settings/storage/configurations-slice';
import { AuthProvider } from "modules/login/auth-provider-context";
// import { SocketProvider } from "lib/providers/socket";

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    configurations: configurationsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export default function App() {

  return (
    <MUIthemeProvider theme={defaultMUITheme}>
      {/* <SocketProvider> */}
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <NotificationProvider>
              <BrowserRouter>
                <ThemeProvider>
                  <AuthProvider>
                    <ServiceClientProvider>
                      <CoreLayout />
                    </ServiceClientProvider>
                  </AuthProvider>
                </ThemeProvider>
              </BrowserRouter>
            </NotificationProvider>
          </Provider>
        </QueryClientProvider>
      {/* </SocketProvider> */}
    </MUIthemeProvider>
  )
}
