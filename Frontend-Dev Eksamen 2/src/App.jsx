import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import UserPage from "./components/UserPage/UserPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import VenueOverview from "./components/VenueOverview/VenueOverview";
import CartPage from "./components/CartPage/CartPage";
import Footer from "./components/Footer/Footer";
import Orders from "./components/Orders/Orders";
import VenueDetail from "./components/VenueDetail/VenueDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/venues" element={<VenueOverview />}>
            {/* Nested route for venue detail */}
            <Route path=":id" element={<VenueDetail />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<VenueOverview />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
