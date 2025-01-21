const Product = require("./models/Product"); // Import Product model

const initialProducts = [
  {
    name: "מוצר 1",
    description: "זהו המוצר הראשון.",
    price: 29.99,
    imageUrl:
      "https://media.istockphoto.com/id/1758016695/vector/set-of-hand-drawn-board-games-sketch-doodle-of-chess-checkers-go-dominoes-playing-cards.jpg?s=2048x2048&w=is&k=20&c=eKEFZj05W8V0Xow9WcmcX7zmmqRafcTwf1GtKjXixEo=",
    inStock: true,
  },
  {
    name: "מוצר 2",
    description: "זהו המוצר השני.",
    price: 49.99,
    imageUrl:
      "https://media.istockphoto.com/id/1758016695/vector/set-of-hand-drawn-board-games-sketch-doodle-of-chess-checkers-go-dominoes-playing-cards.jpg?s=2048x2048&w=is&k=20&c=eKEFZj05W8V0Xow9WcmcX7zmmqRafcTwf1GtKjXixEo=",
    inStock: true,
  },
  {
    name: "מוצר 3",
    description: "זהו המוצר השלישי.",
    price: 49.99,
    imageUrl:
      "https://media.istockphoto.com/id/1758016695/vector/set-of-hand-drawn-board-games-sketch-doodle-of-chess-checkers-go-dominoes-playing-cards.jpg?s=2048x2048&w=is&k=20&c=eKEFZj05W8V0Xow9WcmcX7zmmqRafcTwf1GtKjXixEo=",
    inStock: true,
  },
  {
    name: "מוצר 4",
    description: "זה המוצר הרביעי.",
    price: 49.99,
    imageUrl:
      "https://media.istockphoto.com/id/1758016695/vector/set-of-hand-drawn-board-games-sketch-doodle-of-chess-checkers-go-dominoes-playing-cards.jpg?s=2048x2048&w=is&k=20&c=eKEFZj05W8V0Xow9WcmcX7zmmqRafcTwf1GtKjXixEo=",
    inStock: true,
  },
];

// Insert initial products into the database
const insertInitialProducts = async () => {
  try {
    // Check if there are already products in the database
    const existingProducts = await Product.find();
    if (existingProducts.length === 0) {
      // No products in DB, insert initial data
      await Product.insertMany(initialProducts);
      console.log("Initial products added to the database.");
    } else {
      console.log("Products already exist in the database.");
    }
  } catch (error) {
    console.error("Error inserting initial products:", error);
  }
};

// Export the function to be used in app.js
module.exports = insertInitialProducts;
