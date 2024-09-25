"use client";

import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  useEffect(() => {
    if (typeof window !== undefined) {
      WebApp.ready();
    }
  }, []);

  const handleClick = () => {
    if (typeof window !== undefined) {
      WebApp.showAlert("Hey there!");
    }
  };
  const router = useRouter();

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
          className="bg-blue-300"
          onClick={() => {
            console.log("platform: ", WebApp.platform);
            console.log("init data: ", WebApp.initData);
            console.log("init data unsafe: ", WebApp.initDataUnsafe);
          }}
        >
          Init data
        </button>
        <button
          className="bg-blue-300"
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
