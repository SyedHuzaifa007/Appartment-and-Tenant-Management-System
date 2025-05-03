const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  units: { type: Number, required: true },
  totalTenants: { type: Number, default: 0 },
  image: { type: String },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "TenantProfile" }]
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
