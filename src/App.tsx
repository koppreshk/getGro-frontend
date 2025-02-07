import { ThemeProvider as MUIthemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import {
  ExotelServiceProvider,
  NotificationProvider,
  ServiceClientProvider,
} from 'lib';
import { SocketProvider } from 'lib/providers/socket-provider';
import { ErrorFallback } from 'lib/ui-ux';
import { AuthProvider } from 'modules/login/auth-provider-context';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, defaultMUITheme } from 'themes';

import chatReducer from './modules/chats/storage/chat-slice';
import { CoreLayout } from './modules/core/pages/core-layout-page';
import coreReducer from './modules/core/storage/core-slice';
import configurationsReducer from './modules/settings/storage/configurations-slice';
import ticketsReducer from './modules/tickets/storage/tickets-slice';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    configurations: configurationsReducer,
    core: coreReducer,
    chat: chatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MUIthemeProvider theme={defaultMUITheme}>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <NotificationProvider>
                <BrowserRouter>
                  <ThemeProvider>
                    <AuthProvider>
                      <ServiceClientProvider>
                        <ExotelServiceProvider>
                          <CoreLayout />
                        </ExotelServiceProvider>
                      </ServiceClientProvider>
                    </AuthProvider>
                  </ThemeProvider>
                </BrowserRouter>
              </NotificationProvider>
            </Provider>
          </QueryClientProvider>
        </SocketProvider>
      </MUIthemeProvider>
    </ErrorBoundary>
  );
}
