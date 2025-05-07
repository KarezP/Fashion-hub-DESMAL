import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addToBasket } = useContext(BasketContext);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("productRatings")) || {};
    setRatings(savedRatings);
  
    fetch(`https://fashion-backend-production-995e.up.railway.app/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error("Error fetching item:", err));
  }, [id]);
  

  const updateRating = (itemId, rating) => {
    setRatings((prev) => {
      const updated = {
        ...prev,
        [itemId]: prev[itemId] === rating ? 0 : rating,
      };
      localStorage.setItem("productRatings", JSON.stringify(updated));
      return updated;
    });
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="item-detail-container">
      
      <img src={item.image_url} alt={item.name} className="detail-image" />

     
      <div className="detail-info">
        <h2>{item.name}</h2>

        <div className="detail-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => updateRating(item.id, star)}
              style={{
                color: star <= (ratings[item.id] || 0) ? "#FFD700" : "#ccc",
                cursor: "pointer",
                fontSize: "24px",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <p className="detail-price">${item.price}</p>

        <p>{item.description}</p>

        <div className="detail-actions">
        
          <button className="add-btn" onClick={() => addToBasket(item)} >
            Add to Basket  <FontAwesomeIcon icon={faBagShopping} />
          </button>
          

          <Link to="/" className="go-back-link">
            <button className="goBack">← Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
