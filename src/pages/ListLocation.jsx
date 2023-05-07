import React, { useEffect, useState } from "react";
import locationRequest from "../api/Location/location.request";
import categoryRequest from "../api/Category/category.request";
import { useNavigate, useParams } from "react-router-dom";

export const ListLocation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;

  const [locations, setLocations] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const returnBackToCategories = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (searchTerm !== "") {
      locationRequest
        .searchLocationsBasedOnACategoryId(categoryId, searchTerm)
        .then((res) => {
          setLocations(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categoryId, searchTerm]);

  useEffect(() => {
    categoryRequest
      .viewCategoryById(categoryId)
      .then((res) => {
        setCategoryName(res.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categoryId]);

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        Search the location you want the product from!
        <h3>Category: {categoryName}</h3>
        <div>
          <label>Search Location</label>
          <input
            type="text"
            style={{ color: "black" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {locations.map((location) => {
            return (
              <div key={location._id}>
                <button>{location.name}</button>
              </div>
            );
          })}
        </div>
        <button onClick={returnBackToCategories}>Go back</button>
      </div>
    </div>
  );
};
