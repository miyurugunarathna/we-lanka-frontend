import React, { useEffect, useState } from "react";
import productRequest from "../api/Product/product.request";
import Swal from "sweetalert2";
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

  const navigateToBack = () => {
    navigate(`/super-admin/home`);
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        productRequest
          .deleteProduct(id)
          .then(() => {
            fetchData();
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong",
              confirmButtonText: "Ok",
            });
          });
      }
    });
  };

  const fetchData = () => {
    productRequest
      .viewProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
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
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <div
                key={product._id}
                className="card p-4 m-3 bg-white shadow-md">
                <img src={product.image} className="h-48 w-full object-cover" />
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
                    <button
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500"
                      onClick={() => deleteProduct(product._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>There is no result to show!</div>
        )}
      </div>
      <button
        onClick={navigateToBack}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-20 m-10">
        Return back
      </button>
    </div>
  );
};
