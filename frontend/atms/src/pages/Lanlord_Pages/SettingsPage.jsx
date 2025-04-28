import moonIcon from '../../assets/moonIcon.png'
import '../../styling/LandlordStyling/SettingsPage.css'
import lockIcon from '../../assets/LockIcon.png'
import { useState } from 'react'

function SettingsPage({ theme, handleThemeToggle }) {
    const [securityMenu, changeSecurityMenu] = useState(false)
    const [generalMenu, changeGeneralMenu] = useState(true)
    const [paymentMenu, changePaymentMenu] = useState(false)

    function changeToSecurity() {
        changeSecurityMenu(true)
        changeGeneralMenu(false)
        changePaymentMenu(false)
    }
    function changeToGeneral() {
        changeSecurityMenu(false)
        changeGeneralMenu(true)
        changePaymentMenu(false)
    }
    function changeToPayment() {
        changeSecurityMenu(false)
        changeGeneralMenu(false)
        changePaymentMenu(true)
    }
    function handleDeletion() {
        const confirmDelete = window.confirm(`Do you wish to delete Account?`);
        if (confirmDelete) {
            alert("Account Deleted Successfully!!")
        }
    }
    function handleSaveBtn(){
        alert("Settings Saved!")
    }

    return (
        <div>
            <h1>Settings</h1>

            <div className='menuBar'>
                <label onClick={changeToGeneral} className={generalMenu ? 'selected' : ''}>General</label>
                <label onClick={changeToSecurity} className={securityMenu ? 'selected' : ''}> Privacy & Security</label>
                <label onClick={changeToPayment} className={paymentMenu ? 'selected' : ''}> Payments</label>
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

            {paymentMenu && <div className='payment'>
                <div className='mainText'>
                    <h2>Payment Settings</h2>
                    <p className='smallText'>Manage your Banking details</p>
                </div>
                <div className='fields'>
                    <select className='options'>
                        <option>JazzCash</option>
                    </select>
                    <p className='smallText'>IBAN:</p>
                    <input className='inputField' type="text" placeholder='Enter IBAN' />
                </div>
                <button className='saveBtn' onClick={handleSaveBtn}>Save Settings</button>
            </div>}

        </div>
    )
}

export default SettingsPage;