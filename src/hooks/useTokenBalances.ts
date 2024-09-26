import { useEffect, useState } from "react";
import { ETHER_PROVIDER, getRpcProviderByChainId } from "@/lib/provider";
import { getErc20Contract } from "@/lib/contract-accessor";
import { pow10 } from "@/lib/math";
import BigNumber from "bignumber.js";
import { isAddress } from "ethers/lib/utils";

export const useTokenBalances = (
  account: string,
  tokenAddresses: string[],
  chainId: number
) => {
  const [balances, setBalances] = useState<
    { tokenAddress: string; balance: string }[]
  >([]);

  const fetchBalances = async () => {
    try {
      const etherProvider = getRpcProviderByChainId(chainId) || ETHER_PROVIDER;
      const balancePromises = tokenAddresses.map(async (tokenAddress) => {
        const erc20ContractWithoutSigner = getErc20Contract(
          tokenAddress,
          etherProvider
        );
        if (!erc20ContractWithoutSigner) return { tokenAddress, balance: "0" };
        const [balance, decimals] = await Promise.all([
          erc20ContractWithoutSigner.balanceOf(account),
          erc20ContractWithoutSigner.decimals(),
        ]);
        const formattedBalance = new BigNumber(balance?.toString())
          .dividedBy(pow10(decimals))
          .toString();

        return { tokenAddress, balance: formattedBalance };
      });
      const tokenBalances = await Promise.all(balancePromises);
      console.log("🚀 ~ fetchBalances ~ tokenBalances:", tokenBalances);
      if (JSON.stringify(tokenBalances) !== JSON.stringify(balances)) {
        setBalances(tokenBalances);
      }
    } catch (error) {
      console.error("Error fetching balances", error);
    }
  };

  useEffect(() => {
    if (isAddress(account) && tokenAddresses.length > 0) {
      fetchBalances();
    }
  }, [account, tokenAddresses, chainId]);

  return balances;
};
