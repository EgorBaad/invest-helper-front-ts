/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { Interpolation, Theme, jsx } from "@emotion/react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import { InvestApi } from "../../../api/InvestApi";
import Cookies from "universal-cookie";
import IHTable from "../../common/IHTable/IHTable";

export default function BondListTable() {
  const [excludeQualOnly, setExcludeQualOnly] = React.useState(false);
  const [bondList, setBondList] = React.useState([]);
  const [areBondsLoaded, setBondsLoaded] = React.useState(false);
  const cookies = new Cookies();

  const handleQualFlagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExcludeQualOnly(event.target.checked);
    setBondsLoaded(false);
  };

  React.useEffect(() => {
    if (!areBondsLoaded) {
      InvestApi.getAllBonds(cookies.get("api-token")).then((result) => {
        let filteredResult = result;
        if (excludeQualOnly) {
          filteredResult = result.filter((bond: IBond) => {
            return !bond.qualOnly;
          });
        }
        setBondList(filteredResult);
        console.log(filteredResult);
        setBondsLoaded(true);
      });
    }
  });

  return (
    <Box>
      <FormControl>
        <FormControlLabel
          control={
            <Switch checked={excludeQualOnly} onChange={handleQualFlagChange} />
          }
          label="Exclude qual-only bonds"
        />
      </FormControl>
      <Box>
        <IHTable data={bondList}
        headers={["Name", "figi"]}
        sources={["name", "figi"]}
        key={"ticker"}
        paging />
      </Box>
    </Box>
  );
}
