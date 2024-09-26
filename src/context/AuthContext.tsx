import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { loginAccount } from "@/apis/auth";
import { loginUrl } from "@/constants/const/api-url.const";
import WebApp from "@twa-dev/sdk";

type ContextType = {
  isAuthenticated: boolean;
};

const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
});

function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userData = WebApp?.initDataUnsafe;

  console.log("🚀 ~ AuthProvider ~ userData:", userData);

  const loginMutation = useMutation(
    async () => {
      return await loginAccount(loginUrl, {
        username: "ducnd@dg.pub",
        password: "123456a@A",
      });
    },
    {
      onSuccess: (data) => {
        const { token, expiresIn } = data;
        const expirationTime = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        Cookies.set("token", token, { expires: expirationTime });
        Cookies.set("expiresIn", expirationTime.toISOString());
        setIsAuthenticated(true);
        scheduleTokenRefresh(expiresIn);
      },
      onError: (error: any) => {
        console.error("Error login:", error.message);
        toast.error("Error login");
        setIsAuthenticated(false);
      },
    }
  );

  const scheduleTokenRefresh = (expiresIn: number) => {
    const refreshTime = expiresIn * 1000 - 3 * 60 * 1000;
    setTimeout(() => {
      loginMutation.mutate();
    }, refreshTime);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const expiresIn = Cookies.get("expiresIn");
    if (token && expiresIn) {
      const expirationTime = new Date(expiresIn).getTime();
      const currentTime = new Date().getTime();
      const timeUntilExpiration = (expirationTime - currentTime) / 1000;

      if (timeUntilExpiration > 0) {
        setIsAuthenticated(true);
        scheduleTokenRefresh(timeUntilExpiration);
      } else {
        loginMutation.mutate();
      }
    } else {
      loginMutation.mutate();
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
