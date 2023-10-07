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
  styled,
  useTheme,
} from "@mui/material";

interface IIHTableProps {
  data: Array<any>;
  headers: Array<string>;
  sources: Array<string>;
  groupBy?: string;
}

const Divider = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.secondary.light,
}));

export default function IHTable(props: IIHTableProps) {
  const theme = useTheme();
  const headers = props.headers.map((h: string) => {
    return <TableCell>{h}</TableCell>;
  });
  let uniqueGroupValues = new Array<string>();

  if (props.groupBy) {
    let splutPath = new Array<string>();
    let property = props.groupBy;
    if (props.groupBy.indexOf(".") >= 0) {
      splutPath = props.groupBy.split(".");
    }
    for (let i = 0; i < props.data.length; i++) {
      let parent = props.data[i];
      if (splutPath.length > 0) {
        for (let i = 0; i < splutPath.length - 1; i++) {
          parent = parent[splutPath[i]];
        }
        property = splutPath[splutPath.length - 1];
      }
      if (!uniqueGroupValues.includes(parent[property])) {
        uniqueGroupValues.push(parent[property]);
      }
    }
    console.log(uniqueGroupValues);
  }

  const rows = props.data.map((item) => {
    const cells = props.sources.map((source) => {
      const relativePath = source;
      let parent = item;
      let property = source;
      if (relativePath.indexOf(".") >= 0) {
        const splutPath = relativePath.split(".");
        for (let i = 0; i < splutPath.length - 1; i++) {
          parent = parent[splutPath[i]];
        }
        property = splutPath[splutPath.length - 1];
      }
      return <TableCell>{parent[property]}</TableCell>;
    });
    return <TableRow>{cells}</TableRow>;
  });

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
            <TableRow>{headers}</TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
