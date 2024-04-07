// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

contract BankIDMapping {
    
    mapping (uint256 => string) public bankToPassword;
    
    event BankPasswordSet(uint256 indexed bankID, string password);
    
    // Function to set password for a bank ID
    function setPassword(uint256 bankID, string memory password) public {
        bankToPassword[bankID] = password;
        emit BankPasswordSet(bankID, password);
    }


    // Function to validate entered ID and password
    function validateIDAndPassword(uint256 bankID, string memory password) public view returns (bool) {
        return keccak256(abi.encodePacked(bankToPassword[bankID])) == keccak256(abi.encodePacked(password));
    }
}
