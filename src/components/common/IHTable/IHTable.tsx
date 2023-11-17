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
  TablePagination,
  TableRow,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface IIHTableProps {
  data: Array<any>;
  headers: Array<string>;
  sources: Array<string>;
  groupBy?: string;
  paging?: boolean;
  keyValue?: string;
  delete?: boolean;
  deleteAction?: () => void;
}

const Divider = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.secondary.light,
}));

export default function IHTable(props: IIHTableProps) {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([<></>]);
  const [rowsData, setRowsData] = React.useState(Array<any>);
  const pageSize = 15;
  const theme = useTheme();
  const headers = [
    props.headers.map((h: string) => {
      return <TableCell>{h}</TableCell>;
    }),
    props.delete ? <TableCell>Remove</TableCell> : <></>,
  ];
  let uniqueGroupValues = new Array<string>();

  const getRowKey = (item: any) => {
    let parent = item;
    let property = props.keyValue;
    if (
      props.keyValue?.indexOf(".") !== undefined &&
      props.keyValue?.indexOf(".") >= 0
    ) {
      const splutPath = props.keyValue.split(".");
      for (let i = 0; i < splutPath.length - 1; i++) {
        parent = parent[splutPath[i]];
      }
      property = splutPath[splutPath.length - 1];
    }

    if (property === undefined) {
      return Math.random();
    }
    return parent[property];
  };

  const mapValues = (item: any) => {
    const cells = [
      props.sources.map((source) => {
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
        return <TableCell key={property}>{parent[property]}</TableCell>;
      }),
      props.delete ? (
        <TableCell key={"delete"} onClick={props.deleteAction}>
          <ClearIcon css={{ cursor: "pointer" }} />
        </TableCell>
      ) : (
        <></>
      ),
    ];
    return <TableRow key={getRowKey(item)}>{cells}</TableRow>;
  };

  const handlePageChange = (event: React.MouseEvent | null, page: number) => {
    setPage(page);
    setRows(
      props.data
        .slice(page * pageSize, page * pageSize + pageSize)
        .map(mapValues)
    );
  };

  React.useEffect(() => {
    // if (props.groupBy) {
    //   let splutPath = new Array<string>();
    //   let property = props.groupBy;
    //   if (props.groupBy.indexOf(".") >= 0) {
    //     splutPath = props.groupBy.split(".");
    //   }
    //   for (let i = 0; i < props.data.length; i++) {
    //     let parent = props.data[i];
    //     if (splutPath.length > 0) {
    //       for (let i = 0; i < splutPath.length - 1; i++) {
    //         parent = parent[splutPath[i]];
    //       }
    //       property = splutPath[splutPath.length - 1];
    //     }
    //     if (!uniqueGroupValues.includes(parent[property])) {
    //       uniqueGroupValues.push(parent[property]);
    //     }
    //   }
    //   console.log(uniqueGroupValues);
    // }

    handlePageChange(null, 0);
  }, [props.data, props.groupBy]);

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
          <TableBody>
            {rows}
            {props.paging ? (
              <TableRow>
                <TablePagination
                  count={props.data.length}
                  rowsPerPage={pageSize}
                  onPageChange={handlePageChange}
                  page={page}
                  rowsPerPageOptions={[]}
                />
              </TableRow>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
