import Image from "next/image";
import { row } from "./table"
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box/Box";

export const getCell = (row: row, index: number, imageSize: { width: number; height: number }, onClick: Function) => {
    return !index ? (
        <TableCell
          key={row.value + index}
          component="th"
          scope="row"
          onClick={() => onClick(row)}
          sx={{
            position: "sticky",
            left: 0,
            background: "white",
          }}
        >
          {row.isImage ? (
            <Box
              key={row.value + index}
              width={imageSize.width}
              height={imageSize.height}
              borderRadius={"50%"}
            >
              <Image
                src={row.value}
                alt="image"
                width={imageSize.width}
                height={imageSize.height}
                style={{borderRadius: "50%"}}
              ></Image>
            </Box>
          ) : (
            row.value
          )}
        </TableCell>
      ) : (
        <TableCell key={row.value + index} align="right" onClick={() => onClick(row)}
        >
          {row.isImage ? (
            <Box
              key={row.value + index}
              width={imageSize.width}
              height={imageSize.height}
              borderRadius={"50%"}
            >
              <Image
                src={row.value}
                alt="image"
                width={imageSize.width}
                height={imageSize.height}
                style={{borderRadius: "50%"}}
              ></Image>
            </Box>
          ) : (
            row.value
          )}
        </TableCell>
      )
}