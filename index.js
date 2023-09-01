const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_STRING;
// 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
client.connect();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello World!');
});

//mongo db operation:
async function run() {

  try {

    const db = client.db('toyWorld')
    const dataCollection = db.collection('toyStore');
    const cartCollection = db.collection('toyCart');
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    // get all the data
    app.get('/products', async (req, res) => {
      const result = await dataCollection.find({}).toArray();
      res.send(result);
    });

    //get single data
    app.get(`/products/:id`, async (req, res) => {
      let query = { _id: new ObjectId(req.params.id) };
      const result = await dataCollection.findOne(query);

      if (!result) {
        res.send('Not found').status(404);
      } else {
        res.send(result).status(200);
      }
    });

    //post cart or addToy data into mongoDB
    app.post('/cart', async (req, res) => {
      const cartItem = await req.body;
      const result1 = await dataCollection.insertOne(cartItem);
      const result2 = await cartCollection.insertOne(cartItem);

      res.send(result2);
    });

    //get cart data which user userName field is exist
    app.get('/cart', async (req, res) => {
      const queryStr = req.query.displayName;
      const result = await cartCollection
        .find({ displayName: queryStr })
        .toArray();
      // console.log(result);
      res.send(result);
    });
    //get data using search query
    app.get('/search', async (req, res) => {
      const queryStr = req.query.search;
      const result = await dataCollection
        .find({ category: queryStr })
        .toArray();
      // console.log(result);
      res.send(result);
    });
    //get my-toy data which user  uid field is exist
    app.get('/my_toy', async (req, res) => {
      const result = await cartCollection.find().toArray();
      // console.log(result);

      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running at port: http://localhost:${port}`);
});
