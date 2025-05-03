const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    address: { type: String, required: true },
    units: { type: Number, required: true },
    image: { type: String },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tenants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
