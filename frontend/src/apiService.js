import axios from 'axios';

const API_URL = 'http://localhost:8080/api/Students';
// Create axios instance
const api = axios.create({
    baseURL: API_URL
});

// API service object
const apiService = {
    // Get all students
    getAllStudents: async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    },

    // Get student by ID
    getStudentById: async (id) => {
        try {
            const response = await api.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching student with ID ${id}:`, error);
            throw error;
        }
    },

    // Create new student
    createStudent: async (studentData) => {
        try {
            const response = await api.post('/', studentData);
            return response.data;
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        }
    },

    // Update student
    updateStudent: async (id, studentData) => {
        try {
            const response = await api.put(`/${id}`, studentData);
            return response.data;
        } catch (error) {
            console.error(`Error updating student with ID ${id}:`, error);
            throw error;
        }
    },

    // Delete student
    deleteStudent: async (id) => {
        try {
            const response = await api.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting student with ID ${id}:`, error);
            throw error;
        }
    }
};

export default apiService;
