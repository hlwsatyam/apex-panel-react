

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { baseUrl, formatDate } from "../../../Auth/Data";

function ResposeCard({ item, isNotification }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [isEditing, setIsEditing] = useState({
    fullName: false,
    mobileNo: false,
    fatherName: false,
    panNo: false,
    dateOfBirth: false,
    status: false,
    emailId: false,
    residenceAddress: {
      line1: false,
      line3: false,
      landmark: false,
      pincode: false,
    },
    modalName: false,
    companyName: false,
    designation: false,
    createdAt: false,
  });
  const [editedItem, setEditedItem] = useState(item);

  const handleEditChange = (field, subField = null) => (e) => {
    const value = e.target.value;
    setEditedItem((prev) => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const toggleEdit = (field, subField = null) => () => {
    setIsEditing((prev) => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: !prev[field][subField],
          },
        };
      }
      return { ...prev, [field]: !prev[field] };
    });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${baseUrl}/api/v1/updateLead`, editedItem);
      if (res.status === 200) {
        setIsDetailOpen(false);
        window.location.reload();
      } else {
        alert("Failed to save the changes. Please try again.");
      }
    } catch (error) {
      console.error("Error saving the changes:", error);
      alert("An error occurred while saving the changes. Please try again.");
    }
  };

  const handleSubmit = async (item) => {
    const res = await axios.post(`${baseUrl}/api/v1/leadResponse`, {
      response,
      modalName: item.modalName,
      id: item._id,
    });
    if (res.status === 200) {
      window.location.reload();
    } else {
      alert(res.data);
    }
    setIsPopupOpen(false);
  };

  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsPopupOpen(false);
      setIsDetailOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    isNotification && (
      <div className="container ContainerOfLead">
        <div className="lead-grid">
          <div className="lead-item">
            <span className="lead-label">Name:</span>
            <span className="lead-value">{item?.fullName}</span>
          </div>
          <div className="lead-item">
            <span className="lead-label">Mobile:</span>
            <span className="lead-value">{item?.mobileNo}</span>
          </div>
          <div className="lead-item">
            <span className="lead-label">Form Name:</span>
            <span className="lead-value"> {item?.modalName} </span>
          </div>
          <div style={{ rowGap: 3 }} className="lead-item">
            {item.reapply ? (
              <button
                className="response-button"
                onClick={() => setIsPopupOpen(true)}
              >
                Response
              </button>
            ) : item.status === "null" && !item.reapply ? (
              <button
                className="response-button"
                onClick={() => setIsPopupOpen(true)}
              >
                Response
              </button>
            ) : item.status !== "null" && item.reapply ? (
              <button
                className="response-button"
                onClick={() => setIsPopupOpen(true)}
              ></button>
            ) : (
              <span className="">{item?.status}</span>
            )}
            <button
              className="response-button"
              onClick={() => setIsDetailOpen(true)}
            >
              Details
            </button>
          </div>
        </div>
        {isPopupOpen && (
          <div className="popup-overlay  MainDivOfLeadPopup">
            <div ref={divRef} className="popup  DivOfResponceForm">
              <h2 className="ResponceForm">Response Form</h2>
              <div className="row DivOfMessage">
              <label className="col-sm-12 col-form-label">
                Status:
                <select
                  onChange={(val) => setResponse(val.target.value)}
                  name="status"
                >
                  <option value="decline">Decline</option>
                  <option value="approve">Approve</option>
                  <option value="ring">Ring</option>
                  <option value="not-reachable">Not reachable</option>
                  <option value="v-kyc-done">v-KYC Done</option>
                  <option value="v-kyc-pending">v-KYC Pending</option>
                  <option value="in-process">In Process</option>
                  <option value="not-intrested">Not Intrested</option>
                </select>
              </label>
              </div>
              <div className="row DivOfMessage">
    <label for="inputtext" className="col-sm-12 col-form-label">Message</label>
    <div className="col-sm-12">
      <input type="text" className="form-control" id="inputPassword"/>
    </div>
  </div>
              <div className="text-center">
                <button onClick={() => handleSubmit(item)} type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {isDetailOpen && (
          <div className="popup-overlay MainDivOfLeadPopup">
            <div ref={divRef} className="popup AgOriginatorsAllData">
              <h2 className="TextOfLeadDetails">Lead Details</h2>
              <div className="DivOfPopupItems">
                {isEditing.fullName ? (
                  <input
                    type="text"
                    value={editedItem.fullName}
                    onChange={handleEditChange("fullName")}
                  />
                ) : (
                  <p>Name: {editedItem.fullName}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("fullName")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.mobileNo ? (
                  <input
                    type="text"
                    value={editedItem.mobileNo}
                    onChange={handleEditChange("mobileNo")}
                  />
                ) : (
                  <p>Mobile No: {editedItem.mobileNo}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("mobileNo")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.fatherName ? (
                  <input
                    type="text"
                    value={editedItem.fatherName}
                    onChange={handleEditChange("fatherName")}
                  />
                ) : (
                  <p>Father Name: {editedItem.fatherName}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("fatherName")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.panNo ? (
                  <input
                    type="text"
                    value={editedItem.panNo}
                    onChange={handleEditChange("panNo")}
                  />
                ) : (
                  <p>Pan No: {editedItem.panNo}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("panNo")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.dateOfBirth ? (
                  <input
                    type="text"
                    value={editedItem.dateOfBirth}
                    onChange={handleEditChange("dateOfBirth")}
                  />
                ) : (
                  <p>Date Of Birth: {editedItem.dateOfBirth}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("dateOfBirth")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.status ? (
                  <input
                    type="text"
                    value={editedItem.status}
                    onChange={handleEditChange("status")}
                  />
                ) : (
                  <p>Lead Status: {editedItem.status}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("status")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.emailId ? (
                  <input
                    type="text"
                    value={editedItem.emailId}
                    onChange={handleEditChange("emailId")}
                  />
                ) : (
                  <p>Email Id: {editedItem.emailId}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("emailId")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.residenceAddress.line1 ? (
                  <input
                    type="text"
                    value={editedItem.residenceAddress.line1}
                    onChange={handleEditChange("residenceAddress", "line1")}
                  />
                ) : (
                  <p>
                    Residence Address Line 1: {editedItem.residenceAddress.line1}
                  </p>
                )}
                <div className="EditDiv" onClick={toggleEdit("residenceAddress", "line1")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.residenceAddress.line3 ? (
                  <input
                    type="text"
                    value={editedItem.residenceAddress.line3}
                    onChange={handleEditChange("residenceAddress", "line3")}
                  />
                ) : (
                  <p>
                    Residence Address Line 3: {editedItem.residenceAddress.line3}
                  </p>
                )}
                <div className="EditDiv" onClick={toggleEdit("residenceAddress", "line3")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.residenceAddress.landmark ? (
                  <input
                    type="text"
                    value={editedItem.residenceAddress.landmark}
                    onChange={handleEditChange("residenceAddress", "landmark")}
                  />
                ) : (
                  <p>
                    Residence Address Landmark: {editedItem.residenceAddress.landmark}
                  </p>
                )}
                <div className="EditDiv" onClick={toggleEdit("residenceAddress", "landmark")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.residenceAddress.pincode ? (
                  <input
                    type="text"
                    value={editedItem.residenceAddress.pincode}
                    onChange={handleEditChange("residenceAddress", "pincode")}
                  />
                ) : (
                  <p>
                    Residence Address Pin Code: {editedItem.residenceAddress.pincode}
                  </p>
                )}
                <div className="EditDiv" onClick={toggleEdit("residenceAddress", "pincode")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.modalName ? (
                  <input
                    type="text"
                    value={editedItem.modalName}
                    onChange={handleEditChange("modalName")}
                  />
                ) : (
                  <p>Form Name: {editedItem.modalName}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("modalName")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.companyName ? (
                  <input
                    type="text"
                    value={editedItem.companyName}
                    onChange={handleEditChange("companyName")}
                  />
                ) : (
                  <p>Company Name: {editedItem.companyName}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("companyName")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.designation ? (
                  <input
                    type="text"
                    value={editedItem.designation}
                    onChange={handleEditChange("designation")}
                  />
                ) : (
                  <p>Designation: {editedItem.designation}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("designation")}>
                  Edit
                </div>
              </div>
              <div className="DivOfPopupItems">
                {isEditing.createdAt ? (
                  <input
                    type="text"
                    value={formatDate(editedItem.createdAt)}
                    onChange={handleEditChange("createdAt")}
                  />
                ) : (
                  <p>Submission Date: {formatDate(editedItem.createdAt)}</p>
                )}
                <div className="EditDiv" onClick={toggleEdit("createdAt")}>
                  Edit
                </div>
              </div>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default ResposeCard;


// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { baseUrl, formatDate } from "../../../Auth/Data";

// function ResposeCard({ item, isNotification }) {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [response, setResponse] = useState("");
//   const [isEditing, setIsEditing] = useState({
//     fullName: false,
//     mobileNo: false,
//     fatherName: false,
//     panNo: false,
//     dateOfBirth: false,
//     status: false,
//     emailId: false,
//     residenceAddress: {
//       line1: false,
//       line3: false,
//       landmark: false,
//       pincode: false,
//     },
//     modalName: false,
//     companyName: false,
//     designation: false,
//     createdAt: false,
//   });
//   const [editedItem, setEditedItem] = useState(item);

//   const handleEditChange = (field, subField = null) => (e) => {
//     const value = e.target.value;
//     setEditedItem((prev) => {
//       if (subField) {
//         return {
//           ...prev,
//           [field]: {
//             ...prev[field],
//             [subField]: value,
//           },
//         };
//       }
//       return { ...prev, [field]: value };
//     });
//   };

//   const toggleEdit = (field, subField = null) => () => {
//     setIsEditing((prev) => {
//       if (subField) {
//         return {
//           ...prev,
//           [field]: {
//             ...prev[field],
//             [subField]: !prev[field][subField],
//           },
//         };
//       }
//       return { ...prev, [field]: !prev[field] };
//     });
//   };

//   const handleSubmit = async (item) => {
//     const res = await axios.post(`${baseUrl}/api/v1/leadResponse`, {
//       response,
//       modalName: item.modalName,
//       id: item._id,
//     });
//     if (res.status === 200) {
//       window.location.reload();
//     } else {
//       alert(res.data);
//     }
//     setIsPopupOpen(false);
//   };

//   const divRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (divRef.current && !divRef.current.contains(event.target)) {
//       setIsPopupOpen(false);
//       setIsDetailOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     isNotification && (
//       <div className="container ContainerOfLead">
//         <div className="lead-grid">
//           <div className="lead-item">
//             <span className="lead-label">Name:</span>
//             <span className="lead-value">{item?.fullName}</span>
//           </div>
//           <div className="lead-item">
//             <span className="lead-label">Mobile:</span>
//             <span className="lead-value">{item?.mobileNo}</span>
//           </div>
//           <div className="lead-item">
//             <span className="lead-label">Form Name:</span>
//             <span className="lead-value"> {item?.modalName} </span>
//           </div>
//           <div style={{ rowGap: 3 }} className="lead-item">
//             {item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               >
//                 Response
//               </button>
//             ) : item.status == "null" && !item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               >
//                 Response
//               </button>
//             ) : item.status != "null" && item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               ></button>
//             ) : (
//               <span className="">{item?.status}</span>
//             )}
//             <button
//               className="response-button"
//               onClick={() => setIsDetailOpen(true)}
//             >
//               Details
//             </button>
//           </div>
//         </div>
//         {isPopupOpen && (
//           <div className="popup-overlay">
//             <div ref={divRef} className="popup">
//               <h2>Response Form</h2>
//               <label>
//                 Status:
//                 <select
//                   onChange={(val) => setResponse(val.target.value)}
//                   name="status"
//                 >
//                   <option value="decline">Decline</option>
//                   <option value="approve">Approve</option>
//                   <option value="ring">Ring</option>
//                   <option value="not-reachable">Not reachable</option>
//                   <option value="v-kyc-done">v-KYC Done</option>
//                   <option value="v-kyc-pending">v-KYC Pending</option>
//                   <option value="in-process">In Process</option>
//                   <option value="not-intrested">Not Intrested</option>
//                 </select>
//               </label>
//               <div className="text-center">
//                 <button onClick={() => handleSubmit(item)} type="submit">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {isDetailOpen && (
//           <div className="popup-overlay MainDivOfLeadPopup">
//             <div ref={divRef} className="popup AgOriginatorsAllData">
//               <h2 className="TextOfLeadDetails">Lead Details</h2>
//               <div className="DivOfPopupItems">
//                 {isEditing.fullName ? (
//                   <input
//                     type="text"
//                     value={editedItem.fullName}
//                     onChange={handleEditChange("fullName")}
//                   />
//                 ) : (
//                   <p>Name: {editedItem.fullName}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("fullName")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.mobileNo ? (
//                   <input
//                     type="text"
//                     value={editedItem.mobileNo}
//                     onChange={handleEditChange("mobileNo")}
//                   />
//                 ) : (
//                   <p>Mobile No: {editedItem.mobileNo}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("mobileNo")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.fatherName ? (
//                   <input
//                     type="text"
//                     value={editedItem.fatherName}
//                     onChange={handleEditChange("fatherName")}
//                   />
//                 ) : (
//                   <p>Father Name: {editedItem.fatherName}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("fatherName")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.panNo ? (
//                   <input
//                     type="text"
//                     value={editedItem.panNo}
//                     onChange={handleEditChange("panNo")}
//                   />
//                 ) : (
//                   <p>Pan No: {editedItem.panNo}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("panNo")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.dateOfBirth ? (
//                   <input
//                     type="text"
//                     value={editedItem.dateOfBirth}
//                     onChange={handleEditChange("dateOfBirth")}
//                   />
//                 ) : (
//                   <p>Date Of Birth: {editedItem.dateOfBirth}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("dateOfBirth")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.status ? (
//                   <input
//                     type="text"
//                     value={editedItem.status}
//                     onChange={handleEditChange("status")}
//                   />
//                 ) : (
//                   <p>Lead Status: {editedItem.status}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("status")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.emailId ? (
//                   <input
//                     type="text"
//                     value={editedItem.emailId}
//                     onChange={handleEditChange("emailId")}
//                   />
//                 ) : (
//                   <p>Email Id: {editedItem.emailId}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("emailId")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.residenceAddress.line1 ? (
//                   <input
//                     type="text"
//                     value={editedItem.residenceAddress.line1}
//                     onChange={handleEditChange("residenceAddress", "line1")}
//                   />
//                 ) : (
//                   <p>Residence Address Line 1: {editedItem.residenceAddress.line1}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("residenceAddress", "line1")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.residenceAddress.line3 ? (
//                   <input
//                     type="text"
//                     value={editedItem.residenceAddress.line3}
//                     onChange={handleEditChange("residenceAddress", "line3")}
//                   />
//                 ) : (
//                   <p>Residence Address Line 3: {editedItem.residenceAddress.line3}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("residenceAddress", "line3")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.residenceAddress.landmark ? (
//                   <input
//                     type="text"
//                     value={editedItem.residenceAddress.landmark}
//                     onChange={handleEditChange("residenceAddress", "landmark")}
//                   />
//                 ) : (
//                   <p>
//                     Residence Address Landmark: {editedItem.residenceAddress.landmark}
//                   </p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("residenceAddress", "landmark")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.residenceAddress.pincode ? (
//                   <input
//                     type="text"
//                     value={editedItem.residenceAddress.pincode}
//                     onChange={handleEditChange("residenceAddress", "pincode")}
//                   />
//                 ) : (
//                   <p>Residence Address Pin Code: {editedItem.residenceAddress.pincode}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("residenceAddress", "pincode")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.modalName ? (
//                   <input
//                     type="text"
//                     value={editedItem.modalName}
//                     onChange={handleEditChange("modalName")}
//                   />
//                 ) : (
//                   <p>Form Name: {editedItem.modalName}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("modalName")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.companyName ? (
//                   <input
//                     type="text"
//                     value={editedItem.companyName}
//                     onChange={handleEditChange("companyName")}
//                   />
//                 ) : (
//                   <p>Company Name: {editedItem.companyName}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("companyName")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.designation ? (
//                   <input
//                     type="text"
//                     value={editedItem.designation}
//                     onChange={handleEditChange("designation")}
//                   />
//                 ) : (
//                   <p>Designation: {editedItem.designation}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("designation")}>
//                   Edit
//                 </div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {isEditing.createdAt ? (
//                   <input
//                     type="text"
//                     value={formatDate(editedItem.createdAt)}
//                     onChange={handleEditChange("createdAt")}
//                   />
//                 ) : (
//                   <p>Submission Date: {formatDate(editedItem.createdAt)}</p>
//                 )}
//                 <div className="EditDiv" onClick={toggleEdit("createdAt")}>
//                   Edit
//                 </div>
//               </div>
//             <button >Save</button>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default ResposeCard;


// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { baseUrl, formatDate } from "../../../Auth/Data";

// function ResposeCard({ item, isNotification }) {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [response, setResponse] = useState("");

//   const handleSubmit = async (item) => {
//     const res = await axios.post(`${baseUrl}/api/v1/leadResponse`, {
//       response,
//       modalName: item.modalName,
//       id: item._id,
//     });
//     if (res.status === 200) {
//       window.location.reload();
//     } else {
//       alert(res.data);
//     }
//     setIsPopupOpen(false);
//   };

//   const divRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (divRef.current && !divRef.current.contains(event.target)) {
//       setIsPopupOpen(false);
//       setIsDetailOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     isNotification && (
//       <div className="container ContainerOfLead">
//         <div className="lead-grid">
//           <div className="lead-item">
//             <span className="lead-label">Name:</span>
//             <span className="lead-value">{item?.fullName}</span>
//           </div>
//           <div className="lead-item">
//             <span className="lead-label">Mobile:</span>
//             <span className="lead-value">{item?.mobileNo}</span>
//           </div>
//           <div className="lead-item">
//             <span className="lead-label">Form Name:</span>
//             <span className="lead-value"> {item?.modalName} </span>
//           </div>
//           <div style={{ rowGap: 3 }} className="lead-item">
//             {item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               >
//                 Response
//               </button>
//             ) : item.status == "null" && !item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               >
//                 Response
//               </button>
//             ) : item.status != "null" && item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               ></button>
//             ) : (
//               <span className="">{item?.status}</span>
//             )}
//             <button
//               className="response-button"
//               onClick={() => setIsDetailOpen(true)}
//             >
//               Details
//             </button>
//           </div>
//         </div>
//         {isPopupOpen && (
//           <div className="popup-overlay">
//             <div ref={divRef} className="popup">
//               <h2>Response Form</h2>
//               <label>
//                 Status:
//                 <select
//                   onChange={(val) => setResponse(val.target.value)}
//                   name="status"
//                 >
//                   <option value="decline">Decline</option>
//                   <option value="approve">Approve</option>
//                   <option value="ring">Ring</option>
//                   <option value="not-reachable">Not reachable</option>
//                   <option value="v-kyc-done">v-KYC Done</option>
//                   <option value="v-kyc-pending">v-KYC Pending</option>
//                   <option value="in-process">In Process</option>
//                   <option value="not-intrested">Not Intrested</option>
//                 </select>
//               </label>
//               <div className="text-center">
//                 <button onClick={() => handleSubmit(item)} type="submit">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {isDetailOpen && (
//           <div className="popup-overlay MainDivOfLeadPopup">
//             <div ref={divRef} className="popup AgOriginatorsAllData">
//               <h2 className="TextOfLeadDetails">Lead Details</h2>
//               <div className="DivOfPopupItems">
//                 {item?.fullName ? <p>Name: {item?.fullName}</p> : null}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.mobileNo && <p>Mobile No: {item?.mobileNo}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.fatherName && <p>Father Name: {item?.fatherName}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.panNo && <p>Pan No: {item?.panNo}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.dateOfBirth && <p>Date Of Birth: {item?.dateOfBirth}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.status && <p>Lead Status: {item?.status}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.emailId && <p>Email Id: {item?.emailId}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.residenceAddress && item?.residenceAddress.line1 && (
//                   <p>Residence Address Line 1: {item?.residenceAddress.line1}</p>
//                 )}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.residenceAddress && item?.residenceAddress.line3 && (
//                   <p>Residence Address Line 3: {item?.residenceAddress.line3}</p>
//                 )}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.residenceAddress && item?.residenceAddress.landmark && (
//                   <p>
//                     Residence Address Landmark: {item?.residenceAddress.landmark}
//                   </p>
//                 )}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.residenceAddress && item?.residenceAddress.pincode && (
//                   <p>Residence Address Pin Code: {item?.residenceAddress.pincode}</p>
//                 )}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.modalName && <p>Form Name: {item?.modalName}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.companyName && <p>Company Name: {item?.companyName}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.designation && <p>Designation: {item?.designation}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               <div className="DivOfPopupItems">
//                 {item?.createdAt && <p>Submission Date: {formatDate(item?.createdAt)}</p>}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default ResposeCard;





// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { baseUrl, formatDate } from "../../../Auth/Data";

// function ResposeCard({ item, isNotification }) {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [response, setResponse] = useState("");

//   const handleSubmit = async (item) => {
//     const res = await axios.post(`${baseUrl}/api/v1/leadResponse`, {
//       response,
//       modalName: item.modalName,
//       id: item._id,
//     });
//     if (res.status === 200) {
//       window.location.reload();
//     } else {
//       alert(res.data);
//     }
//     setIsPopupOpen(false);
//   };

//   const divRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (divRef.current && !divRef.current.contains(event.target)) {
//       setIsPopupOpen(false);
//       setIsDetailOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     isNotification && (
//       <div className="container ContainerOfLead">
//         <div className="lead-grid">
//           <div className="lead-item">
//             <span className="lead-label">Name:</span>
//             <span className="lead-value">{item?.fullName}</span>
//           </div>
//           <div className="lead-item">
//             <span className="lead-label">Mobile:</span>
//             <span className="lead-value">{item?.mobileNo}</span>
//           </div>
//           <div className="lead-item">
//             <span className="lead-label">Form Name:</span>

//             <span className="lead-value"> {item?.modalName} </span>
//           </div>
//           <div style={{ rowGap: 3 }} className="lead-item">
//             {item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               >
//                 Response
//               </button>
//             ) : item.status == "null" && !item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               >
//                 Response
//               </button>
//             ) : item.status != "null" && item.reapply ? (
//               <button
//                 className="response-button"
//                 onClick={() => setIsPopupOpen(true)}
//               ></button>
//             ) : (
//               <span className="">{item?.status}</span>
//             )}
//             <button
//               className="response-button"
//               onClick={() => setIsDetailOpen(true)}
//             >
//               Details
//             </button>
//           </div>
//         </div>
//         {isPopupOpen && (
//           <div className="popup-overlay">
//             <div ref={divRef} className="popup">
//               <h2>Response Form</h2>
//               <label>
//                 Status:
//                 <select
//                   onChange={(val) => setResponse(val.target.value)}
//                   name="status"
//                 >
//                   <option value="decline">Decline</option>
//                   <option value="approve">Approve</option>
//                   <option value="ring">Ring</option>
//                   <option value="not-reachable">Not reachable</option>
//                   <option value="v-kyc-done">v-KYC Done</option>
//                   <option value="v-kyc-pending">v-KYC Pending</option>
//                   <option value="in-process">In Process</option>
//                   <option value="not-intrested">Not Intrested</option>
//                 </select>
//               </label>
//               <div className="text-center">
//                 <button onClick={() => handleSubmit(item)} type="submit">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {isDetailOpen && (
//           <div className="popup-overlay MainDivOfLeadPopup">
//             <div ref={divRef} className="popup AgOriginatorsAllData">
//               <h2 className="TextOfLeadDetails">Lead Details</h2>
//               <div className="DivOfPopupItems">

//               {item?.fullName ? <p>Name: {item?.fullName}</p> : null}
//                 <div className="EditDiv"> Edit</div>
//               </div>
//               {item?.mobileNo ? <p>Mobile No: {item?.mobileNo}</p> : null}
//               {item?.fatherName ? <p>Father Name: {item?.fatherName}</p> : null}
//               {item?.panNo ? <p>Pan No: {item?.panNo}</p> : null}
//               {item?.dateOfBirth ? (
//                 <p>Date Of Birth: {item?.dateOfBirth}</p>
//               ) : null}
//               {item?.status ? <p>Lead Status: {item?.status}</p> : null}
//               {item?.emailId ? <p>Email Id: {item?.emailId}</p> : null}
//               {item?.residenceAddress ? (
//                 <p>Residence Address Line 1: {item?.residenceAddress?.line1}</p>
//               ) : null}
//               {item?.residenceAddress ? (
//                 <p>Residence Address Line 3: {item?.residenceAddress?.line3}</p>
//               ) : null}
//               {item?.residenceAddress ? (
//                 <p>
//                   Residence Address Lank mark:{" "}
//                   {item?.residenceAddress?.landmark}
//                 </p>
//               ) : null}
//               {item?.residenceAddress ? (
//                 <p>
//                   Residence Address Pin Code: {item?.residenceAddress?.pincode}
//                 </p>
//               ) : null}
//               {item?.modalName ? <p>Form Name: {item?.modalName}</p> : null}
//               {item?.companyName ? (
//                 <p>Compony Name: {item?.companyName}</p>
//               ) : null}
//               {item?.designation ? (
//                 <p>Designation: {item?.designation}</p>
//               ) : null}
//               {item?.createdAt ? (
//                 <p>Submission Date: {formatDate(item?.createdAt)}</p>
//               ) : null}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }
// export default ResposeCard;


