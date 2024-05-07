// Utility function to fetch with authorization header
async function fetchWithAuth(url, options = {}) {
  // Get the access token from local storage
  const token = localStorage.getItem("SavedToken");

  // Set the Authorization header if a token is available
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = token;
  }

  // Perform the fetch request
  const response = await fetch(url, options);

  // Check if the response is ok
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Return the response data
  return response.json();
}

export default fetchWithAuth;
