import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

function BreadcrumbExample() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumb className="breadcrumbs">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/login" }}>
        Home
      </Breadcrumb.Item>

      {paths.map((path, index) => (
        <Breadcrumb.Item
          key={index}
          as={Link}
          to={`/${paths.slice(0, index + 1).join("/")}`}
          active={index === paths.length - 1}
        >
          {path}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
