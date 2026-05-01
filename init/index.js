if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const Booking = require("../models/booking.js");
const Review = require("../models/review.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
const categories = ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farm House", "Beach", "Lake"];

const coordinatesByLocation = {
  Malibu: [-118.7798, 34.0259],
  "New York City": [-74.006, 40.7128],
  Aspen: [-106.8175, 39.1911],
  Florence: [11.2558, 43.7696],
  Portland: [-122.6765, 45.5231],
  Cancun: [-86.8515, 21.1619],
  "Lake Tahoe": [-120.0324, 39.0968],
  "Los Angeles": [-118.2437, 34.0522],
  Verbier: [7.2286, 46.0961],
  Amsterdam: [4.9041, 52.3676],
  Fiji: [178.065, -17.7134],
  Cotswolds: [-1.883, 51.833],
  Boston: [-71.0589, 42.3601],
  Bali: [115.1889, -8.4095],
  Banff: [-115.5708, 51.1784],
  Miami: [-80.1918, 25.7617],
  Phuket: [98.3381, 7.8804],
  Dubai: [55.2708, 25.2048],
  Montana: [-110.3626, 46.8797],
  Mykonos: [25.3289, 37.4467],
  "Costa Rica": [-84.0907, 9.9281],
  Charleston: [-79.9311, 32.7765],
  Tokyo: [139.6917, 35.6895],
  "New Hampshire": [-71.5724, 43.1939],
  Maldives: [73.2207, 3.2028],
};

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Booking.deleteMany({});
  await Review.deleteMany({});
  await Listing.deleteMany({});

  let demoUser = await User.findOne({ username: "demo-host" });
  if (!demoUser) {
    demoUser = new User({ username: "demo-host", email: "demo@wanderlust.local" });
    await User.register(demoUser, "password123");
  }

  let demoGuest = await User.findOne({ username: "demo-guest" });
  if (!demoGuest) {
    demoGuest = new User({ username: "demo-guest", email: "guest@wanderlust.local" });
    await User.register(demoGuest, "password123");
  }

  const listings = initData.data.map((obj, index) => ({
    ...obj,
    owner: demoUser._id,
    category: categories[index % categories.length],
    maxGuests: 2 + (index % 6),
    bedrooms: 1 + (index % 4),
    bathrooms: 1 + (index % 3),
    amenities: ["Wifi", "Kitchen", index % 2 === 0 ? "Free parking" : "Workspace", index % 3 === 0 ? "Pool" : "Air conditioning"],
    geometry: {
      type: "Point",
      coordinates: coordinatesByLocation[obj.location] || [77.5946, 12.9716],
    },
  }));

  await Listing.insertMany(listings);
  console.log("Database initialized successfully");
  console.log("Demo host login: demo-host / password123");
  console.log("Demo guest login: demo-guest / password123");
};

main()
  .then(initDB)
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error("Error initializing database:", err);
    mongoose.connection.close();
  });
