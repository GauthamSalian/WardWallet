import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MyContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const myContractAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'official',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'isNowOfficial',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'OfficialChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'contractor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PaymentReleased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'approvalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'proposalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'ProposalApproved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'proposer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProposalCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'ProposalRejected',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'reporter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Reported',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Voted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'approvalId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'WorkCompleted',
  },
  {
    type: 'function',
    inputs: [
      { name: '_official', internalType: 'address', type: 'address' },
      { name: '_isOfficial', internalType: 'bool', type: 'bool' },
    ],
    name: 'addOfficial',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'approvalIds',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'bytes32', type: 'bytes32' },
      { name: '_proposalId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_contractor', internalType: 'address', type: 'address' },
      { name: '_timestamp', internalType: 'uint48', type: 'uint48' },
    ],
    name: 'approvalProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'approvals',
    outputs: [
      { name: 'approvalId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proposalId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'completionId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'official', internalType: 'address', type: 'address' },
      { name: 'contractor', internalType: 'address', type: 'address' },
      { name: 'timestamp', internalType: 'uint48', type: 'uint48' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'completionIds',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'completions',
    outputs: [
      { name: 'completionId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'completionNotesIpfsHash',
        internalType: 'string',
        type: 'string',
      },
      { name: 'timestamp', internalType: 'uint48', type: 'uint48' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'bytes32', type: 'bytes32' },
      { name: '_title', internalType: 'string', type: 'string' },
      { name: '_ipfsHash', internalType: 'string', type: 'string' },
      { name: '_budget', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint48', type: 'uint48' },
    ],
    name: 'createProposal',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fundRewardPool',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_proposalId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getProjectHistory',
    outputs: [
      {
        name: '',
        internalType: 'struct WardWalleT.ProjectHistory',
        type: 'tuple',
        components: [
          {
            name: 'proposal',
            internalType: 'struct WardWalleT.ProposalData',
            type: 'tuple',
            components: [
              { name: 'proposalId', internalType: 'bytes32', type: 'bytes32' },
              { name: 'approvalId', internalType: 'bytes32', type: 'bytes32' },
              { name: 'status', internalType: 'string', type: 'string' },
              { name: 'title', internalType: 'string', type: 'string' },
              { name: 'ipfsHash', internalType: 'string', type: 'string' },
              { name: 'budget', internalType: 'uint256', type: 'uint256' },
              { name: 'bondAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
              { name: 'reportCount', internalType: 'uint256', type: 'uint256' },
              { name: 'proposer', internalType: 'address', type: 'address' },
              { name: 'timestamp', internalType: 'uint48', type: 'uint48' },
            ],
          },
          {
            name: 'approval',
            internalType: 'struct WardWalleT.ApprovalData',
            type: 'tuple',
            components: [
              { name: 'approvalId', internalType: 'bytes32', type: 'bytes32' },
              { name: 'proposalId', internalType: 'bytes32', type: 'bytes32' },
              {
                name: 'completionId',
                internalType: 'bytes32',
                type: 'bytes32',
              },
              { name: 'official', internalType: 'address', type: 'address' },
              { name: 'contractor', internalType: 'address', type: 'address' },
              { name: 'timestamp', internalType: 'uint48', type: 'uint48' },
            ],
          },
          {
            name: 'completion',
            internalType: 'struct WardWalleT.CompletionData',
            type: 'tuple',
            components: [
              {
                name: 'completionId',
                internalType: 'bytes32',
                type: 'bytes32',
              },
              {
                name: 'completionNotesIpfsHash',
                internalType: 'string',
                type: 'string',
              },
              { name: 'timestamp', internalType: 'uint48', type: 'uint48' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'hasReported',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'hasVoted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isOfficial',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_completionId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_approvalId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_completionNotesIpfsHash',
        internalType: 'string',
        type: 'string',
      },
      { name: '_timestamp', internalType: 'uint48', type: 'uint48' },
    ],
    name: 'markAsComplete',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proposalBondAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposalBudget',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'proposalIds',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposals',
    outputs: [
      { name: 'proposalId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'approvalId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'status', internalType: 'string', type: 'string' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'ipfsHash', internalType: 'string', type: 'string' },
      { name: 'budget', internalType: 'uint256', type: 'uint256' },
      { name: 'bondAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
      { name: 'reportCount', internalType: 'uint256', type: 'uint256' },
      { name: 'proposer', internalType: 'address', type: 'address' },
      { name: 'timestamp', internalType: 'uint48', type: 'uint48' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_proposalId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'rejectProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_approvalId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'releasePayment',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'report',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__
 */
export const useReadMyContract = /*#__PURE__*/ createUseReadContract({
  abi: myContractAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"approvalIds"`
 */
export const useReadMyContractApprovalIds = /*#__PURE__*/ createUseReadContract(
  { abi: myContractAbi, functionName: 'approvalIds' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"approvals"`
 */
export const useReadMyContractApprovals = /*#__PURE__*/ createUseReadContract({
  abi: myContractAbi,
  functionName: 'approvals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"completionIds"`
 */
export const useReadMyContractCompletionIds =
  /*#__PURE__*/ createUseReadContract({
    abi: myContractAbi,
    functionName: 'completionIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"completions"`
 */
export const useReadMyContractCompletions = /*#__PURE__*/ createUseReadContract(
  { abi: myContractAbi, functionName: 'completions' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"contractOwner"`
 */
export const useReadMyContractContractOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: myContractAbi,
    functionName: 'contractOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"getProjectHistory"`
 */
export const useReadMyContractGetProjectHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: myContractAbi,
    functionName: 'getProjectHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"hasReported"`
 */
export const useReadMyContractHasReported = /*#__PURE__*/ createUseReadContract(
  { abi: myContractAbi, functionName: 'hasReported' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"hasVoted"`
 */
export const useReadMyContractHasVoted = /*#__PURE__*/ createUseReadContract({
  abi: myContractAbi,
  functionName: 'hasVoted',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"isOfficial"`
 */
export const useReadMyContractIsOfficial = /*#__PURE__*/ createUseReadContract({
  abi: myContractAbi,
  functionName: 'isOfficial',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"proposalBondAmount"`
 */
export const useReadMyContractProposalBondAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: myContractAbi,
    functionName: 'proposalBondAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"proposalBudget"`
 */
export const useReadMyContractProposalBudget =
  /*#__PURE__*/ createUseReadContract({
    abi: myContractAbi,
    functionName: 'proposalBudget',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"proposalIds"`
 */
export const useReadMyContractProposalIds = /*#__PURE__*/ createUseReadContract(
  { abi: myContractAbi, functionName: 'proposalIds' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"proposals"`
 */
export const useReadMyContractProposals = /*#__PURE__*/ createUseReadContract({
  abi: myContractAbi,
  functionName: 'proposals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"rewardAmount"`
 */
export const useReadMyContractRewardAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: myContractAbi,
    functionName: 'rewardAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"rewardPool"`
 */
export const useReadMyContractRewardPool = /*#__PURE__*/ createUseReadContract({
  abi: myContractAbi,
  functionName: 'rewardPool',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__
 */
export const useWriteMyContract = /*#__PURE__*/ createUseWriteContract({
  abi: myContractAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"addOfficial"`
 */
export const useWriteMyContractAddOfficial =
  /*#__PURE__*/ createUseWriteContract({
    abi: myContractAbi,
    functionName: 'addOfficial',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"approvalProposal"`
 */
export const useWriteMyContractApprovalProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: myContractAbi,
    functionName: 'approvalProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"createProposal"`
 */
export const useWriteMyContractCreateProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: myContractAbi,
    functionName: 'createProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"fundRewardPool"`
 */
export const useWriteMyContractFundRewardPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: myContractAbi,
    functionName: 'fundRewardPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"markAsComplete"`
 */
export const useWriteMyContractMarkAsComplete =
  /*#__PURE__*/ createUseWriteContract({
    abi: myContractAbi,
    functionName: 'markAsComplete',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"rejectProposal"`
 */
export const useWriteMyContractRejectProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: myContractAbi,
    functionName: 'rejectProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"releasePayment"`
 */
export const useWriteMyContractReleasePayment =
  /*#__PURE__*/ createUseWriteContract({
    abi: myContractAbi,
    functionName: 'releasePayment',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"report"`
 */
export const useWriteMyContractReport = /*#__PURE__*/ createUseWriteContract({
  abi: myContractAbi,
  functionName: 'report',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"vote"`
 */
export const useWriteMyContractVote = /*#__PURE__*/ createUseWriteContract({
  abi: myContractAbi,
  functionName: 'vote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__
 */
export const useSimulateMyContract = /*#__PURE__*/ createUseSimulateContract({
  abi: myContractAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"addOfficial"`
 */
export const useSimulateMyContractAddOfficial =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'addOfficial',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"approvalProposal"`
 */
export const useSimulateMyContractApprovalProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'approvalProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"createProposal"`
 */
export const useSimulateMyContractCreateProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'createProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"fundRewardPool"`
 */
export const useSimulateMyContractFundRewardPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'fundRewardPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"markAsComplete"`
 */
export const useSimulateMyContractMarkAsComplete =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'markAsComplete',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"rejectProposal"`
 */
export const useSimulateMyContractRejectProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'rejectProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"releasePayment"`
 */
export const useSimulateMyContractReleasePayment =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'releasePayment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"report"`
 */
export const useSimulateMyContractReport =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'report',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myContractAbi}__ and `functionName` set to `"vote"`
 */
export const useSimulateMyContractVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myContractAbi,
    functionName: 'vote',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__
 */
export const useWatchMyContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: myContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__ and `eventName` set to `"OfficialChanged"`
 */
export const useWatchMyContractOfficialChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myContractAbi,
    eventName: 'OfficialChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__ and `eventName` set to `"PaymentReleased"`
 */
export const useWatchMyContractPaymentReleasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myContractAbi,
    eventName: 'PaymentReleased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__ and `eventName` set to `"ProposalApproved"`
 */
export const useWatchMyContractProposalApprovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myContractAbi,
    eventName: 'ProposalApproved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__ and `eventName` set to `"ProposalCreated"`
 */
export const useWatchMyContractProposalCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myContractAbi,
    eventName: 'ProposalCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__ and `eventName` set to `"ProposalRejected"`
 */
export const useWatchMyContractProposalRejectedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myContractAbi,
    eventName: 'ProposalRejected',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__ and `eventName` set to `"Reported"`
 */
export const useWatchMyContractReportedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myContractAbi,
    eventName: 'Reported',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__ and `eventName` set to `"Voted"`
 */
export const useWatchMyContractVotedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myContractAbi,
    eventName: 'Voted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myContractAbi}__ and `eventName` set to `"WorkCompleted"`
 */
export const useWatchMyContractWorkCompletedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myContractAbi,
    eventName: 'WorkCompleted',
  })
