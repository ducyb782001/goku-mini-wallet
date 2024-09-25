"use server";

import { postAPI } from "./axios-instance";

// export const loginAccount = async (loginUrl: string, loginData: any) => {
//   const axiosClient = axiosInstance();
//   const response = await axiosClient.post(loginUrl, loginData);
//   return response?.data;
// };

export const loginAccount = async (loginUrl: string, loginData: any) => {
  const response = await postAPI({
    url: loginUrl,
    data: loginData,
  });

  return response;
};
