import React, { useState, useEffect } from "react";
import "./venueOverview.css";
import VenueCard from "./VenueCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchAPI from "../API/FetchAPI"; // Import FetchAPI component
import { InputGroup, Form, Button } from "react-bootstrap";

const VenueOverview = () => {
  const [venues, setVenues] = useState([]);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      const data = await FetchAPI("holidaze/venues");
      console.log("Fetched venues data:", data);
      if (data && Array.isArray(data.data)) {
        setVenues(data.data);
        setDisplayedVenues(data.data.slice(0, itemsPerPage));
      } else {
        console.error("Expected an array of venues, but received:", data);
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search query is empty, load all venues
      loadVenues();
      return;
    }

    try {
      const data = await FetchAPI(`holidaze/venues/search?q=${searchQuery}`);
      console.log("Searched venues data:", data);
      if (data && Array.isArray(data.data)) {
        setDisplayedVenues(data.data.slice(0, itemsPerPage));
        setCurrentPage(1);
      } else {
        console.error("Error while searching venues:", data);
      }
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
        <InputGroup className="mb-3 searchField">
          <Form.Control
            type="text"
            placeholder="Search venues by name or description..."
            aria-label="Search"
            aria-describedby="inputGroup-sizing-default"
            value={searchQuery}
            onChange={handleChange}
          />
          <Button
            className="searchBtn"
            variant="primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputGroup>
        <hr className="my-4" />
        <Container className="VenueContainer">
          <Row xs={1} md={2} lg={3} className="g-4">
            {displayedVenues.map((venue) => (
              <Col key={venue.id} xs={12}>
                <VenueCard venue={venue} />
              </Col>
            ))}
          </Row>
        </Container>
        <br />
        <Button variant="primary" onClick={loadMoreVenues} role="button">
          Load more venues
        </Button>
      </div>
    </div>
  );
};

export default VenueOverview;
