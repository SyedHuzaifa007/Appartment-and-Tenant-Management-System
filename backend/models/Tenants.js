const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tenantSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    landlordId: {
        type: Schema.Types.ObjectId,
        ref: 'Landlord',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = model("Tenant", tenantSchema);
