import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card";
import "@testing-library/jest-dom/extend-expect";

const Scoops = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4090/scoops")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  //sepete ekleme
  const addToBasket = (item) => {
    const found = basket.find((i) => i.id === item.id);

    if (found) {
      const updated = { ...found, amount: found.amount + 1 };
      const temp = basket.map((i) => (i.id === found.id ? updated : i));
      setBasket(temp);
    } else {
      setBasket([...basket, { ...item, amount: 1 }]);
    }
  };

  //elemanı sepetten silmek için
  const removeFromBasket = (id) => {
    const found = basket.find((i) => i.id === id);
    if (found.amount > 1) {
      const updated = { ...found, amount: found.amount - 1 };
      const temp = basket.map((i) => (i.id === found.id ? updated : i));
      setBasket(temp);
    } else {
      setBasket(basket.filter((i) => i.id !== id));
    }
  };
  //toplam fiyatı hesaplamak için REDUCE!!!
  const total = basket.reduce((total, i) => total + i.amount * 20, 0);

  return (
    <div>
      <h1>Dondurma Çeşitleri</h1>
      <p>
        Tanesi
        <span ="total" className="text-success mx-2">
          20
        </span>
        tl
      </p>
      <h3>
        Çeşitler Ücreti <span className="text-success mx-2">{total}</span>tl
      </h3>

      <div className="p-3 row gap-5 mt-4 justify-content-between">
        {data.map((i) => (
          <Card
            item={i}
            key={i.id}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            basket={basket}
          />
        ))}
      </div>
    </div>
  );
};

export default Scoops;
