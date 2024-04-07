var web3;
var contract;
console.log("Connected to Ethereum");
$(document).ready(function() {
    
    web3 = new Web3(web3.currentProvider);
    var contractAddress = "0x750640C314C210A36ab9bf071b007826a9ee8829"; 
    var contractABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "huid",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "oldAadhar",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newAadhar",
				"type": "uint256"
			}
		],
		"name": "AadharUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "aadhar",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "huid",
				"type": "string"
			}
		],
		"name": "HUIDAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "aadhar",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "huid",
				"type": "string"
			}
		],
		"name": "HUIDRemoved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "aadharToHUIDs",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aadhar",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "huid",
				"type": "string"
			}
		],
		"name": "addHUID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "huid",
				"type": "string"
			}
		],
		"name": "getAadhar",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aadhar",
				"type": "uint256"
			}
		],
		"name": "getHUIDs",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "huidToAadhar",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aadhar",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "huid",
				"type": "string"
			}
		],
		"name": "isHUIDCorresponding",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aadhar",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "huid",
				"type": "string"
			}
		],
		"name": "removeHUID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newAadhar",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "huid",
				"type": "string"
			}
		],
		"name": "updateAadhar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]; 

   contract = new web3.eth.Contract(contractABI, contractAddress);
});

function getHUIDs() {
    var aadhar = $('#aadharInput').val();
    
    if (aadhar) {
        contract.methods.getHUIDs(aadhar).call({ gas: 2000000 }).then(function(result) {
            $('#huidResult').html("HUIDs: " + result.join(', '));
            $('#resultBox').show(); // Display the result box
        }).catch(function(error) {
            console.error("Error:", error);
        });
    } else {
        alert("Please enter Aadhar Number");
    }
}
function isHUIDCorresponding() {
var aadhar1 = $('#aadharcheck').val();
var huid = $('#huidInput').val();


contract.methods.isHUIDCorresponding(aadhar1, huid).call().then(function(result) {

    if (result) {
        console.log("Authentication Result: Authentication successful");
        alert("Verification successful");
        window.location.href="approval.html";
    } else {
        console.log("Authentication Result: Verification failed");
        alert("Verification failed:HUID does not belong to the given Aadhaar number");
    }
}).catch(function(error) {
console.error("Error:", error);
});
}
function addHUID() {
    var userAccount;
    var aadhar2 = $('#aadharIn').val(); 
    var huid2 = $('#huidIn').val();
    var aadharNumber = parseInt(aadhar2);
    
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(function(accounts) {
        userAccount = accounts[0]; 
        

        contract.methods.addHUID(aadharNumber, huid2).send({ from: userAccount })
        .then(function () {
            console.log("HUID added successfully");
            alert("HUID added succesfully")

        })
        .catch(function (error) {
            console.error("Error:", error);
        });
    })
    .catch(function(error) {
        console.error("Error requesting accounts:", error);
    });
}
function updateAadhar(aadharN, Ownerhuid) {
    var userAccount;
    var currentOwnerName = $('#currentOwnerName').val();
    var currentOwnerAadhaar = $('#currentOwnerAadhaar').val();
    var Ownerhuid = $('#currentOwnerHUID').val();
    var newOwnerName = $('#newOwnerName').val();
    var newAadhaar = $('#newAadhaar').val();
    var aadharN= parseInt(newAadhaar);

    ethereum.request({ method: 'eth_requestAccounts' })
    .then(function(accounts) {
        userAccount = accounts[0]; 
 
        contract.methods.updateAadhar(aadharN, Ownerhuid).send({ from: userAccount })
        .then(function () {
            console.log("Aadhar updated successfully");
            openModal("Ownership Transferred Succesfully");
    
        })

        
        .catch(function (error) {
            console.error("Error:", error);
        });
    })
    .catch(function(error) {
        console.error("Error requesting accounts:", error);
    });
}
function removeHUID() {
    var currentOwnerAadhaar = $('#currentOwnerAadhaar').val();
    var currentOwnerHUID = $('#currentOwnerHUID').val();
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(function(accounts) {
        var userAccount = accounts[0];

        contract.methods.removeHUID(currentOwnerAadhaar, currentOwnerHUID).send({ from: userAccount })
        .then(function(receipt) {
            // If successful, display success message
            console.log("HUID removed successfully.");
            alert("HUID removed successfully.");
        })
        .catch(function(error) {
            // If error occurs, display the reason
            console.error("Error: ", error.message);
            alert("Error: " + error.message);
        });
    })
    .catch(function(error) {
        console.error("Error requesting accounts:", error);
    });
}
function getAadhar() {
    var huid = $('#huidInput').val();
    
    if (huid) {
        contract.methods.getAadhar(huid).call({ gas: 2000000 }).then(function(result) {
            $('#aadharResult').html("Aadhar Number: " + result);
            $('#resultBox').show(); // Display the result box
        }).catch(function(error) {
            console.error("Error:", error);
        });
    } else {
        alert("Please enter HUID");
    }
}