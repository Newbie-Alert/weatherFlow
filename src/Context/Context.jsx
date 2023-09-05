import { createContext } from "react";
import { useData } from "../hooks/useData";

export const ContextData = createContext();

export function ContextDataProvider({ children }) {
  const [weatherData, loading, error] = useData();

  return (
    <ContextData.Provider value={{ weatherData, loading, error }}>
      {children}
    </ContextData.Provider>
  );
}
