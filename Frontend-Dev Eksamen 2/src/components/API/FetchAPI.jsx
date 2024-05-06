// FetchAPI.jsx

const FetchAPI = (endpoint) => {
  const baseUrl = "https://v2.api.noroff.dev/holidaze"; // Base URL for the API

  return fetch(`${baseUrl}/${endpoint}`)
    .then((response) => {
      console.log("Response status:", response.status); // Log response status
      console.log("Response headers:", response.headers); // Log response headers

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched:", data); // Log fetched data
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return null;
    });
};

export const getUserProfile = async () => {
  return FetchAPI("profiles");
};

export default FetchAPI;
