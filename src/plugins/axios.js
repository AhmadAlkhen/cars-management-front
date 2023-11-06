import axios from "axios";

// Add any default headers you might need, e.g., for authentication
const accessToken = localStorage.getItem("accessToken");
axios.defaults.headers.common["Authorization"] = accessToken
  ? `Bearer ${accessToken}`
  : "";
const token = accessToken ? `Bearer ${accessToken}` : "";

// Set the base URL for your API
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Replace with your API URL
  timeout: 5000, // Set a timeout in milliseconds
  headers: {
    "Content-Type": "application/form-data",
    Authorization: token,
  },
});

export default axiosInstance;
