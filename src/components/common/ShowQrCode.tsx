import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { DEFAULT_IMAGE } from "@/constants/const/image.const";

function ShowQrCode({ size = 220, className = "", uri }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <CopyToClipboard text={uri}>
        {uri && (
          <QRCodeSVG
            size={size}
            bgColor="#E6E9EB"
            className="aspect-square rounded-2xl"
            value={uri}
            includeMargin={true}
            imageSettings={{
              src: DEFAULT_IMAGE.ANCIENT8_LOGO,
              height: 32,
              width: 32,
              excavate: true,
            }}
          />
        )}
      </CopyToClipboard>
    </div>
  );
}

export default ShowQrCode;
