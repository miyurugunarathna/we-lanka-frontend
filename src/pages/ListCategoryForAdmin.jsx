import React, { useEffect, useState } from "react";
import categoryRequest from "../api/Category/category.request";
import { useNavigate, useParams } from "react-router-dom";

export const ListCategoryForAdmin = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryRequest
      .viewCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="p-2 min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
      <h2 className="text-2xl font-bold text-center">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {categories.map((category) => {
          return (
            <div key={category._id} className="card p-4 m-3 bg-white shadow-md">
              <div className="mt-4">
                <h3 className="text-lg text-black font-medium">
                  {category.name}
                </h3>
                <div className="m-2">
                  <button className="m-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
