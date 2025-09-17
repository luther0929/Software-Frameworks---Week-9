// App/read.js
const { client } = require("./app");

async function readProducts() {
  try {
    await client.connect();
    const db = client.db("mydb");
    const products = db.collection("products");

    const allProducts = await products.find().toArray();
    console.log("✅ Products in database:");
    console.table(allProducts);
  } catch (err) {
    console.error("❌ Error reading products:", err);
  } finally {
    await client.close();
  }
}

readProducts();
