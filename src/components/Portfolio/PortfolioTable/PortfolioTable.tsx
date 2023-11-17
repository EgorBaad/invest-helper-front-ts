/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { Interpolation, Theme, jsx } from "@emotion/react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import React, { ReactNode } from "react";
import { InvestApi } from "../../../api/InvestApi";
import Cookies from "universal-cookie";
import { styled } from "@mui/material/styles";
import IHTable from "../../common/IHTable/IHTable";

interface IPortfolioTableProps {
  accountId: string;
}

interface IPortfolio {
  accountId: string;
  positionList?: Array<IPortfolioPosition>;
  bondRows?: Array<ReactNode>;
  shareRows?: Array<ReactNode>;
}

interface IInstrument {
  name: string;
  ticker: string;
}

interface IPortfolioPosition {
  figi: string;
  name: string;
  quantity: number;
  type: string;
  instrumentInfo: IInstrument;
  currentPrice: IMoneyValue;
}

const Divider = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.secondary.light,
}));

export default function PortfolioTable(props: IPortfolioTableProps) {
  const [portfolio, setPortfolio] = React.useState<IPortfolio>({
    accountId: "",
  });
  const [portfolioLoaded, setPortfolioLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!portfolioLoaded || props.accountId !== portfolio.accountId) {
      const cookies = new Cookies();
      InvestApi.getPortfolio(cookies.get("api-token"), props.accountId).then(
        (result) => {
          setPortfolio({ ...result, accountId: props.accountId });
          setPortfolioLoaded(true);
        }
      );
    }
  }, [portfolioLoaded, props.accountId, portfolio]);

  return (
    <Box>
      {portfolio.positionList && (
        <IHTable
          data={portfolio.positionList}
          headers={["Ticker", "Name", "Quantity", "Current price"]}
          sources={[
            "instrumentInfo.ticker",
            "instrumentInfo.name",
            "quantity",
            "currentPrice.value",
          ]}
          groupBy={"type"}
          keyValue="instrumentInfo.ticker"
          paging
        />
      )}
    </Box>
  );
}
