const express = require("express");
const Request = require("../models/MaintenanceRequest");
const router = express.Router();

router.get("/", async (req, res) => {
  const requests = await Request.find().populate("assignedTo");
  res.json(requests);
});

router.post("/", async (req, res) => {
  const request = new Request(req.body);
  await request.save();
  res.status(201).json(request);
});

router.patch("/:id", async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(request);
});

router.delete("/:id", async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;