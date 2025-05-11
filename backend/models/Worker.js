const { Schema, model } = require("mongoose");

const workerSchema = new Schema({
  name: String,
  workerType: String,
  image: String,
  salary: Number,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
});

module.exports = model("Worker", workerSchema);
