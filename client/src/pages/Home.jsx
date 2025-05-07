import { useState, useEffect, useRef, useContext } from "react";
import "../index.css";
import { FavoriteContext } from "../context/FavoriteContext";
import { BasketContext } from "../context/BasketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [errorMessage, setErrorMessage] = useState("");

  const searchRef = useRef();
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { addToBasket } = useContext(BasketContext);
  const navigate = useNavigate();

  const categories = ["All", "T-shirt", "Jeans", "Jewelry", "Shoe"];

  useEffect(() => {
    searchRef.current.focus();

    API.get("/items")
      .then((response) => {
        console.log("Fetched data:", response.data); 
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch products. Try again later.");
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, items]);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <>
      <div className="hero-section">
        <p className="hero-subtitle">Your destination for style</p>
      </div>

      <div className="home-container">
        <div className="search-container">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search for items..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
        {Array.isArray(filteredItems) && filteredItems.map((item) => {
            const isFavorited = favorites.some((fav) => fav.id === item.id);

            return (
              <div className="product-card" key={item.id}>
                <div className="product-image-wrapper">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="product-image"
                    onClick={() => navigate(`/item/${item.id}`)}
                    style={{ cursor: "pointer" }}
                  />

                  <button
                    className="favorite-btn"
                    onClick={() => toggleFavorite(item)}
                  >
                    <FontAwesomeIcon
                      icon={solidHeart}
                      className="heart-icon"
                      style={{ color: isFavorited ? "red" : "white" }}
                    />
                  </button>

                  <button
                    className="basket-btn"
                    onClick={() => addToBasket(item)}
                    title="Add to Basket"
                  >
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="icon-img"
                      style={{ color: "white" }}
                    />
                  </button>
                </div>

                <div className="product-info">
                  <h2>{item.name}</h2>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
