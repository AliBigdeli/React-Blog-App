import axios from "axios";
 
export const api = axios.create({
  baseURL: "https://fastapi-blog.iran.liara.run",
  headers: {
    "Content-Type": "application/json",
  },
});

// function to make GET requests using the api object
export const getApiData = async (url, params) => {
  setAuthToken();
  try {
    const response = await api.get(url, params);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      unsetAuthToken();
      console.log(error);
    }
  }
};

// function to make POST requests using the api object
export const postApiData = async (url, data) => {
  setAuthToken();
  try {
    const response = await api.post(url, data);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      unsetAuthToken();
      console.log(error);
    }
  }
};
// function to make POST requests using the api object
export const putApiData = async (url, data) => {
  setAuthToken();
  try {
    const response = await api.put(url, data);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      unsetAuthToken();
      console.log(error);
    }
  }
};

// function to check local storage for authentication and add access token to header
export const setAuthToken = () => {
  const token = JSON.parse(localStorage.getItem("userData")).access_token;
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const unsetAuthToken = () => {
  localStorage.removeItem("userData");
  delete api.defaults.headers.common["Authorization"];
};
