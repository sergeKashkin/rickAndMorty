import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@mui/material";
import { getCell } from "./helper";
import TextField from "@mui/material/TextField/TextField";

export interface row {
  id: number;
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
  search?: {
    label: string;
    value: string;
    onChange: Function;
  };
  onRowClick: (row: row) => any;
}) => {

  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    props?.search?.onChange(debouncedInputValue);
  }, [debouncedInputValue]);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, 500]);

  return props.isLoading ? (
    <div style={{ width: `${props.width}vw`, height: `${props.height}vh` }}>
      {[...Array(10)].map((_, index: number) => (
        <Skeleton
          key={index}
          variant="rectangular"
          sx={{ my: 5, mx: 1 }}
        />
      ))}
    </div>
  ) : (
    <>
      {props.search ? (
        <TextField
          id="outlined-controlled"
          label={props.search.label}
          value={inputValue}
          autoFocus={true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event);
          }}
        />
      ) : (
        ""
      )}
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
                  getCell(row, rowIndex, props.imageSize, (row: row) =>
                    props.onRowClick(row)
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
