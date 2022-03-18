import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import RoomsAPI from "./api/RoomsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, settoken] = useState(false);

  useEffect(() => {
    const firstlogin = localStorage.getItem("firstlogin");
    if (firstlogin) {
      const refreshtoken = async () => {
        const result = await axios.get("/user/refresh_token");
        settoken(result.data.accesstoken);
        setTimeout(() => {
          refreshtoken();
        }, 10 * 60 * 1000);
      };
      refreshtoken();
    }
  }, []);

  const state = {
    token: [token, settoken],
    roomsAPI: RoomsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
