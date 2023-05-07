import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import categoryRequest from "../api/Category/category.request";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryRequest.viewCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const navigateToLocation = (categoryId) => {
    navigate(`/locations/category/${categoryId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 min-h-screen flex flex-col justify-center items-center antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        <div className="grid grid-cols-2 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-2 ">
          {categories.map((category) => {
            return (
              <div
                key={category._id}
                className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer flex justify-center items-center"
                onClick={() => {
                  navigateToLocation(category._id);
                }}>
                <h3 className="text-lg font-medium mb-2">{category.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
