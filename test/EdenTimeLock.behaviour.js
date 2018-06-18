import assertRevert from '../helpers/assertRevert';
const BigNumber = web3.BigNumber;
const EdenCoin = artifacts.require('EdenCoin');
const EdenTimeLock = artifacts.require('EdenTimeLock');
const decimalFactor = new BigNumber(Math.pow(10, 18));
const timeTravel = require('../helpers/timeTravel')(web3);

contract('EdenTimeLock', function ([owner, recipient, anotherAccount]) {
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

  beforeEach(async function () {
    this.token = await EdenCoin.new();
    this.totalSupply = await this.token.totalSupply();
  });

  describe('timelock', function () {

    it('holds tokens', async function () {
      const timelock = await EdenTimeLock.new(this.token.address, recipient, 365);
      const ownerBalance = await this.token.balanceOf(owner);
      assert.equal(ownerBalance.toString(), this.totalSupply.toString());
      await this.token.transfer(timelock.address, 1000000 * decimalFactor);
      assert.equal(await this.token.balanceOf(timelock.address), 1000000 * decimalFactor);
    });

    it('reverts if timelock is not over', async function () {
      const timelock = await EdenTimeLock.new(this.token.address, recipient, 365)
      await this.token.transfer(timelock.address, 1000000 * decimalFactor);
      await assertRevert(timelock.release({from: recipient}));
    });

    it('transfers tokens if timelock has passed', async function () {
      const timelock = await EdenTimeLock.new(this.token.address, recipient, 365)
      await this.token.transfer(timelock.address, 1000000 * decimalFactor);
      await timeTravel(365 * 24 * 60 * 60);
      await timelock.release({from: recipient});
    });

    it('cannot be released twice', async function () {
      const timelock = await EdenTimeLock.new(this.token.address, recipient, 365)
      await this.token.transfer(timelock.address, 1000000 * decimalFactor);
      await timeTravel(365 * 24 * 60 * 60);
      await timelock.release();
      await assertRevert(timelock.release());
      const balance = await this.token.balanceOf(recipient);
      assert.equal(balance.toString(), (new BigNumber(1000000 * decimalFactor)).toString());
    });
  
  });
  
});
