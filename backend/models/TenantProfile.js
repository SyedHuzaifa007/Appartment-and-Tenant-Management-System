const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cnic: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    unitAddress: { type: String, required: true },
    rent: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    image: { type: String },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", TenantSchema);
