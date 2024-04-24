import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../VenueDetail/venueDetail.css";

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((data) => setVenue(data.data))
      .catch((error) => console.error("Error fetching venue details:", error));
  }, [id]);

  if (!venue) return <div>Loading...</div>;

  return (
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
