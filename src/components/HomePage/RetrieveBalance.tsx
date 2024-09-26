"use client";

import React, { useState } from "react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import PrimaryInput from "../common/PrimaryInput";
import TButton from "../common/TButton";
import { useEtherProvider } from "@/hooks/useContract";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { toast } from "react-toastify";
import useDebounce from "@/hooks/useDebounce";

function RetrieveBalance() {
  const [nativeBalance, setNativeBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const debounceWalletAddress = useDebounce(walletAddress, 500);

  const tokenAddresses = [
    "0x0C2DA89fE963e1e4f883225F9f9e630F6D6af006",
    "0x774e1851AD3Fa81242c50133d2b3293e60FBBA35",
  ];

  const chainId = 28122024;
  const balances = useTokenBalances(
    debounceWalletAddress,
    tokenAddresses,
    chainId
  );
  const etherProvider = useEtherProvider(chainId);

  const getNativeBalance = async () => {
    const balance = await etherProvider.getBalance(debounceWalletAddress);
    const nativBal = ethers.utils.formatEther(balance);
    setNativeBalance(nativBal);
  };

  const handleCheckBalance = () => {
    if (isAddress(debounceWalletAddress)) {
      getNativeBalance();
    } else {
      toast.error("Wrong address");
    }
  };

  return (
    <div className="flex flex-col gap-5 w-[70%]">
      <h1>Retrieve Token Balance Chain Ancient8 Testnet</h1>
      <h2>Example wallet: 0xc6a926aCab5A7C6346174A66dCfF502e4f52cf6B</h2>
      <PrimaryInput
        onChange={(e) => {
          setWalletAddress(e.target.value);
        }}
        title={"Wallet Address"}
        value={walletAddress || ""}
      />
      <TButton onClick={handleCheckBalance}>CHECK</TButton>
      <ul>
        <li>NATIVE BALANCE VALUE: - {nativeBalance}</li>
        {balances.map((balance) => (
          <li key={balance?.tokenAddress}>
            {balance?.tokenAddress} VALUE: - {balance?.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RetrieveBalance;
