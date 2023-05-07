import apiInstance from "../apiInstance";

const getInventoryById = async (inventoryId) => {
  try {
    const response = await apiInstance.get(`/api/inventories/${inventoryId}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const getInventoryList = async () => {
  try {
    const response = await apiInstance.get(`/api/inventories`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const inventoryRequest = {
  getInventoryById,
  getInventoryList,
};

export default inventoryRequest;
