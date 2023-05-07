import React, { useEffect, useState } from "react";
import productRequest from "../api/Product/product.request";
import { useNavigate } from "react-router-dom";

export const ListProduct = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

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
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <h2>Products</h2>

        <div>
          {products.map((product) => {
            return (
              <div key={product._id} className="m-3">
                <div>
                  <label>Name: </label> <span>{product.name}</span>
                </div>
                <div>
                  <label>Price: </label> <span>{product.price}</span>
                </div>
                <div>
                  <label>Description: </label> {product.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
