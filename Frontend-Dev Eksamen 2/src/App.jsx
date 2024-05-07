import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Routing from "./components/Routing/Routing";
import Footer from "./components/Footer/Footer";
import BreadcrumbExample from "../src/components/Breadcrumbs/Breadcrumbs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/lux/bootstrap.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <BreadcrumbExample />
        <Routing />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
