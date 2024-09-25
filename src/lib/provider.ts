import { SupportedChainId } from "@/constants/enum/chain.enum";
import { ethers } from "ethers";

export const nodesByChainId = {
  [SupportedChainId.ARBITRUM_ONE]: "https://sepolia-rollup.arbitrum.io/rpc",
  [SupportedChainId.ARBITRUM_SEPOLIA]: "https://sepolia-rollup.arbitrum.io/rpc",
  [SupportedChainId.ANCIENT8_TESTNET]: "https://rpcv2-testnet.ancient8.gg",
  [SupportedChainId.ANCIENT8_MAINNET]: "https://rpcv2-testnet.ancient8.gg",
};

export const getRpcProviderByChainId = (chainId: number) =>
  chainId && new ethers.providers.JsonRpcProvider(nodesByChainId[chainId]);

const RPC_URL = "https://rpcv2-testnet.ancient8.gg";

export const ETHER_PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URL);
