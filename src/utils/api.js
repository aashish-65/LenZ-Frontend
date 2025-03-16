// src/utils/api.js
const API_URL = process.env.REACT_APP_BACKEND_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
};

const apiCall = async (endpoint, method = "GET", data = null) => {
  const token = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const options = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Failed to fetch data");
  }
};

export default apiCall;
