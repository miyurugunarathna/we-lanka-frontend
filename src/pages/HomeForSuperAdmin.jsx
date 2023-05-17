import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";

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
    <>
      <Navbar />
      <div className="p-7 min-h-screen flex flex-col justify-center items-center antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <h2 className="text-2xl font-bold mb-8">Welcome, Super Admin!</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow">
            <h3 className="text-xl mb-2">Products</h3>
            <p>Manage your products here.</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded"
              onClick={navigateToProducts}>
              Go to Products
            </button>
          </div>

          <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow">
            <h3 className="text-xl mb-2">Categories</h3>
            <p>Manage your categories here.</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded"
              onClick={navigateToCategories}>
              Go to Categories
            </button>
          </div>

          <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow">
            <h3 className="text-xl mb-2">Locations</h3>
            <p>Manage your locations here.</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded"
              onClick={navigateToLocations}>
              Go to Locations
            </button>
          </div>

          <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow">
            <h3 className="text-xl mb-2">Inventories</h3>
            <p>Manage your inventories here.</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded"
              onClick={navigateToInventories}>
              Go to Inventories
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
