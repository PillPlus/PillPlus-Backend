const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const validator = require("validator");

const userSchema = new Schema({
  _id: ObjectId,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "invalid email"],
  },
  type: {
    type: String,
    enum: ["admin", "staff", "phamacy"],
    required: true,
  },
  password: { type: String, required: true, select: false },

  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema, "users");
