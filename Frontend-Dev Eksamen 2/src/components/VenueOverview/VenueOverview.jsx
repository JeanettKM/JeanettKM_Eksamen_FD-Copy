import React, { useState, useEffect } from "react";
import "./venueOverview.css";
import VenueCard from "./VenueCard";

const VenueOverview = () => {
  const [venues, setVenues] = useState([]);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = () => {
    fetch("https://v2.api.noroff.dev/holidaze/venues")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setVenues(data.data);
          setDisplayedVenues(data.data.slice(0, itemsPerPage));
        } else {
          console.error("Expected an array of venues, but received:", data);
        }
      })
      .catch((error) => console.error("Error fetching venues:", error));
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
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Check our Venues</h1>
        <p className="lead">
          Can you find the perfect venue for your next event?
        </p>
        <hr className="my-4" />
        <section>
          <div className="venue-container">
            {displayedVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
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
