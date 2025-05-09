const { Schema, model } = require("mongoose");

const propertySchema = new Schema({
  title: String,
  address: String,
  units: Number,
  image: String,
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