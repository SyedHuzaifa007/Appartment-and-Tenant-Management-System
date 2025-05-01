import React from 'react';
import "../../styling/TenantStyling/TenantsPaymentPage.css"

const TenantPaymentsPage = () => {
  const [activeTab, setActiveTab] = React.useState("make-payment");
  const [showToast, setShowToast] = React.useState(false);

  const paymentAmount=1400;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 1500);
  };

  return (
    <div className="tenant-page">
      <h1>Payments</h1>
      <p className="subtext">Manage your rent payments</p>

      {/* Tabs */}
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("make-payment")}
          className={activeTab === "make-payment" ? "tab-active" : "tab-inactive"}
        >
          Make a Payment
        </button>
        <button
          onClick={() => setActiveTab("payment-methods")}
          className={activeTab === "payment-methods" ? "tab-active" : "tab-inactive"}
        >
          Payment Methods
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={activeTab === "history" ? "tab-active" : "tab-inactive"}
        >
          Payment History
        </button>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast">
          <strong>Payment Successful</strong>
          <div>Your payment of ${paymentAmount} has been processed successfully.</div>
        </div>
      )}

      {/* Make Payment Tab */}
      {activeTab === "make-payment" && (
        <div className="table-wrapper" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          <div className="card">
            <h2>Pay Rent</h2>
            <p className="subtext">Make your rent payment securely online</p>
            <form onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label htmlFor="amount">Payment Amount</label>
                <div className="input-icon-wrapper">
                  <span>$</span>
                  <input id="amount" type="text" value={paymentAmount} readOnly />
                </div>
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-method-box">
                  <span>💳</span>
                  <div>
                    <div style={{ fontWeight: "500" }}>Visa ending in 4242</div>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Expires 12/2027</div>
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button">Pay Now</button>
              <p className="info-text">
                Your payment will be processed securely via our payment processor
              </p>
            </form>
          </div>

          <div className="card">
            <h2>Payment Summary</h2>
            <div className="summary-item">
              <span>Monthly Rent</span>
              <span>${paymentAmount}</span>
            </div>
            <div className="summary-item">
              <span>Late Fees</span>
              <span>$0.00</span>
            </div>
            <div className="summary-item">
              <span>Previous Balance</span>
              <span>$0.00</span>
            </div>
            <hr />
            <div className="summary-item summary-total">
              <span>Total Due</span>
              <span>${paymentAmount}</span>
            </div>
            
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === "payment-methods" && (
        <div className="card" style={{ maxWidth: "600px" }}>
          <h2>Your Payment Methods</h2>
          <p className="subtext">Manage your saved payment methods</p>
          <div className="method-container">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>💳</span>
              <div>
                <div style={{ fontWeight: "500" }}>Visa ending in 4242</div>
                <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Expires 12/2027</div>
              </div>
            </div>
            <div className="actions">
              <button className="submit-button" >Edit</button>
              <button className="submit-button" >Remove</button>
            </div>
          </div>
          <button className="add-method-btn">Add New Payment Method</button>
        </div>
      )}

      {/* Payment History Tab */}
      {activeTab === "history" && (
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {["June", "May", "April"].map((month, idx) => (
                <tr key={idx}>
                  <td>{month} 1, 2025</td>
                  <td>Monthly Rent</td>
                  <td>${paymentAmount}</td>
                  <td><span className="badge-paid">Paid</span></td>
                  <td><button className="download-button">Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TenantPaymentsPage;

