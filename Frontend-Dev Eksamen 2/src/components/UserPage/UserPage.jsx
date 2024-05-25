import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./userPage.css";
import FetchAPI from "../API/FetchAPI";

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");
  const [bio, setBio] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueLocation, setVenueLocation] = useState({
    address: "",
    city: "",
    country: "",
  });
  const [venueDescription, setVenueDescription] = useState("");
  const [venueImage, setVenueImage] = useState("");
  const [venuePrice, setVenuePrice] = useState("");
  const [venueMaxGuests, setVenueMaxGuests] = useState("");

  useEffect(() => {
    const profileName = localStorage.getItem("name");

    const fetchUserProfile = async () => {
      try {
        if (profileName) {
          const userProfile = await FetchAPI(
            `holidaze/profiles/${profileName}`
          );
          console.log("Fetched user profile:", userProfile);
          setUserData(userProfile.data); // Ensure this is correctly accessing the data
          fetchUserBookings(profileName);
        } else {
          setError("Profile name not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message);
      }
    };

    const fetchUserBookings = async (profileName) => {
      try {
        const bookings = await FetchAPI(
          `holidaze/profiles/${profileName}/bookings`,
          "GET",
          {
            _venue: true,
          }
        );
        console.log("Fetched user bookings:", bookings);
        setUserBookings(bookings.data || []); // Ensure this is correctly accessing the data
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const profileName = localStorage.getItem("name");

    if (!profileName) {
      setError("Profile name not found in local storage");
      return;
    }

    const requestBody = {
      bio: bio,
    };

    if (avatarUrl && avatarAlt) {
      requestBody.avatar = {
        url: avatarUrl,
        alt: avatarAlt,
      };
    }

    try {
      const updatedProfile = await FetchAPI(
        `holidaze/profiles/${profileName}`,
        "PUT",
        requestBody
      );

      console.log("Updated user profile:", updatedProfile);
      setUserData(updatedProfile.data); // Ensure this is correctly accessing the data
      setAvatarUrl("");
      setAvatarAlt("");
      setBio("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    }
  };

  const handleVenueCreate = async (event) => {
    event.preventDefault();

    if (
      !venueName ||
      !venueLocation ||
      !venueDescription ||
      !venueImage ||
      !venuePrice ||
      !venueMaxGuests
    ) {
      setError("All venue fields are required");
      return;
    }

    const requestBody = {
      name: venueName,
      location: venueLocation,
      description: venueDescription,
      image: venueImage,
      price: parseFloat(venuePrice),
      maxGuests: parseInt(venueMaxGuests, 10),
    };

    console.log("Creating venue with request body:", requestBody);

    try {
      const newVenue = await FetchAPI("holidaze/venues", "POST", requestBody);
      console.log("Created new venue:", newVenue);
      // Optionally update state or provide feedback to the user
    } catch (error) {
      console.error("Error creating venue:", error);
      setError(error.message);
    }
  };

  return (
    <div className="user-page">
      <h2>Profile Overview</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : userData ? (
        <div>
          {userData.banner && (
            <div>
              <img src={userData.banner.url} alt={userData.banner.alt} />
            </div>
          )}
          {userData.avatar && (
            <div>
              <img src={userData.avatar.url} alt={userData.avatar.alt} />
            </div>
          )}
          <p>Name: {userData.name}</p>
          {userData.bio && <p>Bio: {userData.bio}</p>}
          <p>Venue Manager: {userData.venueManager ? "Yes" : "No"}</p>
          <p>
            <Link to="/my-venues">
              Number of Venues: {userData._count?.venues || 0}
            </Link>
          </p>
          <p>Number of Bookings: {userData._count?.bookings || 0}</p>
          <h3>Upcoming Bookings</h3>
          {userBookings.length > 0 ? (
            <ul>
              {userBookings.map((booking) => (
                <li key={booking.id}>
                  <p>
                    Venue:{" "}
                    {booking.venue ? booking.venue.name : "Unknown Venue"}
                  </p>
                  <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p>Guests: {booking.guests}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming bookings.</p>
          )}
          <h3>Update Profile</h3>
          <form onSubmit={handleProfileUpdate}>
            <div>
              <label>
                Avatar URL:
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Avatar Alt Text:
                <input
                  type="text"
                  value={avatarAlt}
                  onChange={(e) => setAvatarAlt(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Bio:
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </label>
            </div>
            <button type="submit">Update Profile</button>
          </form>
          {userData.venueManager && (
            <div>
              <h3>Create Venue</h3>
              <form onSubmit={handleVenueCreate}>
                <div>
                  <label>
                    Venue Name:
                    <input
                      type="text"
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Venue Location Address:
                    <input
                      type="text"
                      value={venueLocation.address}
                      onChange={(e) =>
                        setVenueLocation({
                          ...venueLocation,
                          address: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Venue Location City:
                    <input
                      type="text"
                      value={venueLocation.city}
                      onChange={(e) =>
                        setVenueLocation({
                          ...venueLocation,
                          city: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Venue Location Country:
                    <input
                      type="text"
                      value={venueLocation.country}
                      onChange={(e) =>
                        setVenueLocation({
                          ...venueLocation,
                          country: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Venue Description:
                    <textarea
                      value={venueDescription}
                      onChange={(e) => setVenueDescription(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Venue Image URL:
                    <input
                      type="text"
                      value={venueImage}
                      onChange={(e) => setVenueImage(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Venue Price:
                    <input
                      type="number"
                      value={venuePrice}
                      onChange={(e) => setVenuePrice(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Max Guests:
                    <input
                      type="number"
                      value={venueMaxGuests}
                      onChange={(e) => setVenueMaxGuests(e.target.value)}
                    />
                  </label>
                </div>
                <button type="submit">Create Venue</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;
