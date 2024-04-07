// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

contract JewelleryIDMapping {
    
    mapping (uint256 => string) public jewelleryToPassword;
    event JewelleryPasswordSet(uint256 indexed jewelleryID, string password);
    
    // Function to set password for a jewellery ID
    function setPassword(uint256 jewelleryID, string memory password) public {
        jewelleryToPassword[jewelleryID] = password;
        emit JewelleryPasswordSet(jewelleryID, password);
    }

    
    // Function to validate entered ID and password
    function validateIDAndPassword(uint256 jewelleryID, string memory password) public view returns (bool) {
        return keccak256(abi.encodePacked(jewelleryToPassword[jewelleryID])) == keccak256(abi.encodePacked(password));
    }
}