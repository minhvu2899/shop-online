import React, { createContext, useState } from "react";
interface User {
  userId: string;
  name: string;
  image: string;
  email: number;
}
interface IAuthContext {
  userInfo: User | null;
  logout: () => void;
  login: (userInfo: User) => void;
}
const AuthContext = createContext<IAuthContext>({
  userInfo: null, // { title, message, status }
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
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const handleLogout = () => {
    setUserInfo(null);
  };
  const handleLogin = (userInfo: User) => {
    setUserInfo(userInfo);
  };
  const context = {
    userInfo,
    login: handleLogin,
    logout: handleLogout,
  };
  return (
    <AuthContext.Provider value={context}>{children} </AuthContext.Provider>
  );
}
