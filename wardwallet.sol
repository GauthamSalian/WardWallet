// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WardWallet{
    //on-chain information
    struct ProposalData{
        bytes32 proposalId;
        string title;
        string ipfsHash;
        address proposer;
        uint256 budget;
        uint256 voteCount;
        uint256 reportCount;
        string status;
        uint48 timestamp;
        bytes32 approvalId;
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
     ) public {
        require(proposals[_id].proposer == address(0), "Proposal ID already exists.");
        proposals[_id] = ProposalData({
            proposalId: _id,
            title : _title,
            ipfsHash : _ipfsHash,
            proposer : msg.sender,
            budget : _budget,
            voteCount : 0,
            reportCount : 0,
            status : "open",
            timestamp : timestamp,
            approvalId:  0
        });
        proposalIds.push(_id);
    }

    //voting system
    function vote(
        bytes32 _id
    ) public {
        require(proposals[_id].proposer != address(0), "Proposal does not exist.");
        require(!hasVoted[_id][msg.sender], "Already voted.");
        proposals[_id].voteCount++;
        hasVoted[_id][msg.sender] = true;
    }

    struct ApprovalData{
        bytes32 approvalId;
        address official;
        address contractor;
        uint48 timestamp;
        bytes32 completionId;
    }

    mapping(bytes32 => ApprovalData) public approvals;
    bytes32[] public approvalIds;

    //approval system
    function approvalProposal(
        bytes32 _id,
        bytes32 _proposalId,
        address _contractor,
        uint48 _timestamp
    ) public {
        require(approvals[_id].contractor == address(0), "Approval ID already exists.");
        require(proposals[_proposalId].proposer != address(0), "Proposal does not exist.");
        require(proposals[_proposalId].approvalId == 0, "The proposal has already been approved.");

        approvals[_id] = ApprovalData({
            approvalId: _id,
            official: msg.sender,
            contractor: _contractor,
            timestamp: _timestamp,
            completionId: 0
        });
        proposals[_proposalId].approvalId = _id;
        proposals[_proposalId].status = "approved";
        approvalIds.push(_id);
    }

    //work completion verification
    struct CompletionData{
        bytes32 completionId;
        string completionNotesIpfsHash;
        uint48 timestamp;
    }

    mapping(bytes32 => CompletionData) public completions;
    bytes32[] public completionIds;

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
        approvals[_approvalId].completionId = _completionId;
        completionIds.push(_completionId);
    }

    struct ProjectHistory{
        ProposalData proposal;
        ApprovalData approval;
        CompletionData completion;
    }

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