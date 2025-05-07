import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // hämtar från Netlifys miljövariabel
});

export default API;