import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function VenueCard({ venue }) {
  const navigate = useNavigate();

  // Venue image URL, or a default image URL if not available
  const firstImageUrl = venue.media?.[0]?.url ?? "default-image-url";
  // Alt text
  const firstImageAlt = venue.media?.[0]?.alt ?? "Default alt text";

  // Navigate to the detailed page of the venue
  const handleReadMore = () => {
    navigate(`/venues/${venue.id}`);
  };

  return (
    <Card className="venue-card">
      <Card.Img
        variant="top"
        src={firstImageUrl}
        alt={firstImageAlt}
        className="card-img-top"
      />
      <Card.Body style={{ height: "150px" }}>
        <Card.Title>{venue.name}</Card.Title>
        <Card.Text
          id="cardDescription"
          style={{
            height: "150px",
            overflowY: "scroll",
            paddingBottom: "70px",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          {venue.description}
        </Card.Text>
      </Card.Body>
      <ListGroup
        className="list-group-flush"
        style={{ height: "150px", overflow: "hidden" }}
      >
        <ListGroup.Item>
          Location: {venue.location.city}, {venue.location.country}
        </ListGroup.Item>
        <ListGroup.Item>Rated: {venue.rating}</ListGroup.Item>
        <ListGroup.Item>Price: {venue.price}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="primary" onClick={handleReadMore}>
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default VenueCard;
