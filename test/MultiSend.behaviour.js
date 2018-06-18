import assertRevert from '../helpers/assertRevert';
const BigNumber = web3.BigNumber;
const MultiSend = artifacts.require('MultiSend');
const EdenCoin = artifacts.require('EdenCoin');
const decimalFactor = new BigNumber(Math.pow(10, 18));
const totalTokens = Math.pow(10, 9);
const totalSupply = decimalFactor.times(totalTokens);
const ethUtils = require('ethereumjs-util');
const hdWalletHelpers = require('../helpers/hdWallet');

contract('MultiSend', function ([owner, recipient, anotherAccount]) {

  beforeEach(async function () {
    this.multiSend = await MultiSend.new();
    this.token = await EdenCoin.new();
    this.testAccounts = [];
    for (let i = 0; i < 4000; i++) {
      let childWallet = hdWalletHelpers.getChildWallet(i);
      this.testAccounts.push([
        childWallet.getPrivateKey().toString('hex'),
        childWallet.getPublicKey().toString('hex'),
        '0x' + ethUtils.pubToAddress(childWallet.getPublicKey()).toString('hex')
      ]);
    }
  });

  describe('ownership', function () {
    it('belongs to owner', async function () {
      assert.equal(await this.multiSend.owner(), owner);
    });
  });

  describe('distribution', function () {
    it('can receive tokens', async function () {
      await this.token.transfer(this.multiSend.address, totalSupply);
      assert.equal((await this.token.balanceOf(this.multiSend.address)).toNumber(), totalSupply.toNumber());
    });

    it('can only be called by owner', async function () {
      await this.token.transfer(this.multiSend.address, totalSupply);
      await assertRevert(this.multiSend.transferMultiple(
        this.token.address,
        [this.testAccounts[0][2], this.testAccounts[1][2]],
        [decimalFactor.times(10), decimalFactor.times(10)],
        {from: anotherAccount}
      ));
    });

    it('can send tokens', async function () {
      await this.token.transfer(this.multiSend.address, totalSupply);
      const randomizedAmounts = [];
      for (let i = 0; i < 50; i++) {
        randomizedAmounts.push(decimalFactor.times(Math.floor(Math.random() * 10000)));
      }
      const accountAddresses = this.testAccounts.map(function (account) {
        return account[2];
      }).slice(0, 50);
      await this.multiSend.transferMultiple(
        this.token.address,
        accountAddresses,
        randomizedAmounts
      );
      for (let j = 0; j < 50; j++) {
        assert.equal((await this.token.balanceOf(accountAddresses[j])).toNumber(), randomizedAmounts[j].toNumber());
      }
    });
  });

});
