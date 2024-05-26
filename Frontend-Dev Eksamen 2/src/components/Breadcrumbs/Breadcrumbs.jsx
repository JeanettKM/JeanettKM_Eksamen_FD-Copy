import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

//BreadcrumbExample component generates a map or visual about where you're currently at.
function BreadcrumbExample() {
  const location = useLocation(); // Get the current location from React Router
  const paths = location.pathname.split("/").filter((path) => path !== ""); // Split the pathname into segments

  return (
    <Breadcrumb className="breadcrumbs">
      {/* Show the Home link */}
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>

      {/* Dynamically create the breadcrumbs */}
      {paths.map((path, index) => (
        <Breadcrumb.Item
          key={index}
          linkAs={Link}
          linkProps={{ to: `/${paths.slice(0, index + 1).join("/")}` }}
          active={index === paths.length - 1} // Make the last item active
        >
          {path}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
