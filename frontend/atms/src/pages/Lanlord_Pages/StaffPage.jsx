import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function StaffPage() {
  const [workers, setWorkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    workerType: "",
    image: "",
    salary: "",
  });
  
  const [requests, setRequests] = useState([
    {
      id: 1,
      description: "Plumbing issue in Apt 12B",
      assignedTo: "",
      feedback: "",
      status: "Pending",
    },
    {
      id: 2,
      description: "AC not working in Apt 4A",
      assignedTo: "",
      feedback: "",
      status: "Pending",
    },
  ]);

  const [assignedRequests, setAssignedRequests] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWorker = () => {
    setWorkers((prev) => [...prev, { ...formData, id: workers.length + 1 }]);
    setFormData({ name: "", workerType: "", image: "", salary: "" });
    setShowForm(false);
  };

  const handleDeleteWorker = (id) => {
    setWorkers((prev) => prev.filter((worker) => worker.id !== id));
  };

  const handleAssignRequest = (workerId, requestId) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, assignedTo: workerId, status: "Assigned" }
          : req
      )
    );

    const assignedRequest = requests.find((req) => req.id === requestId);
    if (assignedRequest) {
      setAssignedRequests((prev) => [
        ...prev,
        { ...assignedRequest, assignedTo: workerId, status: "Assigned" },
      ]);
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    }

    toast.success("Request assigned successfully!", {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  const handleFeedbackChange = (e, requestId) => {
    const { value } = e.target;
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, feedback: value } : req
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      {/* Section: New Maintenance Requests */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          New Requests
        </h2>
        <br />
        <div className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-center text-gray-500">
              No new maintenance requests
            </p>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-md"
              >
                {/* Decline (X) Button */}
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to decline this request?"
                    );
                    if (confirmed) {
                      setRequests((prev) =>
                        prev.filter((req) => req.id !== request.id)
                      );
                    }
                  }}
                >
                  &times;
                </button>

                <span className="text-sm text-gray-600 mb-2 sm:mb-0">
                  {request.description}
                </span>

                {/* Status Tag */}
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold 
              ${
                request.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : ""
              }
              ${
                request.status === "Assigned" ? "bg-blue-100 text-blue-800" : ""
              }
              ${request.status === "Done" ? "bg-green-100 text-green-800" : ""}
            `}
                >
                  {request.status}
                </span>

                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={request.assignedTo}
                    onChange={(e) =>
                      handleAssignRequest(e.target.value, request.id)
                    }
                  >
                    <option value="">Assign Request</option>
                    {workers.map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.name}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="px-4 py-2 border border-gray-300 rounded-md w-48"
                    placeholder="Add Notes"
                    value={request.feedback}
                    onChange={(e) => handleFeedbackChange(e, request.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Section: Assigned Requests */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Assigned Requests
        </h2>
        <br />
        <div className="space-y-4">
          {assignedRequests.length === 0 ? (
            <p className="text-center text-gray-500">
              No assigned maintenance requests
            </p>
          ) : (
            assignedRequests.map((request) => (
              <div
                key={request.id}
                className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-md"
              >
                {/* Decline Button */}
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to decline this assigned request?"
                    );
                    if (confirmed) {
                      setAssignedRequests((prev) =>
                        prev.filter((req) => req.id !== request.id)
                      );
                    }
                  }}
                >
                  &times;
                </button>

                {/* Description */}
                <span className="text-sm text-gray-600 mb-2 sm:mb-0">
                  {request.description}
                </span>

                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold 
              ${
                request.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : ""
              }
              ${
                request.status === "Assigned" ? "bg-blue-100 text-blue-800" : ""
              }
              ${request.status === "Done" ? "bg-green-100 text-green-800" : ""}
            `}
                >
                  {request.status}
                </span>

                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={request.assignedTo}
                    onChange={(e) => {
                      const newWorkerId = e.target.value;
                      setAssignedRequests((prev) =>
                        prev.map((req) =>
                          req.id === request.id
                            ? { ...req, assignedTo: newWorkerId }
                            : req
                        )
                      );
                    }}
                  >
                    <option value="">Assign Request</option>
                    {workers.map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.name}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="px-4 py-2 border border-gray-300 rounded-md w-48"
                    placeholder="Add Notes"
                    value={request.feedback}
                    onChange={(e) =>
                      setAssignedRequests((prev) =>
                        prev.map((req) =>
                          req.id === request.id
                            ? { ...req, feedback: e.target.value }
                            : req
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Section: Add Maintenance Worker */}
      <div className="mb-6">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transform hover:scale-105 transition-all"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Worker"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Add Worker
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Worker Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="workerType"
              value={formData.workerType}
              onChange={handleInputChange}
              placeholder="Worker Type"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData({ ...formData, image: file });

                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Salary"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}

            <button
              className="w-full bg-green-500 text-white py-2 rounded-md shadow-md hover:bg-green-600 transform hover:scale-105 transition-all"
              onClick={handleAddWorker}
            >
              Add Worker
            </button>
          </div>
        </div>
      )}

      {/* Section: Display Maintenance Workers */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg"
          >
            <img
              src={worker.image}
              alt={worker.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700">
              {worker.name}
            </h3>
            <p className="text-sm text-gray-500">{worker.workerType}</p>
            <p className="text-sm text-gray-500">${worker.salary}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => alert("Update Worker")}
                className="group flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-full transition-all duration-300 hover:rounded-md hover:px-4"
              >
                <img
                  src="../../../src/assets/EditIcon_Black.png"
                  alt="Edit"
                  className="h-5 w-5 object-contain transition-transform group-hover:scale-110"
                />
                <span className="hidden group-hover:inline-block transition-opacity duration-300">
                  Update
                </span>
              </button>

              <button
                onClick={() => handleDeleteWorker(worker.id)}
                className="group flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-full transition-all duration-300 hover:rounded-md hover:px-4"
              >
                <img
                  src="../../../src/assets/DeleteIcon_Red.png"
                  alt="Edit"
                  className="h-5 w-5 object-contain transition-transform group-hover:scale-110"
                />
                <span className="hidden group-hover:inline-block transition-opacity duration-300">
                  Delete
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffPage;
