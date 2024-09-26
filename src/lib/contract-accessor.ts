import { ethers } from "ethers";
import { Erc20__factory } from "../../types";

export function getErc20Contract(
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) {
  return address && Erc20__factory.connect(address, signer);
}
