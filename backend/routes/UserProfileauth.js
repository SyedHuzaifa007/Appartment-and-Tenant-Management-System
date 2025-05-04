// const express = require("express");
// const bcrypt = require("bcryptjs");
// const { authMiddleware } = require("./authRoutes");
// const User = require("../models/User");
// const UserProfile = require("../models/UserProfile");

// const router = express.Router();

// router.get("/profile", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("name email role");
//     const profile = await UserProfile.findOne({ user: req.user.id });
//     res.json({ ...user.toObject(), profile });
//   } catch (err) {
//     console.error("Error fetching profile:", err);
//     res.status(500).json({ message: "Failed to load profile" });
//   }
// });

// router.put("/profile", authMiddleware, async (req, res) => {
//   try {
//     const { phone, address, photoUrl } = req.body;
//     let profile = await UserProfile.findOne({ user: req.user.id });

//     if (!profile) {
//       profile = new UserProfile({ user: req.user.id, phone, address, photoUrl });
//     } else {
//       profile.phone = phone;
//       profile.address = address;
//       profile.photoUrl = photoUrl;
//     }

//     await profile.save();
//     res.json({ message: "Profile updated", profile });
//   } catch (err) {
//     console.error("Error updating profile:", err);
//     res.status(500).json({ message: "Failed to update profile" });
//   }
// });

// router.put("/change-password", authMiddleware, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     const user = await User.findById(req.user.id);

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Current password is incorrect" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({ message: "Password changed successfully" });
//   } catch (err) {
//     console.error("Error changing password:", err);
//     res.status(500).json({ message: "Failed to change password" });
//   }
// });

// module.exports = router;
