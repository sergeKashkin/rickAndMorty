import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { getCell } from "./helper";
import TextField from "@mui/material/TextField/TextField";
import { styled } from "@mui/material/styles";

export interface row {
  id: number;
  value: string;
  isImage: boolean;
}

interface chip {
  value: string;
  isSelected: boolean;
}

export interface tableFilter {
  label: string;
  chips: chip[];
  onChange?: Function;
}

const Button = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    border: "1px solid #00ff0080",
    backgroundColor: "transparent",
  },
});



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
  noData: boolean;
  onRowClick: (row: row) => any;
  filters?: tableFilter[];
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
      {[...Array(7)].map((_, index: number) => (
        <Skeleton key={index} variant="rectangular" sx={{ my: 5, mx: 1 }} />
      ))}
    </div>
  ) : (
    <main className="max-sm:p-0">
      <div className="bg-white  lg:p-6 max-sm:space-y-2 lg:space-x-4 flex flex-col lg:flex-row">
        {props.search && (
          <TextField
            id="outlined-controlled"
            placeholder={props.search.label}
            value={inputValue}
            autoFocus={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
          />
        )}

        {props.filters && (
          <section className="flex flex-row justify-between content-between max-sm:space-x-2 lg:space-x-4 ">
            {props.filters.map((filter) => {
              return (
                <ToggleButtonGroup
                  onChange={(_: any, newAlignment: string) =>
                    filter.onChange && filter.onChange(newAlignment)
                  }
                  exclusive
                  key={filter.label}
                  value={filter.chips.find((chip) => chip.isSelected)?.value}
                  size="small"
                  aria-label="outlined primary button group"
                >
                  {filter.chips.map((chip) => (
                    <Button key={chip.value} value={chip.value}>
                      {chip.value}
                    </Button>
                  ))}
                </ToggleButtonGroup>
              );
            })}
          </section>
        )}
      </div>

      {props.noData ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">"No data to display"</span> Change a few
          things up and try submitting again.
        </div>
      ) : (
        <TableContainer
          sx = {{maxWidth: "100vw", maxHeight: `${props.height}vh`,  width: "100%"}}
          component={Paper}
        >
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.columns.map((column, index) =>
                  !index ? (
                    <TableCell key={column + index} sx={{
                      position: "sticky",
                      left: 0,
                      background: "white",
                    }}>{column}</TableCell>
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
      )}
    </main>
  );
};

export default TableComponent;
