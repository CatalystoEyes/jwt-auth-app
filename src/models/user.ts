const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username not provided."],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database."],
    lowercase: true,
    trim: true,
    required: ["email not provided."],
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: [true, "Please specify user role"],
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
