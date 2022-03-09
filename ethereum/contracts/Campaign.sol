// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        deployedCampaigns.push(address(new Campaign(minimum, msg.sender)));
    }

    function getDeployedCampaigns() public view returns  (address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{

    struct Request{
        string description;
        address recipient;
        uint value;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    mapping (uint => Request) public requests;
    uint public requestCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creator)  {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable { 
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) 
        public restricted {
        Request storage newRequest = requests[requestCount++];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient= recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage req = requests[index];

        require(approvers[msg.sender]);
        require(!req.approvals[msg.sender]);

        req.approvalCount++;
        req.approvals[msg.sender] = true;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage req = requests[index];

        require(!req.complete);
        require(req.approvalCount > (approversCount/2));

        payable(req.recipient).transfer(req.value);
        req.complete = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address){
        return(
            minimumContribution,
            address(this).balance,
            requestCount,
            approversCount,
            manager
        );
    }
}