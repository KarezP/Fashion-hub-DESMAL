import { Link } from "react-router-dom";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { UserContext } from "../context/UserContext";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { basketItems } = useContext(BasketContext);
  const { user } = useContext(UserContext);
  const userName = user?.name;
  const totalItems = basketItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          DESMAL
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/favorites">Favorites</Link>
        <Link to="/basket" className="basket-icon">
          <FontAwesomeIcon icon={faBagShopping} className="icon-img" />
          <span className="basket-count">{totalItems}</span>
        </Link>
        {userName ? (
          <Link to="/profile" className="nav-link">
            {userName}
          </Link>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
