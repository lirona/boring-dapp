import { Web3Provider } from "@ethersproject/providers";
import { BigNumber, Contract, ethers } from "ethers";
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  CELO_TOKEN_ADDRESS,
} from "../constants";
import {
  formatTokenAmount,
  getUrlFromCid,
  hoursToSeconds,
  secondsToHours,
} from "./helpers";
import { QuestDetails, QuestStatus } from "./types";

class SeedsOnEarthContractService {
  private provider: Web3Provider | null;

  constructor(provider: Web3Provider) {
    this.provider = provider;
  }

  private getContract(withSigner: boolean = false): Contract {
    return new Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      withSigner ? this.provider.getSigner() : this.provider
    );
  }

  async createQuest(data: CreateQuestData): Promise<boolean> {
    try {
      const contract = this.getContract(true);
      const isCelo = data.tokenAddress == CELO_TOKEN_ADDRESS;
      const tx = await contract.createQuest(
        data.tokenAddress,
        isCelo ? 0 : data.tokenAmount,
        data.numberOfUsers,
        hoursToSeconds(data.timeToComplete),
        data.ipfsHash,
        {
          value: ethers.utils.parseUnits(
            isCelo ? data.tokenAmount.toString() : "0",
            "ether"
          ),
        }
      );
      const receipt = await tx.wait();
      console.log(receipt);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async sponsorQuest(data: SponsorQuestData): Promise<boolean> {
    try {
      const contract = this.getContract(true);
      const isCelo = data.tokenAddress == CELO_TOKEN_ADDRESS;
      const tx = await contract.sponsorQuest(
        data.questId,
        data.tokenAddress,
        isCelo ? 0 : data.tokenAmount,
        {
          value: ethers.utils.parseUnits(
            isCelo ? data.tokenAmount.toString() : "0",
            "ether"
          ),
        }
      );
      const receipt = await tx.wait();
      console.log(receipt);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async joinQuest(questId: number): Promise<boolean> {
    try {
      const contract = this.getContract(true);
      const tx = await contract.joinQuest(questId);
      const receipt = await tx.wait();
      console.log(receipt);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async pickupQuest(questId: number, fileIpfsHash: string): Promise<boolean> {
    try {
      const contract = this.getContract(true);
      const tx = await contract.pickUpQuest(questId, fileIpfsHash);
      const receipt = await tx.wait();
      console.log(receipt);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async completeQuest(questId: number, fileIpfsHash: string): Promise<boolean> {
    try {
      const contract = this.getContract(true);
      const tx = await contract.completeQuest(questId, fileIpfsHash);
      const receipt = await tx.wait();
      console.log(receipt);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getQuestStatus(questId: number): Promise<QuestStatus> {
    try {
      const contract = this.getContract();
      const status: QuestStatus = await contract.getQuestStatus(questId);
      return status;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getQuest(index: number): Promise<Quest> {
    try {
      const contract = this.getContract();
      const resp: GetQuestResponse = await contract.getQuestById(index);
      console.log(resp);
      const status = await this.getQuestStatus(index);
      const quest = new Quest(index, status, resp);
      await quest.fetchDetails();
      console.log(quest);
      return quest;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getQuests(): Promise<Quest[]> {
    try {
      const contract = this.getContract();
      const resp: GetQuestResponse[] = await contract.getQuests();
      const quests = await Promise.all(
        resp.map(async (questResp, index) => {
          const status = await this.getQuestStatus(index);
          const quest = new Quest(index, status, questResp);
          await quest.fetchDetails();
          return quest;
        })
      );
      return quests;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getQuestsForUser(): Promise<Quest[]> {
    try {
      const contract = this.getContract(true);
      const questIds: number[] = await contract.getQuestsForUser();
      const quests = await Promise.all(
        questIds.map((questId) => this.getQuest(questId))
      );
      return quests;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getCommittee(): Promise<string> {
    try {
      const contract = this.getContract();
      const resp: string = await contract.committee();
      console.log(resp);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default SeedsOnEarthContractService;

export interface CreateQuestData {
  tokenAddress: string;
  tokenAmount: number;
  numberOfUsers: number;
  ipfsHash: string;
  timeToComplete: number;
}

export interface SponsorQuestData {
  questId: number;
  tokenAddress: string;
  tokenAmount: number;
}

export interface GetQuestResponse {
  creator: string;
  sponsor: string;
  isCelo: boolean;
  token: string;
  amount: BigNumber;
  timeToComplete: BigNumber;
  infoHash: string;
  pickedUpHash: string;
  completedHash: string;
  numOfUsers: BigNumber;
  users: string[];
  createdTime: BigNumber;
  pickUpTime: BigNumber;
  status: number;
}

export class Quest {
  id: number;
  infoHash: string;
  creator: string;
  sponsor: string;
  isCelo: boolean;
  token: string;
  amount: string;
  timeToComplete: number;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  additionalInfo: string;
  communicationChannelLink: string;
  pickedUpHash: string;
  completedHash: string;
  numOfUsers: number;
  users: string[];
  createdTime: BigNumber;
  pickUpTime: BigNumber;
  status: number;

  constructor(id: number, status: QuestStatus, questResp: GetQuestResponse) {
    this.id = id;
    this.users = questResp.users.map(ethers.utils.getAddress);
    this.token = questResp.token;
    this.creator = questResp.creator;
    this.sponsor = questResp.sponsor;
    this.timeToComplete = secondsToHours(questResp.timeToComplete.toNumber());
    this.amount = formatTokenAmount(questResp.amount);
    this.numOfUsers = questResp.numOfUsers.toNumber();
    this.pickedUpHash = questResp.pickedUpHash;
    this.completedHash = questResp.completedHash;
    this.isCelo = questResp.isCelo;
    this.status = status;
    this.infoHash = questResp.infoHash;
    this.createdTime = questResp.createdTime;
    this.pickUpTime = questResp.pickUpTime;
  }

  async fetchDetails() {
    const resp = await fetch(getUrlFromCid(this.infoHash));
    const details: QuestDetails = await resp.json();
    this.title = details.title;
    this.description = details.description;
    this.location = details.location;
    this.additionalInfo = details.additionalInfo;
    this.imageUrl = details.imageUrl;
    this.communicationChannelLink = details.communicationChannelLink;
  }
}
