import { BrowserRouter, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { CoreLayoutPage } from "./modules/core/pages/core-layout-page";
import { ThemeProvider } from "themes";
import { NotificationProvider } from "lib";

const store = configureStore({
  reducer: {},
})

export default function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <BrowserRouter>
          <ThemeProvider>
            <CoreLayoutPage />
            <Routes>

            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </NotificationProvider>
    </Provider>
  )
}
