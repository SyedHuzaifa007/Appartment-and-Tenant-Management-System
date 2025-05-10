import React, { useEffect, useState } from "react";
import axios from "axios";

function Maintenance_RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/requests"); // Update this URL as needed
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;

  return (
    <div>
      <h1>Maintenance Requests</h1>
      {requests.length === 0 ? (
        <p>No maintenance requests found.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req._id}>
              <strong>Status:</strong> {req.status} <br />
              <strong>Description:</strong> {req.description} <br />
              <strong>Feedback:</strong> {req.feedback || "N/A"} <br />
              <strong>Assigned To:</strong> {req.assignedTo ? req.assignedTo.name : "Not assigned"} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Maintenance_RequestsPage;
