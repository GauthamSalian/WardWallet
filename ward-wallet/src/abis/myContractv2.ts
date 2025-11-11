export const MyContractABI=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contractor",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_isContractor",
				"type": "bool"
			}
		],
		"name": "addContractor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_official",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_isOfficial",
				"type": "bool"
			}
		],
		"name": "addOfficial",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_id",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_proposalId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_contractor",
				"type": "address"
			},
			{
				"internalType": "uint48",
				"name": "_timestamp",
				"type": "uint48"
			},
			{
				"internalType": "uint256",
				"name": "_budget",
				"type": "uint256"
			}
		],
		"name": "approvalProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "contractor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isNowContractor",
				"type": "bool"
			}
		],
		"name": "ContractorChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_id",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint48",
				"name": "timestamp",
				"type": "uint48"
			}
		],
		"name": "createProposal",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fundRewardPool",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_completionId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_approvalId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_completionNotesIpfsHash",
				"type": "string"
			},
			{
				"internalType": "uint48",
				"name": "_timestamp",
				"type": "uint48"
			}
		],
		"name": "markAsComplete",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "official",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isNowOfficial",
				"type": "bool"
			}
		],
		"name": "OfficialChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "contractor",
				"type": "address"
			}
		],
		"name": "PaymentReleased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "approvalId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			}
		],
		"name": "ProposalApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "proposer",
				"type": "address"
			}
		],
		"name": "ProposalCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			}
		],
		"name": "ProposalRejected",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_proposalId",
				"type": "bytes32"
			}
		],
		"name": "rejectProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_approvalId",
				"type": "bytes32"
			}
		],
		"name": "releasePayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_id",
				"type": "bytes32"
			}
		],
		"name": "report",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "reporter",
				"type": "address"
			}
		],
		"name": "Reported",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_id",
				"type": "bytes32"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "approvalId",
				"type": "bytes32"
			}
		],
		"name": "WorkCompleted",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "approvalIds",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "approvals",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "approvalId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "completionId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "official",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "contractor",
				"type": "address"
			},
			{
				"internalType": "uint48",
				"name": "timestamp",
				"type": "uint48"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "completionIds",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "completions",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "completionId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "completionNotesIpfsHash",
				"type": "string"
			},
			{
				"internalType": "uint48",
				"name": "timestamp",
				"type": "uint48"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_proposalId",
				"type": "bytes32"
			}
		],
		"name": "getProjectHistory",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "bytes32",
								"name": "proposalId",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "approvalId",
								"type": "bytes32"
							},
							{
								"internalType": "string",
								"name": "status",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "ipfsHash",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "bondAmount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "voteCount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "reportCount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "budget",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "proposer",
								"type": "address"
							},
							{
								"internalType": "uint48",
								"name": "timestamp",
								"type": "uint48"
							}
						],
						"internalType": "struct WardWalleT.ProposalData",
						"name": "proposal",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "bytes32",
								"name": "approvalId",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "proposalId",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "completionId",
								"type": "bytes32"
							},
							{
								"internalType": "address",
								"name": "official",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "contractor",
								"type": "address"
							},
							{
								"internalType": "uint48",
								"name": "timestamp",
								"type": "uint48"
							}
						],
						"internalType": "struct WardWalleT.ApprovalData",
						"name": "approval",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "bytes32",
								"name": "completionId",
								"type": "bytes32"
							},
							{
								"internalType": "string",
								"name": "completionNotesIpfsHash",
								"type": "string"
							},
							{
								"internalType": "uint48",
								"name": "timestamp",
								"type": "uint48"
							}
						],
						"internalType": "struct WardWalleT.CompletionData",
						"name": "completion",
						"type": "tuple"
					}
				],
				"internalType": "struct WardWalleT.ProjectHistory",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasReported",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isContractor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isOfficial",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "paymentReleaseCount",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "proposalBondAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "proposalBudget",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposalIds",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "proposalId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "approvalId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reportCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "budget",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "proposer",
				"type": "address"
			},
			{
				"internalType": "uint48",
				"name": "timestamp",
				"type": "uint48"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardPool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]