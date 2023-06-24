import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Skeleton,
  ToggleButtonGroup,
  ToggleButton,
  Switch,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { getCell } from "./helper";
import TextField from "@mui/material/TextField/TextField";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Box from "@mui/material/Box/Box";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

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
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");
  const [cardView, setCardView] = useState<boolean>(false);

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
    <div style={{ width: `${props.width}vw`, minHeight: `${props.height}vh` }}>
      {[...Array(10)].map((_, index: number) => (
        <Skeleton key={index} variant="rectangular" sx={{ my: 5, mx: 1 }} />
      ))}
    </div>
  ) : (
    <main className="max-sm:p-0">
      <div className="bg-slate-200 shadow-md lg:p-6 max-sm:space-y-2 lg:space-x-4 flex flex-col lg:flex-row">
        {props.search && (
          <TextField
            id="outlined-controlled"
            placeholder={props.search.label}
            value={inputValue}
            autoFocus={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event);
            }}
            style={{ backgroundColor: "white" }}
          />
        )}

        <section className="flex max-sm:flex-col flex-row w-full max-sm:space-x-2 ">
          <div className="flex justify-between content-between flex-row">
            {props.filters &&
              props.filters.map((filter) => {
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
                    style={{ backgroundColor: "white" }}
                  >
                    {filter.chips.map((chip) => (
                      <Button key={chip.value} value={chip.value}>
                        {chip.value}
                      </Button>
                    ))}
                  </ToggleButtonGroup>
                );
              })}
          </div>
          <FormControlLabel
            className="lg:ml-auto"
            control={
              <Switch
                checked={cardView}
                aria-label="cards"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCardView(event.target.checked)
                }
              />
            }
            label="Card view"
          ></FormControlLabel>
        </section>
      </div>

      {props.noData ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">"No data to display"</span> Change a few
          things up and try submitting again.
        </div>
      ) : !cardView ? (
        <TableContainer
          sx={{
            maxWidth: "100vw",
            maxHeight: `${props.height}vh`,
            width: "100%",
          }}
          component={Paper}
        >
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.columns.map((column, index) =>
                  !index ? (
                    <TableCell
                      key={column + index}
                      sx={{
                        position: "sticky",
                        left: 0,
                        background: "white",
                      }}
                    >
                      {column}
                    </TableCell>
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
      ) : (
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 4, sm: 6, md: 8, lg: 8 }}
          sx={{ height: `${props.height}vh`, overflow: "auto" }}
        >
          {props.rows.map((row, index) => (
            <Grid key={index} item xs={2} sm={2} md={2}>
              <Item>
                {row.map((r, index) =>
                  r.isImage ? (
                    <Box
                      key={r.value+index}
                      width={props.imageSize.width}
                      height={props.imageSize.height}
                      borderRadius={"50%"}
                      marginLeft={"auto"}
                      marginRight={"auto"}
                      onClick={() => props.onRowClick(r)}
                    >
                      <Image
                        src={r.value}
                        alt="image"
                        width={props.imageSize.width}
                        height={props.imageSize.height}
                        style={{ borderRadius: "50%" }}
                      ></Image>
                    </Box>
                  ) : (
                    <div
                      className="flex flex-col"
                      onClick={() => props.onRowClick(r)}
                      key={r.value+index}
                    >
                      <div className="flex flex-row">
                        <span className="font-semibold">
                          {props.columns[index]}
                        </span>
                        {":"}
                        <span>{r.value}</span>
                      </div>
                    </div>
                  )
                )}
              </Item>
            </Grid>
          ))}
        </Grid>
      )}
    </main>
  );
};

export default TableComponent;
