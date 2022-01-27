import * as React from "react";
import { ReactSortable } from "react-sortablejs";
import { FormControl, FormControlLabel, FormGroup } from "@mui/material";
// import  {ControlLabel, FormControl, FormGroup} from 'rsuite';
import { nanoid } from "nanoid";

// interface IState {
//     list: Array<IFormNode>
// }

/**
 *
 * @author lk
 * @date 2020/6/30 10:11
 * @version 1.0
 */

export const Itype = {
  Shared: "Shared",
  Grid: "Grid",
  Row: "Row",
  RowGroup: "RowGroup",
  Col: "Col",
  Control: "Control"
};
export default class InputGroup extends React.Component {
  CustomComponent = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} className={"app-from-left-controller-group-panle"}>
        {props.children}
      </div>
    );
  });

  getNewData = () => {
    const state = {
      list: [
        {
          id: nanoid(),
          type: "Input",
          controls: (list, item, onRefresh) => (
            <FormGroup>
              <FormControlLabel label="单行文本框"></FormControlLabel>
              <FormControl name="name" {...item?.properties} />
            </FormGroup>
          ),
          name: "文本框"
        },
        {
          id: nanoid(),
          type: "Input",
          controls: (list, item, onRefresh) => (
            <FormGroup>
              <FormControlLabel abel="多行文本框">多行文本框</FormControlLabel>
              <FormControl
                componentClass="textarea"
                name="name"
                {...item?.properties}
              />
            </FormGroup>
          ),
          name: "多行文本框"
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
        <p>输入型控件</p>
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
            this.setState({ list: this.getNewData() });
          }}
        >
          {list.map((item,index) => (
            <div className={"app-from-left-controller-group-item"} key={index}>
              <small>{item.name}</small>
            </div>
          ))}
        </ReactSortable>
      </div>
    );
  }
}
