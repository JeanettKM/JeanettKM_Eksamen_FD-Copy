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
import Footer from "../Footer/Footer";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/suser" element={<UserPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/venues" element={<VenueOverview />} />
      {/* Define the nested route for VenueDetail */}
      <Route path="/venues/:id" element={<VenueDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
}

export default Routing;
