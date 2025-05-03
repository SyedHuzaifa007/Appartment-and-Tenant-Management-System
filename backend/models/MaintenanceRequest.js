const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
    description: String,
    feedback: String,
    status: {
      type: String,
      enum: ["Pending", "Assigned", "Done"],
      default: "Pending",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      default: null,
    },
    landlordId: String, 
    tenantId: String,
  });
  
  module.exports = model("Request", requestSchema);