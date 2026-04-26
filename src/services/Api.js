import axios from "axios";

const API = axios.create({
  baseURL: "https://retailsync-pos-backend.onrender.com",
});

export default API;