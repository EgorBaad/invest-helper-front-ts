/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { jsx } from "@emotion/react";
import { Autocomplete, Box, Button, TextField, styled } from "@mui/material";
import React from "react";
import { InvestApi } from "../../../api/InvestApi";
import Cookies from "universal-cookie";
import IHTable from "../../common/IHTable/IHTable";

// const SearchBar = styled(Box)(({theme}) => ({
//     "*" : {
//         verticalAlign: "middle",
//     }
// }))

export default function BondCalculator() {
  const [bondList, setBondList] = React.useState([{}]);
  const [bondsLoaded, setBondsLoaded] = React.useState(false);
  const [bondOptions, setBondOptions] = React.useState([""]);
  const [bondsToCalc, setBondsToCalc] = React.useState(Array<Object>);
  const cookies = new Cookies();

  React.useEffect(() => {
    if (!bondsLoaded) {
      InvestApi.getAllBonds(cookies.get("api-token")).then((result) => {
        setBondList(result);
        let stringifiedResult = result.map((item: IBond) => {
          return item.ticker + " " + item.name;
        });
        setBondOptions(
          result
            .map((item: IBond) => {
              return item.figi + " " + item.name;
            })
            .filter((item: string, pos: number, self: Array<any>) => {
              return self.indexOf(item) === pos;
            })
        );
        setBondsLoaded(true);
      });
    }
  });

  const addToCalc = (value: string) => {
    const figi = value.split(" ")[0];
    InvestApi.getBondByFigi(cookies.get("api-token"), figi).then((result) => {
      setBondsToCalc([result, ...bondsToCalc]);
    });
  };

  const handleSearchBarChange = (event: any, value: string | null) => {
    if (value != null) addToCalc(value);
  };

  return (
    <Box>
      <Autocomplete
        id="search-bar"
        options={bondOptions}
        renderInput={(params) => <TextField {...params} label="Search" />}
        onChange={handleSearchBarChange}
      />
      {bondsToCalc.length > 0 ? (
        <IHTable
          data={bondsToCalc}
          headers={["Name", "Figi", "Price", "Rating", "Interest", "Result"]}
          sources={["name", "figi"]}
          key={"figi"}
          paging
          delete
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
