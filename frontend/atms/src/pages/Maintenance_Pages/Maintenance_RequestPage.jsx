import React, { useEffect, useState } from "react";
import axios from "axios";

function Maintenance_RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState("");
  const [proof, setProof] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("proof", proof);
    formData.append("status", isDone ? "sent for review" : selectedRequest.status);

    try {
      await axios.put(`http://localhost:5000/api/requests/${selectedRequest._id}`, formData);
      setSelectedRequest(null);
      fetchRequests(); 
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  const renderRequestList = (status, title) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold">{title}</h2>
      {requests.filter(req => req.status === status).length === 0 ? (
        <p>No {title.toLowerCase()}.</p>
      ) : (
        <ul>
          {requests.filter(req => req.status === status).map((req) => (
            <li key={req._id} className="border p-3 my-2">
              <strong>Description:</strong> {req.description} <br />
              <strong>Feedback:</strong> {req.feedback || "N/A"} <br />
              <strong>Assigned To:</strong> {req.assignedTo ? req.assignedTo.name : "Not assigned"} <br />
              {status === "pending" && (
                <button
                  className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
                  onClick={() => {
                    setSelectedRequest(req);
                    setComment("");
                    setProof(null);
                    setIsDone(false);
                  }}
                >
                  Open Form
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (loading) return <p>Loading requests...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maintenance Requests</h1>
      
      {renderRequestList("pending", "New Maintenance Requests")}
      {renderRequestList("sent for review", "Requests Sent for Review")}
      {renderRequestList("completed", "Completed Requests")}

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-2">Update Request</h3>
            <p><strong>Description:</strong> {selectedRequest.description}</p>

            <label className="block mt-3">Upload Proof of Work:</label>
            <input
              type="file"
              onChange={(e) => setProof(e.target.files[0])}
            />

            <label className="block mt-3">Comments:</label>
            <textarea
              className="w-full border rounded p-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="mt-3">
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => setIsDone(!isDone)}
              />{" "}
              Mark as done
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-1 bg-gray-400 text-white rounded"
                onClick={() => setSelectedRequest(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-green-500 text-white rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Maintenance_RequestsPage;
