import { createContext, useState, useEffect } from "react";

export const FavoriteContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    console.log("Item to favorite:", item);
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === item.id);
      return exists
        ? prev.filter((fav) => fav.id !== item.id)
        : [...prev, item];
    });
  };
  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoritesProvider;
