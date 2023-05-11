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

const productRequest = {
  viewProducts,
  viewProductById,
  createProduct,
};

export default productRequest;
