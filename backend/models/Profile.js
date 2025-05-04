const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    photoUrl: String,
    password: { type: String, required: true }
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Profile", profileSchema);
