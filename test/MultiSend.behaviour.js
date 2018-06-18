import assertRevert from '../helpers/assertRevert';
const BigNumber = web3.BigNumber;
const MultiSend = artifacts.require('MultiSend');
const decimalFactor = new BigNumber(Math.pow(10, 18));
const ethUtils = require('ethereumjs-util');
const hdWalletHelpers = require('../helpers/hdWallet');
const fakeAccounts = [];
for (let i = 0; i < 4000; i++) {
  let childWallet = hdWalletHelpers.getChildWallet(i);
  fakeAccounts.push([
    childWallet.getPrivateKey().toString('hex'),
    childWallet.getPublicKey().toString('hex'),
    ethUtils.pubToAddress(childWallet.getPublicKey()).toString('hex')
  ]);
}

contract('MultiSend', function ([owner, recipient, anotherAccount]) {

  beforeEach(async function () {
    this.multiSend = await MultiSend.new();
  });

  describe('ownership', function () {
    it('belongs to owner', async function () {
      assert.equal(await this.multiSend.owner(), owner);
    });
  });

});
