import React, { useState, useEffect } from 'react';
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
  const [submissionMessage, setSubmissionMessage] = useState(null);
  const [requests, setRequests] = useState([]);

   const userID = sessionStorage.getItem("userID");
  //  var id=0;
  // console.log("userID----"+ userID);
  // const tenantID=sessionStorage.getItem("landlordID");
  // console.log(tenantID);

  const [tenantInfo, setTenantInfo] = useState(null);
  // const[landlordID,setLandlordId]=useState(null);

useEffect(() => {
  const fetchTenantInfo = async () => {
    try {
      console.log("Fetching tenant info for userID:", userID);
      const res = await axios.get(`http://localhost:5000/api/tenant/user/${userID}`);
      console.log("Fetched tenant info:", res.data);
      console.log("Landlord ID in tenant data:", res.data.landlordId); // Add this
      setTenantInfo(res.data);
    } catch (error) {
      console.error("Error fetching tenant info:", error);
    }
  };
  // const fetchLandlordId = async () => {
  // try {
  //   const res = await axios.get(`http://localhost:5000/api/tenants/landlord/${userID}`);
  //   setLandlordId(res.data.landlordId);
  // } catch (error) {
  //   console.error("Error fetching landlord ID:", error);
  // }
  // };

  if (userID) {
    fetchTenantInfo();
    //fetchLandlordId();
  }
}, [userID]);


  //  Fetch all requests from API
  const fetchRequests = async () => {
  try {
    // Fetch all requests and filter by tenantId (which should match userID)
    const res = await axios.get(`http://localhost:5000/api/requests`);
    
    // Filter requests to only show those made by the current user
    const userRequests = res.data.filter(request => request.tenantId === userID);
    
    setRequests(userRequests);
  } catch (error) {
    console.error("Error fetching requests:", error);
  }
};

// Fetch on component mount and when userID changes
useEffect(() => {
  if (userID) {  // Only fetch if userID exists
    fetchRequests();
  }
}, [userID]);  // Add userID as dependency

  //const id=tenantInfo.landlordId;
  //  Handle submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!tenantInfo) {
    setSubmissionMessage({ type: "error", text: "Tenant info not loaded yet. Please try again shortly." });
    return;
  }

  if (!tenantInfo.landlordId) {
    setSubmissionMessage({ type: "error", text: "Landlord information is missing. Please contact support." });
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/requests", {
      description: `${formData.title} - ${formData.description}`,
      feedback: "",
      landlordId: tenantInfo.landlordId,
      tenantId: userID,
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

    await fetchRequests();
  } catch (error) {
    console.error("Error submitting request:", error);
    setSubmissionMessage({ type: "error", text: "Failed to submit request. Please try again." });
  }
};


  //  Filtered requests
  const activeRequests = requests.filter(req => req.status === "Pending" || req.status === "In Progress");
  const completedRequests = requests.filter(req => req.status === "Completed");

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
                {activeRequests.length === 0 ? (
                  <p>No active requests found.</p>
                ) : (
                  activeRequests.map((req, index) => (
                    <div className="card" key={index}>
                      <div className="card-header">
                        <div>
                          <h3>{req.description.split(" - ")[0]}</h3>
                          <p>Request #{req.id || `M2025-${index + 100}`}</p>
                        </div>
                        <span className={`badge ${req.status.toLowerCase().replace(" ", "-")}`}>{req.status}</span>
                      </div>
                      <div className="card-body">
                        <p><strong>Description:</strong> {req.description.split(" - ")[1]}</p>
                        <p><strong>Status Update:</strong> {req.feedback || "No updates yet."}</p>
                      </div>
                    </div>
                  ))
                )}
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
                {completedRequests.length === 0 ? (
                  <p>No completed requests yet.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Request #</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedRequests.map((req, index) => (
                        <tr key={index}>
                          <td>{req.id || `M2025-${index + 50}`}</td>
                          <td>{req.description}</td>
                          <td><span className="badge completed">Completed</span></td>
                          <td>{req.feedback || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantsMaintenancePage;
