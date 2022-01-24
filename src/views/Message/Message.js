import React, { useState } from "react";

import { styled } from "@mui/system";
import Search from "./components/search";

const MessageRoot = styled("div")(() => ({
  margin: "30px"
}));

const handleProductChange = (event, newValue) => {};

const Message = () => {
  const [state, setState] = useState({});
  const handleChange = e => {
      console.log(e,'dshkdhkshdks8')
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <MessageRoot>
        <Search
          state={state}
          handleChange={e => handleChange(e)}
          handleProductChange={(e, newValue) =>
            handleProductChange(e, newValue)
          }
        />
      </MessageRoot>
    </>
  );
};

export default Message;
