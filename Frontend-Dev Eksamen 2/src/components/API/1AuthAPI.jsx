// AuthAPI.jsx
const API_BASE_URL = "https://v2.api.noroff.dev";

// Function to register a new user
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

    // Check if registration was successful
    if (response.ok) {
      // ConsoleLog registration success
      console.log("Registration successful!");
    } else {
      // ConsoleLog registration failure
      console.error("Registration failed:", data);
    }

    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
};

// Function to handle user login
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
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

// Function to create API Key
export const createApiKey = async (accessToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create API Key:", error);
    return null;
  }
};
