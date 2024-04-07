// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

contract AadharToHUIDMapping {
    
    mapping (uint256 => string[]) public aadharToHUIDs;
    mapping (string => uint256) public huidToAadhar;
    event HUIDAdded(uint256 indexed aadhar, string huid);
    event HUIDRemoved(uint256 indexed aadhar, string huid);
    event AadharUpdated(string huid, uint256 oldAadhar, uint256 newAadhar);

    function addHUID(uint256 aadhar, string memory huid) public {
        require(huidToAadhar[huid] == 0, "HUID already associated with an Aadhar");
        aadharToHUIDs[aadhar].push(huid);
        huidToAadhar[huid] = aadhar;
        emit HUIDAdded(aadhar, huid);
    }

    function removeHUID(uint256 aadhar, string memory huid) public {
        require(huidToAadhar[huid] == aadhar, "HUID is not associated with provided Aadhar ID");
        
        // Delete mapping
        delete huidToAadhar[huid];
        for (uint256 i = 0; i < aadharToHUIDs[aadhar].length; i++) {
            if (keccak256(abi.encodePacked(aadharToHUIDs[aadhar][i])) == keccak256(abi.encodePacked(huid))) {
                delete aadharToHUIDs[aadhar][i];
                emit HUIDRemoved(aadhar, huid);
                break;
            }
        }
    }

    function getHUIDs(uint256 aadhar) public view returns (string[] memory) {
        return aadharToHUIDs[aadhar];
    }

    function getAadhar(string memory huid) public view returns (uint256) {
        return huidToAadhar[huid];
    }

    function isHUIDCorresponding(uint256 aadhar, string memory huid) public view returns (bool) {
        return huidToAadhar[huid] == aadhar;
    }
    function updateAadhar(uint256 newAadhar, string memory huid) public {
        uint256 oldAadhar = huidToAadhar[huid];
        require(oldAadhar != 0, "HUID not associated with any Aadhar");
        require(oldAadhar != newAadhar, "New Aadhar is same as old Aadhar");

        // Check if provided Aadhar corresponds to the given HUID
        bool success = isHUIDCorresponding(oldAadhar, huid);
        require(success, "Provided Aadhar does not correspond to the given HUID");
        // Remove old Aadhar association and update to new Aadhar
        delete huidToAadhar[huid];
        huidToAadhar[huid] = newAadhar;

        // Remove old Aadhar from HUID mapping
        string[] storage huids = aadharToHUIDs[oldAadhar];
        for (uint256 i = 0; i < huids.length; i++) {
            if (keccak256(bytes(huids[i])) == keccak256(bytes(huid))) {
                huids[i] = huids[huids.length - 1];
                huids.pop();
                break;
            }
        }

        // Add new Aadhar to HUID mapping
        aadharToHUIDs[newAadhar].push(huid);

        emit AadharUpdated(huid, oldAadhar, newAadhar);
    }
}
 