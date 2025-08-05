import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <UrlContext.Provider value={{ user, setUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;