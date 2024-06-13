
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { baseUrl, formatDate } from "../../../Auth/Data";

function ResposeCard({ item, isNotification }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [isEditable, setIsEditable] = useState({
    fullName: false,
    mobileNo: false,
    fatherName: false,
    panNo: false,
    dateOfBirth: false,
    status: false,
    emailId: false,
    residenceAddressLine1: false,
    residenceAddressLine3: false,
    residenceAddressLandmark: false,
    residenceAddressPincode: false,
    modalName: false,
    companyName: false,
    designation: false,
  });

  const [editableData, setEditableData] = useState({
    fullName: item.fullName,
    mobileNo: item.mobileNo,
    fatherName: item.fatherName,
    panNo: item.panNo,
    dateOfBirth: item.dateOfBirth,
    status: item.status,
    emailId: item.emailId,
    residenceAddress: {
      line1: item.residenceAddress?.line1,
      line3: item.residenceAddress?.line3,
      landmark: item.residenceAddress?.landmark,
      pincode: item.residenceAddress?.pincode,
    },
    modalName: item.modalName,
    companyName: item.companyName,
    designation: item.designation,
  });

  const handleSubmit = async () => {
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

  const handleEditableSave = () => {
    setIsEditable({
      fullName: false,
      mobileNo: false,
      fatherName: false,
      panNo: false,
      dateOfBirth: false,
      status: false,
      emailId: false,
      residenceAddressLine1: false,
      residenceAddressLine3: false,
      residenceAddressLandmark: false,
      residenceAddressPincode: false,
      modalName: false,
      companyName: false,
      designation: false,
    });
    // Logic to save the edited data can be added here.
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsPopupOpen(false);
      setIsDetailOpen(false);
    }
  };

  const divRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container ContainerOfLead">
      <div className="lead-grid">
        <div className="lead-item">
          <span className="lead-label">Name:</span>
          <span className="lead-value">{item?.fullName.toUpperCase()}</span>
        </div>
        <div className="lead-item">
          <span className="lead-label">Mobile:</span>
          <span className="lead-value">{item?.mobileNo}</span>
        </div>
        <div className="lead-item">
          <span className="lead-label">Form Name:</span>
          <span className="lead-value">{item?.modalName.toUpperCase()}</span>
        </div>
        <div style={{ rowGap: 3 }} className="lead-item">
          {item.reapply || item.status === "null" ? (
            <button
              className="response-button"
              onClick={() => setIsPopupOpen(true)}
            >
              Response
            </button>
          ) : (
            <span>{item?.status.toUpperCase()}</span>
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
        <div className="popup-overlay">
          <div ref={divRef} className="popup DivOfResponceForm">
            <h2 style={{textAlign:"center"}}>Response Form</h2>
            <div className="row DivOfMessage">
            <label className="col-sm-12 col-form-label">
              Status:
              <select
                onChange={(e) => setResponse(e.target.value)}
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
              <button onClick={handleSubmit} type="submit">
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
              {item?.fullName && (
                <p>
                  Name:
                  {!isEditable.fullName ? (
                    item?.fullName.toUpperCase()
                  ) : (
                    <input
                      type="text"
                      value={editableData.fullName}
                      onChange={(e) =>
                        setEditableData({ ...editableData, fullName: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, fullName: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.mobileNo && (
                <p>
                  Mobile No:
                  {!isEditable.mobileNo ? (
                    item?.mobileNo
                  ) : (
                    <input
                      type="text"
                      value={editableData.mobileNo}
                      onChange={(e) =>
                        setEditableData({ ...editableData, mobileNo: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, mobileNo: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.fatherName && (
                <p>
                  Father Name:
                  {!isEditable.fatherName ? (
                    item?.fatherName.toUpperCase()
                  ) : (
                    <input
                      type="text"
                      value={editableData.fatherName}
                      onChange={(e) =>
                        setEditableData({ ...editableData, fatherName: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, fatherName: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.panNo && (
                <p>
                  Pan No:
                  {!isEditable.panNo ? (
                    item?.panNo.toUpperCase()
                  ) : (
                    <input
                      type="text"
                      value={editableData.panNo}
                      onChange={(e) =>
                        setEditableData({ ...editableData, panNo: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, panNo: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.dateOfBirth && (
                <p>
                  Date Of Birth:
                  {!isEditable.dateOfBirth ? (
                    item?.dateOfBirth
                  ) : (
                    <input
                      type="text"
                      value={editableData.dateOfBirth}
                      onChange={(e) =>
                        setEditableData({ ...editableData, dateOfBirth: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, dateOfBirth: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.status && (
                <p>
                  Lead Status:
                  {!isEditable.status ? (
                    item?.status.toUpperCase()
                  ) : (
                    <input
                      type="text"
                      value={editableData.status}
                      onChange={(e) =>
                        setEditableData({ ...editableData, status: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, status: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.emailId && (
                <p>
                  Email Id:
                  {!isEditable.emailId ? (
                    item?.emailId.toUpperCase()
                  ) : (
                    <input
                      type="text"
                      value={editableData.emailId}
                      onChange={(e) =>
                        setEditableData({ ...editableData, emailId: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, emailId: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.residenceAddress?.line1 && (
                <>
                  <p>
                    Residence Address Line 1:
                    {!isEditable.residenceAddressLine1 ? (
                      item?.residenceAddress.line1.toUpperCase()
                    ) : (
                      <input
                        type="text"
                        value={editableData.residenceAddress.line1}
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            residenceAddress: {
                              ...editableData.residenceAddress,
                              line1: e.target.value,
                            },
                          })
                        }
                      />
                    )}
                  </p>
                  <div
                    className="EditDiv"
                    onClick={() =>
                      setIsEditable({ ...isEditable, residenceAddressLine1: true })
                    }
                  >
                    Edit
                  </div>
                </>
              )}
            </div>

            <div className="DivOfPopupItems">
              {item?.residenceAddress?.line3 && (
                <>
                  <p>
                    Residence Address Line 3:
                    {!isEditable.residenceAddressLine3 ? (
                      item?.residenceAddress.line3.toUpperCase()
                    ) : (
                      <input
                        type="text"
                        value={editableData.residenceAddress.line3}
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            residenceAddress: {
                              ...editableData.residenceAddress,
                              line3: e.target.value,
                            },
                          })
                        }
                      />
                    )}
                  </p>
                  <div
                    className="EditDiv"
                    onClick={() =>
                      setIsEditable({ ...isEditable, residenceAddressLine3: true })
                    }
                  >
                    Edit
                  </div>
                </>
              )}
            </div>

            <div className="DivOfPopupItems">
              {item?.residenceAddress?.landmark && (
                <>
                  <p className="ParagraphOfLabel">
                    Residence Address Landmark:
                    {!isEditable.residenceAddressLandmark ? (
                      item?.residenceAddress.landmark.toUpperCase()
                    ) : (
                      <input
                        type="text"
                        value={editableData.residenceAddress.landmark}
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            residenceAddress: {
                              ...editableData.residenceAddress,
                              landmark: e.target.value,
                            },
                          })
                        }
                      />
                    )}
                  </p>
                  <div
                    className="EditDiv"
                    onClick={() =>
                      setIsEditable({ ...isEditable, residenceAddressLandmark: true })
                    }
                  >
                    Edit
                  </div>
                </>
              )}
            </div>

            <div className="DivOfPopupItems">
              {item?.residenceAddress?.pincode && (
                <>
                  <p>
                    Residence Address Pin Code:
                    {!isEditable.residenceAddressPincode ? (
                      item?.residenceAddress.pincode.toUpperCase()
                    ) : (
                      <input
                        type="text"
                        value={editableData.residenceAddress.pincode}
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            residenceAddress: {
                              ...editableData.residenceAddress,
                              pincode: e.target.value,
                            },
                          })
                        }
                      />
                    )}
                  </p>
                  <div
                    className="EditDiv"
                    onClick={() =>
                      setIsEditable({ ...isEditable, residenceAddressPincode: true })
                    }
                  >
                    Edit
                  </div>
                </>
              )}
            </div>

            <div className="DivOfPopupItems">
              {item?.modalName && (
                <p>
                  Form Name:
                  {!isEditable.modalName ? (
                    item?.modalName.toUpperCase()
                  ) : (
                    <input
                      type="text"
                      value={editableData.modalName}
                      onChange={(e) =>
                        setEditableData({ ...editableData, modalName: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, modalName: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.companyName && (
                <p>
                  Company Name:
                  {!isEditable.companyName ? (
                    item?.companyName.toUpperCase()
                  ) : (
                    <input
                      type="text"
                      value={editableData.companyName}
                      onChange={(e) =>
                        setEditableData({ ...editableData, companyName: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, companyName: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.designation && (
                <p>
                  Designation:
                  {!isEditable.designation ? (
                    item?.designation.toUpperCase()
                  ) : (
                    <input
                      type="text"
                      value={editableData.designation}
                      onChange={(e) =>
                        setEditableData({ ...editableData, designation: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, designation: true })}
              >
                Edit
              </div>
            </div>

            <div className="DivOfPopupItems">
              {item?.createdAt && (
                <p>
                  Submission Date:
                  {!isEditable.createdAt ? (
                    formatDate(item?.createdAt)
                  ) : (
                    <input
                      type="text"
                      value={editableData.createdAt}
                      onChange={(e) =>
                        setEditableData({ ...editableData, createdAt: e.target.value })
                      }
                    />
                  )}
                </p>
              )}
              <div
                className="EditDiv"
                onClick={() => setIsEditable({ ...isEditable, createdAt: true })}
              >
                Edit
              </div>
            </div>

            <button onClick={handleEditableSave}>Save</button>
          </div>
        </div>
      )}
    </div>
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
//   const [isEditable, setIsEditable] = useState(false);
//   const [editableData, setEditableData] = useState({
//     fullName: item.fullName,
//   });

//   const handleSubmit = async () => {
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

//   const handleEditableSave = () => {
//     setIsEditable(false);
//     // Logic to save the edited data can be added here.
//   };

//   const handleClickOutside = (event) => {
//     if (divRef.current && !divRef.current.contains(event.target)) {
//       setIsPopupOpen(false);
//       setIsDetailOpen(false);
//     }
//   };

//   const divRef = useRef(null);

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="container ContainerOfLead">
//       <div className="lead-grid">
//         <div className="lead-item">
//           <span className="lead-label">Name:</span>
//           <span className="lead-value">{item?.fullName.toUpperCase()}</span>
//         </div>
//         <div className="lead-item">
//           <span className="lead-label">Mobile:</span>
//           <span className="lead-value">{item?.mobileNo}</span>
//         </div>
//         <div className="lead-item">
//           <span className="lead-label">Form Name:</span>
//           <span className="lead-value">{item?.modalName.toUpperCase()}</span>
//         </div>
//         <div style={{ rowGap: 3 }} className="lead-item">
//           {item.reapply || item.status === "null" ? (
//             <button
//               className="response-button"
//               onClick={() => setIsPopupOpen(true)}
//             >
//               Response
//             </button>
//           ) : (
//             <span>{item?.status.toUpperCase()}</span>
//           )}
//           <button
//             className="response-button"
//             onClick={() => setIsDetailOpen(true)}
//           >
//             Details
//           </button>
//         </div>
//       </div>
//       {isPopupOpen && (
//         <div className="popup-overlay">
//           <div ref={divRef} className="popup">
//             <h2>Response Form</h2>
//             <label>
//               Status:
//               <select
//                 onChange={(e) => setResponse(e.target.value)}
//                 name="status"
//               >
//                 <option value="decline">Decline</option>
//                 <option value="approve">Approve</option>
//                 <option value="ring">Ring</option>
//                 <option value="not-reachable">Not reachable</option>
//                 <option value="v-kyc-done">v-KYC Done</option>
//                 <option value="v-kyc-pending">v-KYC Pending</option>
//                 <option value="in-process">In Process</option>
//                 <option value="not-intrested">Not Intrested</option>
//               </select>
//             </label>
//             <div className="text-center">
//               <button onClick={handleSubmit} type="submit">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isDetailOpen && (
//         <div className="popup-overlay MainDivOfLeadPopup">
//           <div ref={divRef} className="popup AgOriginatorsAllData">
//             <h2 className="TextOfLeadDetails">Lead Details</h2>
            
//             <div className="DivOfPopupItems">
//               {item?.fullName && (
//                 <p>
//                   Name:
//                   {!isEditable ? (
//                     item?.fullName.toUpperCase()
//                   ) : (
//                     <input
//                       type="text"
//                       value={editableData.fullName}
//                       onChange={(e) =>
//                         setEditableData({ ...editableData, fullName: e.target.value })
//                       }
//                     />
//                   )}
//                 </p>
//               )}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.mobileNo && <p>Mobile No: {item?.mobileNo}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.fatherName && <p>Father Name: {item?.fatherName.toUpperCase()}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.panNo && <p>Pan No: {item?.panNo.toUpperCase()}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.dateOfBirth && <p>Date Of Birth: {item?.dateOfBirth}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.status && <p>Lead Status: {item?.status.toUpperCase()}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.emailId && <p>Email Id: {item?.emailId.toUpperCase()}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.residenceAddress && (
//                 <>
//                   <p>Residence Address Line 1: {item?.residenceAddress?.line1.toUpperCase()}</p>
//                   <div className="EditDiv">Edit</div>
//                 </>
//               )}
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.residenceAddress && (
//                 <>
//                   <p>Residence Address Line 3: {item?.residenceAddress?.line3.toUpperCase()}</p>
//                   <div className="EditDiv">Edit</div>
//                 </>
//               )}
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.residenceAddress && (
//                 <>
//                   <p>Residence Address Landmark: {item?.residenceAddress?.landmark.toUpperCase()}</p>
//                   <div className="EditDiv">Edit</div>
//                 </>
//               )}
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.residenceAddress && (
//                 <>
//                   <p>Residence Address Pin Code: {item?.residenceAddress?.pincode.toUpperCase()}</p>
//                   <div className="EditDiv">Edit</div>
//                 </>
//               )}
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.modalName && <p>Form Name: {item?.modalName.toUpperCase()}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.companyName && <p>Company Name: {item?.companyName.toUpperCase()}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.designation && <p>Designation: {item?.designation.toUpperCase()}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <div className="DivOfPopupItems">
//               {item?.createdAt && <p>Submission Date: {formatDate(item?.createdAt)}</p>}
//               <div className="EditDiv">Edit</div>
//             </div>
            
//             <button onClick={handleEditableSave}>Save</button>
//           </div>
//         </div>
//       )}
//     </div>
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
//   const handleEditableSave = () => {
//     setIsEditable(false);
//   };
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   const [isEditable, setIsEditable] = useState(false);
//   return (
//     <div className="container ContainerOfLead">
//       <div className="lead-grid">
//         <div className="lead-item">
//           <span className="lead-label">Name:</span>
//           <span className="lead-value">{item?.fullName.toUpperCase()}</span>
//         </div>
//         <div className="lead-item">
//           <span className="lead-label">Mobile:</span>
//           <span className="lead-value">{item?.mobileNo}</span>
//         </div>
//         <div className="lead-item">
//           <span className="lead-label">Form Name:</span>

//           <span className="lead-value"> {item?.modalName.toUpperCase()} </span>
//         </div>
//         <div style={{ rowGap: 3 }} className="lead-item">
//           {item.reapply ? (
//             <button
//               className="response-button"
//               onClick={() => setIsPopupOpen(true)}
//             >
//               Response
//             </button>
//           ) : item.status == "null" && !item.reapply ? (
//             <button
//               className="response-button"
//               onClick={() => setIsPopupOpen(true)}
//             >
//               Response
//             </button>
//           ) : item.status != "null" && item.reapply ? (
//             <button
//               className="response-button"
//               onClick={() => setIsPopupOpen(true)}
//             ></button>
//           ) : (
//             <span className="">{item?.status.toUpperCase()}</span>
//           )}
//           <button
//             className="response-button"
//             onClick={() => setIsDetailOpen(true)}
//           >
//             Details
//           </button>
//         </div>
//       </div>
//       {isPopupOpen && (
//         <div className="popup-overlay">
//           <div ref={divRef} className="popup">
//             <h2>Response Form</h2>
//             <label>
//               Status:
//               <select
//                 onChange={(val) => setResponse(val.target.value)}
//                 name="status"
//               >
//                 <option value="decline">Decline</option>
//                 <option value="approve">Approve</option>
//                 <option value="ring">Ring</option>
//                 <option value="not-reachable">Not reachable</option>
//                 <option value="v-kyc-done">v-KYC Done</option>
//                 <option value="v-kyc-pending">v-KYC Pending</option>
//                 <option value="in-process">In Process</option>
//                 <option value="not-intrested">Not Intrested</option>
//               </select>
//             </label>
//             <div className="text-center">
//               <button onClick={() => handleSubmit(item)} type="submit">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isDetailOpen && (
//         <div className="popup-overlay  MainDivOfLeadPopup">
//           <div ref={divRef} className="popup AgOriginatorsAllData">
//             <h2 className="TextOfLeadDetails">
//               Lead Details
//             </h2>
//             {item?.fullName ? (
//               <p>
//                 Name:
//                 {!isEditable ? (
//                   item?.fullName.toUpperCase()
//                 ) : (
//                   <input type="text" value={item?.fullName} />
//                 )}
//               </p>
//             ) : null}
//             {item?.mobileNo ? <p>Mobile No: {item?.mobileNo}</p> : null}
//             {item?.fatherName ? (
//               <p>Father Name: {item?.fatherName.toUpperCase()}</p>
//             ) : null}
//             {item?.panNo ? <p>Pan No: {item?.panNo.toUpperCase()}</p> : null}
//             {item?.dateOfBirth ? (
//               <p>Date Of Birth: {item?.dateOfBirth}</p>
//             ) : null}
//             {item?.status ? (
//               <p>Lead Status: {item?.status.toUpperCase()}</p>
//             ) : null}
//             {item?.emailId ? (
//               <p>Email Id: {item?.emailId.toUpperCase()}</p>
//             ) : null}
//             {item?.residenceAddress ? (
//               <p>
//                 Residence Address Line 1:{" "}
//                 {item?.residenceAddress?.line1.toUpperCase()}
//               </p>
//             ) : null}
//             {item?.residenceAddress ? (
//               <p>
//                 Residence Address Line 3:{" "}
//                 {item?.residenceAddress?.line3.toUpperCase()}
//               </p>
//             ) : null}
//             {item?.residenceAddress ? (
//               <p>
//                 Residence Address Lank mark:{" "}
//                 {item?.residenceAddress?.landmark.toUpperCase()}
//               </p>
//             ) : null}
//             {item?.residenceAddress ? (
//               <p>
//                 Residence Address Pin Code:{" "}
//                 {item?.residenceAddress?.pincode.toUpperCase()}
//               </p>
//             ) : null}
//             {item?.modalName ? (
//               <p>Form Name: {item?.modalName.toUpperCase()}</p>
//             ) : null}
//             {item?.companyName ? (
//               <p>Compony Name: {item?.companyName.toUpperCase()}</p>
//             ) : null}
//             {item?.designation ? (
//               <p>Designation: {item?.designation.toUpperCase()}</p>
//             ) : null}
//             {item?.createdAt ? (
//               <p>Submission Date: {formatDate(item?.createdAt)}</p>
//             ) : null}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResposeCard;


