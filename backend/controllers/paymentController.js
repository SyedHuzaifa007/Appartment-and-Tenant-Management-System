// controllers/paymentController.js
const mongoose = require('mongoose');
const Payment = require('../models/Payments'); 
const Tenant = require('../models/Tenants');   

exports.getRecentPayments = async (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 12;
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    const recentPayments = await Payment.find({ date: { $gte: since } })
      .populate({ path: 'tenantId', select: 'name' }) // populate tenant name
      .lean(); // faster, returns plain JS objects

    const formatted = recentPayments.map(p => ({
      _id: p._id,
      tenantId: p.tenantId._id,
      tenantName: p.tenantId.name,
      landlordId: p.landlordId,
      amount: p.amount,
      date: p.date
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getRecentPayments:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
