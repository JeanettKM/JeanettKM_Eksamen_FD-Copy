import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((data) => setVenue(data.data)) // Accessing 'data' property from the response
      .catch((error) => console.error("Error fetching venue details:", error));
  }, [id]);

  if (!venue) return <div>Loading...</div>;

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      <img src={venue.media[0]?.url} alt={venue.media[0]?.alt} />{" "}
      <p>Price: {venue.price}</p>
      <p>Max Guests: {venue.maxGuests}</p>
      <p>Rating: {venue.rating}</p>
      <p>
        Location: {venue.location.city}, {venue.location.country}
      </p>{" "}
    </div>
  );
};

export default VenueDetail;
