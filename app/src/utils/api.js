import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    
      if ( error.response && error.response.status === 401) {
        // Handle 401 errors here
        getRefreshedToken();
      }
    
    return Promise.reject(error);
  }
);

// function to make GET requests using the api object
export const getRefreshedToken = async () => {
  let user_data = JSON.parse(localStorage.getItem("userData"));
  let data = {
    refresh_token: user_data.refresh_token,
  };
  const response = await api.post("/accounts/api/v1/user/refresh/", data);
  if (response.status === 200) {
    user_data.access_token = response.data.access_token;
    localStorage.setItem("userData", JSON.stringify(user_data));
    setAuthToken(response.data.access_token);
  } else {
    unSetAuthToken();
    window.location.href = "/login";
  }
};

// function to make GET requests using the api object
export const getApiData = async (url, params) => {
  const response = await api.get(url, params);
  return response;
};

// function to make POST requests using the api object
export const postApiData = async (url, data) => {
  const response = await api.post(url, data);
  return response;
};
// function to make POST requests using the api object
export const putApiData = async (url, data) => {
  const response = await api.put(url, data);
  return response;
};
// function to make POST requests using the api object
export const deleteApiData = async (url) => {
  const response = await api.delete(url);
  return response;
};
export const setAuthToken = (access_token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};
export const unSetAuthToken = () => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem("userData");
};
