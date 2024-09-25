// "use client";

// import { getListCollections } from "@/apis/photos-module";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import Link from "next/link";
// import cookie from "cookie";
// import React, { useState } from "react";
// import { useAuthContext } from "@/context/AuthContext";
// import { loginUrl } from "@/constants/const/api-url.const";
// import { toast } from "react-toastify";
// import { loginAccount } from "@/apis/auth";

// function ListPhotos() {
//   const { isLogin, checkLogin } = useAuthContext();
//   const [listPhotos, setListPhotos] = useState<any>();
//   const [tokenValue, setTokenValue] = useState<string>("");
//   const [userEmail, setUserEmail] = useState<string>("");
//   const [userPassword, setUserPassword] = useState<string>("");

//   useQuery(
//     ["getListPhoto", isLogin],
//     async () => {
//       const response = await getListCollections();
//       console.log("🚀 ~ response:", response);
//       setListPhotos(response);
//       return response;
//     },
//     { enabled: !!isLogin }
//   );

//   const handleSetToken = () => {
//     // const cookieStore = cookies();
//     // cookieStore.set("token", tokenValue);
//     window.document.cookie = cookie.serialize("token", tokenValue);
//     checkLogin();
//   };

//   const loginMutation = useMutation(
//     async (loginData) => {
//       return await loginAccount(loginUrl, loginData);
//     },
//     {
//       onSuccess: (data) => {
//         if (typeof window !== "undefined") {
//           console.log("🚀 ~ ListPhotos ~ data:", data);
//           const token = data?.token;
//           const maxAge = data?.expiresIn;
//           window.document.cookie = cookie.serialize("token", token, {
//             // maxAge: 30 * 24 * 60 * 60,
//             maxAge: maxAge,
//             path: "/",
//           });
//         }
//         toast.success("Login successful!");
//         checkLogin();
//       },
//       onError: (err: any) => {
//         console.log("login error", err?.message);
//         toast.error(err?.response?.data?.message || err?.message);
//       },
//     }
//   );

//   const handleLogin = () => {
//     // @ts-ignore
//     loginMutation.mutate({
//       username: userEmail,
//       password: userPassword,
//     });
//   };

//   const handleLogout = () => {
//     window.document.cookie = cookie.serialize("token", "", {
//       maxAge: -1, // Expire the cookie immediately.
//       path: "/",
//     });
//     checkLogin();
//   };

//   return (
//     <div>
//       <div>Fake Login</div>
//       <div className="flex items-center gap-5">
//         <input
//           onChange={(e) => {
//             setTokenValue(e.target.value);
//           }}
//           value={tokenValue}
//           className="border"
//         />
//         <button onClick={handleSetToken} className="bg-blue-400">
//           Set
//         </button>
//       </div>

//       <div className="flex flex-col gap-2 mt-10 w-1/2">
//         <input
//           onChange={(e) => {
//             setUserEmail(e.target.value);
//           }}
//           value={userEmail || ""}
//           placeholder="Email"
//           className="border"
//         />
//         <input
//           onChange={(e) => {
//             setUserPassword(e.target.value);
//           }}
//           value={userPassword || ""}
//           placeholder="Password"
//           className="border"
//         />
//         <button onClick={handleLogin} className="bg-blue-400">
//           Login
//         </button>
//       </div>

//       <div className="mt-10">getListCollections</div>
//       <div className="flex flex-col gap-3">
//         {listPhotos?.data?.map((item: any) => (
//           <div key={item?.id}>
//             <Link href={`/photos/${item?.id}`}>
//               ID: {item?.id} - title: {item?.name}
//             </Link>
//           </div>
//         ))}
//       </div>
//       <button onClick={handleLogout} className="bg-blue-400">
//         Logout
//       </button>
//     </div>
//   );
// }

// export default ListPhotos;
