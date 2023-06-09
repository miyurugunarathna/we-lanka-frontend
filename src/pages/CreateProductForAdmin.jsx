import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";

import productRequest from "../api/Product/product.request";
import categoryRequest from "../api/Category/category.request";

import { SUCCESS } from "../constants";
import { storage } from "../utils/firebase";

export const CreateProductForAdmin = () => {
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    categoryRequest.viewCategories().then((res) => {
      if (res?.data) setCategories(res.data);
    });
  }, [categoryRequest]);

  const navigateToBack = () => {
    navigate("/super-admin/products");
  };

  const imageHandle = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/a${file?.name}${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
      },
      (error) =>
        Swal.fire("Something went wrong!", "Please, try again later.", "error"),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      },
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      description: e.target.description.value,
      categoryId: e.target.categoryId.value,
      image: image,
      price: e.target.price.value,
    };

    const res = await productRequest.createProduct(data);
    if (res?.status === SUCCESS) {
      Swal.fire({
        title: "Success",
        text: "Product Created Successfully.",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) navigate("/super-admin/products");
      });
    } else {
      Swal.fire(
        "Product Creation failed!",
        "Something went wrong. Please try again.",
        "error",
      );
    }
  };

  const inputs = [
    {
      type: "text",
      id: "name",
      name: "name",
      required: true,
      placeholder: "Name",
    },
    {
      type: "file",
      id: "image",
      name: "image",
      required: false,
      placeholder: "image",
    },
    {
      type: "number",
      id: "price",
      name: "price",
      required: true,
      placeholder: "Price",
    },
    {
      type: "text",
      id: "description",
      name: "description",
      required: true,
      placeholder: "Description",
    },
    {
      type: "select",
      id: "categoryId",
      name: "categoryId",
      required: true,
      placeholder: "categoryId",
      options: categories.map((category) => ({
        label: category.name,
        value: category._id,
      })),
    },
  ];

  return (
    <div className="flex items-center min-h-screen p-10 bg-gray-50">
      <div className="flex-1 h-full mx-auto items-center justify-center bg-white rounded shadow-xl">
        <div className="flex flex-col w-83 items-center justify-center">
          <main className="flex items-center sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleCreate}>
              <h1 className="mb-4 text-3xl font-bold text-center tracking-tight text-gray-800">
                Add Product
              </h1>
              <hr className="opacity-10 mb-4" />
              {inputs.map((i, key) =>
                i.type !== "select" ? (
                  <input
                    key={key}
                    className="mt-2 w-full border border-gray-300 rounded py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    type={i.type}
                    id={i.id}
                    name={i.name}
                    required={i.required}
                    placeholder={i.placeholder}
                    onChange={imageHandle}
                  />
                ) : (
                  <select
                    key={key}
                    name={i.name}
                    id={i.id}
                    className="mt-2 w-full border border-gray-300 rounded py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500">
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
              <button
                className="mt-8 py-2 rounded text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-900 focus:ring-opacity-50 w-full"
                onClick={navigateToBack}>
                Go back
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
