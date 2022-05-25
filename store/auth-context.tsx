import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
interface User {
  userId: string;
  name: string;
  image: string;
  email: number;
  picture: string;
}
interface IAuthContext {
  userInfo: User | null;
  logout: () => void;
  login: (userInfo: User) => void;
}
const AuthContext = createContext<IAuthContext>({
  userInfo: null,
  logout: function () {},
  login: function (userInfo: User) {},
});
export default AuthContext;
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get("/api/user/jwt");
        if (!data.userInfo) {
          return;
        }

        setUserInfo(data.userInfo);
        localStorage.setItem("accessToken", data.accessToken);
      } catch (error) {
        setUserInfo(null);
      }
    };
    getUserInfo();
  }, []);
  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUserInfo(null);
  }, []);
  const handleLogin = useCallback((userInfo: User) => {
    setUserInfo(userInfo);
  }, []);
  const context = {
    userInfo,
    login: handleLogin,
    logout: handleLogout,
  };
  return (
    <AuthContext.Provider value={context}>{children} </AuthContext.Provider>
  );
}
