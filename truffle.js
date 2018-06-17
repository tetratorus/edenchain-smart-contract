var HDWalletProvider = require('truffle-hdwallet-provider');
var secrets = require('./secrets.json');

console.log(secrets);

module.exports = {
  networks: {
    ropsten: {
      provider: new HDWalletProvider(secrets.mnemonic, "https://ropsten.infura.io/" + secrets.infura_key, 2),
      network_id: '*',
      gas: 3500000,
      gasPrice: 50000000000,
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  }, 
};
