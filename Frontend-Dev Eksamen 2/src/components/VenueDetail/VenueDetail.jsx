import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FetchAPI from "../API/FetchAPI";
import "../VenueDetail/venueDetail.css";

// Create the VenueDetail component
const VenueDetail = () => {
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    // Fetching venue data from the API
    FetchAPI(`venues/${id}`, { _owner: true, _bookings: true }).then((data) => {
      // Checking if valid data is received
      if (data && data.data) {
        console.log("Venue data:", data.data);
        setVenue(data.data);
      } else {
        // Logging an error message if error occurs
        console.error("Invalid data received:", data);
      }
    });
  }, [id]);

  // Display a loading message to indicate data is being fetched
  if (!venue) return <div>Loading...</div>;

  // Displaying the venue details once data is fetched
  return (
    <div id="venue-div">
      <Card.Body>
        {/* Displaying venue name */}
        <Card.Title>{venue.name}</Card.Title>
        {/* Displaying venue description */}
        <Card.Text>{venue.description}</Card.Text>
        {/* Displaying venue image */}
        <div id="venue-div">
          <img
            id="venue-image"
            src={venue.media[0]?.url}
            alt={venue.media[0]?.alt}
          />
        </div>
        <div className="detailsText">
          {/* Displaying venue details */}
          <p>Price: {venue.price}</p>
          <p>Max Guests: {venue.maxGuests}</p>
          <p>Rating: {venue.rating}</p>
          <p>
            Location: {venue.location.city}, {venue.location.country}
          </p>
          <hr className="my-4" />
          {/* Displaying venue features */}
          <div id="VenueFeatures" className="row">
            <div className="col-md-6">
              <p>Wifi: {venue.meta.wifi ? "Yes" : "No"}</p>
              <p>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</p>
            </div>
            <div className="col-md-6">
              <p>Pets: {venue.meta.pets ? "Yes" : "No"}</p>
              <p>Parking: {venue.meta.parking ? "Yes" : "No"}</p>
            </div>
          </div>
          <hr className="my-4" />
          {/* Displaying booking count */}
          <div id="VenueCounter">
            <p>Number of Bookings: {venue._count.bookings}</p>
          </div>
        </div>
        {/* Button to book the venue */}
        <Button variant="primary">Book Now</Button>
      </Card.Body>
    </div>
  );
};

// Card component from react-bootstrap for displaying venue details
function HeaderAndFooterExample() {
  return (
    <Card className="text-center">
      <Card.Header></Card.Header>
      {/* Rendering VenueDetail component */}
      <VenueDetail />
      <Card.Footer className="text-muted">Limited availability</Card.Footer>
    </Card>
  );
}

export default HeaderAndFooterExample;
