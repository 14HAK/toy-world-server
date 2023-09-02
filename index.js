const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const router = require('./router/router');
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


app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

app.get('/', (req, res) => {
  res.send('hello World!');
});

//mongo db operation:
async function run() {
  try {
    await client.connect();

    await client.db('admin').command({ ping: 1 });
    console.log('MongoDB connection successful!');

    //all route control here MVC
    app.use('/', router);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running at port: http://localhost:${port}`);
});
