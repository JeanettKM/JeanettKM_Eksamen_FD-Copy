// FetchAPI.jsx
const FetchAPI = (endpoint) => {
  const baseUrl = "https://v2.api.noroff.dev/holidaze"; // Set your base URL here

  return fetch(`${baseUrl}/${endpoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return null;
    });
};

export default FetchAPI;
