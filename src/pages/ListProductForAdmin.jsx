import React, { useEffect, useState } from "react";
import productRequest from "../api/Product/product.request";
import { useNavigate, useParams } from "react-router-dom";

export const ListProductForAdmin = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [products, setProducts] = useState([]);

  const navigateToCreate = () => {
    navigate("/super-admin/products/add");
  };

  const navigateToEdit = (id) => {
    navigate(`/super-admin/products/${id}`);
  };

  useEffect(() => {
    productRequest
      .viewProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="p-2 min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
      <h2 className="text-2xl font-bold text-center">Products</h2>
      <button
        onClick={navigateToCreate}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-20 m-10">
        Add new
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.map((product) => {
          return (
            <div key={product._id} className="card p-4 m-3 bg-white shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="mt-4">
                <p className="mt-2 font-bold text-gray-600">{product.name}</p>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <p className="mt-2 text-gray-600">Rs. {product.price}/=</p>
                <div className="m-2">
                  <button
                    onClick={() => {
                      navigateToEdit(product._id);
                    }}
                    className="m-2 flex item-center px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500">
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