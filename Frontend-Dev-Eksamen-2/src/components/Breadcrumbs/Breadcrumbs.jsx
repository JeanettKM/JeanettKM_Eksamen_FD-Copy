import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import FetchAPI from "../API/FetchAPI";

function BreadcrumbExample() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");
  const [venueName, setVenueName] = useState(null);

  useEffect(() => {
    const fetchVenueName = async () => {
      if (paths[0] === "holidaze" && paths[1] === "venues" && paths[2]) {
        try {
          const venueId = paths[2];
          const data = await FetchAPI(`holidaze/venues/${venueId}`, "GET", {});
          if (data && data.data) {
            setVenueName(data.data.name);
          } else {
            console.error("Invalid data received:", data);
          }
        } catch (error) {
          console.error("Error fetching venue data:", error);
        }
      }
    };

    fetchVenueName();
  }, [paths]);

  return (
    <Breadcrumb className="breadcrumbs">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>
      {paths.map((path, index) => {
        const isVenueDetail =
          paths[0] === "holidaze" && paths[1] === "venues" && index === 2;
        const displayText = isVenueDetail && venueName ? venueName : path;

        return (
          <Breadcrumb.Item
            key={index}
            linkAs={Link}
            linkProps={{ to: `/${paths.slice(0, index + 1).join("/")}` }}
            active={index === paths.length - 1}
          >
            {displayText}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
