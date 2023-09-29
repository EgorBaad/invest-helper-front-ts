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

const theme = createTheme({
  palette: {
    primary: {
      main: "#551a8b",
      light: "#E6AACE",
      dark: "#3F1467",
      contrastText: "#F0F4EF",
    },
    secondary: {
      main: "#649072",
      light: "#BFCC94",
      dark: "#558564",
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
            </Routes>
          </ActionArea>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
