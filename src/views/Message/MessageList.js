import React, { useState, useEffect } from "react";

import { styled, Box } from "@mui/system";
import { Button, Slide, Alert } from "@mui/material";

import Search from "./components/search";
import Table from "./components/table";
import { messageList, messageStatus } from "api/index";
import { useSelector } from "react-redux";
import { MatxDialog } from "components";
import { useNavigate } from "react-router-dom";

const MessageRoot = styled("div")(() => ({
  margin: "30px"
}));

const BoxBtn = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  margin: "20px 0"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

const AlertSlide = <Alert severity="success">修改成功！</Alert>;

const Message = () => {
  const gameCode = useSelector(state => {
    return state.gameSetting.currentGameCode
      ? state.gameSetting.currentGameCode
      : window.localStorage.getItem("gameCode");
  });
  const navigate = useNavigate();
  const [state, setState] = useState({});

  const [tableData, setTableData] = useState([]);

  const [currentRow, setCurrentRow] = useState({});

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogText, setDialogText] = useState("");

  const [alertShow, setAlertShow] = useState(false);

  const handleChange = e => {
    console.log(e, "dshkdhkshdks8");
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleProductChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({ ...state, productCode: newValue.productCode });
  };

  const handleLanguagesChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({ ...state, language: newValue.full_code });
  };
  const handleMessageStausChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({ ...state, status: newValue.id });
  };
  const handleServerChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({
      ...state,
      server: `${newValue.server}:${newValue.server_name}`
    });
  };

  const handleBeginTimeChange = beginTime => {
    setState({ ...state, beginTime });
  };

  const handleEndTimeChange = endTime => {
    setState({ ...state, endTime });
  };

  const handleBtnChange = async () => {
    console.log(state, "djsdhksdh");
  };

  const getMessageChange = async () => {
    let params = Object.assign({}, state, {
      gameCode: gameCode,
      pageNumber: 1
    });
    const res = await messageList(params);
    console.log(res, "messsss");
    const { messages } = res.data;
    setTableData(messages);
  };

  const handleChangePage = async (e, newSize) => {
    // setPage(newSize);
  };

  const handleChangeRowsPerPage = async e => {
    // setRowsPerPage(+e.target.value);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogConfim = async () => {
    let status;
    switch (currentRow.status) {
      case 1:
        status = 2;
        break;
      case 2:
        status = 1;
        break;
    }
    let params = {
      idArr: [currentRow.id],
      status
    };
    const res = await messageStatus(params);
    console.log(res, "status");
    setDialogOpen(false);
    setAlertShow(true);
    await getMessageChange();

    setTimeout(() => {
      setAlertShow(false);
    }, 1000);
  };

  const handleActionChange = (e, row) => {
    console.log(e, row, "djsdjs");
    setDialogOpen(true);
    setDialogText("确定要修改为拒绝吗?");
    setCurrentRow(row);
  };

  const jumpToDetailChange = (e, row) => {
    console.log(e, row, "dsjdsk");
    navigate("/message/search", {
      state: {
        id: row.id
      }
    });
  };

  useEffect(() => {
    getMessageChange();
  }, [gameCode]);

  return (
    <>
      <MessageRoot>
        <Search
          state={state}
          handleChange={e => handleChange(e)}
          handleProductChange={(e, newValue) =>
            handleProductChange(e, newValue)
          }
          handleLanguagesChange={(e, newValue) =>
            handleLanguagesChange(e, newValue)
          }
          handleMessageStausChange={(e, newValue) =>
            handleMessageStausChange(e, newValue)
          }
          handleServerChange={(e, newValue) => handleServerChange(e, newValue)}
          handleBeginTimeChange={e => handleBeginTimeChange(e)}
          handleEndTimeChange={e => handleEndTimeChange(e)}
        />
        <BoxBtn>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => handleBtnChange(false)}
          >
            查询
          </StyledButton>
          <StyledButton variant="contained" color="inherit" onClick={() => setState({})}>
            重置
          </StyledButton>
        </BoxBtn>
        <Table
          tableList={tableData}
          jumpToDetailChange={(e, row) => jumpToDetailChange(e, row)}
          handleActionChange={(e, row) => handleActionChange(e, row)}
        ></Table>
      </MessageRoot>
      <MatxDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleConfim={handleDialogConfim}
        title={"提醒"}
      >
        {dialogText}
      </MatxDialog>
      <Slide direction="down" in={alertShow} mountOnEnter unmountOnExit>
        {AlertSlide}
      </Slide>
    </>
  );
};

export default Message;
