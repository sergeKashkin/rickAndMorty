import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { getCell } from "./helper";

export interface row {
  value: string;
  isImage: boolean;
}

const TableComponent = (props: {
  rows: row[][];
  columns: string[];
  width: number;
  height: number;
  imageSize: { width: number; height: number };
  isLoading: boolean;
}) => {

  return props.isLoading ? (
    <div style={{ width: `${props.width}vw`, height: `${props.height}vh` }}>
      {[...Array(10)].map((_) => (
        <Skeleton variant="rectangular" sx={{ my: 5, mx: 1 }} />
      ))}
    </div>
  ) : (
    <TableContainer
      sx={{ width: `${props.width}vw`, maxHeight: `${props.height}vh` }}
      component={Paper}
    >
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.columns.map((column, index) =>
              !index ? (
                <TableCell key={column + index}>{column}</TableCell>
              ) : (
                <TableCell key={column + index} align="right">
                  {column}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((tableRow, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {tableRow.map((row, rowIndex) =>
                getCell(row, rowIndex, props.imageSize)
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
