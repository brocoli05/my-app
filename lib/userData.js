const getToken = require("./authenticate").getToken; // Assuming you have an Authenticate library with getToken function

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to make authenticated fetch request
const makeRequest = async (url, method, data = null) => {
  const token = await getToken();

  const requestOptions = {
    method: method,
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json",
    },
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

// Function to add to favourites
const addToFavourites = async (id) => {
  const url = `${API_URL}/favourites/${id}`;
  return await makeRequest(url, "PUT");
};

// Function to remove from favourites
const removeFromFavourites = async (id) => {
  const url = `${API_URL}/favourites/${id}`;
  return await makeRequest(url, "DELETE");
};

// Function to get favourites
const getFavourites = async () => {
  const url = `${API_URL}/favourites`;
  return await makeRequest(url, "GET");
};

// Function to add to history
const addToHistory = async (id) => {
  const url = `${API_URL}/history/${id}`;
  return await makeRequest(url, "PUT");
};

// Function to remove from history
const removeFromHistory = async (id) => {
  const url = `${API_URL}/history/${id}`;
  return await makeRequest(url, "DELETE");
};

// Function to get history
const getHistory = async () => {
  const url = `${API_URL}/history`;
  return await makeRequest(url, "GET");
};

module.exports = {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  addToHistory,
  removeFromHistory,
  getHistory,
};
