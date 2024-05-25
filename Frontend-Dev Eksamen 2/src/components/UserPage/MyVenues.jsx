import React, { useState, useEffect } from "react";
import FetchAPI from "../API/FetchAPI";

const MyVenues = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // State variable for success message
  const [editingVenue, setEditingVenue] = useState(null);

  useEffect(() => {
    const profileName = localStorage.getItem("name");

    const fetchVenues = async () => {
      try {
        if (profileName) {
          const response = await FetchAPI(
            `holidaze/profiles/${profileName}/venues`
          );
          console.log("Fetched venues response:", response);

          // Check the structure of the response and log it
          if (response && response.data) {
            console.log("Fetched venues data:", response.data);
            setVenues(response.data);
          } else {
            console.error("Invalid response structure:", response);
            setError("Invalid response structure");
          }
        } else {
          setError("Profile name not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError(error.message);
      }
    };

    fetchVenues();
  }, []);

  const handleEditClick = (venue) => {
    setEditingVenue(venue);
  };

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
      const updatedVenue = await FetchAPI(
        `holidaze/venues/${id}`,
        "PUT",
        requestBody
      );
      console.log("Updated venue:", updatedVenue);
      setVenues((prevVenues) =>
        prevVenues.map((venue) => (venue.id === id ? updatedVenue.data : venue))
      );
      setEditingVenue(null);
    } catch (error) {
      console.error("Error updating venue:", error);
      setError(error.message);
    }
  };

  const handleDeleteClick = async (venueId) => {
    try {
      await FetchAPI(`holidaze/venues/${venueId}`, "DELETE");
      console.log("Deleted venue:", venueId);
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueId)
      );
      setSuccess("Venue successfully deleted");
    } catch (error) {
      console.error("Error deleting venue:", error);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingVenue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-venues">
      <h2>My Venues</h2>
      {error && <p>Error: {error}</p>}
      {success && <p>{success}</p>} {/* Display success message */}
      {venues.length > 0 ? (
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>
              <h3>{venue.name}</h3>
              <p>
                Location: {venue.location.address}, {venue.location.city},{" "}
                {venue.location.country}
              </p>
              <p>Description: {venue.description}</p>
              <p>Price: {venue.price}</p>
              <p>Max Guests: {venue.maxGuests}</p>
              <img src={venue.image} alt={venue.name} />
              <button onClick={() => handleEditClick(venue)}>Edit</button>
              <button onClick={() => handleDeleteClick(venue.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No venues found.</p>
      )}
      {editingVenue && (
        <div className="edit-venue">
          <h3>Edit Venue</h3>
          <form onSubmit={handleVenueUpdate}>
            <div>
              <label>
                Venue Name:
                <input
                  type="text"
                  name="name"
                  value={editingVenue.name}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Venue Location Address:
                <input
                  type="text"
                  name="location.address"
                  value={editingVenue.location.address}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Venue Location City:
                <input
                  type="text"
                  name="location.city"
                  value={editingVenue.location.city}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Venue Location Country:
                <input
                  type="text"
                  name="location.country"
                  value={editingVenue.location.country}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Venue Description:
                <textarea
                  name="description"
                  value={editingVenue.description}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Venue Image URL:
                <input
                  type="text"
                  name="image"
                  value={editingVenue.image}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Venue Price:
                <input
                  type="number"
                  name="price"
                  value={editingVenue.price}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Max Guests:
                <input
                  type="number"
                  name="maxGuests"
                  value={editingVenue.maxGuests}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button type="submit">Update Venue</button>
            <button type="button" onClick={() => setEditingVenue(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyVenues;
