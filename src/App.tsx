import styled from "styled-components"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Home } from "./modules";

const StyledH1 = styled.h1`
  font-size: 24px;
  color: red;
`;

export default function App() {
  return (
    <BrowserRouter>
      <StyledH1>This is the dev Branch</StyledH1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
