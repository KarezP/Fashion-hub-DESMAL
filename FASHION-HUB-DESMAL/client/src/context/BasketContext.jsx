import { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children, currentUser }) => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const storedBaskets = JSON.parse(localStorage.getItem("baskets")) || {};
      setBasket(storedBaskets[currentUser.email] || []);
    } else {
      setBasket([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const storedBaskets = JSON.parse(localStorage.getItem("baskets")) || {};
      storedBaskets[currentUser.email] = basket;
      localStorage.setItem("baskets", JSON.stringify(storedBaskets));
    }
  }, [basket, currentUser]);

  const addToBasket = (item) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find((i) => i.id === item.id);

      if (existingItem) {
        return prevBasket.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevBasket, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return basket.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  const increaseQuantity = (id) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setBasket((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{
        basketItems: basket,
        addToBasket,
        removeFromBasket,
        getTotalPrice,
        increaseQuantity,
        decreaseQuantity,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
