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
    abi: null,
  },
  {
    symbol: "cUSD",
    address: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
    abi: [
      {
        type: "constructor",
        stateMutability: "nonpayable",
        payable: false,
        inputs: [
          {
            type: "bool",
            name: "test",
            internalType: "bool",
          },
        ],
      },
      {
        type: "event",
        name: "Approval",
        inputs: [
          {
            type: "address",
            name: "owner",
            internalType: "address",
            indexed: true,
          },
          {
            type: "address",
            name: "spender",
            internalType: "address",
            indexed: true,
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "InflationFactorUpdated",
        inputs: [
          {
            type: "uint256",
            name: "factor",
            internalType: "uint256",
            indexed: false,
          },
          {
            type: "uint256",
            name: "lastUpdated",
            internalType: "uint256",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "InflationParametersUpdated",
        inputs: [
          {
            type: "uint256",
            name: "rate",
            internalType: "uint256",
            indexed: false,
          },
          {
            type: "uint256",
            name: "updatePeriod",
            internalType: "uint256",
            indexed: false,
          },
          {
            type: "uint256",
            name: "lastUpdated",
            internalType: "uint256",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "OwnershipTransferred",
        inputs: [
          {
            type: "address",
            name: "previousOwner",
            internalType: "address",
            indexed: true,
          },
          {
            type: "address",
            name: "newOwner",
            internalType: "address",
            indexed: true,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "RegistrySet",
        inputs: [
          {
            type: "address",
            name: "registryAddress",
            internalType: "address",
            indexed: true,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "Transfer",
        inputs: [
          {
            type: "address",
            name: "from",
            internalType: "address",
            indexed: true,
          },
          {
            type: "address",
            name: "to",
            internalType: "address",
            indexed: true,
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "TransferComment",
        inputs: [
          {
            type: "string",
            name: "comment",
            internalType: "string",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "allowance",
        inputs: [
          {
            type: "address",
            name: "accountOwner",
            internalType: "address",
          },
          {
            type: "address",
            name: "spender",
            internalType: "address",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "approve",
        inputs: [
          {
            type: "address",
            name: "spender",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "balanceOf",
        inputs: [
          {
            type: "address",
            name: "accountOwner",
            internalType: "address",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "burn",
        inputs: [
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "checkProofOfPossession",
        inputs: [
          {
            type: "address",
            name: "sender",
            internalType: "address",
          },
          {
            type: "bytes",
            name: "blsKey",
            internalType: "bytes",
          },
          {
            type: "bytes",
            name: "blsPop",
            internalType: "bytes",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "creditGasFees",
        inputs: [
          {
            type: "address",
            name: "from",
            internalType: "address",
          },
          {
            type: "address",
            name: "feeRecipient",
            internalType: "address",
          },
          {
            type: "address",
            name: "gatewayFeeRecipient",
            internalType: "address",
          },
          {
            type: "address",
            name: "communityFund",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "refund",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "tipTxFee",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "gatewayFee",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "baseTxFee",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "debitGasFees",
        inputs: [
          {
            type: "address",
            name: "from",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint8",
            name: "",
            internalType: "uint8",
          },
        ],
        name: "decimals",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "decreaseAllowance",
        inputs: [
          {
            type: "address",
            name: "spender",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "fractionMulExp",
        inputs: [
          {
            type: "uint256",
            name: "aNumerator",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "aDenominator",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "bNumerator",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "bDenominator",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "exponent",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_decimals",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getBlockNumberFromHeader",
        inputs: [
          {
            type: "bytes",
            name: "header",
            internalType: "bytes",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getEpochNumber",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getEpochNumberOfBlock",
        inputs: [
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getEpochSize",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bytes32",
            name: "",
            internalType: "bytes32",
          },
        ],
        name: "getExchangeRegistryId",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getInflationParameters",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bytes32",
            name: "",
            internalType: "bytes32",
          },
        ],
        name: "getParentSealBitmap",
        inputs: [
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bytes32",
            name: "",
            internalType: "bytes32",
          },
        ],
        name: "getVerifiedSealBitmapFromHeader",
        inputs: [
          {
            type: "bytes",
            name: "header",
            internalType: "bytes",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "pure",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getVersionNumber",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bytes32",
            name: "",
            internalType: "bytes32",
          },
        ],
        name: "hashHeader",
        inputs: [
          {
            type: "bytes",
            name: "header",
            internalType: "bytes",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "increaseAllowance",
        inputs: [
          {
            type: "address",
            name: "spender",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "initialize",
        inputs: [
          {
            type: "string",
            name: "_name",
            internalType: "string",
          },
          {
            type: "string",
            name: "_symbol",
            internalType: "string",
          },
          {
            type: "uint8",
            name: "_decimals",
            internalType: "uint8",
          },
          {
            type: "address",
            name: "registryAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "inflationRate",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "inflationFactorUpdatePeriod",
            internalType: "uint256",
          },
          {
            type: "address[]",
            name: "initialBalanceAddresses",
            internalType: "address[]",
          },
          {
            type: "uint256[]",
            name: "initialBalanceValues",
            internalType: "uint256[]",
          },
          {
            type: "string",
            name: "exchangeIdentifier",
            internalType: "string",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "initialized",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "isOwner",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "minQuorumSize",
        inputs: [
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "minQuorumSizeInCurrentSet",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "mint",
        inputs: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "string",
            name: "",
            internalType: "string",
          },
        ],
        name: "name",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "numberValidatorsInCurrentSet",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "numberValidatorsInSet",
        inputs: [
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "address",
            name: "",
            internalType: "address",
          },
        ],
        name: "owner",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "address",
            name: "",
            internalType: "contract IRegistry",
          },
        ],
        name: "registry",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "renounceOwnership",
        inputs: [],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "setInflationParameters",
        inputs: [
          {
            type: "uint256",
            name: "rate",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "updatePeriod",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "setRegistry",
        inputs: [
          {
            type: "address",
            name: "registryAddress",
            internalType: "address",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "string",
            name: "",
            internalType: "string",
          },
        ],
        name: "symbol",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "totalSupply",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "transfer",
        inputs: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "transferFrom",
        inputs: [
          {
            type: "address",
            name: "from",
            internalType: "address",
          },
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "transferOwnership",
        inputs: [
          {
            type: "address",
            name: "newOwner",
            internalType: "address",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "transferWithComment",
        inputs: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "comment",
            internalType: "string",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "unitsToValue",
        inputs: [
          {
            type: "uint256",
            name: "units",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "address",
            name: "",
            internalType: "address",
          },
        ],
        name: "validatorSignerAddressFromCurrentSet",
        inputs: [
          {
            type: "uint256",
            name: "index",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "address",
            name: "",
            internalType: "address",
          },
        ],
        name: "validatorSignerAddressFromSet",
        inputs: [
          {
            type: "uint256",
            name: "index",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "valueToUnits",
        inputs: [
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
    ],
  },
  {
    symbol: "cEUR",
    address: "0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f",
    abi: [
      {
        type: "constructor",
        stateMutability: "nonpayable",
        payable: false,
        inputs: [
          {
            type: "bool",
            name: "test",
            internalType: "bool",
          },
        ],
      },
      {
        type: "event",
        name: "Approval",
        inputs: [
          {
            type: "address",
            name: "owner",
            internalType: "address",
            indexed: true,
          },
          {
            type: "address",
            name: "spender",
            internalType: "address",
            indexed: true,
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "InflationFactorUpdated",
        inputs: [
          {
            type: "uint256",
            name: "factor",
            internalType: "uint256",
            indexed: false,
          },
          {
            type: "uint256",
            name: "lastUpdated",
            internalType: "uint256",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "InflationParametersUpdated",
        inputs: [
          {
            type: "uint256",
            name: "rate",
            internalType: "uint256",
            indexed: false,
          },
          {
            type: "uint256",
            name: "updatePeriod",
            internalType: "uint256",
            indexed: false,
          },
          {
            type: "uint256",
            name: "lastUpdated",
            internalType: "uint256",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "OwnershipTransferred",
        inputs: [
          {
            type: "address",
            name: "previousOwner",
            internalType: "address",
            indexed: true,
          },
          {
            type: "address",
            name: "newOwner",
            internalType: "address",
            indexed: true,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "RegistrySet",
        inputs: [
          {
            type: "address",
            name: "registryAddress",
            internalType: "address",
            indexed: true,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "Transfer",
        inputs: [
          {
            type: "address",
            name: "from",
            internalType: "address",
            indexed: true,
          },
          {
            type: "address",
            name: "to",
            internalType: "address",
            indexed: true,
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "event",
        name: "TransferComment",
        inputs: [
          {
            type: "string",
            name: "comment",
            internalType: "string",
            indexed: false,
          },
        ],
        anonymous: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "allowance",
        inputs: [
          {
            type: "address",
            name: "accountOwner",
            internalType: "address",
          },
          {
            type: "address",
            name: "spender",
            internalType: "address",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "approve",
        inputs: [
          {
            type: "address",
            name: "spender",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "balanceOf",
        inputs: [
          {
            type: "address",
            name: "accountOwner",
            internalType: "address",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "burn",
        inputs: [
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "checkProofOfPossession",
        inputs: [
          {
            type: "address",
            name: "sender",
            internalType: "address",
          },
          {
            type: "bytes",
            name: "blsKey",
            internalType: "bytes",
          },
          {
            type: "bytes",
            name: "blsPop",
            internalType: "bytes",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "creditGasFees",
        inputs: [
          {
            type: "address",
            name: "from",
            internalType: "address",
          },
          {
            type: "address",
            name: "feeRecipient",
            internalType: "address",
          },
          {
            type: "address",
            name: "gatewayFeeRecipient",
            internalType: "address",
          },
          {
            type: "address",
            name: "communityFund",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "refund",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "tipTxFee",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "gatewayFee",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "baseTxFee",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "debitGasFees",
        inputs: [
          {
            type: "address",
            name: "from",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint8",
            name: "",
            internalType: "uint8",
          },
        ],
        name: "decimals",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "decreaseAllowance",
        inputs: [
          {
            type: "address",
            name: "spender",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "fractionMulExp",
        inputs: [
          {
            type: "uint256",
            name: "aNumerator",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "aDenominator",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "bNumerator",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "bDenominator",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "exponent",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_decimals",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getBlockNumberFromHeader",
        inputs: [
          {
            type: "bytes",
            name: "header",
            internalType: "bytes",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getEpochNumber",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getEpochNumberOfBlock",
        inputs: [
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getEpochSize",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bytes32",
            name: "",
            internalType: "bytes32",
          },
        ],
        name: "getExchangeRegistryId",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getInflationParameters",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bytes32",
            name: "",
            internalType: "bytes32",
          },
        ],
        name: "getParentSealBitmap",
        inputs: [
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bytes32",
            name: "",
            internalType: "bytes32",
          },
        ],
        name: "getVerifiedSealBitmapFromHeader",
        inputs: [
          {
            type: "bytes",
            name: "header",
            internalType: "bytes",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "pure",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "getVersionNumber",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bytes32",
            name: "",
            internalType: "bytes32",
          },
        ],
        name: "hashHeader",
        inputs: [
          {
            type: "bytes",
            name: "header",
            internalType: "bytes",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "increaseAllowance",
        inputs: [
          {
            type: "address",
            name: "spender",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "initialize",
        inputs: [
          {
            type: "string",
            name: "_name",
            internalType: "string",
          },
          {
            type: "string",
            name: "_symbol",
            internalType: "string",
          },
          {
            type: "uint8",
            name: "_decimals",
            internalType: "uint8",
          },
          {
            type: "address",
            name: "registryAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "inflationRate",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "inflationFactorUpdatePeriod",
            internalType: "uint256",
          },
          {
            type: "address[]",
            name: "initialBalanceAddresses",
            internalType: "address[]",
          },
          {
            type: "uint256[]",
            name: "initialBalanceValues",
            internalType: "uint256[]",
          },
          {
            type: "string",
            name: "exchangeIdentifier",
            internalType: "string",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "initialized",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "isOwner",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "minQuorumSize",
        inputs: [
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "minQuorumSizeInCurrentSet",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "mint",
        inputs: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "string",
            name: "",
            internalType: "string",
          },
        ],
        name: "name",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "numberValidatorsInCurrentSet",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "numberValidatorsInSet",
        inputs: [
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "address",
            name: "",
            internalType: "address",
          },
        ],
        name: "owner",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "address",
            name: "",
            internalType: "contract IRegistry",
          },
        ],
        name: "registry",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "renounceOwnership",
        inputs: [],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "setInflationParameters",
        inputs: [
          {
            type: "uint256",
            name: "rate",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "updatePeriod",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "setRegistry",
        inputs: [
          {
            type: "address",
            name: "registryAddress",
            internalType: "address",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "string",
            name: "",
            internalType: "string",
          },
        ],
        name: "symbol",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "totalSupply",
        inputs: [],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "transfer",
        inputs: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "transferFrom",
        inputs: [
          {
            type: "address",
            name: "from",
            internalType: "address",
          },
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "transferOwnership",
        inputs: [
          {
            type: "address",
            name: "newOwner",
            internalType: "address",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [
          {
            type: "bool",
            name: "",
            internalType: "bool",
          },
        ],
        name: "transferWithComment",
        inputs: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "comment",
            internalType: "string",
          },
        ],
        constant: false,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "unitsToValue",
        inputs: [
          {
            type: "uint256",
            name: "units",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "address",
            name: "",
            internalType: "address",
          },
        ],
        name: "validatorSignerAddressFromCurrentSet",
        inputs: [
          {
            type: "uint256",
            name: "index",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "address",
            name: "",
            internalType: "address",
          },
        ],
        name: "validatorSignerAddressFromSet",
        inputs: [
          {
            type: "uint256",
            name: "index",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "blockNumber",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
      {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
          {
            type: "uint256",
            name: "",
            internalType: "uint256",
          },
        ],
        name: "valueToUnits",
        inputs: [
          {
            type: "uint256",
            name: "value",
            internalType: "uint256",
          },
        ],
        constant: true,
      },
    ],
  },
];

export interface Token {
  symbol: string;
  address: string;
  abi: any;
}
