// App/remove.js
const { client } = require("./app");

async function removeProduct() {
  try {
    await client.connect();
    const db = client.db("mydb");
    const products = db.collection("products");

    // Example: delete the "Headphones" product (id = 3)
    const result = await products.deleteOne({ id: 3 });

    console.log(`✅ Deleted ${result.deletedCount} product(s)`);
  } catch (err) {
    console.error("❌ Error deleting product:", err);
  } finally {
    await client.close();
  }
}

removeProduct();
