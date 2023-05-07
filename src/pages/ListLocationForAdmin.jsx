import React, { useEffect, useState } from "react";
import locationRequest from "../api/Location/location.request";
import { useNavigate, useParams } from "react-router-dom";

export const ListLocationForAdmin = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    locationRequest
      .getLocationList()
      .then((res) => {
        setLocations(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        Locations
        <div>
          {locations.map((location) => {
            return (
              <div key={location._id} className="m-3">
                <button>{location.name}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
