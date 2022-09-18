export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SOE_CONTRACT_ADDRESS;

export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_committee",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "ApproveSubmission",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "CompleteQuest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_numOfUsers",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_timeToComplete",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "CreateQuest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "JoinQuest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "PickUpQuest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "RejectSubmission",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "_approve",
        type: "bool",
      },
    ],
    name: "ReviewSubmission",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "SponsorQuest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "SPONSOR_PENDING_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WITHDRAW_PENDING_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "approveSubmission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "committee",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "completeQuest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numOfUsers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_timeToComplete",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "createQuest",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "getQuestById",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "sponsor",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isCelo",
            type: "bool",
          },
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timeToComplete",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "infoHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "pickedUpHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "completedHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "numOfUsers",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "users",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "createdTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pickUpTime",
            type: "uint256",
          },
        ],
        internalType: "struct SeedsOnEarth.Quest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "getQuestStatus",
    outputs: [
      {
        internalType: "enum SeedsOnEarth.QuestStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getQuests",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "sponsor",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isCelo",
            type: "bool",
          },
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timeToComplete",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "infoHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "pickedUpHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "completedHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "numOfUsers",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "users",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "createdTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pickUpTime",
            type: "uint256",
          },
        ],
        internalType: "struct SeedsOnEarth.Quest[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getQuestsForUser",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "joinQuest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "pickUpQuest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "questStatuses",
    outputs: [
      {
        internalType: "enum SeedsOnEarth.QuestStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "quests",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isCelo",
        type: "bool",
      },
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeToComplete",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "infoHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "pickedUpHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "completedHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "numOfUsers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pickUpTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "rejectSubmission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_approve",
        type: "bool",
      },
    ],
    name: "reviewSubmission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "sponsorQuest",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "usersQuestsMapping",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_questId",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const CELO_TOKEN_ADDRESS = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
export const tokenList: Token[] = [
  {
    symbol: "CELO",
    address: CELO_TOKEN_ADDRESS,
  },
  // {
  //   symbol: "cUSD",
  //   address: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
  // },
  // {
  //   symbol: "cEUR",
  //   address: "0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f",
  // },
];

export interface Token {
  symbol: string;
  address: string;
}
