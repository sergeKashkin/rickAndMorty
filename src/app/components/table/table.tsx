import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

export interface row {
    value: string;
    isImage: boolean;
}

const TableComponent = (props: {rows: row[][], columns: string[], width: string, height: string, imageSize: { width: number, height: number }}) => {
    return <TableContainer sx={{ width: props.width, maxHeight: props.height }} component={Paper}>
    <Table stickyHeader  aria-label="simple table">
      <TableHead>
        <TableRow>
            {props.columns.map((column, index) => (
                !index ? 
                    <TableCell key={column+index}>{column}</TableCell> : 
                        <TableCell key={column+index} align="right">{column}</TableCell> 
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
                !rowIndex ? <TableCell key={row.value+rowIndex} component="th" scope="row">
                    { row.isImage ? <Image width={props.imageSize.width} height={props.imageSize.height} src={row.value} alt="image"></Image> : row.value }
                </TableCell>
                : <TableCell key={row.value+rowIndex} align="right">{row.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
};

export default TableComponent;