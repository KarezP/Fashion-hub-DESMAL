import axios from "axios";
const API = axios.create({
  baseURL: "https://fashion-backend-production-995e.up.railway.app/api",
});

export default API;
