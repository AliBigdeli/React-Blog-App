import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// function to make GET requests using the api object
export const getApiData = async (url, params) => {
  setAuthToken();
  const response = await api.get(url, params);
  return response;
};

// function to make POST requests using the api object
export const postApiData = async (url, data) => {
  setAuthToken();
  const response = await api.post(url, data);
  return response;
};
// function to make POST requests using the api object
export const putApiData = async (url, data) => {
  setAuthToken();
  const response = await api.put(url, data);
  return response;
};
// function to make POST requests using the api object
export const deleteApiData = async (url) => {
  setAuthToken();
  const response = await api.delete(url);
  return response;
};

// function to check local storage for authentication and add access token to header
export const setAuthToken = () => {
  if (localStorage.getItem("userData")) {
    const token = JSON.parse(localStorage.getItem("userData")).access_token;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const unsetAuthToken = () => {
  localStorage.removeItem("userData");
  delete api.defaults.headers.common["Authorization"];
};

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with the response data
    return response;
  },
  function (error) {
    // Do something with the response error
    if (error.response && error.response.status === 401) {
      unsetAuthToken();
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);
