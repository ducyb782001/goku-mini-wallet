"use client";

import React, { useState } from "react";
import ScanQrCode from "../common/ScanQrCode";
import ShowQrCode from "../common/ShowQrCode";
import ModalTest from "../modal/ModalTest";
import PrimaryModal from "../common/PrimaryModal";
const SEED_PHRASE =
  "adsfadsf adsfdsaf want alien innersight delivery panick mobile chef olive economy limb discover tipo want alien innersight delivery panick mobile chef olive economy limbs";

function HomePage() {
  const [toContractAddressInput, setToContractAddressInput] = useState("");
  console.log(
    "🚀 ~ HomePage ~ toContractAddressInput:",
    toContractAddressInput
  );
  const [isOpenScanQrCode, setIsOpenScanQrCode] = useState(false);
  const [showModalTest, setShowModalTest] = useState(false);

  return (
    <div className="mt-10 divcont">
      <div
        onClick={() => {
          setIsOpenScanQrCode(true);
        }}
      >
        Open scan qrcode
      </div>
      <div
        onClick={() => {
          setShowModalTest(true);
        }}
      >
        Open modal test
      </div>
      <div className="bg-blue-400 h-20 w-20 rounded-lg box1" id="box1">
        Box11
      </div>
      <div
        className="bg-yellow-400 h-20 w-20 rounded-lg mt-[-40px] ml-52 box4"
        id="box4"
      >
        Box4
      </div>
      <div
        className="bg-red-400 h-20 w-20 rounded-lg mt-2 ml-24 box2"
        id="box2"
        data-hint="Box 2 ne"
      >
        Box2
      </div>
      <div className="bg-green-400 h-20 w-20 rounded-lg ml-40 box3" id="box3">
        Box3
      </div>
      <ScanQrCode
        isOpenScanQrCode={isOpenScanQrCode}
        setIsOpenScanQrCode={setIsOpenScanQrCode}
        setToContractAddressInput={setToContractAddressInput}
      />
      <ShowQrCode size={240} uri={SEED_PHRASE} />

      <PrimaryModal
        body={<ModalTest setIsShowModal={setShowModalTest} />}
        showModalDialog={showModalTest}
        setShowModalDialog={setShowModalTest}
      />
    </div>
  );
}

export default HomePage;
