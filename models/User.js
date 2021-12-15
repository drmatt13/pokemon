const mongoose = require("mongoose");

// create mongoose schema object
const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: [20, "Username cannot be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    maxlength: [64, "Email can not be more then 64 characters"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    unique: false,
    trim: true,
    maxlength: [64, "Password can not be more then 64 characters"],
    minlength: [8, "Password can not be less then 8 characters"],
    select: false,
  },
  collections: [
    {
      type: String,
      required: false,
      unique: true,
      trim: true,
      maxlength: [64, "Collection can not be more then 64 characters"],
    },
  ],
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", Schema);
