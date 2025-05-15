// controllers/paymentController.js
const mongoose = require('mongoose');
const Payment = require('../models/Payments'); 
const Tenant = require('../models/Tenants');   

// controllers/paymentController.js (or wherever your route logic is)

const Property = require('../models/Properties');

exports.getRecentPayments = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const hours = parseInt(req.query.hours) || 24;
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    // Get recent payments
    const payments = await Payment.find({ date: { $gte: since } })
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    // Enrich with tenant and property name
    const enriched = await Promise.all(
      payments.map(async (payment) => {
        const tenant = await Tenant.findById(payment.tenantId).lean();
        const property = tenant ? await Property.findById(tenant.propertyId).lean() : null;

        return {
          ...payment,
          tenantName: tenant?.name || "Unknown",
          propertyName: property?.name || "Unknown",
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error("Error fetching enriched payments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
