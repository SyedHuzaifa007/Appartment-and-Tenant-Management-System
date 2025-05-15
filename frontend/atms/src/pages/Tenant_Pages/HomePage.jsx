import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styling/tenants/TenantHomePage.css';

function TenantHomePage() {
    const [tenantData, setTenantData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //const { userId } = useParams(); // This is lowercase d in 'userId'
    const userID=sessionStorage.getItem("userID");

    useEffect(() => {
        const fetchTenantData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tenant/user/${userID}`); // Changed userID to userId
                setTenantData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTenantData();
    }, [userID]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!tenantData) {
        return <div className="no-data">No tenant data found</div>;
    }

    // Format the due date for display
    const formattedDueDate = new Date(tenantData.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Calculate days remaining until due date
    const today = new Date();
    const dueDate = new Date(tenantData.dueDate);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return (
        <div className="tenant-home-container">
            <h1>Welcome, {tenantData.name}!</h1>
            
            <div className="rent-info-card">
                <h2>Rent Information</h2>
                
                <div className="info-row">
                    <span className="info-label">Apartment Unit:</span>
                    <span className="info-value">{tenantData.unit}</span>
                </div>
                
                <div className="info-row">
                    <span className="info-label">Monthly Rent:</span>
                    <span className="info-value">${tenantData.rent.toFixed(2)}</span>
                </div>
                
                <div className="info-row">
                    <span className="info-label">Next Payment Due:</span>
                    <span className="info-value">{formattedDueDate}</span>
                </div>
                
                <div className="info-row">
                    <span className="info-label">Days Remaining:</span>
                    <span className={`info-value ${daysRemaining <= 7 ? 'warning' : ''}`}>
                        {daysRemaining > 0 ? daysRemaining : 'PAST DUE'}
                    </span>
                </div>
            </div>
            
            <div className="actions-section">
                {/* <button className="pay-rent-btn">Pay Rent</button> */}
                <button className="contact-landlord-btn">Contact Landlord</button>
            </div>
            
            <div className="payment-history">
                <h3>Payment History</h3>
                <p>No recent payments</p>
            </div>
        </div>
    );
}

export default TenantHomePage;