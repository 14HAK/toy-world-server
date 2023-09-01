const { ObjectId } = require('mongodb');
const { dataCollection, cartCollection } = require('../model/model');
const express = require('express');

express.json();


const getProducts = async (req, res) => {
  const result = await dataCollection.find({}).toArray();
  res.send(result);
};

const singleProduct = async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  const result = await dataCollection.findOne(query);

  if (!result) {
    res.send('Not found').status(404);
  } else {
    res.send(result).status(200);
  }
}

const postProduct = async (req, res) => {
  const cartItem = await req.body;
  const result1 = await dataCollection.insertOne(cartItem);
  const result2 = await cartCollection.insertOne(cartItem);

  res.send(result2);
}

const getCartProduct = async (req, res) => {
  const queryStr = req.query.displayName;
  const result = await cartCollection
    .find({ displayName: queryStr })
    .toArray();
  // console.log(result);
  res.send(result);
}

const searchProduct = async (req, res) => {
  const queryStr = req.query.search;
  const result = await dataCollection
    .find({ category: queryStr })
    .toArray();
  // console.log(result);
  res.send(result);
}

const getMyToy = async (req, res) => {
  const result = await cartCollection.find().toArray();
  // console.log(result);
  res.send(result);
}



module.exports = {
  getProducts,
  singleProduct,
  postProduct,
  getCartProduct,
  searchProduct,
  getMyToy,

}