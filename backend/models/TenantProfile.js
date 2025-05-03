const mongoose = require("mongoose");

const tenantProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cnic: { type: String, required: true },
  phone: { type: String, required: true },
  unitAddress: { type: String, required: true },
  rent: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("TenantProfile", tenantProfileSchema);
