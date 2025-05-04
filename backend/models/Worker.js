const { Schema, model } = require("mongoose");

const workerSchema = new Schema({
  name: String,
  workerType: String,
  image: String,
  salary: Number,
});

module.exports = model("Worker", workerSchema);