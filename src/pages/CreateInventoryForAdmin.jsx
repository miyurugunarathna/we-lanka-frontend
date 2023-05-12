import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import userRequest from "../api/User/user.request";
import categoryRequest from "../api/Category/category.request";
import productRequest from "../api/Product/product.request";
import locationRequest from "../api/Location/location.request";
import inventoryRequest from "../api/Inventory/inventory.request";

import useFetchUserProfile from "../hooks/useFetchUserProfile";

import { SUCCESS } from "../constants";

export const CreateInventoryForAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [locations, setLocation] = useState([]);
  const [role, setRole] = useState(null);
  let navigate = useNavigate();
  const state = useSelector((state) => state.user);

  useFetchUserProfile();

  useEffect(() => {
    categoryRequest.viewCategories().then((res) => {
      if (res?.data) setCategories(res.data);
    });
  }, [categoryRequest]);

  useEffect(() => {
    productRequest.viewProducts().then((res) => {
      if (res?.data) setProducts(res.data);
    });
  }, [productRequest]);

  useEffect(() => {
    locationRequest.getLocationList().then((res) => {
      if (res?.data) setLocation(res.data);
    });
  }, [locationRequest]);

  const handleRegister = async (e) => {
    e.preventDefault();

    let data = {
      categoryId: e.target.categoryId.value,
      locationId: e.target.locationId.value,
      productId: e.target.productId.value,
      quantity: e.target.quantity.value,
    };

    const res = await inventoryRequest.createInventory(data);
    if (res?.status === SUCCESS) {
      Swal.fire({
        title: "Success",
        text: "Inventory Created Successfully",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) navigate("/super-admin/inventories");
      });
    } else {
      Swal.fire(
        "Inventory Creation failed!",
        "Something went wrong. Please try again.",
        "error",
      );
    }
  };

  const handleRole = (e) => {
    setRole(e?.target?.value);
  };

  const inputs = [
    {
      type: "select",
      id: "categoryId",
      name: "categoryId",
      required: true,
      placeholder: "Category",
      options: categories.map((category) => ({
        label: category.name,
        value: category._id,
      })),
    },
    {
      type: "select",
      id: "locationId",
      name: "locationId",
      required: true,
      placeholder: "Location",
      options: locations.map((location) => ({
        label: location.name,
        value: location._id,
      })),
    },
    {
      type: "select",
      id: "productId",
      name: "productId",
      required: true,
      placeholder: "Product",
      options: products.map((product) => ({
        label: product.name,
        value: product._id,
      })),
    },
    {
      type: "number",
      id: "quantity",
      name: "quantity",
      required: true,
      placeholder: "Quantity",
    },
  ];

  return (
    <div className="flex items-center min-h-screen p-10 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleRegister}>
              <h1 className="mb-4 text-xl text-center tracking-tight font-semibold text-black">
                <span className="font-normal">Add Inventory</span>
              </h1>
              <hr className="opacity-10 mb-4" />
              {inputs.map((i, key) =>
                i.type !== "select" ? (
                  <input
                    key={key}
                    className="mt-2 w-full border rounded py-1 px-3"
                    type={i.type}
                    id={i.id}
                    name={i.name}
                    required={i.required}
                    placeholder={i.placeholder}
                  />
                ) : (
                  <select
                    key={key}
                    name={i.name}
                    id={i.id}
                    className="mt-2 w-full border rounded py-1 px-2"
                    onChange={handleRole}>
                    {i.options.map((option, key) => (
                      <option key={key} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ),
              )}

              <button className="mt-8 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 w-full">
                Add
              </button>
              <button className="mt-8 py-2 rounded text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-900 focus:ring-opacity-50 w-full">
                Go back
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
