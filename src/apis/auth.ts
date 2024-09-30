"use server";

import { postAPI } from "./axios-instance";

export const loginAccount = (loginUrl: string, loginData: any) => {
  return postAPI({
    url: loginUrl,
    data: loginData,
  });
};
