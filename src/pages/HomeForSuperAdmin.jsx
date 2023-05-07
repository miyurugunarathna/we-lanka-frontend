import React from "react";
import { useNavigate } from "react-router-dom";

export const HomeForSuperAdmin = () => {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate("/super-admin/products");
  };
  const navigateToCategories = () => {
    navigate("/super-admin/categories");
  };
  const navigateToLocations = () => {
    navigate("/super-admin/locations");
  };
  const navigateToInventories = () => {
    navigate("/super-admin/inventories");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-8">Welcome Super Admin!</h2>
      <ul className="flex flex-col space-y-2">
        <li>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={navigateToProducts}>
            Products
          </button>
        </li>
        <li>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={navigateToCategories}>
            Categories
          </button>
        </li>
        <li>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={navigateToLocations}>
            Locations
          </button>
        </li>
        <li>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={navigateToInventories}>
            Inventories
          </button>
        </li>
      </ul>
    </div>
  );
};
