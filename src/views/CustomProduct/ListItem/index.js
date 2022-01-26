import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { CardItem } from "components";

const ListItemBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  flex: "1 1 auto",
  height: '100%'
}));

const ListItemBgBox = styled("div")(() => ({
  position: "absolute",
  left: "0px",
  right: "0px",
  top: "0px",
  height: "120px",
  minHeight: "120px",
  pointerEvents: "none",
  color: "rgb(255, 255, 255)",
  background:
    "linear-gradient(to right, rgb(88, 84, 177) 0%, rgb(45, 41, 136) 100%) 0% 0% / cover rgb(45, 41, 136)"
}));

const ListItemBody = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: "rgb(246, 247, 251)",
  padding: "2.4rem",
  marginTop: '100px'
}));

const ListItem = () => {
  const location = useLocation();
  console.log(location, "location");
  return (
    <ListItemBox>
      <ListItemBgBox></ListItemBgBox>
      <ListItemBody>
          <CardItem/>
      </ListItemBody>
    </ListItemBox>
  );
};

export default ListItem;
