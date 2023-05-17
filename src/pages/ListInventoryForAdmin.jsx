import React, { useEffect, useState } from "react";
import inventoryRequest from "../api/Inventory/inventory.request";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/common/Navbar";

export const ListInventoryForAdmin = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [inventories, setInventories] = useState([]);

  const navigateToEditInventory = (id) => {
    navigate(`/super-admin/inventorys/${id}`);
  };

  const navigateToAddInventory = () => {
    navigate(`/super-admin/inventories/add`);
  };

  const navigateToBack = () => {
    navigate(`/super-admin/home`);
  };

  const deleteInventory = (id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        inventoryRequest
          .deleteInventory(id)
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
    inventoryRequest
      .getInventoryList()
      .then((res) => {
        setInventories(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <button
          onClick={navigateToAddInventory}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-20 m-10">
          Add new
        </button>
        <h2 className="text-lg font-medium mb-2 p-3 text-center">
          Inventories
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-10 w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {inventories.map((inventory) => {
                return (
                  <tr
                    key={inventory._id}
                    className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {inventory.categoryId.name}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {inventory.locationId.name}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {inventory.productId.name}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {inventory.quantity}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          onClick={() => {
                            navigateToEditInventory(inventory._id);
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteInventory(inventory._id);
                          }}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={navigateToBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-20 m-10">
          Return back
        </button>
      </div>
    </div>
  );
};
