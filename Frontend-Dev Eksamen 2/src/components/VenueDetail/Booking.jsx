import React, { useState } from "react";
import FetchAPI from "../API/FetchAPI";

const Booking = ({ venueId }) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleBooking = async (event) => {
    event.preventDefault();
    try {
      const data = await FetchAPI("holidaze/bookings", "POST", {
        dateFrom,
        dateTo,
        guests,
        venueId,
      });
      if (data) {
        setBookingSuccess(true);
      } else {
        console.error("Invalid booking data received:", data);
      }
    } catch (error) {
      console.error("Error making booking:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h3>Book a Venue</h3>
      {bookingSuccess ? (
        <p>Booking successful!</p>
      ) : (
        <form onSubmit={handleBooking}>
          <div>
            <label>
              From:
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              To:
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Guests:
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                required
              />
            </label>
          </div>
          <button type="submit">Book Now</button>
        </form>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Booking;
