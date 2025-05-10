const express = require("express");
const multer = require("multer");
const path = require("path");
const Worker = require("../models/Worker");
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

router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    console.error("Error fetching workers:", err);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

router.get("/_id", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    console.error("Error fetching workers:", err);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting worker:", err);
    res.status(500).json({ error: "Failed to delete worker" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, workerType, salary } = req.body;
    const image = req.file ? req.file.path : ""; 

    const newWorker = new Worker({
      name,
      workerType,
      salary,
      image,
    });

    const savedWorker = await newWorker.save();
    res.status(201).json(savedWorker);
  } catch (err) {
    console.error("Error saving worker:", err);
    res.status(500).json({ error: "Failed to save worker" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const workerId = req.params.id;
    const { name, workerType, salary } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updateFields = { name, workerType, salary };
    if (image) updateFields.image = image;

    const updatedWorker = await Worker.findByIdAndUpdate(
      workerId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
