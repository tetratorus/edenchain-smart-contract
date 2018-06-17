var HDWalletProvider = require('truffle-hdwallet-provider');
var secrets = require('./secrets.json');

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(secrets.mnemonic, "https://ropsten.infura.io/" + secrets.infura_key, 2);
      },
      network_id: '*',
      gas: 3500000,
      gasPrice: 50000000000,
    }
  } 
};
