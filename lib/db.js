const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://127.0.0.1:27017";
const dbName = 'product_manage'
exports.find = (collection, param, callback) => {
  MongoClient.connect(url, (err, client) => {
    if (!err) {
      const db = client.db(dbName);
      const result = db.collection(collection).find(param);
      result.toArray((err, data) => {
        callback(err, data)
        client.close();
      });
    }
  });
};
