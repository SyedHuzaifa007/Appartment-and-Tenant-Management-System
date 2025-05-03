import "../../styling/LandlordStyling/PropertiesPage.css"
import tempImage from '../../assets/tempImage.png'
import tenantsIcon from '../../assets/Tenants_Blue.png'
import buildingIcon from '../../assets/PropertyIcon_Blue.png'
import editIcon from '../../assets/EditIcon_Black.png'
import deleteIcon from '../../assets/DeleteIcon_Red.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import axios from "axios";

function PropertiesPage() {
    const [propertiesdata, setProperties] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:5000/api/property", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    setProperties(res.data);
                })
                .catch(err => {
                    console.error("Failed to fetch properties");
                    setProperties([]);
                });
        }
    }, [token]);    


    const navigate = useNavigate();

    const handleNavigation = (id, tit, addr, u, t) => {
        navigate(`/landlord/properties/${id}`, { state: { title: tit, address: addr, units: u, tenants: t } })
    }

    const handleDeletion = (index, name) => {
        const confirmDelete = window.confirm(`Do you wish to delete Property: ${name}?`);
        if (!confirmDelete) return;

        const propertyId = propertiesdata[index]._id;
        axios.delete(`http://localhost:5000/api/property/${propertyId}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => setProperties(prev => prev.filter((_, i) => i !== index)))
            .catch(err => console.error("Delete failed:", err));
    };


    const [formVisible, setFormVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        id: null,
        image: "",
        title: "",
        address: "",
        units: "",
    });
    const openPropertyForm = (index = null) => {
        if (index !== null) {
            const property = propertiesdata[index];
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
        const { name, type, value, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {
                const imageURL = URL.createObjectURL(file);
                setFormData({ ...formData, [name]: imageURL });
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: false,
                }));
            }
        } else {
            setFormData({ ...formData, [name]: value });

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: value.trim() === "",
            }));
        }
    };

    const saveProperty = () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (key !== "id" && formData[key].trim() === "") {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        if (formData.id) {
            axios.put(`http://localhost:5000/api/property/${formData.id}`,formData,{
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(() => {
                    setProperties(prev => prev.map(prop => prop._id === formData.id ? { ...formData } : prop));
                    resetForm();
                })
                .catch(err => {
                    console.error("Update failed:", err);
                    alert("Could not save changes. Please try again.");
                });
        } else {
            axios.post("http://localhost:5000/api/property",formData,{
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    setProperties(prev => [...prev, res.data]);
                    resetForm();
                })
                .catch(err => console.error("Create failed:", err));
        }
    };

    const resetForm = () => {
        setFormVisible(false);
        setFormData({ id: null, image: "", title: "", address: "", units: "" });
        setErrors({});
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
                        <img src={obj.image || tempImage} alt="Property Image" className="propertyImg" />
                        <div className="content">
                            <div className="cardMainText">
                                <h2>{obj.title}</h2>
                                <p className="addr">{obj.address}</p>
                            </div>
                            <div className="details">
                                <div className="unitsBox">
                                    <img src={buildingIcon} alt="" className="iconBuilding" />
                                    <p>{obj.units} Units</p>
                                </div>
                                <div className="tenantsBox">
                                    <img src={tenantsIcon} alt="" className="iconTenants" />
                                    <p>{obj.tenants?.length || 0} Tenants</p>
                                </div>
                            </div>
                            <button className="viewBtn" onClick={() => handleNavigation(obj._id, obj.title, obj.address, obj.units, obj.tenants)}>View Property</button>
                            <div className="delete_edit">
                                <button onClick={() => openPropertyForm(index)} className="editBtn"><img src={editIcon} className="editIcon" /><p className="editText">Edit</p></button>
                                <button onClick={() => handleDeletion(index, obj.title)} className="deleteBtn"><img src={deleteIcon} className="deleteIcon" /><p className="deleteText">Delete</p></button>
                            </div>
                        </div>
                    </div>)
                })}
            </div>

            {formVisible && (
                <div className='modal-overlay'>
                    <div className="modal">
                        <h3>{formData.id !== null ? "Edit Property" : "Add New Property"}</h3>
                        <form>
                            <label>Property Name</label>
                            <input placeholder="Enter propert name" type="text" name="title" value={formData.title} onChange={handleInputChange} className={errors.title ? "error" : ""} />

                            <label>Address</label>
                            <input placeholder="Enter propert address" type="text" name="address" value={formData.address} onChange={handleInputChange} className={errors.address ? "error" : ""} />

                            <label>Number of Units</label>
                            <input placeholder="0" type="number" name="units" value={formData.units} onChange={handleInputChange} className={errors.units ? "error" : ""} />

                            <label>Property Image</label>
                            <input type="file" name="image" onChange={handleInputChange} className={errors.image ? "error" : ""} accept="image/*" />

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