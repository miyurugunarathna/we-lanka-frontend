import apiInstance from "../apiInstance";

const viewCategories = async () => {
  try {
    const response = await apiInstance.get(`/api/categories`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const viewCategoryById = async (id) => {
  try {
    const response = await apiInstance.get(`/api/categories/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const createCategory = async (data) => {
  try {
    const response = await apiInstance.post(`/api/categories`, data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const categoryRequest = {
  viewCategories,
  viewCategoryById,
  createCategory,
};

export default categoryRequest;
