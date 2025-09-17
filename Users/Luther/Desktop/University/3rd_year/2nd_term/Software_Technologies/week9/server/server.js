// server/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "mydb";

// ✅ Route 1: Get all products
app.get("/products", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  } finally {
    await client.close();
  }
});

// ✅ Route 2: Add new product
app.post("/products", async (req, res) => {
  const newProduct = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("products");

    // check duplicate id
    const exists = await collection.findOne({ id: newProduct.id });
    if (exists) {
      return res.status(400).json({ error: "Product with this id already exists" });
    }

    await collection.insertOne(newProduct);
    res.json({ message: "✅ Product added" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  } finally {
    await client.close();
  }
});

// ✅ Route 3: Delete product by MongoDB _id
app.delete("/products/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({ deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  } finally {
    await client.close();
  }
});

// ✅ Route 4: Update product by MongoDB _id
app.put("/products/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.json({ matched: result.matchedCount, modified: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
