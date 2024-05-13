import { useState, useEffect, createContext } from "react";
import { Token, User, LabMonitoring } from "@/api";

const tokenCtrl = new Token();
const userCtrl = new User();
const labCtrl = new LabMonitoring();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;

  // usuario
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //laboratorio
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [labmonitoring, setLabmonitoring] = useState(null);

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  const login = async (token) => {
    try {
      tokenCtrl.setToken(token);
      const idUser = tokenCtrl.GetUser(token);
      const user = await userCtrl.GetUser(idUser);
      setUser(user.user);
      setToken(token);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    tokenCtrl.removeToken();
    setToken(null);
    setUser(null);
  };

  //laboratorio
  const startMonitor = async (lab) => {
    try {
      labCtrl.setLabMonitoring(lab);
      labCtrl.setIsMonitoring(true);
      setLabmonitoring(labCtrl.getLabMonitoring());
      setIsMonitoring(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopMonitor = () => {
    labCtrl.removeLabMonitoring();
    labCtrl.setIsMonitoring(false);
    setLabmonitoring(null);
    setIsMonitoring(false);
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    startMonitor,
    stopMonitor,
    isMonitoring,
    labmonitoring,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
