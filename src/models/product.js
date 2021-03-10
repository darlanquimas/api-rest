const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    requires: true,
    trim: true,
  },
  slug: {
    type: String,
    requires: true,
    trim: true,
    index: true,
    unique: true,
  },
  description: {
    type: String,
    requires: true,
    trim: true,
  },
  price: {
    type: Number,
    requires: true,
  },
  active: {
    type: Boolean,
    requires: true,
    default: true,
  },
  tags: [
    {
      type: String,
      requires: true,
      trim: true,
    },
  ],
});

module.exports = mongoose.model("Product", schema);
