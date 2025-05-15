
const express = require("express");
const multer = require("multer");
const Request = require("../models/MaintenanceRequest");
const router = express.Router();

// Setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// GET all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().populate("assignedTo");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// POST a new request
router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: "Failed to create request" });
  }
});

// PATCH to update request (no file)
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update request" });
  }
});


// PUT with file upload (proof + comment)
router.put("/:id", upload.single("proof"), async (req, res) => {
  try {
    const { comment, status } = req.body;
    const proofFilePath = req.file ? req.file.path : undefined;

    const updateData = { comment, status };
    if (proofFilePath) updateData.proofFilePath = proofFilePath;

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to update request with proof" });
  }
});

// DELETE a request
router.delete("/:id", async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete request" });
  }
});

// Example Express PUT route for updating a request
router.put('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  const { assignedTo, comments } = req.body;

  try {
    const updatedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { assignedTo, comments, status: "Assigned" }, // update status if needed
      { new: true }
    );
    if (!updatedRequest) return res.status(404).json({ message: "Request not found" });

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;