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
import FetchAPI from "../API/FetchAPI";

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
  const [isVenueFormVisible, setIsVenueFormVisible] = useState(false);
  const [isProfileFormVisible, setIsProfileFormVisible] = useState(false);

  useEffect(() => {
    const profileName = localStorage.getItem("name");
    if (profileName) {
      fetchUserProfile(profileName);
    } else {
      setError("Profile name could not be found in local storage");
    }
  }, []);

  const fetchUserProfile = async (profileName) => {
    try {
      const userProfile = await FetchAPI(`holidaze/profiles/${profileName}`);
      setUserData(userProfile.data);
      fetchUserBookings(profileName);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUserBookings = async (profileName) => {
    try {
      const bookings = await FetchAPI(
        `holidaze/profiles/${profileName}/bookings?_venue=true`,
        "GET"
      );
      setUserBookings(bookings.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const profileName = localStorage.getItem("name");
    if (!profileName) {
      setError("Profile name not found in local storage");
      return;
    }

    const requestBody = {
      bio: bio,
      avatar:
        avatarUrl && avatarAlt ? { url: avatarUrl, alt: avatarAlt } : undefined,
    };

    try {
      const updatedProfile = await FetchAPI(
        `holidaze/profiles/${profileName}`,
        "PUT",
        requestBody
      );
      setUserData(updatedProfile.data);
      setAvatarUrl("");
      setAvatarAlt("");
      setBio("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVenueCreate = async (event) => {
    event.preventDefault();

    if (
      !venueName ||
      !venueLocation.address ||
      !venueLocation.city ||
      !venueLocation.country ||
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

    try {
      const response = await FetchAPI("holidaze/venues", "POST", requestBody);
      setSuccess("Venue created successfully!");
      setVenueName("");
      setVenueLocation({ address: "", city: "", country: "" });
      setVenueDescription("");
      setVenueImage("");
      setVenuePrice("");
      setVenueMaxGuests("");
      setIsVenueFormVisible(false);
      window.location.reload();
    } catch (error) {
      setError(`Failed to create venue: ${error.message}`);
    }
  };

  return (
    <>
      {userData?.banner && (
        <div className="banner">
          <Image src={userData.banner.url} alt={userData.banner.alt} fluid />
        </div>
      )}
      <Container className="custom-container user-page mt-5">
        <Row className="justify-content-center">
          <Col md={8} className="d-flex flex-column align-items-center">
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <ProfileOverview
              userData={userData}
              setIsVenueFormVisible={setIsVenueFormVisible}
              isVenueFormVisible={isVenueFormVisible}
              venueName={venueName}
              setVenueName={setVenueName}
              venueLocation={venueLocation}
              setVenueLocation={setVenueLocation}
              venueDescription={venueDescription}
              setVenueDescription={setVenueDescription}
              venueImage={venueImage}
              setVenueImage={setVenueImage}
              venuePrice={venuePrice}
              setVenuePrice={setVenuePrice}
              venueMaxGuests={venueMaxGuests}
              setVenueMaxGuests={setVenueMaxGuests}
              handleVenueCreate={handleVenueCreate}
              isProfileFormVisible={isProfileFormVisible}
              setIsProfileFormVisible={setIsProfileFormVisible}
            />
            {isProfileFormVisible && (
              <ProfileUpdateForm
                avatarUrl={avatarUrl}
                setAvatarUrl={setAvatarUrl}
                avatarAlt={avatarAlt}
                setAvatarAlt={setAvatarAlt}
                bio={bio}
                setBio={setBio}
                handleProfileUpdate={handleProfileUpdate}
              />
            )}
            <UpcomingBookings userBookings={userBookings} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ProfileOverview = ({
  userData,
  setIsVenueFormVisible,
  isVenueFormVisible,
  venueName,
  setVenueName,
  venueLocation,
  setVenueLocation,
  venueDescription,
  setVenueDescription,
  venueImage,
  setVenueImage,
  venuePrice,
  setVenuePrice,
  venueMaxGuests,
  setVenueMaxGuests,
  handleVenueCreate,
  isProfileFormVisible,
  setIsProfileFormVisible,
}) => (
  <>
    <h2 className="text-center mb-4">Profile page</h2>
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
        <p className="text-center">{userData.name}</p>
        {userData.bio && <p className="text-center">- {userData.bio}</p>}
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
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => setIsProfileFormVisible(!isProfileFormVisible)}
        >
          {isProfileFormVisible ? "Hide Profile Form" : "Update Profile"}
        </Button>
        {userData.venueManager && (
          <>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => setIsVenueFormVisible(!isVenueFormVisible)}
            >
              {isVenueFormVisible ? "Hide Venue Form" : "Create New Venue"}
            </Button>
            {isVenueFormVisible && (
              <VenueCreateForm
                venueName={venueName}
                setVenueName={setVenueName}
                venueLocation={venueLocation}
                setVenueLocation={setVenueLocation}
                venueDescription={venueDescription}
                setVenueDescription={setVenueDescription}
                venueImage={venueImage}
                setVenueImage={setVenueImage}
                venuePrice={venuePrice}
                setVenuePrice={setVenuePrice}
                venueMaxGuests={venueMaxGuests}
                setVenueMaxGuests={setVenueMaxGuests}
                handleVenueCreate={handleVenueCreate}
              />
            )}
          </>
        )}
      </div>
    )}
  </>
);

const ProfileUpdateForm = ({
  avatarUrl,
  setAvatarUrl,
  avatarAlt,
  setAvatarAlt,
  bio,
  setBio,
  handleProfileUpdate,
}) => (
  <>
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
  </>
);

const VenueCreateForm = ({
  venueName,
  setVenueName,
  venueLocation,
  setVenueLocation,
  venueDescription,
  setVenueDescription,
  venueImage,
  setVenueImage,
  venuePrice,
  setVenuePrice,
  venueMaxGuests,
  setVenueMaxGuests,
  handleVenueCreate,
}) => (
  <>
    <h3 className="text-center mt-4">Create Venue</h3>
    <Form onSubmit={handleVenueCreate} className="w-100">
      <Form.Group>
        <Form.Label>Venue Name:</Form.Label>
        <Form.Control
          type="text"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Venue Location Address:</Form.Label>
        <Form.Control
          type="text"
          value={venueLocation.address}
          onChange={(e) =>
            setVenueLocation({ ...venueLocation, address: e.target.value })
          }
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Venue Location City:</Form.Label>
        <Form.Control
          type="text"
          value={venueLocation.city}
          onChange={(e) =>
            setVenueLocation({ ...venueLocation, city: e.target.value })
          }
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Venue Location Country:</Form.Label>
        <Form.Control
          type="text"
          value={venueLocation.country}
          onChange={(e) =>
            setVenueLocation({ ...venueLocation, country: e.target.value })
          }
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Venue Description:</Form.Label>
        <Form.Control
          as="textarea"
          value={venueDescription}
          onChange={(e) => setVenueDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Venue Image URL:</Form.Label>
        <Form.Control
          type="text"
          value={venueImage}
          onChange={(e) => setVenueImage(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Venue Price:</Form.Label>
        <Form.Control
          type="number"
          value={venuePrice}
          onChange={(e) => setVenuePrice(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Max Guests:</Form.Label>
        <Form.Control
          type="number"
          value={venueMaxGuests}
          onChange={(e) => setVenueMaxGuests(e.target.value)}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button type="submit" variant="primary" className="w-50">
          Create Venue
        </Button>
      </div>
    </Form>
  </>
);

const UpcomingBookings = ({ userBookings }) => (
  <>
    <h3 className="UpcomingBookings text-center mt-4">Upcoming Bookings</h3>
    {userBookings.length > 0 ? (
      <div id="bookings">
        {userBookings.map((booking, index) => (
          <div key={booking.id} className="booking-container">
            <h4>{booking.venue ? booking.venue.name : "Unknown Venue"}</h4>
            <div className="bookingsText">
              <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
              <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center">No upcoming bookings.</p>
    )}
  </>
);

export default UserPage;
