const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const { authMiddleware } = require("./auth");

// Create Property
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, address, units, image } = req.body;

    const newProperty = new Property({
      landlord: req.user.id,
      name,
      address,
      units,
      image
    });

    await newProperty.save();
    res.status(201).json({ message: "Property created", property: newProperty });
  } catch (err) {
    res.status(500).json({ message: "Error creating property", error: err.message });
  }
});

// Get all properties for the landlord
router.get("/", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ landlord: req.user.id }).populate("tenants");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties" });
  }
});

// Edit Property
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Property.findOneAndUpdate(
      { _id: req.params.id, landlord: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property updated", property: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating property" });
  }
});

// Delete Property
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Property.findOneAndDelete({ _id: req.params.id, landlord: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting property" });
  }
});

module.exports = router;
