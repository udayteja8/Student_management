import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import apiService from './apiService';

export default function EditStudent() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch student data when component mounts
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await apiService.getStudentById(id);
        // Format date for input type="date"
        const formattedDate = data.Birth ? new Date(data.Birth).toISOString().split('T')[0] : '';
        
        setFormData({
          ...data,
          Birth: formattedDate
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student data');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

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
    setSubmitLoading(true);
    setError(null);

    try {
      // Convert ID and Year to numbers
      const studentData = {
        ...formData,
        ID: Number(formData.ID),
        Year: Number(formData.Year)
      };

      await apiService.updateStudent(id, studentData);
      setSubmitLoading(false);
      // Redirect to students list page
      history.push('/Edit');
    } catch (err) {
      setError('Failed to update student. Please check your data and try again.');
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;

  return (
    <div className="container mt-5 p-4 form-wrapper">
      <h2 className="mb-4">Edit Student</h2>
      
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
            disabled // Disable ID field to prevent changes
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
    
        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => history.push('/Edit')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitLoading}
          >
            {submitLoading ? 'Updating...' : 'Update Student Info'}
          </button>
        </div>
      </form>
    </div>
  );
}