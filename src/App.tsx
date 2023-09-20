import styled from "styled-components"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Home } from "./modules";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {},
})

const StyledH1 = styled.h1`
  font-size: 24px;
  color: #d82d2d;
`;

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StyledH1>This is the dev Branch</StyledH1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
