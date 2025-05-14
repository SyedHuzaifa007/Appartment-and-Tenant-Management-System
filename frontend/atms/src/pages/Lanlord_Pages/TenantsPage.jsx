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
                    DueDate: tenant.dueDate.split('T')[0]
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

            <div className="overflow-x-auto p-4">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr className="text-left border-b">
                            <th className="p-4">Name</th>
                            <th className="p-4">CNIC</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Unit</th>
                            <th className="p-4">Rent</th>
                            <th className="p-4">Due Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenantsInfo.map((tenant, index) => {
                            const formattedDate = new Date(tenant.dueDate);
                            const day = String(formattedDate.getDate()).padStart(2, "0");
                            const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
                            const year = formattedDate.getFullYear();
                            const displayDate = `${day}-${month}-${year}`;

                            return (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{tenant.name}</td>
                                    <td className="p-4">
                                        {tenant.cnic.slice(0, 5)}-{tenant.cnic.slice(5, 12)}-{tenant.cnic.slice(12)}
                                    </td>
                                    <td className="p-4">{tenant.email}</td>
                                    <td className="p-4">{tenant.phone}</td>
                                    <td className="p-4">{tenant.unit}</td>
                                    <td className="p-4">Rs.{tenant.rent}</td>
                                    <td className={`p-4 ${new Date(tenant.dueDate) < new Date() ? 'text-red-500 font-semibold' : ''}`}>
                                        {displayDate}
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <button className="edit-btn" onClick={() => openTenantForm(tenant._id)}>
                                            <img className="editIcon" src={editIcon} />
                                        </button>
                                        <button className="delete-btn" onClick={() => deleteTenant(tenant._id, tenant.name)}>
                                            <img className="deleteIcon" src={deleteIcon} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

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
                            <input type="text" name="Name" placeholder='Enter Tenant name' value={formData.Name} onChange={handleInputChange} className={errors.Name ? "error" : ""} />

                            <label>CNIC</label>
                            <input type="number" name="CNIC" placeholder='Enter Tenant cnic' value={formData.CNIC} onChange={handleInputChange} className={errors.CNIC ? "error" : ""} />

                            <label>Email</label>
                            <input type="email" name="Email" placeholder='Enter Tenant email' value={formData.Email} onChange={handleInputChange} className={errors.Email ? "error" : ""} />

                            <label>Phone</label>
                            <input type="number" name="Phone" placeholder='Enter Tenant phoneNo' value={formData.Phone} onChange={handleInputChange} className={errors.Phone ? "error" : ""} />

                            <label>Unit</label>
                            <input type="text" name="Unit" placeholder='Enter Tenant unit' value={formData.Unit} onChange={handleInputChange} className={errors.Unit ? "error" : ""} />

                            <label>Rent</label>
                            <input type="number" name="Rent" placeholder='0' value={formData.Rent} onChange={handleInputChange} className={errors.Rent ? "error" : ""} />

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
