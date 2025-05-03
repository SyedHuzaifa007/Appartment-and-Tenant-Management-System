const express = require("express");
const router = express.Router();
const TenantProfile = require("../models/TenantProfile");
const Property = require("../models/Property");
const { authMiddleware } = require("./auth");

// Add Tenant
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { user, cnic, phone, unitAddress, rent, dueDate, property, image } = req.body;

    const propertyDoc = await Property.findOne({ _id: property, landlord: req.user.id });
    if (!propertyDoc) return res.status(403).json({ message: "Unauthorized or invalid property" });

    const tenant = new TenantProfile({
      user,
      cnic,
      phone,
      unitAddress,
      rent,
      dueDate,
      property,
      landlord: req.user.id,
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
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tenants = await TenantProfile.find({ landlord: req.user.id }).populate("user").populate("property");
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tenants" });
  }
});

// Edit Tenant
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await TenantProfile.findOneAndUpdate(
      { _id: req.params.id, landlord: req.user.id },
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
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await TenantProfile.findOneAndDelete({ _id: req.params.id, landlord: req.user.id });
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
