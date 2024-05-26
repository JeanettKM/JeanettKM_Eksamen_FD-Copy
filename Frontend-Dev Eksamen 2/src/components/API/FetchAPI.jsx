// FetchAPI.js
import { API_BASE_URL } from "../API/config"; // Adjust the path as necessary

/**
 * FetchAPI function to handle API requests
 * @param {string} endpoint - The API endpoint
 * @param {string} [method="GET"] - The HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} [body=null]
 * @returns {Promise<Object|null>} - The response data or null
 * @throws {Error} - Error message
 */
const FetchAPI = async (endpoint, method = "GET", body = null) => {
  // Retrieve access token and API key from localStorage
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  // Check if access token is located in local storage
  if (!accessToken) {
    console.error("Access token not found in localStorage");
    throw new Error("Access token not found in localStorage");
  }

  // Check if API key is located in local storage
  if (!apiKey) {
    console.error("API key not found");
    throw new Error("API key not found");
  }

  // Put together the URL for the fetch request
  const url = new URL(`${API_BASE_URL}/${endpoint}`);

  // Headers for the request
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey,
  };

  // Set up the fetch request options
  const options = {
    method: method.toUpperCase(), // HTTP method (GET, POST, etc.)
    headers, // HTTP headers
  };

  // If it's not a GET request and there's a body, add the body to the options
  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  console.log("Fetching URL:", url.toString(), "with options:", options);

  // Fetch the data
  const response = await fetch(url.toString(), options);

  // Handle errors
  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(`Failed to fetch: ${response.status} - ${errorMessage}`);
    throw new Error(`Failed to fetch: ${response.status} - ${errorMessage}`);
  }

  // DELETE requests or responses with no content
  if (method.toUpperCase() === "DELETE" || response.status === 204) {
    return null;
  }

  // Parse and return the response data
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export default FetchAPI;
