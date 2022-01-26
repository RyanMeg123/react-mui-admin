import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { styled, Box } from "@mui/system";
import {
  Icon,
  Button,
  Tabs,
  Tab,
  Grid,
  ImageListItem,
  ImageList,
  TextField
} from "@mui/material";
import { MatxTabPanel, MatxDialog } from "components";
import { messageDetail, messageLikeNum, messageStatus } from "api/index";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const MessageBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  flex: "1 1 auto"
}));

const MessageBgBox = styled("div")(() => ({
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
  height: "136px",
  alignItems: "center"
}));

const FullBody = styled("div")(() => ({
  display: "flex",
  flex: "1 1 100%",
  flexDirection: "column",
  backgroundColor: "rgb(255, 255, 255)",
  boxShadow:
    "rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 6%) 0px 1px 2px 0px",
  minHeight: "500px",
  borderRadius: "20px 20px 0px 0px"
}));

const FlexLeft = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start"
}));
const FlexRight = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
}));

const FlexRow = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer"
}));

const StyledButton = styled(Button)(() => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  // -webkit-tap-highlight-color: transparent;
  outline: "0px",
  border: "0px",
  margin: "0px",
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  appearance: "none",
  textDecoration: "none",
  fontFamily: '"Inter var", Roboto, Helvetica, Arial, sans-serif',
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: "1.75",
  minWidth: "64px",
  padding: "6px 16px",
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  color: "rgb(30, 31, 35)",
  backgroundColor: "rgb(231, 189, 211)",
  textTransform: "none",
  borderRadius: "18px",
  boxShadow: "none",
  width: "100px"
}));

const StyledTab = styled(Tab)(() => ({
  height: "64px",
  "&.Mui-selected": {
    color: "rgb(88, 84, 177)"
  }
}));

// panel组件
const PanelUserContent = props => {
  const { userInfo, editChange } = props;
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  fontWeight: 600
                }}
              >
                UID:
              </Box>
            </Grid>
            <Grid item xs={6}>
              {userInfo.uid}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  fontWeight: 600
                }}
              >
                语种:
              </Box>
            </Grid>
            <Grid item xs={6}>
              {userInfo.language}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  fontWeight: 600
                }}
              >
                用户联系方式:
              </Box>
            </Grid>
            <Grid item xs={6}>
              {userInfo.mobile}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  fontWeight: 600
                }}
              >
                服务器:
              </Box>
            </Grid>
            <Grid item xs={6}>
              {userInfo.server}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  fontWeight: 600
                }}
              >
                角色名称:
              </Box>
            </Grid>
            <Grid item xs={6}>
              {userInfo.roleName}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  fontWeight: 600
                }}
              >
                留言时间:
              </Box>
            </Grid>
            <Grid item xs={6}>
              {dayjs(userInfo.createdAt * 1000).format("YYYY-MM-DD HH:mm:ss")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  fontWeight: 600
                }}
              >
                当前获赞数量:
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                alignItems: "center",
                justifyContent: "flex-start",
                display: "flex"
              }}
            >
              {userInfo.likeNum}
              <FlexRow
                sx={{
                  fontSize: "14px",
                  color: "#1890ff",
                  marginLeft: "20px"
                }}
              >
                <Icon sx={{ fontSize: "16px !important" }}>edit</Icon>

                <Box onClick={editChange}>修改</Box>
              </FlexRow>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const PanelMessageContent = props => {
  const { other } = props;
  return (
    <Grid container spacing={2}>
      {other.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  fontWeight: 600
                }}
              >
                {item.key}:
              </Box>
            </Grid>
            <Grid item xs={6}>
              {item.value}:
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

const PanelMessageInnerContent = props => {
  const { messageContent } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                fontWeight: 600
              }}
            >
              留言内容:
            </Box>
          </Grid>
          <Grid item xs={6}>
            {messageContent.text}:
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                fontWeight: 600
              }}
            >
              上传图片:
            </Box>
          </Grid>
          <Grid item xs={6}>
            <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
              {messageContent.images.map(item => (
                <ImageListItem key={item.img}>
                  <img src={item} srcSet={item} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const MessageDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const [userState, setUserState] = useState({});

  const [otherList, setOtherList] = useState([]);

  const [messageContent, setMessageContent] = useState({});

  const [likeNum, setLikeNum] = useState(null);

  const [editDialogShow, setEditDialogShow] = useState(false);

  const [status, setStatus] = useState(false);

  const getMessgaeDetailChange = async () => {
    const res = await messageDetail(location.state?.id);
    console.log(res, "messageDetail");
    const {
      uid,
      language,
      mobile,
      server,
      roleName,
      createdAt,
      likeNum,
      other,
      text,
      images,
      status
    } = res.data.message;
    setUserState({
      ...userState,
      uid,
      language,
      mobile,
      server,
      roleName,
      createdAt,
      likeNum,
      likeNum
    });
    setOtherList(other);
    setMessageContent({ ...messageContent, text, images });
    setStatus(status);
  };

  useEffect(() => {
    getMessgaeDetailChange();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLikeNumChange = e => {
    setLikeNum(e.target.value);
  };

  const handleEditConfimChange = async () => {
    const res = await messageLikeNum(location.state?.id, {
      likeNum
    });
    console.log(res, "succe");
    setEditDialogShow(false);
    await getMessgaeDetailChange();
  };

  const hanleStatusChange = async () => {
    let state = status === 1 ? 2 : 1;
    await messageStatus({
      idArr: [location.state?.id],
      status: state
    });
    navigate("/message/search");
  };

  const ceshiChange = () => {
    console.log(111);
    setEditDialogShow(true);
  };

  return (
    <MessageBox>
      <MessageBgBox />
      <FlexFull>
        <FullHeader>
          <Box
            sx={{
              display: "flex",
              alignItem: "center",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <FlexLeft>
              <FlexRow>
                <Icon
                  sx={{ fontSize: "2rem !important" }}
                  onClick={() => navigate("/message/search")}
                >
                  arrow_back
                </Icon>
                <Box
                  sx={{
                    fontSize: "20px",
                    fontWeight: 500,
                    paddingLeft: "5px"
                  }}
                >
                  Back
                </Box>
              </FlexRow>
              <FlexRow sx={{ marginTop: "10px" }}>
                <Box>当前状态：已通过</Box>
                <img
                  src="/assets/images/pass.svg"
                  style={{ width: "40px", height: "40px", marginLeft: "10px" }}
                />
              </FlexRow>
            </FlexLeft>
            <FlexRight>
              <StyledButton onClick={hanleStatusChange}>
                {status !== 1 ? "驳回" : "通过"}
              </StyledButton>
            </FlexRight>
          </Box>
        </FullHeader>
        <FullBody>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{
                  "& .MuiTabs-scroller .MuiTabs-indicator": {
                    backgroundColor: "rgb(88, 84, 177)"
                  }
                }}
              >
                <StyledTab label="用户基本信息" {...a11yProps(0)} />
                <StyledTab label="留言信息" {...a11yProps(1)} />
                <StyledTab label="留言内容" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <MatxTabPanel value={value} index={0}>
              <PanelUserContent userInfo={userState} editChange={ceshiChange} />
            </MatxTabPanel>
            <MatxTabPanel value={value} index={1}>
              <PanelMessageContent other={otherList} />
            </MatxTabPanel>
            <MatxTabPanel value={value} index={2}>
              <PanelMessageInnerContent messageContent={messageContent} />
            </MatxTabPanel>
          </Box>
        </FullBody>
      </FlexFull>

      <MatxDialog
        open={editDialogShow}
        title={"修改获赞数量"}
        handleClose={() => setEditDialogShow(false)}
        handleConfim={handleEditConfimChange}
      >
        <Box
          sx={{
            width: 500,
            maxWidth: "100%"
          }}
        >
          <TextField
            label="获赞数量"
            name="likeNum"
            value={likeNum || ""}
            onChange={e => handleLikeNumChange(e)}
          />
        </Box>
      </MatxDialog>
    </MessageBox>
  );
};
export default MessageDetail;
