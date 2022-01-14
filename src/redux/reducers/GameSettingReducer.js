import {
  GET_GAME_LIST,
  CURRENT_GAME_CODE,
  ROLES_LIST,
  LANGUAGES_LIST,
  CURRENT_GAME_ITEM
} from "../actions/GameSettingActions";

const initialState = {
  currentGameCode: null,
  gameList: [],
  roleList: null,
  languagesList: [],
  currentGameItem: null
};

const GameSettingsReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_GAME_LIST: {
      return {
        ...state,
        gameList: [...action.payload]
      };
    }
    case CURRENT_GAME_CODE: {
      return {
        ...state,
        currentGameCode: action.payload
      };
    }

    case ROLES_LIST: {
      return {
        ...state,
        roleList: action.payload
      };
    }

    case LANGUAGES_LIST: {
      return {
        ...state,
        languagesList: action.payload
      };
    }

    case CURRENT_GAME_ITEM: {
      return {
        ...state,
        currentGameItem: action.payload
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default GameSettingsReducer;
