import axiosInstance from "../../../api/axiosInstance";
import axios from "axios";

export const createRestaurant = async (data) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.post("restaurants/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
