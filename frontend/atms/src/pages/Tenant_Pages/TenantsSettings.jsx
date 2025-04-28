import moonIcon from '../../assets/moonIcon.png'
import '../../styling/LandlordStyling/SettingsPage.css'
import lockIcon from '../../assets/LockIcon.png'
import { useState } from 'react'

function TenantsSettings({ theme, handleThemeToggle }) {
    const [securityMenu, changeSecurityMenu] = useState(false)
    const [generalMenu, changeGeneralMenu] = useState(true)

    function changeToSecurity() {
        changeSecurityMenu(true)
        changeGeneralMenu(false)
    }
    function changeToGeneral() {
        changeSecurityMenu(false)
        changeGeneralMenu(true)
    }
    function handleDeletion() {
        const confirmDelete = window.confirm(`Do you wish to delete Account?`);
        if (confirmDelete) {
            alert("Account Deleted Successfully!!")
        }
    }

    return (
        <div>
            <h1>Settings</h1>

            <div className='menuBar'>
                <label onClick={changeToGeneral} className={generalMenu ? 'selected' : ''}>General</label>
                <label onClick={changeToSecurity} className={securityMenu ? 'selected' : ''}> Privacy & Security</label>
            </div>


            {generalMenu && <div className='appearance'>
                <div className='mainText'>
                    <h2>Appearance</h2>
                    <p className='smallText'>Customize how the application looks on your device</p>
                </div>
                <div className='row'>
                    <div className='imgText'>
                        <img src={moonIcon} />
                        <p className='text'>Dark Mode</p>
                    </div>

                    <label className="switch">
                        <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeToggle} />
                        <span className="slider round"></span>
                    </label>

                </div>
            </div>}

            {securityMenu && <div className='security'>
                <div className='mainText'>
                    <h2>Privacy & Security Settings</h2>
                    <p className='smallText'>Manage your privacy and security preferences</p>
                </div>
                <div className='row'>
                    <div className='imgText'>
                        <img src={lockIcon} />
                        <p className='text'>Password</p>
                    </div>
                    <button className='changeBtn'>Change Password</button>
                </div>
                <button onClick={handleDeletion} className='delBtn'>Delete Account</button>
            </div>}
        </div>
    )
}

export default TenantsSettings;