const { Schema, model } = require("mongoose");

const tenantSchema = new Schema({
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
