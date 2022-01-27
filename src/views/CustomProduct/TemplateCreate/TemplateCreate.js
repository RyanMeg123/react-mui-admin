import React, { useState, useEffect } from "react";
import { styled, keyframes } from "@mui/system";
import InputGroup from "../components/LeftPanle";
import CenterPanle from "../components/CenterPanle";

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

const CenterRoot = styled("div")(() => ({}));

const TemplateCreate = () => {
  const [formValue, setFormValue] = useState([]);
  const [state, setState] = useState({
    formValue: []
  });

  const onChangeeee = newState => {
    setState({
      formValue: newState.concat()
    });
    console.log(state,'???')
  };
  const onRefreshddd = () => {
    const { formValue } = state;
    setState({
      formValue: formValue.concat()
    });
  };

  return (
    <CreateRoot>
      <CreateLeftRoot>
        <InputGroup />
      </CreateLeftRoot>
      <CreateLeftRoot>
        <CenterPanle
          formValue={state.formValue}
          onChange={onChangeeee}
          onRefresh={onRefreshddd}
        />
      </CreateLeftRoot>
    </CreateRoot>
  );
};

export default TemplateCreate;
