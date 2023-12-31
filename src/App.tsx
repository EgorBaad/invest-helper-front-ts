import React from "react";
import "./App.css";
import MyDrawer from "./components/MyDrawer/MyDrawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import Portfolio from "./components/Portfolio/Portfolio";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header/Header";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import BondCalculator from "./components/BondCalculatorPage/BondCalculatorPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FCA311",
      light: "#F6CC80",
      dark: "#C07B0C",
      contrastText: "#1C2826",
    },
    secondary: {
      main: "#D64550",
      light: "#E39DA0",
      dark: "#79373B",
      contrastText: "#F0F4EF",
    },
    
  },
});

const HeaderContainer = styled("div")`
  display: flex;
  flex-direction: row;
`;

const ActionArea = styled(Box)`
  padding: 6px;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <HeaderContainer>
            <MyDrawer text="Change view" />
            <Header />
          </HeaderContainer>
          <ActionArea>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/bond-calculator" element={<BondCalculator />} />
            </Routes>
          </ActionArea>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
