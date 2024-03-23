const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const Signup = mongoose.model("signup", signupSchema);
module.exports = Signup;
