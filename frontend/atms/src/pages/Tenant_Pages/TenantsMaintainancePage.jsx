import React, { useState } from 'react';
import axios from 'axios';
import "../../styling/tenants/Tenants-Maintainance.css";

const TenantsMaintenancePage = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    title: '',
    description: '',
    location: '',
    accessInstructions: '',
    isEmergency: false,
  });

  const [activeTab, setActiveTab] = useState("active");
  const [submissionMessage, setSubmissionMessage] = useState(null); // success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5173/api/requests", {
        description: `${formData.title} - ${formData.description}`,
        feedback: "",
        landlordId: "landlord001",
        tenantId: "tenant007",
        status: "Pending"
      });

      setSubmissionMessage({ type: "success", text: "Request submitted successfully." });
      setFormData({
        issueType: '',
        title: '',
        description: '',
        location: '',
        accessInstructions: '',
        isEmergency: false,
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      setSubmissionMessage({ type: "error", text: "Failed to submit request. Please try again." });
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="title">Maintenance Requests</h1>
        <p className="subtitle">Submit and track your maintenance requests</p>

        <div className="tabs">
          <div className="tabs-header">
            <button className={activeTab === "active" ? "active-tab" : ""} onClick={() => setActiveTab("active")}>Active Requests</button>
            <button className={activeTab === "new" ? "active-tab" : ""} onClick={() => setActiveTab("new")}>New Request</button>
            <button className={activeTab === "history" ? "active-tab" : ""} onClick={() => setActiveTab("history")}>Request History</button>
          </div>

          <div className="tabs-body">
            {activeTab === "active" && (
              <div className="tab-content">
                {/* Active Requests */}
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h3>Leaking Faucet Repair</h3>
                      <p>Request #M2025-103</p>
                    </div>
                    <span className="badge in-progress">In Progress</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Description:</strong> The kitchen sink faucet is leaking when turned on.</p>
                    <p><strong>Submitted:</strong> July 5, 2025</p>
                    <p><strong>Scheduled Service:</strong> July 12, 2025</p>
                    <p><strong>Status Update:</strong> Parts have been ordered.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "new" && (
              <div className="tab-content">
                <form className="form" onSubmit={handleSubmit}>
                  <h3>Submit New Maintenance Request</h3>
                  <p>Please provide details about the maintenance issue</p>

                  {submissionMessage && (
                    <div className={`message ${submissionMessage.type}`}>
                      {submissionMessage.text}
                    </div>
                  )}

                  <label>
                    Issue Type
                    <select
                      value={formData.issueType}
                      onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                      required
                    >
                      <option value="">Select an issue type</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="structural">Wear and Tear</option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  <label>
                    Brief Title
                    <input
                      type="text"
                      placeholder="e.g., Bathroom sink leaking"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </label>

                  <label>
                    Detailed Description
                    <textarea
                      rows="5"
                      placeholder="Describe the issue in detail."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </label>

                  <label>
                    Location in Apartment
                    <input
                      type="text"
                      placeholder="e.g., Master bathroom"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </label>

                  <label>
                    Access Instructions (Optional)
                    <textarea
                      rows="3"
                      placeholder="Any special access instructions."
                      value={formData.accessInstructions}
                      onChange={(e) => setFormData({ ...formData, accessInstructions: e.target.value })}
                    />
                  </label>

                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={formData.isEmergency}
                      onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
                    />
                    This is an emergency requiring immediate attention
                  </label>

                  <button type="submit">Submit Request</button>
                </form>
              </div>
            )}

            {activeTab === "history" && (
              <div className="tab-content">
                <table>
                  <thead>
                    <tr>
                      <th>Request #</th>
                      <th>Issue</th>
                      <th>Submitted</th>
                      <th>Completed</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>M2025-089</td>
                      <td>Bathroom Light Fixture</td>
                      <td>June 15, 2025</td>
                      <td>June 18, 2025</td>
                      <td><span className="badge completed">Completed</span></td>
                    </tr>
                    <tr>
                      <td>M2025-075</td>
                      <td>Garbage Disposal Not Working</td>
                      <td>May 22, 2025</td>
                      <td>May 24, 2025</td>
                      <td><span className="badge completed">Completed</span></td>
                    </tr>
                    <tr>
                      <td>M2025-063</td>
                      <td>Window Screen Repair</td>
                      <td>April 10, 2025</td>
                      <td>April 15, 2025</td>
                      <td><span className="badge completed">Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantsMaintenancePage;
