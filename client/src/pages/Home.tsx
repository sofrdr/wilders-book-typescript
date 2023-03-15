import React, { useEffect, useState } from "react";
import Wilder from "../components/Wilder/Wilder";
import { IWilderProps } from "../components/Wilder/Wilder";

const Home = () => {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);
  const url = "http://localhost:5000/api/wilders";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWilders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(wilders);
  return (
    <main className="container">
      <section>
        <h2>Wilders</h2>
        <div className="card-row">
          {wilders &&
            wilders.map((wilder) => {
              const { id } = wilder;
              return <Wilder key={id} {...wilder} />;
            })}
        </div>
      </section>
    </main>
  );
};

export default Home;
