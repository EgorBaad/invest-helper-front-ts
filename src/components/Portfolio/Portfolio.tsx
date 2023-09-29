/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { jsx } from "@emotion/react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { InvestApi } from "../../api/InvestApi";
import Cookies from "universal-cookie";
import { useFormik } from "formik";

interface IAccount {
  id: string;
  name: string;
}

export default function Portfolio() {
  const [account, setAccount] = React.useState("");
  const [accountList, setAccountList] = React.useState([]);
  const [accountListLoaded, setAccountListLoaded] = React.useState(false);
  const [showAccountsLoader, setShowAccountsLoader] = React.useState(false);

  React.useEffect(() => {
    if (!accountListLoaded) {
      const cookies = new Cookies();
      setShowAccountsLoader(true);
      InvestApi.getAccounts(cookies.get("api-token")).then((result) => {
        setAccountList(
          result.map((acc: IAccount) => {
            return <MenuItem value={acc.id}>{acc.name}</MenuItem>;
          })
        );
      });
    }
  }, [accountListLoaded]);

  return (
    <Box>
      <FormControl>
        <InputLabel id="account-input-label">Account</InputLabel>
        <Select
          labelId="account-input-label"
          value={account}
          label={"Account"}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
          css = {{width: "300px"}}
        >
          {accountList}
        </Select>
      </FormControl>
    </Box>
  );
}
