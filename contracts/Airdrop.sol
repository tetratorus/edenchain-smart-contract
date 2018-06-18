pragma solidity ^0.4.24;


contract ERC20 {
  function transfer(address _recipient, uint256 _value) public returns (bool success);
}

contract Airdrop {
  function drop(address _tokenAddress, address[] recipients, uint256[] values) public {
    ERC20 token = ERC20(_tokenAddress);
    for (uint256 i = 0; i < recipients.length; i++) {
      token.transfer(recipients[i], values[i]);
    }
  }
}