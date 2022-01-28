import * as React from "react";
import { ReactSortable } from "react-sortablejs";
import Listener from "./listenner";
import "./index.css";
import { FormControl } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDrawerShow } from "redux/actions/GameSettingActions";

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
    <div ref={ref} style={{ height: "100%" }}>
      {props.children}
    </div>
  );
});

export const Container = props => {
  const { datas, onChange, onRefresh } = props;
  const [list, setList] = React.useState(datas);
  const [selectId, setSelectId] = React.useState(null);
  const Dispatch = useDispatch();
  React.useEffect(() => {
    console.log("Container-useEffect");
    onChange?.(list.concat());
    console.log(list, "?????");
    document.querySelectorAll("[form-id]").forEach((k, i, a) => {
      console.log(k, "00088");
      if (k.getAttribute("form-id") === selectId) {
        console.log(k, "kkkkkkk");
        k.classList.add("app-from-controller-select-item");
      } else {
        k.classList.remove("app-from-controller-select-item");
      }
    });
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
        console.log(newState, sortable, store, "newState, sortable, store");

        if (sortable) {
          console.log(newState[newState.length - 1], "000767");
          setSelectId(newState[newState.length - 1].id);
          if (["onAdd", "onUpdate"].indexOf(store["useEvt"]) > -1) {
            console.log("???000jinlal");
            setList?.(newState);
          }
        }
      }}
    >
      {list?.map(item => (
        <div
          className={"app-from-center-controller-group-item"}
          key={item.id}
          form-id={item.id}
          onClick={() => {
            console.log(item, "???");
            document.querySelectorAll("[form-id]").forEach((k, i, a) => {
              if (k.getAttribute("form-id") === item.id) {
                console.log(k, "kkkkkkk");
                k.classList.add("app-from-controller-select-item");
              } else {
                k.classList.remove("app-from-controller-select-item");
              }
            });
            Dispatch(setDrawerShow(true));
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
    console.log(list, "00000999");
    console.log();
    return (
      <div style={{ height: "100%", flex: 1, border: "1px dashed #ccc" }}>
        <Container datas={list} onRefresh={onRefresh} onChange={onChange} />
      </div>
    );
  }
}
