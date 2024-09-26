"use client";

import { getListCollections } from "@/apis/photos-module";
import { useQuery } from "@tanstack/react-query";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

export default function Home() {
  const router = useRouter();
  const [run, setRun] = useState(true);

  const [showJoyride, setShowJoyride] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      WebApp.ready();
      setShowJoyride(true);
    }
  }, []);

  const handleScrollEnd = () => {
    setTimeout(() => {
      setTooltipVisible(true);
    }, 300); // Đợi 300ms sau khi cuộn kết thúc
  };

  const [listPhotos, setListPhotos] = useState<any>([]);

  useQuery(["getListPhoto"], async () => {
    const response = await getListCollections();
    setListPhotos(response);
    return response;
  });

  return (
    <div className="p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black min-h-screen">
      <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start h-full">
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
        <div id="demo">
          <button
            className="bg-cyan-400 px-4 py-2 rounded-md"
            onClick={() => {
              console.log("platform: ", WebApp.platform);
              console.log("init data: ", WebApp.initData);
              console.log("init data unsafe: ", WebApp.initDataUnsafe);
            }}
          >
            Init data
          </button>
        </div>

        <div className="flex gap-10 items-center flex-col sm:flex-row">
          {listPhotos?.data?.map((item: any) => (
            <div key={item?.id}>
              <Link href={`/photos/${item?.id}`}>
                ID: {item?.id} - title: {item?.name}
              </Link>
            </div>
          ))}
        </div>
        <button
          id="demo2"
          className="bg-blue go-to-photos-button px-4 py-2 rounded-md"
          onClick={() => {
            router.push("/photos");
          }}
        >
          Go to photos
        </button>
      </main>

      {showJoyride && (
        <Joyride
          continuous
          run={run}
          scrollToFirstStep
          scrollOffset={100}
          scrollDuration={300}
          disableScrollParentFix={true}
          steps={steps as Step[]}
          hideBackButton
          hideCloseButton
          styles={{
            options: {
              zIndex: 10000,
              backgroundColor: "transparent",
              arrowColor: "transparent",
            },
            tooltipContainer: {
              paddingTop: 0,
            },
            tooltipContent: {
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 10,
            },
            tooltip: {
              opacity: tooltipVisible ? 1 : 0,
            },
            tooltipFooter: { marginTop: 0, marginRight: 50 },
            buttonNext: {
              outline: "none",
              paddingTop: 4,
              paddingBottom: 4,
              backgroundColor: "#003452",
              fontSize: 14,
              fontWeight: 600,
              color: "#00FFFF",
              borderColor: "#2E5971",
              borderWidth: 2,
            },
            overlay: { backgroundColor: `rgba(0, 0, 0,0.8)` },
          }}
          callback={(data) => {
            if (data.action === "start" || data.action === "update") {
              setTooltipVisible(false);
              handleScrollEnd();
            }
            if (data.status === "finished" || data.status === "skipped") {
              console.log(data);
              setRun(false);
            }
          }}
        />
      )}
    </div>
  );
}

const steps = [
  {
    content: (
      <div className="flex flex-col items-center justify-center !z-[10001]">
        <div className="rounded bg-[#2E5971] walktour-tooltip-shadow w-[250px] text-[#00FFFF] text-center px-3 py-2">
          Complete any task to receive your $DGP reward.
        </div>
      </div>
    ),
    placement: "top",
    target: "#demo",
    disableBeacon: true,
    offset: 0,
  },
  {
    content: (
      <div className="flex flex-col items-start justify-start w-full !p0">
        <div className="rounded bg-[#2E5971] text-primary walktour-tooltip-shadow text-center px-3 py-2 flex items-center gap-1">
          Complete all tasks to earn a Lucky Box with up to 10 $USDT inside.
        </div>
      </div>
    ),
    placement: "bottom",
    target: "#demo2",
    disableBeacon: true,
    offset: 0,
  },
];
