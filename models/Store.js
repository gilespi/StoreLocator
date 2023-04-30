const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an Name'],
  },
  phone: {
    type: String,
    required: [true, 'Please add an Phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  web: {
    type: String,
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Geocode and create location
StoreSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.geometry = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  //Not save address
  // this.address = undefined;
  // next();
});

module.exports = mongoose.model('Store', StoreSchema);
