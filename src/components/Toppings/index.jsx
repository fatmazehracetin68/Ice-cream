import axios from "axios";
import React, { useEffect, useState } from "react";

const Toppings = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  const handleChange = (item) => {
    const found = basket.find((i) => i.id === item.id);
    found ? setBasket(basket.filter((i) => i.id !== item.id)) : setBasket([...basket, item]);
  };
  useEffect(() => {
    axios.get("http://localhost:4090/toppings").then((res) => setData(res.data));
  }, []);
  return (
    <div>
      <h1>Sos Çeşitleri</h1>
      <p>
        Tanesi <span className="text-success mx-2">3</span>tl
      </p>
      <h3>
        Soslar ÜCreti{" "}
        <span data-testid="total" className="text-success mx-2">
          {basket.length * 3}
        </span>
        tl
      </h3>
      <div className="row p-3 mt-4 gap-3">
        {data.map((i) => {
          const found = basket.find((basketItem) => basketItem.id === i.id);

          return (
            <div
              data-testid="card"
              onClick={() => handleChange(i)}
              className={`top-card col ${found ? "active" : ""}`}
              key={i.id}
            >
              <div>
                <img src={i.imagePath} height={100} />
                <p>{i.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Toppings;
