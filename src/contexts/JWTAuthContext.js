import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { MatxLoading } from "../components";
import { getCookie } from "utils/index";
import { coreUser } from "api/index";
import { useDispatch } from "react-redux";
import { getGameList,ROLES_LIST } from "redux/actions/GameSettingActions";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
};

const setSession = accessToken => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const Dispatch = useDispatch();


  const login = async (email, password) => {
    const response = await axios.post("/api/auth/login", {
      email,
      password
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user
      }
    });
  };

  const register = async (email, username, password) => {
    const response = await axios.post("/api/auth/register", {
      email,
      username,
      password
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user
      }
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = getCookie("cstp-access-token-jwt");

        console.log(accessToken, "accessToken");
        if (accessToken) {
          const response = await coreUser();
          console.log(response, "response");
          const { userInfo,roles } = response.data;

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user: userInfo
            }
          });
          dispatch({
            type: ROLES_LIST,
            payload: roles
          });
          Dispatch(getGameList());

        } else {
          window.location.href = "/auth/login";
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
