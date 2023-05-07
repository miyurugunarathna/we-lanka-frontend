import apiInstance from "../apiInstance";

export const getCart = async () => {
  try {
    const response = await apiInstance.get(`/api/carts/me`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const modifyCart = async (data) => {
  try {
    const response = await apiInstance.post(`/api/carts/`, data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};
