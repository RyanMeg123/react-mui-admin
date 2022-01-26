import React, { useState, useEffect } from "react";
import { styled, keyframes } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Typography,
  Box,
  Icon,
  Grid,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Autocomplete
} from "@mui/material";
import { useSelector } from "react-redux";
import { getProductsList } from "api/index";
import { MatxTag } from "components";
import dayjs from "dayjs";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { matchSorter } from "match-sorter";
import { productsCreate, productsEdit } from "api/index";

const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const ListCardRoot = styled("div")(() => ({
  margin: "30px",
  position: "relative"
}));

const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center"
}));

const CardRibbonRoot = styled("div")(() => ({
  backgroundImage: 'url("/assets/images/ribbon.svg")',
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  right: "-2px",
  position: "absolute",
  top: "-2px",
  width: "100px",
  height: "100px",
  display: "flex"
}));

const SpanBox = styled(Box)(() => ({
  marginLeft: "8px",
  fontSize: "14px"
}));

const SpinBox = styled("div")(() => ({
  position: "fixed",
  right: "8px",
  top: "50%",
  animation: `${spin} 1s infinite ease`
}));

const MultiActionAreaCard = props => {
  const {
    meidaBg,
    name,
    createdAt,
    productCode,
    typeName,
    editChange,
    type
  } = props;
  const ribbonStyle = () => {
    switch (type) {
      case "pre":
        return {
          top: "25px",
          right: "6px"
        };
      case "official":
        return {
          top: "25px",
          right: "16px"
        };
      default:
        return {
          top: "26px",
          right: "21px"
        };
    }
  };
  return (
    <Card
      sx={{
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow:
            "0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)"
        },
        position: "relative"
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={meidaBg}
          sx={{
            objectFit: "fill"
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <FlexBox
            sx={{
              "& .css-1ac5dga:not(:first-of-type)": {
                marginTop: "10px"
              }
            }}
          >
            <MatxTag className="tag">
              <Icon className="icon" sx={{ fontSize: "18px !important" }}>
                schedule
              </Icon>
              <SpanBox component="span">
                创建时间：{" "}
                {dayjs(createdAt * 1000).format("YYYY-MM-DD HH:mm:ss")}
              </SpanBox>
            </MatxTag>
            <MatxTag className="tag">
              <Icon className="icon" sx={{ fontSize: "18px !important" }}>
                sell
              </Icon>
              <SpanBox component="span">专题Code：{productCode}</SpanBox>
            </MatxTag>
          </FlexBox>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={editChange}>
          编辑
        </Button>
        <Button size="small" color="primary">
          管理
        </Button>
      </CardActions>
      <CardRibbonRoot>
        <Box
          sx={{
            color: "#fff",
            fontSize: "20px",
            fontWeight: 600,
            position: "absolute",
            top: ribbonStyle().top,
            right: ribbonStyle().right,
            transform: "rotate(47deg)"
          }}
        >
          {typeName}
        </Box>
      </CardRibbonRoot>
    </Card>
  );
};

const ListCard = () => {
  const gameCode = useSelector(state => {
    return state.gameSetting.currentGameCode
      ? state.gameSetting.currentGameCode
      : window.localStorage.getItem("gameCode");
  });

  const [list, setList] = useState([]);

  const [dialogShow, setDialogShow] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("新建");
  const [newTypeValue, setNewTypeValue] = useState(null);
  const [currentItem, setCurrentItem] = useState({});

  const [state, setState] = useState({});
  const typeList = [
    {
      value: "lp",
      name: "LP"
    },
    {
      value: "pre",
      name: "预注册"
    },
    {
      value: "official",
      name: "官网"
    },
    {
      value: "event",
      name: "专题、活动"
    }
  ];

  const filterTypeOptions = (typeList, { inputValue }) =>
    matchSorter(typeList, inputValue, {
      keys: ["name", "value"]
    });

  const getProductListChange = async () => {
    const res = await getProductsList({ gameCode });
    console.log(res, "ksisisisiissiis");
    let { products } = res.data;
    products?.forEach(item => {
      switch (item.type) {
        case "lp":
          item.typeName = "LP";
          item.meidaBg = "/assets/images/lp.jpg";
          break;
        case "pre":
          item.typeName = "预注册";
          item.meidaBg = "/assets/images/register.jpg";
          break;
        case "official":
          item.typeName = "官网";
          item.meidaBg = "/assets/images/official.jpg";
          break;
        case "event":
          item.typeName = "专题";
          item.meidaBg = "/assets/images/topic.jpg";
          break;
      }
    });
    setList(products);
  };

  const handleClose = () => {
    setDialogShow(false);
  };

  const handleSubmit = async event => {
    // console.log("submitted");
    console.log(event);
    if (dialogTitle === "新建") {
      await createChange();
    } else {
      await editOkChange();
    }
  };

  const createChange = async event => {
    let params = Object.assign({}, state, { gameCode });
    console.log(params, "ufshfksf");
    try {
      await productsCreate(params);
      setDialogShow(false);
      getProductListChange();
      setState({});
      setNewTypeValue(null);
    } catch (error) {}
  };

  const handleChange = event => {
    event.persist();
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleTypeChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({ ...state, type: newValue.value });
    setNewTypeValue(newValue);
  };

  const editChange = item => {
    console.log(item, "dhshdskdhsk");
    const { name, type } = item;
    let typeObj = typeList.find(item => item.value === type);
    console.log(typeObj, "ddd");
    setDialogShow(true);
    setDialogTitle("编辑");
    setState({ ...state, name, type });
    setNewTypeValue(typeObj);
    setCurrentItem(item);
  };

  const editOkChange = async item => {
    try {
      await productsEdit(currentItem.id, state);
      setDialogShow(false);
      getProductListChange();
      setState({});
    } catch (error) {
      console.log(error.response);
      const { error_code } = error.response.data.exception;
      if (error_code === 400501) {
        alert("编辑失败");
      }
    }
  };

  useEffect(() => {
    getProductListChange();
  }, [gameCode]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isNameMatch", value => {
      console.log(value);

      if (value !== "") {
        return false;
      }
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isNameMatch");
  }, [state.name]);

  const { name, type } = state;

  return (
    <ListCardRoot>
      <Grid container spacing={3}>
        {list.map((item, index) => (
          <Grid item xs={2.4} key={index}>
            <MultiActionAreaCard
              name={item.name}
              meidaBg={item.meidaBg}
              createdAt={item.createdAt}
              productCode={item.productCode}
              typeName={item.typeName}
              type={item.type}
              editChange={() => editChange(item)}
            />
          </Grid>
        ))}
      </Grid>
      <SpinBox>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setDialogShow(true)}
        >
          <AddIcon />
        </Fab>
      </SpinBox>
      <Dialog open={dialogShow} onClose={handleClose}>
        <DialogTitle>{`${dialogTitle}定制化产品`}</DialogTitle>
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
                  label="定制化页面名称"
                  errorMessages={["请输入定制化页面名称"]}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  sx={{ width: "100%" }}
                  options={typeList}
                  onChange={(event, newValue) => {
                    handleTypeChange(event, newValue);
                  }}
                  validators={["required"]}
                  filterOptions={filterTypeOptions}
                  getOptionLabel={(option, value) => {
                    return option.name;
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  value={newTypeValue}
                  renderInput={params => (
                    <TextFieldValidator
                      {...params}
                      validators={["required"]}
                      label="定制化页面类型"
                      value={type || ""}
                      errorMessages={["请选择定制化页面类型"]}
                    />
                  )}
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
    </ListCardRoot>
  );
};

export default ListCard;
