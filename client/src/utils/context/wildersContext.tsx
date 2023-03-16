import { createContext, useState, useEffect, PropsWithChildren } from "react";
import Iwilder from "../interfaces/IWilder";

interface WildersContextProps {
  wilders: Iwilder[];
  fetchData: () => void | Promise<void>;
}

export const WildersContext = createContext<WildersContextProps>({
  wilders: [],
  fetchData: () => {},
});

export const WildersProvider = ({ children }: PropsWithChildren) => {
  const [wilders, setWilders] = useState<Iwilder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        fetchData,
      }}
    >
      {children}
    </WildersContext.Provider>
  );
};
