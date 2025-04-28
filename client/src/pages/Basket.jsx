import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { Link } from "react-router-dom";
import "../index.css";

const Basket = () => {
  const {
    basketItems,
    removeFromBasket,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(BasketContext);

  return (
    <div className="basket-container">
      <h1>Your Basket</h1>

      {basketItems.length === 0 ? (
        <p className="empty-message">Your basket is empty.</p>
      ) : (
        <>
          <div className="basket-items">
            {basketItems.map((item) => (
              <div className="basket-item" key={item.id}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="basket-item-image"
                />
                <div className="basket-item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <p>Quantity: {item.quantity}</p>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromBasket(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="basket-summary">
            <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
            <Link to="/checkout" className="checkout-btn">
              Go to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
