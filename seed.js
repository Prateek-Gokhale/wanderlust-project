// const mongoose = require("mongoose");
// const Listing = require("./models/listing"); // adjust path if needed
// const { data: sampleListings } = require("./init/data.js");


// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
//   console.log(" MongoDB Connected");

//   // Clear old data
//   await Listing.deleteMany({});
//   console.log(" Old listings deleted");

//   // Insert fresh sample data
//   await Listing.insertMany(sampleListings);
//   console.log(" Sample listings seeded");

//   mongoose.connection.close();
// }

// main().catch((err) => {
//   console.error("Error seeding database:", err);
// });
