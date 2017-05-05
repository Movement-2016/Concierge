/* eslint no-console:0 */

global.IS_SERVER_REQUEST = true;
global.jQuery = function(a) { return a; };

const cluster = require('cluster');
const processCommand = require ('./cmd').processCommand;
const server = require ('./server');

function main () {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  const port = process.env.PORT || command.port;
  server.start (port);
}

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
  main();
}