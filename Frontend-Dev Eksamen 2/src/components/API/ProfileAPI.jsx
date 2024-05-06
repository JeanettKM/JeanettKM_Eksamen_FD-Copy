// ProfileAPI.jsx

const baseUrl = "https://v2.api.noroff.dev/holidaze"; // Base URL for the API

// Function to fetch user profile data
export const fetchUserProfile = async (accessToken) => {
  try {
    const response = await fetch(`${baseUrl}/profiles`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Function to update user profile
export const updateProfile = async (accessToken, profileData) => {
  try {
    const response = await fetch(`${baseUrl}/profiles`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
};
