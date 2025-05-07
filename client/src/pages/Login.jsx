import { useContext, useState } from "react";
import API from "../services/api";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", { email, password });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setFeedback("Login successful!");

      // Redirect efter kort delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("Login failed:", err);
      const msg = err.response?.data?.error || "Login failed.";
      setFeedback(msg);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        {feedback && <p>{feedback}</p>}
      </form>
    </div>
  );
};

export default Login;
