"use client";

import React from "react";
import { useTokenBalances } from "@/hooks/useTokenBalances";

function RetrieveBalance() {
  const account = "0xc6a926aCab5A7C6346174A66dCfF502e4f52cf6B";
  const tokenAddresses = [
    "0x0C2DA89fE963e1e4f883225F9f9e630F6D6af006",
    "0x774e1851AD3Fa81242c50133d2b3293e60FBBA35",
  ];

  const chainId = 28122024;
  const balances = useTokenBalances(account, tokenAddresses, chainId);

  return (
    <div>
      <h1>RetrieveBalance</h1>
      <ul>
        {balances.map((balance) => (
          <li key={balance?.tokenAddress}>
            {balance?.tokenAddress}: {balance?.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RetrieveBalance;
