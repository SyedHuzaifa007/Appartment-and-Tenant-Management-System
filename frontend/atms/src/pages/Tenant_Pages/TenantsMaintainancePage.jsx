import React from 'react';
import "../../styling/tenants/Tenants-Maintainance.css"

const TenantsMaintenancePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Maintenance Request Submitted\nYour request has been sent to the maintenance team.");
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="title">Maintenance Requests</h1>
        <p className="subtitle">Submit and track your maintenance requests</p>

        <div className="tabs">
          <input type="radio" name="tab" id="active" defaultChecked />
          <input type="radio" name="tab" id="new" />
          <input type="radio" name="tab" id="history" />

          <div className="tabs-header">
            <label htmlFor="active">Active Requests</label>
            <label htmlFor="new">New Request</label>
            <label htmlFor="history">Request History</label>
          </div>

          <div className="tabs-body">
            <div className="tab-content active-content">
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
                  <p><strong>Description:</strong> The kitchen sink faucet is leaking when turned on, causing water to pool on the counter.</p>
                  <p><strong>Submitted:</strong> July 5, 2025</p>
                  <p><strong>Scheduled Service:</strong> July 12, 2025, 10:00 AM</p>
                  <p><strong>Status Update:</strong> Parts have been ordered and are expected to arrive tomorrow.</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div>
                    <h3>AC Not Cooling</h3>
                    <p>Request #M2025-098</p>
                  </div>
                  <span className="badge scheduled">Scheduled</span>
                </div>
                <div className="card-body">
                  <p><strong>Description:</strong> The air conditioner is running but not cooling the apartment. Temperature inside is around 78°F.</p>
                  <p><strong>Submitted:</strong> July 3, 2025</p>
                  <p><strong>Scheduled Service:</strong> July 14, 2025, 1:30 PM</p>
                  <p><strong>Status Update:</strong> An HVAC specialist has been scheduled to diagnose and repair the AC unit.</p>
                </div>
              </div>
            </div>

            <div className="tab-content">
              {/* New Request */}
              <form className="form" onSubmit={handleSubmit}>
                <h3>Submit New Maintenance Request</h3>
                <p>Please provide details about the maintenance issue</p>

                <label>
                  Issue Type
                  <select required>
                    <option value="">Select an issue type</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="structural">Wear and Tear</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label>
                  Brief Title
                  <input type="text" placeholder="e.g., Bathroom sink leaking" required />
                </label>

                <label>
                  Detailed Description
                  <textarea rows="5" placeholder="Describe the issue in detail." required />
                </label>

                <label>
                  Location in Apartment
                  <input type="text" placeholder="e.g., Master bathroom" required />
                </label>

                <label>
                  Access Instructions (Optional)
                  <textarea rows="3" placeholder="Any special access instructions for maintenance staff." />
                </label>

                <label className="checkbox">
                  <input type="checkbox" />
                  This is an emergency requiring immediate attention
                </label>

                <button type="submit">Submit Request</button>
              </form>
            </div>

            <div className="tab-content">
              {/* Request History */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantsMaintenancePage;
