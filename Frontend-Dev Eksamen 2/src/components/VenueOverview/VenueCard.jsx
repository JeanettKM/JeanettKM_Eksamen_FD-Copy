import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();
  const firstImageUrl = venue.media?.[0]?.url ?? "default-image-url";
  const firstImageAlt = venue.media?.[0]?.alt ?? "Default alt text";

  const handleReadMore = () => {
    navigate(`/venue-detail/${venue.id}`);
  };

  return (
    <div className="venue-card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={firstImageUrl} alt={firstImageAlt} />
        <Card.Body>
          <Card.Title>{venue.name}</Card.Title>
          <Card.Text>{venue.description}</Card.Text>
          <Button variant="primary" onClick={handleReadMore}>
            Read More
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VenueCard;
