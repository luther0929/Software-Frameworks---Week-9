// App/add.js
const { client } = require("./app");

async function addProducts() {
  try {
    await client.connect();
    const db = client.db("mydb");
    const products = db.collection("products");

    // Drop collection first to avoid duplicates
    await products.drop().catch(() => {});

    const sampleProducts = [
      {
        id: 1,
        name: "Laptop",
        description: "15-inch display, 16GB RAM",
        price: 1499.99,
        units: 10,
      },
      {
        id: 2,
        name: "Phone",
        description: "6.1-inch OLED, 128GB storage",
        price: 999.99,
        units: 25,
      },
      {
        id: 3,
        name: "Headphones",
        description: "Noise-cancelling wireless",
        price: 199.99,
        units: 50,
      },
    ];

    const result = await products.insertMany(sampleProducts);
    console.log(`✅ Inserted ${result.insertedCount} products`);
  } catch (err) {
    console.error("❌ Error inserting products:", err);
  } finally {
    await client.close();
  }
}

addProducts();
