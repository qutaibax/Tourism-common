import axiosInstance from "../../../api/axiosInstance";

export const createRestaurant = async (data) => {
  const response = await axiosInstance.post("/create", data);
  return response.data;
};
