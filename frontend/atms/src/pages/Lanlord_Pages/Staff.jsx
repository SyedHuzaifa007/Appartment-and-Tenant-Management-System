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
  const [modalType, setModalType] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    properties: "",
    description: "",
    location: "",
    property: "",
    status: "Scheduled",
  });

  const openModal = (type, staff = null) => {
    setModalType(type);
    setSelectedStaff(staff);
    if (staff) {
      setFormData({
        name: staff.name,
        role: staff.role,
        email: staff.email,
        phone: staff.phone,
        properties: staff.properties,
      });
    } else {
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "",
        properties: "",
        description: "",
        location: "",
        property: "",
        status: "Scheduled",
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedStaff(null);
  };

  const handleSubmit = () => {
    if (modalType === "add") {
      const newStaff = {
        id: Date.now(),
        ...formData,
        currentJobs: 0,
      };
      setStaffList((prev) => [...prev, newStaff]);
    } else if (modalType === "edit" && selectedStaff) {
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === selectedStaff.id ? { ...s, ...formData } : s
        )
      );
    } else if (modalType === "assign" && selectedStaff) {
      const newJob = {
        id: Date.now(),
        description: formData.description,
        location: formData.location,
        property: formData.property,
        assignedTo: selectedStaff.name,
        status: formData.status,
      };
      setJobs((prev) => [...prev, newJob]);
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === selectedStaff.id
            ? { ...s, currentJobs: s.currentJobs + 1 }
            : s
        )
      );
    }
    closeModal();
  };

  const handleStatusChange = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  return (
    <div className="p-6" >
      <h1 className="text-3xl font-bold mb-4">Staff Management</h1>
      <p className="text-gray-600 mb-6">
        Manage your maintenance staff and assign tasks
      </p>

      <div className="flex items-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded transition-colors duration-200 ${activeTab === "staff"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-black-700 hover:bg-blue-200"
            }`}
          onClick={() => setActiveTab("staff")}
        >
          Staff Members
        </button>
        <button
          className={`px-4 py-2 rounded transition-colors duration-200 ${activeTab === "jobs"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-black-700 hover:bg-blue-200"
            }`}
          onClick={() => setActiveTab("jobs")}
        >
          Maintenance Jobs
        </button>

        {activeTab === "staff" && (
          <button
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => openModal("add")}
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
              <p className="mt-2">
                <strong>Email:</strong> {staff.email}
              </p>
              <p>
                <strong>Phone:</strong> {staff.phone}
              </p>
              <p>
                <strong>Properties:</strong> {staff.properties}
              </p>
              <p>
                <strong>Current Jobs:</strong> {staff.currentJobs} active
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 border px-3 py-1 rounded text-sm hover:bg-gray-100"
                  onClick={() => openModal("edit", staff)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  onClick={() => openModal("assign", staff)}
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
                    className={`px-2 py-1 text-xs rounded-full ${job.status === "In Progress"
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
                    className="text-green-600 text-xs hover:underline hover:text-green-800"
                  >
                    ✅ Complete
                  </button>
                  <button
                    onClick={() => handleStatusChange(job.id, "Cancelled")}
                    className="text-red-600 text-xs hover:underline hover:text-red-800"
                  >
                    ❌ Cancel
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalType && (
        <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "add"
                ? "Add Staff Member"
                : modalType === "edit"
                  ? "Edit Contact Information"
                  : "Assign Job"}
            </h2>
            {modalType !== "assign" ? (
              <>
                <input className="w-full mb-2 p-2 border rounded" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <input className="w-full mb-4 p-2 border rounded" placeholder="Properties" value={formData.properties} onChange={(e) => setFormData({ ...formData, properties: e.target.value })} />
              </>
            ) : (
              <>
                <input className="w-full mb-2 p-2 border rounded" placeholder="Job Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="Property" value={formData.property} onChange={(e) => setFormData({ ...formData, property: e.target.value })} />
                <select className="w-full mb-4 p-2 border rounded" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </>
            )}
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;