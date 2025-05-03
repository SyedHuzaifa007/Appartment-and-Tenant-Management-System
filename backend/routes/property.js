const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

router.get("/", async (req, res) => {
    const properties = await Property.find();
    res.json(properties);
});

router.post("/", async (req, res) => {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.json(newProperty);
});

router.put("/:id", async (req, res) => {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

router.delete("/:id", async (req, res) => {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
