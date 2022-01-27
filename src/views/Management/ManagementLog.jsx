import React, { useState, useEffect } from "react";
import { Card, Box, Icon, Paper, InputBase } from "@mui/material";
import { styled } from "@mui/system";
import Table from "./components/table";
import { peopleCountLog } from "api/index";
import { useSelector } from "react-redux";
import { LocalizationProvider, DateRangePicker, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import dayjs from "dayjs";

const ManagementBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  flex: "1 1 auto"
}));

const FlexBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
}));

const ManagementBgBox = styled("div")(() => ({
  position: "absolute",
  left: "0px",
  right: "0px",
  top: "0px",
  height: "200px",
  pointerEvents: "none",
  background:
    "linear-gradient(to right, rgb(45, 41, 136) 0%, rgb(88, 84, 177) 100%) 0% 0% / cover"
}));

const FlexFull = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "0 3.2rem",
  flex: "1 1 100%",
  zIndex: "100",
  marginBottom: "20px"
}));

const FullHeader = styled("div")(() => ({
  display: "flex",
  color: "rgb(255, 255, 255)",
  minHeight: "136px",
  height: "136px"
}));

const FullTable = styled("div")(() => ({
  display: "flex",
  flex: "1 1 100%",
  flexDirection: "column",
  backgroundColor: "rgb(255, 255, 255)",
  boxShadow:
    "rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 6%) 0px 1px 2px 0px",
  borderRadius: "20px"
}));

const HeaderInner = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%"
}));

const PaperRoot = styled(Paper)(({ theme }) => ({
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "30%",
  borderRadius: "1.6rem",
  paddingBottom: "0.4rem",
  paddingTop: "0.4rem",
  paddingLeft: "0.8rem",
  paddingRight: "0.8rem"
}));

const SearchBtn = styled(LoadingButton)(() => ({
  color: "#fff",
  border: "1px solid #fff",
  borderRadius: "20px",
  width: "150px",
  marginLeft: "10rem",
  "&:hover": {
    color: "#000",
    border: "1px solid #fff"
  },
  ".MuiLoadingButton-loading": {
      border: '1px solid #fff !important'
  }
}));

const ManagementLog = () => {
  const [state, setState] = useState({});

  const [tableData, setTableData] = useState([]);

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dateValue, setDateValue] = useState([null, null]);

  const [loading, setLoading] = useState(false);

  const gameCode = useSelector(state => {
    return state.gameSetting.currentGameCode
      ? state.gameSetting.currentGameCode
      : window.localStorage.getItem("gameCode");
  });

  const getTableChange = async isSearch => {
    let params = {
      gameCode: gameCode,
      pageNumber: page,
      pageSize: rowsPerPage
    };
    if (isSearch) {
      setLoading(true);
      params = Object.assign({}, params, state);
      console.log(params, "params");
    }
    const res = await peopleCountLog(params);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log(res, "83213729734923729");
    const { peopleCountLogs, total } = res.data;
    setTableData(peopleCountLogs);
    setTotal(total);
  };

  const handleChangePage = async (e, newSize) => {
    setPage(newSize);
  };

  const handleChangeRowsPerPage = async e => {
    setRowsPerPage(+e.target.value);
  };

  const handleInputChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDateRangeChange = newValue => {
    setState({
      ...state,
      startTime: dayjs(newValue[0]).unix(),
      endTime: dayjs(newValue[1]).unix()
    });
    setDateValue(newValue);
  };

  useEffect(() => {
    getTableChange();
  }, [rowsPerPage]);
  useEffect(() => {
    getTableChange();
  }, [page]);

  useEffect(() => {
    getTableChange();
  }, [gameCode]);

  return (
    <ManagementBox>
      <ManagementBgBox />
      <FlexFull>
        <FullHeader>
          <HeaderInner>
            <FlexBox>
              <Icon sx={{ fontSize: "40px !important" }}>
                brightness_medium
              </Icon>
              <Box
                component="span"
                sx={{
                  color: "#fff",
                  fontSize: "32px",
                  marginLeft: "20px",
                  fontWeight: "500"
                }}
              >
                LOG
              </Box>
            </FlexBox>
            <PaperRoot sx={{ marginLeft: "20px" }}>
              <Icon>search</Icon>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                name="operator"
                placeholder="搜索操作人"
                onChange={e => handleInputChange(e)}
                inputProps={{ "aria-label": "搜索操作人" }}
              />
            </PaperRoot>
            <PaperRoot sx={{ marginLeft: "20px" }}>
              <Icon>search</Icon>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  value={dateValue}
                  onChange={newValue => handleDateRangeChange(newValue)}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <InputBase
                        ref={startProps.inputRef}
                        {...startProps.inputProps}
                      />
                      <Box sx={{ mx: 1 }}> to </Box>
                      <InputBase
                        ref={endProps.inputRef}
                        {...endProps.inputProps}
                      />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </PaperRoot>
            <SearchBtn
              variant="outlined"
              loading={loading}
              onClick={() => getTableChange(true)}
            >
              Search
            </SearchBtn>
          </HeaderInner>
        </FullHeader>
        <FullTable>
          <Table
            logList={tableData}
            currentPage={page}
            total={total}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={e => handleChangeRowsPerPage(e)}
            handleChangePage={(e, newValue) => handleChangePage(e, newValue)}
          ></Table>
        </FullTable>
      </FlexFull>
    </ManagementBox>
  );
};

export default ManagementLog;
