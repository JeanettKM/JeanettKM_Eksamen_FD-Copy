import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function VenueCard({ venue }) {
  const navigate = useNavigate();
  // Setting the URL of the first image of the venue, or a default image URL if not available
  const firstImageUrl = venue.media?.[0]?.url ?? "default-image-url";
  // Setting the alt text of the first image of the venue, or a default alt text if not available
  const firstImageAlt = venue.media?.[0]?.alt ?? "Default alt text";

  // Function to navigate to the detailed page of the venue
  const handleReadMore = () => {
    navigate(`/venues/${venue.id}`);
  };

  // Displaying the venue card
  return (
    <Card className="venue-card">
      {/* Displaying the first image of the venue */}
      <Card.Img
        variant="top"
        src={firstImageUrl}
        alt={firstImageAlt}
        className="card-img-top"
      />
      <Card.Body>
        {/* Displaying the name of the venue */}
        <Card.Title>{venue.name}</Card.Title>
        {/* Displaying the description of the venue */}
        <Card.Text className="card-text">{venue.description}</Card.Text>
      </Card.Body>
      {/* Displaying venue details in a list */}
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          Location: {venue.location.city}, {venue.location.country}
        </ListGroup.Item>
        <ListGroup.Item>Rated: {venue.rating}</ListGroup.Item>
        <ListGroup.Item>Price: {venue.price}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {/* Button to navigate to the detailed page of the venue */}
        <Button variant="primary" onClick={handleReadMore}>
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default VenueCard;
