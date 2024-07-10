import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Calendar from "react-calendar";
import FetchAPI from "../API/FetchAPI";
import "react-calendar/dist/Calendar.css";

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [guests, setGuests] = useState(1);
  const [bookedDates, setBookedDates] = useState([]);
  const textRef = useRef(null);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const data = await FetchAPI(`holidaze/venues/${id}`, "GET", {
          _owner: true,
          _bookings: true,
        });
        if (data && data.data) {
          console.log("Venue data:", data.data);
          setVenue(data.data);

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
          console.error("Invalid data received:", data);
        }
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setError(error.message);
      }
    };

    fetchVenueData();
  }, [id]);

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
        setBookingError(null);
        setBookingSuccess("Venue booked successfully!");

        const newBookedDates = [];
        let currentDate = new Date(formattedStartDate);
        while (currentDate <= new Date(formattedEndDate)) {
          newBookedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setBookedDates([...bookedDates, ...newBookedDates]);
      } else {
        console.error("Booking failed:", response);
        setBookingError("Failed to book the venue.");
        setBookingSuccess(null);
      }
    } catch (error) {
      if (error.message.includes("409")) {
        setBookingError(
          "The selected dates are already booked. Please choose different dates."
        );
      } else {
        console.error("Error making booking:", error);
        setBookingError(
          "An error occurred while trying to book. Please try again."
        );
      }
      setBookingSuccess(null);
    }
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const isDisabled = bookedDates.some(
        (bookedDate) => bookedDate.toDateString() === date.toDateString()
      );
      console.log("Date:", date, "is disabled:", isDisabled);
      return isDisabled;
    }
    return false;
  };

  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Loading...</div>;

  return (
    <div id="venue-div">
      <Card.Body>
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
        <div className="card-text" ref={textRef}>
          <p>{venue.description}</p>
        </div>
        <div className="detailsText">
          <p>Price: {venue.price}</p>
          <p>Max Guests: {venue.maxGuests}</p>
          <p>Rating: {venue.rating}</p>
          <p>
            Location: {venue.location?.city || "N/A"},{" "}
            {venue.location?.country || "N/A"}
          </p>
          <hr className="my-4" />
          <div id="VenueFeatures" className="row">
            <div className="col-md-6">
              <p>Wifi: {venue.meta?.wifi ? "Yes" : "No"}</p>
              <p>Breakfast: {venue.meta?.breakfast ? "Yes" : "No"}</p>
            </div>
            <div className="col-md-6">
              <p>Pets: {venue.meta?.pets ? "Yes" : "No"}</p>
              <p>Parking: {venue.meta?.parking ? "Yes" : "No"}</p>
            </div>
            <div id="VenueCounter">
              <p>Previous bookings: {venue._count?.bookings || 0}</p>
            </div>
          </div>
          <hr className="my-4" />
        </div>
        <div className="bookingCalendar">
          <h5>Select your dates:</h5>
          <Calendar
            selectRange
            onChange={setDates}
            value={dates}
            tileDisabled={tileDisabled}
          />
        </div>
        <div className="NumberOfGuests">
          <br />
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
        {bookingError && <p className="text-danger">{bookingError}</p>}
        {bookingSuccess && <p className="text-success">{bookingSuccess}</p>}
        <Button variant="primary" onClick={handleBooking}>
          Book Now
        </Button>
      </Card.Body>
    </div>
  );
};

function HeaderAndFooterExample() {
  return (
    <Card className="text-center">
      <Card.Header></Card.Header>
      <VenueDetail />
      <Card.Footer className="text-muted">
        Hurry and book your favorite venue!
      </Card.Footer>
    </Card>
  );
}

export default HeaderAndFooterExample;
