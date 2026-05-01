const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const bookingController = require("../controllers/bookings.js");

router.get("/bookings", isLoggedIn, wrapAsync(bookingController.index));
router.patch("/bookings/:bookingId/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
