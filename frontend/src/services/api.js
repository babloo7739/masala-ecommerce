import axios from "axios";

//const API = axios.create({ baseURL: "http://localhost:5000/api" });

const API = axios.create({ baseURL: "https://masala-backend-tfgf.onrender.com/api" });



API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const getUserProfile = () => API.get("/auth/profile");
export const updateUserProfile = (data) => API.put("/auth/profile", data);

export const getProducts = (keyword = "", category = "") => {
  let url = `/products?keyword=${keyword}`;
  if (category) url += `&category=${category}`;
  return API.get(url);
};

export const getProductById = (id) => API.get(`/products/${id}`);
export const addReview = (id, data) => API.post(`/products/${id}/review`, data);
export const createOrder = (data) => API.post("/orders", data);
export const getMyOrders = () => API.get("/orders/myorders");
export const getOrderById = (id) => API.get(`/orders/${id}`);