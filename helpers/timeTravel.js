module.exports = web3 => {

    var jsonrpc = '2.0'
    var id = 0
    var send = (method, params = []) => web3.currentProvider.send({ id, jsonrpc, method, params });
    var toEthDecimal = (eth) => {
      return eth * 1000000000000000000;
    }
  
    return async seconds => {
      await send('evm_increaseTime', [seconds]);
      await send('evm_mine');
    }
  }