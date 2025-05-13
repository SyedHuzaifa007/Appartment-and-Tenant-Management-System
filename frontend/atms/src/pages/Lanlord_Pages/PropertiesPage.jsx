import "../../styling/LandlordStyling/PropertiesPage.css"
import tempImage from '../../assets/tempImage.png'
import tenantsIcon from '../../assets/Tenants_Blue.png'
import buildingIcon from '../../assets/PropertyIcon_Blue.png'
import editIcon from '../../assets/EditIcon_Black.png'
import deleteIcon from '../../assets/DeleteIcon_Red.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import axiosInstance from "../../axiosInstance";

function PropertiesPage() {
    const [propertiesdata, setProperties] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        address: "",
        units: "",
        image: null,
        ownedBy: "",
        assignedTo: [],
    });

    const navigate = useNavigate();
    const userID = sessionStorage.getItem("userID");

    useEffect(() => {
        if (userID) {
            const fetchProperties = async () => {
                try {
                    const response = await axiosInstance.get(`/api/property/${userID}`);
                    setProperties(response.data);
                } catch (error) {
                    console.error("Error fetching properties:", error.message);
                }
            };
            fetchProperties();
        }
    }, [userID]);

    const handleNavigation = (propertyId, tit, addr, u) => {
        navigate(`/landlord/properties/${propertyId}`, {
            state: {
                propertyId,
                title: tit,
                address: addr,
                units: u,
            }
        });
    };


    const handleDeletion = async (propertyId, propertyName) => {
        const confirmDelete = window.confirm(`Do you wish to delete Property: ${propertyName}?`);
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/api/property/${propertyId}`);
                setProperties((prevProperties) =>
                    prevProperties.filter((property) => property._id !== propertyId)
                );
            } catch (error) {
                console.error("Error deleting property:", error.message);
            }
        }
    };

    const openPropertyForm = (propertyId = null) => {
        if (propertyId) {
            const property = propertiesdata.find(p => p._id === propertyId);
            if (property) {
                setFormData({ ...property, id: property._id });
            }
        } else {
            setFormData({
                id: null,
                image: "",
                title: "",
                address: "",
                units: "",
            });
        }
        setErrors({});
        setFormVisible(true);
    };

    const closePropertyForm = () => {
        setFormVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const saveProperty = async () => {
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (key !== "id" && formData[key] === "") {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            console.log("Validation errors:", newErrors);
            return;
        }

        const formToSubmit = new FormData();
        formToSubmit.append("title", formData.title);
        formToSubmit.append("address", formData.address);
        formToSubmit.append("units", formData.units);
        formToSubmit.append("ownedBy", userID);
        if (formData.image) {
            formToSubmit.append("image", formData.image);
        }

        try {
            const endpoint = formData.id !== null ? `/api/property/${formData.id}` : "/api/property/";
            const method = formData.id !== null ? "put" : "post";
            const response = await axiosInstance[method](endpoint, formToSubmit, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const updatedProperty = response.data;
            setProperties((prevProperties) => {
                if (method === "put") {
                    return prevProperties.map((property) =>
                        property._id === formData.id ? updatedProperty : property
                    );
                }
                return [...prevProperties, updatedProperty];
            });
            setFormVisible(false);
            setFormData({
                id: null,
                image: null,
                title: "",
                address: "",
                units: "",
            });
            setPreviewImage(null);
            setErrors({});
        } catch (error) {
            console.error("Error saving property:", error.message);
            console.error("Error details:", error.response?.data);
        }
    };


    return (
        <>
            <div className="Main">
                <div className="mainText">
                    <h1 className="heading">Properties</h1>
                    <p className="smallText">Manage your rental properties</p>
                </div>
                <button className="AddPropertyBtn" onClick={() => openPropertyForm()}>Add Property</button>
            </div>

            <div className="cards">
                {propertiesdata.map((obj, index) => {
                    return (<div className="singleCard" key={index}>
                        <img
                            src={`http://localhost:5000/${obj.image}`}
                            onError={(e) => { e.target.onerror = null; e.target.src = tempImage; }}
                            className="propertyImg"
                        />
                        <div className="content">
                            <div className="cardMainText">
                                <h2 className="cardHeading">{obj.title}</h2>
                                <p className="addr">{obj.address}</p>
                            </div>
                            <div className="details">
                                <div className="unitsBox">
                                    <img src={buildingIcon} alt="" className="iconBuilding" />
                                    <p>{obj.units} Units</p>
                                </div>
                                <div className="tenantsBox">
                                    <img src={tenantsIcon} alt="" className="iconTenants" />
                                    <p>{obj.assignedTo.length} Tenants</p>
                                </div>
                            </div>
                            <button className="viewBtn" onClick={() => handleNavigation(obj._id, obj.title, obj.address, obj.units)}>View Property</button>
                            <div className="delete_edit">
                                <button onClick={() => openPropertyForm(obj._id)} className="editBtn"><img src={editIcon} className="editIcon" /><p className="editText">Edit</p></button>
                                <button onClick={() => handleDeletion(obj._id, obj.title)} className="deleteBtn"><img src={deleteIcon} className="deleteIcon" /><p className="deleteText">Delete</p></button>
                            </div>
                        </div>
                    </div>)
                })}
            </div>

            {formVisible && (
                <div className='modal-overlay'>
                    <div className="modal">
                        <h3 className="h3">{formData.id !== null ? "Edit Property" : "Add New Property"}</h3>
                        <form>
                            <label>Property Name</label>
                            <input placeholder="Enter property name" type="text" name="title" value={formData.title} onChange={handleInputChange} className={errors.title ? "error" : ""} />

                            <label>Address</label>
                            <input placeholder="Enter property address" type="text" name="address" value={formData.address} onChange={handleInputChange} className={errors.address ? "error" : ""} />

                            <label>Number of Units</label>
                            <input placeholder="0" type="number" name="units" value={formData.units} onChange={handleInputChange} className={errors.units ? "error" : ""} />

                            <label>Property Image</label>
                            <input type="file" name="image" onChange={(e) => {
                                const file = e.target.files[0];
                                setFormData({ ...formData, image: file });
                            }} className={errors.image ? "error" : ""} accept="image/*" />

                            <div className="button-container">
                                <button type="button" className='save-btn' onClick={saveProperty}>Save</button>
                                <button type="button" className="cancel-btn" onClick={closePropertyForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default PropertiesPage