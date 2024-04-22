import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((data) => setVenue(data))
      .catch((error) => console.error("Error fetching venue details:", error));
  }, [id]);

  if (!venue) return <div>Loading...</div>;

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      {/* Display other venue details here */}
    </div>
  );
};

export default VenueDetail;
