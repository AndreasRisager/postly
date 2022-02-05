import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.post(`http://localhost:1337/auth/local`, {
          identifier: "test@test.com",
          password: "test1234",
        });
        setUser(data.user);
        setToken(data.jwt);
      } catch (error) {
        setUser([]);
      }
    };
    getUser();
  }, []);

  const value = {
    token,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
