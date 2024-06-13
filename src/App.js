// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Static/Home/Home";
import "./Root.css";
import Myapp from "./Components/Static/Grid/Myapp";
import Lead from "./Components/Static/Lead/Lead";
import User from "./Auth/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <User isNotification={false}>
              <Login />
            </User>
          }
        />
        <Route
          path="/notification"
          element={
            <User isNotification={true}>
              <Login />
            </User>
          }
        />
        <Route path="/myapp" element={<Myapp />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
