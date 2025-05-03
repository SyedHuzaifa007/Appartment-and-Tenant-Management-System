const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

//Get all properties 
router.get("/", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ landlord: req.user.id }).populate("tenants");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching properties" });
  }
});

// Create a new property
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newProperty = new Property({
      ...req.body,
      landlord: req.user.id,
    });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    console.error("Create Property Error:", err);
    res.status(500).json({ message: "Server error while creating property" });
  }
});

// Update a property
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Property.findOneAndUpdate(
      { _id: req.params.id, landlord: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(403).json({ message: "Unauthorized or not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error while updating property" });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Property.findOneAndDelete({ _id: req.params.id, landlord: req.user.id });
    if (!deleted) {
      return res.status(403).json({ message: "Unauthorized or not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting property" });
  }
});

module.exports = router;
