// UserPage.jsx

import React, { useState, useEffect } from "react";
import "./userPage.css";
import FetchAPI from "../API/FetchAPI";
import { loginUser } from "../API/AuthAPI";

const UserPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const profileName = localStorage.getItem("name");

    const fetchUserProfile = async () => {
      try {
        if (profileName) {
          const userProfile = await FetchAPI(`profiles/${profileName}`);
          setUserData(userProfile);
        } else {
          console.error("Profile name not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="user-page">
      <h2>Profile Overview</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add more profile information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;
