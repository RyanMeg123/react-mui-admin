import React, { useState, useEffect } from "react";

import { debounce } from 'lodash';

import {
  Card,
  Typography,
  Grid,
  Box,
  Icon,
  Tooltip,
  TextField,
  Slide,
  Alert
} from "@mui/material";
import { styled } from "@mui/system";
import { MatxTag, CustomButton } from "components";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { peopleCountsEdit, peopleCountsConfig } from "api/index";

const ManagementBox = styled("div")(() => ({
  margin: "30px"
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "40px"
}));

const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center"
}));

const EditIcon = styled(Icon)(() => ({
  cursor: "pointer",
  "&:hover": {
    color: "#2A80FF"
  }
}));

const BtnBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "20px"
}));

const AlertSlide = <Alert severity="success">修改成功！</Alert>

const ManagementData = () => {
  const [state, setState] = useState({});

  const [value, setValue] = useState([null, null]);

  const [detailState, setDetailState] = useState({});

  const [showAlert, setShowAlert] = useState(false);


  const gameCode = useSelector(state => {
    return state.gameSetting.currentGameCode
      ? state.gameSetting.currentGameCode
      : window.localStorage.getItem("gameCode");
  });

  const handleTextFiledChange = e => {
    e.persist();
    debounce(() => setState({ ...state, [e.target.name]: e.target.value }))
  };

  const { multiple, baseNum, autoTargetNum } = state;

  const handleDatePicker = newValue => {
    console.log(newValue, "newValue");
    setState({
      ...state,
      autoStartTime: dayjs(newValue[0]).unix(),
      autoEndTime: dayjs(newValue[1]).unix()
    });
    setValue(newValue);
  };

  const getDetailChange = async () => {
    const res = await peopleCountsConfig({ gameCode: gameCode });
    console.log(res, "reddddd");
    const { realUserCounts, totalUserCounts } = res.data;
    const {
      autoEndTime,
      autoStartTime,
      autoTargetNum,
      baseNum,
      multiple
    } = res.data.peopleCount;

    setDetailState({
      autoStartTime: dayjs(autoStartTime * 1000).format("YYYY-MM-DD HH:mm:ss"),
      autoEndTime: dayjs(autoEndTime * 1000).format("YYYY-MM-DD HH:mm:ss"),
      autoTargetNum,
      baseNum,
      multiple,
      realUserCounts,
      totalUserCounts
    });
  };

  const resetChange = () => {
      setState({})
  }

  const handleSubmitChange = async () => {
    let params = Object.assign({}, state, {
      gameCode: gameCode
    });
    console.log(params, "dsdsdsdsd");
    const res = await peopleCountsEdit(params);
    console.log(res, "dsuodusod");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
    await getDetailChange();
    resetChange()
  };

  useEffect(() => {
    getDetailChange();
    document.addEventListener("touchstart", function(e) {
        console.log(e.defaultPrevented,'900'); // 将是 false
        e.preventDefault(); // 什么都不做，因为监听器是被动的
        console.log(e.defaultPrevented); // 还是假
      });
  }, [gameCode]);

  return (
    <>
      <ManagementBox>
        <StyledCard>
          <FlexBox>
            <Typography sx={{ fontSize: "18px" }} component="div">
              当前总预注册人数:
            </Typography>
            <MatxTag>
              <Icon className="icon">face</Icon>
              <Box
                sx={{
                  marginLeft: "8px"
                }}
              >
                {detailState.totalUserCounts}
              </Box>
            </MatxTag>
            <Tooltip
              title="当前总预注册人数 = 真实预注册数*增加倍数+增加基数+增长时间段内增长的数量"
              placement="top"
            >
              <Icon
                className="icon"
                sx={{
                  color: "#2A80FF",
                  marginLeft: "10px",
                  cursor: "pointer"
                }}
              >
                info
              </Icon>
            </Tooltip>
          </FlexBox>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "10px"
            }}
          >
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  -真实预注册人数:
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      color: "#2A80FF"
                    }}
                  >
                    {detailState.realUserCounts}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  -增加倍数:
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      color: "#2A80FF"
                    }}
                  >
                    {detailState.multiple}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <FlexBox>
                    <EditIcon className="icon">
                      drive_file_rename_outline
                    </EditIcon>
                    <TextField
                      id="standard-basic"
                      label="增加倍数"
                      name="multiple"
                      value={multiple || ""}
                      sx={{
                        marginLeft: "10px"
                      }}
                      onChange={e => handleTextFiledChange(e)}
                      onInput={e => {
                        return (e.target.value = e.target.value.replace(
                          /^(\-+)|[^\d]+/g,
                          ""
                        ));
                      }}
                      variant="standard"
                    />
                  </FlexBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  -增加基数:
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      color: "#2A80FF"
                    }}
                  >
                    {detailState.baseNum}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <FlexBox>
                    <EditIcon className="icon">
                      drive_file_rename_outline
                    </EditIcon>
                    <TextField
                      id="standard-basic"
                      label="增加基数"
                      name="baseNum"
                      value={baseNum || ""}
                      sx={{
                        marginLeft: "10px"
                      }}
                      onInput={e => {
                        return (e.target.value = e.target.value.replace(
                          /^(\-+)|[^\d]+/g,
                          ""
                        ));
                      }}
                      onChange={e => handleTextFiledChange(e)}
                      variant="standard"
                    />
                  </FlexBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  -增长时间段:
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      color: "#2A80FF"
                    }}
                  >
                    {`${detailState.autoStartTime} ~ ${detailState.autoEndTime}`}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <FlexBox>
                    <EditIcon className="icon">
                      drive_file_rename_outline
                    </EditIcon>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateRangePicker
                        startText="开始时间"
                        endText="结束时间"
                        value={value}
                        onChange={newValue => handleDatePicker(newValue)}
                        renderInput={(startProps, endProps) => (
                          <React.Fragment>
                            <TextField
                              {...startProps}
                              variant="standard"
                              sx={{ marginLeft: "10px" }}
                            />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} variant="standard" />
                          </React.Fragment>
                        )}
                      />
                    </LocalizationProvider>
                  </FlexBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  -增长数量:
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      color: "#2A80FF"
                    }}
                  >
                    {detailState.autoTargetNum}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <FlexBox>
                    <EditIcon className="icon">
                      drive_file_rename_outline
                    </EditIcon>
                    <TextField
                      id="standard-basic"
                      label="增长数量"
                      name="autoTargetNum"
                      value={autoTargetNum || ""}
                      sx={{
                        marginLeft: "10px"
                      }}
                      onInput={e => {
                        return (e.target.value = e.target.value.replace(
                          /^(\-+)|[^\d]+/g,
                          ""
                        ));
                      }}
                      onChange={e => handleTextFiledChange(e)}
                      variant="standard"
                    />
                  </FlexBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledCard>
        <BtnBox>
          <CustomButton onClick={handleSubmitChange}>确定修改</CustomButton>
        </BtnBox>
      </ManagementBox>
      <Slide direction="down" in={showAlert} mountOnEnter unmountOnExit>
        {AlertSlide}
      </Slide>
    </>
  );
};

export default ManagementData;
