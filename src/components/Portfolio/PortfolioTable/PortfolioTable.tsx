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
  const theme = useTheme();

  React.useEffect(() => {
    if (!portfolioLoaded || props.accountId !== portfolio.accountId) {
      const cookies = new Cookies();
      InvestApi.getPortfolio(cookies.get("api-token"), props.accountId).then(
        (result) => {
          result.accountId = props.accountId;
          setPortfolio({
            ...result,
            bondRows: result.positionList.map(
              (position: IPortfolioPosition) => {
                if (position.type === "bond") {
                  return (
                    <TableRow>
                      <TableCell>{position.instrumentInfo.ticker}</TableCell>
                      <TableCell>{position.instrumentInfo.name}</TableCell>
                      <TableCell>{position.quantity}</TableCell>
                      <TableCell>
                        {position.currentPrice.value +
                          "(" +
                          position.currentPrice.currency +
                          ")"}
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return <></>;
                }
              }
            ),
            shareRows: result.positionList.map(
              (position: IPortfolioPosition) => {
                if (position.type === "share") {
                  return (
                    <TableRow>
                      <TableCell>{position.instrumentInfo.ticker}</TableCell>
                      <TableCell>{position.instrumentInfo.name}</TableCell>
                      <TableCell>{position.quantity}</TableCell>
                      <TableCell>
                        {position.currentPrice.value +
                          "(" +
                          position.currentPrice.currency +
                          ")"}
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return <></>;
                }
              }
            ),
          });
          setPortfolioLoaded(true);
        }
      );
    }
  }, [portfolioLoaded, props.accountId, portfolio]);

  return (
    <Box>
      <TableContainer>
        <Table size="small">
          <TableHead
            css={{
              backgroundColor: theme.palette.secondary.main,
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              "& th": {
                color: theme.palette.secondary.contrastText,
                fontWeight: "bold",
              },
            }}
          >
            <TableCell>Ticker</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Current price</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <Divider colSpan={4} align="center">
                Shares
              </Divider>
            </TableRow>
            {portfolio.shareRows}
            <TableRow>
              <Divider colSpan={4} align="center">
                Bonds
              </Divider>
            </TableRow>
            {portfolio.bondRows}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
