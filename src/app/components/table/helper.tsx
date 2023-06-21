import Image from "next/image";
import { row } from "./table"
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box/Box";

export const getCell = (row: row, index: number, imageSize: { width: number; height: number }) => {
    return !index ? (
        <TableCell
          key={row.value + index}
          component="th"
          scope="row"
        >
          {row.isImage ? (
            <Box
              width={imageSize.width}
              height={imageSize.height}
            >
              <Image
                src={row.value}
                alt="image"
                width={imageSize.width}
                height={imageSize.height}
              ></Image>
            </Box>
          ) : (
            row.value
          )}
        </TableCell>
      ) : (
        <TableCell key={row.value + index} align="right">
          {row.isImage ? (
            <Box
              width={imageSize.width}
              height={imageSize.height}
            >
              <Image
                src={row.value}
                alt="image"
                width={imageSize.width}
                height={imageSize.height}
              ></Image>
            </Box>
          ) : (
            row.value
          )}
        </TableCell>
      )
}