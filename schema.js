
const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string().valid('Trending', 'Rooms', 'Iconic Cities', 'Mountains', 'Castles', 'Amazing Pools', 'Camping', 'Farm House', 'Beach', 'Lake').required(),
    maxGuests: Joi.number().integer().min(1).required(),
    bedrooms: Joi.number().integer().min(0).required(),
    bathrooms: Joi.number().integer().min(0).required(),
    amenities: Joi.alternatives().try(
      Joi.array().items(Joi.string().allow("")),
      Joi.string().allow("")
    ),
   image: Joi.object({
      url: Joi.string().uri().allow("", null),
      filename: Joi.string().allow("", null)
    })
  }).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

module.exports.bookingSchema = Joi.object({
  booking: Joi.object({
    checkIn: Joi.date().required(),
    checkOut: Joi.date().greater(Joi.ref("checkIn")).required(),
    guests: Joi.number().integer().min(1).required(),
  }).required(),
});
