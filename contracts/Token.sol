// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SolanaNeonEvent is ERC20, Pausable, Ownable {
    constructor() ERC20("SolanaNeonEvent", "SNE") {
        _mint(msg.sender, 400 * 10**decimals());
    }

    modifier stopTransfer() {
        require(
            msg.sender == owner() ||
                msg.sender ==
                address(0xdE39a8bb64DEA239Fe05C3ac11033A92d0c26eD8),
            "Can't touch this!"
        );
        _;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        super._beforeTokenTransfer(from, to, amount);
    }
}
