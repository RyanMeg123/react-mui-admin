import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow,
  Card,
  Tooltip,
  TablePagination
} from "@mui/material";
import { Box, styled } from "@mui/system";
import dayjs from "dayjs";

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "40px"
}));

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": {
      "& th": {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  },
  "& tbody": {
    "& tr": {
      "& td": {
        paddingLeft: 0,
        textTransform: "capitalize"
      }
    }
  }
}));

const StyledIcon = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
}));

const TableKeyList = [
  {
    title: "序号",
    key: "id"
  },
  {
    title: "邮箱/手机号/第三方",
    key: "user"
  },
  {
    title: "注册方式",
    key: "userType"
  },
  {
    title: "注册时间",
    key: "date"
  },
  {
    title: "注册IP",
    key: "regIp"
  },
  {
    title: "国家/地区",
    key: "countryName"
  },
  {
    title: "utm_source",
    key: "utmSource"
  },
  {
    title: "utm_medium",
    key: "utmMedium"
  },
  {
    title: "utm_campaign",
    key: "utmCampaign"
  },
  {
    title: "utm_content",
    key: "utmContent"
  },
  {
    title: "语种",
    key: "language"
  },
  {
    title: "注册类型",
    key: "device"
  },
  {
    title: "预注册平台",
    key: "platform"
  }
];

const SimpleTable = props => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <StyledCard>
      <StyledTable>
        <TableHead>
          <TableRow>
            {TableKeyList.map((item, index) => {
              if (item.key === "platform") {
                return (
                  <TableCell key={index}>
                    <StyledIcon>
                      {item.title}
                      <Tooltip
                        title="根据每个游戏的预注册平台对应展示"
                        placement="top"
                      >
                        <Icon
                          className="icon"
                          sx={{
                            color: "#0072E5",
                            marginLeft: "10px",
                            cursor: "pointer"
                          }}
                        >
                          info
                        </Icon>
                      </Tooltip>
                    </StyledIcon>
                  </TableCell>
                );
              }
              return <TableCell key={index}>{item.title}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData.map((subscriber, index) => (
            <TableRow key={index}>
              <TableCell align="left">{subscriber.id}</TableCell>
              <TableCell align="left">{subscriber.user}</TableCell>
              <TableCell align="left">
                {subscriber.userType === 1
                  ? "手机号"
                  : subscriber.userType === 2
                  ? "邮箱"
                  : "facebook"}
              </TableCell>
              <TableCell>
                {dayjs(subscriber.regTime * 1000).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>{subscriber.regIp}</TableCell>
              <TableCell>{subscriber.countryName}</TableCell>
              <TableCell>
                {subscriber.utmSource ? subscriber.utmSource : "--"}
              </TableCell>
              <TableCell>
                {subscriber.utmMedium ? subscriber.utmMedium : "--"}
              </TableCell>
              <TableCell>
                {subscriber.utmCampaign ? subscriber.utmCampaign : "--"}
              </TableCell>
              <TableCell>
                {subscriber.utmContent ? subscriber.utmContent : "--"}
              </TableCell>
              <TableCell>{subscriber.language}</TableCell>
              <TableCell>{subscriber.device}</TableCell>
              <TableCell>
                {subscriber.platform === 1
                  ? "AppStore"
                  : subscriber.platform === 2
                  ? "Google Play"
                  : "--"}
              </TableCell>
              {/* <TableCell>
                <IconButton>
                  <Icon color="error">close</Icon>
                </IconButton>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      <TablePagination
        sx={{ px: 2 }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.total}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "上一页"
        }}
        nextIconButtonProps={{
          "aria-label": "下一页"
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledCard>
  );
};

export default SimpleTable;
