import apiInstance from "../apiInstance";

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
};

export default productRequest;
