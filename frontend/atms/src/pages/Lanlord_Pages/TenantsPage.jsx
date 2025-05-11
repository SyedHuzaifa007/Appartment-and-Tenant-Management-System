import { useLocation, useNavigate } from 'react-router-dom';
import buildingIcon from '../../assets/PropertyIcon_Blue.png'
import '../../styling/LandlordStyling/TenantsPage.css'
import { useState, useEffect } from 'react';
import editIcon from '../../assets/EditIcon_Black.png'
import deleteIcon from '../../assets/DeleteIcon_Red.png'
import axiosInstance from "../../axiosInstance";

const TenantsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { propertyId, title, address, units } = location.state || {};
    const landlordId = sessionStorage.getItem("userID");
    const [tenantsInfo, setTenants] = useState([])

    useEffect(() => {
        if (propertyId) {
            const fetchTenants = async () => {
                try {
                    const response = await axiosInstance.get(`/api/tenant/${propertyId}`);
                    setTenants(response.data);
                } catch (error) {
                    console.error("Error fetching Tenants:", error.message);
                }
            };
            fetchTenants();
        }
    }, [propertyId]);

    const HandleNavigation = () => {
        navigate(-1);
    }

    const deleteTenant = async (tenantId, tenantName) => {
        const confirmDelete = window.confirm(`Do you wish to delete Tenant: ${tenantName}?`);
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/api/tenant/${tenantId}`);
                setTenants((prevTenants) =>
                    prevTenants.filter((tenant) => tenant._id !== tenantId)
                );
            } catch (error) {
                console.error("Error deleting Tenant:", error.message);
            }
        }
    };

    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        Name: "",
        CNIC: "",
        Email: "",
        Phone: "",
        Unit: "",
        Rent: "",
        DueDate: "",
    });

    const [errors, setErrors] = useState({});

    const openTenantForm = (tid = null) => {
        if (tid) {
            const tenant = tenantsInfo.find(t => t._id === tid);
            if (tenant) {
                setFormData({
                    id: tenant._id,
                    Name: tenant.name,
                    CNIC: tenant.cnic,
                    Email: tenant.email,
                    Phone: tenant.phone,
                    Unit: tenant.unit,
                    Rent: tenant.rent.toString(),
                    DueDate: tenant.dueDate.split('T')[0]  // Format to YYYY-MM-DD for the date input
                });
            }
        } else {
            setFormData({
                id: null,
                Name: "",
                CNIC: "",
                Email: "",
                Phone: "",
                Unit: "",
                Rent: "",
                DueDate: "",
            });
        }
        setErrors({});
        setFormVisible(true);
    };


    const closeTenantForm = () => {
        setFormVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value.trim() === "",
        }));
    };

    const saveTenant = async () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (key !== "id" && formData[key].trim() === "") {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const isEditing = formData.id !== null;
            const endpoint = isEditing ? `api/tenant/${formData.id}` : 'api/tenant';
            const method = isEditing ? 'put' : 'post';

            const payload = {
                propertyId,
                landlordId,
                name: formData.Name,
                cnic: formData.CNIC,
                email: formData.Email,
                phone: formData.Phone,
                unit: formData.Unit,
                rent: formData.Rent,
                dueDate: formData.DueDate
            };

            console.log("Payload:", payload);

            const response = await axiosInstance[method](endpoint, payload);
            const updatedTenant = response.data;

            setTenants((prevTenants) => {
                if (isEditing) {
                    return prevTenants.map((tenant) =>
                        tenant._id === updatedTenant._id ? updatedTenant : tenant
                    );
                } else {
                    return [...prevTenants, updatedTenant];
                }
            });

            setFormVisible(false);
            setFormData({
                id: null,
                Name: "",
                CNIC: "",
                Email: "",
                Phone: "",
                Unit: "",
                Rent: "",
                DueDate: "",
            });
            setErrors({});
        } catch (error) {
            console.error("Error saving tenant:", error);
            alert("Error saving tenant");
        }
    };

    return (
        <div>
            <button className='back-btn' onClick={HandleNavigation}>Back to Properties</button>

            <div className="Main">
                <div className="mainText">
                    <h1 className="cardMainText">{title}</h1>
                    <p className="addr">{address}</p>
                </div>
                <button className='addTenant-btn' onClick={() => openTenantForm()}>Add New Tenant</button>
            </div>

            <div className='info'>
                <img src={buildingIcon} className="iconBuilding" />
                <p>Total Units: {units} | Total Tenants: {tenantsInfo.length}</p>
            </div>

            <div className='table-wrapper'>
                <table className='tenants-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>CNIC</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Unit</th>
                            <th>Rent</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenantsInfo.map((tenant, index) => (
                            <tr key={index}>
                                <td>{tenant.name}</td>
                                <td>{tenant.cnic.slice(0, 5)}-{tenant.cnic.slice(5, 12)}-{tenant.cnic.slice(12)}</td>
                                <td>{tenant.email}</td>
                                <td>{tenant.phone}</td>
                                <td>{tenant.unit}</td>
                                <td>Rs.{tenant.rent}</td>
                                <td className={new Date(tenant.dueDate) < new Date() ? "overdue" : ""}>{tenant.dueDate}</td>
                                <td>
                                    <button className='edit-btn' onClick={() => openTenantForm(tenant._id)}><img className="editIcon" src={editIcon} /></button>
                                    <button className="delete-btn" onClick={() => deleteTenant(tenant._id, tenant.name)}><img className="deleteIcon" src={deleteIcon} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {formVisible && (
                <>
                    <div className='modal-overlay' onClick={closeTenantForm}></div>
                    <div className="modal">
                        <h3>{formData.id !== null ? "Edit Tenant" : "Add Tenant"}</h3>
                        <form>
                            <label>Name</label>
                            <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} className={errors.Name ? "error" : ""} />

                            <label>CNIC</label>
                            <input type="number" name="CNIC" value={formData.CNIC} onChange={handleInputChange} className={errors.CNIC ? "error" : ""} />

                            <label>Email</label>
                            <input type="email" name="Email" value={formData.Email} onChange={handleInputChange} className={errors.Email ? "error" : ""} />

                            <label>Phone</label>
                            <input type="number" name="Phone" value={formData.Phone} onChange={handleInputChange} className={errors.Phone ? "error" : ""} />

                            <label>Unit</label>
                            <input type="text" name="Unit" value={formData.Unit} onChange={handleInputChange} className={errors.Unit ? "error" : ""} />

                            <label>Rent</label>
                            <input type="number" name="Rent" value={formData.Rent} onChange={handleInputChange} className={errors.Rent ? "error" : ""} />

                            <label>Due Date</label>
                            <input type="date" name="DueDate" value={formData.DueDate} onChange={handleInputChange} className={errors.DueDate ? "error" : ""} />

                            <div className="button-container">
                                <button type="button" className='save-btn' onClick={saveTenant}>Save</button>
                                <button type="button" className="cancel-btn" onClick={closeTenantForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default TenantsPage;
