import React, { useState, useEffect } from "react";
import { Card, Grid, TextField, Autocomplete, Fab, Icon } from "@mui/material";
import { styled } from "@mui/system";
import { DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { getProductsList } from "api/index";
import { useSelector } from "react-redux";
import { matchSorter } from "match-sorter";
import { serversList } from "api/index";
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

const MessageStatus = [
  {
    id: 0,
    text: "未审批"
  },
  {
    id: 1,
    text: "已通过"
  },
  {
    id: 2,
    text: "已拒绝"
  }
];
const Search = props => {
  const [productOption, setProductionOption] = useState([]);

  const [serverOption, setServerOption] = useState([]);

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
  const filterLangOptions = (currentLanguagesList, { inputValue }) =>
    matchSorter(currentLanguagesList, inputValue, {
      keys: ["fullCode", "local_name", "name", "shortCode"]
    });

  const filterMessageOptions = (MessageStatus, { inputValue }) =>
    matchSorter(MessageStatus, inputValue, {
      keys: ["id", "text"]
    });

    const filterSeverOptions = (MessageStatus, { inputValue }) =>
    matchSorter(MessageStatus, inputValue, {
      keys: ["server_id", "server_name"]
    });

  const getPorductChange = async () => {
    const res = await getProductsList({ gameCode: gameCode });
    console.log(res, "dskdksdhksdhskdh");
    setProductionOption(res.data.products);
  };

  const getServersList = async () => {
    const res = await serversList({ gameCode: gameCode });
    console.lot(res, "serverList......");
    setServerOption(res.data.all);
  };

  useEffect(() => {
    getPorductChange();
    getServersList();
  }, [gameCode]);

  const { uid, beginTime, endTime } = props.state;
  return (
    <SearchRoot>
      <StyledCard>
        <Grid container spacing={4}>
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
              renderInput={params => <TextField {...params} label="来源" />}
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
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: "100%" }}
              options={currentLanguagesList}
              onChange={(event, newValue) => {
                props.handleLanguagesChange(event, newValue);
              }}
              filterOptions={filterLangOptions}
              getOptionLabel={option => option.name}
              renderInput={params => <TextField {...params} label="语种" />}
            />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FlexBox>
                <DateTimePicker
                  name="beginTime"
                  renderInput={props => (
                    <TextField {...props} sx={{ width: "50%" }} />
                  )}
                  label="开始时间"
                  value={beginTime}
                  onChange={event => props.handleBeginTimeChange(event)}
                />
                ～
                <DateTimePicker
                  name="endTime"
                  renderInput={props => (
                    <TextField {...props} sx={{ width: "50%" }} />
                  )}
                  label="结束时间"
                  value={endTime}
                  onChange={event => props.handleEndTimeChange(event)}
                />
              </FlexBox>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: "100%" }}
              options={serverOption}
              onChange={(event, newValue) => {
                props.handleMessageStausChange(event, newValue);
              }}
              filterOptions={filterMessageOptions}
              getOptionLabel={option => option.text}
              renderInput={params => <TextField {...params} label="审批状态" />}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: "100%" }}
              options={serverOption}
              onChange={(event, newValue) => {
                props.handleServerChange(event, newValue);
              }}
              filterOptions={filterSeverOptions}
              getOptionLabel={option => option.server_id}
              renderInput={params => <TextField {...params} label="服务器" />}
            />
          </Grid>
        </Grid>
      </StyledCard>
    </SearchRoot>
  );
};

export default Search;
