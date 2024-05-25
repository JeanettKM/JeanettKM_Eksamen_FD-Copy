import React, { useState } from "react";

const RegistrationAPI = ({
  name,
  email,
  password,
  onRegistrationSuccess,
  onRegistrationError,
  onApiKeyCreate,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrationSuccess = async (data) => {
    setIsLoading(true); // Set loading state while processing registration
    try {
      await onApiKeyCreate(); // Call the function to create API key
      onRegistrationSuccess(data);
    } catch (error) {
      console.error("Error creating API key:", error);
      onRegistrationError(error);
    } finally {
      setIsLoading(false); // Reset loading state after processing registration
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); // Set loading state while processing registration
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        handleRegistrationSuccess(data);
      } else {
        const errorData = await response.json();
        onRegistrationError(errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      onRegistrationError(error);
    } finally {
      setIsLoading(false); // Reset loading state after processing registration
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default RegistrationAPI;
