import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import userRequest from "../api/User/user.request";
import useFetchUserProfile from "../hooks/useFetchUserProfile";

import { SUCCESS } from "../constants";

export const CreateInventoryForAdmin = () => {
  const [role, setRole] = useState(null);
  let navigate = useNavigate();
  const state = useSelector((state) => state.user);

  useFetchUserProfile();

  const handleRegister = async (e) => {
    e.preventDefault();
    let role;
    switch (e.target.role.value) {
      case "SUPER_ADMIN":
        role = "SUPER_ADMIN";
        break;
      case "ADMIN":
        role = "ADMIN";
        break;
      case "CONSUMER":
        role = "CONSUMER";
        break;
      default:
        role = null;
    }

    let data = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      role: role,
      password: e.target.password.value,
    };

    const res = await userRequest.addUser(data);
    if (res?.status === SUCCESS) {
      Swal.fire({
        title: "Registration success!",
        text: "Click okay to login.",
        confirmButtonText: "Okay",
        showDenyButton: true,
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) navigate("/");
      });
    } else {
      Swal.fire(
        "Registration failed!",
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
      id: "category",
      name: "category",
      required: true,
      placeholder: "Category",
      options: [
        { lable: "Food", value: "SUPER_ADMIN" },
        { lable: "Drink", value: "ADMIN" },
      ],
    },
    {
      type: "select",
      id: "email",
      name: "email",
      required: true,
      placeholder: "Location",
      options: [
        { lable: "Colombo", value: "SUPER_ADMIN" },
        { lable: "Ella", value: "ADMIN" },
      ],
    },
    {
      type: "select",
      id: "mobile",
      name: "mobile",
      required: true,
      placeholder: "Product",
      options: [
        { lable: "elephant", value: "SUPER_ADMIN" },
        { lable: "cat", value: "ADMIN" },
      ],
    },
    {
      type: "number",
      id: "role",
      name: "role",
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
