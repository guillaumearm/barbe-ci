const path = require('path');

var argv = require('yargs')
  .usage('Usage: $0 [options]')
  .example('$0 -p 3000 --verbose', 'start server on port 3000 (in verbose mode)')
  .describe('version', 'Print current version')
  .string('db')
    .describe('db', 'path to the db folder')
    .defaults('db', path.resolve(__dirname, '..', 'db.json'))
  .boolean('verbose')
    .alias('v', 'verbose')
    .describe('verbose', 'print server log on stdout')
  .help('h')
    .alias('h', 'help')
  .alias('p', 'port')
    .nargs('p', 1)
    .default('p', 8080)
    .describe('p', 'Port to listen')
  .argv;

module.exports = {
  DBPATH: argv.db,
  PORT: argv.port,
  VERBOSE: argv.verbose,
  argv
};
