

import React, { useState } from 'react';
import './NAvbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../../Image/Logo.jpg';

const Navbar = ({ updateSearchQr }) => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleToggleClick = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const handleChangeInp = (e) => {
        updateSearchQr(e.target.value);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="navbar">
            <div className="container containerOfNavbar">
                <div className="navbar-header">
                    <button className="toggle" onClick={handleToggleClick}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <a href="#" className="navbar-brand">
                        <img src={logo} alt="Logo" className='logo' />
                    </a>
                </div>
                <ul className={`nav navCollaps ${isNavCollapsed ? '' : 'show'}`}>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/notification">Notification</NavLink>
                    </li>
                </ul>
                <input onChange={handleChangeInp} className='searchInp' placeholder='Search...' type="text" />
                <button className='buttonOfLogout' onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Navbar;



// import React, { useState } from 'react';
// import './NAvbar.css';
// import { NavLink } from 'react-router-dom';
// import logo from '../../Image/Logo.jpg'

// const Navbar = ({ updateSearchQr }) => {
//     const [isNavCollapsed, setIsNavCollapsed] = useState(true);
//     const handleToggleClick = () => {
//         setIsNavCollapsed(!isNavCollapsed);
//     };
//     const handleChangeInp = (e) => {
//         updateSearchQr(e.target.value)
//     }
//     const handlelogout = () => {
//         localStorage.clear()
//         window.location.reload()
//     }
//     return (
//         <div className="navbar">
//             <div className="contaier ContainerOfNavbar">
//                 <div className="navbar-header">
//                     <button className="toggle" onClick={handleToggleClick}>
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                     </button>
//                     <a href="#" className="navbar-brand">
//                         <img src={logo} alt="" className='Logo' />
//                     </a>


//                 </div>
//                 <ul className={`nav navcollaps ${isNavCollapsed ? '' : 'show'}`}>
//                     <li>
//                         <NavLink to="/">Home</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/notification">Notification</NavLink>
//                     </li>


//                 </ul>
//                 <input onChange={handleChangeInp} className='searchInp' placeholder='Search...' type="text" name="" id="" />
//                 <button className='ButtonOfLogout' onClick={handlelogout} >
//                     Log Out
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
