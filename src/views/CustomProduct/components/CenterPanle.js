import * as React from "react";
import { ReactSortable } from "react-sortablejs";
import Listener from "./listenner";
// import {Form} from 'rsuite';
import { FormControl } from "@mui/material";

export const Itype = {
  Shared: "Shared",
  Grid: "Grid",
  Row: "Row",
  RowGroup: "RowGroup",
  Col: "Col",
  Control: "Control"
};
export const CustomComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={"app-from-left-controller-group-panle"}>
      {props.children}
    </div>
  );
});

export const Container = props => {
  const { datas, onChange, onRefresh } = props;
  const [list, setList] = React.useState(datas);
  React.useEffect(() => {
    console.log("Container-useEffect");
    onChange?.(list.concat());
  }, [list]);
  return (
    <ReactSortable
      tag={CustomComponent}
      list={list}
      group={{
        name: Itype.Shared,
        pull: true,
        put: [Itype.Shared, Itype.Grid]
      }}
      animation={500}
      delay={1}
      swapThreshold={0.68}
      invertedSwapThreshold={0.68}
      fallbackOnBody={true}
      invertSwap={true}
      onUpdate={(evt, sortable, store) => {
        store["useEvt"] = "onUpdate";
      }}
      onAdd={(evt, sortable, store) => {
        store["useEvt"] = "onAdd";
      }}
      setList={(newState, sortable, store) => {
        if (sortable && store?.dragging) {
          if (["onAdd", "onUpdate"].indexOf(store["useEvt"]) > -1) {
            setList?.(newState);
          }
        }
      }}
    >
      {list?.map(item => (
        <div
          className={"app-from-center-controller-group-item"}
          key={item.id}
          style={{ height: "100%" }}
          form-id={item.id}
          onClick={() => {
            Listener.EmitControllerClick({
              list,
              item,
              callbackUpdate: () => {
                setList?.(list.concat());
              }
            });
          }}
        >
          {item?.controls?.(list, item, onRefresh)}
        </div>
      ))}
    </ReactSortable>
  );
};

/**
 *
 * @author lk
 * @date 2020/6/29 18:58
 * @version 1.0
 */
export default class CenterPanle extends React.Component {
  render() {
    const { formValue: list, onRefresh, onChange } = this.props;
    return (
      <div className={"app-from-center-controller"} style={{ height: "100%" }}>

        <Container datas={list} onRefresh={onRefresh} onChange={onChange} />
      </div>
    );
  }
}
