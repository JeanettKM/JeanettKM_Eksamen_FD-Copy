import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Image,
} from "react-bootstrap";
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
          setUserData(userProfile.data);
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
        setUserBookings(bookings.data || []);
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
      setUserData(updatedProfile.data);
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
    } catch (error) {
      console.error("Error creating venue:", error);
      setError(error.message);
    }
  };

  return (
    <>
      {userData && userData.banner && (
        <div className="banner">
          <Image src={userData.banner.url} alt={userData.banner.alt} fluid />
        </div>
      )}
      <Container className="custom-container user-page mt-5">
        <Row className="justify-content-center">
          <Col md={8} className="d-flex flex-column align-items-center">
            {error && <Alert variant="danger">Error: {error}</Alert>}
            <h2 className="text-center mb-4">Profile Overview</h2>
            {userData && (
              <div className="text-center w-100">
                {userData.avatar && (
                  <div className="text-center mb-3">
                    <Image
                      src={userData.avatar.url}
                      alt={userData.avatar.alt}
                      roundedCircle
                      className="profile-picture img-fluid"
                    />
                  </div>
                )}
                <p className="text-center">Name: {userData.name}</p>
                {userData.bio && (
                  <p className="text-center">- {userData.bio}</p>
                )}
                <p className="text-center">
                  Venue Manager: {userData.venueManager ? "Yes" : "No"}
                </p>
                <p className="text-center">
                  <Link to="/my-venues">
                    Number of Venues: {userData._count?.venues || 0}
                  </Link>
                </p>
                <p className="text-center">
                  Number of Bookings: {userData._count?.bookings || 0}
                </p>
                <h3 className="text-center mt-4">Update Profile</h3>
                <Form onSubmit={handleProfileUpdate} className="mb-4 w-100">
                  <Form.Group>
                    <Form.Label>Avatar URL:</Form.Label>
                    <Form.Control
                      type="text"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Avatar Alt Text:</Form.Label>
                    <Form.Control
                      type="text"
                      value={avatarAlt}
                      onChange={(e) => setAvatarAlt(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Bio:</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button type="submit" variant="primary" className="w-50">
                      Update Profile
                    </Button>
                  </div>
                </Form>
              </div>
            )}
            <h3 className="text-center mt-4">Create Venue</h3>
            <Form onSubmit={handleVenueCreate} className="w-100">
              <Form.Group>
                <Form.Label>Venue Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Venue Location Address:</Form.Label>
                <Form.Control
                  type="text"
                  value={venueLocation.address}
                  onChange={(e) =>
                    setVenueLocation({
                      ...venueLocation,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Venue Location City:</Form.Label>
                <Form.Control
                  type="text"
                  value={venueLocation.city}
                  onChange={(e) =>
                    setVenueLocation({
                      ...venueLocation,
                      city: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Venue Location Country:</Form.Label>
                <Form.Control
                  type="text"
                  value={venueLocation.country}
                  onChange={(e) =>
                    setVenueLocation({
                      ...venueLocation,
                      country: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Venue Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  value={venueDescription}
                  onChange={(e) => setVenueDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Venue Image URL:</Form.Label>
                <Form.Control
                  type="text"
                  value={venueImage}
                  onChange={(e) => setVenueImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Venue Price:</Form.Label>
                <Form.Control
                  type="number"
                  value={venuePrice}
                  onChange={(e) => setVenuePrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Max Guests:</Form.Label>
                <Form.Control
                  type="number"
                  value={venueMaxGuests}
                  onChange={(e) => setVenueMaxGuests(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button type="submit" variant="primary" className="w-50">
                  Create Venue
                </Button>
              </div>
            </Form>
            <h3 className="text-center mt-4">Upcoming Bookings</h3>
            {userBookings.length > 0 ? (
              <ul className="list-unstyled text-center w-100">
                {userBookings.map((booking) => (
                  <li key={booking.id} className="mb-3">
                    <p>
                      Venue:{" "}
                      {booking.venue ? booking.venue.name : "Unknown Venue"}
                    </p>
                    <p>
                      From: {new Date(booking.dateFrom).toLocaleDateString()}
                    </p>
                    <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                    <p>Guests: {booking.guests}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No upcoming bookings.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserPage;
