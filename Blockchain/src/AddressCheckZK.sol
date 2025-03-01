// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AddressCheckZK is Ownable {
    mapping(address => bool) public blacklisted;
    mapping(address => bytes32) private passwordHashes;
    mapping(address => string) public email;
    address public initialOwner;

    event AddressBlacklisted(address indexed _addr);
    event PasswordSet(address indexed user);
    event PasswordUpdated(address indexed user);

    constructor(address _initialOwner) Ownable(_initialOwner) {
        initialOwner = _initialOwner;
    }

    modifier notBlacklisted() {
        require(!blacklisted[msg.sender], "You are blacklisted!");
        _;
    }

    function blacklistAddress(address _addr) public onlyOwner {
        blacklisted[_addr] = true;
        emit AddressBlacklisted(_addr);
    }

    function isAddressBlacklisted(address _addr) public view returns (bool) {
        return blacklisted[_addr];
    }

    function setPassword(bytes32 hashedPassword) public notBlacklisted {
        require(passwordHashes[msg.sender] == 0, "Password already set");
        passwordHashes[msg.sender] = hashedPassword;
        emit PasswordSet(msg.sender);
    }

    function verifyPassword(bytes32 hashedPassword) public view returns (bool) {
        return passwordHashes[msg.sender] == hashedPassword;
    }

    function updatePassword(bytes32 oldPasswordHash, bytes32 newPasswordHash) public notBlacklisted {
        require(passwordHashes[msg.sender] == oldPasswordHash, "Incorrect old password");
        passwordHashes[msg.sender] = newPasswordHash;
        emit PasswordUpdated(msg.sender);
    }

    function setEmail(address _address, string memory _email) public{
        email[_address] = _email;
    }

    function getEmail(address _address) public view returns(string memory){
        return email[_address];
    }
}