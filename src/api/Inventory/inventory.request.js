import apiInstance from "../apiInstance";

const createInventory = async (data) => {
  try {
    const response = await apiInstance.post(`/api/inventories`, data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

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
  createInventory,
};

export default inventoryRequest;
