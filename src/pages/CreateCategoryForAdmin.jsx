import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import categoryRequest from "../api/Category/category.request";

import { SUCCESS } from "../constants";

export const CreateCategoryForAdmin = () => {
  let navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    let data = {
      name: e.target.name.value,
    };

    const res = await categoryRequest.createCategory(data);
    if (res?.status === SUCCESS) {
      Swal.fire({
        title: "Created successfully!",
        text: "Category Created.",
        confirmButtonText: "Okay",
        showDenyButton: true,
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) navigate("/super-admin/categories");
      });
    } else {
      Swal.fire(
        "Category Creation failed!",
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
      type: "text",
      id: "name",
      name: "name",
      required: true,
      placeholder: "Name",
    },
  ];

  return (
    <div className="flex items-center min-h-screen p-10 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleCreate}>
              <h1 className="mb-4 text-3xl font-bold text-center tracking-tight text-gray-800">
                Add Category
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
                  />
                ) : (
                  <select
                    key={key}
                    name={i.name}
                    id={i.id}
                    className="mt-2 w-full border border-gray-300 rounded py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={handleRole}>
                    {i.options.map((option, key) => (
                      <option key={key} value={option.value}>
                        {option.lable}
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
