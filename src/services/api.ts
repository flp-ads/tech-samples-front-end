import axios from "axios";

const api = axios.create({
  baseURL: "https://tech-samples-backend.herokuapp.com/",
});

export default api;
