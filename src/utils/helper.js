/* eslint-disable import/prefer-default-export */
import Swal from "sweetalert2";

import userRequest from "../api/User/user.request";
import { SUCCESS } from "../constants";

export const getUserDetails = async () => {
  const me = await userRequest.viewProfile();
  if (me?.status === SUCCESS && me?.data) {
    return Promise.resolve(me.data);
  }
  localStorage.removeItem("token");
  Swal.fire({
    title: "Oops. Something went wrong!",
    confirmButtonText: "Okay",
  }).then(() => {
    return Promise.resolve(null);
  });
  return null;
};
