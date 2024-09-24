import { createContext, useContext, useEffect, useMemo, useState } from "react";
import cookie from "cookie";

type ContextType = {
  isLogin: boolean;
  checkLogin: () => void;
};

const AuthContext = createContext<ContextType>({
  isLogin: false,
  checkLogin: () => null,
});

function AuthProvider({ children }: any) {
  const [isLogin, setIsLogin] = useState(false);

  const checkLogin = () => {
    const cookies = cookie.parse(window.document.cookie);
    cookies?.token ? setIsLogin(true) : setIsLogin(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const contextValue = useMemo(() => {
    return {
      isLogin,
      checkLogin,
    };
  }, [isLogin]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
