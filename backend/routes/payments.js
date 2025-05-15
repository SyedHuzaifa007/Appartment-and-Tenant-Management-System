const express = require("express");
const Payment = require("../models/Payments");
const Tenant = require("../models/Tenants");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); 
const { getRecentPayments } = require("../controllers/paymentController");

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  try {
    const userID = req.user._id;  
    const { amount } = req.body;

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    const tenant = await Tenant.findOne({ userId: user._id });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    const newPayment = new Payment({
      tenantId: tenant._id,
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

router.get('/recent', getRecentPayments);

module.exports = router;
