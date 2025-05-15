import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import NewRequestsList from "./NewRequests";

function StaffPage() {
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [editingWorker, setEditingWorker] = useState(null);
  
  const [editFormData, setEditFormData] = useState({
    name: "",
    workerType: "",
    salary: "",
    image: null,
  });

  useEffect(() => {
    axiosInstance
      .get("/api/workers")
      .then((res) => setWorkers(res.data))
      .catch((err) => console.error(err));
  }, []);


  const [formData, setFormData] = useState({
    name: "",
    workerType: "",
    image: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWorker = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("workerType", formData.workerType);
    data.append("salary", formData.salary);
    if (formData.image) {
      data.append("image", formData.image);
    }

    const userID = sessionStorage.getItem("userID");
    if (userID) {
      data.append("createdBy", userID);
    }

    console.log("Worker Data to Send:", data);

    axiosInstance
      .post("/api/workers", data)
      .then((res) => {
        setWorkers((prev) => [...prev, res.data]);
        setFormData({ name: "", workerType: "", image: "", salary: "" });
        setShowForm(false);
        setPreviewImage(null);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add worker!", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };


  const handleDeleteWorker = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this worker?"
    );
    if (!confirmed) return;

    axiosInstance
      .delete(`/api/workers/${id}`)
      .then(() => {
        setWorkers((prev) => prev.filter((worker) => worker._id !== id));
        toast.success("Worker deleted successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete worker", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const handleEditClick = (worker) => {
    setEditingWorker(worker);
    setEditFormData({
      name: worker.name,
      workerType: worker.workerType,
      salary: worker.salary,
      image: null,
    });
  };

  const handleUpdateWorker = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", editFormData.name);
    formDataToSend.append("workerType", editFormData.workerType);
    formDataToSend.append("salary", editFormData.salary);

    if (editFormData.image) {
      formDataToSend.append("image", editFormData.image);
    }

    axiosInstance
      .put(`/api/workers/${editingWorker._id}`, formDataToSend)

      .then((res) => {
        setWorkers((prev) =>
          prev.map((w) => (w._id === editingWorker._id ? res.data : w))
        );
        setEditingWorker(null);
        toast.success("Worker updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update worker", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const userID = sessionStorage.getItem("userID");

  const filteredWorkers = workers.filter(
    (worker) => worker.createdBy === userID
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen" >
      <ToastContainer />
      <NewRequestsList/>

      <br />
      

      {editingWorker && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30" >
          <div className="relative bg-gray-100 p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
            {/* Close Button */}
            <button
              onClick={() => setEditingWorker(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Edit Worker
            </h3>

            <h4 className="text-small font-semibold text-gray-700 mb-4 ">
              Name
            </h4>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            />

            <h4 className="text-small font-semibold text-gray-700 mb-4 ">
              Type
            </h4>
            <input
              type="text"
              name="workerType"
              value={editFormData.workerType}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  workerType: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            />

            <h4 className="text-small font-semibold text-gray-700 mb-4 ">
              Worker Image
            </h4>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setEditFormData((prev) => ({ ...prev, image: file }));
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            />
            <h4 className="text-small font-semibold text-gray-700 mb-4 ">
              Salary
            </h4>
            <input
              type="number"
              name="salary"
              value={editFormData.salary}
              onChange={(e) =>
                setEditFormData((prev) => ({ ...prev, salary: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />

            <button
              className="w-full bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
              onClick={handleUpdateWorker}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      <br />
      <br />
      <br />
      {/* Section: Add Maintenance Worker */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Maintenance Workers
        </h2>
        <br />
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transform hover:scale-105 transition-all"
          onClick={() => setShowForm(true)}
        >
          Add Worker
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="relative bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-md mx-4 pointer-events-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Add Worker
            </h3>
            <h4 className="text-small font-semibold text-gray-700 mb-4 ">
              Name
            </h4>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Worker Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <h4 className="text-small font-semibold text-gray-700 mb-4 ">
                Type
              </h4>
              <input
                type="text"
                name="workerType"
                value={formData.workerType}
                onChange={handleInputChange}
                placeholder="Worker Type"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <h4 className="text-small font-semibold text-gray-700 mb-4 ">
                Worker Image
              </h4>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData({ ...formData, image: file });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <h4 className="text-small font-semibold text-gray-700 mb-4 ">
                Salary
              </h4>
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
                  style={{ width: "100%", height: "auto" }}
                  className="object-cover rounded-md mb-4"
                />
              )}
              <button
                className="w-full bg-green-500 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition-all"
                onClick={handleAddWorker}
              >
                Add Worker
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section: Display Maintenance Workers */}
      {filteredWorkers.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No maintenance workers</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div
              key={worker._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg"
            >
              <img
                src={`http://localhost:5000/${worker.image}`}
                alt={worker.name}
                style={{ width: "100%", height: "auto" }}
                className="object-cover rounded-md mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-700">
                {worker.name}
              </h3>
              <p className="text-sm font-semibold text-gray-500">
                Worker Type: {worker.workerType}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                Salary: PKR {worker.salary}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEditClick(worker)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:shadow transition"
                >
                  <img
                    src="../../../src/assets/EditIcon_Black.png"
                    alt="Edit"
                    className="h-5 w-5 object-contain"
                  />
                  <span className="text-black font-medium">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteWorker(worker._id)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:shadow transition"
                >
                  <img
                    src="../../../src/assets/DeleteIcon_Red.png"
                    alt="Delete"
                    className="h-5 w-5 object-contain"
                  />
                  <span className="text-red-500 font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}
export default StaffPage;
