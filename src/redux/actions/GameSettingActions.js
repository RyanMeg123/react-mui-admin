import { accessGames } from "api/index";

export const GET_GAME_LIST = "GET_GAME_LIST";
export const CURRENT_GAME_CODE = "CURRENT_GAME_CODE";
export const ROLES_LIST = "ROLES_LIST";
export const LANGUAGES_LIST = "LANGUAGES_LIST";
export const CURRENT_GAME_ITEM = "CURRENT_GAME_ITEM";
export const DRAWER_SHOW = "DRAWER_SHOW";

export const getGameList = () => dispatch => {
  accessGames().then(res => {
    console.log(res, "这是gamecode");
    dispatch({
      type: GET_GAME_LIST,
      payload: res.data.accessGames
    });
    dispatch({
      type: CURRENT_GAME_ITEM,
      payload: res.data.accessGames[0]
    });
  });
};

export const setCurrentGameCode = gameCode => dispatch => {
  dispatch({
    type: CURRENT_GAME_CODE,
    payload: gameCode
  });
};

export const setCurrentLanguagesList = getGameList => dispatch => {
  dispatch({
    type: LANGUAGES_LIST,
    payload: getGameList
  });
};

export const setCurrentGameItem = gameItem => dispatch => {
  dispatch({
    type: CURRENT_GAME_ITEM,
    payload: gameItem
  });
};

export const setDrawerShow = payload => dispatch => {
  dispatch({
    type: DRAWER_SHOW,
    payload: payload
  });
};
