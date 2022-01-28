import React, { useState, useEffect } from "react";
import { styled, keyframes } from "@mui/system";

import {
  Card,
  Box,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  Drawer
} from "@mui/material";
import InputGroup from "../components/LeftPanle";
import CenterPanle from "../components/CenterPanle";
import TreeConfig from "../components/TreeConfig";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getTreeDataByKey } from "utils/index";
import { useSelector, useDispatch } from "react-redux";
import { setDrawerShow } from "redux/actions/GameSettingActions";
import { useNavigate } from "react-router-dom";

const CreateRoot = styled("div")(() => ({
  display: "flex",
  flexDirection: "row"
}));

const CreateLeftRoot = styled("div")(() => ({
  flex: "0 0 250px",
  maxWidth: "250px",
  minWidth: "250px",
  width: "250px",
  padding: "10px",
  boxShadow: "2px 5px 5px 1px #ccc",
  height: "100vh"
}));

const CenterRoot = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "40px",
  width: "100%",
  margin: "0px 20px 20px 20px",
  display: "flex",
  flexDirection: "row",
  flex: 1
}));

const CenterContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  flex: 1
}));

const BtnBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  padding: "20px"
}));

const CenterTreeRoot = styled(Box)(() => ({}));
const AddBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "10px",
  cursor: "pointer"
}));

const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const TemplateCreate = () => {
  const [formValue, setFormValue] = useState([]);
  const [state, setState] = useState({
    formValue: []
  });

  const [treeData, setTreeData] = useState([]);
  const [nodeState, setNodeState] = useState({});
  const [dialogShow, setDialogShow] = useState(false);
  const [rootAdd, setRootAdd] = useState(true);

  const [currentNodes, setCurrentNodes] = useState({});

  const drawerShow = useSelector(state => state.gameSetting.drawerShow);

  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeeee = newState => {
    setState({
      formValue: newState.concat()
    });
    console.log(state, "???value");
  };
  const onRefreshddd = () => {
    const { formValue } = state;
    setState({
      formValue: formValue.concat()
    });
    console.log(formValue, "formValue");
  };

  const handleAddRootTreeChange = () => {
    setDialogShow(true);
  };

  const handleChange = event => {
    event.persist();
    setNodeState({
      ...nodeState,
      [event.target.name]: event.target.value
    });
  };

  const handleClose = () => {
    setDialogShow(false);
  };

  const handleSubmit = async event => {
    console.log(event, "9090");
    let rootArr = [
      {
        name: nodeState.name,
        id: nodeState.key
      }
    ];
    if (rootAdd) {
      setTreeData([...treeData, ...rootArr]);
    } else {
      const select = getTreeDataByKey(treeData, currentNodes.id);
      console.log(select, "select");
      if (!select.children) {
        select.children = [];
      }
      select?.children.push({
        name: nodeState.name,
        id: nodeState.key
      });
      console.log(select, "aaaaa");
    }
    setDialogShow(false);
    setNodeState({});
  };

  const handleTreeViewChange = nodes => {
    setDialogShow(true);
    setCurrentNodes(nodes);
    setRootAdd(false);
  };

  const handleTreeClick = nodes => {
    console.log(nodes, "dhhdh");
    const select = getTreeDataByKey(treeData, nodes.id);
    select.list = state.formValue;
    console.log(select, "select");
  };

  const backChange = () => {
    navigate('/custom/list')
  };

  const { name, key } = nodeState;

  return (
    <CreateRoot>
      <CreateLeftRoot>
        <InputGroup />
      </CreateLeftRoot>
      <CenterContainer>
        <BtnBox>
          <Button variant="contained" onClick={backChange}>
            提交
          </Button>
        </BtnBox>
        <CenterRoot>
          <CenterTreeRoot>
            <AddBox component="span" onClick={handleAddRootTreeChange}>
              <Icon>add_circle_outline</Icon>
              添加选项
            </AddBox>
            <TreeConfig
              treeData={treeData}
              handleTreeViewChange={nodes => handleTreeViewChange(nodes)}
              handleTreeClick={nodes => handleTreeClick(nodes)}
            ></TreeConfig>
          </CenterTreeRoot>
          <CenterPanle
            formValue={state.formValue}
            onChange={onChangeeee}
            onRefresh={onRefreshddd}
          />
        </CenterRoot>
      </CenterContainer>
      <Dialog open={dialogShow} onClose={handleClose}>
        <DialogTitle>添加节点</DialogTitle>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <DialogContent sx={{ width: 600, padding: "20px 24px !important" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextFieldValidator
                  type="text"
                  name="name"
                  id="standard-basic"
                  onChange={handleChange}
                  value={name || ""}
                  validators={["required"]}
                  label="节点名称"
                  errorMessages={["请输入节点名称"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldValidator
                  name="key"
                  id="standard-basic"
                  onChange={handleChange}
                  value={key || ""}
                  validators={["required"]}
                  label="key"
                  errorMessages={["请输入key"]}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button type="submit">确定</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
      <Drawer
        anchor={"right"}
        open={drawerShow}
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px"
          }
        }}
        onBackdropClick={() => Dispatch(setDrawerShow(false))}
      >
        lorem dhlshdlsdh
      </Drawer>
    </CreateRoot>
  );
};

export default TemplateCreate;
