/**
 * Parse a string to an integer, returning null if not an integer
 * @param {String} value String to convert
 * @returns {Number} Converted number, or null
 */
function getInteger (value) {
  const result = Number (value);
  return Number.isInteger (result) ? result : null;
}

/**
 * Valid command options
 *  [-p | --port] port to listen on, default 3000
 * @param {[String]} Array of arguments
 * @returns {Object} code:{Integer}, exit:{Boolean}, port:{Integer}
 */
function processCommand (args) {
  let showHelp = false;
  const errors = [];
  const defaults = {
    port: 3000,
  };
  const result = {
    code: 0,
    exit: false,
    port: 0,
  };

  for (const arg of args) {
    // if a settings argument, it will contain an equals sign
    if (arg.indexOf ('=') > -1) {
      // divide argument into left and right sides, and assign
      const elements = arg.split ('=');
      const key = elements[0];
      if ((key === '-p') || (key === '--port')) {
        result.port = elements[1];
      } else {
        errors.push (`Error: Invalid option (${elements[0]})`);
      }
    } else if (arg === '-h' || arg === '--help') {
      showHelp = true;
    } else {
      errors.push (`Error: Invalid option (${arg})`);
    }
  }

  // validate arguments, assign defaults
  const port = getInteger (result.port);
  if ((port === null) || (port < 0) || (port > 65535)) {
    errors.push ('Invalid port number (${result.port}). Must be integer between 0 and 65535');
  } else if (port === 0) {
    result.port = defaults.port;
  } else {
    result.port = port;
  }

  // if help not an argument, output list of errors
  if ((showHelp === false) && (errors.length > 0)) {
    for (const error of errors) {
      console.log (error);
    }
  }

  // if help argument or errors, output usage message
  if ((showHelp === true) || (errors.length > 0)) {
    console.log (
`Usage: movement [-p=port] [-h]
  -p or --port      Port number to listen on. Default: ${defaults.port}
  -h or --help      This message.`);
    result.code = (showHelp) ? 0 : 1;
    result.exit = true;
  }
  return result;
}

exports.processCommand = processCommand;
