import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/candidate/api",
});

export default api;
