const SolidityEvent = require('web3/lib/web3/event.js');

function decodeLogsInternal(abi, logs) {

  // Find events in the ABI
  var abiEvents = abi.filter(json => {
    return json.type === 'event';
  });

  if (abiEvents.length === 0) {
    return;
  }

  // Build SolidityEvent objects
  var solidityEvents = [];
  for (let i = 0; i < abiEvents.length; i++) {
    solidityEvents.push(new SolidityEvent(null, abiEvents[i], null));
  }

  // Decode each log entry
  var decodedLogs = [];
  for (let i = 0; i < logs.length; i++) {

    var event = null;
    for (let j = 0; j < solidityEvents.length; j++) {
      if (solidityEvents[j].signature() == logs[i].topics[0].replace('0x', '')) {
        event = solidityEvents[j];
        break;
      }
    }

    var decodedLog = null;

    if (event != null) {
      decodedLog = event.decode(logs[i]);
    } else {
      // We could not find the right event to decode this log entry, just keep as is.
      decodedLog = logs[i];
    }

    // Convert bytes32 parameters to ascii
    for (let j = 0; j < abiEvents.length; j++) {
      const abiEvent = abiEvents[j];

      if (!abiEvent.inputs) {
        continue;
      }

      if (abiEvent.name != decodedLog.name) {
        continue;
      }

      for (let k = 0; k < abiEvent.inputs; k++) {
        if (abiEvent.inputs[k].type == 'bytes32') {
          decodedLog.args[abiEvent.inputs[k].name] = hexToAscii(decodedLog.args[abiEvent.inputs[k]]);
        }
      }
    }

    decodedLogs.push(decodedLog);
  }

  return decodedLogs;
}


module.exports = function decodeLogs(abi, logs) {
  var decodedLogs = null;
  try {
    decodedLogs = decodeLogsInternal(abi, logs);
  } catch(error) {
    throw new Error('Could not decode receipt log for transaction ' + txID + ', message: ' + error);
  }

  return decodedLogs;
};