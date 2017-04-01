global.IS_SERVER_REQUEST = true;
global.jQuery = function(a) { return a; };

const processCommand = require ('./cmd').processCommand;
const server = require ('./server');

if (require.main === module) {
  main ();
}

/**
 * Process command line to start server.
 */
function main () {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  const port = process.env.PORT || command.port;
  server.start (port);
}
