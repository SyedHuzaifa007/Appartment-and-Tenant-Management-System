const express = require("express");
const Worker = require("../models/Worker");
const router = express.Router();

router.get("/", async (req, res) => {
  const workers = await Worker.find();
  res.json(workers);
});

router.post("/", async (req, res) => {
  const worker = new Worker(req.body);
  await worker.save();
  res.status(201).json(worker);
});

router.delete("/:id", async (req, res) => {
  await Worker.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;