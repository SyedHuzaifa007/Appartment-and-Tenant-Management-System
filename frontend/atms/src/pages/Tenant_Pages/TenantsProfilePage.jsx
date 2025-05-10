import React, { useState, useEffect } from "react";
import axios from "axios";
import tempImage from "../../assets/tempImage.png";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        photoUrl: ""
    });

    const [previewImage, setPreviewImage] = useState("");
    const [initialData, setInitialData] = useState({});
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/api/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { name, email, phone, address, photoUrl } = res.data;

                const fullData = {
                    name: name || "",
                    email: email || "",
                    phone: phone || "",
                    address: address || "",
                    photoUrl: photoUrl || ""
                };

                setFormData(fullData);
                setInitialData(fullData);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            setFormData((prev) => ({ ...prev, photoUrl: imageURL }));
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                "/api/profile",
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    photoUrl: formData.photoUrl
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                alert("Profile saved successfully!");
                setInitialData(formData);
            }
        } catch (err) {
            console.error("Error saving profile:", err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to save profile";
            alert(errorMessage);
        }
    };

    const handleCancel = () => {
        setFormData(initialData);
        alert("Changes cancelled.");
    };

    const handlePasswordChange = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "/api/change-password",
                passwordData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert("Password changed successfully!");
            setPasswordData({ currentPassword: "", newPassword: "" });
        } catch (err) {
            console.error("Error changing password:", err);
            alert(err.response?.data?.message || "Failed to change password");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-8">My Profile</h2>
            <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col lg:flex-row gap-10">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
                        <img
                            src={previewImage || formData.photoUrl || tempImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        id="photo-upload"
                        className="hidden"
                        onChange={handlePhotoUpload}
                    />
                    <label
                        htmlFor="photo-upload"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                    >
                        Upload Photo
                    </label>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Save/Cancel Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Save Changes
                        </button>
                    </div>

                    {/* Password Change Section */}
                    <div className="mt-10">
                        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handlePasswordChange}
                            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
