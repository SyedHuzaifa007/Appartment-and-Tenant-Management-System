const express = require("express");
const Payment = require("../models/Payments");
const Tenant = require("../models/Tenants");
const authMiddleware = require("../middleware/auth"); 

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const tenantId = req.user.id;

    const tenant = await Tenant.findOne({ _id: tenantId });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    const { amount } = req.body;
    const newPayment = new Payment({
      tenantId,
      landlordId: tenant.landlordId,
      amount
    });

    await newPayment.save();
    res.status(201).json({ message: "Payment saved", payment: newPayment });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
