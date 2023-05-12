import apiInstance from "../apiInstance";

const createLocation = async (data) => {
  try {
    const response = await apiInstance.post(`/api/locations`, data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const searchLocationsBasedOnACategoryId = async (categoryId, searchTerm) => {
  try {
    const response = await apiInstance.get(
      `/api/locations/category/${categoryId}?searchTerm=${searchTerm}`,
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const getLocationList = async () => {
  try {
    const response = await apiInstance.get(`/api/locations`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const editLocation = async (id, data) => {
  try {
    const response = await apiInstance.put(`/api/locations/${id}`, data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const getLocationById = async (id) => {
  try {
    const response = await apiInstance.get(`/api/locations/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const locationRequest = {
  searchLocationsBasedOnACategoryId,
  getLocationList,
  createLocation,
  editLocation,
  getLocationById,
};

export default locationRequest;
