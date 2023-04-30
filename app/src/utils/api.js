import axios from "axios";

const api = axios.create({
  baseURL: "https://fastapi-blog.iran.liara.run",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
