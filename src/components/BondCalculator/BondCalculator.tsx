import { Box, FormControl, FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { InvestApi } from "../../api/InvestApi";
import Cookies from "universal-cookie";

export default function BondCalculator() {
  const [areBondsLoaded, setBondsLoaded] = React.useState(false);
  const [bondList, setBondList] = React.useState([]);
  const [excludeQualOnly, setExcludeQualOnly] = React.useState(false);
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
    </Box>
  );
}
