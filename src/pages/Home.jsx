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
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        Welcome to We Lanka!
        {categories.map((category) => {
          return (
            <div key={category._id}>
              <button
                onClick={() => {
                  navigateToLocation(category._id);
                }}>
                {category.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
