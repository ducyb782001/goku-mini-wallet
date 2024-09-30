"use server";
import { collectionUrl, photoUrl } from "@/constants/const/api-url.const";
import { getAPI } from "./axios-instance";

export const getTodoDetail = () => {
  return getAPI({
    url: "https://dummyjson.com/todos/1",
  });
};

export const getListCollections = () => {
  return getAPI({
    url: collectionUrl,
  });
};

export const getPhotoDetail = (id: any) => {
  return getAPI({
    url: `${photoUrl}/${id}`,
  });
};
