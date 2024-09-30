"use client";

import { getListCollections, getTodoDetail } from "@/apis/photos-module";
import { useMutation, useQueries } from "@tanstack/react-query";
import Link from "next/link";
import cookie from "cookie";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { loginUrl } from "@/constants/const/api-url.const";
import { toast } from "react-toastify";
import { loginAccount } from "@/apis/auth";
import { useRouter } from "next-nprogress-bar";
import AnimatedCounter from "./HomePage/AnimatedCounter";
import BigNumber from "bignumber.js";

const NUMBER_RATE = 1;
const MAX_EARN = 5;
const LAST_CLAIM_DATE = "Mon Sep 30 2024 6:36:00 GMT+0700 (Indochina Time)";

function ListPhotos() {
  const { isLogin, checkLogin } = useAuthContext();
  const [listPhotos, setListPhotos] = useState<any>();
  const [tokenValue, setTokenValue] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userStatistic, setUserStatistic] = useState<any>();
  const router = useRouter();

  useQueries({
    queries: [
      {
        queryKey: ["getListPhoto", isLogin],
        queryFn: async () => {
          const response = await getListCollections();
          console.log("🚀 ~ response:", response);
          setListPhotos(response);
          return response;
        },
        enabled: !!isLogin,
      },
      {
        queryKey: ["getTodoDetail"],
        queryFn: async () => {
          const response = await getTodoDetail();
          if (response) {
            setUserStatistic({
              lastDate: LAST_CLAIM_DATE,
              maxEarn: MAX_EARN,
              numberRate: NUMBER_RATE,
            });
          }
          return response;
        },
      },
    ],
  });

  const handleSetToken = () => {
    window.document.cookie = cookie.serialize("token", tokenValue);
    checkLogin();
  };

  const loginMutation = useMutation(
    async (loginData) => {
      return await loginAccount(loginUrl, loginData);
    },
    {
      onSuccess: (data) => {
        if (typeof window !== "undefined") {
          console.log("🚀 ~ ListPhotos ~ data:", data);
          const token = data?.token;
          const maxAge = data?.expiresIn;
          window.document.cookie = cookie.serialize("token", token, {
            // maxAge: 30 * 24 * 60 * 60,
            maxAge: maxAge,
            path: "/",
          });
        }
        toast.success("Login successful!");
        checkLogin();
      },
      onError: (err: any) => {
        console.log("login error", err?.message);
        toast.error(err?.response?.data?.message || err?.message);
      },
    }
  );

  const handleLogin = () => {
    // @ts-ignore
    loginMutation.mutate({
      username: userEmail,
      password: userPassword,
    });
  };

  const [currentPoint, setCurrentPoint] = useState<any>();

  useEffect(() => {
    if (userStatistic?.lastDate) {
      const secondDifferent = Number(
        (new Date().getTime() - new Date(userStatistic?.lastDate).getTime()) /
          1000
      ).toFixed();
      const currentNumber = new BigNumber(userStatistic?.numberRate)
        .dividedBy(3600)
        .multipliedBy(secondDifferent)
        .toFormat(4);
      setCurrentPoint(currentNumber);
    }
  }, [userStatistic]);

  return (
    <div>
      <h1>Animated Number</h1>
      {currentPoint ? (
        <AnimatedCounter
          from={Number(currentPoint)}
          to={userStatistic?.maxEarn}
        />
      ) : (
        <div>Loading...</div>
      )}

      <div>Fake Login</div>
      <div className="flex items-center gap-5">
        <input
          onChange={(e) => {
            setTokenValue(e.target.value);
          }}
          value={tokenValue}
          className="border"
        />
        <button onClick={handleSetToken} className="bg-blue">
          Set
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-10 w-1/2">
        <input
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          value={userEmail || ""}
          placeholder="Email"
          className="border"
        />
        <input
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          value={userPassword || ""}
          placeholder="Password"
          className="border"
        />
        <button onClick={handleLogin} className="bg-blue">
          Login
        </button>
      </div>

      <div className="mt-10">getListCollections</div>
      <div className="flex flex-col gap-3">
        {listPhotos?.data?.map((item: any) => (
          <div key={item?.id}>
            <Link href={`/photos/${item?.id}`}>
              ID: {item?.id} - title: {item?.name}
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          router.push("/photos/1");
        }}
        className="bg-blue mt-5"
      >
        Photo 1
      </button>
    </div>
  );
}

export default ListPhotos;
