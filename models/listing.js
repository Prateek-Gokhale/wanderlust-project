const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    // image: {
    //     filename: {
    //         type: String,
    //         default: "listingimage"
    //     },
    //     url: {
    //         type: String,
    //         default: "https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-waves-uDlDUb1T_4M"
    //     }
    // },
    image: {
       url: String,
       filename: String
},
price: Number,
    category: {
        type: String,
        enum: ['Trending', 'Rooms', 'Iconic Cities', 'Mountains', 'Castles', 'Amazing Pools', 'Camping', 'Farm House', 'Beach', 'Lake'],
        default: 'Trending',
    },
    maxGuests: {
        type: Number,
        min: 1,
        default: 2,
    },
    bedrooms: {
        type: Number,
        min: 0,
        default: 1,
    },
    bathrooms: {
        type: Number,
        min: 0,
        default: 1,
    },
    amenities: [{
        type: String,
    }],
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],

    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    geometry:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
   
}, { timestamps: true });


listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
