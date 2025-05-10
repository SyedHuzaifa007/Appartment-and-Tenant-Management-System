import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import "../../styling/LandlordStyling/ProfilePage.css";
import tempImage from "../../assets/tempImage.png";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
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
                const res = await axiosInstance.get("/api/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { name, email, photoUrl } = res.data;

                const fullData = {
                    name: name || "",
                    email: email || "",
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
            const response = await axiosInstance.put(
                "/api/profile",
                {
                    name: formData.name,
                    email: formData.email,
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
            await axiosInstance.put(
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
        <>
            <h2 className="profile-title text-center">My Profile</h2>
            <div className="profile-container">
                <div className="profile-content">
                    {/* Profile Picture */}
                    <div className="profile-picture-section">
                        <div className="profile-picture">
                            <img
                                src={previewImage || formData.photoUrl || tempImage}
                                alt="Profile"
                                className="profile-img"
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            id="photo-upload"
                            style={{ display: "none" }}
                            onChange={handlePhotoUpload}
                        />
                        <label htmlFor="photo-upload" className="upload-button">Upload Photo</label>
                    </div>

                    {/* Profile Info */}
                    <div className="profile-info">
                        <div className="profile-grid">
                            <div>
                                <label className="input-label">Username</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            </div>
                            <div>
                                <label className="input-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            </div>
                           
                        </div>

                        <div className="button-group">
                            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                            <button className="save-button" onClick={handleSave}>Save Changes</button>
                        </div>

                        {/* Password Change Section */}
                        <div className="password-section">
                        <h3 className="text-lg font-semibold text-gray-700">Change Password</h3>
                            <label className="input-label">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="profile-input"
                            />
                            <label className="input-label">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="profile-input"
                            />
                            <br />
                            <br />
                            <button className="save-button" onClick={handlePasswordChange}>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
