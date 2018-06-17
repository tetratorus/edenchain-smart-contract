var EdenCoin = artifacts.require("./EdenCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(EdenCoin);
};
