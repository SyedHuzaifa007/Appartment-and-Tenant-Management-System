const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const Property = require("../models/Properties");
const router = express.Router();

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
    gfs = new GridFSBucket(conn.db, { bucketName: "uploads" });
});

const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },
}).single("image");

router.post("/", upload, async (req, res) => {
    try {
        const { title, address, units, ownedBy } = req.body;
        let imageUrl = null;

        if (req.file) {
            const filePath = req.file.path;

            if (fs.existsSync(filePath)) {
                const readStream = fs.createReadStream(filePath);
                const uploadStream = gfs.openUploadStream(req.file.filename, {
                    contentType: req.file.mimetype,
                });

                readStream.pipe(uploadStream);

                uploadStream.on("finish", () => {
                    imageUrl = uploadStream.id.toString();
                    fs.unlinkSync(filePath);

                    const newProperty = new Property({
                        title,
                        address,
                        units,
                        image: imageUrl,
                        ownedBy,
                    });

                    newProperty.save()
                        .then((savedProperty) => {
                            res.status(201).json(savedProperty);
                        })
                        .catch((err) => {
                            res.status(500).json({ error: err.message });
                        });
                });

                uploadStream.on("error", (err) => {
                    res.status(500).json({ error: "Error writing file to GridFS" });
                });
            }
        } else {
            const newProperty = new Property({ title, address, units, ownedBy });
            const savedProperty = await newProperty.save();
            res.status(201).json(savedProperty);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:landlordId", async (req, res) => {
    try {
        const { landlordId } = req.params;
        const properties = await Property.find({ ownedBy: landlordId });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/property/image/:id", (req, res) => {
    const { id } = req.params;
    console.log("Fetching image with ID:", id);

    gfs.files.findOne({ _id: ObjectId(id) }, (err, file) => {
        if (err || !file) {
            return res.status(404).json({ error: "File not found" });
        }

        const readstream = gfs.createReadStream({ _id: ObjectId(id) });
        res.set("Content-Type", file.contentType);
        readstream.pipe(res);
    });
});

router.put("/:propertyId", upload, async (req, res) => {
    try {
        const { propertyId } = req.params;
        const { title, address, units, ownedBy } = req.body;
        const updateData = { title, address, units, ownedBy };

        if (req.file) {
            const filePath = req.file.path;

            if (fs.existsSync(filePath)) {
                const readStream = fs.createReadStream(filePath);
                const uploadStream = gfs.openUploadStream(req.file.filename, {
                    contentType: req.file.mimetype,
                });

                readStream.pipe(uploadStream);

                uploadStream.on("finish", () => {
                    updateData.image = uploadStream.id.toString();
                    fs.unlinkSync(filePath);

                    Property.findByIdAndUpdate(propertyId, updateData, { new: true })
                        .then((updatedProperty) => {
                            if (!updatedProperty) {
                                return res.status(404).json({ message: "Property not found" });
                            }
                            res.status(200).json(updatedProperty);
                        })
                        .catch((err) => {
                            res.status(500).json({ error: err.message });
                        });
                });

                uploadStream.on("error", (err) => {
                    res.status(500).json({ error: "Error writing file to GridFS" });
                });
            }
        } else {
            const updatedProperty = await Property.findByIdAndUpdate(propertyId, updateData, { new: true });
            if (!updatedProperty) {
                return res.status(404).json({ message: "Property not found" });
            }
            res.status(200).json(updatedProperty);
        }
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

module.exports = router;