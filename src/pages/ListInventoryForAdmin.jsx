import React, { useEffect, useState } from "react";
import inventoryRequest from "../api/Inventory/inventory.request";
import { useNavigate, useParams } from "react-router-dom";

export const ListInventoryForAdmin = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [inventories, setInventories] = useState([]);

  const navigateToEditInventory = (id) => {
    navigate(`/inventory/${id}`);
  };

  useEffect(() => {
    inventoryRequest
      .getInventoryList()
      .then((res) => {
        setInventories(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        Inventories
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Location</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventories.map((inventory) => {
                return (
                  <tr key={inventory._id}>
                    <td className="p-3">{inventory.categoryId.name}</td>
                    <td className="p-3">{inventory.locationId.name}</td>
                    <td className="p-3">{inventory.productId.name}</td>
                    <td className="p-3">{inventory.quantity}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigateToEditInventory(inventory._id);
                        }}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => {}}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
