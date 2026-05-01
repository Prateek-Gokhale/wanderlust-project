const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

const MS_PER_DAY = 1000 * 60 * 60 * 24;

module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (listing.owner._id.equals(req.user._id)) {
    req.flash("error", "You cannot book your own listing");
    return res.redirect(`/listings/${id}`);
  }

  const checkIn = new Date(req.body.booking.checkIn);
  const checkOut = new Date(req.body.booking.checkOut);
  const guests = Number(req.body.booking.guests);
  const nights = Math.ceil((checkOut - checkIn) / MS_PER_DAY);

  if (checkIn < new Date().setHours(0, 0, 0, 0)) {
    req.flash("error", "Check-in date cannot be in the past");
    return res.redirect(`/listings/${id}`);
  }

  if (guests > listing.maxGuests) {
    req.flash("error", `This stay allows up to ${listing.maxGuests} guests`);
    return res.redirect(`/listings/${id}`);
  }

  const totalPrice = nights * listing.price;

  await Booking.create({
    listing: listing._id,
    guest: req.user._id,
    checkIn,
    checkOut,
    guests,
    nights,
    totalPrice,
  });

  req.flash("success", "Your trip is confirmed");
  res.redirect("/bookings");
};

module.exports.index = async (req, res) => {
  const bookings = await Booking.find({ guest: req.user._id })
    .populate("listing")
    .sort({ checkIn: 1 });
  res.render("bookings/index.ejs", { bookings });
};

module.exports.cancelBooking = async (req, res) => {
  await Booking.findOneAndUpdate(
    { _id: req.params.bookingId, guest: req.user._id },
    { status: "cancelled" }
  );
  req.flash("success", "Booking cancelled");
  res.redirect("/bookings");
};
