import React, { useEffect, useState } from "react";
import locationRequest from "../api/Location/location.request";
import categoryRequest from "../api/Category/category.request";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";

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
      <Navbar />
      <div className="p-5 min-h-screen flex flex-col justify-center items-center antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <h1 className="text-lg font-large font-bold mb-2">
          Search for a Location
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6 w-128">
          <h3 className="text-sm font-medium mb-4 text-gray-500">
            Category: {categoryName}
          </h3>
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium mb-2">
              Enter Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                className="block w-full py-2 pl-3 pr-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. Colombo"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2 text-gray-500">
                Results:
              </h3>
              <div className="space-y-2">
                {locations.map((location) => {
                  return (
                    <button
                      key={location._id}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      onClick={() => navigateToLocation(location._id)}>
                      {location.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            onClick={returnBackToCategories}
            className="mt-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
