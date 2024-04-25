import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FetchAPI from "../API/FetchAPI"; // Import FetchAPI component
import "../VenueDetail/venueDetail.css";

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    FetchAPI(`venues/${id}`).then((data) => {
      if (data && data.data) {
        setVenue(data.data);
      } else {
        console.error("Invalid data received:", data);
      }
    });
  }, [id]);

  if (!venue) return <div>Loading...</div>;

  return (
    <div id="venue-div">
      <Card.Body>
        <Card.Title>{venue.name}</Card.Title>
        <Card.Text>{venue.description}</Card.Text>
        <div id="venue-div">
          <img
            id="venue-image"
            src={venue.media[0]?.url}
            alt={venue.media[0]?.alt}
          />
        </div>
        <div className="detailsText">
          <p>Price: {venue.price}</p>
          <p>Max Guests: {venue.maxGuests}</p>
          <p>Rating: {venue.rating}</p>
          <p>
            Location: {venue.location.city}, {venue.location.country}
          </p>
        </div>
        <Button variant="primary">Book Now</Button>
      </Card.Body>
    </div>
  );
};

function HeaderAndFooterExample() {
  return (
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <VenueDetail />
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}

export default HeaderAndFooterExample;
