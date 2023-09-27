/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { jsx } from "@emotion/react";
import { Box, Button, Drawer, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import styled from "@emotion/styled";
import { InvestApi } from "../../../api/InvestApi";
import { useFormik } from "formik";

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
  const [tokenError, setTokenError] = React.useState("");
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawn(open);
  };

  const setToken = (token: string) => {
    InvestApi.setToken(token).catch(() => {
      setTokenError("Failed to set token");
    });
  };

  const formik = useFormik({
    initialValues: {
      token: "",
    },
    onSubmit: (values) => {
      setToken(values.token);
    },
  });

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
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <h1>Settings</h1>
            </Box>
            <TextField
              onChange={formik.handleChange}
              name="token"
              id="token"
              label="Token"
              value={formik.values.token}
              error={tokenError ? true : false}
              helperText={tokenError ? tokenError : ""}
            />
            <Button
              css={{ marginTop: "12px" }}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </form>
        </DrawerArea>
      </Drawer>
    </div>
  );
}
