import { useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import productRequest from "../api/Product/product.request";
import categoryRequest from "../api/Category/category.request";

import { SUCCESS } from "../constants";
import { storage } from "../utils/firebase";

export const EditProductForAdmin = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    categoryId: "",
    image: "",
  });
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    productRequest.viewProductById(params.id).then((res) => {
      if (res?.data) setProduct(res.data);
    });
  }, [productRequest]);

  useEffect(() => {
    categoryRequest.viewCategories().then((res) => {
      if (res?.data) setCategories(res.data);
    });
  }, [categoryRequest]);

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
          setProduct((image) => ({ ...image, ["image"]: downloadURL }));
        });
      },
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await productRequest.editProduct(params.id, product);
    if (res?.status === SUCCESS) {
      Swal.fire({
        title: "Success",
        text: "Product Updated Successfully!.",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) navigate("/super-admin/products");
      });
    } else {
      Swal.fire(
        "Product Updation failed!",
        "Something went wrong. Please try again.",
        "error",
      );
    }
  };

  const navigateToBack = () => {
    navigate("/super-admin/products");
  };

  const handleChange = (event) => {
    event.preventDefault();
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });

    const file = event.target.files?.[0];
    uploadFile(file);
  };

  const inputs = [
    {
      type: "text",
      id: "name",
      name: "name",
      value: product.name,
      required: true,
      placeholder: "Name",
    },
    {
      type: "number",
      id: "price",
      name: "price",
      value: product.price,
      required: true,
      placeholder: "Price",
    },
    {
      type: "text",
      id: "description",
      name: "description",
      value: product.description,
      required: true,
      placeholder: "Description",
    },
    {
      type: "select",
      id: "categoryId",
      name: "categoryId",
      value: product.categoryId,
      required: true,
      placeholder: "Category",
      options: categories.map((category) => ({
        label: category.name,
        value: category._id,
      })),
    },
    {
      type: "file",
      id: "image",
      name: "image",
      required: false,
      placeholder: "Image",
    },
  ];

  return (
    <div className="flex items-center min-h-screen p-10 bg-gray-50">
      <div className="flex-1 overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center justify-center overflow-y-auto md:flex-row">
          <main className="flex items-center sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleUpdate}>
              <h1 className="mb-4 text-3xl font-bold text-center tracking-tight text-gray-800">
                Edit Product
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
                    value={i.value}
                    required={i.required}
                    placeholder={i.placeholder}
                    onChange={handleChange}
                  />
                ) : (
                  <select
                    key={key}
                    name={i.name}
                    onChange={handleChange}
                    value={i.value}
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
                Update
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
