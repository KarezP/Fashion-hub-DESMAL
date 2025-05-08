import { useState, useContext } from "react";
import API from "../services/api";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/register", form);
      const user = { name: form.name, email: form.email };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      setFeedback(res.data.message || "Account created!");
      setForm({ name: "", email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed.";
      setFeedback(msg);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {feedback && <p>{feedback}</p>}
      </form>
    </div>
  );
};

export default Register;
