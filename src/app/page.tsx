"use client";

import WebApp from "@twa-dev/sdk";
import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      WebApp.ready();
    }
  }, []);

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          onClick={handleClick}
        /> */}
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <button className="bg-blue">Init data</button>
        <button
          className="bg-blue"
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
