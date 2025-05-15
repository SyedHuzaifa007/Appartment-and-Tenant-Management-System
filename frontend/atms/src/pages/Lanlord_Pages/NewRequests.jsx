import React, { useEffect, useState } from "react";
import axios from "axios";

const NewRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [assignments, setAssignments] = useState({}); 
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const landlordId = sessionStorage.getItem("userID");

    axios
      .get("http://localhost:5173/api/requests")
      .then((res) => {
        const allRequests = res.data || [];
        const landlordRequests = allRequests.filter(req => req.landlordId === landlordId);

        const pendingRequests = landlordRequests.filter(req => req.status?.toLowerCase() === "pending");
        const assignedReqs = landlordRequests.filter(req => req.status?.toLowerCase() === "assigned");

        setRequests(pendingRequests);
        setAssignedRequests(assignedReqs);
      })
      .catch((err) => console.error("Failed to fetch requests:", err));

    axios
      .get("http://localhost:5173/api/workers")
      .then((res) => {
        const landlordId = sessionStorage.getItem("userID");
        const filteredWorkers = (res.data || []).filter(worker => worker.createdBy === landlordId);
        setWorkers(filteredWorkers);
      })
      .catch((err) => console.error("Failed to fetch workers:", err));

    axios
      .get("http://localhost:5173/api/tenant")
      .then((res) => setTenants(res.data || []))
      .catch((err) => console.error("Failed to fetch tenants:", err));
  }, []);

  const getTenantName = (tenantId) => {
    const tenant = tenants.find((t) => t._id === tenantId);
    return tenant?.name || "Unknown Tenant";
  };

  const getWorkerName = (workerIdOrObj) => {
    if (!workerIdOrObj) return "Unknown Worker";
    if (typeof workerIdOrObj === "object" && workerIdOrObj.name) {
      return workerIdOrObj.name;
    }
    const worker = workers.find((w) => w._id === workerIdOrObj);
    return worker?.name || "Unknown Worker";
  };

  const handleAssignChange = (reqId, field, value) => {
    setAssignments((prev) => ({
      ...prev,
      [reqId]: {
        ...prev[reqId],
        [field]: value,
      },
    }));
  };

  const handleAssignSubmit = async (requestId) => {
    const { workerId, comments } = assignments[requestId] || {};
    if (!workerId) return alert("Please select a worker");

    try {
      await axios.patch(`http://localhost:5173/api/requests/${requestId}`, {
        assignedTo: workerId,
        comments: comments || "",
        status: "Assigned",
      });

      const assignedRequest = requests.find((r) => r._id === requestId);
      assignedRequest.assignedTo = workerId;

      setRequests((prev) => prev.filter((r) => r._id !== requestId));
      setAssignedRequests((prev) => [...prev, assignedRequest]);

      setAssignments((prev) => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });

      setToast(`Request assigned to ${getWorkerName(workerId)} successfully`);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to assign request:", err);
      alert("Failed to assign request");
    }
  };

  const handleCancelRequest = (requestId, isAssigned) => {
  const confirmDelete = window.confirm("Are you sure you want to cancel this request?");
  if (!confirmDelete) return;

  if (isAssigned) {
    setAssignedRequests((prev) => prev.filter((r) => r._id !== requestId));
  } else {
    setRequests((prev) => prev.filter((r) => r._id !== requestId));
  }

  setToast("Request removed from the list");
  setTimeout(() => setToast(null), 3000);
};


  const renderRequestCard = (request, isAssigned = false) => (
    <div
      key={request._id}
      className="bg-white p-4 rounded-lg shadow-md space-y-2 relative"
    >
      {/* Cancel button */}
      <button
        onClick={() => handleCancelRequest(request._id, isAssigned)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600 font-bold text-lg"
        title="Cancel Request"
        aria-label="Cancel Request"
      >
        &times;
      </button>

      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row">
        <div>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Description:</strong> {request.description}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Tenant:</strong> {getTenantName(request.tenantId)}
          </p>
        </div>
        <span className="px-2 py-1 text-xs rounded-full font-semibold bg-yellow-100 text-yellow-800">
          {request.status}
        </span>
      </div>

      {!isAssigned && (
        <>
          <select
            className="mt-2 w-full sm:w-auto border rounded px-3 py-1"
            value={assignments[request._id]?.workerId || ""}
            onChange={(e) =>
              handleAssignChange(request._id, "workerId", e.target.value)
            }
          >
            <option value="">Assign to worker</option>
            {workers.map((worker) => (
              <option key={worker._id} value={worker._id}>
                {worker.name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Add comments (optional)"
            className="w-full border rounded px-3 py-2 mt-2 text-sm"
            rows={2}
            value={assignments[request._id]?.comments || ""}
            onChange={(e) =>
              handleAssignChange(request._id, "comments", e.target.value)
            }
          />

          <button
            onClick={() => handleAssignSubmit(request._id)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
          >
            Assign Request
          </button>
        </>
      )}

      {isAssigned && (
        <p className="text-sm text-gray-600">
          <strong>Assigned To:</strong> {getWorkerName(request.assignedTo)}
        </p>
      )}
    </div>
  );

  return (
    <div className="mt-8 space-y-10">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        New Requests
      </h1>

<br />
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">
          No new maintenance requests
        </p>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => renderRequestCard(request))}
        </div>
      )}

      {assignedRequests.length > 0 && (
        <div>
          <h1 className="text-xl font-semibold text-gray-700 mt-10 text-center">
            Assigned Requests
          </h1>
          <div className="space-y-6 mt-4">
            {assignedRequests.map((req) => renderRequestCard(req, true))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewRequestsList;
