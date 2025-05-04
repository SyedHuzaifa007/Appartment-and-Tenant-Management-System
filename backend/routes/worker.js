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

// GET /api/workers (fetch all workers)
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    console.error("Error fetching workers:", err);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

// DELETE /api/workers/:id (delete a worker)
router.delete("/:id", async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting worker:", err);
    res.status(500).json({ error: "Failed to delete worker" });
  }
});

// POST /api/workers (create a new worker with image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, workerType, salary } = req.body;
    const image = req.file ? req.file.path : ""; // Store the file path in DB

    const newWorker = new Worker({
      name,
      workerType,
      salary,
      image, // Save image path to database
    });

    const savedWorker = await newWorker.save();
    res.status(201).json(savedWorker);
  } catch (err) {
    console.error("Error saving worker:", err);
    res.status(500).json({ error: "Failed to save worker" });
  }
});

module.exports = router;
