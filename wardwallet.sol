// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WardWallet{
    //sets the contract deployer as the owner
    address public contractOwner;
    uint256 public proposalBondAmount;
    uint256 public rewardPool;
    uint256 public rewardAmount;
    constructor() {
        contractOwner = msg.sender;
        proposalBondAmount = 10000;
        rewardAmount = 5000;
    }

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Not owner");
        _;
    }

    //mapping to store approved official address
    mapping(address => bool) public isOfficial;

    modifier onlyOfficial() {
        require(isOfficial[msg.sender], "Not official");
        _;
    }

    //method for owner to add officials
    function addOfficial(address _official, bool _isOfficial) external onlyOwner {
        require(_official != address(0), "Invalid address");
        isOfficial[_official] = _isOfficial;
        emit OfficialChanged(_official, _isOfficial);
    }

    //events to inform changes to frontend
    event ProposalCreated(bytes32 proposalId, address proposer);
    event ProposalApproved(bytes32 approvalId, bytes32 proposalId);
    event Voted(bytes32 proposalId, address voter);
    event Reported(bytes32 proposalId, address reporter);
    event WorkCompleted(bytes32 proposalId, bytes32 approvalId);
    event OfficialChanged(address indexed official, bool isNowOfficial);
    event PaymentReleased(bytes32 proposalId, address contractor);
    event ProposalRejected(bytes32 proposalId);

    //mapping to link budget with the proposalId
    mapping(bytes32 => uint256) public proposalBudget;

    //receives ether to fund the contract's treasury
    receive() external payable { }

    //receive funds from donors to the reward pool to reward good citizens
    function fundRewardPool() external payable{
        rewardPool += msg.value;
    }

    //on-chain information
    struct ProposalData{
        bytes32 proposalId;
        bytes32 approvalId;
        string status;
        string title;
        string ipfsHash;
        uint256 budget;
        uint256 bondAmount;
        uint256 voteCount;
        uint256 reportCount;
        address proposer;
        uint48 timestamp;
    }

    //mapping to look up any proposal by it's id
    mapping(bytes32 => ProposalData) public proposals;

    //a list to collect all proposals
    bytes32[] public proposalIds;

    //a mapping to store the trust score the trust score
    mapping(bytes32 => mapping(address => bool)) public hasVoted;

    //give values to proposal
    function createProposal(
        bytes32 _id,
        string memory _title,
        string memory _ipfsHash,
        uint256 _budget,
        uint48 timestamp
     ) public payable{ 
        require(proposals[_id].proposer == address(0), "Proposal ID already exists.");
        require(msg.value == proposalBondAmount, "Invalid Bond Amount");
        proposals[_id] = ProposalData({
            proposalId: _id,
            title : _title,
            ipfsHash : _ipfsHash,
            proposer : msg.sender,
            budget : _budget,
            bondAmount: msg.value,
            voteCount : 0,
            reportCount : 0,
            status : "open",
            timestamp : timestamp,
            approvalId:  0
        });
        proposalIds.push(_id);
        emit ProposalCreated(_id, msg.sender);
    }

    //voting system
    function vote(
        bytes32 _id
    ) public {
        require(proposals[_id].proposer != address(0), "Proposal does not exist.");
        require(!hasVoted[_id][msg.sender], "Already voted.");
        proposals[_id].voteCount++;
        hasVoted[_id][msg.sender] = true;
        emit Voted(_id, msg.sender);
    }

    //reporting system
    mapping(bytes32 => mapping(address => bool)) public hasReported;
    function report(
        bytes32 _id
    ) public {
        require(proposals[_id].proposer != address(0), "Proposal does not exist.");
        require(!hasReported[_id][msg.sender], "Already reported.");
        proposals[_id].reportCount++;
        hasReported[_id][msg.sender] = true;
        emit Reported(_id, msg.sender);
    }

    function rejectProposal(bytes32 _proposalId) public onlyOfficial {
        require(proposals[_proposalId].proposer != address(0), "Proposal doesn't exist");
        require(proposals[_proposalId].approvalId == 0, "Proposal already approved");
        require(proposals[_proposalId].bondAmount > 0, "Bond already processed");

        rewardPool += proposals[_proposalId].bondAmount;
        proposals[_proposalId].bondAmount = 0;
        proposals[_proposalId].status = "rejected";

        emit ProposalRejected(_proposalId);
    }

    struct ApprovalData{
        bytes32 approvalId;
        bytes32 proposalId;
        bytes32 completionId;
        address official;
        address contractor;
        uint48 timestamp;
    }

    mapping(bytes32 => ApprovalData) public approvals;
    bytes32[] public approvalIds;

    //approval system
    function approvalProposal(
        bytes32 _id,
        bytes32 _proposalId,
        address _contractor,
        uint48 _timestamp
    ) public onlyOfficial{
        require(approvals[_id].contractor == address(0), "Approval ID already exists.");
        require(proposals[_proposalId].proposer != address(0), "Proposal does not exist.");
        require(proposals[_proposalId].approvalId == 0, "The proposal has already been approved.");

        require(address(this).balance >= proposals[_proposalId].budget, "insufficient balance");
        proposalBudget[_proposalId] = proposals[_proposalId].budget;

        approvals[_id] = ApprovalData({
            approvalId: _id,
            official: msg.sender,
            proposalId: _proposalId,
            contractor: _contractor,
            timestamp: _timestamp,
            completionId: 0
        });
        proposals[_proposalId].approvalId = _id;
        proposals[_proposalId].status = "approved";
        approvalIds.push(_id);
        emit ProposalApproved(_id, _proposalId);
    }

    //work completion verification
    struct CompletionData{
        bytes32 completionId;
        string completionNotesIpfsHash;
        uint48 timestamp;
    }

    mapping(bytes32 => CompletionData) public completions;
    bytes32[] public completionIds;

    //mark the completion of the project
    function markAsComplete(
        bytes32 _completionId,
        bytes32 _approvalId,
        string memory _completionNotesIpfsHash,
        uint48 _timestamp
    ) public {
        require(approvals[_approvalId].official != address(0), "Approval does not exist.");
        require(msg.sender == approvals[_approvalId].contractor, "Only the contractor can mark the work as complete.");
        require(approvals[_approvalId].completionId == 0, "Proposal has already been completed.");
        require(completions[_completionId].completionId == bytes32(0), "Completion already exists.");

        completions[_completionId] = CompletionData({
            completionId: _completionId,
            completionNotesIpfsHash: _completionNotesIpfsHash,
            timestamp: _timestamp
        });

        proposals[approvals[_approvalId].proposalId].status = "pending_payment";

        approvals[_approvalId].completionId = _completionId;
        completionIds.push(_completionId);
        emit WorkCompleted(_completionId, _approvalId);
    }

    struct ProjectHistory{
        ProposalData proposal;
        ApprovalData approval;
        CompletionData completion;
    }

    //function to release payment to contractor and the citizen who proposed the proposal after the work has been completed
    function releasePayment(
        bytes32 _approvalId
    ) public onlyOfficial {
        ApprovalData memory appData = approvals[_approvalId];
        require(appData.completionId != 0, "Project has not yet been completed.");

        bytes32 proposalId = appData.proposalId;
        ProposalData storage prop = proposals[proposalId];

        uint256 payAmount = proposalBudget[proposalId];
        uint256 refundAmount = prop.bondAmount;

        require(payAmount > 0, "Payment already made.");
        require(rewardPool >= rewardAmount, "Insufficient reward pool");

        proposalBudget[proposalId] = 0;
        prop.bondAmount = 0;
        prop.status = "completed";
        rewardPool -= rewardAmount;

        //Interactiond from AI
        (bool successPay, ) = appData.contractor.call{value: payAmount}("");
        require(successPay, "Contractor payment failed");

        (bool successRefund, ) = prop.proposer.call{value: refundAmount}("");
        require(successRefund, "Bond refund failed");

        (bool successReward, ) = prop.proposer.call{value: rewardAmount}("");
        require(successReward, "Reward payment failed");

        emit PaymentReleased(proposalId, appData.contractor);
    }

    //get the entire history of a project
    function getProjectHistory(
        bytes32 _proposalId
    ) public view returns (ProjectHistory memory) {
        require(proposals[_proposalId].proposer != address(0), "Proposal doesn't exist");
        ProjectHistory memory history;

        history.proposal = proposals[_proposalId];

        bytes32 approvalId = history.proposal.approvalId;
        if (approvalId != 0){
            history.approval = approvals[approvalId];
        }else{
            return history;
        }

        bytes32 completionId = history.approval.completionId;
        if (completionId != 0){
            history.completion = completions[completionId];
        }else{
            return history;
        } 

        return history; 
    }
}
