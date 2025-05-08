import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const NotFound = () => {
  return (
    <div className="notFound">
      <img className="notFound-img" src={assets.NotFond} alt="fel" />
      <Link to={"/"}>
        <button className="goBack" type="button">
          Go back
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
