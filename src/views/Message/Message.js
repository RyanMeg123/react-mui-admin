import React, { useState } from "react";

import { styled } from "@mui/system";
import Search from "./components/search";

const MessageRoot = styled("div")(() => ({
  margin: "30px"
}));

const Message = () => {
  const [state, setState] = useState({});

  const handleChange = e => {
    console.log(e, "dshkdhkshdks8");
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleProductChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({ ...state, productCode: newValue.productCode });
  };

  const handleLanguagesChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({ ...state, language: newValue.full_code });
  };
  const handleMessageStausChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({ ...state, status: newValue.id });
  };
  const handleServerChange = (event, newValue) => {
    console.log(event, newValue, "djsdjks");
    setState({
      ...state,
      server: `${newValue.server}:${newValue.server_name}`
    });
  };

  const handleBeginTimeChange = beginTime => {
    setState({ ...state, beginTime });
  };

  const handleEndTimeChange = endTime => {
    setState({ ...state, endTime });
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
          handleLanguagesChange={(e, newValue) =>
            handleLanguagesChange(e, newValue)
          }
          handleMessageStausChange={(e, newValue) =>
            handleMessageStausChange(e, newValue)
          }
          handleServerChange={(e, newValue) => handleServerChange(e, newValue)}
          handleBeginTimeChange={e => handleBeginTimeChange(e)}
          handleEndTimeChange={e => handleEndTimeChange(e)}
        />
      </MessageRoot>
    </>
  );
};

export default Message;
