import { API_BASE_URL } from "../API/config";

/**
 * Registers a new user.
 * @param {Object} userData - The user's data.
 * @returns {Object|null} - Return the data or null if registration failed.
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      // Save user data and access token to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        await initializeApiKey();
      }
      console.log("Registration successful!");
    } else {
      console.error("Registration failed:", data);
    }

    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
};

/**
 * Logs in an existing user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {boolean} [includeOptionalProperties=false] - Include additional user data.
 * @returns {Object|null} - The logged in user data or null if login failed.
 */
export const loginUser = async (
  email,
  password,
  includeOptionalProperties = false
) => {
  try {
    const url = includeOptionalProperties
      ? `${API_BASE_URL}/auth/login?_holidaze=true`
      : `${API_BASE_URL}/auth/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save access token in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      await initializeApiKey();
      console.log("Login successful!");
    } else {
      console.error("Login failed:", data.message);
    }

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

/**
 * Create API key
 * @param {string} accessToken - The user's access token.
 * @returns {Object|null} - The API key object, or null if the request failed.
 */
export const createApiKey = async (accessToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: "My API Key" }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create API key: ${response.statusText}`);
    }

    const { data } = await response.json();
    localStorage.setItem("apiKey", data.key);
    console.log("API Key created and stored in local storage:", data.key);
    return data;
  } catch (error) {
    console.error("Error creating API key:", error);
    return null;
  }
};

/**
 * Initializes the API key.
 * If access token exists but the API key isnt found in localStorage, create a new API key.
 */
export const initializeApiKey = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && !localStorage.getItem("apiKey")) {
    const apiKeyData = await createApiKey(accessToken);
    if (apiKeyData && apiKeyData.data && apiKeyData.data.key) {
      localStorage.setItem("apiKey", apiKeyData.data.key);
    }
  }
};
