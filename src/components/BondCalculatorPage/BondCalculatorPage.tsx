import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import BondListTable from "./BondListTable/BondListTable";
import BondCalculator from "./BondCalculator/BondCalculator";

enum ETabs {
  List,
  Calc,
}

export default function BondCalculatorPage() {
  const [currentTab, setCurrentTab] = React.useState(ETabs.List);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Bond list" value={ETabs.List} />
        <Tab label="Calculator" value={ETabs.Calc} />
      </Tabs>
      {currentTab === ETabs.List ? <BondListTable /> : <></>}
      {currentTab === ETabs.Calc ? <BondCalculator /> : <></>}
    </Box>
  );
}
