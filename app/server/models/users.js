const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_count: { type: Number },

  disc_id: { type: String },
  avatar: { type: String },
  discriminator: { type: String },
  public_flags: { type: Number },

  username: { type: String },
  total_messages: { type: Number },

  created_at: { type: Date, required: true, default: Date.now },
  messages: { type: Array },
});

module.exports = mongoose.model("User", userSchema);
