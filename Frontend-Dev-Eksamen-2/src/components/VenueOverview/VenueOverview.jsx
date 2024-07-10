import React, { useState, useEffect } from "react";
import VenueCard from "./VenueCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchAPI from "../API/FetchAPI";
import { Button } from "react-bootstrap";
import SearchBar from "../SearchBar";

const VenueOverview = () => {
  // State variables
  const [venues, setVenues] = useState([]);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    loadVenues();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  // Load venues from the API
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

  // Helper function to convert venue object to searchable string
  const venueToString = (venue) => {
    return JSON.stringify(venue).toLowerCase();
  };

  // Search functionality
  const handleSearch = (query) => {
    if (!query.trim()) {
      // If search query is empty, show all venues
      setDisplayedVenues(venues.slice(0, itemsPerPage));
      return;
    }

    const filteredVenues = venues.filter((venue) => {
      return venueToString(venue).includes(query.toLowerCase());
    });
    setDisplayedVenues(filteredVenues.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  // Load more venues btn
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
        <SearchBar onSearch={setSearchQuery} />{" "}
        {/* Use the SearchBar component */}
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
