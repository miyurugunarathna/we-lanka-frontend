import React, { useEffect, useState } from "react";
import categoryRequest from "../api/Category/category.request";
import { useNavigate } from "react-router-dom";

export const ListCategory = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryRequest.viewCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-700 text-black dark:text-white">
      <div className="p-5">
        <h2 className="text-2xl font-medium mb-5">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            return (
              <div key={category._id} className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-medium mb-2">{category.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
