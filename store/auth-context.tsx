import React, { createContext, useCallback, useState } from "react";
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
  const handleLogout = useCallback(() => {
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
