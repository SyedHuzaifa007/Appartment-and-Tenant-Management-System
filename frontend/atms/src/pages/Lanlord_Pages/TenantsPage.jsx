import { useLocation, useNavigate } from 'react-router-dom';
import buildingIcon from '../../assets/PropertyIcon_Blue.png'
import '../../styling/LandlordStyling/TenantsPage.css'
import { useState } from 'react';
import editIcon from '../../assets/EditIcon_Black.png'
import deleteIcon from '../../assets/DeleteIcon_Red.png'

const TenantsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, address, units, tenants } = location.state || {};

    const [tenantsInfo, setTenants] = useState([
        { id: '123', Name: 'Moin ud Din', CNIC: '3520275656991', Email: 'moin@gmail.com', Phone: '123456789', Unit: "Apt-1", Rent: '1200', DueDate: '2026-12-12' },
        { id: '456', Name: 'Huzaifa Mustansar', CNIC: '2224277624891', Email: 'huzaifa@gmial.com', Phone: '123456789', Unit: "Apt-1", Rent: '20000', DueDate: '2026-12-12' },
        { id: '789', Name: 'Abdur Rafay', CNIC: '2224277624891', Email: 'rafay@gmial.com', Phone: '123456789', Unit: "Apt-1", Rent: '5500', DueDate: '2026-12-12' },
        { id: '109', Name: 'Faizan Saleh', CNIC: '2224277624891', Email: 'faizan@gmial.com', Phone: '123456789', Unit: "Apt-1", Rent: '9873', DueDate: '2023-12-12' }
    ])

    const HandleNavigation = () => {
        navigate(-1);
    }

    const deleteTenant = (index, name) => {
        const confirmDelete = window.confirm(`Do you wish to delete Tenant: ${name}?`);
        if (confirmDelete) {
            setTenants((prevTenants) => prevTenants.filter((_, i) => i !== index));
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

    const openTenantForm = (index = null) => {
        if (index !== null) {
            const tenant = tenantsInfo[index];
            if (tenant) {
                setFormData({ ...tenant, id: index });
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

    const saveTenant = () => {
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

        setTenants((prevTenants) => {
            if (formData.id !== null) {
                return prevTenants.map((tenant, index) =>
                    index === formData.id ? { ...formData, id: index } : tenant
                );
            } else {
                return [...prevTenants, { ...formData, id: prevTenants.length }];
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
                                <td>{tenant.Name}</td>
                                <td>{tenant.CNIC.slice(0, 5)}-{tenant.CNIC.slice(5, 12)}-{tenant.CNIC.slice(12)}</td>
                                <td>{tenant.Email}</td>
                                <td>{tenant.Phone}</td>
                                <td>{tenant.Unit}</td>
                                <td>Rs.{tenant.Rent}</td>
                                <td className={new Date(tenant.DueDate) < new Date() ? "overdue" : ""}>{tenant.DueDate}</td>
                                <td>
                                    <button className='edit-btn' onClick={() => openTenantForm(index)}><img className="editIcon" src={editIcon} /></button>
                                    <button className="delete-btn" onClick={() => deleteTenant(index, tenant.Name)}><img className="deleteIcon" src={deleteIcon} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {formVisible && (
                <div className='modal-overlay'>
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
                </div>
            )}
        </div>
    );
};

export default TenantsPage;
