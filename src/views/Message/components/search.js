import React, { useState, useEffect } from "react";
import { Card, Grid, TextField, Autocomplete, Fab, Icon } from "@mui/material";
import { styled } from "@mui/system";
import { DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { getProductsList } from "api/index";
import { useSelector } from "react-redux";
import { matchSorter } from "match-sorter";
// import

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "40px"
}));

const SearchRoot = styled("div")(() => ({
  position: "relative"
}));

const FlexBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}));

const FlabIcon = styled("div")(() => ({
  position: "absolute",
  left: "47%",
  bottom: "-25px"
}));

const registerOptions = [
  {
    name: "手机号",
    key: 1
  },
  {
    name: "邮箱",
    key: 2
  },
  {
    name: "facebook",
    key: 3
  }
];
const deviceData = [
  {
    name: "mobile",
    key: "mobile"
  },
  {
    name: "web",
    key: "web"
  }
];
const Search = props => {
  const [productOption, setProductionOption] = useState([]);

  const gameCode = useSelector(state => {
    return state.gameSetting.currentGameCode
      ? state.gameSetting.currentGameCode
      : window.localStorage.getItem("gameCode");
  });

  const currentLanguagesList = useSelector(
    state => state.gameSetting.currentGameItem.languages
  );

  const filterProductOptions = (productOption, { inputValue }) =>
    matchSorter(productOption, inputValue, {
      keys: ["id", "name", "productCode"]
    });

  const getPorductChange = async () => {
    const res = await getProductsList({ gameCode: gameCode });
    console.log(res, "dskdksdhksdhskdh");
    setProductionOption(res.data.products)
  };

  useEffect(() => {
    getPorductChange();
  }, [gameCode]);

  const { uid } = props.state;
  return (
    <SearchRoot>
      <StyledCard>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: "100%" }}
              options={productOption}
              onChange={(event, newValue) => {
                props.handleProductChange(event, newValue);
              }}
              filterOptions={filterProductOptions}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label="来源" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              name="uid"
              id="standard-basic"
              sx={{ width: "100%" }}
              label="UID"
              value={uid || ""}
              onChange={event => props.handleChange(event)}
            />
          </Grid>
        </Grid>
      </StyledCard>
    </SearchRoot>
  );
};

export default Search;
