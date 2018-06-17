const HDWalletProvider = require("truffle-hdwallet-provider");
const secrets = require('./secrets.json');
const mnemonic = secrets.mnemonic;
const key = secrets.infura_key;

module.exports = {
  networks: {
   development: {
      host: 'localhost',
      port: 7545,
      network_id: '*', // Match any network id
      gas: 3500000,
    },
   ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + key),
      network_id: '*',
      gas: 3500000,
      gasPrice: 50000000000,
    },
    rinkeby: {
       provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + key),
       network_id: '*',
       gas: 3500000,
       gasPrice: 5000000000,
     },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
