const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_STRING;
// 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


const db = client.db('toyWorld');

const dataCollection = db.collection('toyStore');
const cartCollection = db.collection('toyCart');

module.exports = {
  dataCollection,
  cartCollection
}