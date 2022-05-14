pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenDistributor {
    address public owner;
    uint256 public balance;

    struct singleParticipant {
        address holder;
        string link;
    }

    uint256 curr_id = 0;
    mapping(uint256 => singleParticipant) Database;

    event TransferReceived(address _from, uint256 _amount);
    event TransferSent(address _from, address _destAddr, uint256 _amount);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        balance += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    }

    function withdraw(uint256 amount, address payable destAddr) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(amount <= balance, "Insufficient funds");

        destAddr.transfer(amount);
        balance -= amount;
        emit TransferSent(msg.sender, destAddr, amount);
    }

    function transferERC20(
        IERC20 token,
        address to,
        uint256 amount,
        string memory _link
    ) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        curr_id += 1;
        Database[curr_id].holder = to;
        Database[curr_id].link = _link;

        token.transfer(to, amount);
        emit TransferSent(msg.sender, to, amount);
    }
}
