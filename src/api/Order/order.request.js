/* eslint-disable import/prefer-default-export */
import apiInstance from "../apiInstance";

export const getOrders = async () => {
  try {
    const response = await apiInstance.get(`/api/orders/me`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const placeOrder = async (data) => {
  try {
    const response = await apiInstance.post(`/api/orders/`, data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};
