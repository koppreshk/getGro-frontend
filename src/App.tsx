import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { CoreLayoutPage } from "./modules/core/pages/core-layout-page";

const store = configureStore({
  reducer: {},
})

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CoreLayoutPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
