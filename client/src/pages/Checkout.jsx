import { useContext, useState } from "react";
import { BasketContext } from "../context/BasketContext";
import "../index.css";

const Checkout = () => {
  const { basketItems, getTotalPrice, clearBasket } = useContext(BasketContext);
  const [orderComplete, setOrderComplete] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      full_name: formData.name,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      items: basketItems,
      total_price: getTotalPrice(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data.message);
      } else {
        console.error("The order could not be saved");
      }
    } catch (err) {
      console.error("Error while fetching:", err);
    }

    const total = getTotalPrice();

    setFinalTotal(total);

    setOrderComplete(true);
    clearBasket();
  };

  if (orderComplete) {
    return (
      <div className="checkout-container">
        <h1>Thank you for your order!</h1>

        <h2>Total: ${finalTotal.toFixed(2)}</h2>
        <p>We’ve received your order and will email you the details shortly.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <h2>Order Summary</h2>
      <ul className="order-list">
        {basketItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} – ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${getTotalPrice().toFixed(2)}</h3>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Delivery Info</h2>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="phone"
          name="phone"
          placeholder="Your mobile number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Delivery address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="checkout-btn">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
