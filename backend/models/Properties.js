const { Schema, model } = require("mongoose");

const propertySchema = new Schema({
  title: String,
  address: String,
  units: Number,
  image: {
    type: Schema.Types.ObjectId,
    ref: "fs.files",
    default: null,
  },
  ownedBy: {
    type: Schema.Types.ObjectId,
    ref: "Landlord",
    default: null,
  },
  assignedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
    },
  ],
});

module.exports = model("Property", propertySchema);
