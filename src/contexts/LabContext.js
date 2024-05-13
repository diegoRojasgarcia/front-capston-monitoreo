import { useState, useEffect, createContext } from "react";
import { LabMonitoring } from "@/api";

const labCtrl = new LabMonitoring();

export const LabContext = createContext();

export function LabProvider(props) {
  const { children } = props;
  const [labmonitoring, setLabmonitoring] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitor = async (lab) => {
    try {
      labCtrl.setLabMonitoring(lab);
      setLabmonitoring(lab);
      setIsMonitoring(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const stopMonitor = () => {
    labCtrl.removeLabMonitoring;
    setLabmonitoring(null);
    setIsMonitoring(false);
  };

  const data = {
    isMonitoring,
    labmonitoring,
    startMonitor,
    stopMonitor,
  };

  if (!isMonitoring) return null;

  return <LabContext.Provider value={data}>{children}</LabContext.Provider>;
}
