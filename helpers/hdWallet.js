const secrets = require('../secrets.json');
const hdkey = require('ethereumjs-wallet/hdkey');
const hdWallet = hdkey.fromMasterSeed(secrets.account_generation_mnemonic);

module.exports = {
  hdWallet,
  getChildWallet: (index) => hdWallet.deriveChild(index).getWallet()
};