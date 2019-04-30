const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = "mongodb://127.0.0.1:27017";
const dbName = "product_manage";

exports.find = (collection, condition = {}) =>
  new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const db = client.db(dbName);
        const result = db.collection(collection).find(condition);
        result.toArray((err, data) => {
          err ? reject(err) : resolve(data);
          client.close();
        });
      } else {
        reject(err);
        client.close();
      }
    });
  });

exports.insert = (collection, param = {}) =>
  new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const db = client.db(dbName);
        db.collection(collection).insertOne(param, (err, result) => {
          err ? reject(err) : resolve(result);
          client.close();
        });
      } else {
        reject(err);
        client.close();
      }
    });
  });

exports.updateOne = (collection, condition, param) =>
  new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const db = client.db(dbName);
        db.collection(collection).updateOne(condition, param, (err, result) => {
          err ? reject(err) : resolve(result);
          client.close();
        });
      } else {
        reject(err);
        client.close();
      }
    });
  });

exports.deleteOne = (collection, condition) =>
  new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const db = client.db(dbName);
        db.collection(collection).deleteOne(condition, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      } else {
        reject(err);
      }
      client.close();
    });
  });

  exports.ObjectID = ObjectID