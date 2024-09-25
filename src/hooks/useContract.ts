import { getErc20Contract } from "@/lib/contract-accessor";
import { ETHER_PROVIDER, getRpcProviderByChainId } from "@/lib/provider";
import { useMemo } from "react";

export const useERC20WithoutSigner = (address: string, chainId: number) => {
  const etherProvider = getRpcProviderByChainId(chainId) || ETHER_PROVIDER;
  return useMemo(
    () => getErc20Contract(address, etherProvider),
    [address, chainId]
  );
};

export const useEtherProvider = (chainId: number) => {
  const etherProvider = getRpcProviderByChainId(chainId) || ETHER_PROVIDER;
  return useMemo(() => etherProvider, [chainId]);
};
