import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  headers: {
    "x-api-key": process.env.NEXT_PRIVATE_API_KEY || "",
  },
});

const setAuthorizationHeader = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};

export const getAPI = async ({ ...options }) => {
  setAuthorizationHeader();
  const onSuccess = (response: any) => {
    return response?.data;
  };
  const onError = async (error: any) => {
    if (error?.response?.status === 404) {
      window.location.href = "/404";
    }
    return error;
  };
  return axiosInstance.get(options.url).then(onSuccess).catch(onError);
};

export const postAPI = async ({ ...options }) => {
  setAuthorizationHeader();
  const onSuccess = (response: any) => response?.data;
  const onErrorPost = async (error: any) => {
    return error;
  };

  return axiosInstance
    .post(options.url, options?.data)
    .then(onSuccess)
    .catch(onErrorPost);
};

export const putAPI = async ({ ...options }) => {
  setAuthorizationHeader();
  const onSuccess = (response: any) => response?.data;
  const onErrorPost = async (error: any) => {
    return error;
  };

  return axiosInstance
    .put(options.url, options?.data)
    .then(onSuccess)
    .catch(onErrorPost);
};

export const deleteAPI = async ({ ...options }) => {
  setAuthorizationHeader();
  const onSuccess = (response: any) => response?.data;
  const onErrorPost = async (error: any) => {
    return error;
  };

  return axiosInstance
    .delete(options.url, options?.data)
    .then(onSuccess)
    .catch(onErrorPost);
};
