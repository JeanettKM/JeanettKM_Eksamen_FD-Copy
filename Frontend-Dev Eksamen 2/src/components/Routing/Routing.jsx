import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import UserPage from "../UserPage/UserPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import VenueOverview from "../VenueOverview/VenueOverview";
import CartPage from "../CartPage/CartPage";
import Orders from "../Orders/Orders";
import VenueDetail from "../VenueDetail/VenueDetail";
import ContactUs from "../ContactUsPage/ContactUs";
import MyVenues from "../UserPage/MyVenues";
import Footer from "../Footer/Footer";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/venues" element={<VenueOverview />} />
      {/* Nested route for VenueDetail */}
      <Route path="/venues/:id" element={<VenueDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/my-venues" element={<MyVenues />} /> {/* Add this line */}
    </Routes>
  );
}

export default Routing;
