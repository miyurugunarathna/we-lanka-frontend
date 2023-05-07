import React from "react";
import { useNavigate } from "react-router-dom";

export const HomeForSuperAdmin = () => {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate("/products");
  };
  const navigateToCategories = () => {
    navigate("/categories");
  };
  const navigateToLocations = () => {
    navigate("/locations");
  };
  const navigateToInventories = () => {
    navigate("/inventories");
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        Welcome,
        <div>
          <ul>
            <li onClick={navigateToProducts}>Products</li>
            <li onClick={navigateToCategories}>Categories</li>
            <li onClick={navigateToLocations}>Locations</li>
            <li onClick={navigateToInventories}>Inventories</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
