import React, { useEffect, useState } from "react";
import Home from "../Components/Static/Home/Home";
import Lead from "../Components/Static/Lead/Lead";

const User = ({ children, isNotification }) => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    fetchLogDetails();
  }, []);
  const fetchLogDetails = () => {
    const loginStatus = localStorage.getItem("logged");
    if (loginStatus === "true") {
      setIsLogged(true);
    }
  };
  return (
    <div>{isLogged ? <Lead isNotification={isNotification} /> : children}</div>
  );
};

export default User;
