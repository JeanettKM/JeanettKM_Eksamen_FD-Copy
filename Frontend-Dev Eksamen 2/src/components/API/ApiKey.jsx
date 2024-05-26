import { API_BASE_URL } from "../API/config";

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
    if (apiKeyData && apiKeyData.key) {
      localStorage.setItem("apiKey", apiKeyData.key);
    }
  }
};
