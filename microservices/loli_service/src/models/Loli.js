const mongoose = require("mongoose");

const loliSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  isLewded: Boolean,
});

const Loli = mongoose.model("Loli", loliSchema);

module.exports = { loliSchema, Loli };
