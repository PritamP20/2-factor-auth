// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/AddressCheckZK.sol";

contract TestContract is Test {
    AddressCheckZK c;
    address testAddress = address(0x204E8DEf7E6c467cEbCeBbC5c89ad86Bf3003FE3);

    function setUp() public {
        c = new AddressCheckZK(address(0x204E8DEf7E6c467cEbCeBbC5c89ad86Bf3003FE3));
    }

    function testBlacklistAddress() public {
        bool info = c.isAddressBlacklisted(testAddress);
        assertTrue(info==false, "Address should not be blacklisted");

        vm.prank(testAddress);
        c.blacklistAddress(testAddress);

        info = c.isAddressBlacklisted(testAddress);
        assertTrue(info==true, "Address should be blacklisted");
    }

    function testSetPassword() public {
        c.setPassword(bytes32("hello"));

        bool info = c.verifyPassword(bytes32("hello"));
        assertTrue(info==true);  
    }


}
