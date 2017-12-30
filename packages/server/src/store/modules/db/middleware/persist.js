const { assocPath } = require('ramda')
const mkdirp = require('mkdirp-promise');
const fs = require('fs');
const { dirname } = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const log = (...args) => {
  // eslint-disable-next-line no-console
  console.log('DB -', ...args)
  return args[0];
}

const readDb = async dbPath => {
  log('Loading db... -', dbPath);
  const file = await readFile(dbPath);
  const db = JSON.parse(file.toString());
  log('DB readed.', dbPath);
  return db;
}

const writeDb = async (dbPath, db) => {
  await mkdirp(dirname(dbPath));
  return await writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
}

module.exports = (store) => next => async action => {
  if (action.type === 'LOAD_DB') {
    const dbPath = store.getDbPath();
    try {
      const db = await readDb(dbPath)
      return await next(assocPath(['payload', 'db'], db, action))
    } catch (e) {
      if (e.name === 'SyntaxError') {
        return log('ERROR DB corrupted.');
      }
      log('DB missing.');
      log('Creating fresh DB...');
      const db = store.getDb();
      await writeDb(dbPath, db)
      try {
        log('DB created.');
      } catch (e) {
        log(e.message)
      }
    }
    return await next(action);
  }
  const previousDb = store.getDb();
  const nexted = await next(action)
  const currentDb = store.getDb();
  if (previousDb !== currentDb) {
    try {
      const dbPath = store.getDbPath();
      await writeDb(dbPath, currentDb);
    } catch (e) {
      log(e.message)
    }
  }
  return nexted;
}
