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

const categoryRequest = {
  viewCategories,
  viewCategoryById,
};

export default categoryRequest;
