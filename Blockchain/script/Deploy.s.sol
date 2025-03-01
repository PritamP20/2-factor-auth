pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AddressCheckZK} from "../src/AddressCheckZK.sol";

contract Deploy is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        console.log("Deployer address:", deployer);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        AddressCheckZK deployedContract = new AddressCheckZK(deployer);

        vm.stopBroadcast();

        console.log("Contract deployed at address:", address(deployedContract));
    }
}


// https://sepolia.etherscan.io/address/0x1b84f2de90d9b0302ccd864ba20c83c87aa2d9ed