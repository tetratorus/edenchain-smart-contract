import assertRevert from '../helpers/assertRevert';
const BigNumber = web3.BigNumber;
const MultiSend = artifacts.require('MultiSend');
const decimalFactor = new BigNumber(Math.pow(10, 18));

// contract('MultiSend', function ([owner, recipient, anotherAccount]) {
//   const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

//   beforeEach(async function () {
//     this.multiSend = await MultiSend.new();
//   });

//   describe('total supply', function () {
//     it('returns the total amount of tokens', async function () {
//       const totalSupply = await this.token.totalSupply();
//       assert.equal(totalSupply.toString(), decimalFactor.times(Math.pow(10, 9)).toString());
//     });
//   });

// });
