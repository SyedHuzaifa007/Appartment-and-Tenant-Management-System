const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/Profile");
const bcrypt = require("bcrypt");

// GET /api/profile - Fetch current user profile
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /api/profile - Update user profile
router.put("/", auth, async (req, res) => {
    const { name, email, photoUrl } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, photoUrl },
            { new: true }
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Error updating profile" });
    }
});

// PUT /api/change-password - Change user password
router.put("/change-password", auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error changing password" });
    }
});

module.exports = router;
