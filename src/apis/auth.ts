"use server";

import { postAPI } from "./axios-instance";

// export const loginAccount = async (loginUrl: string, loginData: any) => {
//   const axiosClient = axiosInstance();
//   const response = await axiosClient.post(loginUrl, loginData);
//   return response?.data;
// };

export const loginAccount = (loginUrl: string, loginData: any) => {
  return postAPI({
    url: loginUrl,
    data: loginData,
  });
};
