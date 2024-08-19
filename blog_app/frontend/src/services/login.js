import axios from "axios";
const baseUrl = "/api/login";

//credentials will have username and password of user
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default {
  login,
};
