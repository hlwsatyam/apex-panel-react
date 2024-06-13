

import React, { useState } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";
import LoginImage from "../Image/Loginnn.jpg";
import Logo from "../Image/Logo.jpg";
import { MdOutlineMail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { baseUrl } from "../../Auth/Data";
function Login() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${baseUrl}/api/backendLogin`);
    if (res.status === 200) {
      if (res.data.data == email) {
        localStorage.setItem("logged", "true");
        window.location.reload();
      } else {
        alert("Worng Credentials!");
      }
    }
  };



  return (
    <section className="SEctionOfLogin">
      <div className="row RowOfLogin">
        <div className="col-md-12 ColOfLogin">
          <div className="MainDivOfLogin">
            <div className="row justify-content-center">
              <NavLink to="/" className="d-flex justify-content-center">
                <img src={Logo} alt="logo" className="logoOflogin" />
              </NavLink>
              <h2 className="LoginText">Login</h2>
            </div>
            <form className="ForOfLogin" onSubmit={handleSubmit}>
              <div className="DivOflogEmail">
                <span>
                  <MdOutlineMail className="IconOfmail" />
                </span>
                <input
                  type="UserId"
                  className="form-control InputOfLog"
                  placeholder="UserID"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <button type="submit" className="Continue">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;




// import React, { useState } from "react";
// import "./Login.css";
// import { NavLink } from "react-router-dom";
// import LoginImage from "../Image/Loginnn.jpg";
// import Logo from "../Image/Logo.jpg";
// import { MdOutlineMail } from "react-icons/md";
// import { FaLock } from "react-icons/fa6";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import axios from "axios";
// import { baseUrl } from "../../Auth/Data";
// function Login() {
//   const [email, setEmail] = useState("");

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post(`${baseUrl}/api/backendLogin`);
//     if (res.status === 200) {
//       if (res.data.data == email) {
//         localStorage.setItem("logged", "true");
//         window.location.reload();
//       } else {
//         alert("Worng Credentials!");
//       }
//     }
//   };



//   return (
//     <section className="SEctionOfLogin">
//       <div className="row RowOfLogin">
//         <div className="col-md-6 ColOfLogin">
//           <div className="MainDivOfLogin">
//             <div className="row justify-content-center">
//               <NavLink to="/" className="d-flex justify-content-center">
//                 <img src={Logo} alt="logo" className="logoOflogin" />
//               </NavLink>
//               <h2 className="LoginText">Login</h2>
//             </div>
//             <form className="ForOfLogin" onSubmit={handleSubmit}>
//               <div className="DivOflogEmail">
//                 <span>
//                   <MdOutlineMail className="IconOfmail" />
//                 </span>
//                 <input
//                   type="UserId"
//                   className="form-control InputOfLog"
//                   placeholder="UserID"
//                   value={email}
//                   onChange={handleEmailChange}
//                   required
//                 />
//               </div>
//               {/* <div className='DivOflogPass'>
//                                 <span><FaLock className='IconOfmail' /></span>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     className="form-control InputOfLog1"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={handlePasswordChange}
//                                     required
//                                 />
//                                 <span onClick={toggleShowPassword} style={{ cursor: 'pointer' }}>
//                                     {showPassword ? <FiEye className='IconOfEye' /> : <FiEyeOff className='IconOfEye' />}
//                                 </span>
//                             </div> */}
//               <button type="submit" className="Continue">
//                 Continue
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="col-md-6 ColOfLogin1">
//           <div className="DivOfLoginImage">
//             <img src={LoginImage} className="LoginImage" alt="" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login;

