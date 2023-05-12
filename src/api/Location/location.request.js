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

const locationRequest = {
  searchLocationsBasedOnACategoryId,
  getLocationList,
  createLocation,
};

export default locationRequest;
