const BigNumber = web3.BigNumber;

module.exports = (event, _from, _to, _value) => {
  if (Number.isInteger(_value)) {
    _value = new BigNumber(_value);
  }
  assert.equal(event.event, 'Transfer');
  assert.equal(event.args.from, _from);
  assert.equal(event.args.to, _to);
  assert.equal(event.args.value.toNumber(), _value.toNumber());
};