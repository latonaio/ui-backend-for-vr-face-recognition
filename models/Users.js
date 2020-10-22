// FIXME DB接続周りの処理をpoolPromiseからgetConnection→releaseConnectionに修正
const table = 'users';

const {poolPromise} = require('../db');

module.exports = {
  getUsers: function (id) {
    return new Promise((resolve, reject) => {
      let currentConnection;
      let currentPool;

      poolPromise
        .then((pool) => {
          currentPool = pool;
          return pool;
        })
        .then((pool) => {
          return pool.getConnection();
        })
        .then((connection) => {
          currentConnection = connection;
          return connection;
        })
        .then((connection) => {
          return connection.query(
            `select * from ${table}`, id);
        })
        .then(result => {
          resolve(result);
          currentPool.releaseConnection(currentConnection);
        })
        .catch(error => {
          reject(error);
          currentPool.releaseConnection(currentConnection);
        });
    });
  },
};
