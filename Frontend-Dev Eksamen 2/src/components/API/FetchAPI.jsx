// FetchAPI.js
import { API_BASE_URL } from "../API/config"; // Adjust the path as necessary

const FetchAPI = async (endpoint, method = "GET", body = null) => {
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!accessToken) {
    console.error("Access token not found in localStorage");
    throw new Error("Access token not found in localStorage");
  }

  if (!apiKey) {
    console.error("API key not found in localStorage");
    throw new Error("API key not found in localStorage");
  }

  const url = new URL(`${API_BASE_URL}/${endpoint}`);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey,
  };

  const options = {
    method: method.toUpperCase(),
    headers,
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  console.log("Fetching URL:", url.toString(), "with options:", options);

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(`Failed to fetch: ${response.status} - ${errorMessage}`);
    throw new Error(`Failed to fetch: ${response.status} - ${errorMessage}`);
  }

  if (method.toUpperCase() === "DELETE" || response.status === 204) {
    // No Content or DELETE request
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export default FetchAPI;
