// App/app.js
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017"; // local MongoDB server
const client = new MongoClient(url);

// Just export the client, don't auto-connect/close here
module.exports = {
  client,
};
