import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Calendar from "react-calendar";
import FetchAPI from "../API/FetchAPI";
import "react-calendar/dist/Calendar.css";

// Create the VenueDetail component
const VenueDetail = () => {
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null); // Error state for booking
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [guests, setGuests] = useState(1);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    // Fetching venue data from the API
    const fetchVenueData = async () => {
      try {
        const data = await FetchAPI(`holidaze/venues/${id}`, "GET", {
          _owner: true,
          _bookings: true,
        });
        // Checking if valid data is received
        if (data && data.data) {
          console.log("Venue data:", data.data);
          setVenue(data.data);

          // Extracting booked dates
          const bookings = data.data.bookings || [];
          const dates = bookings.flatMap((booking) => {
            const startDate = new Date(booking.dateFrom);
            const endDate = new Date(booking.dateTo);
            const dateArray = [];
            let currentDate = startDate;
            while (currentDate <= endDate) {
              dateArray.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            return dateArray;
          });
          setBookedDates(dates);
        } else {
          // Logging an error message if error occurs
          console.error("Invalid data received:", data);
        }
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setError(error.message);
      }
    };

    fetchVenueData();
  }, [id]);

  // Function to handle booking
  const handleBooking = async () => {
    try {
      const [startDate, endDate] = dates;
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const bookingData = {
        dateFrom: formattedStartDate,
        dateTo: formattedEndDate,
        guests,
        venueId: id,
      };

      console.log("Booking data being sent:", bookingData);

      const response = await FetchAPI("holidaze/bookings", "POST", bookingData);

      if (response) {
        console.log("Booking successful!", response);
        setBookingError(null); // Reset booking error on success
        // Update booked dates state
        const newBookedDates = [];
        let currentDate = new Date(formattedStartDate);
        while (currentDate <= new Date(formattedEndDate)) {
          newBookedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setBookedDates([...bookedDates, ...newBookedDates]);
      } else {
        console.error("Booking failed:", response);
      }
    } catch (error) {
      if (error.message.includes("409")) {
        setBookingError(
          "The selected dates are already booked. Please choose different dates."
        );
      } else {
        console.error("Error making booking:", error);
        setBookingError(
          "An error occurred while making the booking. Please try again."
        );
      }
    }
  };

  // Function to disable booked dates
  const tileDisabled = ({ date }) => {
    return bookedDates.some(
      (bookedDate) => bookedDate.toDateString() === date.toDateString()
    );
  };

  // Display a loading message to indicate data is being fetched
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Loading...</div>;

  // Displaying the venue details once data is fetched
  return (
    <div id="venue-div">
      <Card.Body>
        {/* Displaying venue name */}
        <Card.Title>{venue.name}</Card.Title>
        <div id="venue-div">
          {venue.media && venue.media.length > 0 ? (
            <img
              id="venue-image"
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        {/* Displaying venue description */}
        <Card.Text>{venue.description}</Card.Text>
        {/* Displaying venue image */}
        <div className="detailsText">
          {/* Displaying venue details */}
          <p>Price: {venue.price}</p>
          <p>Max Guests: {venue.maxGuests}</p>
          <p>Rating: {venue.rating}</p>
          <p>
            Location: {venue.location?.city || "N/A"},{" "}
            {venue.location?.country || "N/A"}
          </p>
          <hr className="my-4" />
          {/* Displaying venue features */}
          <div id="VenueFeatures" className="row">
            <div className="col-md-6">
              <p>Wifi: {venue.meta?.wifi ? "Yes" : "No"}</p>
              <p>Breakfast: {venue.meta?.breakfast ? "Yes" : "No"}</p>
            </div>
            <div className="col-md-6">
              <p>Pets: {venue.meta?.pets ? "Yes" : "No"}</p>
              <p>Parking: {venue.meta?.parking ? "Yes" : "No"}</p>
            </div>
          </div>
          <hr className="my-4" />
          {/* Displaying booking count */}
          <div id="VenueCounter">
            <p>Number of Bookings: {venue._count?.bookings || 0}</p>
          </div>
        </div>
        {/* Calendar for selecting dates */}
        <div>
          <h5>Select your dates:</h5>
          <Calendar
            selectRange
            onChange={setDates}
            value={dates}
            tileDisabled={tileDisabled}
          />
        </div>
        {/* Input for number of guests */}
        <div>
          <label htmlFor="guests">Number of Guests:</label>
          <input
            type="number"
            id="guests"
            min="1"
            max={venue.maxGuests}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          />
        </div>
        {/* Display booking error if any */}
        {bookingError && <p className="text-danger">{bookingError}</p>}
        {/* Button to book the venue */}
        <Button variant="primary" onClick={handleBooking}>
          Book Now
        </Button>
      </Card.Body>
    </div>
  );
};

// Card component from react-bootstrap for displaying venue details
function HeaderAndFooterExample() {
  return (
    <Card className="text-center">
      <Card.Header></Card.Header>
      {/* Rendering VenueDetail component */}
      <VenueDetail />
      <Card.Footer className="text-muted">Limited availability</Card.Footer>
    </Card>
  );
}

export default HeaderAndFooterExample;
