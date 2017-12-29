const { assocPath } = require('ramda')
const mkdirp = require('mkdirp-promise');
const fs = require('fs');
const { dirname } = require('path');
const { promisify } = require('util');

const { getDb, getDbPath } = require('../../selectors')

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

module.exports = ({ getState }) => next => action => {
  if (action.type === 'LOAD_DB') {
    const dbPath = getDbPath(getState());
    (async () => {
      try {
        const db = await readDb(dbPath)
        next(assocPath(['payload', 'db'], db, action))
      } catch (e) {
        if (e.name === 'SyntaxError') {
          return log('ERROR DB corrupted.');
        }
        log('DB missing.');
        log('Creating fresh DB...');
        const db = getDb(getState());
        await writeDb(dbPath, db)
        try {
          log('DB created.');
        } catch (e) {
          log(e.message)
        }
      }
    })()
    return action;
  }
  const previousDb = getDb(getState());
  const nextAction = next(action)
  const currentDb = getDb(getState());
  if (previousDb !== currentDb) {
    (async () => {
      try {
        const dbPath = getDbPath(getState());
        await writeDb(dbPath, currentDb);
      } catch (e) {
        log(e.message)
      }
    })()
  }
  return nextAction;
}
