import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from './apiService';

export default function Add() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    ID: '',
    Fname: '',
    Lname: '',
    email: '',
    Depatment: '',
    Birth: '',
    Year: '',
    Status: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert ID and Year to numbers
      const studentData = {
        ...formData,
        ID: Number(formData.ID),
        Year: Number(formData.Year)
      };

      await apiService.createStudent(studentData);
      setLoading(false);
      // Redirect to students list page
      history.push('/Edit');
    } catch (err) {
      setError('Failed to add student. Please check your data and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 p-4 form-wrapper">
      <h2 className="mb-4">Add New Student</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Student ID */}
        <div className="mb-3">
          <label>Student ID</label>
          <input 
            type="number" 
            className="form-control" 
            name="ID"
            value={formData.ID}
            onChange={handleChange}
            required
          />
        </div>
    
        {/* Name Block */}
        <div className="row mb-3">
          <div className="col">
            <label>First Name</label>
            <input 
              type="text" 
              className="form-control"
              name="Fname"
              value={formData.Fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>Last Name</label>
            <input 
              type="text" 
              className="form-control"
              name="Lname"
              value={formData.Lname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
    
        {/* Email and Department */}
        <div className="row mb-3">
          <div className="col">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>Department</label>
            <select 
              className="form-select"
              name="Depatment"
              value={formData.Depatment}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
        </div>
    
        {/* DOB and Enrollment */}
        <div className="row mb-3">
          <div className="col">
            <label>Date of Birth</label>
            <input 
              type="date" 
              className="form-control"
              name="Birth"
              value={formData.Birth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>Enrollment Year</label>
            <input 
              type="number" 
              className="form-control"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              required
            />
          </div>
        </div>
    
        {/* Switch */}
        <div className="form-check form-switch mb-3">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="isActive"
            name="Status"
            checked={formData.Status}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isActive">Mark as Active</label>
        </div>
    
        {/* Button */}
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Student Info'}
        </button>
      </form>
    </div>
  );
}
