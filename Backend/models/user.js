const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "supervisor", "user"],
    required: true
  },
  supervisor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
  }
}, { timestamps: true }); // adds createdAt and updatedAt

const User = mongoose.model("User", userSchema);

module.exports = User;
