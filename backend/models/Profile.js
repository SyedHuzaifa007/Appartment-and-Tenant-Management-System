const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    photoUrl: String,
    password: { type: String, required: true }
});

profileSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Profile", profileSchema);
