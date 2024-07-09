import React, { useState, useEffect } from "react";
import FetchAPI from "../API/FetchAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const MyVenues = () => {
  // state variables
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingVenue, setEditingVenue] = useState(null);

  useEffect(() => {
    // Find the profile name in local storage
    const profileName = localStorage.getItem("name");

    const fetchVenues = async () => {
      try {
        if (profileName) {
          // Fetch venues created with the currently logged in profile
          const response = await FetchAPI(
            `holidaze/profiles/${profileName}/venues`
          );
          console.log("Fetched venues response:", response);

          // Check the response
          if (response && response.data) {
            console.log("Fetched venues data:", response.data);
            setVenues(response.data);
          } else {
            console.error("Invalid response:", response);
            setError("Invalid response");
          }
        } else {
          setError("Profile name could not be found in local storage");
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError(error.message);
      }
    };

    fetchVenues();
  }, []);

  // Click on Edit btn
  const handleEditClick = (venue) => {
    setEditingVenue(venue);
  };

  // Handle edit venue
  const handleVenueUpdate = async (event) => {
    event.preventDefault();
    const { id, name, location, description, image, price, maxGuests } =
      editingVenue;

    const requestBody = {
      name,
      location,
      description,
      image,
      price: parseFloat(price),
      maxGuests: parseInt(maxGuests, 10),
    };

    try {
      // Update the venue
      const updatedVenue = await FetchAPI(
        `holidaze/venues/${id}`,
        "PUT",
        requestBody
      );
      console.log("Updated venue:", updatedVenue);

      // Update with the new venue information
      setVenues((prevVenues) =>
        prevVenues.map((venue) => (venue.id === id ? updatedVenue.data : venue))
      );
      setEditingVenue(null);
    } catch (error) {
      console.error("Error updating venue:", error);
      setError(error.message);
    }
  };

  // Handle Delete btn
  const handleDeleteClick = async (venueId) => {
    try {
      // Delete the venue
      await FetchAPI(`holidaze/venues/${venueId}`, "DELETE");
      console.log("Deleted venue:", venueId);

      // Remove the venue
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueId)
      );
      setSuccess("Venue successfully deleted");
    } catch (error) {
      console.error("Error deleting venue:", error);
      setError(error.message);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingVenue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="my-venues container d-flex flex-column align-items-center flex-grow-1">
        <h2>My Venues</h2>
        {error && <p className="text-danger">Error: {error}</p>}
        {success && <p className="text-success">{success}</p>}
        {venues.length > 0 ? (
          <ul className="list-unstyled w-100">
            {venues.map((venue) => (
              <li key={venue.id} className="mb-4 p-3 border rounded">
                <h3>{venue.name}</h3>
                <p>
                  Location: {venue.location.address}, {venue.location.city},{" "}
                  {venue.location.country}
                </p>
                <p>Description: {venue.description}</p>
                <p>Price: {venue.price}</p>
                <p>Max Guests: {venue.maxGuests}</p>
                <img src={venue.image} alt={venue.name} className="img-fluid" />
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditClick(venue)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(venue.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No venues found.</p>
        )}
        {editingVenue && (
          <div className="edit-venue mt-4">
            <h3>Edit Venue</h3>
            <form onSubmit={handleVenueUpdate} className="w-100">
              <div className="mb-3">
                <label className="form-label">
                  Venue Name:
                  <input
                    type="text"
                    name="name"
                    value={editingVenue.name}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Venue Location Address:
                  <input
                    type="text"
                    name="location.address"
                    value={editingVenue.location.address}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Venue Location City:
                  <input
                    type="text"
                    name="location.city"
                    value={editingVenue.location.city}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Venue Location Country:
                  <input
                    type="text"
                    name="location.country"
                    value={editingVenue.location.country}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Venue Description:
                  <textarea
                    name="description"
                    value={editingVenue.description}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Venue Image URL:
                  <input
                    type="text"
                    name="image"
                    value={editingVenue.image}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Venue Price:
                  <input
                    type="number"
                    name="price"
                    value={editingVenue.price}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Max Guests:
                  <input
                    type="number"
                    name="maxGuests"
                    value={editingVenue.maxGuests}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-success me-2">
                Update Venue
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingVenue(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVenues;
