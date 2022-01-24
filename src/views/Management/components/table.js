import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination
} from "@mui/material";
import React from "react";
import { Box, styled } from "@mui/system";
import dayjs from "dayjs";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  borderRadius: "20px",
  "& thead": {
    "& tr": {
      "& th": {
        padding: "1.6rem 1rem",
        backgroundColor: "rgb(246, 247, 251)"
      }
    }
  },
  "& tbody": {
    "& tr": {
      "& td": {
        paddingLeft: 0,
        textTransform: "capitalize",
        padding: "1.6rem 1rem"
      }
    }
  }
}));

const PaginationTable = props => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangeRowsPerPage = event => {
    console.log(event.target.value, "event.target.value");
    setRowsPerPage(+event.target.value);
  };

  return (
    <Box
      width="100%"
      overflow="auto"
      sx={{
        borderRadius: "20px",
        maxHeight: "calc(100vh - 176px)",
        marginBottom: "20px"
      }}
    >
      <StyledTable stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>操作人</TableCell>
            <TableCell>操作时间</TableCell>
            <TableCell>增加倍数</TableCell>
            <TableCell>增加基数</TableCell>
            <TableCell>增加时间段</TableCell>
            <TableCell>增加数量</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.logList?.map((subscriber, index) => (
            <TableRow key={index}>
              <TableCell align="left">{subscriber.operator}</TableCell>
              <TableCell align="left">
                {dayjs(subscriber.operatorTime * 1000).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </TableCell>
              <TableCell align="left">{subscriber.multiple}</TableCell>
              <TableCell>{subscriber.baseNum}</TableCell>
              <TableCell>
                {subscriber.autoStartTime !== 0
                  ? `${dayjs(subscriber.autoStartTime * 1000).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )} ~ ${dayjs(subscriber.autoEndTime * 1000).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}`
                  : "--"}
              </TableCell>
              <TableCell>{subscriber.autoTargetNum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.total}
        rowsPerPage={props.rowsPerPage}
        page={props.currentPage}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onPageChange={(e, newSize) => props.handleChangePage(e, newSize)}
        onRowsPerPageChange={e => props.handleChangeRowsPerPage(e)}
      />
    </Box>
  );
};

export default PaginationTable;
