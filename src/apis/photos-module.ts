"use server";
import { collectionUrl, photoUrl } from "@/constants/const/api-url.const";
import { getAPI } from "./axios-instance";

// export const getListCollections = async () => {
//   const axiosClient = axiosInstance();
//   const response = await axiosClient.get(collectionUrl);
//   return response?.data;
// };

export const getListCollections = async () => {
  return getAPI({
    url: collectionUrl,
  });
};

export const getPhotoDetail = async (id: any) => {
  return getAPI({
    url: `${photoUrl}/${id}`,
  });
};
