import React, { useState, useEffect } from "react";
import { Card, Grid, TextField, Autocomplete, Fab, Icon } from "@mui/material";
import { styled, Box } from "@mui/system";
import { DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { countryList } from "api/index";
import { useDispatch, useSelector } from "react-redux";
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
const Search = () => {
  const [value, setValue] = useState(new Date());
  const [arrowStatus, setArrowStatus] = useState(false);
  const [countryOptions, setCountryList] = useState([]);

  const currentGameCode = useSelector(state => {
    return state.gameSetting.currentGameCode
      ? state.gameSetting.currentGameCode
      : window.localStorage.getItem("gameCode");
  });

  const currentLanguagesList = useSelector(
    state => state.gameSetting.currentGameItem.languages
  );

  useEffect(() => {
    console.log(currentGameCode, "currentGameCode");
    const getCountryChange = async () => {
      const res = await countryList({ gameCode: currentGameCode });
      console.log(res, "country list");
      setCountryList(res.data.countries);
    };
    getCountryChange();
  }, [currentGameCode]);

  const handleAutocompleteChange = (event, value) => {};

  const filterOptions = (countryList, { inputValue }) =>
    matchSorter(countryList, inputValue, {
      keys: ["countryCode", "countryName", "countryPublishName"]
    });
  const filterLangOptions = (currentLanguagesList, { inputValue }) =>
    matchSorter(currentLanguagesList, inputValue, {
      keys: ["fullCode", "local_name", "name", "shortCode"]
    });

  const toggleArrowsChange = async () => {
    setArrowStatus(arrowStatus => !arrowStatus);
  };

  return (
    <SearchRoot>
      <StyledCard>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              type="text"
              name="username"
              id="standard-basic"
              sx={{ width: "100%" }}
              label="邮箱/手机/第三方账号"
            />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FlexBox>
                <DateTimePicker
                  renderInput={props => <TextField {...props} />}
                  label="开始时间"
                  value={value}
                  onChange={newValue => {
                    setValue(newValue);
                  }}
                />
                ～
                <DateTimePicker
                  renderInput={props => <TextField {...props} />}
                  label="结束时间"
                  value={value}
                  onChange={newValue => {
                    setValue(newValue);
                  }}
                />
              </FlexBox>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: "100%" }}
              options={countryOptions}
              onChange={(event, newValue) => {
                handleAutocompleteChange(event, newValue);
              }}
              filterOptions={filterOptions}
              getOptionLabel={option => option.countryName}
              renderInput={params => (
                <TextField {...params} label="国家/地区" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: "100%" }}
              options={registerOptions}
              onChange={(event, newValue) => {
                handleAutocompleteChange(event, newValue);
              }}
              getOptionLabel={option => option.name}
              renderInput={params => <TextField {...params} label="注册方式" />}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: "100%" }}
              options={currentLanguagesList}
              onChange={(event, newValue) => {
                handleAutocompleteChange(event, newValue);
              }}
              filterOptions={filterLangOptions}
              getOptionLabel={option => option.name}
              renderInput={params => <TextField {...params} label="语种" />}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: "100%" }}
              options={deviceData}
              onChange={(event, newValue) => {
                handleAutocompleteChange(event, newValue);
              }}
              getOptionLabel={option => option.name}
              renderInput={params => <TextField {...params} label="注册类型" />}
            />
          </Grid>
          {arrowStatus && (
            <>
              <Grid item xs={3}>
                <TextField
                  type="text"
                  name="username"
                  id="standard-basic"
                  sx={{ width: "100%" }}
                  label="utm_source"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="text"
                  name="username"
                  id="standard-basic"
                  sx={{ width: "100%" }}
                  label="utm_medium"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="text"
                  name="username"
                  id="standard-basic"
                  sx={{ width: "100%" }}
                  label="utm_campaign"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="text"
                  name="username"
                  id="standard-basic"
                  sx={{ width: "100%" }}
                  label="utm_content"
                />
              </Grid>
            </>
          )}
        </Grid>
        <FlabIcon onClick={toggleArrowsChange}>
          <Fab
            sx={{
              background: "#fff"
            }}
          >
            {arrowStatus ? (
              <Icon className="icon">expand_less</Icon>
            ) : (
              <Icon className="icon">keyboard_arrow_down</Icon>
            )}
          </Fab>
        </FlabIcon>
      </StyledCard>
    </SearchRoot>
  );
};

export default Search;
