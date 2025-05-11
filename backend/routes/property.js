const express = require("express");
const multer = require("multer");
const path = require("path");
const Property = require("../models/Properties");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage });

router.get("/:landlordId", async (req, res) => {
    try {
        const { landlordId } = req.params;
        const properties = await Property.find({ ownedBy: landlordId });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:propertyId", async (req, res) => {
    try {
        const { propertyId } = req.params;
        const deletedProperty = await Property.findByIdAndDelete(propertyId);
        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, address, units, ownedBy } = req.body;
        const image = req.file ? req.file.path : "";

        const newProperty = new Property({
            title,
            address,
            units,
            image,
            ownedBy
        });
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:propertyId", upload.single("image"), async (req, res) => {
    try {
        const { propertyId } = req.params;
        const { title, address, units, ownedBy } = req.body;
        const image = req.file ? req.file.path : undefined;

        const updateData = { title, address, units, ownedBy };
        if (image) updateData.image = image;

        const updatedProperty = await Property.findByIdAndUpdate(propertyId, updateData, { new: true });
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;