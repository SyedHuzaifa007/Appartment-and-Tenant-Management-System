const express = require("express");
const router = express.Router();
const TenantProfile = require("../models/TenantProfile");
const Property = require("../models/Property");

// Add Tenant
router.post("/", async (req, res) => {
  try {
    const { user, cnic, phone, unitAddress, rent, dueDate, property, image, landlord } = req.body;

    const propertyDoc = await Property.findOne({ _id: property, landlord: landlord });
    if (!propertyDoc) return res.status(403).json({ message: "Unauthorized or invalid property" });

    const tenant = new TenantProfile({
      user,
      cnic,
      phone,
      unitAddress,
      rent,
      dueDate,
      property,
      landlord,
      image
    });

    await tenant.save();

    propertyDoc.tenants.push(tenant._id);
    await propertyDoc.save();

    res.status(201).json({ message: "Tenant added", tenant });
  } catch (err) {
    res.status(500).json({ message: "Error adding tenant", error: err.message });
  }
});

// Get all tenants for a landlord
router.get("/", async (req, res) => {
  try {
    const { landlord } = req.query;
    const tenants = await TenantProfile.find({ landlord }).populate("user").populate("property");
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tenants" });
  }
});

// Edit Tenant
router.put("/:id", async (req, res) => {
  try {
    const updated = await TenantProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Tenant not found" });
    res.json({ message: "Tenant updated", tenant: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating tenant" });
  }
});

// Delete Tenant
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await TenantProfile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tenant not found" });

    await Property.updateOne(
      { _id: deleted.property },
      { $pull: { tenants: deleted._id } }
    );

    res.json({ message: "Tenant deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting tenant" });
  }
});

module.exports = router;
