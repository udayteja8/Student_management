import React from 'react';
import './App.css';

export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <h1 style={{ fontSize: "3rem", fontWeight: "600", color: "#333" }}>
        Welcome to Student Management
      </h1><br/>
      <h5 style={{ fontSize: "1.3rem", fontWeight: "400", color: "#555",marginBottom: "130px" }}>
        Explore and Manage Students Information
      </h5>
    </div>
  );
}
