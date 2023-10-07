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

export default function BondListTable() {
  const [excludeQualOnly, setExcludeQualOnly] = React.useState(false);
  const [bondList, setBondList] = React.useState([]);
  const [areBondsLoaded, setBondsLoaded] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [bondRows, setBondRows] = React.useState([
    <TableRow>
      <TableCell colSpan={3} css={{ textAlign: "center", fontWeight: "bold" }}>
        No data
      </TableCell>
    </TableRow>,
  ]);
  const cookies = new Cookies();

  const handleQualFlagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExcludeQualOnly(event.target.checked);
    setBondsLoaded(false);
  };

  const handlePageChange = (event: React.MouseEvent | null, page: number) => {
    setPage(page);
    setBondRows(
      bondList
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((bond: IBond) => {
          return (
            <TableRow>
              <TableCell>{bond.name}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          );
        })
    );
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
        setBondRows(
          filteredResult
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((bond: IBond) => {
              return (
                <TableRow>
                  <TableCell>{bond.name}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })
        );
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
        <Table>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Current price</TableCell>
            <TableCell>Add to calculator</TableCell>
          </TableHead>
          <TableBody>{bondRows}</TableBody>
        </Table>
        <TablePagination
          count={bondList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPageOptions={[]}
        />
      </Box>
    </Box>
  );
}
