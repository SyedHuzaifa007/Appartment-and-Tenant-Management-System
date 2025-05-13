
import React from 'react';
import "../../styling/tenants/tenants.css";

const TenantPaymentsPage = () => {
  const [activeTab, setActiveTab] = React.useState("make-payment");
  const [showToast, setShowToast] = React.useState(false);

  const paymentAmount = 1400;

  // Payment-methods state
  const [methods, setMethods] = React.useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/2027' }
  ]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  // Form fields for add/edit
  const [cardType, setCardType] = React.useState('');
  const [last4, setLast4] = React.useState('');
  const [expiry, setExpiry] = React.useState('');

  const handlePaymentSubmit = async (e) => {
  e.preventDefault();

  const userID = sessionStorage.getItem("userID");
  console.log(userID);
  const token = localStorage.getItem("token");
  console.log(token);

//   if (!userID || userID === "undefined" || userID === "null" || !token) {
//   return alert("Login required");
// }


  try {
    const res = await fetch("http://localhost:5000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ amount: paymentAmount, userID }) // Include userID here
    });

    const data = await res.json();
    if (res.ok) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } else {
      alert(data.message || "Payment failed");
    }
  } catch (err) {
    console.error("Payment error:", err);
    alert("An error occurred");
  }
};



  const handleAddNew = () => {
    setCardType('');
    setLast4('');
    setExpiry('');
    setIsAdding(true);
    setEditingId(null);
  };

  const handleSaveNew = () => {
    const nextId = methods.length ? Math.max(...methods.map(m => m.id)) + 1 : 1;
    setMethods([...methods, { id: nextId, type: cardType, last4, expiry }]);
    setIsAdding(false);
  };

  const handleEdit = (method) => {
    setEditingId(method.id);
    setCardType(method.type);
    setLast4(method.last4);
    setExpiry(method.expiry);
    setIsAdding(false);
  };

  const handleSaveEdit = () => {
    setMethods(methods.map(m =>
      m.id === editingId ? { ...m, type: cardType, last4, expiry } : m
    ));
    setEditingId(null);
  };

  const handleRemove = (id) => {
    setMethods(methods.filter(m => m.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleCancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="tenant-page">
      <h1>Payments</h1>
      <p className="subtext">Manage your rent payments</p>

      {/* Tabs */}
      <div className="tab-buttons">
        {['make-payment','payment-methods','history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'tab-active' : 'tab-inactive'}
          >
            {tab === 'make-payment' ? 'Make a Payment'
              : tab === 'payment-methods' ? 'Payment Methods'
              : 'Payment History'}
          </button>
        ))}
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
        <div>
          <div className="card" style={{ maxWidth: "600px", marginBottom: '1rem' }}>
            <h2>Your Payment Methods</h2>
            <p className="subtext">Manage your saved payment methods</p>

            {/* List */}
            {methods.length === 0 && <p>No saved methods.</p>}
            {methods.map(method => (
              <div key={method.id} className="method-container">
                {editingId === method.id ? (
                  <>
                    <div style={{ flex: 1 }}>
                      <input
                        type="text" placeholder="Card Type"
                        value={cardType}
                        onChange={e => setCardType(e.target.value)}
                      />
                      <input
                        type="text" placeholder="Last 4"
                        value={last4}
                        onChange={e => setLast4(e.target.value)}
                        style={{ marginLeft: '0.5rem' }}
                      />
                      <input
                        type="text" placeholder="Expiry"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        style={{ marginLeft: '0.5rem' }}
                      />
                    </div>
                    <div className="actions">
                      <button className="submit-button" onClick={handleSaveEdit}>Save</button>
                      <button className="submit-button" onClick={handleCancelForm}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <span style={{ fontSize: '1.5rem' }}>💳</span>
                      <div>
                        <div style={{ fontWeight: '500' }}>{method.type} ending in {method.last4}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Expires {method.expiry}</div>
                      </div>
                    </div>
                    <div className="actions">
                      <button className="submit-button" onClick={() => handleEdit(method)}>Edit</button>
                      <button className="submit-button" onClick={() => handleRemove(method.id)}>Remove</button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Add New */}
            {isAdding ? (
              <div className="method-container">
                <div style={{ flex: 1 }}>
                  <input
                    type="text" placeholder="Card Type"
                    value={cardType}
                    onChange={e => setCardType(e.target.value)}
                  />
                  <input
                    type="text" placeholder="Last 4"
                    value={last4}
                    onChange={e => setLast4(e.target.value)}
                    style={{ marginLeft: '0.5rem' }}
                  />
                  <input
                    type="text" placeholder="Expiry"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    style={{ marginLeft: '0.5rem' }}
                  />
                </div>
                <div className="actions">
                  <button className="submit-button" onClick={handleSaveNew}>Save</button>
                  <button className="submit-button" onClick={handleCancelForm}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className="add-method-btn" onClick={handleAddNew}>
                Add New Payment Method
              </button>
            )}
          </div>
        </div>
      )}

      {/* Payment History Tab */}
      {activeTab === "history" && (
        <div className="table-wrapper">
          {/* ... unchanged history table */}
        </div>
      )}
    </div>
  );
};

export default TenantPaymentsPage;
