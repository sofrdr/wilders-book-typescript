import { createContext, useState, useEffect, PropsWithChildren } from "react";
import Iwilder from "./interfaces/IWilder";

interface WildersContextProps {
  wilders: Iwilder[];
}

export const WildersContext = createContext<WildersContextProps>({
  wilders: [],
});

export const WildersProvider = ({ children }: PropsWithChildren) => {
  const [wilders, setWilders] = useState<Iwilder[]>([]);
  const url = "http://localhost:5000/api/wilders";
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWilders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <WildersContext.Provider
      value={{
        wilders,
      }}
    >
      {children}
    </WildersContext.Provider>
  );
};
