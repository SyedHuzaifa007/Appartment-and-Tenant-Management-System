import React, { useState } from "react";
import "../../styling/LandlordStyling/ProfilePage.css";
import tempImage from '../../assets/tempImage.png';

const Profile = () => {
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        email: "admin@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Property Lane, Real Estate City, 90210",
        photo: ""
    });

    const [previewImage, setPreviewImage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            setFormData((prev) => ({ ...prev, photo: imageURL }));
        }
    };

    const handleSave = () => {
        console.log("Saving data:", formData);
        alert("Profile saved!");
    };

    const handleCancel = () => {
        alert("Changes cancelled.");
    };

    return (
        <>
            <h2 className="profile-title">My Profile</h2>
            <div className="profile-container">
                <div className="profile-content">
                    {/* Profile Picture */}
                    <div className="profile-picture-section">
                        <div className="profile-picture">
                            <img
                                src={previewImage || formData.photo || tempImage}
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
                                <label className="input-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
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
                            <div>
                                <label className="input-label">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            </div>
                            <div>
                                <label className="input-label">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            </div>
                        </div>

                        <div className="button-group">
                            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                            <button className="save-button" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
