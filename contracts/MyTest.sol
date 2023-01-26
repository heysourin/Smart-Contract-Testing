// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import "hardhat/console.sol";

contract MyTest {
    uint256 public unlocktime ;
    address payable public owner;

    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable{
        require(block.timestamp < _unlockTime,"Unlock time should be in future");

        unlocktime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public{
        require(block.timestamp >= unlocktime, "Wait till the time period to be completed");
        require(msg.sender == owner, "You are not the owner");

        emit Withdrawal(address(this).balance, block.timestamp);
    }
}
