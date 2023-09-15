import React from "react";
import axios from "axios";
import { useContext, useState } from "react";

const Base_URL = "https://password-7woa.onrender.com/user"

const GlobalContext = React.createContext();
export const GlobalProvider = ({ children }) => { 
  const [auth, setAuth] = useState({})
    
    const registerUser = async ( email, pwd) => {
    try {
      const response = await axios.post(
        `${Base_URL}/signup`, {Email : email,Password : pwd}
      )
      console.log(response)
        return response;
    }
    catch (err) {
      console.log(err);
    }
    };  
    
    const loginUserid = async ( email, pwd) => {
    try {
      const response = await axios.post(
        `${Base_URL}/login`,
        {
          
          Email : email,
          Password : pwd,
        }
      )
      console.log(response.data);
      return response;
    }
    catch (err) {
      console.log(err);
    }
    };
    const contextValue = {
      registerUser,
      auth,
      setAuth,
      loginUserid
    }
     return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};