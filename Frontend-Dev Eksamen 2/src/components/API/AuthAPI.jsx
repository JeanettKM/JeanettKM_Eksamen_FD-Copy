// AuthAPI.jsx

import { API_BASE_URL } from "../API/config";

export const registerUser = async (userData) => {
  try {
    console.log("Registering user with data:", userData); // Log request body
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        await initializeApiKey();
      }
      console.log(localStorage);
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
      localStorage.setItem("accessToken", data.accessToken);
      await initializeApiKey();
      console.log(localStorage);
    } else {
      console.error("Login failed:", data.message);
    }

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

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

export const initializeApiKey = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && !localStorage.getItem("apiKey")) {
    const apiKeyData = await createApiKey(accessToken);
    if (apiKeyData && apiKeyData.data && apiKeyData.data.key) {
      localStorage.setItem("apiKey", apiKeyData.data.key);
    }
  }
};
