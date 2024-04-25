import React, { useState, useEffect } from "react";
import "./venueOverview.css";
import VenueCard from "./VenueCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchAPI from "../API/FetchAPI"; // Import FetchAPI component

const VenueOverview = () => {
  const [venues, setVenues] = useState([]);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    FetchAPI("venues").then((data) => {
      if (data && Array.isArray(data.data)) {
        setVenues(data.data);
        setDisplayedVenues(data.data.slice(0, itemsPerPage));
      } else {
        console.error("Expected an array of venues, but received:", data);
      }
    });
  }, []);

  const loadMoreVenues = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newDisplayedVenues = [
      ...displayedVenues,
      ...venues.slice(startIndex, endIndex),
    ];
    setDisplayedVenues(newDisplayedVenues);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-color">
      <div className="jumbotron">
        <h1 className="display-4">Check our Venues</h1>
        <p className="lead text-secondary">
          Can you find the perfect venue for your next event?
        </p>
        <hr className="my-4" />
        <Container>
          <Row xs={1} md={2} lg={3} className="g-4">
            {displayedVenues.map((venue) => (
              <Col key={venue.id} xs={12}>
                {" "}
                {/* Set xs={12} for full width on extra-small screens */}
                <VenueCard venue={venue} />
              </Col>
            ))}
          </Row>
        </Container>
        <br />
        <button
          className="btn btn-primary btn-lg"
          onClick={loadMoreVenues}
          role="button"
        >
          Load more venues
        </button>
      </div>
    </div>
  );
};

export default VenueOverview;
