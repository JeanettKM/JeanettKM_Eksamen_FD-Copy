import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function VenueCard({ venue }) {
  const navigate = useNavigate();
  const firstImageUrl = venue.media?.[0]?.url ?? "default-image-url";
  const firstImageAlt = venue.media?.[0]?.alt ?? "Default alt text";

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
      <Card.Body>
        <Card.Title>{venue.name}</Card.Title>
        <Card.Text className="card-text">{venue.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          Location: {venue.location.address}, {venue.location.city},{" "}
          {venue.location.country}
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
