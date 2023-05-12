import React, { useEffect, useState } from "react";
import locationRequest from "../api/Location/location.request";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export const ListLocationForAdmin = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [locations, setLocations] = useState([]);

  const navigateToCreate = () => {
    navigate("/super-admin/locations/add");
  };

  const navigateToEdit = (id) => {
    navigate(`/super-admin/locations/${id}`);
  };

  const navigateToBack = () => {
    navigate(`/super-admin/home`);
  };

  const deleteLocation = (id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        locationRequest
          .deleteLocation(id)
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
    locationRequest
      .getLocationList()
      .then((res) => {
        setLocations(res.data);
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
      <h2 className="text-2xl font-bold text-center">Locations</h2>
      <button
        onClick={navigateToCreate}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-20 ml-5">
        Add new
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {locations.map((location) => {
          return (
            <div key={location._id} className="card p-4 m-3 bg-white shadow-md">
              <div className="mt-4">
                <h3 className="text-lg text-black font-medium">
                  {location.name}
                </h3>
                <div className="m-2">
                  <button
                    onClick={() => {
                      navigateToEdit(location._id);
                    }}
                    className="m-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500">
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500"
                    onClick={() => deleteLocation(location._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={navigateToBack}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-20 ml-5">
        Return back
      </button>
    </div>
  );
};
