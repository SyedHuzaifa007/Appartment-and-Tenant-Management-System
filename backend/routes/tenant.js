const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenants');

router.get('/:propertyId', async (req, res) => {
    try {
        const { propertyId } = req.params;
        const tenants = await Tenant.find({ propertyId });
        res.status(200).json(tenants);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tenants' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { propertyId, landlordId, name, cnic, email, phone, unit, rent, dueDate } = req.body;

        console.log('Received data:', req.body);
        
        const newTenant = new Tenant({
            propertyId,
            landlordId,
            name,
            cnic,
            email,
            phone,
            unit,
            rent,
            dueDate
        });

        await newTenant.save();
        res.status(201).json(newTenant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving tenant' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTenant = await Tenant.findByIdAndDelete(id);
        if (!deletedTenant) {
            return res.status(404).json({ error: 'Tenant not found' });
        }
        res.status(200).json({ message: 'Tenant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting tenant' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedTenant = await Tenant.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedTenant) {
            return res.status(404).json({ error: 'Tenant not found' });
        }
        res.status(200).json(updatedTenant);
    } catch (error) {
        res.status(500).json({ error: 'Error updating tenant' });
    }
});

module.exports = router;
