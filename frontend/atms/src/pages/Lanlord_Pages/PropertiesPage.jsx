import "../../styling/LandlordStyling/PropertiesPage.css"
import tempImage from '../../assets/tempImage.jpeg'
import tenantsIcon from '../../assets/Tenants_Blue.png'
import buildingIcon from '../../assets/PropertyIcon_Blue.png'
import editIcon from '../../assets/EditIcon_Black.png'
import deleteIcon from '../../assets/DeleteIcon_Red.png'

function PropertiesPage() {
    const propertiesdata = [{
        id: '123',
        image: "helle",
        title: 'Sunset Apartment',
        address: '123, Sunset Blvs, Los Angeles, CA 90210',
        units: '12',
        tenants: '10'
    },
    {
        id: '123',
        image: "helle",
        title: 'Sunset Apartment',
        address: '123, Sunset Blvs, Los Angeles, CA 90210',
        units: '12',
        tenants: '10'
    },
    {
        id: '123',
        image: "helle",
        title: 'Sunset Apartment',
        address: '123, Sunset Blvs, Los Angeles, CA 90210',
        units: '12',
        tenants: '10'
    }, {
        id: '123',
        image: "helle",
        title: 'Sunset Apartment',
        address: '123, Sunset Blvs, Los Angeles, CA 90210',
        units: '12',
        tenants: '10'
    }];

    return (
        <>
            <div className="Main">
                <div className="mainText">
                    <h1 className="heading">Properties</h1>
                    <p className="smallText">Manage your rental properties</p>
                </div>
                <button className="AddPropertyBtn">Add Property</button>
            </div>

            <div className="cards">
                {propertiesdata.map((obj, index) => {
                    return (<div className="singleCard">
                        <img src={tempImage} alt="Property Image" className="propertyImg" />
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
                                    <p>{obj.tenants} Tenants</p>
                                </div>
                            </div>
                            <button className="viewBtn">View Property</button>
                            <div className="delete_edit">
                                <button className="editBtn"><img src={editIcon} className="editIcon" /><p className="editText">Edit</p></button>
                                <button className="deleteBtn"><img src={deleteIcon} className="deleteIcon"/><p className="deleteText">Delete</p></button>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </>
    )
}

export default PropertiesPage