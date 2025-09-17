// App/update.js
const { client } = require("./app");

async function updateProduct() {
  try {
    await client.connect();
    const db = client.db("mydb");
    const products = db.collection("products");

    // Example: update the "Phone" price and units
    const result = await products.updateOne(
      { id: 2 }, // find product with id = 2
      { $set: { price: 899.99, units: 30 } } // update these fields
    );

    console.log(`✅ Matched ${result.matchedCount}, Modified ${result.modifiedCount}`);
  } catch (err) {
    console.error("❌ Error updating product:", err);
  } finally {
    await client.close();
  }
}

updateProduct();
