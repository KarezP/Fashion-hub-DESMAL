import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";
import { BasketContext } from "../context/BasketContext"; // 🛒 Import BasketContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // solid heart
import { faBagShopping } from "@fortawesome/free-solid-svg-icons"; // 🛒 import basket icon
import "../index.css";

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { addToBasket } = useContext(BasketContext); // 🛒 get addToBasket
  const navigate = useNavigate();

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites-message">You have no favorite items yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id || item._id} className="favorites-card">
              <div className="favorites-image-wrapper">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="favorites-image"
                  onClick={() => navigate(`/item/${item.id}`)}
                  style={{ cursor: "pointer" }}
                />

                {/* Heart button */}
                <button
                  className="favorite-icon-btn"
                  onClick={() => toggleFavorite(item)}
                >
                  <FontAwesomeIcon
                    icon={solidHeart}
                    style={{ color: "red", fontSize: "24px" }}
                  />
                </button>

                <button
                  className="basket-icon-btn"
                  type="button"
                  onClick={() => addToBasket(item)}
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faBagShopping} />
                </button>
              </div>

              <div className="favorites-info">
                <h2>{item.name}</h2>
                <p>${item.price}</p>

                <div className="favorites-actions">
                  <button
                    className="goBack"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
