/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { jsx } from "@emotion/react";
import { Box, Button, Drawer, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import styled from "@emotion/styled";
import { InvestApi } from "../../../api/InvestApi";

const Expander = styled(Button)`
  position: absolute;
  right: 0;
  top: 42px;
`;

const DrawerArea = styled(Box)`
  width: 500px;
  padding: 12px;

  div {
    width: 100%;
  }
`;

export default function Settings() {
  const [isDrawn, setIsDrawn] = React.useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawn(open);
  };

  const setToken = () => () => {
    const input = document.getElementById("input-token") as HTMLInputElement;
    const token = input?.value;

    InvestApi.setToken(token);
  }

  return (
    <div>
      <Expander
        color="secondary"
        variant="contained"
        onClick={toggleDrawer(true)}
      >
        <SettingsIcon />
        Settings
      </Expander>
      <Drawer anchor={"right"} open={isDrawn} onClose={toggleDrawer(false)}>
        <DrawerArea role="presentation">
          <Box>
            <h1>Settings</h1>
          </Box>
          <TextField id="input-token" label="Token" />
          <Button css={{marginTop: "12px"}} variant="contained" onClick={setToken()}>Save</Button>
        </DrawerArea>
      </Drawer>
    </div>
  );
}
