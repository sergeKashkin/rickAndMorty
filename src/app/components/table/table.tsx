import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableComponent = (props: {rows: string[][], columns: string[], width: string}) => {
    return <TableContainer component={Paper}>
    <Table sx={{ minWidth: props.width }} aria-label="simple table">
      <TableHead>
        <TableRow>
            {props.columns.map((column, index) => (
                !index ? <TableCell>{column}</TableCell> : <TableCell align="right">{column}</TableCell> 
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.rows.map((tableRow, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {tableRow.map((row, rowIndex) => (
                !rowIndex ? <TableCell key={row} component="th" scope="row">
                    {row}
                </TableCell>
                : <TableCell key={row} align="right">{row}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
};

export default TableComponent;