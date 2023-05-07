import apiInstance from "../apiInstance";

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

const locationRequest = {
  searchLocationsBasedOnACategoryId,
};

export default locationRequest;
