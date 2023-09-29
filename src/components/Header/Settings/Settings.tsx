/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { jsx } from "@emotion/react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Snackbar,
  TextField,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import styled from "@emotion/styled";
import { InvestApi } from "../../../api/InvestApi";
import { useFormik } from "formik";
import Cookies from "universal-cookie";

const Expander = styled(Button)`
  position: absolute;
  right: 0;
  top: 42px;
`;

const DrawerArea = styled(Box)`
  width: 500px;
  padding: 12px;

  div.MuiTextField-root {
    width: 100%;
  }
`;

const Loader = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default function Settings() {
  const [isDrawn, setIsDrawn] = React.useState(false);
  const [tokenError, setTokenError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawn(open);
  };
  const cookie = new Cookies();

  const setToken = (token: string) => {
    setLoading(true);
    InvestApi.testToken(token)
      .then((result) => {
        if (result && result !== "false") {
          cookie.set("api-token", token);
          setSuccess(true);
          setTokenError("");
        } else {
          setTokenError("Failed to set token");
        }
        setLoading(false);
      })
      .catch(() => {
        setTokenError("Failed to set token");
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      token: cookie.get("api-token"),
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
          {loading && <Loader color="primary" />}
          <Snackbar
            open={success}
            autoHideDuration={2000}
            onClose={() => setSuccess(false)}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
          >
            <Alert onClose={() => setSuccess(false)} severity={"success"}>
              Settings saved!
            </Alert>
          </Snackbar>
          <form
            onSubmit={formik.handleSubmit}
            css={loading && { opacity: "50%" }}
          >
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
