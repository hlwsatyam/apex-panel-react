import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css'


const Home = () => {
    // const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        primaryMobile: '',
        secondaryMobile: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        description: '',
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showForm, setShowForm] = useState('personalDetails');



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data submitted:', formData);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // Handle password change logic here
        console.log('Password data submitted:', passwordData);
    };
    return (
        <div>

            <Navbar />

            <section className='SecSectionOfHome'>
                <div className="container">
                    <div className='MainDetailsDiv'>

                        <div className='MainDivOfDetails' >
                            <h3 onClick={() => setShowForm('personalDetails')} className='TextOfDetailss'>Personal Details</h3>
                            {/* <h3 onClick={() => setShowForm('changePassword')} className='TextOfDetailss'>Change Password</h3> */}
                        </div>
                        <hr className='LineOfDetails' />

                        {showForm === 'personalDetails' && (
                            <div className="personal-details">
                                <form onSubmit={handleSubmit} className='FormOfPAA'>
                                    <div className="SecDivOfPAAA">
                                        <div className="form-group FormOfPA">
                                            <label className="form-label LabelOFTopic">Full Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />

                                        </div>
                                        <div className="form-group DivOfleft">
                                            <label className="form-label LabelOFTopic">Email Address</label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>


                                    <div className="SecDivOfPAAA">
                                        <div className="form-group FormOfPA">
                                            <label className="form-label LabelOFTopic">Mother's Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />

                                        </div>
                                        <div className="form-group DivOfleft">
                                            <label className="form-label LabelOFTopic">Father's Name</label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>


                                    <div className="SecDivOfPAAA">
                                        <div className="form-group FormOfPA">
                                            <label className="form-label LabelOFTopic">PAN No</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />

                                        </div>
                                        <div className="form-group DivOfleft">
                                            <label className="form-label LabelOFTopic">DOB</label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>


                                    <div className="SecDivOfPAAA">

                                        <div className="form-group FormOfPA">
                                            <label className="form-label LabelOFTopic">Mobile Number</label>
                                            <input
                                                className="form-control"
                                                type="tel"
                                                name="primaryMobile"
                                                value={formData.primaryMobile}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group DivOfleft">
                                            <label className="form-label LabelOFTopic">Secondary Mobile Number</label>
                                            <input
                                                className="form-control"
                                                type="tel"
                                                name="secondaryMobile"
                                                value={formData.secondaryMobile}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='SecDivOfPAAA'>

                                        <div className="form-group FormOfPA">
                                            <label className="form-label LabelOFTopic">Country</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group DivOfleft">
                                            <label className="form-label LabelOFTopic">State</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className='SecDivOfPAAA'>

                                        <div className="form-group FormOfPA">
                                            <label className="form-label LabelOFTopic">City</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group DivOfleft">
                                            <label className="form-label LabelOFTopic">Zip Code</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label LabelOFTopic">Address 1</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label LabelOFTopic">Address 2</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label LabelOFTopic">Address 3</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className='DivOfButton'>Submit</button>
                                </form>
                            </div>
                        )}

                        {showForm === 'changePassword' && (
                            <div className="change-password">
                                <form onSubmit={handlePasswordSubmit}>
                                    <div className='SecDivOfPAAA'>
                                        <div className="form-group FormOfPA ">
                                            <label className="form-label LabelOFTopic">Old Password</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="oldPassword"
                                                value={passwordData.oldPassword}
                                                onChange={handlePasswordChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group FormOfPA">
                                            <label className="form-label LabelOFTopic">New Password</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group FormOfPA">
                                        <label className="form-label LabelOFTopic">Confirm Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className='DivOfButton'>Change Password</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
