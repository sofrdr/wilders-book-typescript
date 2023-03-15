import { createContext, useState, useEffect } from "react";
import { IWilderProps } from "../components/Wilder/Wilder";

interface WildersContextProps {
  wilders: IWilderProps[];
}

export const WildersContext = createContext<WildersContextProps>({
  wilders: [],
});

export const WildersProvider = ({ children }: React.PropsWithChildren) => {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);
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
