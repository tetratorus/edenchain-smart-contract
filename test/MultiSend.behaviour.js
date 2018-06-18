import assertRevert from '../helpers/assertRevert';
const BigNumber = web3.BigNumber;
const MultiSend = artifacts.require('MultiSend');
const decimalFactor = new BigNumber(Math.pow(10, 18));

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
