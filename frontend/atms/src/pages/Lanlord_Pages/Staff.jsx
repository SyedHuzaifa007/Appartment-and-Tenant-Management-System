import React, { useState } from "react";

const initialStaff = [
  {
    id: 1,
    name: "Robert Johnson",
    role: "Full-time Maintenance Technician",
    email: "robert@example.com",
    phone: "(555) 123-4567",
    properties: "Building A, Building C",
    currentJobs: 3,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Full-time Maintenance Supervisor",
    email: "maria@example.com",
    phone: "(555) 987-6543",
    properties: "All Buildings",
    currentJobs: 2,
  },
  {
    id: 3,
    name: "David Smith",
    role: "Part-time Maintenance Assistant",
    email: "david@example.com",
    phone: "(555) 456-7890",
    properties: "Building E",
    currentJobs: 1,
  },
];

const initialJobs = [
  {
    id: 1,
    description: "Leaking faucet repair",
    location: "Apartment 301",
    property: "Building A",
    assignedTo: "Robert Johnson",
    status: "In Progress",
  },
  {
    id: 2,
    description: "AC repair",
    location: "Apartment 205",
    property: "Building C",
    assignedTo: "Maria Garcia",
    status: "Scheduled",
  },
  {
    id: 3,
    description: "Door lock replacement",
    location: "Apartment 102",
    property: "Building E",
    assignedTo: "David Smith",
    status: "Pending",
  },
];

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [staffList, setStaffList] = useState(initialStaff);
  const [jobs, setJobs] = useState(initialJobs);

  const handleStatusChange = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const handleAddStaff = () => {
    const name = prompt("Enter staff member name:");
    const role = prompt("Enter role:");
    const email = prompt("Enter email:");
    const phone = prompt("Enter phone number:");
    const properties = prompt("Enter properties assigned:");

    if (!name || !role || !email || !phone || !properties) return alert("All fields are required.");

    const newStaff = {
      id: Date.now(),
      name,
      role,
      email,
      phone,
      properties,
      currentJobs: 0,
    };

    setStaffList((prev) => [...prev, newStaff]);
  };

  const handleAssignJob = (staff) => {
    const description = prompt("Enter job description:");
    const location = prompt("Enter job location:");
    const property = prompt("Enter property name:");
    const status = prompt("Enter job status (Scheduled/In Progress/Pending):");

    if (!description || !location || !property || !status) return alert("All fields are required.");

    const newJob = {
      id: Date.now(),
      description,
      location,
      property,
      assignedTo: staff.name,
      status,
    };

    setJobs((prev) => [...prev, newJob]);
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === staff.id ? { ...s, currentJobs: s.currentJobs + 1 } : s
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Staff Management</h1>
      <p className="text-gray-600 mb-6">Manage your maintenance staff and assign tasks</p>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === "staff" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("staff")}
        >
          Staff Members
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "jobs" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("jobs")}
        >
          Maintenance Jobs
        </button>
        {activeTab === "staff" && (
          <button
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddStaff}
          >
            + Add Staff Member
          </button>
        )}
      </div>

      {activeTab === "staff" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((staff) => (
            <div key={staff.id} className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold">{staff.name}</h2>
              <p className="text-gray-500">{staff.role}</p>
              <p className="mt-2"><strong>Email:</strong> {staff.email}</p>
              <p><strong>Phone:</strong> {staff.phone}</p>
              <p><strong>Properties:</strong> {staff.properties}</p>
              <p><strong>Current Jobs:</strong> {staff.currentJobs} active</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 border px-3 py-1 rounded text-sm">📩 Contact</button>
                <button
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleAssignJob(staff)}
                >
                  🛠 Assign Job
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-blue-50 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Job Description</th>
              <th className="px-4 py-2 text-left">Property</th>
              <th className="px-4 py-2 text-left">Assigned To</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="px-4 py-2">
                  {job.description} <br />
                  <span className="text-xs text-gray-500">{job.location}</span>
                </td>
                <td className="px-4 py-2">{job.property}</td>
                <td className="px-4 py-2">{job.assignedTo}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      job.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : job.status === "Scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(job.id, "Completed")}
                    className="text-green-600 text-xs hover:underline"
                  >
                    ✅ Complete
                  </button>
                  <button
                    onClick={() => handleStatusChange(job.id, "Cancelled")}
                    className="text-red-600 text-xs hover:underline"
                  >
                    ❌ Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Staff;