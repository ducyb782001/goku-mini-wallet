import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import TButton from "./TButton";
import { ButtonType, ContentType } from "../../constants/enum/general.enum";
import { toast } from "react-toastify";
import TextContent from "./TextContent";
import CloseDialogIcon from "../icons/CloseDialogIcon";
import MyQrCodeIcon from "../icons/MyQrCodeIcon";
import SelectImageFromAlbumn from "../icons/SelectImageFromAlbumn";

function ScanQrCode({
  isOpenScanQrCode,
  setIsOpenScanQrCode,
  setToContractAddressInput,
}) {
  const videoRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<any>(null);

  useEffect(() => {
    let scanner;
    const startScanner = () => {
      if (videoRef.current) {
        scanner = new QrScanner(
          videoRef.current,
          (result) => {
            console.log("🚀 ~ scanner=newQrScanner ~ result:", result);
            toast.success(result?.data);
            if (result?.data) {
              setToContractAddressInput(result?.data);
              setIsOpenScanQrCode(false);
            }
          },
          {
            onDecodeError: (error) => {
              console.log("QR scan error", error);
            },
          }
        );
        scanner.start().catch((err) => {
          console.error("Scanner start error:", err);
          setScanError(err);
        });
      } else {
        console.error("Video element not found");
      }
    };
    if (isOpenScanQrCode) {
      setIsScanning(true);
      setTimeout(startScanner, 100);
    }
    return () => {
      if (scanner) {
        scanner.stop();
      }
    };
  }, [isOpenScanQrCode]);

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        QrScanner.scanImage(file)
          .then((result) => {
            toast.success(`Result: ${result}`);
            setToContractAddressInput(result);
            setIsOpenScanQrCode(false);
          })
          .catch((error) => console.log(error || "No QR code found."));
      } catch (err) {
        console.error("Image scan error:", err);
        toast.error("Failed to scan QR code from image");
      }
    }
  };

  return (
    <div className="relative h-[79vh] md:h-[600px] overflow-hidden text-white rounded-lg">
      {isScanning ? (
        <video
          ref={videoRef}
          className="absolute top-[2px] left-[2px] w-full h-full object-cover rounded-lg"
          autoPlay
          muted
          playsInline
        />
      ) : (
        <div className="w-full h-full bg-secondBackground" />
      )}
      <div className="absolute top-5 left-5 right-5">
        <div className="relative z-10 flex items-center justify-between">
          <div className="w-8 h-8" />
          <TextContent className="font-semibold" type={ContentType.TITLE}>
            Scan QR Code
          </TextContent>
          <TButton
            type={ButtonType.ICON}
            onClick={() => {
              setIsScanning(false);
              setIsOpenScanQrCode(false);
            }}
          >
            <CloseDialogIcon />
          </TButton>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-10 mt-14">
          <div
            id="focus"
            className="relative rounded-lg w-52 h-52 qr-code-scanning"
          >
            <div className="absolute top-[-2px] left-[-2px] w-8 h-8 border-primary border-t-[3px] border-l-[3px]"></div>
            <div className="absolute top-[-2px] right-[-2px] w-8 h-8 border-primary border-t-[3px] border-r-[3px]"></div>
            <div className="absolute bottom-[-2px] left-[-2px] w-8 h-8 border-primary border-b-[3px] border-l-[3px]"></div>
            <div className="absolute bottom-[-2px] right-[-2px] w-8 h-8 border-primary border-b-[3px] border-r-[3px]"></div>
          </div>
          <TextContent
            type={ContentType.SMALL_TITLE}
            className="font-semibold text-center text-yellow"
          >
            Align QR code within frame to scan
          </TextContent>
          <div className="grid grid-cols-2 gap-4 px-2">
            <ScanButton icon={<MyQrCodeIcon />} title={"My QR Code"} />
            <label className="input-img">
              <ScanButton
                icon={<SelectImageFromAlbumn />}
                title={"Select From Album"}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                onClick={(event) =>
                  ((event.target as HTMLInputElement).value = null)
                }
              />
            </label>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 md:h-[110px] h-[106px] bg-[#00000040]"></div>
      <div className="absolute md:top-[323px] top-[319px] left-0 right-0 bottom-0 bg-[#00000040]"></div>
      <div className="absolute md:top-[110px] top-[106px] left-0 bottom-0 h-[213px] w-[calc(50%-106px)] bg-[#00000040]"></div>
      <div className="absolute md:top-[110px] top-[106px] right-0 bottom-0 h-[213px] w-[calc(50%-106px)] bg-[#00000040]"></div>
    </div>
  );
}

export default ScanQrCode;

function ScanButton({ icon, title, onClick = null }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-between gap-3 p-3 rounded-lg cursor-pointer bg-[#01141F80]"
    >
      {icon}
      <TextContent
        type={ContentType.DESCRIPTION}
        className="font-semibold text-white whitespace-nowrap"
      >
        {title}
      </TextContent>
    </div>
  );
}
