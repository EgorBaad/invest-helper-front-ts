/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { jsx } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { InvestApi } from "../../api/InvestApi";
import Cookies from "universal-cookie";
import PortfolioTable from "./PortfolioTable/PortfolioTable";

interface IAccount {
  id: string;
  name: string;
}

export default function Portfolio() {
  const [account, setAccount] = React.useState("");
  const [accountList, setAccountList] = React.useState([]);
  const [accountListLoaded, setAccountListLoaded] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleAccountChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
  };

  React.useEffect(() => {
    if (!accountListLoaded) {
      const cookies = new Cookies();
      InvestApi.getAccounts(cookies.get("api-token"))
        .then((result) => {
          setAccountList(
            result.map((acc: IAccount) => {
              return <MenuItem value={acc.id} key={acc.id}>{acc.name}</MenuItem>;
            })
          );
          setAccountListLoaded(true);
          setError("");
        })
        .catch(() => {
          setError("Unable to load accounts");
          setAccountListLoaded(true);
        });
    }
  }, [accountListLoaded]);

  return (
    <Box>
      <FormControl
        css={!accountListLoaded && { opacity: "50%" }}
        error={error ? true : false}
      >
        <InputLabel id="account-input-label">Account</InputLabel>
        <Select
          labelId="account-input-label"
          value={account}
          label={"Account"}
          onChange={handleAccountChange}
          css={{ width: "300px" }}
        >
          {accountList}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
        {!accountListLoaded && (
          <LinearProgress
            css={{ position: "absolute", width: "300px", top: "50%" }}
          />
        )}
      </FormControl>
      {error && (
        <Button
          color="warning"
          variant="contained"
          onClick={() => {
            setAccountListLoaded(false);
          }}
        >
          Reload
        </Button>
      )}
      <Box css={{paddingTop: "12px"}}>{account && <PortfolioTable accountId={account} />}</Box>
    </Box>
  );
}
