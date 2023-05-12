import apiInstance from "../apiInstance";

const createProduct = async (data) => {
  try {
    const response = await apiInstance.post(`/api/products`, data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const viewProducts = async () => {
  try {
    const response = await apiInstance.get(`/api/products`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const viewProductById = async (id) => {
  try {
    const response = await apiInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const editProduct = async (id, data) => {
  try {
    const response = await apiInstance.put(`/api/products/${id}`, data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await apiInstance.delete(`/api/products/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const productRequest = {
  viewProducts,
  viewProductById,
  createProduct,
  editProduct,
  deleteProduct,
};

export default productRequest;
