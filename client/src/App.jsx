import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ItemDetail from "./pages/DetailsItem";
import Favorites from "./pages/Favorites";
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { BasketProvider } from "./context/BasketContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <BasketProvider currentUser={user}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BasketProvider>
    </>
  );
}

export default App;
