const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    min: 1,
    required: true,
  },
  nights: {
    type: Number,
    min: 1,
    required: true,
  },
  totalPrice: {
    type: Number,
    min: 0,
    required: true,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
