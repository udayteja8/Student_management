import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from './apiService';

export default function Edit() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await apiService.getAllStudents();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Function to handle student deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await apiService.deleteStudent(id);
        // Update state after successful deletion
        setStudents(students.filter(student => student.ID !== id));
      } catch (err) {
        setError('Failed to delete student');
      }
    }
  };

  if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;
  if (error) return <div className="container mt-5"><h3 className="text-danger">{error}</h3></div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Students List</h2>
        <Link to="/Add" className="btn btn-primary">Add New Student</Link>
      </div>

      {students.length === 0 ? (
        <div className="alert alert-info">No students found. Add some!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id}>
                  <td>{student.ID}</td>
                  <td>{student.Fname} {student.Lname}</td>
                  <td>{student.email}</td>
                  <td>{student.Depatment}</td>
                  <td>{student.Year}</td>
                  <td>
                    <span className={`badge ${student.Status ? 'bg-success' : 'bg-danger'}`}>
                      {student.Status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <Link to={`/edit-student/${student.ID}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                    <button 
                      onClick={() => handleDelete(student.ID)} 
                      className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
