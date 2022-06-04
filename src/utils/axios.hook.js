import axios from "axios";

const useAxios = () => {
  const token = localStorage.getItem("authToken");

  const create = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    apiClient: create,
  };
};

export default useAxios;
