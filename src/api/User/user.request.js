import apiInstance from "../apiInstance";

const addUser = async (user) => {
  try {
    const response = await apiInstance.post(`/api/user/`, user);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const login = async (loginCredentials) => {
  try {
    const response = await apiInstance.post(
      `/api/user/login/`,
      loginCredentials,
    );
    if (response.data.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
    }
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const authHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return { Authorization: token };
  }
  return {};
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const viewProfile = async () => {
  try {
    const response = await apiInstance.get(`/api/user/me`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const userRequest = {
  addUser,
  login,
  logout,
  viewProfile,
  authHeader,
};

export default userRequest;
