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

  const navigateToLocation = (categoryId) => {
    navigate(`/locations/category/${categoryId}`);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <div>Categories</div>

        <div>
          {categories.map((category) => {
            return (
              <div key={category._id} className="m-3">
                <div>
                  <span>{category.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
