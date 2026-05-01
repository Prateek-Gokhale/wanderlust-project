const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN || "pk.eyJ1IjoibG9jYWwiLCJhIjoibG9jYWwifQ==.local";
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const categories = [
  "Trending",
  "Rooms",
  "Iconic Cities",
  "Mountains",
  "Castles",
  "Amazing Pools",
  "Camping",
  "Farm House",
  "Beach",
  "Lake",
];

const defaultImage = {
  url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  filename: "default-listing",
};

const defaultGeometry = {
  type: "Point",
  coordinates: [77.5946, 12.9716],
};

const normalizeAmenities = (amenities) => {
  if (Array.isArray(amenities)) return amenities.filter(Boolean);
  if (typeof amenities === "string") {
    return amenities.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

const getImageFromUpload = (file) => {
  if (!file) return null;
  if (file.path && file.path.includes("public")) {
    return {
      url: `/uploads/${file.filename}`,
      filename: file.filename,
    };
  }
  return {
    url: file.path,
    filename: file.filename,
  };
};

const getGeometry = async (location) => {
  try {
    const response = await geocodingClient
      .forwardGeocode({ query: location, limit: 1 })
      .send();
    return response.body.features[0]?.geometry || defaultGeometry;
  } catch (err) {
    return defaultGeometry;
  }
};

module.exports.index = async (req, res) => {
  const { q, category, minPrice, maxPrice, guests } = req.query;
  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
    ];
  }

  if (category) filter.category = category;
  if (guests) filter.maxGuests = { $gte: Number(guests) };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const allListings = await Listing.find(filter).sort({ createdAt: -1 });
  res.render("listings/index.ejs", { allListings, query: req.query, categories });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs", { categories });
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.amenities = normalizeAmenities(req.body.listing.amenities);
  newListing.owner = req.user._id;
  newListing.image = getImageFromUpload(req.file) || defaultImage;
  newListing.geometry = await getGeometry(req.body.listing.location);

  await newListing.save();
  req.flash("success", "Successfully made a new listing");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image?.url || defaultImage.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl, categories });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listingData = { ...req.body.listing };
  listingData.amenities = normalizeAmenities(req.body.listing.amenities);
  const listing = await Listing.findByIdAndUpdate(id, listingData, { new: true });

  if (req.body.listing.location) {
    listing.geometry = await getGeometry(req.body.listing.location);
    await listing.save();
  }

  if (req.file) {
    listing.image = getImageFromUpload(req.file);
    await listing.save();
  }

  req.flash("success", "Successfully updated listing");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted listing");
  res.redirect("/listings");
};
