const mongoose = require("mongoose");

// create mongoose schema object
const Schema = new mongoose.Schema({
  _user_id: {
    type: String,
    required: true,
    maxlength: 24,
  },
  _card_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 24,
  },
  qauntity: {
    type: Number,
    required: true,
    default: 1,
  },
  forsale: {
    type: Boolean,
    required: true,
    default: false,
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  colection: {
    type: String,
    required: true,
    maxlength: 64,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", Schema);
