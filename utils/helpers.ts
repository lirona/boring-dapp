import { BigNumber, ethers } from "ethers";
import { tokenList } from "../constants";
import { Quest } from "./SeedsOnEarthContractService";

export const getUrlFromCid = (cid: string) => {
  return `${process.env.NEXT_PUBLIC_IPFS_URL}/${cid}`;
};

export const getTokenSymbolFromAddress = (address: string) =>
  tokenList.find(
    (token) =>
      ethers.utils.getAddress(token.address) == ethers.utils.getAddress(address)
  )?.symbol;

export const getTokenAddressFromSymbol = (symbol: string) =>
  tokenList.find((token) => token.symbol == symbol)?.address;

export const formatTokenAmount = (amount: BigNumber) => {
  return ethers.utils.formatEther(amount.toString());
};

export const hasUserJoinedQuest = (address: string | null, quest: Quest) => {
  if (!address || quest.users.length == 0) return false;

  return quest.users.includes(address);
};

export const hoursToSeconds = (hours: number) => {
  return hours * 60 * 60;
};

export const secondsToHours = (seconds: number) => {
  return seconds / 60 / 60;
};
