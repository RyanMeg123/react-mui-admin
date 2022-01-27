import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled, keyframes } from "@mui/system";
import {
  Paper,
  InputBase,
  Icon,
  Grid,
  Select,
  MenuItem,
  Button,
  Box,
  IconButton,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { LocalizationProvider, DateRangePicker, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CardItem } from "components";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { activitiesList, activitiesCreate, activeStatus } from "api/index";
import { useNavigate } from "react-router-dom";

const spin = keyframes`
0% {
  transform: scale(0.75);
}
20% {
  transform: scale(1.1);
}
40% {
  transform: scale(0.75);
}
60% {
  transform: scale(1.05);
}
80% {
  transform: scale(0.75);
}
100% {
  transform: scale(0.75);
}
`;

const ripple = keyframes`
 from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(2.05);
  }
`;

const ListItemBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  flex: "1 1 auto",
  height: "100%"
}));

const ListItemBgBox = styled("div")(() => ({
  position: "absolute",
  left: "0px",
  right: "0px",
  top: "0px",
  height: "120px",
  minHeight: "120px",
  pointerEvents: "none",
  color: "rgb(255, 255, 255)",
  background:
    "linear-gradient(to right, rgb(88, 84, 177) 0%, rgb(45, 41, 136) 100%) 0% 0% / cover rgb(45, 41, 136)"
}));

const FullHeader = styled("div")(() => ({
  display: "flex",
  color: "rgb(255, 255, 255)",
  minHeight: "120px",
  height: "120px",
  alignItems: "center",
  padding: "0 20px",
  zIndex: 300
}));

const ListItemBody = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: "rgb(246, 247, 251)"
  //   padding: "2.4rem"
}));

const ListScroll = styled("div")(() => ({
  padding: "20px"
}));

const PaperRoot = styled(Paper)(({ theme }) => ({
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "16px",
  paddingBottom: "0.4rem",
  paddingTop: "0.4rem",
  paddingLeft: "0.8rem",
  paddingRight: "0.8rem",
  height: "43px"
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
    border: "1px solid #fff !important"
  }
}));

const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const BtnBox = styled(Box)(() => ({
  position: "fixed",
  zIndex: "9999",
  right: "16px",
  top: "50%",

  "&::before": {
    content: `" "`,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "inherit",
    borderRradius: "50%",
    zIndex: "-1",
    borderRadius: "50%",
    animation: `${ripple} 1.5s ease-out infinite`,
    transform: "scale(0.9)",
    backgroundColor: "rgb(85, 105, 255)"
  }
}));

const ListItem = () => {
  const location = useLocation();
  console.log(location, "location");
  const navigate = useNavigate();
  const gameCode = useSelector(state => {
    return state.gameSetting.currentGameCode
      ? state.gameSetting.currentGameCode
      : window.localStorage.getItem("gameCode");
  });

  const [state, setState] = useState({
    status: 0
  });

  const [createState, setCreateState] = useState({});

  const [dateValue, setDateValue] = useState([null, null]);

  const [loading, setLoading] = useState(false);

  const [dialogShow, setDialogShow] = useState(false);

  const [dialogTitle, setDialogTitle] = useState("新建");

  const [listItem, setListItem] = useState([]);

  const [currentItem, setCurrentItem] = useState({});

  const [btnType, setBtnType] = useState(null);

  const handleInputChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSelectChange = e => {
    setState({ ...state, status: e.target.value });
  };

  const handleDateRangeChange = newValue => {
    setState({
      ...state,
      startTime: dayjs(newValue[0]).unix(),
      endTime: dayjs(newValue[1]).unix()
    });
    setDateValue(newValue);
  };

  const handleClose = () => {
    setDialogShow(false);
  };

  const handleSubmit = async event => {
    switch (btnType) {
      case "create":
        await handleCreateChange();
        break;
      case "send":
        await handleSendChange();
        break;
    }
    await getListItemChange();
  };

  const handleSendChange = async () => {
    let status = currentItem.status === 1 ? 2 : 1;
    console.log(currentItem, "currentItem");
    const res = await activeStatus({ status }, currentItem.id);
    console.log(res);
    setDialogShow(false);
  };

  const handleCreateChange = async () => {
    let params = Object.assign({}, createState, {
      gameCode,
      productId: location.state.id
    });
    const res = await activitiesCreate(params);
    console.log(res, "0000");
    setDialogShow(false);
  };

  const getListItemChange = async isSearch => {
    let params = {
      productId: location.state.id,
      gameCode,
      pageSize: 5,
      pageNumber: 1
    };
    if (isSearch) {
      setLoading(true);
      params = Object.assign({}, params, state);
      console.log(params, "params");
    }
    const res = await activitiesList(params);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log(res, "listItem");
    const { activitiesMetas } = res.data;
    setListItem(activitiesMetas);
  };

  const handleChange = event => {
    event.persist();
    setCreateState({
      ...createState,
      [event.target.name]: event.target.value
    });
  };

  const handleBtnChane = (type, item) => {
    console.log(type, item, "77878");
    setCurrentItem(item);
    setBtnType(type);
    setDialogShow(true);
  };

  const handleJumpChange = type => {
    switch (type) {
      case "create":
        navigate("/custom/templateCreate", {
          state: {
            id: currentItem.id
          }
        });
        break;
    }
  };

  useEffect(() => {
    getListItemChange();
  }, [gameCode]);

  const { name } = createState;
  const { status } = state;

  return (
    <ListItemBox>
      <ListItemBgBox></ListItemBgBox>
      <ListItemBody>
        <FullHeader>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <PaperRoot>
                <Icon>search</Icon>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  name="name"
                  placeholder="搜索活动名称"
                  onChange={e => handleInputChange(e)}
                  inputProps={{ "aria-label": "搜索活动名称" }}
                />
              </PaperRoot>
            </Grid>
            <Grid item xs={3}>
              <PaperRoot>
                <Icon>search</Icon>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  displayEmpty
                  sx={{
                    height: "40px",
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none"
                    }
                  }}
                  placeholder="选择发布状态"
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={e => handleSelectChange(e)}
                  value={status || ""}
                >
                  <MenuItem value={0}>全部</MenuItem>
                  <MenuItem value={1}>未发布</MenuItem>
                  <MenuItem value={2}>已发布</MenuItem>
                </Select>
              </PaperRoot>
            </Grid>
            <Grid item xs={3}>
              <PaperRoot>
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
                        <Box sx={{ marginRight: "16px" }}> to </Box>
                        <InputBase
                          ref={endProps.inputRef}
                          {...endProps.inputProps}
                        />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
              </PaperRoot>
            </Grid>
            <Grid item xs={3}>
              <SearchBtn
                variant="outlined"
                loading={loading}
                onClick={() => getListItemChange(true)}
              >
                Search
              </SearchBtn>
            </Grid>
          </Grid>
        </FullHeader>
        <ListScroll>
          <Grid container spacing={3}>
            {listItem.map((item, index) => (
              <Grid item xs={12} key={index}>
                <CardItem
                  name={item.name}
                  activityId={item.activityId}
                  createdAt={dayjs(item.createdAt * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  status={item.status}
                  handleBtnChane={type => handleBtnChane(type, item)}
                  handleJumpChange={type => handleJumpChange(type)}
                />
              </Grid>
            ))}
          </Grid>
        </ListScroll>
      </ListItemBody>
      <BtnBox>
        <Fab
          aria-label="add"
          sx={{
            backgroundColor: "rgb(85, 105, 255)",
            color: "#fff"
          }}
          onClick={() => {
            setBtnType("create");
            setDialogShow(true);
          }}
        >
          <AddIcon sx={{ animation: `${spin} 1s infinite ease` }} />
        </Fab>
      </BtnBox>
      <Dialog open={dialogShow} onClose={handleClose}>
        {btnType === "send" && <DialogTitle>发布</DialogTitle>}
        {btnType === "create" && (
          <DialogTitle>{`${dialogTitle}定制化产品`}</DialogTitle>
        )}
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <DialogContent sx={{ width: 600, padding: "20px 24px !important" }}>
            {btnType === "send" && "确定发布吗"}
            {btnType === "create" && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextFieldValidator
                    type="text"
                    name="name"
                    id="standard-basic"
                    onChange={handleChange}
                    value={name || ""}
                    validators={["required"]}
                    label="创建活动"
                    errorMessages={["请输入创建的名称"]}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button type="submit">确定</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </ListItemBox>
  );
};

export default ListItem;
