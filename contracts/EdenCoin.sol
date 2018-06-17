pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract EdenCoin is StandardToken, Ownable {

    string public name;
    string public symbol;
    uint8 public decimalFactor;

    constructor() {
        name = 'Eden Coin';
        symbol = 'EDEN';
        decimalFactor = 18;
        totalSupply_ = 1000000000 * decimalFactor;
    }
}