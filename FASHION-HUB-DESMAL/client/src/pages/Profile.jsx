import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {user?.name}</h1>
      <br></br>
      <p>Email: {user?.email}</p>
      <br></br>
      <button onClick={handelLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;
