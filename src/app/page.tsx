"use client";

import { getListCollections } from "@/apis/photos-module";
import { useQuery } from "@tanstack/react-query";
import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      WebApp.ready();
    }
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      WebApp.showAlert("Hey there!");
    }
  };
  const router = useRouter();

  const [listPhotos, setListPhotos] = useState<any>([]);

  useQuery(["getListPhoto"], async () => {
    const response = await getListCollections();
    setListPhotos(response);
    return response;
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start welcome h-full">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          onClick={handleClick}
        />
        <ol
          onClick={() => {
            toast.success("LALA");
          }}
          className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]"
        >
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <button
          className="bg-blue-300 init-data-button hello px-4 py-2 rounded-md"
          onClick={() => {
            console.log("platform: ", WebApp.platform);
            console.log("init data: ", WebApp.initData);
            console.log("init data unsafe: ", WebApp.initDataUnsafe);
          }}
        >
          Init data
        </button>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {listPhotos?.data?.map((item: any) => (
            <div key={item?.id}>
              <Link href={`/photos/${item?.id}`}>
                ID: {item?.id} - title: {item?.name}
              </Link>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-300 go-to-photos-button px-4 py-2 rounded-md"
          onClick={() => {
            router.push("/photos");
          }}
        >
          Go to photos
        </button>
      </main>
    </div>
  );
}
