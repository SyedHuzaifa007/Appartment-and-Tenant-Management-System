const { Schema, model } = require("mongoose");

const assignedRequestSchema = new Schema({
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
  dueDate: Date, // new field
});

module.exports = model("AssignedRequest", assignedRequestSchema);