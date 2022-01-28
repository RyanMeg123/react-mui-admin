import * as React from "react";
import { ReactSortable } from "react-sortablejs";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Icon,
  FormLabel,
  InputBase,
  TextField,
  OutlinedInput
} from "@mui/material";
// import  {ControlLabel, FormControl, FormGroup} from 'rsuite';
import { nanoid } from "nanoid";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/system";

export const Itype = {
  Shared: "Shared",
  Grid: "Grid",
  Row: "Row",
  RowGroup: "RowGroup",
  Col: "Col",
  Control: "Control"
};

const StyledIcon = styled(Icon)(() => ({}));

const PanleRoot = styled("div")(() => ({
  "& .MuiBox-root:not(:first-of-type)": {
    marginTop: "10px"
  }
}));

export default class InputGroup extends React.Component {
  CustomComponent = React.forwardRef((props, ref) => {
    return <PanleRoot ref={ref}>{props.children}</PanleRoot>;
  });

  getNewData = () => {
    const state = {
      list: [
        {
          id: nanoid(),
          type: "Text",
          controls: (list, item, onRefresh) => (
            <FormControl name="name" {...item?.properties} omponent="fieldset">
              <Box>文本框</Box>
              <FormLabel component="legend">This is a Text</FormLabel>
            </FormControl>
          ),
          name: "文字",
          background: "rgb(255, 244, 229)",
          icon: "text_fields"
        },
        {
          id: nanoid(),
          type: "Input",
          controls: (list, item, onRefresh) => (
            <FormControl name="name" {...item?.properties} omponent="fieldset">
              <Box>文本框</Box>
              <OutlinedInput/>
            </FormControl>
          ),
          name: "输入框",
          background: "rgb(229, 250, 251)",
          icon: "input"
        }
      ]
    };
    return state.list.concat();
  };

  state = {
    list: this.getNewData()
  };

  render() {
    const { list } = this.state;
    return (
      <div className={"app-from-left-controller-group"}>
        <p style={{ fontWeight: 600 }}>基础字段</p>
        <ReactSortable
          tag={this.CustomComponent}
          list={list}
          group={{
            name: Itype.Shared,
            pull: "clone",
            put: false
          }}
          sort={false}
          animation={200}
          delay={2}
          fallbackOnBody={true}
          invertSwap={true}
          setList={newState => {
            console.log(newState, "newState");
            this.setState({ list: this.getNewData() });
          }}
        >
          {list.map((item, index) => (
            <Box
              key={index}
              sx={{
                background: `${item.background}`,
                padding: "16px",
                borderRadius: "15px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <StyledIcon>{item.icon}</StyledIcon>
              <Box sx={{ color: "rgba(0, 0, 0, 0.87)", paddingLeft: "5px" }}>
                {item.name}
              </Box>
            </Box>
          ))}
        </ReactSortable>
      </div>
    );
  }
}
