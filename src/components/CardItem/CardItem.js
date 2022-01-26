import { styled } from "@mui/system";
import { Card, Box, Icon, Button } from "@mui/material";
import { MatxTag, MatxTagSub } from "components";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsBackupRestoreOutlinedIcon from "@mui/icons-material/SettingsBackupRestoreOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const CardRoot = styled(Card)(() => ({
  boxShadow:
    "0 0 #0000,0 0 #0000,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)",
  borderRadius: "16px",
  padding: "20px"
}));

const BoxFlexRoot = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center"
}));

const FlexBetweenRoot = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}));

const FlexColumnRoot = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start"
}));

const BoxStyled = styled(Box)(() => ({
  color: "rgb(17, 24, 39)",
  fontSize: "18px"
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: "#EFEFF8",
  color: "#303f9f"
}));

const CardItem = props => {
  const {} = props;
  return (
    <CardRoot>
      <BoxFlexRoot>
        <BoxStyled>titletititlle</BoxStyled>
        <Icon
          sx={{
            fontSize: "17px !important",
            marginLeft: "10px",
            cursor: "pointer"
          }}
        >
          border_color
        </Icon>
      </BoxFlexRoot>
      <FlexBetweenRoot>
        <FlexColumnRoot>
          <BoxFlexRoot>
            <MatxTag sx={{ marginLeft: 0, marginTop: "10px" }}>
              <Box
                component="span"
                sx={{
                  width: "8px",
                  height: "8px",
                  marginRight: "4px",
                  borderRadius: "50%",
                  backgroundColor: "rgb(3, 169, 244)"
                }}
              ></Box>
              <Box
                component="span"
                sx={{ color: "#111827", fontSize: "12px !important" }}
              >
                活动ID:160027777643764
              </Box>
            </MatxTag>
            <MatxTag sx={{ marginLeft: "10px", marginTop: "10px" }}>
              <Box
                component="span"
                sx={{
                  width: "8px",
                  height: "8px",
                  marginRight: "4px",
                  borderRadius: "50%",
                  backgroundColor: "rgb(96, 125, 139)"
                }}
              ></Box>
              <Box
                component="span"
                sx={{ color: "#111827", fontSize: "12px !important" }}
              >
                创建时间:2022/01/26 15:27:17
              </Box>
            </MatxTag>
          </BoxFlexRoot>
          <BoxFlexRoot
            sx={{
              marginTop: "30px",
              "& .MuiButton-root:not(:first-of-type)": {
                marginLeft: "10px"
              }
            }}
          >
            <StyledButton startIcon={<AddCircleOutlineOutlinedIcon />}>
              创建模版
            </StyledButton>
            <StyledButton startIcon={<SettingsBackupRestoreOutlinedIcon />}>
              素材配置
            </StyledButton>
            <StyledButton startIcon={<ContentCopyOutlinedIcon />}>
              复制创建
            </StyledButton>
            <StyledButton startIcon={<ArrowCircleDownOutlinedIcon />}>
              下载配置
            </StyledButton>
            <StyledButton startIcon={<ArrowCircleUpOutlinedIcon />}>
              上传配置
            </StyledButton>
            <StyledButton startIcon={<SendOutlinedIcon />}>发布</StyledButton>
          </BoxFlexRoot>
        </FlexColumnRoot>
        <MatxTagSub
          type="red"
          sx={{
            width: "80px"
          }}
        >
          未发布
        </MatxTagSub>
      </FlexBetweenRoot>
    </CardRoot>
  );
};

export default CardItem;